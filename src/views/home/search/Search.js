import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history } from 'index';
import AlertActions from 'actions/AlertActions';
import CurricularComponentField from './CurricularComponentField';
import FiltersActions from 'actions/FiltersActions';
import SearchField from './SearchField';
import YearField from './YearField';
import styles from './Search.scss';

class Search extends Component {
  onClicked = () => {
    const { filters, query } = this.props;
    const activeFilters = filters.filter(item => item.isActive);
    if (activeFilters.length > 0 || query) {
      history.push('/sequencias', { isSearch: true });
    } else {
      this.props.openAlert(
        'Selecione pelo menos um ano ou componente curricular para encontrar sequências de atividades.'
      );
    }
  };

  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <p>Encontre sequências de atividades para a sala de aula</p>
        <div className={styles.box}>
          <SearchField />
          <YearField />
          <CurricularComponentField />
          <button className={styles.btn1} onClick={this.onClicked}>
            Buscar
          </button>
        </div>
        <button className={styles.btn2} onClick={this.onClicked}>
          Buscar
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  filters: PropTypes.array,
  query: PropTypes.string,
  load: PropTypes.func.isRequired,
  openAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    filters: state.FiltersReducer.filters,
    query: state.FiltersReducer.query,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch(FiltersActions.load());
    },
    openAlert: message => {
      dispatch(AlertActions.open(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
