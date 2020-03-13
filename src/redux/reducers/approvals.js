import {
  FETCH_USER_APPROVALS,
  FETCH_USER_APPROVALS_SUCCESS,
  FETCH_USER_APPROVALS_FAILURE,
  UPDATE_REQUEST_STATUS,
  UPDATE_REQUEST_STATUS_SUCCESS,
  UPDATE_REQUEST_STATUS_FAILURE
} from '../constants/actionTypes';

const initState = {
  approvals: [],
  isLoading: false,
  message: '',
  openApprovalsCount: '',
  pastApprovalsCount: '',
  pagination: '',
  fetchApprovalError: ''
};

const approvals = (state = initState, action) => {
  switch (action.type) {
  case FETCH_USER_APPROVALS:
    return {
      ...state,
      isLoading: true
    };
  case FETCH_USER_APPROVALS_SUCCESS:
    return {
      ...state,
      approvals: action.approvals,
      isLoading: false,
      message: action.message,
      openApprovalsCount: action.meta.count.open,
      pastApprovalsCount: action.meta.count.past,
      approvedApprovalsCount: action.meta.count.approved,
      verifiedApprovalsCount: action.meta.count.verified,
      pagination: action.meta.pagination
    };
  case FETCH_USER_APPROVALS_FAILURE:
    return {
      ...state,
      isLoading: false,
      fetchApprovalsError: action.error.response.data.error,
    };
  case UPDATE_REQUEST_STATUS:
    return {
      ...state,
      updatingStatus: true,
      approval: action.updatedRequest,
      error: ''
    };
  case UPDATE_REQUEST_STATUS_SUCCESS:
    return {
      ...state,
      updatingStatus: false,
      approvals: state.approvals.map((approval) => {
        if (approval.id === action.updatedRequest.request.id) {
          approval.status = action.updatedRequest.request.status;
        }

        return approval;
      }),
      openApprovalsCount: state.approvals.filter(
        approval => approval.status === 'Open'
      ).length,
      error: ''
    };
  case UPDATE_REQUEST_STATUS_FAILURE:
    return {
      ...state,
      updatingStatus: false,
      error: action.error
    };
  default:
    return state;
  }
};

export default approvals;
