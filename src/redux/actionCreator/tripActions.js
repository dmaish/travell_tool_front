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

export const updateTrip = ({tripId, tripData}) => ({
  type: UPDATE_TRIP,
  tripId,
  tripData
});

export const updateTripSuccess = ({trip, message, success}) => ({
  type: UPDATE_TRIP_SUCCESS,
  trip,
  message,
  success
});

export const updateTripFailure = (error) => ({
  type: UPDATE_TRIP_FAILURE,
  error
});

export const fetchTrips = () => ({
  type: FETCH_TRIPS
});

export const fetchTripsSuccess = ({trips, message, success}) => ({
  type: FETCH_TRIPS_SUCCESS,
  trips,
  message,
  success
});

export const fetchTripsFailure = (error) => ({
  type: FETCH_TRIPS_FAILURE,
  error
});

export const updateTripRoom = ({tripId, data}) => ({
  type: UPDATE_TRIP_ROOM,
  tripId,
  data,
});

export const updateTripRoomSuccess = () => ({
  type: UPDATE_TRIP_ROOM_SUCCESS
});

export const updateTripRoomFailure = (error) => ({
  type: UPDATE_TRIP_ROOM_FAILURE,
  error
});
