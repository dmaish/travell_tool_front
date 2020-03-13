import modal from '../modal';

describe('Requests reducer', () => {
  const initialState = {
    modal: {
      shouldOpen: false,
      modalType: null,
      page: null
    }
  };

  let action, newState, receivedState;

  it('should return initial state', () => {
    expect(modal(undefined, {})).toEqual(initialState);
  });

  it('should handle OPEN_MODAL', () => {
    action = {
      type: 'OPEN_MODAL',
      modal: {
        shouldOpen: true,
        modalType: 'request details',
        page: 'Requests'
      }
    };

    newState = modal(initialState, action);
    receivedState = {
      modal: {
        shouldOpen: true,
        modalType: 'request details',
        page: 'Requests'
      }
    };

    expect(newState).toEqual(receivedState);
  });

  it('should handle CLOSE_MODAL', () => {
    action = {
      type: 'CLOSE_MODAL',
    };

    newState = modal(initialState, action);
    receivedState = {
      modal: {
        shouldOpen: false,
        modalType: null,
      }
    };

    expect(newState).toEqual(receivedState);
  });
});
