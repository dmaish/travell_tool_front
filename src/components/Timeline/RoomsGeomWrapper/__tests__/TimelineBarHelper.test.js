import moment from 'moment';
import TimelineBarHelper from '../TimelineBarHelper';

const values = {
  timelineStartDate: moment('2018-01-01').startOf('month'),
  tripDayWidth: 31,
  timelineViewType: 'month'
};


describe('TripGeomHelper', () => {
  let helper;
  beforeEach(() => {
    helper = new TimelineBarHelper(values);
  });

  it('returns the correct trip statistics', () => {
    const trip = {
      departureDate: '2018-01-01',
      returnDate: '2018-01-07'
    };
    const stats = helper.getTripStats(trip);
    const { length, stayPercentage, tripTimelineOffsetLeft } = stats;
    expect(length).toBe(7);
    expect(stayPercentage).toBe('100%');
    expect(tripTimelineOffsetLeft).toBe(0);
  });

  describe('stayPercentage', () => {
    let params;
    beforeEach(() => {
      params = {
        departureDate: moment('2018-01-07'),
        returnDate: moment('2018-01-13'),
        length: 7,
        today: moment('2018-01-03')
      };
    });
    it('returns correct stayPercentage if departureDate is future', () => {
      expect(helper.getStayPercentage(params)).toBe('0%');
    });

    it('correct stayPercentage if departureDate is past and returnDate\
    is future', () => {
      const minutesInDay = 1440;
      params.departureDate = moment('2018-01-01');
      const lengthInMinutes = params.length * minutesInDay;
      const expectedValue = ((params.today
        .diff(params.departureDate, 'minutes') / lengthInMinutes
      ) * 100);
      expect(helper.getStayPercentage(params)).toBe(`${expectedValue}%`);
    });

    it('computes the leftOffsetMarginErr correctly for year view', () => {
      helper.values.timelineViewType = 'year';
      const departureDate = moment('2018-02-01');
      const timelineStartDate = moment('2018-01-01');
      const aveDaysInMonth = (365 / 12);
      const daysInSegments = aveDaysInMonth * 1; // only one full month since timelineStartDate
      const actualDays = departureDate.startOf('month').diff(
        timelineStartDate, 'days'
      );
      const expectedError = (daysInSegments - actualDays);
      expect(helper
        .calculateLeftOffsetError(departureDate)
      ).toEqual(expectedError);
    });
  });
});
