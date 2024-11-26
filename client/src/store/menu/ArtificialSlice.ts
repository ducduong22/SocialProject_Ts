import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArtificialState {
  artificial: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ArtificialState = {
  artificial: [],
  loading: false,
  error: null,
};

const artificialSlice = createSlice({
  name: "artificial",
  initialState,
  reducers: {
    setArtificial(state) {
      state.loading = true;
      state.error = null;
    },
    setArtificialSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.artificial = action.payload;
    },
    setArtificialFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setArtificial, setArtificialSuccess, setArtificialFailure } =
  artificialSlice.actions;

// Define a selector to access the artificial data
export const Arti = (state: { artificial: ArtificialState }) =>
  state.artificial.artificial;

export default artificialSlice.reducer;
