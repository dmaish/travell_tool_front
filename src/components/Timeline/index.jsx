import React, {PureComponent, Fragment, createRef} from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import RoomsGeomWrapper from './RoomsGeomWrapper';
import TimelineHeader from './TimelineHeader';
import TimelineVerticalAxis from './TimelineVerticalAxis';
import {getViewTypeProperties} from './helpers';
import {calendarConstants} from './settings';
import Utils from '../../helper/Utils';
import MaintenanceForm from '../Forms/MaintainanceForm';
import SubmitArea from '../Forms/MaintainanceForm/FormFieldsets/SubmitArea';
import './Timeline.scss';
import Modal from '../modal/Modal';
import ChangeBedForm from '../Forms/ChangeBedForm';
import InputRenderer, { FormContext }  from '../Forms/FormsAPI';
import * as formMetadata from '../Forms/FormsMetadata/NewRequestFormMetadata';
import Preloader from '../Preloader/Preloader';

class Timeline extends PureComponent {
  constructor(props) {
    super(props);
    this.timelineSegmentsRef = createRef();
    this.state = {
      timelineViewType: 'month',
      timelineStartDate: moment().startOf('month'),
      timelineSegmentWidth: '',
      timelineChoicesOpen: false,
      modalInvisible: true,
      tripId: 0,
      bedId: 0,
      requesterName: '',
      bedChoices: [],
      maintenance: {}
    };
  }

  componentDidMount() {
    this.updateTimelineSegmentWidth();
    this.fetchTimelineData();
  }

  componentWillReceiveProps(nextProps) {
    this.loadAvailableBeds(nextProps);
  }

  componentDidUpdate() {
    this.updateTimelineSegmentWidth();
  }


  fetchTimelineData = () => {
    const {fetchTimelineRoomsData} = this.props;
    const [startDateString, endDateString] = this.getTimelineRange();
    fetchTimelineRoomsData(startDateString, endDateString);
  }

  loadAvailableBeds = (props) => {
    const { availableBeds } = props;
    let bedChoices = availableBeds;
    bedChoices = bedChoices.map(choice => ({
      label: Utils.generateTripRoomName({beds: choice}),
      value: choice.id
    }));
    this.setState(prevState => ({
      ...prevState,
      bedChoices
    }));
  }

  changeTimelineViewType = (userChoice) => {
    this.setState(prevState => {
      const knownPeriodTypes = ['week', 'month', 'year'];
      if (prevState.timelineViewType === userChoice) return prevState;
      if (!knownPeriodTypes.includes(userChoice)) userChoice = 'month';
      return {
        ...prevState,
        timelineViewType: userChoice,
        timelineStartDate: moment().startOf(userChoice)
      };
    }, this.fetchTimelineData);
  }

  handleNavigateTime = (type) => {
    // update timeline view
    const step = (type === 'increment') ? 1 : -1;
    return this.setState(prevState => {
      const {timelineStartDate, timelineViewType, periodOffset} = prevState;
      // don't mutate the timelineStartDate in state
      const cloneStartDate = timelineStartDate.clone();
      cloneStartDate.add(step, `${timelineViewType}s`);
      return {
        ...prevState,
        timelineStartDate: cloneStartDate
      };
    }, this.fetchTimelineData);
  }

  handleGoToToday = () => {
    this.setState(prevState => {
      const { timelineViewType } = prevState;
      return {
        ...prevState,
        timelineStartDate: moment().startOf(timelineViewType)
      };
    }, this.fetchTimelineData);
  }

  getTimelineRange = () => {
    const {timelineStartDate, timelineViewType} = this.state;
    const cloneStartDate = timelineStartDate.clone();
    const startDateString = cloneStartDate
      .format('YYYY-MM-DD');
    const endDateString = cloneStartDate.endOf(`${timelineViewType}`)
      .format('YYYY-MM-DD');
    return [startDateString, endDateString];
  }

  toggleTimelineChoices = () => {
    this.setState(prevState => ({
      ...prevState,
      timelineChoicesOpen: !prevState.timelineChoicesOpen
    }));
  }

  updateTimelineSegmentWidth = async () => {
    // ensure setState is done async after componentDidMount/componentDidUpdate
    const width = await Promise.resolve(
      this.timelineSegmentsRef.current.getBoundingClientRect().width
    );
    this.setState(prevState => ({
      ...prevState,
      timelineSegmentWidth: width
    }));
  }

  getTimelineViewTypeProperties = () => {
    const {
      timelineViewType,
      timelineSegmentWidth,
      timelineStartDate
    } = this.state;
    const {
      noOfSegments,
      noOfDaysPerSegment
    } = getViewTypeProperties(timelineStartDate, timelineViewType);
    return {
      timelineDayWidth: (timelineSegmentWidth/noOfDaysPerSegment),
      noOfSegments
    };
  }

  _computeSegmentDisplayValues = (segIndex, diffType, format, period) => {
    const {timelineStartDate, timelineViewType} = this.state;
    const { handlePeriod } = this.props;
    let current = moment().startOf('day');
    handlePeriod(period, timelineStartDate, timelineViewType);
    if(timelineViewType === 'year') // counts by months
      current = current.startOf('month');
    // don't mutate the timelineStartDate in state
    const cloneStartDate = timelineStartDate.clone();
    let segmentDate, segmentLabel, isCurrentPeriod;
    segmentDate = cloneStartDate.add(segIndex, diffType);
    isCurrentPeriod = current.diff(segmentDate, diffType) === 0;
    segmentLabel = segmentDate.format(format);
    return {segmentLabel, isCurrentPeriod};
  }

  getSegmentDisplayInfo = (index) => {
    const {timelineViewType} = this.state;
    const periodDisplay = this.constructSelectedPeriodDisplay();
    switch (timelineViewType) {
    case 'week':
      return this._computeSegmentDisplayValues(index, 'days', 'ddd M/D', periodDisplay);
    case 'year':
      return this._computeSegmentDisplayValues(index, 'months', 'MMM', periodDisplay);
    case 'month':
    default:
      return this._computeSegmentDisplayValues(index, 'days', 'D', periodDisplay);
    }
  }

  _constructTimelineSegment = (index, ref=undefined) => {
    const {timelineViewType} = this.state;
    const segNodeDispInfo = this.getSegmentDisplayInfo(index);
    const isCurrentClassName = segNodeDispInfo.isCurrentPeriod ? 'current' : '';
    const viewTypeClassName = `${timelineViewType}-view`;
    return (
      <div
        key={index}
        className={`timeline__segment ${isCurrentClassName} ${viewTypeClassName}`}
        ref={ref}
        data-segment-label={segNodeDispInfo.segmentLabel}
      />
    );
  }

  renderTimelineSegments = (availableSegSlotsCount) => {
    /**
     * Creates first node as a reference: good for determining the
        actual width of segments dynamically
     * @param {number} availableSegSlotsCount - number of timeline segments.
    */
    const ref = this.timelineSegmentsRef;
    const segmentsRefNode = this._constructTimelineSegment(0, ref);
    --availableSegSlotsCount;
    // other segments
    const availableSegSlots = new Array(availableSegSlotsCount).fill('');
    return (
      <Fragment>
        {segmentsRefNode}
        {availableSegSlots.map((slot, i) => this._constructTimelineSegment(++i))}
      </Fragment>
    );
  }

  renderChangeRoomModal = () => {
    const { modalInvisible, requesterName, bedId, changeReason,
      values, value, bedIdNames, bedNames, bedChoices } = this.state;
    const { loadingBeds, modalType, shouldOpen, closeModal, loading } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="change-room-modal"
        visibility={
          shouldOpen &&
          (modalType === 'change-room-modal') ? 'visible' : 'invisible'
        }
        closeDeleteCommentModal={this.toggleChangeRoomModal}
        title="Re-assign Room"
        showOverlay={false}
      >
        <ChangeBedForm 
          handleRoomSubmit={this.handleRoomSubmit}
          requesterName={requesterName}
          bedChoices={bedChoices}
          loadingBeds={loadingBeds}
          toggleChangeRoomModal={this.toggleChangeRoomModal}
          closeModal={closeModal}
          loading={loading}        
        />
      </Modal>
    );
  }

  handleDeleteMaintenance = roomId => {
    const { deleteMaintenanceRecord, rooms, updateRoomState, guestHouseId } = this.props;
    deleteMaintenanceRecord(roomId);
    const [startDateString, endDateString] = this.getTimelineRange();
    const data = { fault: false };
    updateRoomState(data, roomId, startDateString, endDateString, guestHouseId);
  };

  renderEditMaintenanceModal = () => {
    const {shouldOpen, closeModal, modalType, editMaintenance, updateMaintenanceRecord } = this.props;
    const { maintenance } = this.state;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="change-room-modal"
        visibility={
          shouldOpen &&
          (modalType === 'edit-maintenance') ? 'visible' : 'invisible'
        }
        closeDeleteCommentModal={this.toggleEditMaintenanceModal}
        title="Edit Maintenance"
        showOverlay={false}
      >
        <MaintenanceForm 
          maintenance={maintenance} 
          modalType={modalType} 
          editMaintenance={editMaintenance}
          updateMaintenanceRecord={updateMaintenanceRecord} 
        />
      </Modal>
    );
  }

  renderDeleteModal = () => {
    const {shouldOpen, closeModal, modalType} = this.props;
    const { maintenance } = this.state;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="delete-maintenance-modal"
        visibility={
          shouldOpen &&
          (modalType === 'delete-maintenance') ? 'visible' : 'invisible'
        }
        closeDeleteCommentModal={this.toggleDeleteMaintenanceModal}
        title="Delete Maintenance"
        showOverlay={false}
      >
        <div>
          <div className="delete-maintenance-text">
                Are you sure you want to delete this maintenance schedule
          </div>
          <hr />
          <SubmitArea 
            onCancel={closeModal} 
            handleDelete={() => this.handleDeleteMaintenance(maintenance.roomId)} 
          />
        </div>
      </Modal>
    );
  }

  handleChangeRoomModal = (trip) => {
    const { modalInvisible } = this.state;
    const { fetchAvailableRooms, openModal } = this.props;
    openModal(true, 'change-room-modal');
    if (modalInvisible === true) {
      // call api to get available beds
      const data = {
        location: trip.destination || '',
        gender: trip.request.gender || '',
        arrivalDate: trip.returnDate || '',
        departureDate: trip.departureDate || '',
        tripType: trip.request.tripType || ''
      };
      fetchAvailableRooms(data);
    }
    this.setState(prevState => ({
      modalInvisible: !prevState.modalInvisible,
      tripId: trip.id,
      requesterName: trip.request.name
    }));
  }

  handleEditMaintenanceModal = (maintenance) => {
    this.setState(prevState => ({ ...prevState, maintenance}));
    const {openModal} = this.props;
    openModal(true, 'edit-maintenance');
  }

  handleDeleteMaintenanceModal = (maintenance) => {
    this.setState(prevState => ({ ...prevState, maintenance}));
    const {openModal} = this.props;
    openModal(true, 'delete-maintenance');
  }

  toggleEditMaintenanceModal = () => {
    const {closeModal} = this.props;
    closeModal(true, 'edit-maintenance');
  }

  toggleDeleteMaintenanceModal = () => {
    const {closeModal} = this.props;
    closeModal(true, 'delete-maintenance');
  }

  toggleChangeRoomModal = () => {
    const { closeModal } = this.props;
    closeModal(true, 'change-room-modal');
  }

  handleRoomSubmit = (newBedId, reason) => {
    const { updateTripRoom } = this.props;
    const { tripId } = this.state;
    const timelineDateArray = this.getTimelineRange();
    updateTripRoom(tripId, newBedId,
      reason, timelineDateArray[0], timelineDateArray[1]);
  }

  constructSelectedPeriodDisplay() {
    const {timelineStartDate, timelineViewType} = this.state;
    let startDateStr, endDateStr, weekStartDisp, weekEndDisp;
    switch (timelineViewType) {
    case 'year':
      return timelineStartDate.format('YYYY');
    case 'week':
      [startDateStr, endDateStr] = this.getTimelineRange();
      weekStartDisp = moment(startDateStr, 'YYYY-MM-DD').format('D');
      weekEndDisp = moment(endDateStr, 'YYYY-MM-DD').format('D MMM YYYY');
      return `${weekStartDisp} - ${weekEndDisp}`;
    case 'month':
    default:
      return timelineStartDate.format('MMMM YYYY');

    }
  }

  render() {
    const {
      timelineStartDate,
      timelineChoicesOpen,
      timelineViewType,
      periodOffset
    } = this.state;
    const {rooms, updateRoomState, guestHouseId,openModal,shouldOpen, 
      addmaintenanceRecord, closeModal, modalType, maintenanceDetails} = this.props;
    const { timelineDayWidth, noOfSegments } = this.getTimelineViewTypeProperties();
    return (
      <div className="timeline">
        <TimelineVerticalAxis
          shouldOpen={shouldOpen}
          openModal={openModal}
          addmaintenanceRecord={addmaintenanceRecord}
          modalType={modalType}
          rooms={rooms}
          updateRoomState={updateRoomState}
          timelineDateRange={this.getTimelineRange()}
          guestHouseId={guestHouseId}
          closeModal={closeModal}
        />
        <TimelineHeader
          selectedTimeDisplay={this.constructSelectedPeriodDisplay()}
          changeTimelineViewType={this.changeTimelineViewType}
          toggleChoices={this.toggleTimelineChoices}
          currentTimelineViewType={timelineViewType}
          onNavigateTime={this.handleNavigateTime}
          showChoices={timelineChoicesOpen}
          goToToday={this.handleGoToToday}
        />
        <div className="timeline__body">
          <div className="timeline__body-segments">
            {this.renderTimelineSegments(noOfSegments)}
            <RoomsGeomWrapper
              timelineStartDate={timelineStartDate}
              timelineViewType={timelineViewType}
              tripDayWidth={timelineDayWidth}
              rooms={rooms}
              handleChangeRoomModal={this.handleChangeRoomModal}
              handleEditMaintenanceModal={this.handleEditMaintenanceModal}
              handleDeleteMaintenanceModal={this.handleDeleteMaintenanceModal}
              deletedMaintenance={maintenanceDetails}
            />
          </div>
        </div>
        {this.renderChangeRoomModal()}
        {this.renderEditMaintenanceModal()}
        {this.renderDeleteModal()}
      </div>
    );
  }
}


Timeline.propTypes = {
  editMaintenance: PropTypes.object,
  maintenanceDetails: PropTypes.object,
  rooms: PropTypes.array,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  addmaintenanceRecord: PropTypes.func.isRequired,
  deleteMaintenanceRecord: PropTypes.func.isRequired,
  updateMaintenanceRecord: PropTypes.func.isRequired,
  fetchTimelineRoomsData: PropTypes.func.isRequired,
  updateRoomState: PropTypes.func.isRequired,
  guestHouseId: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
  updateTripRoom: PropTypes.string.isRequired,
  fetchAvailableRooms: PropTypes.func.isRequired,
  loadingBeds: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handlePeriod: PropTypes.func.isRequired,
};

Timeline.defaultProps = {
  rooms: [],
  editMaintenance: {},
  maintenanceDetails: {}
};

export default Timeline;
