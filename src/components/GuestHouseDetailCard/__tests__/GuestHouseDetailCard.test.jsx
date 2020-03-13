import React from 'react';
import GuestHouseDetailCard from '..';

const props = {
  label: 'Vacant Spaces',
  value: '10'
};

describe('<GuestHouseDetailCard />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GuestHouseDetailCard {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
