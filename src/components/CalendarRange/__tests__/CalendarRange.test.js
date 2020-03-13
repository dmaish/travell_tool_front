import React from 'react';
import { mount } from 'enzyme';
import CalendarRange from '..';
import { format, addDays } from 'date-fns';

const props = {
  handleChange: jest.fn()
};

describe('<ButtonGroup />', () => {
  const wrapper = mount(<CalendarRange {...props} />);

  it('should render successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handleChange correctly', () => {
    wrapper.instance().handleRangeChange(
      { selection: {
        key: 'selection',
        startDate:  format(new Date()) ,
        endDate: format(addDays(new Date(), 2))
      }
      });

    expect(props.handleChange).toHaveBeenCalled();
  });
});
