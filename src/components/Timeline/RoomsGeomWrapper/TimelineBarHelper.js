import moment from 'moment';
import getAveDaysPerMonth from '../helpers';

class TripGeomHelper {
  constructor({timelineStartDate, tripDayWidth, timelineViewType}) {
    this.values = {
      timelineStartDate,
      tripDayWidth,
      timelineViewType
    };
  }

  getStayPercentage = ({departureDate, returnDate, length, today}) => {
    // calcuate stay stayPercentage at minute accuracy
    let value, lengthInMinutes, minutesInDay=1440;
    switch (true) {
    case(today < departureDate):
      return '0%';
    case(today < returnDate):
      lengthInMinutes = length * minutesInDay;
      value = ((today.diff(departureDate, 'minutes') / lengthInMinutes) * 100);
      return `${value}%`;
    default:
      return '100%';
    }
  }

  calculateLeftOffsetError = (date) => {
    const {timelineViewType, timelineStartDate} = this.values;
    if(!(timelineViewType === 'year')) return 0;
    const monthsSince = date.diff(timelineStartDate, 'months');
    const daysInSegments = monthsSince * getAveDaysPerMonth(timelineStartDate);
    const actualDays = date.startOf('month').diff(
      timelineStartDate, 'days'
    );
    return (daysInSegments - actualDays);
  }

  getTripOffsetLeft = (departureDate) => {
    const { timelineStartDate, tripDayWidth } = this.values;
    const daysFromTimelineStart = departureDate.diff(timelineStartDate, 'days');
    const leftOffsetMarginErr = this.calculateLeftOffsetError(departureDate);
    return (daysFromTimelineStart * tripDayWidth) + leftOffsetMarginErr;
  }

  getTripStats = (trip) => {
    const today = moment();
    const departureDate = moment(trip.departureDate, 'YYYY-MM-DD');
    const returnDate = moment(trip.returnDate, 'YYYY-MM-DD');
    // last day of the trip inclusive
    const length = returnDate.add(1, 'days').diff(departureDate, 'days');
    const tripParams = {departureDate, returnDate, length, today};
    const stayPercentage = this.getStayPercentage(tripParams);
    const tripTimelineOffsetLeft = this.getTripOffsetLeft(departureDate);
    return { length, stayPercentage, tripTimelineOffsetLeft };
  }
}

export default TripGeomHelper;
