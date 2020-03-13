import React, {Fragment}  from  'react';
import {connect} from 'react-redux';
import ApprovalsPanelHeader from '../../components/ApprovalsPanelHeader';
import { fetchUserApprovals } from '../../redux/actionCreator/approvalActions';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import WithLoadingTable from '../../components/Table';
import Base from '../Base';
import Utils from '../../helper/Utils';
import checkUserPermission from '../../helper/permissions';

export class Approvals extends Base {

  state = {
    clickPage: true,
    activeStatus: Utils.getActiveStatus(this.props.location.search),
    searchQuery:  this.props.location.search,
    requestId: ''
  }

  componentDidMount () {
    const { page, openModal, fetchUserApprovals, match: {params: {requestId}} } = this.props;
    const { searchQuery } = this.state;
    fetchUserApprovals(searchQuery);
    if(requestId){
      this.storeRequestIdApproval(requestId);
      openModal(true, 'request details', page);
    }
  }

  storeRequestIdApproval = (requestId)=> {
    this.setState({requestId: requestId});
  }

  renderApprovalsTable(){
    const {
      approvals, history, location, openModal, submissionInfo,
      closeModal, shouldOpen, modalType } = this.props;
    const {requestId} = this.state;
    const requestData = approvals.approvals ? approvals.approvals.filter(approval => (approval.id === requestId))[0] : {};
    return(
      <WithLoadingTable
        requests={approvals.approvals}
        location={location}
        history={history}
        isLoading={approvals.isLoading}
        fetchRequestsError={approvals.fetchApprovalsError}
        message={approvals.message}
        type="approvals"
        requestId={requestId}
        closeModal={closeModal}
        openModal={openModal}
        shouldOpen={shouldOpen}
        modalType={modalType}
        submissionInfo={submissionInfo}
        page="Approvals"
        requestData={requestData}
      />
    );
  }

  fetchFilteredApprovals = (query) => {
    const { history, location, fetchUserApprovals } = this.props;
    history.push(`/requests/my-approvals${query}`);
    fetchUserApprovals(query);
    this.setState(prevState => ({
      ...prevState,
      activeStatus: Utils.getActiveStatus(query),
      searchQuery: query
    }));
  }

  onPageChange = (page) => {
    const { searchQuery } = this.state;
    const query = Utils.buildQuery(searchQuery, 'page', page);
    this.fetchFilteredApprovals(query);
  }

  getApprovalsWithLimit = (limit) => {
    const { searchQuery } = this.state;
    const { approvals } = this.props;
    this.getEntriesWithLimit(limit, searchQuery, approvals.pagination, this.fetchFilteredApprovals);
  }

  renderApprovalsPanelHeader(loading){
    const { activeStatus, searchQuery } = this.state;
    const { approvals } = this.props;
    const { openApprovalsCount, pastApprovalsCount } = approvals;

    return(
      <div className="rp-requests__header">
        <ApprovalsPanelHeader
          url={searchQuery}
          openApprovalsCount={openApprovalsCount}
          pastApprovalsCount={pastApprovalsCount}
          fetchApprovals={this.fetchFilteredApprovals}
          getApprovalsWithLimit={this.getApprovalsWithLimit}
          activeStatus={activeStatus}
          approvalsLength={approvals.approvals.length}
          loading={loading}
        />
      </div>
    );
  }

  render() {
    const {approvals, getCurrentUserRole, history} = this.props;
    const { isLoading } = approvals;
    if (!isLoading && getCurrentUserRole.length > 0) {
      const allowedRoles = ['Super Administrator', 'Manager'];
      checkUserPermission(history, allowedRoles, getCurrentUserRole);
    }
    return (
      <Fragment>
        {this.renderApprovalsPanelHeader(approvals.isLoading)}
        {approvals.approvals && this.renderApprovalsTable()}
        {!approvals.isLoading && approvals.approvals.length > 0 && this.renderPagination(approvals.pagination)}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  approvals: state.approvals,
  ...state.modal.modal,
  submissionInfo: state.submissions,
  getCurrentUserRole: state.user.getCurrentUserRole
});

const actionCreators = {
  fetchUserApprovals,
  openModal,
  closeModal
};

export default connect(mapStateToProps, actionCreators)(Approvals);
