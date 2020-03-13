import {
  openModal,
  closeModal
} from '../modalActions';

describe('Request Actions', () => {
  it('should return action of type OPEN_MODAL', () => {
    const receivedAction = {
      type: 'OPEN_MODAL',
      modal: {
        shouldOpen: true,
        modalType: 'new request',
      },
    };
    const newAction = openModal(true, 'new request');
    expect(newAction).toEqual(receivedAction);
  });

  it('should return action of type CLOSE_MODAL', () => {
    const receivedAction = {
      type: 'CLOSE_MODAL'
    };
    const newAction = closeModal();
    expect(newAction).toEqual(receivedAction);
  });
});
