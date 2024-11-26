import { takeLatest, call, put } from "redux-saga/effects";
import {
  setProgramming,
  setProgrammingSuccess,
  setProgrammingFailure,
} from "./ProgrammingSlice";
import { getProgramming } from "../api";
import { Programming } from "../../container/type";
import { AxiosResponse } from "axios";
function* fetchProgramming() {
  try {
    const response: AxiosResponse<Programming[]> = yield call(getProgramming);
    yield put(setProgrammingSuccess(response.data));
  } catch (e) {
    yield put(setProgrammingFailure());
  }
}

function* programmingSaga() {
  yield takeLatest(setProgramming.type, fetchProgramming);
}
export default programmingSaga;
