import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../container/type";

interface UserState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  userId: string | null;
}

const initialState: UserState = {
  user: {
    _id: "",
    name: "",
    email: "",
    userId: "",
    avatar: undefined,
  },
  token: null,
  loading: false,
  error: null,
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.user._id;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    registerRequest(
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} = userSlice.actions;

export default userSlice.reducer;
