
import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { read } from 'fs';
import generateDynamicDate from '../../helper/generateDynamicDate';
import download from '../../images/icons/save_alt_24px.svg';
import Button from '../buttons/Buttons';
import TravelReadinessPlaceholder from '../Placeholders/TravelReadinessPlaceholder';
import './TravelReadiness.scss';
import AnalyticsPagination from '../Pagination/AnalyticsPagination';

const limit = 9;

class TravelReadiness extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { travelFlow: 'inflow' };
  }
  renderReadinessDetails = (item, index) => {
    const { travelFlow } = this.state;
    const { arrivalDate, departureDate } = item;
    const date = travelFlow.match('inflow') ? arrivalDate : departureDate;
    return (
      <div className="analyticsReport__row analyticsReport__report-details" key={`item${index}`}>
        <div>
          <p>{item.request.name}</p>
        </div>
        <div>
          <p>{item.travelReadiness}</p>
        </div>
        <div>
          <p>{generateDynamicDate({}, date)}</p>
        </div>
      </div>
    );
  }

  renderPagination = (readiness) => {
    const {pagination} = readiness;
    if(pagination && pagination.dataCount > 0){
      return (
        <AnalyticsPagination
          pagination={pagination}
          handlePagination={this.handlePagination}
        />
      );
    }

  }
  getReadinessCSV = () => {
    const { exportReadiness } = this.props;
    const { travelFlow } = this.state;
    exportReadiness({ type: 'file', travelFlow: travelFlow});
  };

  getTravelFlow = travelArgument => {
    const { fetchReadiness } = this.props;
    this.setState({
      travelFlow: travelArgument
    });
    fetchReadiness({page: '1', limit, type:'json', travelFlow: travelArgument});
  }

  travelFlowButton = () => {
    const { travelFlow } = this.state;
    const travelButton = (
      <Fragment>
        <button
          className="travel-readiness-toggle-button-0" type="button"
          id={travelFlow !== 'outflow' ? 'active-travel-flow-button' : null}
          onClick={() => this.getTravelFlow('inflow')}>
        Inflow
        </button>
        <button
          className="travel-readiness-toggle-button-1" type="button"
          id={travelFlow === 'outflow' ? 'active-travel-flow-button' : null}
          onClick={() => this.getTravelFlow('outflow')}>
        Ouflow
        </button>
      </Fragment>
    );
    return travelButton;
  };
  findPages = readiness => {
    if (readiness.pagination) {
      const {currentPage, pageCount} = readiness.pagination;
      return { currentPage, pageCount};
    }
    return {};
  }
  handlePagination = direction => {
    const { readiness, fetchReadiness } = this.props;
    if(readiness){
      const { currentPage, pageCount, limit, prevPage, nextPage } = readiness.pagination;
      if(direction==='Next' && currentPage <= pageCount){
        fetchReadiness({page: nextPage, limit, type:'json', travelFlow: 'inflow'});
      }else if(direction === 'Previous' && prevPage > 0){
        fetchReadiness({page: prevPage, limit, type:'json', travelFlow: 'inflow'});
      }

    }
  }

  renderReadinessTitles = () => {
    const { travelFlow } = this.state;
    const readinessTitles = (
      <div className="analyticsReport__row analyticsReport__report-header">
        <div>
          <p>Name</p>
        </div>
        <div>
          <p>% Complete</p>
        </div>
        <div>
          {travelFlow && travelFlow === 'outflow' ? <p>Expected Departure Date</p> : <p>Expected Arrival Date</p>}
        </div>
      </div>
    );
    return readinessTitles;
  }

  renderServerError = () => {
    return (
      <p className="dashboard-component__error-text--style">
        Oops! An error occurred in retrieving this data
      </p>
    );
  }
  render() {
    const { readiness, renderNotFound } = this.props;
    const { isLoading, error } = readiness;
    const { travelFlow } = this.state;
    const pages = this.findPages(readiness);
    return (
      <div className="analyticsReport__card" id="travel-readiness" style={{marginRight: '30px'}}>
        { isLoading ?
          <TravelReadinessPlaceholder /> : (
            <Fragment>
              <p>Travel Readiness</p>
              <div className="analyticsReport__row analyticsReport__header">
                {this.travelFlowButton()}
                <Button
                  buttonClass="analyticsReport__export-button"
                  reverseText buttonId="btnExportReadinessCSV"
                  text="Export" imageSrc={download}
                  onClick={travelFlow === 'outflow' ? () => this.getReadinessCSV('outflow') : () => this.getReadinessCSV('inflow')} />
              </div>
              {this.renderReadinessTitles()}
              {error && this.renderServerError()}
              { (!error 
                && readiness.readiness.length > 0 
                && readiness.readiness.map((item, index) => this.renderReadinessDetails(item, index))
              )
              }
              {!error && (!readiness.readiness.length && renderNotFound())}
            </Fragment>
          )}
        {!error && this.renderPagination(readiness, pages.currentPage, pages.pageCount)}
      </div>
    );
  }
}
TravelReadiness.propTypes = {
  fetchReadiness: PropTypes.func.isRequired,
  readiness: PropTypes.object.isRequired,
  exportReadiness:PropTypes.func.isRequired,
  renderNotFound: PropTypes.func.isRequired,

};

export default TravelReadiness;
