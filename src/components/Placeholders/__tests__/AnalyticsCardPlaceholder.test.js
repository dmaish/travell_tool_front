import React from 'react';
import AnalyticsCardPlaceholder from '../AnalyticsCardPlaceholder';


describe('<AnalyticsCardPlaceholder />', () => {
  const wrapper = shallow(<AnalyticsCardPlaceholder />);

  it('should render without crashing', () => {
    const wrapper = shallow(<AnalyticsCardPlaceholder />);
    expect(wrapper).toMatchSnapshot();
  });
});
