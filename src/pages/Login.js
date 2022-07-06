import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, addUser } from '../actions';

import '../style/login.css';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  habilitaBtn = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      return false;
    }
    return true;
  }

  receiveToken = async () => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    const response = await fetchApi();
    localStorage.setItem('token', response.token);
    dispatch(addUser(name, email));
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <div className="flex-container-input">
        <div className="flex-container-input-name">
          <h1 className="title-login">TRIVIA GAME</h1>
          <label htmlFor="name">
            Nome
            <input
              id="name"
              type="text"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <br />
        <div className="flex-container-input-email">
          <label htmlFor="email">
            E-mail
            <input
              id="email"
              type="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
        </div>
        <br />
        <div className="flex-buttons">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.habilitaBtn() }
            onClick={ this.receiveToken }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/config') }
          >
            Configurações
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
