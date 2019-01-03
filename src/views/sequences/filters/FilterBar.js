import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ActiveItem from './ActiveItem';
import FiltersActions from 'actions/FiltersActions';
import OrderButton from './OrderButton';
import QueryField from './QueryField';
import getWindowWidth from 'utils/getWindowWidth';
import iconFilters from 'images/icons/filters.svg';
import styles from './FilterBar.scss';

class FilterBar extends Component {
  componentDidMount() {
    this.target = document.querySelector('#sustainableDevGoal');
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  onClickedToggle = () => {
    this.props.togglePanel();

    if (getWindowWidth() < 768) {
      disableBodyScroll(this.target);
    }
  };

  render() {
    const filters = this.props.filters.concat(this.props.filtersExtra);

    const items = filters.map((item, i) => {
      return <ActiveItem key={i} data={item} />;
    });

    const spacer = items.length ? <div className={styles.spacer} /> : null;

    return (
      <div className={styles.wrapper}>
        <div>
          <QueryField />
          {spacer}
          <div className={styles.list}>{items}</div>
        </div>
        <div className={styles.row}>
          <button className={styles.button} onClick={this.onClickedToggle}>
            <img src={iconFilters} alt="Filtros" />
            Filtros
          </button>
          <OrderButton />
        </div>
      </div>
    );
  }
}

FilterBar.propTypes = {
  filters: PropTypes.array.isRequired,
  togglePanel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    filters: state.FiltersReducer.filters.filter(item => item.isActive),
    filtersExtra: state.FiltersReducer.filtersExtra.filter(
      item => item.isActive
    ),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePanel: () => {
      dispatch(FiltersActions.togglePanel());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
