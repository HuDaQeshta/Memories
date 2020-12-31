import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Box, CircularProgress, Typography } from "@material-ui/core";
import FollowerItem from "./FollowerItem";
import useStyles from "../../styles";
import {
  USER_UNFOLLOW_RESET,
  USER_FOLLOW_RESET,
} from "../../constants/userConstants";
import { getUserLists } from "../../actions/userActions";
import { Route } from "react-router-dom";
const FollowersList = ({ setMessage, authenticated }) => {
  const classes = useStyles();
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { loading: unfollowLoading, success: unfollowSuccess } = userUnfollow;
  const userFollow = useSelector((state) => state.userFollow);
  const { loading: followLoading, success: followSuccess } = userFollow;
  const userLists = useSelector((state) => state.userLists);
  const { followers } = userLists;

  const dispatch = useDispatch();
  useEffect(() => {
    if (followSuccess || unfollowSuccess) {
      dispatch({ type: USER_FOLLOW_RESET });
      dispatch({ type: USER_UNFOLLOW_RESET });
    }
    if (
      (followers &&
        user.followers &&
        followers.length !== user.followers.length &&
        user.followers.length !== 0) ||
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
    followers.length,
    user.followers,
  ]);
  return followers && followers.length === 0 ? (
    authenticated ? (
      <Typography variant="h4">
        Looks like you don't have followers yet...
      </Typography>
    ) : (
      <Typography variant="h4">
        {user.name} dosen't have followers yet...
      </Typography>
    )
  ) : (
    <>
      <Typography variant="h6" className={classes.listTitle}>
        {followers && followers.length} Followers
      </Typography>
      <List>
        {followers &&
          followers.map((account) => (
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
                  <FollowerItem
                    history={history}
                    setMessage={setMessage}
                    key={account.follower._id}
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

export default FollowersList;
