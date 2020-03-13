import addmaintenanceRecord from '../maintenanceAction';

describe('Maintainence record action', () =>{
  const data = {
    reason: 'Windows are broken',
    start: '2018-10-16',
    end: '2018-10-16'
  };

  const roomId = 'QVjc3T5we1';
  const startDate = '12/12/2001';
  const endDate = '15/12/2001';

  it('should return ADD_MAINTENANCE_RECORD action type', () => {
    const expectedAction = {
      type: 'ADD_MAINTENANCE_RECORD',
      data,
      roomId
    };
    const maintainenceAction = addmaintenanceRecord(data, roomId);
    expect(maintainenceAction).toEqual(expectedAction);
  });
});
