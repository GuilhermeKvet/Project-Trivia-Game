import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    triviaGame: '',
    count: 0,
  }

  async componentDidMount() {
    await this.fetchTriviaApi();
  }

  fetchTriviaApi = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const data = await response.json();
    const errorToken = 3;
    if (data.response_code === errorToken) {
      localStorage.clear();
      history.push('/');
    } else {
      this.setState({ triviaGame: data });
    }
  };

  shuffleAnswers = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const numberRandom = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[numberRandom]] = [arr[numberRandom], arr[i]];
    }
    return arr;
  }

  triviaGame = () => {
    const { triviaGame: { results }, count } = this.state;
    const objPergunta = results[count];
    const allAnswers = [...objPergunta.incorrect_answers, objPergunta.correct_answer];
    const randomAnswers = this.shuffleAnswers(allAnswers);
    return (
      <div>
        <h2 data-testid="question-text">{ objPergunta.question }</h2>
        <p data-testid="question-category">{ objPergunta.category }</p>
        <div data-testid="answer-options">
          {randomAnswers.map((element, index) => {
            if (element === objPergunta.correct_answer) {
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  key={ index }
                >
                  { element }
                </button>
              );
            }
            return (
              <button
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${index}` }
              >
                { element }
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    const { triviaGame } = this.state;
    return (
      <div>
        <Header />
        <div>{ Boolean(triviaGame.results) && this.triviaGame() }</div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Game;
