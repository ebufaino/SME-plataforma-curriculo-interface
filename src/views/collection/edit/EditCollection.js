import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { history } from 'index';
import Classroom from './Classroom';
import CollectionActions from 'actions/CollectionActions';
import DesktopModal from 'components/layout/DesktopModal';
import ModalPage from 'components/layout/ModalPage';
import ModalFooter from 'components/footer/ModalFooter';
import ModalHeader from 'components/header/ModalHeader';
import styles from './EditCollection.scss';

class EditCollection extends Component {
  state = {
    hasEdited: false,
    name: '',
  };

  componentDidMount() {
    if (this.props.data.name) {
      this.setState({
        ...this.state,
        name: this.props.data.name,
      });
    } else {
      this.props.load(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.name !== this.props.data.name) {
      this.setState({
        ...this.state,
        name: this.props.data.name,
      });
    }
  }

  onChangedName = e => {
    this.setState({
      hasEdited: true,
      name: e.target.value,
    });
  };

  onClickedSave = () => {
    this.props.edit(this.props.match.params.id, this.state.name);
    history.goBack();
  };

  render() {
    const classrooms = [
      {
        color: '#70b279',
        level: 'EJA',
        name: '[2018] Ciências Naturais',
        school: 'EMEF Maria da Silva',
        year: '1A',
      },
      {
        color: '#70b279',
        level: 'EF',
        name: '[2018] Ciências Naturais',
        school: 'EMEF João de Deus',
        year: '2D',
      },
      {
        color: '#70b279',
        level: 'EJA',
        name: '[2018] História',
        school: 'EMEF Maria da Silva',
        year: '1A',
      },
      {
        color: '#70b279',
        level: 'EF',
        name: '[2018] Matemática',
        school: 'EMEF João de Deus',
        year: '2D',
      },
      {
        color: '#70b279',
        level: 'EF',
        name: '[2018] Matemática',
        school: 'EMEF João de Deus',
        year: '3A',
      },
      {
        color: '#70b279',
        level: 'EJA',
        name: '[2018] Matemática',
        school: 'EMEF Maria da Silva',
        year: '3A',
      },
      {
        color: '#70b279',
        level: 'EJA',
        name: '[2017] Ciências Naturais',
        school: 'EMEF Maria da Silva',
        year: '1A',
      },
      {
        color: '#70b279',
        level: 'EF',
        name: '[2017] Ciências Naturais',
        school: 'EMEF João de Deus',
        year: '2D',
      },
    ];

    const items = classrooms.map((classroom, i) => {
      return (
        <Classroom
          key={i}
          color={classroom.color}
          level={classroom.level}
          name={classroom.name}
          school={classroom.school}
          year={classroom.year}
        />
      );
    });

    const isInvalid = this.state.hasEdited && this.state.name.length <= 0;
    const message = isInvalid ? 'Campo obrigatório' : '';

    return (
      <DesktopModal>
        <ModalPage>
          <ModalHeader title="Editar coleção" />
          <header className={styles.header}>
            <TextField
              error={isInvalid}
              fullWidth={true}
              helperText={message}
              inputRef={input => (input ? input.focus() : null)}
              label="Nome da coleção"
              onChange={this.onChangedName}
              value={this.state.name}
            />
          </header>
          <div className={styles.list}>
            <h3>Selecionar turmas (opcional)</h3>
            {items}
          </div>
          <ModalFooter label="Salvar alterações" onClick={this.onClickedSave} />
        </ModalPage>
      </DesktopModal>
    );
  }
}

EditCollection.propTypes = {
  data: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    data: state.CollectionReducer.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    edit: (id, name) => {
      dispatch(CollectionActions.edit(id, name));
    },
    load: id => {
      dispatch(CollectionActions.load(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCollection);
