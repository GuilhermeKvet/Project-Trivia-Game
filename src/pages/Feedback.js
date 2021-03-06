import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { reset } from '../actions';
import '../style/feedback.css';

class Feedback extends React.Component {
  componentDidMount() {
    this.setRanking();
  }

  feedbackMessage = () => {
    const three = 3;
    const { player: { assertions } } = this.props;
    let message = '';
    if (assertions < three) {
      message = 'Could be better...';
    } else if (assertions >= three) {
      message = 'Well Done!';
    }
    return message;
  }

  resetGame = () => {
    const { dispatch, history } = this.props;
    dispatch(reset());
    history.push('/');
  }

  setRanking = () => {
    const { player: { name, score, url } } = this.props;
    if (localStorage.getItem('ranking') !== null) {
      const token = localStorage.getItem('token');
      const rankingObj = JSON.parse(localStorage.getItem('ranking'));
      const { ranking } = rankingObj;
      const newRanking = [...ranking, { name, score, url }];
      localStorage.setItem('ranking', JSON.stringify({ ranking: newRanking, token }));
    } else {
      const token = localStorage.getItem('token');
      const ranking = [{ name, score, url }];
      localStorage.setItem('ranking', JSON.stringify({ ranking, token }));
    }
  }

  render() {
    const { history, player: { score, assertions } } = this.props;
    return (
      <div>
        <Header />
        <div className="feedback-container">
          <h1 className="space-text">Feedback</h1>
          <p
            data-testid="feedback-total-score"
            className="space-text"
          >
            { Number(score) }
          </p>
          <p
            data-testid="feedback-total-question"
            className="space-text"
          >
            { Number(assertions) }
          </p>
          <p
            data-testid="feedback-text"
            className="space-text"
          >
            { this.feedbackMessage() }
          </p>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.resetGame }
            className="btns-feedback"
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ () => history.push('/ranking') }
            className="btns-feedback"
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  player: PropTypes.objectOf.isRequired,
  history: PropTypes.objectOf,
  dispatch: PropTypes.func.isRequired,
};

Feedback.defaultProps = {
  history: {},
};

export default connect(mapStateToProps)(Feedback);
