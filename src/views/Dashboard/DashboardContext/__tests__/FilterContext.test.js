import React from 'react';
import FilterContext from '../FilterContext';

const props = {
  children: [],
};

describe('<FilterContext />', () => {
  localStorage.setItem('location', 'Nairobi, Kenya');
  const wrapper = shallow(<FilterContext {...props} />);

  it('should render without crashing', () => {
    wrapper.instance().setState = jest.fn();
    const input = {start: '2018-12-02', end: '2018-12-10'};
    wrapper.instance().handleFilter(input);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().setState).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().setState).toHaveBeenCalledWith({ range: input});
  });
});
