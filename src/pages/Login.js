import React from 'react';

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

  render() {
    const { name, email } = this.state;
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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
