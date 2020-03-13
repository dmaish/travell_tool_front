import moxios from 'moxios';
import RequestAPI from '../RequestAPI';
import { expectedResponse } from '../__mocks__/serviceMocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('RequestAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to get user\'s requests with a query', async () => {
    const url = '?page=2';
    moxios.stubRequest(`${baseUrl}/requests?page=2`, {
      status: 200,
      response: {...expectedResponse}
    });
    const response = await RequestAPI.getUserRequests(url);
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/requests?page=2`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should send a POST request to create a new travel-request', async () => {
    const requestData = {
      name: 'Tester Ademola',
      origin: 'Lagos',
      destination: 'Nairobi'
    };

    moxios.stubRequest(`${baseUrl}/requests`, {
      status: 201,
      response: {
        name: 'Tester Ademola',
        origin: 'Lagos',
        destination: 'Nairobi'
      }
    });

    const response = await RequestAPI.postNewRequest(requestData);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/requests`);
    expect(response.data).toEqual({
      name: 'Tester Ademola',
      origin: 'Lagos',
      destination: 'Nairobi'
    });
  });

  it('should send a GET request to retrieve a travel-request details', async () => {
    const requestId = '12fr2esa';
    const requestData = {
      name: 'Tester Ademola',
      origin: 'Lagos',
      destination: 'Nairobi'
    };

    moxios.stubRequest(`${baseUrl}/requests/${requestId}`, {
      status: 200,
      response: {
        name: 'Tester Ademola',
        origin: 'Lagos',
        destination: 'Nairobi'
      }
    });

    const response = await RequestAPI.getUserRequestDetails(requestId);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/requests/${requestId}`);
    expect(response.data).toEqual({
      name: 'Tester Ademola',
      origin: 'Lagos',
      destination: 'Nairobi'
    });
  });

  it('should send an PUT request to update an existing travel-request', async () => {
    const requestId = '12fr2esa';
    const requestData = {
      name: 'Tester Ademola',
      origin: 'Lagos',
      destination: 'Nairobi'
    };

    moxios.stubRequest(`${baseUrl}/requests/${requestId}`, {
      status: 200,
      response: {
        name: 'Tester Ademola',
        origin: 'Lagos',
        destination: 'Nairobi'
      }
    });

    const response = await RequestAPI.editRequest(requestId, requestData);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/requests/${requestId}`);
    expect(response.data).toEqual({
      name: 'Tester Ademola',
      origin: 'Lagos',
      destination: 'Nairobi'
    });
  });

  it('should send an DELETE request to delete an existing travel-request', async () => {
    const requestId = '12FADS';

    moxios.stubRequest(`${baseUrl}/requests/${requestId}`, {
      status: 200,
      response: {
        message: 'Request 12FADS successfully deleted'
      }
    });

    const response = await RequestAPI.deleteRequest(requestId);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/requests/${requestId}`);
    expect(response.data).toEqual({
      message: 'Request 12FADS successfully deleted'
    });
  });
});
