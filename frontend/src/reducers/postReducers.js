import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_RESET,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_RESET,
  GET_POST_RESET,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_RESET,
  DISLIKE_POST_REQUEST,
  DISLIKE_POST_SUCCESS,
  DISLIKE_POST_FAIL,
  DISLIKE_POST_RESET,
  LIST_MY_POSTS_REQUEST,
  LIST_MY_POSTS_SUCCESS,
  LIST_MY_POSTS_FAIL,
  LIST_MY_POSTS_RESET,
  LIST_POST_LIKES_REQUEST,
  LIST_POST_LIKES_SUCCESS,
  LIST_POST_LIKES_FAIL,
  LIST_POST_LIKES_RESET,
} from "../constants/postConstants";

const postListReducer = (state = { posts: [{ tags: [] }] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS_SUCCESS:
      return {
        posts: payload.posts,
        pages: payload.pages,
        page: payload.page,
        loading: false,
      };
    case GET_POSTS_FAIL:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const postDetailsReducer = (state = { post: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_POST_SUCCESS:
      return {
        post: payload,
        loading: false,
      };
    case GET_POST_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case GET_POST_RESET:
      return {
        post: { tags: [] },
        loading: false,
      };
    default:
      return state;
  }
};

const postDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_POST_REQUEST:
      return {
        loading: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case DELETE_POST_FAIL:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

const postCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_POST_REQUEST:
      return {
        loading: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        success: true,
        post: payload,
        loading: false,
      };
    case CREATE_POST_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case CREATE_POST_RESET:
      return {};

    default:
      return state;
  }
};

const postUpdateReducer = (state = { post: { tags: [] } }, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_POST_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_POST_SUCCESS:
      return {
        success: true,
        post: payload,
        loading: false,
      };
    case UPDATE_POST_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case UPDATE_POST_RESET:
      return { post: { tags: [] } };

    default:
      return state;
  }
};

const postLikeReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIKE_POST_REQUEST:
      return {
        loading: true,
      };
    case LIKE_POST_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case LIKE_POST_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case LIKE_POST_RESET:
      return {};

    default:
      return state;
  }
};

const postDislikeReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case DISLIKE_POST_REQUEST:
      return {
        loading: true,
      };
    case DISLIKE_POST_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case DISLIKE_POST_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case DISLIKE_POST_RESET:
      return {};

    default:
      return state;
  }
};

const postMyListReducer = (state = { posts: [{ tags: [] }] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_MY_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_MY_POSTS_SUCCESS:
      return {
        posts: payload,
        loading: false,
      };
    case LIST_MY_POSTS_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case LIST_MY_POSTS_RESET:
      return {
        posts: [{ tags: [] }],
      };
    default:
      return state;
  }
};

const postLikesListReducer = (
  state = {
    likes: [],
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_POST_LIKES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_POST_LIKES_SUCCESS:
      return {
        likes: payload,
        loading: false,
      };
    case LIST_POST_LIKES_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case LIST_POST_LIKES_RESET:
      return {
        likes: [],
      };
    default:
      return state;
  }
};

export {
  postListReducer,
  postDetailsReducer,
  postDeleteReducer,
  postCreateReducer,
  postUpdateReducer,
  postLikeReducer,
  postDislikeReducer,
  postMyListReducer,
  postLikesListReducer,
};
