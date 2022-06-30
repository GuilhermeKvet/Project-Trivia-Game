import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
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

  render() {
    const { player: { score, assertions } } = this.props;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <p data-testid="feedback-total-score">{ Number(score) }</p>
        <p data-testid="feedback-total-question">{ Number(assertions) }</p>
        <p data-testid="feedback-text">{ this.feedbackMessage() }</p>
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
};

export default connect(mapStateToProps)(Feedback);
