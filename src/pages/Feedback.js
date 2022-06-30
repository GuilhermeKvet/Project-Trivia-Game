import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  feedbackMessage = () => {
    const three = 3;
    const { correct } = this.props;
    let message = '';
    if (correct < three) {
      message = 'Could be better...';
    } else if (correct >= three) {
      message = 'Well Done!';
    }
    return message;
  }

  render() {
    const { correct } = this.props;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <p>{ `Respostas corretas: ${correct}` }</p>
        <p data-testid="feedback-text">{ this.feedbackMessage() }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correct: state.player.correct,
});

Feedback.propTypes = {
  correct: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
