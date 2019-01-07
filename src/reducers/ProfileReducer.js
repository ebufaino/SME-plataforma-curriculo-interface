import ProfileActions from 'actions/ProfileActions';

const initialState = {
  id: 0,
  isUploading: false,
  name: '',
  nickname: '',
  photo: null,
  schools: [],
};

function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case ProfileActions.LOAD:
      return initialState;

    case ProfileActions.LOADED:
      const { name, teacher } = action.data;
      sessionStorage.setItem('teacherId', teacher.id);

      return {
        ...state,
        id: teacher.id,
        name: name || '',
        nickname: teacher.nickname || '',
        photo: teacher.avatar_attributes.default_url,
      };

    case ProfileActions.LOADED_CLASSROOMS:
      return {
        ...state,
        schools: action.data.schools,
      };

    case ProfileActions.LOAD_CLASSROOMS:
    case ProfileActions.SAVE_NICKNAME:
    case ProfileActions.SAVED_NICKNAME:
      return {
        ...state,
      };

    case ProfileActions.SAVE_PHOTO:
      return {
        ...state,
        isUploading: true,
      };

    case ProfileActions.SAVED_PHOTO:
      return {
        ...state,
        isUploading: false,
      };

    default:
      return state;
  }
}

export default ProfileReducer;
