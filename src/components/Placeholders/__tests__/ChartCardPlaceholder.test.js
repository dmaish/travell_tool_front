import React from 'react';
import ChartCardPlaceholder from '../ChartCardPlaceholder';


describe('<ChartCardPlaceholder />', () => {
  const wrapper = shallow(<ChartCardPlaceholder />);

  it('should render without crashing', () => {
    const wrapper = shallow(<ChartCardPlaceholder />);
    expect(wrapper).toMatchSnapshot();
  });
});
