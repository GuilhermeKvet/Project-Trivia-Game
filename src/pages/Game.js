import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { scoreUser } from '../actions';

class Game extends React.Component {
  state = {
    triviaGame: '',
    count: 0,
    respondida: false,
    countTimer: 30,
    answers: [],
  }

  async componentDidMount() {
    if (localStorage.getItem('token')) {
      await this.fetchTriviaApi();
      this.timer();
    } else {
      const { history } = this.props;
      history.push('/');
    }
  }

  componentDidUpdate() {
    const { countTimer } = this.state;
    if (countTimer === 0) {
      clearInterval(this.timerInterval);
    }
  }

  timer = () => {
    const timeInMS = 1000;
    this.timerInterval = setInterval(() => this.setState((prev) => (
      { countTimer: prev.countTimer - 1 })), timeInMS);
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
    this.setState({ answers: arr });
    return arr;
  }

  handleClick = ({ target }) => {
    const TEN = 10;
    const three = 3;
    const { dispatch } = this.props;
    const { triviaGame: { results }, countTimer, count } = this.state;
    const { difficulty } = results[count];
    let score = 0;
    let assertions = 0;
    this.setState({ respondida: true });
    if (target.name === 'correct') {
      if (difficulty === 'hard') {
        score = TEN + (countTimer * three);
      } else if (difficulty === 'medium') {
        score = TEN + (countTimer * 2);
      } else {
        score = TEN + countTimer;
      }
      assertions = 1;
    }
    dispatch(scoreUser(score, assertions));
  };

  triviaGame = () => {
    const { triviaGame: { results },
      count, respondida, answers, countTimer } = this.state;
    const objPergunta = results[count];
    const allAnswers = [...objPergunta.incorrect_answers, objPergunta.correct_answer];
    const randomAnswers = answers.length > 0 ? answers : this.shuffleAnswers(allAnswers);
    const verdadeiro = true;
    const falso = false;
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
                  name="correct"
                  onClick={ this.handleClick }
                  style={ respondida ? { border: '3px solid rgb(6, 240, 15)' } : {} }
                  disabled={ countTimer === 0 ? verdadeiro : falso }
                >
                  { element }
                </button>
              );
            }
            return (
              <button
                type="button"
                key={ index }
                name="incorrect"
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.handleClick }
                style={ respondida ? { border: '3px solid red' } : {} }
                disabled={ countTimer === 0 ? verdadeiro : falso }
              >
                { element }
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  sumCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1,
      answers: [],
      respondida: false,
      countTimer: 30 }));
  }

  handleNextButton = () => {
    const { count } = this.state;
    const { history } = this.props;
    const four = 4;
    if (count === four) {
      history.push('/feedback');
    } else {
      clearInterval(this.timerInterval);
      this.timer();
      this.sumCount();
    }
  }

  render() {
    const { triviaGame, countTimer, respondida } = this.state;
    return (
      <div>
        <Header />
        <p>{countTimer <= 0 ? 'Acabou o tempo' : countTimer}</p>
        <div>{ Boolean(triviaGame.results) && this.triviaGame() }</div>
        { (countTimer <= 0 || respondida)
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNextButton }
            >
              Next
            </button>) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Game.propTypes = {
  history: PropTypes.objectOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Game);
