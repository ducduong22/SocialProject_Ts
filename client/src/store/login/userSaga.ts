import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./userSlice";
import axios, { AxiosResponse } from "axios";
import { User, Register, ApiResponse } from "../../container/type";

// API calls
const loginApi = (credentials: User) =>
  axios.post<ApiResponse>("http://localhost:3002/login", credentials);

const registerApi = (userData: Register) =>
  axios.post<ApiResponse>("http://localhost:3002/register", userData);

function* handleLogin(action: { type: string; payload: User }) {
  const isConditionMet = true;

  if (!isConditionMet) {
    yield put(loginFailure("Condition not met for login"));
    return;
  }

  try {
    const response: AxiosResponse<ApiResponse> = yield call(
      loginApi,
      action.payload
    );
    yield put(loginSuccess(response.data));
    localStorage.setItem("token", response.data.token);
  } catch (error: any) {
    yield put(loginFailure(error.response?.data.message || "Login failed"));
  }
}

function* handleRegister(action: { type: string; payload: Register }) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(
      registerApi,
      action.payload
    );
    yield put(registerSuccess(response.data));
    // Save token to localStorage
    localStorage.setItem("token", response.data.token);
  } catch (error: any) {
    yield put(
      registerFailure(error.response?.data.message || "Registration failed")
    );
  }
}

function* registerSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
}

export default registerSaga;
