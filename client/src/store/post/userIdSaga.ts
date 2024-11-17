import { getUserId } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";
import { setUserIdSuccess, setUserIdFailed, setUserId } from "./userIdSlice";
import { UserId } from "@/container/type";

type UserIdResponse = UserId[];

function* loadUsers() {
  try {
    const uID: UserIdResponse = yield call(getUserId);
    yield put(setUserIdSuccess(uID));
  } catch (error) {
    yield put(setUserIdFailed());
  }
}

function* userIdSaga() {
  yield takeLatest(setUserId.type, loadUsers);
}

export default userIdSaga;
