import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import ProfileActions from '../../actions/ProfileActions';
import SimpleFooter from '../common/SimpleFooter';
import SimpleHeader from '../common/SimpleHeader';
import styles from './Profile.scss';
import { API_URL } from '../../constants';

class Profile extends Component {
  state = {
    isUploading: false,
    name: '',
    nickname: '',
    photo: null,
  };

  onChangedNickname = (e) => {
    this.setState({
      ...this.state,
      nickname: e.target.value,
    });
  }

  onClickedAddPhoto = (e) => {
    const files = Array.from(e.target.files);
    const file = files[0];
    this.props.savePhoto(this.props.data.id, file);

    const reader  = new FileReader();
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        photo: reader.result,
      });
    }
    reader.readAsDataURL(file);
  }

  onClickedChangePhoto = (e) => {
    this.onClickedAddPhoto(e);
  }

  onClickedDeletePhoto = () => {
    this.props.deletePhoto();
  }

  onClickedSave = () => {
    this.props.saveNickname(this.props.data.id, this.state.nickname);
  }

  componentDidMount() {
    this.props.load();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.nickname !== prevProps.data.nickname) {
      this.setState({
        ...this.state,
        name: this.props.data.name,
        nickname: this.props.data.nickname,
        photo: API_URL + this.props.data.photo,
      });
    }

    if (this.props.data.isUploading !== prevProps.data.isUploading) {
      this.setState({
        ...this.state,
        isUploading: this.props.data.isUploading,
      });
    }
  }

  render() {
    const hasImage = this.props.data.photo !== null;

    const progress = this.state.isUploading
      ? <div className={styles.progress}>
          <CircularProgress
            size={108}
            thickness={2}
            value={this.state.progress}
          />
        </div>
      : null;

    let actions = null;
    if (this.state.isUploading) {
      actions = (
        <div className={styles.actions}>
          Atualizando...
        </div>
      );
    } else if (hasImage) {
      actions = (
        <div className={styles.actions}>
          <input
            id="photo"
            type="file"
            onChange={this.onClickedAddPhoto}
          />
          <span>&middot;</span>
          <button onClick={this.onClickedDeletePhoto}>
            Deletar
          </button>
        </div>
      );
    } else {
      actions = (
        <div className={styles.actions}>
          <input
            id="photo"
            type="file"
            onChange={this.onClickedAddPhoto}
          />
        </div>
      );
    }

    let imageOrLetter = null;
    if (hasImage) {
      imageOrLetter = (
        <div className={styles.imageWrapper}>
          {progress}
          <img
            className={styles.image}
            src={this.state.photo}
            alt={this.state.name}
          />
        </div>
      );
    } else {
      const letter = this.state.nickname ? this.state.nickname.charAt(0).toUpperCase() : '';

      imageOrLetter = (
        <div className={styles.imageWrapper}>
          {progress}
          <div className={styles.letter}>
            {letter}
          </div>
        </div>
      );
    }

    const isInvalidNickname = this.state.nickname.length <= 0;
    const nicknameMessage = isInvalidNickname ? 'Campo obrigatório' : '';
    
    return (
      <section className={styles.wrapper}>
        <SimpleHeader
          title="Editar Perfil"
        />
        <div className={styles.center}>
          {imageOrLetter}
          {actions}
        </div>
        <div className={styles.fields}>
          <div className={styles.field}>
            <TextField
              id="nickname"
              value={this.state.nickname}
              error={isInvalidNickname}
              fullWidth={true}
              helperText={nicknameMessage}
              label="Apelido"
              onChange={this.onChangedNickname}
            />
          </div>
          <div className={styles.field}>
            <TextField
              id="name"
              value={this.state.name}
              disabled={true}
              fullWidth={true}
              label="Nome"
            />
          </div>
        </div>
        <p className={styles.obs}>Caso deseje alterar sua senha, acesse sua conta na <a href="https://sme.prefeitura.sp.gov.br/" target="_blank" rel="noreferrer noopener">Secretaria Municipal de Educação</a>.</p>
        <SimpleFooter
          label="Salvar"
          onClick={this.onClickedSave}
        />
      </section>
    );
  }
}

Profile.propTypes = {
  data: PropTypes.object,
  deletePhoto: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  saveNickname: PropTypes.func.isRequired,
  savePhoto: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    data: state.ProfileReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deletePhoto: () => {
      dispatch(ProfileActions.deletePhoto());
    },
    load: () => {
      dispatch(ProfileActions.load());
    },
    saveNickname: (id, nickname) => {
      dispatch(ProfileActions.saveNickname(id, nickname));
    },
    savePhoto: (id, photo) => {
      dispatch(ProfileActions.savePhoto(id, photo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
