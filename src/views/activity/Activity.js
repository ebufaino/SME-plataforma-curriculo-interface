import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ActivityActions from 'actions/ActivityActions';
import ActivityChars from './chars/ActivityChars';
import ActivityCharsMobile from './chars/ActivityCharsMobile';
import BodyActions from 'actions/BodyActions';
import Cover from 'views/sequence/Cover';
import Page from 'components/layout/Page';
import SequenceActions from 'actions/SequenceActions';
import SequencePreview from './SequencePreview';
import Title from 'views/sequence/Title';
import Tooltips from 'components/Tooltips';
import convertQuillToHtml from 'utils/convertQuillToHtml';
import getContentBlocks from 'utils/getContentBlocks';
import isLogged from 'data/isLogged';
import arrowLeft from 'images/arrows/left.svg';
import arrowRight from 'images/arrows/right.svg';
import styles from 'views/sequence/Sequence.scss';
import styles1 from './Activity.scss';

class Activity extends Component {
  state = {
    isCharsExpanded: false,
  };

  onClickedChars = () => {
    this.setState({
      isCharsExpanded: !this.state.isCharsExpanded,
    });
  };

  componentDidMount() {
    const params = this.props.match.params;
    this.props.load(params.slug1, params.slug2);

    if (this.props.location.pathname.match(/imprimir/)) {
      window.print();
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.match.params;
    const prevParams = prevProps.match.params;
    if (params.slug2 !== prevParams.slug2) {
      this.props.load(params.slug1, params.slug2);
    }
  }

  render() {
    if (this.props.data == null) {
      return <span />;
    }

    const { data, isSaved } = this.props;
    const sequence = data.activity_sequence;

    const contentBlocks = data.content_blocks
      ? getContentBlocks(data.content_blocks)
      : null;

    const linkPrev = `/atividade/${sequence.slug}/${data.last_activity}`;
    const linkNext = `/atividade/${sequence.slug}/${data.next_activity}`;
    const linkSequence = `/sequencia/${sequence.slug}`;

    const arrowPrev = data.last_activity ? (
      <NavLink className={styles1.prev} to={linkPrev}>
        <img src={arrowLeft} alt="Seta" />
        Atividade {data.sequence - 1}
      </NavLink>
    ) : (
      <span />
    );

    const arrowNext = data.next_activity ? (
      <NavLink className={styles1.next} to={linkNext}>
        Atividade {data.sequence + 1}
        <img src={arrowRight} alt="Seta" />
      </NavLink>
    ) : null;

    return (
      <Page>
        <section className={styles.wrapper}>
          <SequencePreview isInActivity isSaved={isSaved} sequence={sequence} />
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-lg-8">
                <Cover data={data} sequence={sequence} />
                <Title
                  slug={sequence.slug}
                  text={`Atividade ${data.sequence}`}
                  title={data.title}
                />
                <button
                  className={styles.btnChars}
                  onClick={this.onClickedChars}
                >
                  Ver características
                </button>
                <div className={styles.description}>{contentBlocks}</div>
              </div>
              <div className={styles.chars}>
                <ActivityChars data={this.props.data} />
              </div>
            </div>
          </div>
          <hr />
          <div className={styles1.arrows}>
            {arrowPrev}
            {arrowNext}
          </div>
          <div className={styles1.footer}>
            <NavLink className={styles1.back} to={linkSequence}>
              Voltar para a sequência
            </NavLink>
          </div>
          <ActivityCharsMobile
            data={this.props.data}
            isExpanded={this.state.isCharsExpanded}
            onBack={this.onClickedChars}
          />
          <Tooltips />
        </section>
      </Page>
    );
  }
}

Activity.propTypes = {
  data: PropTypes.object,
  isSaved: PropTypes.bool,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  let slug = '';
  if (ownProps.match) {
    const params = ownProps.match.params;
    slug = `${params.slug1}_${params.slug2}`;
  } else {
    slug = `${ownProps.slug1}_${ownProps.slug2}`;
  }

  return {
    data: state.ActivityReducer[slug],
    isSaved: state.SequenceReducer.isSaved,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: (slug1, slug2) => {
      dispatch(BodyActions.showLoading());
      dispatch(ActivityActions.load(slug1, slug2));
      if (isLogged()) {
        dispatch(SequenceActions.loadCollections(slug1));
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
