import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Posts, ToggleLike } from "../../container/type";

interface PostState {
  posts: Posts[];
  postId: number;
  postDetail: Posts | null;
  loading: boolean;
  search: string;
}

// Initial state with typed properties
const initialState: PostState = {
  posts: [],
  postId: 0,
  postDetail: null,
  loading: false,
  search: "",
};

// Create the slice with typed state and action payloads
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state) => {
      state.loading = true;
    },
    setPostsSuccess: (state, action: PayloadAction<Posts[]>) => {
      const numberOfRandomPosts = 100;
      const shuffledPosts = action.payload.sort(() => Math.random() - 0.5);
      const randomPosts = shuffledPosts.slice(0, numberOfRandomPosts);
      state.posts = randomPosts;
      state.loading = false;
    },
    setPostsFailed: (state) => {
      state.posts = [];
      state.loading = false;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPostId: (state, action: PayloadAction<number>) => {
      state.postId = action.payload;
    },
    setPostDetail: (state, action: PayloadAction<Posts | null>) => {
      state.postDetail = action.payload;
    },
    addPostRequest: (
      state,
      action: PayloadAction<{ body: string; img?: File | null }>
    ) => {
      state.loading = true;
    },
    addPostSuccess: (state, action: PayloadAction<Posts>) => {
      state.posts.push(action.payload);
      state.loading = false;
    },
    deletePostRequest: (state, action: PayloadAction<string | Number>) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.loading = false;
    },
    updatePosts: (state, action: PayloadAction<Posts[]>) => {
      state.posts = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setPosts,
  setPostsSuccess,
  setPostsFailed,
  setPostId,
  setPostDetail,
  setSearch,
  addPostRequest,
  addPostSuccess,
  deletePostRequest,
  deletePostSuccess,
  updatePosts,
} = postSlice.actions;

export default postSlice.reducer;
