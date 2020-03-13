import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Utils from '../../helper/Utils';
import Button from '../buttons/Buttons';
import './buttonGroup.scss';

class ButtonGroup extends PureComponent {
  filterEntries = (entriesType, statusQuery) => {
    const { fetchRequests, fetchApprovals, url } = this.props;
    const limit = Utils.getCurrentLimit(url);
    const search = Utils.getQueryValue(url, 'search');
    const paginationQuery = limit === '' ?
      '?page=1' : `?page=1&limit=${limit}`;

    const searchQuery = (search) ? `&search=${search}` : '';

    if(entriesType === 'requests')
      fetchRequests(`${paginationQuery}${statusQuery}${searchQuery}`);
    else
      fetchApprovals(`${paginationQuery}${statusQuery}${searchQuery}`);
  }

  renderApprovalsButton () {
    const { openApprovalsCount, pastApprovalsCount, activeStatus } = this.props;
    return (
      <Fragment>
        <Button
          buttonClass={`bg-btn ${activeStatus === 'all' ? 'bg-btn--active' : ''}`}
          text="All"
          buttonId="all-button"
          onClick={() => this.filterEntries('approvals', '')}
        />
        <Button
          buttonClass={`bg-btn bg-btn--with-badge ${activeStatus === 'open' ? 'bg-btn--active' : ''}`}
          responsiveText="Open"
          disabled={openApprovalsCount === 0}
          badge={openApprovalsCount}
          showBadge={openApprovalsCount > 0}
          badgeClass={activeStatus === 'open' ? 'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
          buttonId="open-button"
          onClick={() => this.filterEntries('approvals', '&status=open')}
          text="Pending Approvals"
        />
        <Button
          buttonClass={`bg-btn ${activeStatus === 'past' ? 'bg-btn--active' : ''}`}
          responsiveText="Past"
          buttonId="past-button"
          text="Past Approvals"
          disabled={pastApprovalsCount === 0}
          onClick={() => this.filterEntries('approvals', '&status=past')}
        />
      </Fragment>
    );
  }

  renderRequestsButton (openRequestsCount, pastRequestsCount) {
    const { activeStatus } = this.props;
    return (
      <Fragment>
        <Button
          buttonClass={`bg-btn ${activeStatus === 'all' ? 'bg-btn--active' : ''}`}
          text="All"
          buttonId="all-button"
          onClick={() => this.filterEntries('requests', '')}
        />
        <Button
          buttonClass={`bg-btn bg-btn--with-badge ${activeStatus === 'open' ? 'bg-btn--active' : ''}`}
          text="Open Requests"
          responsiveText="Open"
          buttonId="open-button"
          disabled={openRequestsCount === 0}
          badge={openRequestsCount}
          showBadge={openRequestsCount > 0}
          badgeClass={activeStatus === 'open' ? 'bg-btn--with-badge--active' : 'bg-btn--with-badge--inactive'}
          onClick={() => this.filterEntries('requests', '&status=open')}
        />
        <Button
          buttonClass={`bg-btn ${activeStatus === 'past' ? 'bg-btn--active' : ''}`}
          disabled={pastRequestsCount === 0}
          text="Past Requests"
          responsiveText="Past"
          buttonId="past-button"
          onClick={() => this.filterEntries('requests', '&status=past')}
        />
      </Fragment>
    );
  }

  renderVerificationButton () {
    const { approvedApprovalsCount, verifiedApprovalsCount, activeStatus } = this.props;
    return (
      <Fragment>
        <Button
          buttonClass={`bg-btn ${activeStatus === 'all' ? 'bg-btn--active' : ''}`}
          text="All"
          buttonId="all-button"
          onClick={() => this.filterEntries('approvals', '')}
        />
        <Button
          buttonClass={`bg-btn bg-btn--with-badge ${activeStatus === 'approved' ? 'bg-btn--active' : ''}`}
          responsiveText="Pending"
          disabled={approvedApprovalsCount === 0}
          badge={approvedApprovalsCount}
          showBadge={approvedApprovalsCount > 0}
          badgeClass={activeStatus === 'approved' ? 'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
          buttonId="open-button"
          onClick={() => this.filterEntries('approvals', '&status=approved')}
          text="Pending Verifications"
        />
        <Button
          buttonClass={`bg-btn ${activeStatus === 'verified' ? 'bg-btn--active' : ''}`}
          responsiveText="Past"
          buttonId="past-button"
          text="Past Verifications"
          disabled={verifiedApprovalsCount === 0}
          onClick={() => this.filterEntries('approvals', '&status=verified')}
        />
      </Fragment>
    );
  }

  render() {
    const { buttonsType, openRequestsCount, pastRequestsCount } = this.props;
    return (
      <div className="button-group">
        { buttonsType === 'approvals' && this.renderApprovalsButton()}
        { buttonsType === 'requests' &&
          this.renderRequestsButton(openRequestsCount, pastRequestsCount) }
        { buttonsType === 'verifications' && this.renderVerificationButton()}
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  openRequestsCount: PropTypes.number,
  pastRequestsCount: PropTypes.number,
  pastApprovalsCount: PropTypes.number,
  openApprovalsCount: PropTypes.number,
  approvedApprovalsCount: PropTypes.number,
  verifiedApprovalsCount: PropTypes.number,
  fetchApprovals: PropTypes.func,
  fetchRequests: PropTypes.func,
  url: PropTypes.string,
  buttonsType: PropTypes.string.isRequired,
  activeStatus: PropTypes.string,
};

ButtonGroup.defaultProps = {
  openRequestsCount: null,
  pastRequestsCount: null,
  pastApprovalsCount: null,
  openApprovalsCount: null,
  approvedApprovalsCount: null,
  verifiedApprovalsCount: null,
  fetchApprovals: null,
  fetchRequests: null,
  url: '',
  activeStatus: 'all'
};


export default ButtonGroup;
