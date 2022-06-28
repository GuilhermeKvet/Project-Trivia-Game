import React from 'react';
import PropTypes from 'prop-types';
import { fetchApi } from '../actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  habilitaBtn = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) return false;
    return true;
  }

  receiveToken = async () => {
    const { history } = this.props;
    const response = await fetchApi();
    localStorage.setItem('token', response.token);
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <div>
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
        <br />
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
        <br />
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
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Login;
