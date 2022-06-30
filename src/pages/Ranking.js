import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset } from '../actions';

class Ranking extends React.Component {
  resetGame = () => {
    const { dispatch, history } = this.props;
    dispatch(reset());
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.resetGame }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
