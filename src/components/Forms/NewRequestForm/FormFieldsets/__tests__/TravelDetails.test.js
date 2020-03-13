import React from 'react';
import moment from 'moment';
import TravelDetails from '../TravelDetails';
import beds from '../../../../../views/AvailableRooms/__mocks__/mockData/availableRooms';

const props = {
  parentIds: 1,
  selection: 'multi',
  addNewTrip: jest.fn(),
  fetchAvailableRooms: jest.fn(),
  values: {
    gender: 'Male',
    ['destination-1']: 'Lagos',
    ['departureDate-1']: moment('2019-10-20'),
    ['arrivalDate-1']: moment('2019-10-30'),
    ['bed-1']: 1
  },
  handleDate: jest.fn(),
  handlePickBed: jest.fn(() => {props.bed = 'bed-0';}),
  removeTrip: jest.fn(),
  availableRooms:{ beds }
};

const setup = (props) => shallow(<TravelDetails {...props} />);

describe('<TravelDetails />', () => {
  it('should render properly', () => {
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
  });

  it('should match snapshot', () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetchAvailableRooms when fetchRoomsOnFocus is triggered', () => {
    const wrapper = setup(props);
    const fetchRoomsOnFocusSpy = jest.spyOn(wrapper.instance(), 'fetchRoomsOnFocus');
    wrapper.instance().fetchRoomsOnFocus(props.values, 1, props.selection);
    expect(fetchRoomsOnFocusSpy).toHaveBeenCalled();
  });

  it('should render properly if no available beds', () => {
    const newProps = {...props};
    newProps.availableRooms = {beds: []};
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
  });
});
