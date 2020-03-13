import {
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../constants/actionTypes';

export const createComment = (requestId, comment) => ({
  type: CREATE_COMMENT,
  requestId,
  comment
});

export const createCommentSuccess = (comment) => ({
  type: 'CREATE_COMMENT_SUCCESS',
  comment
});

export const createCommentFailure = (error) => ({
  type: 'CREATE_COMMENT_FAILURE',
  error
});

export const editComment = (requestId, comment, id) => ({
  type: EDIT_COMMENT,
  requestId,
  comment,
  id
});

export const editCommentSuccess = (comment) => ({
  type: 'EDIT_COMMENT_SUCCESS',
  comment
});

export const editCommentFailure = (error) => ({
  type: 'EDIT_COMMENT_FAILURE',
  error
});

export const deleteComment = (requestId, commentId) => ({
  type: DELETE_COMMENT,
  commentId,
  requestId,
});

export const deleteCommentSuccess = (response, commentId) => ({
  type: 'DELETE_COMMENT_SUCCESS',
  response,
  commentId,
});

export const deleteCommentFailure = (error) => ({
  type: 'DELETE_COMMENT_FAILURE',
  error
});
