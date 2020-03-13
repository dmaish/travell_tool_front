import React from 'react';
import TimelineVerticalAxis from '..';

const props = {
  rooms: [
    {
      roomName: 'Ndovu',
      id: 'room-id-1',
      faulty: false,
      beds: [
        {
          bedName: 'Kitanda 1',
          bedId: 'Kitanda1'
        }
      ]
    }
  ],
  updateRoomState: jest.fn(),
  timelineDateRange: ['2018-01-01', '2018-01-31'],
  guestHouseId: 'guest-house-id-1'
};

describe('<TimelineVerticalAxis />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <TimelineVerticalAxis {...props} />
    );
  });

  it('renders properly without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
