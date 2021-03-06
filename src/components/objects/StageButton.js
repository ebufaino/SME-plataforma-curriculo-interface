import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './StageButton.scss';

class StageButton extends Component {
  onClicked = async () => {
    await this.props.toggleStages(this.props.data);
    await this.props.getYears(this.props.data);
  };

  render() {
    const { data } = this.props;
    const { id, isActive, name, color } = data;

    const classes = isActive
      ? [styles.wrapper, styles.isActive]
      : [styles.wrapper];
    const style = isActive
      ? {
          backgroundColor: color,
          borderColor: color,
        }
      : {};

    return (
      <button
        className={classes.join(' ')}
        style={style}
        onClick={this.onClicked}
      >
        {name}
      </button>
    );
  }
}

StageButton.propTypes = {
  data: PropTypes.object.isRequired,
  toggleStages: PropTypes.func.isRequired,
  getYears: PropTypes.func.isRequired,
};

export default StageButton;
