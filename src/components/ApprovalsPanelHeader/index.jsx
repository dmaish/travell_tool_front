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
        url={url}
        activeStatus={activeStatus}
        buttonsType="approvals"
      />
    );
  };

  render() {
    const { url, approvalsLength, getApprovalsWithLimit, loading } = this.props;
    return (
      <div className="request-panel-header">
        <PageHeader title="APPROVALS" />
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
  fetchApprovals: PropTypes.func.isRequired,
  activeStatus: PropTypes.string,
  approvalsLength: PropTypes.number,
  url: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  getApprovalsWithLimit: PropTypes.func.isRequired
};

ApprovalsPanelHeader.defaultProps = {
  activeStatus: 'all',
  openApprovalsCount: null,
  pastApprovalsCount: null,
  loading: false,
  approvalsLength: null
};

export default ApprovalsPanelHeader;
