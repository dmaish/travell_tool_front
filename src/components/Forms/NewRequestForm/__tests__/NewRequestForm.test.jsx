import React from 'react';
import sinon from 'sinon';
import NewRequestForm from '../NewRequestForm';
import beds from '../../../../views/AvailableRooms/__mocks__/mockData/availableRooms';

localStorage.setItem = jest.fn();

describe('<NewRequestForm />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  class AutocompleteServiceMock {
    addListener (place_changed ,callback) {
      callback( this.getPlace(), 'OK');
    }
    getPlace = () => {
      const components = {
        address_components:  [
          {long_name: 'Las Vegas', short_name: 'Las Vegas', types: ['locality', 'political']},
          {long_name: 'Las Vegas', short_name: 'Las Vegas', types: ['political']},
          {long_name: 'Las Vegas', short_name: 'Las Vegas', types: ['country', 'political']},
        ]
      };
      return components;
    }
  }
  window.url = 'http://www.goo.com';
  window.google ={
    maps: {
      places: {
        Autocomplete: AutocompleteServiceMock,
      }
    }
  };

  const props = {
    occupations: [{occupationName: 'Software Developer'}, {occupationName: 'HR'}],
    loading: false,
    errors: [],
    user: {
      UserInfo: {
        id: '09ijrjt'
      }
    },
    userData:{
      id: '2',
      fullName: 'Collins Muru',
      email: 'collins.muru@andela.com',
      userId: '-LJNw1BsT0LP_E4l2peP',
      passportName: '',
      department: 'Talent & Development',
      occupation: 'Software Developer',
      manager: 'Collins',
      gender: 'Male',
      createdAt: '2018-09-14T12:48:11.266Z',
      updatedAt: '2018-09-16T07:53:48.835Z',
      roleId: 401938
    },
    requestOnEdit: {
      id: '1',
      name: 'Seun Undefined',
      tripType: 'multi',
      manager: 'Faluyi Seun',
      gender: 'Male',
      department: 'Talent & Development',
      role: 'Software Developer',
      status: 'Open',
      userId: 'lorem-ipsum',
      createdAt: '2018-09-26T15:15:49.808Z',
      updatedAt: '2018-09-26T15:15:49.808Z',
      trips: [
        {
          id: '1',
          origin: 'Nairobi Kenya',
          destination: 'Lagos Nigeria',
          departureDate: '2018-09-30',
          returnDate: '2018-09-30',
          createdAt: '2018-09-27T18:49:03.626Z',
          updatedAt: '2018-09-27T18:49:43.803Z',
          requestId: 'NfR-9KoCP',
          bedId: beds[0].id
        }
      ]
    },
    availableRooms: {
      beds
    },
    google: {},
    getUserData: jest.fn(() => {}),
    handleCreateRequest: jest.fn(() => {}),
    updateUserProfile: jest.fn(() => {}),
    creatingRequest: jest.fn(() => {}),
    handleEditRequest: jest.fn(() => {}),
    fetchUserRequests: jest.fn(() => {}),
    fetchAvailableRooms: jest.fn(() => {}),
    fetchAvailableRoomsSuccess: jest.fn(() => {}),
    closeModal: jest.fn(),
    choices: ['director', 'chef'],
    managers: [
      {
        fullName: 'Test User',
        email: 'test.user@andela.com'
      }
    ]
  };
  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'oneWay'
    },
  };

  const { requestOnEdit } = props;
  const user = localStorage.getItem('name');
  const gender = localStorage.getItem('gender');
  const department = localStorage.getItem('department');
  const role = localStorage.getItem('role');
  const manager = localStorage.getItem('manager');

  const defaultState = {
    values: {
      name: !(/^null|undefined$/).test(user) ? user : '', // FIX: need to be
      gender: !(/^null|undefined$/).test(gender) ? gender: '',
      department: !(/^null|undefined$/).test(department) ? department: '',
      role: !(/^null|undefined$/).test(role) ? role :'',
      manager: !(/^null|undefined$/).test(manager) ? manager : '',
    },
    trips: requestOnEdit.trips || [{}],
    errors: {},
    hasBlankFields: true,
    selection: 'return',
    collapse: false,
    title: 'Hide Details',
    position: 'none',
    line: '1px solid #E4E4E4',
    parentIds: 1
  };


  beforeEach(() => {
    wrapper = mount(<NewRequestForm {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders three fieldsets', () => {
    const fieldsets = wrapper.find('fieldset');
    expect(fieldsets).toHaveLength(3);
  });

  it('renders the personal details fieldset', () => {
    const personalDetails = wrapper.find('fieldset.personal-details');
    expect(personalDetails).toHaveLength(1);
  });

  it('renders the travel details fieldset', () => {
    const personalDetails = wrapper.find('fieldset.travel-details');
    expect(personalDetails).toHaveLength(1);
  });

  it('renders four buttons', () => {
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(4);
  });

  it('picks input values', () => {
    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'John Mutuma'
      }
    });
    expect(wrapper.state().values.name).toBe('John Mutuma');
  });

  it('validates input on blur', () => {
    wrapper.find('input[name="arrivalDate-0"]').simulate('blur');
    wrapper.update();
    expect(wrapper.state().errors['arrivalDate-0']).toBe('This field is required');
  });

  it('validates form before sending data', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('call event when date is changed', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      nativeEvent: {
        path: [0,1,2,3,4,5,6,{id: 'departureDate-0_date'}]
      }
    };
    sinon.spy(shallowWrapper.instance(), 'onChangeDate');
    const date = {
      format: () => '2018-12-01'
    };
    shallowWrapper.instance().onChangeDate(date, event);
    expect(shallowWrapper.instance().onChangeDate.calledOnce).toEqual(true);
  });

  it('call event when date is changed', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      nativeEvent: {
        path: [0,1,2,3,4,5,6,{id: 'arrival-0_date'}]
      }
    };
    shallowWrapper.setState({
      selection: 'multi',
      parentIds: 2,
      trips: [
        {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30', bedId: beds[0].id},
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'onChangeDate');
    const date = {
      format: () => '2018-12-01'
    };
    shallowWrapper.instance().onChangeDate(date, event);
    expect(shallowWrapper.instance().onChangeDate.calledOnce).toEqual(true);
  });

  it('call event when date is changed', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      nativeEvent: {
        path: [0,1,2,3,4,5,6,{id: 'departureDate-0_date'}]
      }
    };
    shallowWrapper.setState({
      selection: 'multi',
      parentIds: 2,
      trips: [
        {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30', bedId: beds[0].id},
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'onChangeDate');
    const date = {
      format: () => '2018-12-01'
    };
    shallowWrapper.instance().onChangeDate(date, event);
    expect(shallowWrapper.instance().onChangeDate.calledOnce).toEqual(true);
  });


  it('call event when location is picked', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        },
        name: 'destination-0',
      },
    };
    sinon.spy(shallowWrapper.instance(), 'onChangeInput');
    shallowWrapper.instance().onChangeInput(event);
    expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  });

  it('call event when location is picked', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        },
        name: 'destination-0',
      },
    };
    shallowWrapper.setState({
      selection: 'multi',
      parentIds: 2,
      trips: [
        {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30', bedId: beds[0].id},
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'onChangeInput');
    shallowWrapper.instance().onChangeInput(event);
    expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  });

  it('call event when location is picked', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        },
        name: 'origin-0',
      },
    };
    shallowWrapper.setState({
      selection: 'multi',
      parentIds: 2,
      trips: [
        {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30', bedId: beds[0].id},
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'onChangeInput');
    shallowWrapper.instance().onChangeInput(event);
    expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  });

  it('call event when available room is picked', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        },
        name: 'bed-0'
      },
    };
    shallowWrapper.setState({
      selection: 'multi',
      parentIds: 2,
      trips: [
        {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30', bedId: beds[0].id},
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'onChangeInput');
    shallowWrapper.instance().onChangeInput(event);
    expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  });

  it('should change the radio button on click to multi ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'multi'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should change the radio button on click to single and collapse true', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.instance().state.collapse=true;
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'single'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should change the radio button on click to return ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'return'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should not close the personal details field if the radio button return ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      collapse: true
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'return'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should change the radio button on click to return ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      selection: 'return'
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'multi'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should update trip selection to oneWay on select oneWay radio', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({ selection: 'return' });
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'oneWay'
      },
    };
    const travelDetails = shallowWrapper.find('TravelDetailsFieldset').at(0);
    const tripTypeChangeListener = travelDetails.prop('handleRadioButtonChange');
    tripTypeChangeListener(event);
    expect(shallowWrapper.state().selection).toEqual('oneWay');
  });

  it('should update state when a trip is added and when it\'s removed', () => {
    expect.assertions(7);
    // a form has one trip by default
    wrapper.instance().addNewTrip();
    wrapper.instance().addNewTrip();
    expect(wrapper.instance().state.values['origin-1']).toBe('');
    expect(wrapper.instance().state.values['origin-2']).toBe('');
    expect(wrapper.instance().state.parentIds).toBe(3);
    wrapper.instance().removeTrip(1);
    expect(wrapper.instance().state.parentIds).toBe(2);
    // still have two trip, origin-1 should now be what was at origin-2 and so forth
    expect(wrapper.instance().state.values['origin-1']).toBe('');
    // after shifting state values, origin-{parentIds} in state should be undefined
    expect(wrapper.instance().state.values['origin-2']).toBe(undefined);
    expect(wrapper.instance().state.trips).toHaveLength(2);
  });

  it('should close the personal field on button click ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      collapse: true,
      title: 'Show Details',
      position: 'rotate(266deg)',
      line: 'none'
    });
    sinon.spy(shallowWrapper.instance(), 'collapsible');
    shallowWrapper.instance().collapsible(event);
    expect(shallowWrapper.instance().collapsible.calledOnce).toEqual(true);
  });


  it('selects female gender on button click', () => {
    let femaleButton = wrapper.find('button[data-value="Female"]');
    femaleButton.simulate('click', {
      target: {
        name: 'gender',
        getAttribute: () => {},
        dataset: {
          value: 'Female'
        }
      }
    });

    expect(wrapper.state('values').gender).toBe('Female');
  });

  it('selects male gender on button click', () => {
    let maleButton = wrapper.find('button[data-value="Male"]');
    maleButton.simulate('click', {
      target: {
        name: 'gender',
        getAttribute: () => {},
        dataset: {
          value: 'Male'
        }
      }
    });

    expect(wrapper.state('values').gender).toBe('Male');
  });

  it('should change the radio button on click', () => {
    let maleButton = wrapper.find('button[data-value="Male"]');
    maleButton.simulate('click', {
      target: {
        name: 'gender',
        getAttribute: () => {},
        dataset: {
          value: 'Male'
        }
      }
    });
    expect(wrapper.state('values').gender).toBe('Male');
  });



  it('selects gender with browsers that do not support custom datasets', () => {
    let femaleButton = wrapper.find('button[data-value="Female"]');
    femaleButton.simulate('click', {
      target: {
        name: 'gender',
        getAttribute: attrib => 'Female'
      }
    });

    expect(wrapper.state('values').gender).toBe('Female');
  });

  it('should not toggle the modal if request submission failed', () => {
    wrapper.setState({
      values: {
        name: 'test',
        gender: 'test',
        department: 'test',
        role: 'test',
        manager: 'test',
        origin: 'test',
        destination: 'Nairobi',
        otherDestination: '',
        departureDate: '09/27/1988',
        arrivalDate: '09/27/1988',
        bed: beds[0].id
      }
    });
    wrapper.setProps({
      errors: ['error while creating a new request']
    });

    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should clear the form when the component unmounts', () => {
    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  it('should call handleClearForm', () => {
    const wrapper = shallow(<NewRequestForm {...props} />);
    wrapper.find('SubmitArea').dive().find('#cancel').simulate('click');
    expect(wrapper.state()).toMatchObject({});
  });


  it('should render a loading indicator while creating a new request', () => {
    wrapper.setProps({ creatingRequest: true });
    expect(wrapper.find('h5').text()).toEqual('Creating request...');
  });


  it('should submit travel details ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    localStorage.setItem('checkBox', 'clicked');
    shallowWrapper.setState({
      values: {
        name: 'tomato', // FIX: need to be refactor later
        gender: 'male',
        department: 'fame',
        role: 'job',
        manager: 'mango',
      },
      trips: [],
      selection: 'return',
    });
    const event = {
      preventDefault: jest.fn(),
    };
    sinon.spy(shallowWrapper.instance(), 'handleSubmit');
    shallowWrapper.instance().handleSubmit(event);
    expect(shallowWrapper.instance().handleSubmit.calledOnce).toEqual(true);
  });

  it('should add new trip field for multi trip  ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      parentIds: 5
    });
    sinon.spy(shallowWrapper.instance(), 'addNewTrip');
    shallowWrapper.instance().addNewTrip();
    expect(shallowWrapper.instance().addNewTrip.calledOnce).toEqual(true);
  });

  xit('should save return hasBlankTrips', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    sinon.spy(shallowWrapper.instance(), 'hasBlankTrips');
    shallowWrapper.instance().hasBlankTrips(event);
    expect(shallowWrapper.instance().hasBlankTrips.calledOnce).toEqual(true);
  });

  xit('check hasBlankTrips works', ()=>{
    const wrapper = shallow(<NewRequestForm {...props} />);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.state.trips = ['Nigeria', 'Ghana'];
    expect(wrapperInstance.hasBlankTrips()).toEqual([false, false]);
  });

  it('should update state with bedId when handlePickBed is called', () => {
    const wrapper = shallow(<NewRequestForm {...props} />);
    wrapper.instance().setState(defaultState);
    wrapper.instance().handlePickBed(1, 0);
    expect(wrapper.instance().state.values['bed-0']).toBe(1);
  });

  it('should update edit request', () => {
    const wrapper = shallow(<NewRequestForm {...props} />);
    wrapper.instance().setState(defaultState);
    expect(wrapper.instance().getTrips(props.requestOnEdit)['bed-0']).toBe(1);
  });

  it('should set up trips values', () => {
    const wrapper = shallow(<NewRequestForm {...props} />);
    wrapper.instance().setState(defaultState);
    expect(wrapper.instance().setTrips(props.requestOnEdit)).toEqual(props.requestOnEdit.trips);
  });

  it('should call localStorage when savePersonalDetails is called', () => {
    const wrapper = shallow(<NewRequestForm {...props} />);
    wrapper.instance().savePersonalDetails('','','','','');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
