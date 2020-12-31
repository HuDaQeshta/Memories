import axios from "axios";
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
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  DISLIKE_POST_REQUEST,
  DISLIKE_POST_SUCCESS,
  DISLIKE_POST_FAIL,
  LIST_MY_POSTS_REQUEST,
  LIST_MY_POSTS_SUCCESS,
  LIST_MY_POSTS_FAIL,
  LIST_POST_LIKES_SUCCESS,
  LIST_POST_LIKES_FAIL,
  LIST_POST_LIKES_REQUEST,
} from "../constants/postConstants";

export const getPosts = (keyword = "", pageNumber = "") => async (dispatch) => {
  try {
    dispatch({ type: GET_POSTS_REQUEST });
    const { data } = await axios.get(
      `/api/posts?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_REQUEST });
    const { data } = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_POST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_POST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/posts/${id}`, config);
    dispatch({
      type: DELETE_POST_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createPost = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_POST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/posts", post, config);
    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updatePost = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_POST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/posts/${post._id}`, post, config);
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getPostLikesList = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_POST_LIKES_REQUEST,
    });
    const { data } = await axios.get(`/api/posts/${id}/likeslist`);
    dispatch({
      type: LIST_POST_LIKES_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LIST_POST_LIKES_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const likePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIKE_POST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/api/posts/${id}/like`, {}, config);
    dispatch({
      type: LIKE_POST_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const dislikePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISLIKE_POST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/api/posts/${id}/dislike`, {}, config);
    dispatch({
      type: DISLIKE_POST_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: DISLIKE_POST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getUserPosts = (userId) => async (dispatch) => {
  try {
    dispatch({ type: LIST_MY_POSTS_REQUEST });
    const { data } = await axios.get(`/api/posts/${userId}/postslist`);
    dispatch({
      type: LIST_MY_POSTS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LIST_MY_POSTS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
