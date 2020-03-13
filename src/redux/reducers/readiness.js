import { 
  FETCH_TRAVEL_READINESS, FETCH_TRAVEL_READINESS_FAILURE,
  FETCH_TRAVEL_READINESS_SUCCESS, EXPORT_TRAVEL_READINESS,
  EXPORT_TRAVEL_READINESS_SUCCESS, 
  EXPORT_TRAVEL_READINESS_FAILURE } from '../constants/actionTypes';

const initialState = { 
  readiness: [], 
  isLoading:false, 
  error: '' ,
  pagination: {}
};

const readiness = (state = initialState, action) => {
  const { response, error, type} = action;
  switch(type){
  case FETCH_TRAVEL_READINESS:
    return {...state, isLoading: true, error: '' };
  case FETCH_TRAVEL_READINESS_SUCCESS:
    return { ...state, 
      readiness: response.readiness, 
      pagination:response.pagination, isLoading: false, error: '' };
  case FETCH_TRAVEL_READINESS_FAILURE:
    return { ...state, error, isLoading: false, readiness: [] };
  case EXPORT_TRAVEL_READINESS:
    return {...state, isLoading:true, error: '' };
  case EXPORT_TRAVEL_READINESS_SUCCESS:
    return { ...state, isLoading: false, error: '' };
  case EXPORT_TRAVEL_READINESS_FAILURE:
    return { ...state, isLoading: false, error };
  default: return state;
  }
};
export default readiness;
