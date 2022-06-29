import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  getGravatarHash = () => {
    const { user: { email } } = this.props;
    const hashGravatar = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hashGravatar}`;
    return url;
  }

  render() {
    const { user: { name } } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ this.getGravatarHash() }
          alt="Avatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Header.propTypes = {
  user: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps)(Header);
