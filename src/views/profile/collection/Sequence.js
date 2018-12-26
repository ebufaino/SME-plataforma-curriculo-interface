import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_URL } from 'data/constants';
import CollectionActions from 'actions/CollectionActions';
import ConfirmActions from 'actions/ConfirmActions';
import iconCheck from 'images/icons/check.png';
import iconDelete from 'images/icons/delete.svg';
import styles from './Sequence.scss';

class Sequence extends React.PureComponent {
  onClickedConfirm = () => {
    this.props.removeSequence(this.props.collectionId, this.props.id);
    this.props.loadSequences(this.props.collectionId);
  };

  onClickedDelete = () => {
    this.props.openConfirm(
      'Excluir sequência?',
      'Você não poderá reverter esta ação.',
      'Excluir',
      'Cancelar',
      this.onClickedConfirm
    );
  };

  render() {
    const { component, componentColor, isCompleted, slug, title } = this.props;

    const image = API_URL + this.props.image_attributes.default_url;

    const link = `/sequencia/${slug}`;

    const bar = isCompleted ? (
      <div className={styles.bar}>
        <span>
          <img src={iconCheck} alt="Sequência realizada" />
          Sequência realizada
        </span>
        <button>Avaliar</button>
      </div>
    ) : null;

    return (
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <div className={styles.wrapper}>
          <div className={styles.item}>
            <NavLink className={styles.image} to={link}>
              <img src={image} alt={title} />
            </NavLink>
            <div className={styles.info}>
              <NavLink className={styles.text} to={link}>
                <h4 style={{ color: componentColor }}>{component}</h4>
                <h3>{title}</h3>
              </NavLink>
              <button onClick={this.onClickedDelete}>
                <img src={iconDelete} alt="Excluir" />
              </button>
            </div>
          </div>
          {bar}
        </div>
      </div>
    );
  }
}

Sequence.propTypes = {
  collectionId: PropTypes.number.isRequired,
  component: PropTypes.string.isRequired,
  componentColor: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  openConfirm: PropTypes.func.isRequired,
  loadSequences: PropTypes.func.isRequired,
  removeSequence: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    openConfirm: (title, message, labelYes, labelNo, onConfirm) => {
      dispatch(
        ConfirmActions.open(title, message, labelYes, labelNo, onConfirm)
      );
    },
    loadSequences: collectionId => {
      dispatch(CollectionActions.loadSequences(collectionId));
    },
    removeSequence: (collectionId, sequenceId) => {
      dispatch(CollectionActions.removeSequence(collectionId, sequenceId));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Sequence);
