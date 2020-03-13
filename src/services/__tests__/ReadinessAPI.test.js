import moxios from 'moxios';
import ReadinessAPI from '../ReadinessAPI';
import { fetchReadinessResponse } from '../__mocks__/serviceMocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('Readiness API', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should make a get request to get travel readiness', async () => {
    const query = {
      page: '1',
      limit: '5',
      type: 'json',
      travelFlow: 'inflow'
    };
    moxios.stubRequest(
      `${baseUrl}/analytics/readiness?page=${query.page}&limit=${
        query.limit
      }&type=${query.type}&travelFlow=${query.travelFlow}`,
      {
        status: 200,
        response: fetchReadinessResponse
      }
    );
    const response = await ReadinessAPI.getTravelReadiness(query);
    expect(moxios.requests.mostRecent().url).toEqual(
      `${baseUrl}/analytics/readiness?page=${query.page}&limit=${
        query.limit
      }&type=${query.type}&travelFlow=${query.travelFlow}`
    );
    expect(response.data).toEqual(fetchReadinessResponse);
  });
  it('should make a get request to export travel readiness', async () => {
    const query = {
      type: 'file',
      travelFlow: 'inflow'
    };
    moxios.stubRequest(
      `${baseUrl}/analytics/readiness?type=${query.type}&travelFlow=${query.travelFlow}`,
      {
        status: 200,
      }
    );
    const response = await ReadinessAPI.exportTravelReadiness(query);
    expect(moxios.requests.mostRecent().url).toEqual(
      `${baseUrl}/analytics/readiness?type=${query.type}&travelFlow=${query.travelFlow}`
    );
    expect(response.status).toEqual(200);
  });
});
