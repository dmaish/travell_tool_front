import React from 'react';
import moment from 'moment';
import Timeline from '..';
import { tripsResponse } from '../../../redux/__mocks__/mocks';
import availableRooms from '../__mocks__/availableRooms';
import Utils from '../../../helper/Utils';

const props = {
  rooms: [{faulty: false}],
  fetchAvailableRooms: jest.fn(),
  deleteMaintenanceRecord: jest.fn(),
  fetchTimelineRoomsData: jest.fn(),
  updateRoomState: jest.fn(),
  guestHouseId: 'guest-house-id-1',
  updateTripRoom: jest.fn(),
  loadingBeds: false,
  openModal: jest.fn(),
  closeModal: jest.fn(),
  handlePeriod: jest.fn(),
  modalType: 'change-room-modal',
  shouldOpen: true,
  loading: false
};

describe('<Timeline />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Timeline {...props} />
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the weekly view correctly', () => {
    wrapper.setState({timelineViewType: 'week'});
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the year view correctly', () => {
    wrapper.setState({timelineViewType: 'year'});
    expect(wrapper).toMatchSnapshot();
  });

  it('updates state well with handleGoToToday and fetches data', () => {
    expect.assertions(2);
    const fetchDataSpy = jest.spyOn(wrapper.instance(), 'fetchTimelineData');
    const goToTodayListener =  wrapper.find('TimelineHeader').prop('goToToday');
    goToTodayListener();
    // default view is month
    expect(wrapper.state().timelineStartDate).toEqual(moment().startOf('month'));
    expect(fetchDataSpy).toHaveBeenCalledTimes(1);
  });

  it('increments the time properly with on navigate time', () => {
    wrapper
      .setState({
        timelineStartDate: moment('2018-01-01').startOf('month')
      });
    const navigateTimeListener = wrapper
      .find('TimelineHeader')
      .prop('onNavigateTime');
    navigateTimeListener('increment');
    const expectedNewStartDate = moment('2018-02-01').startOf('month');
    const newStartDate = wrapper.state().timelineStartDate;
    expect(newStartDate.format('YYYY-MM-DD'))
      .toEqual(expectedNewStartDate.format('YYYY-MM-DD'));
  });

  it('changes timeline view type properly with changeTimelineViewType', () => {
    const changeViewTypeListener = wrapper
      .find('TimelineHeader')
      .prop('changeTimelineViewType');
    changeViewTypeListener('week');
    expect(wrapper.state().timelineViewType).toBe('week');
  });

  it('toggles open and close timelineViewType choices', () => {
    const toggleChoicesHandler = wrapper
      .find('TimelineHeader')
      .prop('toggleChoices');
    toggleChoicesHandler();
    expect(wrapper.state().timelineChoicesOpen).toBe(true);
  });

  it('should call deleteMaintenanceRecord method when delete is clicked', () => {
    wrapper.instance().handleDeleteMaintenance();
    expect(props.deleteMaintenanceRecord).toHaveBeenCalled();
  });

  it('should call updateTripRoom method when handleRoomSubmit is clicked', () => {
    wrapper.instance().handleRoomSubmit();
    expect(props.updateTripRoom).toHaveBeenCalled();
  });

  it('should call closeModal when toggleEditMaintenanceModal is called', () => {
    wrapper.instance().toggleEditMaintenanceModal();
    expect(props.closeModal).toHaveBeenCalled();
  });

  it('should call closeModal when toggleDeleteMaintenanceModal is called', () => {
    wrapper.instance().toggleDeleteMaintenanceModal();
    expect(props.closeModal).toHaveBeenCalled();
  });

  it('should call closeModal when toggleChangeRoomModal is called', () => {
    wrapper.instance().toggleChangeRoomModal();
    expect(props.closeModal).toHaveBeenCalled();
  });

  it('should load state with available beds when loadAvailableBeds is called', () => {
    wrapper.instance().loadAvailableBeds({availableBeds: availableRooms});
    const bedName = Utils.generateTripRoomName({beds: availableRooms[0]});
    const bedId = availableRooms[0].id;
    expect(wrapper.state().bedChoices[0].label).toBe(bedName);
    expect(wrapper.state().bedChoices[0].value).toBe(bedId);
  });
  
  it('should update maintenance state with handleEditMaintenanceModal call', () => {
    const maintenance = {
      departureDate: '10/28/2018',
      arrivalDate: '10/30/2018',
      reason: 'To fix the beds'
    };
    wrapper.instance().handleEditMaintenanceModal(maintenance);
    expect(wrapper.state().maintenance.departureDate).toBe(maintenance.departureDate);
    expect(wrapper.state().maintenance.arrivalDate).toBe(maintenance.arrivalDate);
    expect(wrapper.state().maintenance.reason).toBe(maintenance.reason);
  });

  it('should update maintenance state with handleDeleteMaintenanceModal call', () => {
    const maintenance = {
      departureDate: '10/28/2018',
      arrivalDate: '10/30/2018',
      reason: 'To fix the beds'
    };
    wrapper.instance().handleDeleteMaintenanceModal(maintenance);
    expect(wrapper.state().maintenance.departureDate).toBe(maintenance.departureDate);
    expect(wrapper.state().maintenance.arrivalDate).toBe(maintenance.arrivalDate);
    expect(wrapper.state().maintenance.reason).toBe(maintenance.reason);
  });

  it('should update state with trip id, requester name and modal status', () => {
    const trip = {
      id: 1,
      request: {
        name: 'Jacob'
      }
    };
    wrapper.instance().handleChangeRoomModal(trip);
    expect(wrapper.state().tripId).toBe(trip.id);
    expect(wrapper.state().requesterName).toBe(trip.request.name);
    expect(wrapper.state().modalInvisible).toBe(false);
  });
});
