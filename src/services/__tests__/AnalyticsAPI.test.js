import moxios from 'moxios';
import AnalyticsAPI from '../AnalyticsAPI';
import {
  fetchDepartmentsTripsResponse,
  fetchAnalyticsResponse
} from '../__mocks__/serviceMocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('Analytics API', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should make a get request to get trips department analytics', async () => {
    const query = {
      filterBy: 'month',
      type: 'json'
    };

    moxios.stubRequest(`${baseUrl}/analytics/trips/departments?filterBy=${query.filterBy}&type=${query.type}`, {
      status: 200,
      response: fetchDepartmentsTripsResponse
    });

    const response = await AnalyticsAPI.getDepartmentTrips(query);

    expect(moxios.requests.mostRecent().url)
      .toEqual(`${baseUrl}/analytics/trips/departments?filterBy=${query.filterBy}&type=${query.type}`);
    expect(response.data).toEqual(fetchDepartmentsTripsResponse);
  });

  it('should make a get request to get analytics', async () => {
    const query = '?type=json';

    moxios.stubRequest(`${baseUrl}/analytics${query}`, {
      status: 200,
      response: fetchAnalyticsResponse
    });

    const response = await AnalyticsAPI.getAnalytics(query);

    expect(moxios.requests.mostRecent().url)
      .toEqual(`${baseUrl}/analytics${query}`);
    expect(response.data).toEqual(fetchAnalyticsResponse);
  });

  it('should make a export analytics', async () => {
    const query = '?type=file';

    moxios.stubRequest(`${baseUrl}/analytics${query}`, {
      status: 200,
      response: fetchAnalyticsResponse
    });

    const response = await AnalyticsAPI.exportAnalytics(query);

    expect(moxios.requests.mostRecent().url)
      .toEqual(`${baseUrl}/analytics${query}`);
    expect(response.data).toEqual(fetchAnalyticsResponse);
  });
});
