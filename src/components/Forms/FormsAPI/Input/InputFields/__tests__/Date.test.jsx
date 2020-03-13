import React from 'react';
import Date from '../Date';

describe('<Date />', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Date />);
    expect(wrapper).toMatchSnapshot();
  });
  it('shows receives error class name', () => {
    const wrapper = shallow(<Date  />);
    expect(wrapper.prop('className')).toContain('date-wrapper');
  });
})
;
