import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Box, CircularProgress, Typography } from "@material-ui/core";
import FollowingItem from "./FollowingItem";
import { getUserLists } from "../../actions/userActions";
import useStyles from "../../styles";
import {
  USER_UNFOLLOW_RESET,
  USER_FOLLOW_RESET,
} from "../../constants/userConstants";
import { Route } from "react-router-dom";
const FollowingList = ({ setMessage, authenticated }) => {
  const classes = useStyles();
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { loading: unfollowLoading, success: unfollowSuccess } = userUnfollow;
  const userFollow = useSelector((state) => state.userFollow);
  const { loading: followLoading, success: followSuccess } = userFollow;
  const userLists = useSelector((state) => state.userLists);
  const { following } = userLists;
  const dispatch = useDispatch();
  useEffect(() => {
    if (followSuccess || unfollowSuccess) {
      dispatch({ type: USER_FOLLOW_RESET });
      dispatch({ type: USER_UNFOLLOW_RESET });
    }
    if (
      (following &&
        user.following &&
        following.length !== user.following.length &&
        user.following.length !== 0) ||
      followSuccess ||
      unfollowSuccess
    ) {
      dispatch(getUserLists(user._id));
    }
    // eslint-disable-next-line
  }, [
    followSuccess,
    unfollowSuccess,
    dispatch,
    following.length,
    user.following,
  ]);
  return following && following.length === 0 ? (
    authenticated ? (
      <Typography variant="h4">
        Looks like you don't have followings yet...
      </Typography>
    ) : (
      <Typography variant="h4">
        {user.name} isn't following anyone yet...
      </Typography>
    )
  ) : (
    <>
      <Typography variant="h6" className={classes.listTitle}>
        {following && following.length} Following
      </Typography>
      <List>
        {following &&
          following.map((account) => (
            <Route
              render={({ history }) =>
                followLoading || unfollowLoading ? (
                  <Box>
                    <CircularProgress
                      topcolor="secondary"
                      left={-20}
                      top={-20}
                      className={classes.circularProgress}
                    />
                  </Box>
                ) : (
                  <FollowingItem
                    history={history}
                    setMessage={setMessage}
                    key={account._id}
                    account={account}
                    authenticated={authenticated}
                  />
                )
              }
            />
          ))}
      </List>
    </>
  );
};

export default FollowingList;
