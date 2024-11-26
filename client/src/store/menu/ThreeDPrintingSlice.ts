import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThreeDPrinting } from "@/container/type";
interface PrintingState {
  printing: ThreeDPrinting[];
  loading: boolean;
  error: string | null;
}

const initialState: PrintingState = {
  printing: [],
  loading: false,
  error: null,
};

const printingSlice = createSlice({
  name: "printing",
  initialState,
  reducers: {
    setPrinting(state) {
      state.loading = true;
    },
    setPrintingSuccess(state, action: PayloadAction<ThreeDPrinting[]>) {
      state.loading = false;
      state.printing = action.payload;
    },
    setPrintingFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setPrinting, setPrintingSuccess, setPrintingFailure } =
  printingSlice.actions;

export default printingSlice.reducer;
