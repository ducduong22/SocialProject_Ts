import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../../container/type";
interface GroupState {
  groups: Group[];
  commutiesId: number;
  groupsDetail: null | any; // Change `any` to the specific type of your groups detail if available
  loading: boolean;
  search: string;
}
// Initial state
const initialState: GroupState = {
  groups: [],
  commutiesId: 0,
  groupsDetail: null,
  loading: false,
  search: "",
};

export const groupSlice = createSlice({
  name: "group", // Removed the space to avoid naming issues
  initialState,
  reducers: {
    setGroup: (state) => {
      state.loading = true;
    },
    setGroupSuccess: (state, action: PayloadAction<Group[]>) => {
      // Specify the payload type
      const { payload } = action;
      state.groups = payload;
      state.loading = false;
    },
    setGroupFailed: (state) => {
      state.groups = [];
      state.loading = false;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      // Specify the payload type for search
      state.search = action.payload;
    },
    // Uncomment and add types for these reducers if needed
    // setPostId: (state, action: PayloadAction<number>) => {
    //   const { payload } = action;
    //   state.postId = payload; // Uncomment if postId exists in the state
    // },
    // setPostDetail: (state, action: PayloadAction<any>) => {
    //   state.postDetail = action.payload; // Change `any` to the specific type of your post detail if available
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  setGroup,
  setGroupSuccess,
  setGroupFailed,
  // setPostId,
  // setPostDetail,
  setSearch,
} = groupSlice.actions;

export default groupSlice.reducer;
