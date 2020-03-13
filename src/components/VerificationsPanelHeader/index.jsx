import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import PageHeader from '../PageHeader';
import ButtonGroup from '../button-group/ButtonGroup';
import HeaderPagination from '../Pagination/HeaderPagination';
import '../RequestPanelHeader/Request.scss';

class ApprovalsPanelHeader extends PureComponent {
  renderButtonGroup = () => {
    const {
      openApprovalsCount,
      pastApprovalsCount,
      approvedApprovalsCount,
      verifiedApprovalsCount,
      fetchApprovals,
      activeStatus,
      approvalsLength,
      url
    } = this.props;
    return (
      <ButtonGroup
        openApprovalsCount={openApprovalsCount}
        fetchApprovals={fetchApprovals}
        pastApprovalsCount={pastApprovalsCount}
        approvedApprovalsCount={approvedApprovalsCount}
        verifiedApprovalsCount={verifiedApprovalsCount}
        url={url}
        activeStatus={activeStatus}
        buttonsType="verifications"
      />
    );
  };

  render() {
    const { url, approvalsLength, getApprovalsWithLimit, loading } = this.props;
    return (
      <div className="request-panel-header">
        <PageHeader title="VERIFICATIONS" />
        {
          approvalsLength > 0 && !loading && (
            <div className="open-requests">
              {this.renderButtonGroup()}
              <HeaderPagination getRequestsWithLimit={getApprovalsWithLimit} url={url} />
            </div>
          )}
      </div>
    );
  }
}

ApprovalsPanelHeader.propTypes = {
  openApprovalsCount: PropTypes.number,
  pastApprovalsCount: PropTypes.number,
  approvedApprovalsCount: PropTypes.number,
  verifiedApprovalsCount: PropTypes.number,
  fetchApprovals: PropTypes.func.isRequired,
  activeStatus: PropTypes.string,
  loading: PropTypes.bool,
  approvalsLength: PropTypes.number,
  url: PropTypes.string.isRequired,
  getApprovalsWithLimit: PropTypes.func.isRequired
};

ApprovalsPanelHeader.defaultProps = {
  activeStatus: 'all',
  openApprovalsCount: null,
  pastApprovalsCount: null,
  approvedApprovalsCount: null,
  verifiedApprovalsCount: null,
  approvalsLength: null,
  loading: false
};

export default ApprovalsPanelHeader;
