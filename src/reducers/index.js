import { combineReducers } from 'redux';
import ActivityReducer from './ActivityReducer';
import AlertReducer from './AlertReducer';
import AuthReducer from './AuthReducer';
import BodyReducer from './BodyReducer';
import ConfirmReducer from './ConfirmReducer';
import FiltersReducer from './FiltersReducer';
import HomeReducer from './HomeReducer';
import KnowledgeMatrixReducer from './KnowledgeMatrixReducer';
import LearningObjectivesReducer from './LearningObjectivesReducer';
import ProfileReducer from './ProfileReducer';
import RoadmapReducer from './RoadmapReducer';
import SequencesReducer from './SequencesReducer';
import SustainableDevGoalsReducer from './SustainableDevGoalsReducer';

export default combineReducers({
  ActivityReducer,
  AlertReducer,
  AuthReducer,
  BodyReducer,
  ConfirmReducer,
  FiltersReducer,
  HomeReducer,
  KnowledgeMatrixReducer,
  LearningObjectivesReducer,
  ProfileReducer,
  RoadmapReducer,
  SequencesReducer,
  SustainableDevGoalsReducer,
});
