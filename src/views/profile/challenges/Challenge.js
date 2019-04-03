import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_URL } from 'data/constants';
import ChallengeActions from 'actions/ChallengeActions';
import ConfirmActions from 'actions/ConfirmActions';
import createModalLink from 'utils/createModalLink';
import iconCheck from 'images/icons/check.png';
import iconDelete from 'images/icons/delete.svg';
import styles from 'views/profile/collection/Sequence.scss';

class Challenge extends React.PureComponent {
  onClickedConfirm = () => {
    this.props.removeChallenge(this.props.id);
  };

  onClickedDelete = () => {
    this.props.openConfirm(
      'Excluir este desafio?',
      'Esta ação remove o desafio da sua lista mas não exclui os resultados previamente enviados por você.',
      'Excluir',
      'Cancelar',
      this.onClickedConfirm
    );
  };

  render() {
    const {
      component,
      image,
      hasPerformed,
      slug,
      title,
    } = this.props;

    const link = `/desafio/${slug}`;

    const thumbnail = image.default_url ? (
      <NavLink className={styles.image} to={link}>
        <img
          src={API_URL + image.default_url}
          srcSet={`${API_URL}${image.thumb.url}, ${API_URL}${
            image.extra_thumb.url
          } 2x`}
          alt=""
        />
      </NavLink>
    ) : (
      <div className={styles.initials}>
        {component.name
          .split(' ')
          .map(s => s.charAt(0))
          .join('')}
      </div>
    );

    let bar = null;
    if (hasPerformed) {
      const link = createModalLink(`/desafio/${slug}/resultado`);
      
      bar = (
        <div className={styles.bar}>
          <span>
            <img src={iconCheck} alt="Desafio realizado" />
            Desafio realizado
          </span>
          <NavLink to={link}>Veu meu resultado</NavLink>
        </div>
      );
    }

    return (
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <div className={styles.wrapper}>
          <div className={styles.item}>
            {thumbnail}
            <div className={styles.info}>
              <NavLink className={styles.text} to={link}>
                <h4 style={{ color: component.color }}>{component.name}</h4>
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

Challenge.propTypes = {
  id: PropTypes.number.isRequired,
  component: PropTypes.object.isRequired,
  hasPerformed: PropTypes.bool,
  image: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  openConfirm: PropTypes.func.isRequired,
  removeChallenge: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    openConfirm: (title, message, labelYes, labelNo, onConfirm) => {
      dispatch(
        ConfirmActions.open(title, message, labelYes, labelNo, onConfirm)
      );
    },
    removeChallenge: id => {
      dispatch(ChallengeActions.delete(id));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Challenge);
