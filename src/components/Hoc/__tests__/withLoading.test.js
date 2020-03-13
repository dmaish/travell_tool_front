import React from 'react';
import { shallow } from 'enzyme';
import withLoading from '../withLoading';
import { Table } from '../../Table/index';
import Preloader from '../../Preloader/Preloader';

const props = {
  isLoading: true,
  editRequest: jest.fn(),
  history: {},
  location: {},
  travelChecklists: [],
  showTravelChecklist: jest.fn()
};

describe('withLoading', () => {
  it('renders Preloader when component is loading', () => {
    const WithLoadingComponent = withLoading(Table);
    const wrapper = shallow(<WithLoadingComponent {...props} />);
    expect(wrapper.find('Preloader').length).toBe(1);
    expect(wrapper.find('Table').length).toBe(0);
  });

  it('renders does not render Preloader when the component is done loading', () => {
    const WithLoadingComponent = withLoading(Table);
    const wrapper = shallow(<WithLoadingComponent {...{...props, isLoading: false}} />);
    expect(wrapper.find('Preloader').length).toBe(0);
    expect(wrapper.find('Table').length).toBe(1);
  });
});
