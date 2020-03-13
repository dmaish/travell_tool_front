import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import BedGeomWrapper from '../BedGeomWrapper';
import MaintenanceDetails from './MaintenanceDetails';
import TimelineBarWrapper from '../TimelineBarWrapper';
import TimelineBar from '../TimelineBarWrapper/TimelineBar';
import TimelineBarHelper from '../TimelineBarHelper';
import './RoomGeomWrapper.scss';

class RoomGeomWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bookingDetailsVisible: false,
      bookingDetailsPos: 0,
      translateDetailsLeft: false
    };
  }

  getBookingDetailsVariant = () => {
    const {bookingDetailsVisible} = this.state;
    return bookingDetailsVisible ? 'visible' : 'hidden';
  }

  checkShouldTranslateDetails = (mouseX) => {
    const screenWidth = window.innerWidth;
    if(screenWidth/2 < mouseX)
      return true;
    return false;
  }

  setBookingDetailsAbsolutePos = (e) => {
    const tripGeomLeft = e.target.getBoundingClientRect().left;
    const mouseX = e.clientX;
    const bookingDetailsPos = mouseX - tripGeomLeft;
    const translateDetailsLeft = this.checkShouldTranslateDetails(mouseX);
    this.setState(prevState => ({
      ...prevState,
      bookingDetailsPos,
      translateDetailsLeft
    }));
  }

  toggleBookingDetails = (type) => {
    this.setState(prevState => {
      switch (type) {
      case 'open':
        if(prevState.bookingDetailsVisible)
          return prevState;
        return {
          ...prevState,
          bookingDetailsVisible: true
        };
      default:
        if(!prevState.bookingDetailsVisible)
          return prevState;
        return {
          ...prevState,
          bookingDetailsVisible: false
        };
      }
    });
  }

  renderMaintananceBar = (tripStats) => {
    const {tripDayWidth} = this.props;
    return (
      <TimelineBar
        tripDayWidth={tripDayWidth}
        tripStats={tripStats}
        customStyle={{
          background: '#FF5359',
        }}
      >
        <div className="maintainance-bar inner">
          Unavailable
        </div>
      </TimelineBar>
    );
  }

  renderMaintenanceDetails = maintenance => {
    const {bookingDetailsPos, translateDetailsLeft} = this.state;
    const detailsVariant = this.getBookingDetailsVariant();
    const {handleDeleteMaintenanceModal, handleEditMaintenanceModal} = this.props;
    return (
      <MaintenanceDetails
        bookingDetailsPos={bookingDetailsPos}
        translateDetailsLeft={translateDetailsLeft}
        toggleBookingDetails={this.toggleBookingDetails}
        detailsVariantClass={detailsVariant}
        handleEditMaintenanceModal={handleEditMaintenanceModal}
        handleDeleteMaintenanceModal={handleDeleteMaintenanceModal}
        maintenance={maintenance}
      />
    );
  }
  
  render() {
    const {beds, timelineStartDate, tripDayWidth,timelineViewType,
      handleChangeRoomModal, maintainances, deletedMaintenance} = this.props;
    const currentMaintenances = (deletedMaintenance.roomId) 
      ? maintainances.filter(room => room.roomId !== deletedMaintenance.roomId) 
      : maintainances;

    const bedGeoms = beds.map(bed => (
      <BedGeomWrapper
        key={bed.id}
        trips={bed.trips}
        timelineStartDate={timelineStartDate}
        tripDayWidth={tripDayWidth}
        timelineViewType={timelineViewType}
        handleChangeRoomModal={handleChangeRoomModal}
      />
    ));
    const maintainanceBars = currentMaintenances.map(maintainance => {
      maintainance.departureDate = maintainance.start;
      maintainance.returnDate = maintainance.end;
      const helper = new TimelineBarHelper(this.props);
      const tripStats = helper.getTripStats(maintainance);
      return (
        <TimelineBarWrapper
          toggleBookingDetails={this.toggleBookingDetails}
          setBookingDetailsAbsolutePos={this.setBookingDetailsAbsolutePos}
          tripStats={tripStats}
          key={maintainance.id}
        >
          {this.renderMaintananceBar(tripStats)}
          {this.renderMaintenanceDetails(maintainance)}
        </TimelineBarWrapper>
      );
    });
    return (
      <div className="room-geometry-wrapper">
        <div className="room-status-bar item-row">
          {maintainanceBars}
        </div>
        {bedGeoms}
      </div>
    );
  }
}

RoomGeomWrapper.propTypes = {
  deletedMaintenance: PropTypes.object,
  maintainances: PropTypes.array.isRequired,
  beds: PropTypes.array.isRequired,
  timelineStartDate: PropTypes.object.isRequired,
  tripDayWidth: PropTypes.number.isRequired,
  timelineViewType: PropTypes.string,
  handleChangeRoomModal: PropTypes.func.isRequired,
  handleEditMaintenanceModal: PropTypes.func.isRequired,
  handleDeleteMaintenanceModal: PropTypes.func.isRequired
};

RoomGeomWrapper.defaultProps = {
  deletedMaintenance: {},
  timelineViewType: 'month'
};

export default RoomGeomWrapper;
