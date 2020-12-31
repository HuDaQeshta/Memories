import axios from "axios";
import {
  USER_LOGOUT,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAIL,
  USER_LISTS_REQUEST,
  USER_LISTS_SUCCESS,
  USER_LISTS_FAIL,
} from "../constants/userConstants";

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Cotent-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users/login", formData, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        Cotent_Type: "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    if (id === "profile") {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/users/${id}`, config);
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } else {
      const { data } = await axios.get(`/api/users/${id}`);
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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
    const { data } = await axios.put("/api/users/profile", user, config);
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    const loginData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      notifications: data.notifications,
      token: data.token ? data.token : userInfo.token,
    };
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: loginData,
    });
    localStorage.setItem("userInfo", JSON.stringify(loginData));
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "Not Authorized, Token Failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

export const deleteUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch(logout());
    await axios.delete("/api/users", config);
    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const followUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_FOLLOW_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //the id here will be the id of the user that is going to be followed or unfollowed not the logged in user.

    const { data } = await axios.post(
      `/api/users/${userId}/follow`,
      {},
      config
    );

    dispatch({
      type: USER_FOLLOW_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_FOLLOW_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const unfollowUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UNFOLLOW_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //the id here will be the id of the user that is going to be followed or unfollowed not the logged in user.
    const { data } = await axios.delete(
      `/api/users/${userId}/unfollow`,
      config
    );
    dispatch({
      type: USER_UNFOLLOW_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_UNFOLLOW_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getUserLists = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LISTS_REQUEST,
    });
    const { data } = await axios.get(`/api/users/${id}/lists`);
    dispatch({
      type: USER_LISTS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_LISTS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
