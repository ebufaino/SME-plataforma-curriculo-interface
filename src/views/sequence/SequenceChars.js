import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ExpandableLearningObjectiveItem from 'components/objects/ExpandableLearningObjectiveItem';
import GenericItem from 'components/objects/GenericItem';
import KnowledgeMatrixItem from 'components/objects/KnowledgeMatrixItem';
import MobileModal from 'components/layout/MobileModal';
import ModalPage from 'components/layout/ModalPage';
import SimpleHeader from 'components/header/SimpleHeader';
import SustainableDevGoalItem from 'components/objects/SustainableDevGoalItem';
import Tooltips from 'components/Tooltips';
import iconHelp from 'images/icons/help.svg';
import iconPrint from 'images/icons/print.svg';
import styles from './SequenceChars.scss';

class SequenceChars extends Component {
  state = { isShowingAllLearningObjectives: false };
  
  onClickedAllLearningObjectives = () => {
    this.setState({ isShowingAllLearningObjectives: true });
  }

  render() {
    const data = this.props.data;

    if (!data) {
      return <span />;
    }

    // HACK: filter repeated curricular components, should fix data coming from API
    const uniqueCurricularComponents = data.curricular_components.filter((component, index, self) =>
      index === self.findIndex((t) => (
        t.name === component.name
      ))
    );

    const relatedComponents = uniqueCurricularComponents.map((item, i) => {
      return (
        <GenericItem key={i} data={item} />
      );
    });

    const knowledgeMatrices = data.knowledge_matrices.map((item, i) => {
      return (
        <KnowledgeMatrixItem key={i} data={item} isLink={true} />
      );
    });

    const learningObjectivesList = this.state.isShowingAllLearningObjectives ? data.learning_objectives : data.learning_objectives.slice(0, 3);

    const learningObjectives = learningObjectivesList.map((item, i) => {
      return (
        <ExpandableLearningObjectiveItem key={i} data={item} isExpanded={i === 0} />
      );
    });

    const btnAllLearningObjectives = learningObjectivesList.length === data.learning_objectives.length ? null : (
      <button className={styles.btnAllLearningObjectives} onClick={this.onClickedAllLearningObjectives}>
        Ver Todos os Objetivos
      </button>
    );

    const sustainableDevGoals = data.sustainable_development_goals.map((item, i) => {
      return (
        <SustainableDevGoalItem key={i} data={item} isLink={true} />
      );
    });

    const linkPrint = `/imprimir/sequencia/xxx`;

    return (
        <div>
          <SimpleHeader
            back={true}
            title="Características"
          />

          <div className={styles.title}>
            Componentes relacionados
          </div>
          <ul>
            {relatedComponents}
          </ul>
        
          <div className={styles.title}>
            Objetivos de aprendizagem
            <button data-tip data-for="tooltipLearningObjectives">
              <img src={iconHelp} alt="Ajuda" />
            </button>
          </div>
          <ul>
            {learningObjectives}
          </ul>
          {btnAllLearningObjectives}
        
          <div className={styles.title}>
            Objetivos de Desenvolvimento Sustentável (ODS)
            <button data-tip data-for="tooltipDevelopmentGoals">
              <img src={iconHelp} alt="Ajuda" />
            </button>
          </div>
          <ul>
            {sustainableDevGoals}
          </ul>
            
          <div className={styles.title}>
            Matriz de saberes
            <button data-tip data-for="tooltipKnowledgeMatrices">
              <img src={iconHelp} alt="Ajuda" />
            </button>
          </div>
          <ul>
            {knowledgeMatrices}
          </ul>

          <NavLink className={styles.btnPrint} to={linkPrint}>
            <img src={iconPrint} alt="Imprimir" />
            Imprimir
          </NavLink>
          
          <Tooltips />
        </div>
    );
  }
}

SequenceChars.propTypes = {
  data: PropTypes.object,
  isExpanded: PropTypes.bool,
};

export default SequenceChars;
