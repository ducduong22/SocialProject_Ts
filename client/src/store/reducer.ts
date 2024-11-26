import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./login/userSlice";
import groupReducer from "./groups/groupSlice";
import postReducer from "./post/postSlice";
import searchReducer from "../store/post/postSlice";
import commentReducer from "./comment/commentSlice";
import userIdReducer from "./post/userIdSlice";
import printingReducer from "./menu/ThreeDPrintingSlice";
import programmingReducer from "./menu/ProgrammingSlice";
import technewReducer from "../store/menu/TechNewsSlice";
import artificialReducer from "../store/menu/ArtificialSlice";
const rootReducer = combineReducers({
  group: groupReducer,
  user: userReducer,
  post: postReducer,
  search: searchReducer,
  comment: commentReducer,
  printing: printingReducer,
  programming: programmingReducer,
  technew: technewReducer,
  artificial: artificialReducer,
  userId: userIdReducer,
});

export default rootReducer;
