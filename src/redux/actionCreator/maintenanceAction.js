import { 
  ADD_MAINTENANCE_RECORD, 
  UPDATE_MAINTENANCE_RECORD, 
  DELETE_MAINTENANCE_RECORD, 
  UPDATE_MAINTENANCE_RECORD_SUCCESS, 
  UPDATE_MAINTENANCE_RECORD_FAILURE, 
  DELETE_MAINTENANCE_RECORD_SUCCESS,
  DELETE_MAINTENANCE_RECORD_FAILURE
} from '../constants/actionTypes';

const addmaintenanceRecord = (data, roomId, startDate, endDate, guestHouseId) => ({
  type: ADD_MAINTENANCE_RECORD,
  data,
  roomId,
  startDate,
  endDate,
  guestHouseId
});

export const updateMaintenanceRecord = (maintenance, roomId) => ({
  type: UPDATE_MAINTENANCE_RECORD,
  maintenance,
  roomId
});

export const updateMaintenanceRecordSuccess = (maintenance) => ({
  type: UPDATE_MAINTENANCE_RECORD_SUCCESS,
  maintenance
});

export const updateMaintenanceRecordError = (error) => ({
  type: UPDATE_MAINTENANCE_RECORD_FAILURE,
  error
});

export const deleteMaintenanceRecord = (roomId) => ({
  type: DELETE_MAINTENANCE_RECORD,
  roomId
});

export const deleteMaintenanceRecordSuccess = (roomId) => ({
  type: DELETE_MAINTENANCE_RECORD_SUCCESS,
  roomId
});

export const deleteMaintenanceRecordFailure = (error) => ({
  type: DELETE_MAINTENANCE_RECORD_FAILURE,
  error
});

export default addmaintenanceRecord;
