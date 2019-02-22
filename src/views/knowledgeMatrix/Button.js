import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import createModalLink from 'utils/createModalLink';
import styles from './Button.scss';

class Button extends Component {
  render() {
    const link = createModalLink(
      `/matriz-de-saberes/${this.props.data.sequence}`
    );

    return (
      <div className="col-md-6 col-lg-4">
        <NavLink to={link} className={styles.wrapper}>
          <div className={styles.number}>{this.props.data.sequence}</div>
          <div className={styles.label}>{this.props.data.title}</div>
        </NavLink>
      </div>
    );
  }
}

Button.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Button;
