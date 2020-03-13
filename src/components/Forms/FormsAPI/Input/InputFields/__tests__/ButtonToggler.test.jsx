import React from 'react';
import ButtonToggler from '../ButtonToggler';

describe('<ButtonToggler />', () => {
  const choices = ['male', 'female'];

  it('renders as expected', () => {
    const wrapper = shallow(<ButtonToggler choices={choices} />);
    expect(wrapper).toMatchSnapshot();
  });
});
