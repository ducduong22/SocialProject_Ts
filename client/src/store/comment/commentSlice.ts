import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../../container/type";

// Define a type for the initial state
interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string;
}

// Initial state
const initialState: CommentState = {
  comments: [],
  loading: false,
  error: "",
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments: (state) => {
      state.loading = true;
    },
    setCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
      state.loading = false;
    },
    setCommentsFailed: (state) => {
      state.comments = [];
      state.loading = false;
    },

    addCommentRequest: (
      state,
      action: PayloadAction<{ body: string; postId: number | null }>
    ) => {
      state.loading = true;
    },
    addCommentSuccess: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
      state.loading = false;
    },
    deleteCommentRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    deleteCommentSuccess: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
      state.loading = false;
    },
  },
});

export const {
  setComments,
  setCommentsSuccess,
  setCommentsFailed,
  addCommentRequest,
  addCommentSuccess,
  deleteCommentRequest,
  deleteCommentSuccess,
} = commentSlice.actions;

export default commentSlice.reducer;
