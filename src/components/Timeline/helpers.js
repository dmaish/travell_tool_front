import {calendarConstants} from './settings';

const getAveDaysPerMonth = (date) => {
  const {DAYS_IN_LEAP_YEAR, MONTHS_IN_YEAR} = calendarConstants;
  let noOfDaysInYear = DAYS_IN_LEAP_YEAR - 1;
  date.isLeapYear()
    ? noOfDaysInYear = DAYS_IN_LEAP_YEAR
    : null;
  return (noOfDaysInYear/MONTHS_IN_YEAR);
};

export const getViewTypeProperties = (timelineStartDate, type) => {
  switch (type) {
  case 'year':
    // one timeline segment is a month, containing aveDaysInMonth
    return {
      noOfSegments: calendarConstants.MONTHS_IN_YEAR,
      noOfDaysPerSegment: getAveDaysPerMonth(timelineStartDate),
    };
  case 'week':
    return {
      noOfSegments: calendarConstants.DAYS_IN_WEEK,
      noOfDaysPerSegment: 1,
    };
  case 'month':
  default:
    return {
      noOfSegments: timelineStartDate.daysInMonth(),
      noOfDaysPerSegment: 1,
    };
  }
};

export default getAveDaysPerMonth;
