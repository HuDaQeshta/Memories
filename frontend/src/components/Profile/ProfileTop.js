import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "../../styles";
import {
  followUser,
  getUserLists,
  unfollowUser,
} from "../../actions/userActions";
import {
  USER_FOLLOW_RESET,
  USER_UNFOLLOW_RESET,
} from "../../constants/userConstants";
import {
  DISLIKE_POST_RESET,
  LIKE_POST_RESET,
  GET_POST_RESET,
} from "../../constants/postConstants";
import defaultAvatar from "../../images/defaultAvatar.png";
const ProfileTop = ({ setMessage, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userFollow = useSelector((state) => state.userFollow);
  const { success: followSuccess, loading: followLoading } = userFollow;
  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { success: unfollowSuccess, loading: unfollowLoading } = userUnfollow;
  const userLists = useSelector((state) => state.userLists);
  const { followers, loading: listLoading } = userLists;
  useEffect(() => {
    if (followSuccess || unfollowSuccess) {
      dispatch({ type: USER_FOLLOW_RESET });
      dispatch({ type: USER_UNFOLLOW_RESET });
    }

    if (
      (followers &&
        user.followers &&
        followers.length !== user.followers.length) ||
      unfollowSuccess ||
      followSuccess
    ) {
      dispatch(getUserLists(user._id));
    }
    // eslint-disable-next-line
  }, [
    dispatch,
    followSuccess,
    unfollowSuccess,
    followers.length,
    user.followers,
  ]);
  const followBtnHandler = (id, name) => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(followUser(id));
      setMessage(`${name} is now one of your followings.`);
    }
  };
  const unfollowBtnHandler = (id, name) => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(unfollowUser(id));
      setMessage(`${name} is not in your followings.`);
    }
  };
  const mouseEnterHandler = (id) => {
    document.getElementById(id).innerText = "Unfollow";
  };
  const mouseLeaveHandler = (id) => {
    document.getElementById(id).innerText = "Following";
  };

  return (
    <Box style={{ background: "#36C9C6" }}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "1rem 0 2rem 0",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            dispatch({ type: DISLIKE_POST_RESET });
            dispatch({ type: LIKE_POST_RESET });
            dispatch({ type: GET_POST_RESET });
          }}
          className={classes.editProfileBtns}
        >
          <Link to="/">Go Back</Link>
        </Button>
        {userInfo && userInfo._id === user._id && (
          <Button variant="contained" className={classes.editProfileBtns}>
            <Link to="/profile/edit">Edit Profile</Link>
          </Button>
        )}
      </Box>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        {user && user.avatar ? (
          <Box alignItems="center" justifyContent="center">
            <img
              className={classes.avatar}
              alt={user.name && user.name + "Avatar"}
              src={user.avatar && user.avatar}
            />
          </Box>
        ) : (
          <Box alignItems="center" justifyContent="center">
            <img
              className={classes.avatar}
              alt="Default Avatar"
              src={defaultAvatar}
            />
          </Box>
        )}
        <Typography
          align="center"
          variant="h4"
          className={`${classes.bio} ${classes.marginSmall}`}
        >
          {user.name && user.name}
        </Typography>
        <Typography align="center" variant="h6" className={classes.bio}>
          {user && user.bio}
        </Typography>
        {userInfo && userInfo._id !== user._id && (
          <>
            {followLoading || unfollowLoading || listLoading ? (
              <Box>
                <CircularProgress
                  topcolor="secondary"
                  left={-20}
                  top={-20}
                  className={classes.circularProgress}
                />
              </Box>
            ) : userInfo &&
              followers &&
              followers.filter(
                (account) => account.follower._id === userInfo._id
              ).length !== 0 ? (
              <Button
                className={classes.marginSmall}
                edge="end"
                id={user._id}
                variant="contained"
                color="secondary"
                onMouseEnter={() => mouseEnterHandler(user._id)}
                onMouseLeave={() => mouseLeaveHandler(user._id)}
                onClick={() => {
                  unfollowBtnHandler(user._id, user.name);
                }}
              >
                Following
              </Button>
            ) : (
              <Button
                className={classes.marginSmall}
                variant="contained"
                edge="end"
                id={user._id}
                color="primary"
                onClick={() => {
                  followBtnHandler(user._id, user.name);
                }}
              >
                Follow
              </Button>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProfileTop;
