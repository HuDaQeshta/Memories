import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_FOLLOW_RESET,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAIL,
  USER_UNFOLLOW_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_LISTS_REQUEST,
  USER_LISTS_SUCCESS,
  USER_LISTS_FAIL,
  USER_LISTS_RESET,
} from "../constants/userConstants";

const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        userInfo: payload,
        loading: false,
      };
    case USER_REGISTER_FAIL:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const userDetailsReducer = (
  state = {
    user: { posts: [] },
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        user: payload,
        loading: false,
      };
    case USER_DETAILS_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case USER_DETAILS_RESET:
      return {
        user: {
          posts: [],
        },
      };
    default:
      return state;
  }
};

const userUpdateProfileReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        userInfo: payload,
        success: true,
        loading: false,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

const userDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case USER_DELETE_FAIL:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const userFollowReducer = (
  state = { user: { following: [{}], followers: [{}] } },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_FOLLOW_REQUEST:
      return {
        loading: true,
      };
    case USER_FOLLOW_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case USER_FOLLOW_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case USER_FOLLOW_RESET:
      return {
        user: { following: [{}], followers: [{}] },
      };
    default:
      return state;
  }
};

const userUnfollowReducer = (
  state = { user: { following: [{}], followers: [{}] } },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UNFOLLOW_REQUEST:
      return {
        loading: true,
      };
    case USER_UNFOLLOW_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case USER_UNFOLLOW_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case USER_UNFOLLOW_RESET:
      return {
        user: { following: [{}], followers: [{}] },
      };
    default:
      return state;
  }
};

const userListsReducer = (
  state = {
    following: [],
    followers: [],
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LISTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LISTS_SUCCESS:
      return {
        following: payload.followingList,
        followers: payload.followersList,
        loading: false,
      };
    case USER_LISTS_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case USER_LISTS_RESET:
      return {
        following: [],
        followers: [],
      };
    default:
      return state;
  }
};

export {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userFollowReducer,
  userUnfollowReducer,
  userListsReducer,
};
