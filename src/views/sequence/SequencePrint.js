import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { API_URL } from 'utils/constants';
import BodyActions from 'actions/BodyActions';
import SequencesActions from 'actions/SequencesActions';
import ActivityPrint from 'views/activity/ActivityPrint';
import CurricularComponentItem from 'components/objects/CurricularComponentItem';
import ExpandableLearningObjectiveItem from 'components/objects/ExpandableLearningObjectiveItem';
import GenericItem from 'components/objects/GenericItem';
import KnowledgeMatrixItem from 'components/objects/KnowledgeMatrixItem';
import SustainableDevGoalItem from 'components/objects/SustainableDevGoalItem';
import convertQuillToHtml from 'utils/convertQuillToHtml';
import iconClock from 'images/icon/clock.svg';
import styles from './Sequence.scss';

let hasPrinted = false;

class SequencePrint extends Component {
  componentDidMount() {
    this.props.loadItem(this.props.match.params.slug);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.data && this.props.data && !hasPrinted) {
      hasPrinted = true;
      setTimeout(window.print, 2000);
    }
  }

  render() {
    const data = this.props.data;

    if (!data) {
      return <span />;
    }

    const filters = [
      <GenericItem key={0} data={{name: `${data.year} ano`}} />,
      <GenericItem key={1} data={data.main_curricular_component} />,
    ];

    const relatedComponents = data.curricular_components.map((item, i) => {
      return (
        <CurricularComponentItem key={i} data={item} isColored={false} />
      );
    });

    const knowledgeMatrices = data.knowledge_matrices.map((item, i) => {
      return (
        <KnowledgeMatrixItem key={i} data={item} />
      );
    });

    const learningObjectives = data.learning_objectives.map((item, i) => {
      return (
        <ExpandableLearningObjectiveItem key={i} data={item} isExpanded={i === 0} />
      );
    });

    const sustainableDevGoals = data.sustainable_development_goals.map((item, i) => {
      return (
        <SustainableDevGoalItem key={i} data={item} />
      );
    });
    
    let booksTitle = null; 
    let booksContents = null;

    if (data.books) {
      const booksHtml = convertQuillToHtml(data.books);
      if (booksHtml !== '<p><br/></p>') {
        booksTitle = <div className={styles.title}>Para saber mais:</div>;
        booksContents = <div dangerouslySetInnerHTML={{__html: booksHtml}} />;
      }
    }

    const activities = data.activities.map((item, i) => {
      return (
        <ActivityPrint key={i} slug1={this.props.match.params.slug} slug2={item.slug} />
      );
    });

    const image = data.image_attributes.default_url ? (
        <img
          className={styles.image}
          src={API_URL + data.image_attributes.default_url}
          srcSet={`${API_URL}${data.image_attributes.large.url}, ${API_URL}${data.image_attributes.extra_large.url} 2x`}
          alt={data.title} />
      ) : null;

    const word = data.estimated_time > 1 ? 'aulas' : 'aula';
    const duration = `${data.estimated_time} ${word}`;

    return (
      <section className={styles.wrapper}>
        <header className={styles.header}>
          <div>
            <h1>{data.title}</h1>
            <ul>
              {filters}
            </ul>
            <div className={styles.duration}>
              <img src={iconClock} alt="Número de aulas" />
              <strong>{duration}</strong>
              (Tempo estimado)
            </div>
          </div>
        </header>
        <hr />
        <div className={styles.details}>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div className={styles.title}>
                Componentes relacionados
              </div>
              <ul>
                {relatedComponents}
              </ul>
              <div className={styles.title}>
                Matriz de saberes
              </div>
              <ul>
                {knowledgeMatrices}
              </ul>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div className={styles.title}>
                Objetivos de aprendizagem
              </div>
              <ul>
                {learningObjectives}
              </ul>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
              <div className={styles.title}>
                Objetivos de Desenvolvimento Sustentável (ODS)
              </div>
              <ul>
                {sustainableDevGoals}
              </ul>
              {booksTitle}
              {booksContents}
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          {image}
          <div className={styles.description}>
            {data.presentation_text}
          </div>
          <h4>Atividades</h4>
          <ul>
            {activities}
          </ul>
        </div>
      </section>
    );
  }
}

SequencePrint.propTypes = {
  data: PropTypes.object,
  loadItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    data: state.SequencesReducer.currItem,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadItem: (slug) => {
      dispatch(BodyActions.showLoading());
      dispatch(SequencesActions.loadItem(slug));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SequencePrint);
