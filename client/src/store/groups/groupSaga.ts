import { getGroup } from "../api"; // Import the API function
import {
  call,
  put,
  takeLatest,
  AllEffect,
  ForkEffect,
} from "redux-saga/effects"; // Import effects from redux-saga
import { setGroup, setGroupSuccess, setGroupFailed } from "./groupSlice"; // Import your actions
import { Group } from "../../container/type";
// Worker saga will be fired on setGroup actions
function* fetchGroup() {
  try {
    const groups: Group[] = yield call(getGroup); // Call the API function and specify the return type
    yield put(setGroupSuccess(groups)); // Dispatch success action with the fetched groups
  } catch (e) {
    yield put(setGroupFailed()); // Dispatch failure action if an error occurs
  }
}

/*
  Starts fetchGroup on each dispatched `setGroup` action.
  Allows concurrent fetches of groups.
*/
function* groupSaga(): Generator<ForkEffect<never>, void, unknown> {
  // Updated the return type here
  yield takeLatest(setGroup.type, fetchGroup); // Listen for setGroup actions
}

export default groupSaga;
