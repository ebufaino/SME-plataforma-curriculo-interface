import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import BigSequencePreview from 'views/sequence/BigSequencePreview';
import CollectionsActions from 'actions/CollectionsActions';
import Collection from './Collection';
import DesktopModal from 'components/layout/DesktopModal';
import ModalHeader from 'components/header/ModalHeader';
import ModalPage from 'components/layout/ModalPage';
import SequencePreview from 'views/activity/SequencePreview';
import SequencesActions from 'actions/SequencesActions';
import createModalLink from 'utils/createModalLink';
import iconPlus from 'images/icons/plus1.svg';
import styles from './SaveSequence.scss';
import styles1 from 'views/sequence/BigSequencePreview.scss';

class SaveSequence extends Component {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    if (!this.props.data || this.props.data.slug !== slug) {
      this.props.load(slug);
    }
    this.props.loadCollections();
  }

  render() {
    if (this.props.data == null) {
      return <span />;
    }

    const { collections, data } = this.props;

    const items = collections.map((item, i) => {
      return <Collection key={i} sequenceId={data.id} {...item} />;
    });

    const base = this.props.location.pathname.match(/sequencias/) ? 'sequencias' : 'sequencia';
    const link = createModalLink(`/${base}/${data.slug}/criar-colecao`);

    const btnCreate = (
      <NavLink className={styles.btnCreate} to={link}>
        <img src={iconPlus} alt="Criar coleção" />
        Criar coleção
      </NavLink>
    );

    return (
      <DesktopModal>
        <ModalPage>
          <ModalHeader title="Salvar sequência" />
          <div className={styles1.row}>
            <div className={styles1.col1}>
              <div
                data-tip
                data-for="tooltipSequenceAlreadySaved"
              >
                <BigSequencePreview sequence={data} />
              </div>
            </div>
            <div className={styles1.col2}>
              <div
                className={styles1.small}
                data-tip
                data-for="tooltipSequenceAlreadySaved"
              >
                <SequencePreview sequence={data} />
                <hr />
              </div>
              <div className={styles.list}>
                <p>Selecione uma coleção</p>
                {items}
              </div>
              <div className={styles.footer}>{btnCreate}</div>
              <ReactTooltip
                place="bottom"
                type="dark"
                effect="solid"
                id="tooltipSequenceAlreadySaved"
                className="tooltip"
              >
                Você já salvou esta sequência em Ciências Naturais 1o ano.
              </ReactTooltip>
            </div>
          </div>
        </ModalPage>
      </DesktopModal>
    );
  }
}

SaveSequence.propTypes = {
  collections: PropTypes.array.isRequired,
  data: PropTypes.object,
  load: PropTypes.func.isRequired,
  loadCollections: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    collections: state.CollectionsReducer.items,
    data: state.SequencesReducer.currItem,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: slug => {
      dispatch(SequencesActions.loadItem(slug));
    },
    loadCollections: () => {
      dispatch(CollectionsActions.load());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveSequence);