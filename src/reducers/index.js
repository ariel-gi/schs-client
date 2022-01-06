import { combineReducers } from "redux";

import postsReducer from "./posts";
import commentsReducer from "./comments";
import authReducer from "./auth";

export default combineReducers({ posts: postsReducer, comments: commentsReducer, auth: authReducer });
