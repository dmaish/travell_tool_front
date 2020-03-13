import toast from 'toastr';
import handleManagerNotification, { io } from '../socket';

const userId = 'id-002';
const toastSpy = jest.spyOn(toast, 'success');
const data = {
  recipientId: 'id-002',
  senderName: 'Chukwuma Ciroma Adekunle',
  message: 'created a travel request'
};

const ioSpy = jest.spyOn(io, 'on').mockImplementation((event, fn) => {
  fn.call(this, data);
});

describe('Socket tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should send a notification when the client gets a `notification` event', () => {
    handleManagerNotification(userId);
    expect(ioSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledTimes(1);
  });

  it('should send not send a notification', () => {
    handleManagerNotification('id-001');
    expect(ioSpy).toHaveBeenCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledTimes(0);
  });
});
