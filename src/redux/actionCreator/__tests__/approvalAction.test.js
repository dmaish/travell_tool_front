import { updateRequestStatus, updateRequestStatusSuccess, updateRequestStatusFailure } from '..';

describe('Requests Actions', () => {
  describe('Update Request Status', () => {
    it('should return action of type UPDATE_REQUEST_STATUS', () => {
      const statusUpdateData = {
        newStatus: 'Approved'
      };

      const receivedAction = {
        type: 'UPDATE_REQUEST_STATUS',
        statusUpdateData: {
          newStatus: 'Approved'
        }
      };
      const newAction = updateRequestStatus(statusUpdateData);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type UPDATE_REQUEST_STATUS_SUCCESS', () => {
      const updatedRequest = {
        newStatus: 'Approved'
      };

      const receivedAction = {
        type: 'UPDATE_REQUEST_STATUS_SUCCESS',
        updatedRequest: {
          newStatus: 'Approved'
        }
      };
      const newAction = updateRequestStatusSuccess(updatedRequest);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type UPDATE_REQUEST_STATUS_FAILURE', () => {
      const error = 'Could not update requests status';

      const receivedAction = {
        type: 'UPDATE_REQUEST_STATUS_FAILURE',
        error
      };
      const newAction = updateRequestStatusFailure(error);
      expect(newAction).toEqual(receivedAction);
    });
  });
});
