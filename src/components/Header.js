import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUrl } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    this.getGravatarHash();
  }

  getGravatarHash = () => {
    const { dispatch, player: { email } } = this.props;
    const hashGravatar = md5(email).toString();
    this.url = `https://www.gravatar.com/avatar/${hashGravatar}`;
    dispatch(addUrl(this.url));
  }

  render() {
    const { player: { name, score } } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ this.url }
          alt="Avatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.objectOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
