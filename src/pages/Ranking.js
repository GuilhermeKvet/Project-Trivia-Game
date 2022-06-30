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

  renderRanking = () => {
    const rankings = JSON.parse(localStorage.getItem('ranking'));
    const { ranking } = rankings;
    const rankingOrdenado = ranking.sort((a, b) => b.score - a.score);
    const ranks = rankingOrdenado.map((element, index) => {
      const { name, score, url } = element;
      return (
        <div key={ index }>
          <img src={ url } alt="perfil" />
          <p data-testid={ `player-name-${index}` }>{ name }</p>
          <p data-testid={ `player-score-${index}` }>{ score }</p>
        </div>
      );
    });
    return ranks;
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { JSON.parse(localStorage.getItem('ranking')) && this.renderRanking() }
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
  history: PropTypes.objectOf,
  dispatch: PropTypes.func.isRequired,
};

Ranking.defaultProps = {
  history: {},
};

export default connect()(Ranking);
