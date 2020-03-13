import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format, startOfISOWeek, endOfISOWeek } from 'date-fns';

import './TravelCalendar.scss';
import Utils from '../../helper/Utils';
import TravelCalendarDetails from '../TravelCalendarDetails';
import activeCalendar from '../../images/icons/calendar_active.svg';
import download from '../../images/icons/download.svg';
import CalendarRange from '../CalendarRange';
import TravelCalendarPlaceholder from '../Placeholders/TravelCalendarPlaceholder';
import AnalyticsPagination from '../Pagination/AnalyticsPagination';

class TravelCalendar extends PureComponent {
  state = {
    isCalendarOpen: false,
    page: 1,
    filter: {
      start: format(startOfISOWeek(new Date()), 'YYYY-MM-DD'),
      end: format(endOfISOWeek(new Date()), 'YYYY-MM-DD')
    }
  }

  componentDidMount(){
    const {fetchCalendarAnalytics} = this.props;
    const {filter, page} = this.state;
    if(filter) {
      const query = Utils.manageRangeFilter(filter);
      fetchCalendarAnalytics({type: 'json', filter: query, page});
    }
  }

  handleChange = (range) => {
    const {fetchCalendarAnalytics} = this.props;
    const {filter} = this.state;
    const query = Utils.manageRangeFilter(range);
    const label = Utils.manageFilterBtnLabel(range);
    if(query !== filter){
      this.setState(prevState => ({
        ...prevState,
        filter: range,
        page: 1
      }));
      fetchCalendarAnalytics({type:'json', filter:query, page: 1});
    }
    (range.start !== range.end) && this.handleCalendar();
  }

  handleCalendar = () => {
    this.setState(prevState => {
      const {isCalendarOpen} = prevState;
      return {...prevState, isCalendarOpen: !isCalendarOpen};
    });
  }

  handlePagination = (direction) => {
    const { travelCalendar:{ travelCalendarData }, fetchCalendarAnalytics } = this.props;
    const { filter } = this.state;
    const query = Utils.manageRangeFilter(filter);
    if(travelCalendarData) {
      const { pagination: { prevPage, nextPage, currentPage, pageCount } } = travelCalendarData;
      if(direction === 'Previous' && prevPage > 0) {
        this.setState(prevState => ({ ...prevState, page: prevPage }));
        fetchCalendarAnalytics({type: 'json', filter: query, page: prevPage});
      } else if(direction === 'Next' && (currentPage + 1) <= pageCount) {
        this.setState(prevState => ({ ...prevState, page: nextPage }));
        fetchCalendarAnalytics({type: 'json', filter: query, page: nextPage});
      }
    }
  }

  getTravelCalendarCSV = () => {
    const {downloadCalendarAnalytics} = this.props;
    const {filter} = this.state;
    downloadCalendarAnalytics({type: 'file', filter});
  }

  renderButton (icon, text, onclickFunction) {
    const {isCalendarOpen, filter} = this.state;
    const {travelCalendar:{ travelCalendarData }} = this.props;
    const showDown = travelCalendarData.data.length;
    const range = {
      start: format(filter.start, 'DD MMM, YY'),
      end: format(filter.end, 'DD MMM, YY'),
    };
    return (
      <Fragment>
        <button
          type="button"
          className={text==='Pick a date'?'action-btn--calender':'actions__btn'}
          onClick={onclickFunction}>
          <Fragment>
            {text==='Pick a date' && <div>{`${range.start} - ${range.end}`}</div>}
            <img className="actions__btn--icon" src={icon} alt={text} />
          </Fragment>
        </button>
        {text === 'Pick a date' && (
          <div className={`calendar ${isCalendarOpen ? 'open': ''} ${showDown >= 2 ? 'calendar--down': '' }`}>
            <CalendarRange handleChange={this.handleChange} />
          </div>
        )}
      </Fragment>
    );
  }

  renderSpinner () {
    return (
      <div className="analyticsReport__report-details">
        <br />
        <div className="analyticsReport__spinner" />
        <p className="analyticsReport__text-center">generating report...</p>
      </div>
    );
  }

  renderCalendar (calender, index) {
    return (
      <Fragment key={`calendar-${index}`}>
        <TravelCalendarDetails id="calendar" calendar={calender} />
      </Fragment>
    );
  }

  renderTravelCalendarDetails () {
    const {travelCalendar:{travelCalendarData, travelCalendarError}} = this.props;
    let calendarData;
    if(travelCalendarData.data.length) {
      const data = travelCalendarData.data;
      calendarData = data.map((calender, index) => this.renderCalendar(calender, index));
    } else if(travelCalendarError){
      const notFoundError = travelCalendarError === 'No records found';
      return (
        <div className="demo-card-wide mdl-card mdl-shadow--2dp error-msg">
          <p className={`${!notFoundError && 'dashboard-component__error-text--style'}`}>
            {notFoundError
              ? 'No data to display'
              : 'Oops! An error occurred in retrieving this data'
            }
          </p>
        </div>
      );
    }
    return (
      <Fragment>
        {calendarData}
        <AnalyticsPagination
          pagination={travelCalendarData.pagination}
          handlePagination={this.handlePagination}
        />
      </Fragment>
    );
  }

  renderCalendarHeader () {
    return (
      <div className="calendar-header">
        <p className="title">Travel Calendar</p>
        <div className="actions">
          {this.renderButton(activeCalendar, 'Pick a date', this.handleCalendar)}
          {this.renderButton(download, 'Export', this.getTravelCalendarCSV)}
        </div>
      </div>
    );
  }

  renderLoader () {
    return(
      <div className="demo-card-wide mdl-card mdl-shadow--2dp calender-placeholder">
        <TravelCalendarPlaceholder />
      </div>
    );
  }

  render(){
    const {travelCalendar:{isLoading}} = this.props;
    return (
      <Fragment>
        {this.renderCalendarHeader()}
        {isLoading ? (
          <div className="container">
            {this.renderLoader()}
            {this.renderLoader()}
            {this.renderLoader()}
          </div>
        ) : (
          <div className="container">
            {this.renderTravelCalendarDetails()}
          </div>
        )}
      </Fragment>
    );
  }
}

TravelCalendar.propTypes = {
  fetchCalendarAnalytics: PropTypes.func.isRequired,
  downloadCalendarAnalytics: PropTypes.func.isRequired,
  travelCalendar: PropTypes.object.isRequired
};

export default TravelCalendar;
