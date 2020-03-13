import React from 'react';
import sinon from 'sinon';
import MaintainceForm from '../index';
import SubmitArea from '../FormFieldsets/SubmitArea';

describe('<MaintainanceForm />' , () =>{
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  const props = {
    isLoading: false,
    id: '1',
    status: false,
    history: {
      push: jest.fn()
    },
    errors: [],
    shouldOpen: false,
    onNotificationToggle: jest.fn(),
    addmaintenanceRecord: jest.fn(() => {}),
    updateMaintenanceRecord: jest.fn(() => {}),
    closeModal: jest.fn(() => {}),
    showId: jest.fn(() => {}),
    onChange: jest.fn(() => {}),
    size:10,
    modalType : '',
    managers: [
      {
        fullName: 'Test User',
        email: 'test.user@andela.com'
      }
    ]
  };


  beforeEach(() => {
    wrapper = shallow(<MaintainceForm {...props} />);
  });

  it('renders correctly', () => {
    const mountWrapper = mount(<MaintainceForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls addmaintenanceRecord when form is submitted', () =>{
    const shallowRender = shallow(<MaintainceForm {...props} />);
    shallowRender.setState({
      reason: 'Broken windows',
      maintainceStart: '10/04/2018',
      maintainceEnd: '11/04/2018'
    });
    const event = {
      preventDefault: jest.fn(),
    };
    sinon.spy(shallowRender.instance(), 'submitMaintainanceData');
    shallowRender.instance().submitMaintainanceData(event);
    expect(shallowRender.instance().submitMaintainanceData.calledOnce).toEqual(true);
  });

  it('calls submitEditedMaintenanceData when edit form is submitted', () =>{
    const currentProps = { ...props, modalType: 'edit-maintenance'};
    const shallowRender = shallow(<MaintainceForm {...currentProps} />);
    shallowRender.setState({
      reason: 'Broken windows',
      maintainceStart: '10/04/2018',
      maintainceEnd: '11/04/2018'
    });
    const event = {
      preventDefault: jest.fn(),
    };
    sinon.spy(shallowRender.instance(), 'submitEditedMaintenanceData');
    shallowRender.instance().submitEditedMaintenanceData(event);
    expect(shallowRender.instance().submitEditedMaintenanceData.calledOnce).toEqual(true);
  });

  it('clears the form when cancel button is clicked', () => {
    const shallowRender = shallow(<MaintainceForm {...props} />);
    shallowRender.setState({
      reason: 'Broken windows',
      maintainceStart: '10/04/2018',
      maintainceEnd: '11/04/2018'
    });
    sinon.spy(shallowRender.instance(), 'handleClearForm');
    shallowRender.instance().handleClearForm();
    expect(shallowRender.instance().handleClearForm.calledOnce).toEqual(true);
  });

  it('Renders error message if field is empty', ()=>{
    const Mountwrapper = mount(<MaintainceForm {...props} />);
    Mountwrapper.find('input[name="reason"]').simulate('blur');
    Mountwrapper.update();
    expect(Mountwrapper.state().errors.reason).toBe('This field is required');
  });
});

describe('<SubmitArea />', () => {
  let wrapper;
  const props = {
    onCancel: jest.fn(),
    handleDelete: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(<SubmitArea {...props} />);
  });

  it('should call the onCancel prop when click is simulated', () => {
    const onCancel = jest.fn;
    wrapper.find('#cancel').simulate('click');
    expect(onCancel).toBeCalled;
  });

  it('should call the handleDelete prop when click is simulated', () => {
    const handleDelete = jest.fn;
    wrapper.find('#submit').simulate('click');
    expect(handleDelete).toBeCalled;
  });
});

