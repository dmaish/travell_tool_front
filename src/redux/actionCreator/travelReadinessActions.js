import {
  FETCH_TRAVEL_READINESS,
  FETCH_TRAVEL_READINESS_SUCCESS, 
  FETCH_TRAVEL_READINESS_FAILURE, 
  EXPORT_TRAVEL_READINESS, 
  EXPORT_TRAVEL_READINESS_SUCCESS, 
  EXPORT_TRAVEL_READINESS_FAILURE
} from '../constants/actionTypes';

export const fetchReadiness = (query) => ({
  type: FETCH_TRAVEL_READINESS,
  query
});

export const fetchReadinessSuccess = (response) => ({
  type:FETCH_TRAVEL_READINESS_SUCCESS,
  response
});

export const fetchReadinessFailure = (error) => ({
  type: FETCH_TRAVEL_READINESS_FAILURE,
  error
});

export const exportReadiness = (query) => ({
  type: EXPORT_TRAVEL_READINESS,
  query
});

export const exportReadinessSuccess = () => ({
  type: EXPORT_TRAVEL_READINESS_SUCCESS,
});

export const exportReadinessFailure = (error) => ({
  type: EXPORT_TRAVEL_READINESS_FAILURE,
  error
});

