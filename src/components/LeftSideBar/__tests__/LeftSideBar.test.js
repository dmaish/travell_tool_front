import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { LeftSideBar } from '../LeftSideBar';

describe('<LeftSideBar />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LeftSideBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('changes active navigation link', () => {
    const wrapper = mount(
      <MemoryRouter>
        <LeftSideBar />
      </MemoryRouter>
    );

    const defaultActiveNavItem = {};

    wrapper.find('.nav-link').at(0).simulate('click');
    const newState = wrapper.find('LeftSideBar').instance().state;
    expect(newState.activeNavItem).not.toEqual(defaultActiveNavItem);
  });
});
