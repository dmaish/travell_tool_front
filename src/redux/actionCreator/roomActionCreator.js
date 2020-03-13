import { UPDATE_ROOM_STATE, UPDATE_ROOM_STATE_SUCCESS } from '../constants/actionTypes';

const updateRoomState = (data, roomId, startDate, endDate, guestHouseId) => ({
  type: UPDATE_ROOM_STATE,
  data,
  roomId,
  startDate, // current timeline date range
  endDate,
  guestHouseId
});

export default updateRoomState;
