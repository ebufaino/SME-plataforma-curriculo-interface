import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from 'views/profile/Avatar';
import BodyActions from 'actions/BodyActions';
import Fade from '@material-ui/core/Fade';
import LoginPopover from 'components/popovers/LoginPopover';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ProfilePopover from 'components/popovers/ProfilePopover';
import isLogged from 'data/isLogged';
import chevronDown from 'images/chevrons/down.svg';
import styles from './Header.scss';

class Header extends Component {
  state = { anchor: null };

  onClickedToggler = () => {
    this.props.showMobileMenu();
  };

  onClosePopover = () => {
    this.setState({ anchor: null });
  };

  onMouseEnter = e => {
    this.setState({ anchor: e.currentTarget });
  };

  onMouseLeave = e => {
    this.setState({ anchor: null });
  };

  render() {
    const data = [
      {
        to: '/',
        label: 'Home',
      },
      {
        to: '/sequencias',
        label: 'Sequências de Atividades',
      },
      {
        to: '/curriculo',
        label: 'Currículo da Cidade',
      },
      {
        to: '/descobrir',
        label: 'O que vem por aí',
      },
    ];

    const { anchor } = this.state;
    const hasPopover = !!anchor;

    const links = data.map((item, i) => {
      return (
        <NavLink key={i} to={item.to} onClick={this.onClickedClose}>
          {item.label}
        </NavLink>
      );
    });

    const avatar = isLogged() ? (
      <button className={styles.avatar} onMouseEnter={this.onMouseEnter}>
        <Avatar nickname="Marília" size={35} />
        <img src={chevronDown} alt="Perfil" />
      </button>
    ) : null;

    const btnLogin = <button onMouseEnter={this.onMouseEnter}>Login</button>;

    const popoverContents = isLogged() ? (
      <ProfilePopover onMouseLeave={this.onMouseLeave} />
    ) : (
      <LoginPopover onMouseLeave={this.onMouseLeave} />
    );

    const popover = (
      <Popper
        open={hasPopover}
        anchorEl={anchor}
        onClose={this.onClosePopover}
        placement="bottom-end"
        disablePortal
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={300}>
            <Paper>{popoverContents}</Paper>
          </Fade>
        )}
      </Popper>
    );

    return (
      <Headroom disableInlineStyles>
        <header className={styles.wrapper}>
          <NavLink to="/">
            <div className={styles.logo}>
              <span className={styles.logoImage} />
              <h1>Currículo Digital da Cidade de São Paulo</h1>
            </div>
          </NavLink>
          <nav className={styles.menu}>
            {links}
            {avatar || btnLogin}
          </nav>
          <div className={styles.mobile}>
            {avatar}
            <button
              className={styles.toggler}
              onClick={this.onClickedToggler}
            />
          </div>
          {popover}
        </header>
      </Headroom>
    );
  }
}

Header.propTypes = {
  showMobileMenu: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    showMobileMenu: () => {
      dispatch(BodyActions.showMobileMenu());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Header);
