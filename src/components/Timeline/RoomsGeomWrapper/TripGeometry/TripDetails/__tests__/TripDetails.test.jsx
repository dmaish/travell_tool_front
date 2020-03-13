import React from 'react';
import TimelineDetails from '..';

const props = {
  trip: {
    checkInDate: '2018-01-01',
    checkOutDate: '2018-01-10',
    request: {
      name: 'Alice Doe'
    }
  },
  bookingDetailsPos: '0px',
  detailsVariantClass: '',
  toggleBookingDetails: jest.fn(),
  translateDetailsLeft: false,
  handleChangeRoomModal: jest.fn()
};

describe('<TimelineDetails />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TimelineDetails {...props} />);
  });

  it('renders prorperly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders properly without a checkInDate or checkOutDate', () => {
    props.trip.checkInDate = null;
    props.trip.checkOutDate = null;
    wrapper = shallow(<TimelineDetails {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('closes on click close button, calls the toggler with right arg(s)', () => {
    const closeButton = wrapper.find('.close-button');
    const onClickCloseListener = closeButton.prop('onClick');
    onClickCloseListener();
    expect(props.toggleBookingDetails).toHaveBeenCalledWith('close');
  });

  it('it does not close when other areas of the trip details besides the \
  close button are clicked', () => {
    const detailsContainer = wrapper.find('.trip-booking-details');
    const clickDetailsListener = detailsContainer.prop('onClick');
    const e = {stopPropagation: jest.fn()};
    clickDetailsListener(e);
    expect(e.stopPropagation).toHaveBeenCalledTimes(1);
  });

  it('calls the handleChangeRoomModal function onclick', () => {
    wrapper = shallow(<TimelineDetails {...props} />);
    const submitButton = wrapper.find('button');
    submitButton.simulate('click');
    expect(props.handleChangeRoomModal).toHaveBeenCalled();
  })
});
