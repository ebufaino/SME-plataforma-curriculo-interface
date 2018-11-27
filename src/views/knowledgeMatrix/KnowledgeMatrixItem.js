import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import BodyActions from '../../actions/BodyActions';
import KnowledgeMatrixActions from '../../actions/KnowledgeMatrixActions';
import iconCloseBig from '../../images/iconCloseBig.svg';
import styles from './KnowledgeMatrixItem.css';

class KnowledgeMatrixItem extends Component {
  constructor(props) {
    super(props);
    this.state = { animationStatus: null };
  }

  onClickedClose() {
    this.context.router.history.goBack();
  }

  onEntered() {
    this.setState({ animationStatus: 'entered' });
  }

  componentDidMount() {
    this.props.showModal();
    if (this.props.data.length <= 0) {
      this.props.load();
      this.setState({ animationStatus: 'appeared' });
    }
    else {
      this.setState({ animationStatus: 'enter' });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.animationStatus === 'appeared') {
      const index = parseInt(this.props.match.params.index, 10);
      const data = this.props.data.filter(item => item.sequence === index)[0];
      if (data) {
        this.setState({ animationStatus: 'enter' });
        setTimeout(this.onEntered.bind(this), 1000);
      }
    }
  }

  componentWillUnmount() {
    this.props.hideModal();
  }

  render() {
    const index = parseInt(this.props.match.params.index, 10);
    const data = this.props.data.filter(item => item.sequence === index)[0];
    const title = data ? data.title : '';
    const knowDescription = data ? data.know_description : '';
    const forDescription = data ? data.for_description : '';

    const classes = [styles.wrapper];
    if (this.state.animationStatus) {
      classes.push(styles[this.state.animationStatus]);
    }

    return (
      <section className={classes.join(' ')}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className={styles.header}>
                <div className={styles.number}>
                  {index}
                </div>
                <h1>{title}</h1>
              </div>
              <div className={styles.contents}>
                <h2>Saber</h2>
                <p>{knowDescription}</p>
                <h2>Para</h2>
                <p>{forDescription}</p>
                <NavLink to={`/sequencias/matriz-de-saberes/${index}`} className={styles.button}>
                  Ver Sequências de Atividades Relacionadas
                </NavLink>
              </div>
              <button className={styles.close} onClick={this.onClickedClose.bind(this)}>
                <img src={iconCloseBig} alt="Fechar" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

KnowledgeMatrixItem.contextTypes = {
  router: PropTypes.object.isRequired,
};

KnowledgeMatrixItem.propTypes = {
  data: PropTypes.array.isRequired,
  load: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    data: state.KnowledgeMatrixReducer.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch(BodyActions.showLoading());
      dispatch(KnowledgeMatrixActions.load());
    },
    hideModal: () => {
      dispatch(BodyActions.hideModal());
    },
    showModal: () => {
      dispatch(BodyActions.showModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KnowledgeMatrixItem);
