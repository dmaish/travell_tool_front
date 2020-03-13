import React from 'react';
import RoomGeomWrapper from '..';
import moment from 'moment';

const props = {
  beds: [{
    bedName: 'kitanda 1',
    bedId: 1
  }],
  maintainances:[{
    reason:'Bad window',
    start: '11-10-2018',
    end: '11-10-2018'
  }],
  timelineStartDate: moment().startOf('month'),
  tripDayWidth: 31,
  timelineViewType: 'month',
  status: false
};

const bookingDetailsPosEvent = {
  target: {
    getBoundingClientRect: jest.fn(() => ({
      left: 200,
    }))
  },
  clientX: 300
};

describe('<RoomGeomWrapper />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RoomGeomWrapper {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a wrapper for all bed geometries', () => {
    const roomGeomWrapper = wrapper.find('.room-geometry-wrapper');
    expect(roomGeomWrapper).toHaveLength(1);
  });

  it('renders passes available beds through bed geometries', () => {
    const bedGeometries = wrapper.find('BedGeomWrapper');
    expect(bedGeometries).toHaveLength(1);
  });
});

describe('booking details toggling', () => {
  let onFocusHandler, onBlurHandler, bookingDetailsPosHandler, wrapper, timelineBarWrapper, blurFocusSpy;
  beforeEach(() => {
    wrapper = shallow(<RoomGeomWrapper {...props} />);
    timelineBarWrapper = wrapper.find('TimelineBarWrapper');
    blurFocusSpy = jest.spyOn(wrapper.instance(), 'toggleBookingDetails');
    onFocusHandler = timelineBarWrapper
      .dive()
      .find('.timeline-trip-geometry')
      .prop('onFocus');
    onBlurHandler = timelineBarWrapper
      .dive()
      .find('.timeline-trip-geometry')
      .prop('onBlur');
    bookingDetailsPosHandler = timelineBarWrapper
      .prop('setBookingDetailsAbsolutePos');
  });

  it('lauches with booking details hidden', () => {
    expect(wrapper.state().bookingDetailsVisible).toBe(false);
  });

  describe('toggle booking details handler works properly', () => {
    it('leaves the booking details open when clicked severally', () => {
      expect.assertions(2);
      onFocusHandler(); //click
      expect(wrapper.state().bookingDetailsVisible).toBe(true);
      onFocusHandler(); // click once more
      expect(wrapper.state().bookingDetailsVisible).toBe(true);
    });

    it('closes visible booking details on blur', () => {
      expect.assertions(2);
      onFocusHandler(); // open booking details
      expect(wrapper.state().bookingDetailsVisible).toBe(true);
      onBlurHandler(); // close booking details
      expect(wrapper.state().bookingDetailsVisible).toBe(false);
    });

    it('passes correct absolute position to booking details', () => {
      bookingDetailsPosHandler(bookingDetailsPosEvent);
      // mouseLeft - tripLeft => see event object
      const expectedBookingDetailsPos = 100;
      expect(wrapper.state().bookingDetailsPos)
        .toEqual(expectedBookingDetailsPos);
      const maintenanceDetails = wrapper.find('MaintenanceDetails');
      expect(maintenanceDetails.prop('bookingDetailsPos'))
        .toBe(expectedBookingDetailsPos);
    });
  });
});
