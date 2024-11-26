import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgrammingState {
  programming: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProgrammingState = {
  programming: [],
  loading: false,
  error: null,
};

const programmingSlice = createSlice({
  name: "programming",
  initialState,
  reducers: {
    setProgramming(state) {
      state.loading = true;
      state.error = null;
    },
    setProgrammingSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.programming = action.payload;
    },
    setProgrammingFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setProgramming, setProgrammingSuccess, setProgrammingFailure } =
  programmingSlice.actions;

export const Pro = (state: { programming: ProgrammingState }) =>
  state.programming.programming;

export default programmingSlice.reducer;
