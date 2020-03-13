import moxios from 'moxios';
import CentersAPI from '../CentersAPI';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

const centersResponse = {
  centers: [{
    id: 1,
    location: 'Lagos, Nigeria'
  },
  {
    id: 2,
    location: 'Nairobi, Kenya'
  }]
};
describe('CentersAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a get request to center api to retrieve centers records', async () => {
    moxios.stubRequest(`${baseUrl}/centers`, {
      status: 200,
      response: centersResponse
    });
    const response = await CentersAPI.fetchCenters();
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/centers`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(centersResponse);
  });

  it('should send a patch request to center api to update the user center record', async () => {
    const userId = 1;
    const newCenter = {
      center: 'Lagos, Nigeria'
    };

    moxios.stubRequest(`${baseUrl}/center/user/${userId}`, {
      status: 200,
      response: {
        center: 'Lagos, Nigeria'
      }
    });

    const response = await CentersAPI.updateUserCenter(userId, newCenter);
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/center/user/1`);
    expect(request.config.method).toEqual('patch');
    expect(response.data).toEqual(newCenter);
  });
});
