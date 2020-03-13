import React from 'react';
import moment from 'moment';
import BedGeomWrapper from '..';

const props = {
  tripDayWidth: 31,
  trips: [{
    id: 'trip-id-1'
  }],
  timelineStartDate: moment().startOf('month'),
  timelineViewType: 'month'
};

describe('<BedGeomWrapper />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BedGeomWrapper {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a wrapper for the trips available', () => {
    const bedTripsWrappers = wrapper.find('.bed-geometry-wrapper');
    expect(bedTripsWrappers).toHaveLength(1);
  });

  it('passes trips available through a trip geometry', () => {
    const tripGeometries = wrapper.find('TripGeometry');
    expect(tripGeometries).toHaveLength(1);
  });
});
