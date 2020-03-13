import React from 'react';
import { shallow } from 'enzyme';
import DropdownSelect from '../DropdownSelect';

describe('<DropdownSelect />', () => {
  const choices = ['manager', 'associate'];
  const onChange = () => {};
  it('renders fine', () => {
    const wrapper = shallow(<DropdownSelect choices={choices} onChange={onChange} />);
    expect (wrapper).toMatchSnapshot();
  });
  it('test onClick event of choices in dropdown', () => {
    const wrapper = mount(<DropdownSelect choices={choices} onChange={onChange} />);
    expect (wrapper.find('div.input')).toHaveLength(1);
    wrapper.find('div.input').simulate('click');
    wrapper.find('#choice').at(0).simulate('click');
    expect (wrapper.state('dropdownOpen')).toBe(false);
  });
  it('clone should call handleOptClick when clicked', () => {      
    const wrapper = mount(<DropdownSelect choices={choices} onChange={onChange} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleOptClick');
    wrapper.update();
    wrapper.find('div.input').simulate('click');
    wrapper.find('div#choice').at(0).simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

});
