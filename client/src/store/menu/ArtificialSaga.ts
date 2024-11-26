import { takeLatest, call, put } from "redux-saga/effects";
import {
  setArtificial,
  setArtificialSuccess,
  setArtificialFailure,
} from "./ArtificialSlice";
import { getArtificial } from "../../store/api";
import { AxiosResponse } from "axios";
import { ArtificialData } from "../../container/type";

function* fetchArtificial() {
  try {
    const response: AxiosResponse<ArtificialData[]> = yield call(getArtificial);
    console.log(response.data);

    yield put(setArtificialSuccess(response.data));
  } catch (e) {
    yield put(setArtificialFailure("Failed to fetch artificial data"));
  }
}

// Root saga
function* artificialSaga() {
  yield takeLatest(setArtificial.type, fetchArtificial);
}

export default artificialSaga;
