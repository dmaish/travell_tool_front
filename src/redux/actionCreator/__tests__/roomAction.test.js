import updateRoomState from '../roomActionCreator';

describe('Room actions', () => {
  const response = [{
    'id': 'SLGN0_Ng',
    'name': 'Bean house',
    'rooms': [{
      'id': 'wjog5x1SNu',
      'roomName': 'nyati',
      'faulty': true,
    },
    {
      'id': 'wjog5x1SNz',
      'roomName': 'simba',
      'faulty': true,
    }
    ]
  },];

  const data = {
    fault: true
  };

  const roomId = 'QVjc3T5we1';
  const startDate = '12/12/2001';
  const endDate = '15/12/2001';
  const guestHouseId = 'QVjc3T5we1';
  it('should return UPDATE_ROOM_STATE action type', () => {
    const expectedAction = {
      type: 'UPDATE_ROOM_STATE',
      data,
      roomId,
      startDate,
      endDate,
      guestHouseId
    };
    const roomAction = updateRoomState(data, roomId,startDate, endDate, guestHouseId);
    expect(roomAction).toEqual(expectedAction);
  });

});
