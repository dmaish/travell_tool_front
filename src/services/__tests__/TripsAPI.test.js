import moxios from 'moxios';
import TripsAPI from '../TripsAPI';
import {
  tripsResponse,
  singleTripResponse
} from '../__mocks__/serviceMocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('TripsAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a get request to trips api to retrieve trip records', async () => {
    moxios.stubRequest(`${baseUrl}/trips`, {
      status: 200,
      response: tripsResponse
    });
    const response = await TripsAPI.getTrips();
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/trips`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(tripsResponse);
  });

  it('should send a put request to update a single trip record', async () => {
    const tripId = '3';
    const tripData = {
      checkType: 'checkIn'
    };

    moxios.stubRequest(`${baseUrl}/trips/${tripId}`, {
      status: 200,
      response: singleTripResponse
    });

    const response = await TripsAPI.updateTrip(tripId, tripData);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/trips/${tripId}`);
    expect(response.data).toEqual(singleTripResponse);
  });

  it('should send a put request to update a single trip room record', async () => {
    const tripId = '3';
    const tripData = {
      bedId: 2,
      reason: 'Reason'
    };

    moxios.stubRequest(`${baseUrl}/trips/${tripId}/room`, {
      status: 200,
      response: singleTripResponse
    });

    const response = await TripsAPI.updateTripRoom(tripId, tripData);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/trips/${tripId}/room`);
    expect(response.data).toEqual(singleTripResponse);
  });
});
