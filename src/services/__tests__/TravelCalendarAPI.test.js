import moxios from 'moxios';
import TravelCalendarAPI from '../TravelCalendarAPI';
import { fetchTravelCalendarResponse } from '../__mocks__/serviceMocks';
import {resolveBaseUrl} from '../index';

const baseUrl = resolveBaseUrl();


describe('Travel Calendar API', () => {
  beforeEach(() => {
    moxios.install();
    localStorage.setItem('location', 'Nairobi');
  });

  afterEach(() => {
    moxios.uninstall();
  });


  it('should make get request to get travel calendar analytics', async () => {
    const query = {type: 'json', filter: '', page: 1};
    const location = localStorage.getItem('location')

    moxios.stubRequest(`${baseUrl}/analytics/calendar?type=${query.type}&location=${location}&${query.filter}&limit=3&page=${query.page}`, {
      status: 200,
      response: fetchTravelCalendarResponse
    });

    const response = await TravelCalendarAPI.getCalendarAnalytics(query);

    expect(moxios.requests.mostRecent().url)
      .toEqual(`${baseUrl}/analytics/calendar?type=${query.type}&location=${location}&${query.filter}&limit=3&page=${query.page}`);
    expect(response.data).toEqual(fetchTravelCalendarResponse);
  });
});
