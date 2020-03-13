import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import CommentsAPI from '../../../services/CommentsAPI';
import { watchCreateComment, watchEditComment, watchDeleteComment } from '../commentsSaga';

const error = 'Possible network error, please reload the page';
describe('Comments saga', () => {
  describe('Create comment saga', () => {
    const commentData = {
      requestId: 'abcdefgh',
      comment: 'Saga test comment'
    };

    const response = {
      data: { comment: 'Saga test comment'}
    };

    const error = {
      response: {
        status: 422,
        data: {
          errors: ['Comment saga error']
        }
      }
    };

    it('creates a new comment successfully', () => {
      return expectSaga(watchCreateComment)
        .provide([
          [call(CommentsAPI.createComment, commentData), response]
        ])
        .put({
          type: 'CREATE_COMMENT_SUCCESS',
          comment: { comment : 'Saga test comment' }
        })
        .dispatch({
          type: 'CREATE_COMMENT',
          requestId: commentData.requestId,
          comment: commentData.comment
        })
        .run();
    });

    it('throws an error while creating a comment', () => {
      return expectSaga(watchCreateComment)
        .provide([
          [call(CommentsAPI.createComment, commentData), throwError(error)]
        ])
        .put({
          type: 'CREATE_COMMENT_FAILURE',
          error: ''
        })
        .dispatch({
          type: 'CREATE_COMMENT',
          requestId: commentData.requestId,
          comment: commentData.comment
        })
        .run();
    });
  });


  describe('Edit comment saga', () => {
    const commentData = {
      requestId: 'abcdefgh',
      comment: 'Saga test comment',
    };
    const response = {
      data: {
        success: true,
        comment: {
          id: 'F5hDV2lK',
          comment: 'New comment data',
        }
      }
    };
    const id = 'F5hDV2lK';

    it('Updates comment successfully', () => {
      return expectSaga(watchEditComment)
        .provide([
          [call(CommentsAPI.editComment, commentData, id), response]
        ])
        .put({
          type: 'EDIT_COMMENT_SUCCESS',
          comment: {
            id: 'F5hDV2lK',
            comment: 'New comment data',
          }
        })
        .dispatch({
          type: 'EDIT_COMMENT',
          requestId: commentData.requestId,
          comment: commentData.comment,
          id
        })
        .run();
    });

    it('throws an error while updating a comment', () => {
      return expectSaga(watchEditComment)
        .provide([
          [call(CommentsAPI.editComment, commentData, id), throwError(error)]
        ])
        .put({
          type: 'EDIT_COMMENT_FAILURE',
          error
        })
        .dispatch({
          type: 'EDIT_COMMENT',
          requestId: commentData.requestId,
          comment: commentData.comment,
          id
        })
        .run();
    });
  });

  describe('Delete comment saga', () => {
    const commentId = 'F5hDV2lK';
    const requestId = 'requestId';
    const response = {
      data: { success: true },
    };

    it('Deletes comment successfully', () => {
      return expectSaga(watchDeleteComment)
        .provide([
          [call(CommentsAPI.deleteComment, commentId), response]
        ])
        .put({
          type: 'DELETE_COMMENT_SUCCESS',
          response: { success: true },
          commentId,
        })
        .dispatch({
          type: 'DELETE_COMMENT',
          requestId,
          commentId,
        })
        .run();
    });

    it('throws an error while deleting a comment', () => {
      return expectSaga(watchDeleteComment)
        .provide([
          [call(CommentsAPI.deleteComment, commentId), throwError(error)]
        ])
        .put({
          type: 'DELETE_COMMENT_FAILURE',
          error,
        })
        .dispatch({
          type: 'DELETE_COMMENT',
          requestId,
          commentId,
        })
        .run();
    });
  });
});
