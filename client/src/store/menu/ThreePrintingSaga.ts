import { takeLatest, call, put } from "redux-saga/effects";
import {
  setPrinting,
  setPrintingSuccess,
  setPrintingFailure,
} from "./ThreeDPrintingSlice";
import { getThreePrinting } from "../../store/api";
import { AxiosResponse } from "axios";
import { ThreeDPrinting } from "../../container/type";
console.log(getThreePrinting);
function* fetchPrinting() {
  try {
    const response: AxiosResponse<ThreeDPrinting[]> = yield call(
      getThreePrinting
    );
    yield put(setPrintingSuccess(response.data));
  } catch (e) {
    yield put(setPrintingFailure());
  }
}

function* printingSaga() {
  yield takeLatest(setPrinting.type, fetchPrinting);
}
export default printingSaga;
