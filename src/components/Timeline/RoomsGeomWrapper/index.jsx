import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import RoomGeomWrapper from './RoomGeomWrapper';
import './RoomsGeomWrapper.scss';

class RoomsGeomWrapper extends PureComponent {
  render() {
    const {rooms, timelineStartDate, tripDayWidth, handleDeleteMaintenanceModal, deletedMaintenance,
      timelineViewType, handleChangeRoomModal, handleEditMaintenanceModal, editMaintenance} = this.props;
    const roomGeoms = rooms.map(room => (
      <RoomGeomWrapper
        status={room.faulty}
        key={room.id}
        beds={room.beds}
        editMaintenance={editMaintenance}
        deletedMaintenance={deletedMaintenance}
        maintainances={room.maintainances}
        timelineStartDate={timelineStartDate}
        tripDayWidth={tripDayWidth}
        timelineViewType={timelineViewType}
        handleChangeRoomModal={handleChangeRoomModal}
        handleEditMaintenanceModal={handleEditMaintenanceModal}
        handleDeleteMaintenanceModal={handleDeleteMaintenanceModal}
      />
    ));
    return (
      <div className="rooms-geometry-wrapper">
        {roomGeoms}
      </div>
    );
  }
}

RoomsGeomWrapper.propTypes = {
  editMaintenance: PropTypes.object,
  deletedMaintenance: PropTypes.object,
  rooms: PropTypes.array.isRequired,
  timelineStartDate: PropTypes.object.isRequired,
  tripDayWidth: PropTypes.number.isRequired,
  timelineViewType: PropTypes.string,
  handleChangeRoomModal: PropTypes.func.isRequired,
  handleEditMaintenanceModal: PropTypes.func.isRequired,
  handleDeleteMaintenanceModal: PropTypes.func.isRequired
};

RoomsGeomWrapper.defaultProps = {
  timelineViewType: 'month',
  editMaintenance: {},
  deletedMaintenance: {}
};

export default RoomsGeomWrapper;
