import { call, put, takeLatest } from "redux-saga/effects";
import {
  setComments,
  setCommentsSuccess,
  setCommentsFailed,
  addCommentRequest,
  addCommentSuccess,
  deleteCommentRequest,
  deleteCommentSuccess,
} from "./commentSlice";
import { getComments, addComment, deleteComment } from "../api";
import { PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../../container/type";

function* fetchComments() {
  try {
    const response: { data: Comment[] } = yield call(getComments);
    const comments = response.data;
    yield put(setCommentsSuccess(comments));
  } catch (e) {
    yield put(setCommentsFailed());
  }
}

function* addNewComment(action: PayloadAction<Comment>) {
  try {
    const response: { data: Comment } = yield call(addComment, action.payload);
    const newComment = response.data;
    yield put(addCommentSuccess(newComment));
  } catch (e) {
    console.error("Failed to add comment:", e);
  }
}

function* removeComment(action: PayloadAction<number>) {
  try {
    yield call(deleteComment, action.payload);
    yield put(deleteCommentSuccess(action.payload));
  } catch (e) {
    console.error("Failed to delete comment:", e);
  }
}

function* commentSaga() {
  yield takeLatest(setComments.type, fetchComments);
  yield takeLatest(addCommentRequest.type, addNewComment);
  yield takeLatest(deleteCommentRequest.type, removeComment);
}

export default commentSaga;
