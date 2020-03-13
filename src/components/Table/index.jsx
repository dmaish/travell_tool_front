import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import RequestsModal from '../RequestsModal/RequestsModal';
import  CheckListSubmissions  from '../TravelCheckList/CheckListSubmissions';
import Modal from '../modal/Modal';
import './Table.scss';
import withLoading from '../Hoc/withLoading';
import TableMenu from '../TableMenu/TableMenu';
import TravelChecklist from '../TravelCheckList';
import RequestPlaceholder from '../Placeholders/RequestsPlaceholder';

export class Table extends Component {
  state = {
    menuOpen: {
      open: false,
      id: null
    }
  };
  getDuration(trips) {
    const returnDates = trips.map(trip => new Date(trip.returnDate));
    const departureDates = trips.map(trip => new Date(trip.departureDate));
    const minDeparture = Math.min.apply(null, departureDates);
    const maxReturn = Math.max.apply(null, returnDates);
    const duration = Math.abs(
      moment(maxReturn).diff(moment(minDeparture), 'days')
    );
    return `${duration + 1} days`;
  }

  getRequestStatusClassName(status) {
    let newStatus = 'request__status--approved';
    newStatus = (status === 'Open') ? 'request__status--open' : newStatus;
    newStatus = (status === 'Rejected') ? 'request__status--rejected' : newStatus;
    newStatus = (status === 'Verified') ? 'request__status--verified' : newStatus;
    return newStatus;
  }

  toggleMenu = requestId => {
    const { menuOpen } = this.state;
    if (menuOpen.id !== requestId) {
      return this.setState({
        menuOpen: {
          open: true,
          id: requestId
        }
      });
    }
    this.setState({
      menuOpen: {
        open: !menuOpen.open,
        id: requestId
      }
    });
  }
  formatTripType = tripType => {
    if (tripType === 'oneWay') {
      return 'One-way';
    }
    return tripType
      .charAt(0)
      .toUpperCase()
      .concat(tripType.toLowerCase().slice(1));
  };

  handleClickRequest = requestId => {
    const {
      history,
      location: { pathname }
    } = this.props;
    history.push(`${pathname}/${requestId}`);
  };

  handleFileUpload = async (file, checklistItemId, tripId, checkId, requestId) => {
    const { uploadFile } = this.props;
    delete axios.defaults.headers.common['Authorization'];
    uploadFile(file.files[0], { checklistItemId, tripId}, checkId, requestId);
  }

  retrieveStatusTag = (requestData, type) => {
    let tag = 'Manager Stage';
    if (requestData.status && requestData.status === 'Approved') {
      tag = 'Travel Stage';
    }
    return tag;
  }

  fetchRequestChecklist(trips){
    const destinations=trips.map(trip=>{return this.fetchChecklistData(trip.destination);});
    return destinations;
  }

  renderNoRequests(message) {
    return <div className="table__requests--empty">{message}</div>;
  }

  renderError(error) {
    return <div className="table__requests--error">{error}</div>;
  }

  renderRequestStatus(request) {
    const {
      editRequest, type, showTravelChecklist, uploadTripSubmissions, deleteRequest,
      openModal, closeModal, shouldOpen, modalType
    } = this.props;
    const { menuOpen } = this.state;
    return (
      <div>
        <div className="table__menu">
          <div
            id={`status-${request.id}`}
            className={this.getRequestStatusClassName(request.status)}
          >
            {request.status}
          </div>
          <TableMenu
            deleteRequest={deleteRequest} editRequest={editRequest}
            showTravelChecklist={showTravelChecklist} closeModal={closeModal}
            uploadTripSubmissions={uploadTripSubmissions}
            requestStatus={request.status} type={type} modalType={modalType}
            menuOpen={menuOpen} request={request} openModal={openModal}
            toggleMenu={this.toggleMenu} shouldOpen={shouldOpen}
          />
        </div>
      </div>
    );
  }

  renderApprovalsIdCell(request) {
    return (
      <td className="mdl-data-table__cell--non-numeric table__requests__destination table__data freeze">
        <div
          onKeyPress={() => {}}
          onClick={() => this.handleClickRequest(request.id)}
          role="button"
          tabIndex="0"
          className="button-outline"
        >
          {request.id}
        </div>
      </td>
    );
  }

  renderName(type, request) {
    return type === 'approvals' && (
      <td className="mdl-data-table__cell--non-numeric table__data pl-sm-100">
        {request.name}
      </td>
    );
  }

  renderTravelCompletion(type, travelCompletion) {
    return (type === 'requests' || type === 'verifications') && (
      <td className="mdl-data-table__cell--non-numeric table__data">
        {travelCompletion || '0% complete'}
      </td>
    );
  }

  renderRequest(request, type) {
    const { trips, travelCompletion } = request;
    const tripTypeFormatted = this.formatTripType(request.tripType);
    const travelDuration =
      request.tripType !== 'oneWay' ? this.getDuration(trips) : 'Not applicable';
    return (
      <tr key={request.id} className="table__row">
        {this.renderApprovalsIdCell(request)}
        {this.renderName(type, request)}
        <td
          className={`mdl-data-table__cell--non-numeric table__data ${
            type === 'requests' ? 'pl-sm-100' : ''
          }`}
        >
          {tripTypeFormatted}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {trips.length > 0 && trips[0].origin}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {travelDuration}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {moment(request.departureDate).format('DD MMM YYYY')}
        </td>
        { this.renderTravelCompletion(type, travelCompletion)}
        <td className="mdl-data-table__cell--non-numeric table__requests__status table__data">
          {this.renderRequestStatus(request)}
        </td>
      </tr>
    );
  }

  renderTableHead(type) {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze">
          Request ID
        </th>
        {type === 'approvals' && (
          <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100">
            Owner
          </th>
        )}
        <th
          className={`mdl-data-table__cell--non-numeric table__head ${
            type === 'requests' ? 'pl-sm-100' : ''
          }`}
        >
          Trip Type
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Origin
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Duration
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Date Created
        </th>
        { (type === 'requests' || type === 'verifications') && (
          <th className="mdl-data-table__cell--non-numeric table__head">
            Travel checklist
          </th>
        )}
        <th className="mdl-data-table__cell--non-numeric table__head table__head--last">
          Status
        </th>
      </tr>
    );
  }


  renderDetailsModal() {
    const { closeModal, shouldOpen, modalType, requestId, page, requestData, type } = this.props;
    const redirectLink = ['Verifications', 'Approvals'].includes(page) ? `/my-${page.toLowerCase()}` : '';
    return (
      <Modal
        requestId={requestId}
        closeModal={closeModal}
        width="900px"
        modalId="request-details-modal"
        modalContentId="request-details-modal-content"
        visibility={
          shouldOpen && modalType === 'request details'
            ? 'visible'
            : 'invisible'
        }
        title={`#${requestId} Request Details`}
        modalBar={
          <div className="table__modal-bar-text">{this.retrieveStatusTag(requestData, type)}</div>
        }
      >
        {(type === 'verifications') &&
          <RequestsModal navigatedPage={page} redirectLink={redirectLink} requestId={requestId} />
        }
        {(type !== 'verifications') &&
          <RequestsModal navigatedPage={page} redirectLink={redirectLink} requestId={requestId} />
        }
      </Modal>
    );
  }

  renderTravelCheckListModal() {
    const { closeModal, shouldOpen, modalType, travelChecklists } = this.props;
    const { menuOpen: { id } } = this.state;
    return (
      <Modal
        closeModal={closeModal}
        width="600px"
        modalId="travel-checkList-modal"
        modalContentId="travel-checkList-modal-content"
        visibility={
          shouldOpen && modalType === 'travel checklist'
            ? 'visible'
            : 'invisible'
        }
        title="Travel Checklist"
        modalBar={(<div className="table__modal-bar-text">{id}</div>)}
      >
        <TravelChecklist travelChecklists={travelChecklists} />
      </Modal>
    );
  }

  renderSubmissionsModal() {
    const {
      closeModal, shouldOpen, modalType, fileUploads, handleCloseSubmissionModal,
      submissionInfo, fetchSubmission, postSubmission, fetchUserRequests
    } = this.props;
    const {
      submissions, isFetching, isUploading, percentageCompleted,
      itemsToCheck, postSuccess, tripType,
    } = submissionInfo;
    const { menuOpen: { id } } = this.state;
    return (
      <Modal
        closeModal={handleCloseSubmissionModal}
        width="900px"
        customModalStyles="custom-overlay"
        modalId="checklist-submission-modal"
        modalContentId="checklist-submission-modal-content"
        visibility={shouldOpen && modalType === 'upload submissions'
          ?'visible'
          :'invisible'
        }
        title="Travel Checklist"
        modalBar={<div className="table__modal-bar-text">{id}</div>}
      >
        <CheckListSubmissions
          requestId={id || ''} shouldOpen={shouldOpen} closeModal={closeModal}
          modalType={modalType} postSubmission={postSubmission} tripType={tripType}
          fetchSubmission={fetchSubmission} fetchUserRequests={fetchUserRequests}
          percentageCompleted={percentageCompleted} submissions={submissions}
          itemsToCheck={itemsToCheck} isLoading={isFetching} handleFileUpload={this.handleFileUpload}
          fileUploads={fileUploads} postSuccess={postSuccess} isUploadingStage2={isUploading}
        />
      </Modal>
    );
  }

  render() {
    const { requests, type, fetchRequestsError, message,requestId } = this.props;
    return (
      <Fragment>
        <div className="table__container">
          {fetchRequestsError && this.renderError(fetchRequestsError)}
          {requests &&
            requests.length > 0 && (
            <table className="mdl-data-table mdl-js-data-table table__requests">
              <thead>{this.renderTableHead(type)}</thead>
              <tbody className="table__body">
                {requests.map(request => this.renderRequest(request, type))}
              </tbody>
            </table>
          )}
          {!fetchRequestsError &&
            !requests.length &&
            this.renderNoRequests(message)}
          {requestId && this.renderDetailsModal()}
          {this.renderTravelCheckListModal()}
          {this.renderSubmissionsModal()}
        </div>
      </Fragment>
    );
  }
}

Table.propTypes = {
  requests: PropTypes.array,
  type: PropTypes.string,
  fetchRequestsError: PropTypes.string,
  closeModal: PropTypes.func,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  requestId: PropTypes.string,
  requestData: PropTypes.object,
  message: PropTypes.string,
  page: PropTypes.string,
  editRequest: PropTypes.func,
  travelChecklists: PropTypes.object,
  showTravelChecklist: PropTypes.func,
  fetchUserRequests: PropTypes.func,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  uploadTripSubmissions: PropTypes.func,
  fetchSubmission: PropTypes.func,
  postSubmission: PropTypes.func,
  submissionInfo: PropTypes.object.isRequired,
  uploadFile: PropTypes.func,
  fileUploads: PropTypes.object,
  deleteRequest: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  handleCloseSubmissionModal: PropTypes.func,
};

Table.defaultProps = {
  type: 'requests',
  fetchRequestsError: null,
  requests: [],
  closeModal: () => {},
  shouldOpen: false,
  modalType: null,
  message: '',
  page: '',
  requestId: '',
  requestData: {},
  travelChecklists: {},
  editRequest: () => {},
  showTravelChecklist: () => {},
  uploadTripSubmissions: () => {},
  uploadFile: () => {},
  postSubmission: () => {},
  fetchSubmission: () => {},
  fetchUserRequests: () => {},
  fileUploads: {},
  handleCloseSubmissionModal: () => {}
};

export default withLoading(Table, RequestPlaceholder);
