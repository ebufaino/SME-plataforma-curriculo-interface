import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Sticky from 'react-stickynode';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { API_URL } from 'data/constants';
import ActivityActions from 'actions/ActivityActions';
import BodyActions from 'actions/BodyActions';
import GenericItem from 'components/objects/GenericItem';
import ModuleExercise from './ModuleExercise';
import ModuleGallery from './ModuleGallery';
import ModuleImage from './ModuleImage';
import ModuleLongText from './ModuleLongText';
import ModuleQuestion from './ModuleQuestion';
import ModuleStudent from './ModuleStudent';
import ModuleTable from './ModuleTable';
import ModuleTeacher from './ModuleTeacher';
import Page from 'components/Page';
import convertQuillToHtml from 'utils/convertQuillToHtml';
import getActivityTypeIcon from './getActivityTypeIcon';
import getWindowWidth from 'utils/getWindowWidth';
import arrowLeft from 'images/arrow/left.svg';
import arrowRight from 'images/arrow/right.svg';
import iconClock from 'images/icon/clockWhite.svg';
import iconPrint from 'images/icon/print.svg';
import imgPlaceholder from 'images/placeholder.jpg';
import styles from './Activity.scss';

class Activity extends Component {
  onResized = () => {
    const totalWidth = getWindowWidth();
    this.setState({ totalWidth });
  }

  componentWillMount() {
    this.onResized();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResized);
    const params = this.props.match.params;
    this.props.load(params.slug1, params.slug2);
  }

  componentDidUpdate(prevProps) {
    const params = this.props.match.params;
    const prevParams = prevProps.match.params;
    if (params.slug2 !== prevParams.slug2) {
      this.props.load(params.slug1, params.slug2);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResized);
  }

  render() {
    if (this.props.data == null) {
      return <span />;
    }

    const data = this.props.data;
    const sequence = data.activity_sequence;

    const filters = [
      <GenericItem key={0} data={{name: sequence.year}} />,
      <GenericItem key={1} data={sequence.main_curricular_component} />,
    ];

    let duration = null;
    if (data.estimated_time) {
      const word = data.estimated_time > 1 ? 'aulas' : 'aula';
      duration = (
        <div className={styles.duration}>
          <img src={iconClock} alt="Número de aulas" />
          <div>
            <em>{data.estimated_time}</em>
            {word}
          </div>
        </div>
      );
    }

    const iconsItems = data.activity_types.map((item, i) => {
      const icon = getActivityTypeIcon(item.name);
      return (
        <li key={i}>
          <img src={icon} alt={item.name} />
          <div>{item.name}</div>
        </li>
      );
    });

    const icons = (
      <ul className={styles.icons}>
        {iconsItems}
      </ul>
    );
    
    const sequenceImage = data.image_attributes.default_url ? (
      <img
        className={styles.sequenceImage}
        src={API_URL + data.image_attributes.default_url}
        srcSet={`${API_URL}${data.image_attributes.large.url}, ${API_URL}${data.image_attributes.extra_large.url} 2x`}
        alt={sequence.title} />
    ) : null;

    const image = data.image_attributes.default_url ? (
      <img
        className={styles.image}
        src={API_URL + data.image_attributes.default_url}
        srcSet={`${API_URL}${data.image_attributes.large.url}, ${API_URL}${data.image_attributes.extra_large.url} 2x`}
        alt={data.title} />
    ) : null;

    const content = convertQuillToHtml(data.content);
    
    const linkChars = `/sequencia/${sequence.slug}/atividade/${this.props.match.params.slug2}/caracteristicas`;
    const linkPrint = `/imprimir/sequencia/${sequence.slug}/atividade/${this.props.match.params.slug2}`;
    const linkPrev = `/sequencia/${sequence.slug}/atividade/${data.last_activity}`;
    const linkNext = `/sequencia/${sequence.slug}/atividade/${data.next_activity}`;
    const link = `/sequencia/${sequence.slug}`;

    const arrowPrev = data.last_activity ? (
      <NavLink className={styles.prev} to={linkPrev}>
        <img src={arrowLeft} alt="Seta" />
        Atividade {data.sequence - 1}
      </NavLink>
    ) : <span />;

    const arrowNext = data.next_activity ? (
      <NavLink className={styles.next} to={linkNext}>
        Atividade {data.sequence + 1}
        <img src={arrowRight} alt="Seta" />
      </NavLink>
    ) : null;

    return (
      <Page>
      <section className={styles.wrapper}>
        <Sticky>
          <div className={styles.sequence}>
            {sequenceImage}
            <div>
              <p>Sequência de atividades</p>
              <NavLink to={link}>
                <h1>{sequence.title}</h1>
              </NavLink>
            </div>
            <button className={styles.btnSave}>
              <img src={iconPrint} alt="Salvar" />
              Salvar
            </button>
          </div>
        </Sticky>
        <header className={styles.header}>
          <div className={styles.banner}>
            {image}
            <ul>
              {filters}
            </ul>
            {duration}
          </div>
          <div className={styles.info}>
            <div>
              <p>Atividade {data.sequence}</p>
              <h1>{data.title}</h1>
            </div>
          </div>
          <NavLink className={styles.btnInfo} to={linkChars}>
            Ver características
          </NavLink>
          <NavLink className={styles.btnPrint} to={linkPrint}>
            <img src={iconPrint} alt="Imprimir" />
            Imprimir
          </NavLink>
        </header>
        <div className="container">
          <div className="row">
            <div className={styles.description}>
              <ModuleTable
                data={[
                  ['Frozen yoghurt', 159, 6.0],
                  ['Ice cream sandwich', 237, 9.0],
                  ['Eclair', 262, 16.0],
                  ['Cupcake', 305, 3.7],
                  ['Gingerbread', 356, 16.0],
                  ['Ice cream sandwich', 237, 9.0],
                  ['Eclair', 262, 16.0],
                  ['Cupcake', 305, 3.7],
                  ['Gingerbread', 356, 16.0],
                  ['Frozen yoghurt', 159, 6.0],
                  ['Eclair', 262, 16.0],
                  ['Cupcake', 305, 3.7],
                  ['Gingerbread', 356, 16.0],
                  ['Frozen yoghurt', 159, 6.0],
                  ['Ice cream sandwich', 237, 9.0],
                ]}
              />
              <ModuleTeacher
                text="<p>Apresentar a história de Beethoven e possibilitar a escuta de algumas de suas composições, pode enriquecer essa contextualização, além de ampliar o repertório musical das crianças. Há alguns vídeos na internet que, além de possibilitarem a escuta de trechos de composições, abordam aspectos da biografia de Beethoven, tais como:</p><p>Durante o próximo exercício que é a observação das imagens é importante que você interaja com os(as) estudantes, buscando que eles(as) descrevam cada uma delas. Além disso, poderá questioná-los(las) sobre quais tipos de sons podem ser presenciados em cada uma das situações.</p>"
              />
              <ModuleStudent
                text="<p>Essa atividade tem como abordagens temáticas as práticas e processos de investigação, propiciando a utilização de diferentes ferramentas e recursos para propor as estratégias e hipóteses para resolver as situações observadas. A prática científica tem como plano de trabalho a transformação de curiosidades em ações de investigação. Ciclo investigativo: conceitualização e investigação.</p>"
              />
              <ModuleQuestion
                number={1}
                title="Leia o texto abaixo:"
              />
              <ModuleExercise
                type="roda-de-conversa"
                text="<p>Converse com seus colegas sobre como vocês imaginam ser possível alguém que não escuta poder compor e tocar músicas.</p><ol><li>Desenhe e explique, em seu caderno, como você acha que os sons são produzidos e percebidos pelas pessoas que escutam.</li><li>Desenhe e explique como você acha que Beethoven conseguia perceber o som de suas composições ao piano.</li></ol>"
              />
              <ModuleLongText
                title="Narrativa de Victor Frankenstein"
                text="Como pode o verme ser o herdeiro das maravilhas de um olho ou de um cérebro?<br/>Era o que eu pensava enquanto me debruçava, com um misto de nojo e fascínio, sobre os corpos em decomposição no laboratório. Nenhum prazer da juventude me deixaria tão realizado quanto a tarefa a que eu me entregara.<br/>Dois anos antes, quando fiz dezessete anos, meu pai, Alphonse Frankenstein, me mandara para a universidade de Ingolstadt, no Sul da Alemanha. Já me apaixonara por química no colégio em Genebra, mas ele achou importante que eu completasse os estudos fora da Suíça. E foi em Ingolstadt, ao assistir às aulas de herr Waldman, que passei a admirar os velhos alquimistas.<br/>Como pode o verme ser o herdeiro das maravilhas de um olho ou de um cérebro?<br/>Era o que eu pensava enquanto me debruçava, com um misto de nojo e fascínio, sobre os corpos em decomposição no laboratório. Nenhum prazer da juventude me deixaria tão realizado quanto a tarefa a que eu me entregara.<br/>Dois anos antes, quando fiz dezessete anos, meu pai, Alphonse Frankenstein, me mandara para a universidade de Ingolstadt, no Sul da Alemanha. Já me apaixonara por química no colégio em Genebra, mas ele achou importante que eu completasse os estudos fora da Suíça. E foi em Ingolstadt, ao assistir às aulas de herr Waldman, que passei a admirar os velhos alquimistas."
              />
              <ModuleGallery
                images={[
                  {
                    original: imgPlaceholder,
                    description: 'Lorem ipsum dolor!',
                  },
                  {
                    original: imgPlaceholder,
                    description: 'Lorem ipsum dolor sit amet!',
                  },
                  {
                    original: imgPlaceholder,
                    description: 'Lorem ipsum dolor sit amet! Lorem ipsum dolor sit amet! Lorem ipsum dolor sit amet! Lorem ipsum dolor sit amet! Lorem ipsum dolor sit amet! <em>Lorem ipsum dolor sit amet!</em> Lorem ipsum dolor sit amet!',
                  },
                ]}
              />
              <ModuleImage
                src={imgPlaceholder}
                alt="Lorem ipsum"
                source="Fonte: Adaptado de <em>A Surdez de Beethoven, o Desafio de um Gênio</em>"
              />
            </div>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{__html: content}}
            />
          </div>
        </div>
        <hr />
        <div className={styles.arrows}>
          {arrowPrev}
          {arrowNext}
        </div>
        <div className={styles.footer}>
          <NavLink className={styles.back} to={link}>
            Voltar para a sequência
          </NavLink>
        </div>
        <ReactTooltip
          place="bottom"
          type="dark"
          effect="solid"
          id="tooltipLearningObjectives"
          className="tooltip">
          <strong>O que são os objetivos de aprendizagem?</strong>
          <p>O desenvolvimento que procura satisfazer as necessidades da geração atual, sem comprometer a capacidades das gerações futuras de satisfazerem as suas próprias necessidades.</p>
        </ReactTooltip>
      </section>
      </Page>
    );
  }
}

Activity.propTypes = {
  data: PropTypes.object,
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: (slug1, slug2) => {
      dispatch(BodyActions.showLoading());
      dispatch(ActivityActions.load(slug1, slug2));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
