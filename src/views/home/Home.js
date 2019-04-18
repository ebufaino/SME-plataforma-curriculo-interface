import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import BodyActions from 'actions/BodyActions';
import HomeActions from 'actions/HomeActions';
import GridItem from './GridItem';
import Page from 'components/layout/Page';
import Search from './search/Search';
import iconActivities from 'images/illustrations/activities.svg';
import iconCurriculum from 'images/illustrations/curriculum.svg';
import iconKnowledgeMatrix from 'images/illustrations/knowledgeMatrix.svg';
import iconLearningObjectives from 'images/illustrations/learningObjectives.svg';
import iconSequences from 'images/illustrations/sequences.svg';
import iconSustainableDevGoals from 'images/illustrations/sustainableDevGoals.svg';
import styles from './Home.scss';

class Home extends Component {
  componentDidMount() {
    this.props.load();
    document.body.classList.toggle('isHome', true);
  }

  componentWillUnmount() {
    document.body.classList.toggle('isHome', false);
  }

  render() {
    const sequences = this.props.sequences.map((item, i) => {
      return <GridItem key={i} index={i} data={item} />;
    });

    return (
      <Page>
        <section className={styles.wrapper}>
          <header className={styles.header}>
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <Search />
                </div>
              </div>
            </div>
          </header>
          <div className={styles.intro}>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <p>
                  Nesta plataforma, o currículo da cidade se torna um material
                  vivo e dinâmico, para consulta, inspiração e aplicação em sala
                  de aula. Veja o que já é possível fazer:
                </p>
              </div>
            </div>
            <ul className="row">
              <li className="col-md-4">
                <img
                  src={iconCurriculum}
                  alt="Conhecer e explorar o Currículo da Cidade"
                />
                <div>Conhecer e explorar o Currículo da Cidade</div>
              </li>
              <li className="col-md-4">
                <img src={iconSequences} alt="Buscar sequências" />
                <div>Buscar sequências</div>
              </li>
              <li className="col-md-4">
                <img
                  src={iconActivities}
                  alt="Encontrar conexões entre objetivos e práticas"
                />
                <div>Encontrar conexões entre objetivos e práticas</div>
              </li>
            </ul>
          </div>
          <div className={styles.sequences}>
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <h2>Veja alguns exemplos de Sequências de Atividades</h2>
                </div>
              </div>
              <div className="row">{sequences}</div>
              <NavLink to="/sequencias" className={styles.button}>
                Ver outras sequências
              </NavLink>
            </div>
          </div>
          <div className={styles.curriculum}>
            <h2>O que é o novo Currículo da Cidade</h2>
            <ul className="row">
              <li className="col-md-4">
                <NavLink to="/ods">
                  <img
                    src={iconSustainableDevGoals}
                    alt="Objetivos de Desenvolvimento Sustentável (ODS)"
                  />
                  <div>Objetivos de Desenvolvimento Sustentável (ODS)</div>
                </NavLink>
              </li>
              <li className="col-md-4">
                <NavLink to="/matriz-de-saberes">
                  <img src={iconKnowledgeMatrix} alt="Matriz de Saberes" />
                  <div>Matriz de Saberes</div>
                </NavLink>
              </li>
              <li className="col-md-4">
                <NavLink to="/objetivos-de-aprendizagem">
                  <img
                    src={iconLearningObjectives}
                    alt="Objetivos de Aprendizagem"
                  />
                  <div>Objetivos de Aprendizagem</div>
                </NavLink>
              </li>
            </ul>
            <NavLink to="/curriculo" className={styles.button}>
              Quero saber mais sobre o currículo
            </NavLink>
          </div>
        </section>
      </Page>
    );
  }
}

Home.propTypes = {
  sequences: PropTypes.array.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const items = state.HomeReducer.items;
  return {
    sequences: items.length < 4 ? items : items.slice(0, 4),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch(BodyActions.showLoading());
      dispatch(HomeActions.load());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
