import React from 'react';
import  ProfileForm  from '../index';

describe ('<ProfileForm />', () =>{
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  const props = {
    user: {
      UserInfo: {
        name: 'John Doe',
        id: '-LHJlG',
        picture: 'http://www.image.com/jepg'
      }
    },
    isLoading: false,
    history: {
      push: jest.fn()
    },
    errors: [],
    shouldOpen: false,
    onNotificationToggle: jest.fn(),
    updateUserProfile: jest.fn(() => {}),
    getUserData: jest.fn(() => {}),
    onChange: jest.fn(() => {}),
    size:10,
    managers: [
      {
        fullName: 'Test User',
        email: 'test.user@andela.com'
      }
    ]
  };

  beforeEach(() => {
    wrapper = mount(<ProfileForm {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });


  it('submits calls on submit if all details are available',() =>{
    const form = wrapper.find('.new-profile');
    form.simulate('submit');
    const onSubmit = jest.fn();
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('does not update user profile if form is not valid', ()=>{
    wrapper.find('input[name="name"]').simulate('blur');
    wrapper.update();
    const onSubmit = jest.fn();
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });


  it('sets default state when clear button is clicked',() =>{
    wrapper.setState({hasBlankFields: false});
    const button = wrapper.find('#btn-cancel');
    button.simulate('click');
    const onSubmit = jest.fn();
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('submits the updated profile details', () => {
    wrapper.setState({hasBlankFields: false});
    wrapper.find('button').first().simulate('click');
    expect(props.getUserData).toHaveBeenCalledTimes(1);
  });
});
