import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import './TripDetails.scss';

export default class TripDetails extends Component {

  reduceDuration = (value, type, start, end) => {
    start = start.add(value, type);
    let diff = end.diff(start);
    return [start, diff];
  }

  _getDurationObject = (trip) => {
    let years, months, weeks, days;
    let start = moment(trip.checkInDate, 'YYYY-MM-DD');
    const end = moment(trip.checkOutDate, 'YYYY-MM-DD');
    if(!start.isValid() || !end.isValid())
      return 'n/a';
    // add 1 day for inclusivity
    let diff = end.add(1, 'days').diff(start);
    years = moment.duration(diff).years();
    // determine remainder  months
    [start, diff] = this.reduceDuration(years, 'years', start, end);
    months = moment.duration(diff).months();
    // determine remainder weeks
    [start, diff] = this.reduceDuration(months, 'months', start, end);
    weeks = moment.duration(diff).weeks();
    // determine remainder days
    [start, diff] = this.reduceDuration(weeks, 'weeks', start, end);
    days = moment.duration(diff).days();
    return {years, months, weeks, days};
  }

  humanizeDuration = (trip) => {
    const values = this._getDurationObject(trip);
    if (values === 'n/a')
      return values;
    const durationStrings = Object.keys(values).map(key => {
      if(!values[key])
        return '';
      let capitalizedKey = key.charAt(0)
        .toUpperCase()
        .concat(key.substring(1));
      if(values[key] === 1)
        capitalizedKey = capitalizedKey.slice(0, -1);

      return `${values[key]} ${capitalizedKey}`;
    });
    const humanFriendlyString = durationStrings.join(' ');
    return humanFriendlyString;
  }

  handleClickBookingDetailsBody = (e) => {
    e.stopPropagation();
  }

  handleCloseDetailsButton = () => {
    const {toggleBookingDetails} = this.props;
    toggleBookingDetails('close');
  }

  renderBookingDetailsHeader = (trip) => {
    return (
      <div className="trip-booking-details__header">
        <span>{trip.request.name}</span>
        <div
          tabIndex="-1"
          role="presentation"
          onKeyUp={()=>{}}
          className="close-button"
          onClick={this.handleCloseDetailsButton}
        >
          <div>&times;</div>
        </div>
      </div>
    );
  }

  renderBookingDetailsBody = (trip) => {
    const checkInDate = trip.checkInDate
      ? moment(trip.checkInDate, 'YYYY-MM-DD').format('DD MMM YYYY')
      : 'n/a';
    const  checkOutDate = trip.checkOutDate
      ? moment(trip.checkOutDate, 'YYYY-MM-DD').format('DD MMM YYYY')
      : 'n/a';
    const { handleChangeRoomModal } = this.props;

    return (
      <div className="trip-booking-details__body">
        <div>
          <span>Status</span>
          <span>Booked</span>
        </div>
        <div>
          <span>Check-in</span>
          <span>{checkInDate}</span>
        </div>
        <div>
          <span>Check-out</span>
          <span>{checkOutDate}</span>
        </div>
        <div>
          <span>Duration</span>
          <span>{this.humanizeDuration(trip)}</span>
        </div>
        <div>
          <span>Origin</span>
          <span>{trip.origin}</span>
        </div>
        {
          (trip.checkStatus !== 'Checked Out') && (
            <div>
              <span>
                <button
                  type="button"
                  className="trip-booking-details__button"
                  onClick={() => handleChangeRoomModal(trip)}
                >
          Change Room
                </button>
              </span>
            </div>
          )}
        
      </div>
    );
  }

  determineTranslateClass = () => {
    const { translateDetailsLeft } = this.props;
    return translateDetailsLeft ? 'translateX' : '';
  }

  render() {
    const { bookingDetailsPos, detailsVariantClass, trip } = this.props;
    const translateClass = this.determineTranslateClass();
    return (
      <div
        className={`trip-booking-details details-${detailsVariantClass} ${translateClass}`}
        onClick={this.handleClickBookingDetailsBody}
        role="presentation"
        style={{
          position: 'absolute',
          left: `${bookingDetailsPos}px`,
        }}
      >
        {this.renderBookingDetailsHeader(trip)}
        {this.renderBookingDetailsBody(trip)}
      </div>
    );
  }
}

TripDetails.propTypes = {
  trip: PropTypes.object.isRequired,
  bookingDetailsPos: PropTypes.string,
  detailsVariantClass: PropTypes.string,
  toggleBookingDetails: PropTypes.func.isRequired,
  translateDetailsLeft: PropTypes.bool,
  handleChangeRoomModal: PropTypes.func.isRequired
};

TripDetails.defaultProps = {
  bookingDetailsPos: '100px',
  detailsVariantClass: 'hidden',
  translateDetailsLeft: false
};
