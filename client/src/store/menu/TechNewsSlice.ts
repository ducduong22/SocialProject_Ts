import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TechNewState {
  technew: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TechNewState = {
  technew: [],
  loading: false,
  error: null,
};

const techNewSlice = createSlice({
  name: "technew",
  initialState,
  reducers: {
    setTechNew(state) {
      state.loading = true;
      state.error = null;
    },
    setTechNewSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.technew = action.payload;
    },
    setTechNewFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setTechNew, setTechNewSuccess, setTechNewFailure } =
  techNewSlice.actions;

export const Technew = (state: { technew: TechNewState }) =>
  state.technew.technew;

export default techNewSlice.reducer;
