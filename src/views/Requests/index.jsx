import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WithLoadingTable from '../../components/Table';
import RequestPanelHeader from '../../components/RequestPanelHeader/RequestPanelHeader';
import Utils from '../../helper/Utils';
import Modal from '../../components/modal/Modal';
import Base from '../Base';
import { NewRequestForm } from '../../components/Forms';
import API from '../../services/AccommodationAPI';
import {
  fetchAvailableRooms, fetchAvailableRoomsSuccess
} from '../../redux/actionCreator/availableRoomsActions';
import {
  fetchUserRequests, createNewRequest, editRequest,
  fetchEditRequest, deleteRequest, fetchUserRequestDetails,
} from '../../redux/actionCreator/requestActions';
import updateUserProfile from '../../redux/actionCreator/userProfileActions';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { fetchRoleUsers } from '../../redux/actionCreator/roleActions';
import { getOccupation } from '../../redux/actionCreator/occupationActions';
import { fetchTravelChecklist } from '../../redux/actionCreator/travelChecklistActions';
import { fetchSubmission, postSubmission } from '../../redux/actionCreator/checkListSubmissionActions';
import { uploadFile } from '../../redux/actionCreator/fileUploadActions';
import NotFound from '../ErrorPages';


export class Requests extends Base {
  constructor(props) {
    super(props);
  }
  state = {
    hideNewRequestModal: true,
    activeStatus: Utils.getActiveStatus(this.props.location.search),
    url: this.props.location.search,
    requestForEdit: null,
    requestId: ''
  };

  componentDidMount() {
    const {
      fetchUserRequests, fetchAvailableRooms,
      getOccupation, fetchRoleUsers,
      page, openModal,
      match: {
        params: { requestId }
      }
    } = this.props;
    const { url } = this.state;
    fetchUserRequests(url);
    fetchRoleUsers(53019);
    getOccupation();
    fetchAvailableRooms();
    if (requestId) {
      this.storeRequestIdRequest(requestId);
      openModal(true, 'request details', page);
    }
  }

  handleDeleteRequest = (requestId) => {
    const { deleteRequest } = this.props;
    deleteRequest(requestId);
  }

  handleEditRequest = (requestId) => {
    const { openModal, fetchEditRequest } = this.props;
    fetchEditRequest(requestId);
    openModal(true, 'edit request');
  }

  handleShowTravelChecklist = (request, modalType) => {
    const { fetchTravelChecklist, openModal, fetchSubmission } = this.props;
    const { id: requestId, tripType } = request;
    modalType.match('travel checklist') && fetchTravelChecklist(requestId);
    modalType.match('upload submissions') &&
      fetchSubmission({ requestId, tripType });
    openModal(true, modalType);
  }

  handleCloseSubmissionModal = () => {
    const { closeModal } = this.props;
    API.setToken();
    closeModal();
  }

  fetchRequests = query => {
    const { history, fetchUserRequests} = this.props;
    history.push(`/requests${query}`);
    fetchUserRequests(query);
    this.setState(prevState => ({
      ...prevState,
      activeStatus: Utils.getActiveStatus(query),
      searchQuery: query,
      url: query
    }));
  };

  onPageChange = page => {
    const { url } = this.state;
    const query = Utils.buildQuery(url, 'page', page);
    this.fetchRequests(query);
  };

  getRequestsWithLimit = limit => {
    const { url } = this.state;
    const { pagination } = this.props;
    this.getEntriesWithLimit(limit, url, pagination, this.fetchRequests);
  };

  storeRequestIdRequest = requestId => {
    this.setState({ requestId: requestId });
  };

  renderRequestPanelHeader(isFetching) {
    const {
      openRequestsCount, requests, pastRequestsCount, openModal,
      shouldOpen,modalType
    } = this.props;
    const { url, activeStatus } = this.state;
    return (
      <div className="rp-requests__header">
        <RequestPanelHeader
          openRequestsCount={openRequestsCount}
          fetchRequests={this.fetchRequests}
          requestsLength={requests.length}
          pastRequestsCount={pastRequestsCount}
          getRequestsWithLimit={this.getRequestsWithLimit}
          url={url}
          activeStatus={activeStatus}
          openModal={openModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
          loading={isFetching}
        />
      </div>
    );
  }

  renderRequests(requests, isLoading, error, message) {
    const {
      history, location, openModal, closeModal, shouldOpen, modalType ,
      travelChecklists, fetchSubmission, postSubmission, submissionInfo,
      isFetching, requestData, uploadFile, fileUploads, fetchUserRequests
    } = this.props;
    const { url, requestId } = this.state;
    return (
      <div className="rp-table">
        <WithLoadingTable
          type="requests" editRequest={this.handleEditRequest}
          travelChecklists={travelChecklists}
          showTravelChecklist={this.handleShowTravelChecklist}
          uploadTripSubmissions={this.handleUploadSubmissionModal}
          location={location} history={history}
          fetchUserRequests={() => fetchUserRequests(url)}
          requestId={requestId} requests={requests}
          isLoading={isFetching} fetchRequestsError={error}
          closeModal={closeModal} openModal={openModal}
          shouldOpen={shouldOpen} modalType={modalType}
          message={message} page="Requests" fileUploads={fileUploads}
          fetchSubmission={fetchSubmission} postSubmission={postSubmission}
          submissionInfo={submissionInfo} isFetching={isFetching}
          requestData={requestData} uploadFile={uploadFile}
          deleteRequest={this.handleDeleteRequest}
          handleCloseSubmissionModal={this.handleCloseSubmissionModal}
        />
      </div>);
  }
  renderNewRequestForm() {
    const {
      updateUserProfile, userData, getUserData,
      user, createNewRequest,
      loading,errors,closeModal,shouldOpen,
      modalType, roleUsers,requestOnEdit,editRequest,
      fetchUserRequests,occupations,
      fetchAvailableRooms, availableRooms, fetchAvailableRoomsSuccess, creatingRequest
    } = this.props;
    const { url } = this.state;
    return (
      <Modal
        closeModal={closeModal}
        width="81.95%"
        visibility={(shouldOpen && (modalType === 'edit request' || modalType === 'new model'))
          ? 'visible' : 'invisible'
        }
        title={modalType === 'edit request' ? 'Edit Travel Request' : 'New Travel Request'}
      >
        <NewRequestForm
          updateUserProfile={updateUserProfile} user={user} errors={errors}
          userData={userData && userData.result} occupations={occupations}
          handleCreateRequest={createNewRequest}
          handleEditRequest={editRequest} loading={loading} closeModal={closeModal}
          managers={roleUsers} availableRooms={availableRooms} modalType={modalType}
          requestOnEdit={requestOnEdit} fetchUserRequests={() => fetchUserRequests(url)}
          fetchAvailableRooms={fetchAvailableRooms} getUserData={getUserData}
          fetchAvailableRoomsSuccess={fetchAvailableRoomsSuccess}
          creatingRequest={creatingRequest}
        />
      </Modal>
    );
  }
  renderRequestPage() {
    const {
      isFetching, requests, pagination,
      fetchRequestsError, message, match
    } = this.props;
    const { requestId } = this.state;
    const filteredReqId = requests.filter(request => request.id === requestId);

    return (
      <Fragment>
        {/* {!isFetching && (requestId && match.params.requestId && !filteredReqId.length) && <NotFound redirectLink="/requests" />} */}
        {this.renderRequestPanelHeader(isFetching)}
        {requests &&
          this.renderRequests(requests, isFetching, fetchRequestsError, message)}
        {!isFetching && requests.length > 0 && this.renderPagination(pagination)}
      </Fragment>
    );
  }
  render() {
    return (
      <Fragment>
        {this.renderNewRequestForm()}
        {this.renderRequestPage()}
      </Fragment>
    );
  }
}

Requests.propTypes = {
  user: PropTypes.object,
  fetchUserRequests: PropTypes.func.isRequired,
  fetchRoleUsers: PropTypes.func.isRequired,
  fetchRequestsError: PropTypes.string,
  requests: PropTypes.array,
  pagination: PropTypes.object,
  openRequestsCount: PropTypes.number,
  pastRequestsCount: PropTypes.number,
  isLoading: PropTypes.bool,
  url: PropTypes.string,
  history: PropTypes.shape({}).isRequired,
  createNewRequest: PropTypes.func.isRequired,
  fetchEditRequest: PropTypes.func.isRequired,
  editRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  creatingRequest: PropTypes.bool,
  errors: PropTypes.array,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  travelChecklists: PropTypes.object,
  fetchAvailableRooms: PropTypes.func.isRequired,
  fetchSubmission: PropTypes.func.isRequired,
  postSubmission: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  fetchAvailableRoomsSuccess: PropTypes.func.isRequired,
  submissionInfo: PropTypes.object.isRequired,
  fileUploads: PropTypes.object.isRequired,
};
Requests.defaultProps = {
  url: '',
  fetchRequestsError: null,
  requests: [],
  pagination: {},
  isLoading: false,
  isFetching: false,
  creatingRequest: false,
  openRequestsCount: null,
  pastRequestsCount: null,
  errors: [],
  modalType: '',
  user: {}
};
export const mapStateToProps = ({requests, modal, role, user, occupations,
  travelChecklist, availableRooms, submissions, fileUploads }) => ({
  ...requests,
  ...modal.modal,
  ...role,
  ...occupations,
  travelChecklists: travelChecklist,
  userData: user.getUserData,
  availableRooms,
  submissionInfo: submissions,
  fileUploads
});
const actionCreators = {
  fetchUserRequests,
  createNewRequest,
  fetchEditRequest,
  editRequest,
  fetchRoleUsers,
  openModal,
  closeModal,
  updateUserProfile,
  getOccupation,
  fetchTravelChecklist,
  fetchAvailableRooms,
  fetchSubmission,
  postSubmission,
  fetchAvailableRoomsSuccess,
  uploadFile,
  deleteRequest
};

export default connect(mapStateToProps,actionCreators)(Requests);
