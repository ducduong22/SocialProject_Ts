import { takeLatest, call, put } from "redux-saga/effects";
import {
  setTechNew,
  setTechNewSuccess,
  setTechNewFailure,
} from "./TechNewsSlice";
import { getTechNews } from "../api";
import { AxiosResponse } from "axios";
import { TechNews } from "../../container/type";
function* fetchTechNew() {
  try {
    const response: AxiosResponse<TechNews[]> = yield call(getTechNews);
    yield put(setTechNewSuccess(response.data));
  } catch (e) {
    yield put(setTechNewFailure());
  }
}

function* techNewSaga() {
  yield takeLatest(setTechNew.type, fetchTechNew);
}
export default techNewSaga;
