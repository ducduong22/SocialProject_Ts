import { UserId } from "@/container/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the initial state
interface UserIdState {
  userID: UserId[]; // Adjust the type as per your actual data structure
  loading: boolean;
  selectedUserId: string | null; // Use `string | null` for the selectedUserId
}

// Define the initial state
const initialState: UserIdState = {
  userID: [],
  loading: false,
  selectedUserId: null,
};

export const userIdSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },
    setUserId: (state) => {
      state.loading = true;
    },
    setUserIdSuccess: (state, action: PayloadAction<UserId[]>) => {
      state.userID = action.payload; // Ensure action.payload is UserId[]
      state.loading = false;
    },
    setUserIdFailed: (state) => {
      state.userID = [];
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserIdSuccess,
  setUserIdFailed,
  setUserId,
  setSelectedUserId,
} = userIdSlice.actions;

export default userIdSlice.reducer;
