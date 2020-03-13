import { combineReducers } from 'redux';
import auth from './auth';
import requests from './requests';
import approvals from './approvals';
import modal from './modal';
import user from './user';
import role from './role';
import notifications from './notifications';
import comments from './comments';
import rooms from './room';
import accommodation from './accommodation';
import trips from './trips';
import occupations from './occupations';
import travelChecklist from './travelChecklist';
import centers from './centers';
import availableRooms from './availableRooms';
import analytics from './analytics';
import readiness from './readiness';
import travelCalendar from './travelCalendar';
import documents from './documents';
import submissions from './checklistSubmission';
import fileUploads from './fileUploads';
import attachments from './attachments';
import maintenance from './maintenance';


const rootReducer = combineReducers({
  auth,
  requests,
  approvals,
  modal,
  user,
  role,
  comments,
  notifications,
  rooms,
  accommodation,
  trips,
  occupations,
  travelCalendar,
  travelChecklist,
  centers,
  availableRooms,
  analytics,
  readiness,
  documents,
  submissions,
  fileUploads,
  attachments,
  maintenance
});

export default rootReducer;
