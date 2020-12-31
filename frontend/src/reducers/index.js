import { combineReducers } from "redux";

import {
  userDeleteReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userFollowReducer,
  userUnfollowReducer,
  userListsReducer,
} from "./userReducers";
import {
  postListReducer,
  postDetailsReducer,
  postDeleteReducer,
  postCreateReducer,
  postUpdateReducer,
  postLikeReducer,
  postDislikeReducer,
  postMyListReducer,
  postLikesListReducer,
} from "./postReducers";

export default combineReducers({
  // all reducers will be listed inside here
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userFollow: userFollowReducer,
  userUnfollow: userUnfollowReducer,
  userLists: userListsReducer,
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postDelete: postDeleteReducer,
  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postLike: postLikeReducer,
  postDislike: postDislikeReducer,
  postMyList: postMyListReducer,
  postLikesList: postLikesListReducer,
});
