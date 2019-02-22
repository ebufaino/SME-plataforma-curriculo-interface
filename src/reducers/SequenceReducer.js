import CollectionActions from 'actions/CollectionActions';
import SequenceActions from 'actions/SequenceActions';
import SequencesActions from 'actions/SequencesActions';

function compare(a, b) {
  if (a.rating_id < b.rating_id) {
    return -1;
  }
  if (a.rating_id > b.rating_id) {
    return 1;
  }
  return 0;
}

const initialState = {
  currItem: null,
  collections: [],
  ratings: [],
  isSaved: false,
};

function SequenceReducer(state = initialState, action) {
  switch (action.type) {
    case SequenceActions.LOAD:
    case SequencesActions.LOAD:
    case SequencesActions.LOAD_MORE:
    case SequencesActions.SEARCH:
      return initialState;

    case SequenceActions.LOADED:
      return {
        ...state,
        currItem: action.data,
      };

    case SequenceActions.LOAD_COLLECTIONS:
      return {
        ...state,
        collections: [],
      };

    case SequenceActions.LOADED_COLLECTIONS:
      return {
        ...state,
        collections: action.data,
        isSaved: action.data.length > 0,
      };

    case SequenceActions.LOAD_RATINGS:
      return {
        ...state,
        ratings: [],
      };

    case SequenceActions.LOADED_RATINGS:
      return {
        ...state,
        ratings: action.data.sort(compare),
      };

    case CollectionActions.SAVED_SEQUENCE:
      return {
        ...state,
        isSaved: true,
      };

    default:
      return state;
  }
}

export default SequenceReducer;
