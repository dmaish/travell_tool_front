import React from 'react';
import sinon from 'sinon';
import NewUserRoleForm from '../NewUserRoleForm';
import PersonalDetails from '../FormFieldsets/PersonalDetails';

describe('<NewUserRoleForm />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  const props = {
    user: {
      UserInfo: {
        name: 'John Doe'
      },
    },
    role: 'travel team member',
    loading: false,
    errors: [],
    myTitle: 'Add User' ,
    getRoleData: jest.fn(() => {}),
    handleUpdateRole:  jest.fn(() => {}),
    onChange: jest.fn(),
    userDetail: {
      email: 'tomato@andela.com',
      id: 1,
      centers: [{
        location: 'New York, USA'
      }]
    },
    centers: [{location: 'Kigali, Rwanda'}],
    roleId: '33589',
  };

  beforeEach(() => {
    wrapper = mount(<NewUserRoleForm {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders two fieldsets', () => {
    const fieldsets = wrapper.find('fieldset');
    expect(fieldsets).toHaveLength(2);
  });

  it('renders the personal details fieldset', () => {
    const personalDetails = wrapper.find('fieldset.personal-details');
    expect(personalDetails).toHaveLength(1);
  });

  it('picks input values', () => {
    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        email: 'email',
        value: 'Tomato Guy'
      }
    });
    expect(wrapper.state().values.email).toBe('Tomato Guy');
  });

  it('validates form before sending data', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should render a loading indicator while updating a new role', () => {
    wrapper.setProps({ updatingRole: true });
    expect(wrapper.find('h5').text()).toEqual('Updating role...');
  });


  it('calls on submit when all details are correct', () => {
    wrapper.setState({
      values: {
        email: 'test',
        roleName: 'Requester',
      }
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit');
    wrapper.state().values.email = 'test';
    expect(props.handleUpdateRole).toHaveBeenCalledWith(wrapper.state().values);
    expect(props.handleUpdateRole).toHaveBeenCalledTimes(2);
  });


  it('calls on submit when all details are correct when changing user center ', () => {
    const wrapper =  mount(<NewUserRoleForm {...{...props, myTitle: 'Change Center'}} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit');
    expect(props.handleUpdateRole).toHaveBeenCalledTimes(2);
  });


  it('should clear the form when the component unmounts', () => {
    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  it('calls the componentDidMount method', () => {
    const spy = sinon.spy(NewUserRoleForm.prototype, 'componentDidMount');
    const wrapper = mount(
      <NewUserRoleForm {...{...props,  
        role: 'travel team member',  userDetail: {
          email: 'tomato@andela.com',
          id: 1,
          centers: [{
            location: 'New York, USA'
          }]
        }}} />);
    expect(spy.called).toEqual(true);
    wrapper.unmount();
  });

  describe('<PersonalDetails />', () => {
    const props = {
      myTitle: 'Change Center',
      centers: [{
        location: []
      }],
      roleName: 'travel team member',
      validate: true
    };

    beforeEach(() => {
      wrapper = shallow(<PersonalDetails {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

  });

});
