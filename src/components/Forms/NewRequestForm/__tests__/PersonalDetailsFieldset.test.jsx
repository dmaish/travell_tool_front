import React from 'react';
import PersonalDetailsFieldset from '../FormFieldsets/PersonalDetails';

describe('<PersonalDetailsFieldset/>',()=> {
  const props = {
    managers:['Mananger1', 'Manager2'],
    collapsible: jest.fn(),
    title: 'Personal',
    collapse:true,
    position: 'centre',
    line: '',
    values: {},
    savePersonalDetails: jest.fn(),
    occupations: ['manager', 'country director']
  };
  it('tests handleDisableInputs', ()=>{
    const wrapper = shallow(<PersonalDetailsFieldset {...props} />);
    const instance = wrapper.instance();
    instance.handleDisableInputs('clicked');
    expect(wrapper.state('disableInputs')).toBe('disable-details');
  });
});
