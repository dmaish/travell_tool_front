import {
  UPDATE_TRIP,
  UPDATE_TRIP_SUCCESS,
  UPDATE_TRIP_FAILURE,
  FETCH_TRIPS,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILURE,
  UPDATE_TRIP_ROOM,
  UPDATE_TRIP_ROOM_SUCCESS,
  UPDATE_TRIP_ROOM_FAILURE
} from '../constants/actionTypes';
import Utils from '../../helper/Utils';

const initialState = {
  trips: [],
  loading: false
};

const trips = (state = initialState, action) => {
  switch(action.type) {
  case FETCH_TRIPS:
    return {
      ...state, loading: true
    };
  case FETCH_TRIPS_SUCCESS:
    return {
      ...state, loading: false, trips: action.trips
    };
  case FETCH_TRIPS_FAILURE:
    return {
      ...state, loading: false, tripError: action.error
    };
  case UPDATE_TRIP:
    return {
      ...state, loading: true
    };
  case UPDATE_TRIP_SUCCESS:
    return {
      ...state, loading: false,
      trips: Utils.updateTrips(state.trips, action.trip)
    };
  case UPDATE_TRIP_FAILURE:
    return { ...state, loading: false, tripError: action.error };
  case UPDATE_TRIP_ROOM:
    return { ...state, loading: true };
  case UPDATE_TRIP_ROOM_SUCCESS:
    return { ...state, loading: false };
  case UPDATE_TRIP_ROOM_FAILURE:
    return {
      ...state, loading: false, updateTripRoomError: action.error
    };
  default: return state;
  }
};

export default trips;
