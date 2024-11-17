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
import { User, Register } from "../../container/type";

// Define types for login and register payloads

interface ApiResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
}

// API calls
const loginApi = (credentials: User) =>
  axios.post<ApiResponse>("http://localhost:3002/login", credentials);

const registerApi = (userData: Register) =>
  axios.post<ApiResponse>("http://localhost:3002/register", userData);

// Worker Sagas
function* handleLogin(action: { type: string; payload: User }) {
  // Define the condition that needs to be met for login to proceed
  const isConditionMet = true; // Replace `true` with your actual condition logic

  if (!isConditionMet) {
    // If the condition is not met, exit the saga early
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
    yield put(registerSuccess(response.data.token));
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
