import { getPost, addPost, deletePost } from "../../store/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setPosts,
  setPostsSuccess,
  setPostsFailed,
  addPostSuccess,
  deletePostSuccess,
  addPostRequest,
  deletePostRequest,
} from "./postSlice";
import { Posts } from "../../container/type";
import { postData } from "../../container/type";

// Worker saga for fetching posts
function* fetchPost() {
  try {
    const posts: Posts[] = yield call(getPost);
    yield put(setPostsSuccess(posts));
  } catch (e: unknown) {
    console.error("Failed to fetch posts:", e);
    yield put(setPostsFailed());
  }
}

// Worker saga for adding a new post
function* addNewPost(action: PayloadAction<postData>) {
  try {
    const newPost: Posts = yield call(addPost, action.payload);
    yield put(addPostSuccess(newPost));
  } catch (e: unknown) {
    console.error("Failed to add post:", e);
  }
}

// Worker saga for deleting a post
function* removePost(action: PayloadAction<string>) {
  try {
    yield call(deletePost, action.payload);
    yield put(deletePostSuccess(action.payload));
  } catch (e: unknown) {
    console.error("Failed to delete post:", e);
  }
}

// Root saga that watches for post-related actions
function* postSaga() {
  yield takeLatest(setPosts.type, fetchPost);
  yield takeLatest(addPostRequest.type, addNewPost);
  yield takeLatest(deletePostRequest.type, removePost);
}

export default postSaga;
