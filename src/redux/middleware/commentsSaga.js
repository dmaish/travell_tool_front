import { put, takeLatest, call } from 'redux-saga/effects';
import { CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../constants/actionTypes';
import CommentsAPI from '../../services/CommentsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  createCommentSuccess,
  createCommentFailure,
  editCommentSuccess,
  editCommentFailure,
  deleteCommentSuccess,
  deleteCommentFailure,
} from '../actionCreator/commentsActions';

export function* createCommentAsync(action) {
  try {
    const { requestId, comment } = action;
    const response = yield call(CommentsAPI.createComment, {requestId, comment});
    yield put(createCommentSuccess(response.data));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createCommentFailure(errorMessage));
  }
}

export function* watchCreateComment() {
  yield takeLatest(CREATE_COMMENT, createCommentAsync);
}

export function* editCommentAsync(action) {
  try {
    const { requestId, comment, id } = action;
    const response = yield call(CommentsAPI.editComment, {comment, requestId}, id);
    yield put(editCommentSuccess(response.data.comment));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(editCommentFailure(errorMessage));
  }
}

export function* deleteCommentAsync(action) {
  try {
    const { commentId } = action;
    const response = yield call(CommentsAPI.deleteComment, commentId);
    yield put(deleteCommentSuccess(response.data, commentId));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteCommentFailure(errorMessage));
  }
}



export function* watchEditComment() {
  yield takeLatest(EDIT_COMMENT, editCommentAsync);
}

export function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT, deleteCommentAsync);
}


