import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Box, CircularProgress, Typography } from "@material-ui/core";
import FollowingItem from "./FollowingItem";
import useStyles from "../../styles";
import {
  USER_UNFOLLOW_RESET,
  USER_FOLLOW_RESET,
} from "../../constants/userConstants";
import { Route } from "react-router-dom";
import { getPostLikesList } from "../../actions/postActions";
import { getUserLists } from "../../actions/userActions";
const LikesList = ({ setMessage, authenticated }) => {
  const classes = useStyles();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const postDetails = useSelector((state) => state.postDetails);
  const { post } = postDetails;
  const postLikesList = useSelector((state) => state.postLikesList);
  const { likes, loading: likesLoading } = postLikesList;
  const postLike = useSelector((state) => state.postLike);
  const { success: likeSuccess, loading: likeLoading } = postLike;
  const postDislike = useSelector((state) => state.postDislike);
  const { success: dislikeSuccess, loading: dislikeLoading } = postDislike;
  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { loading: unfollowLoading, success: unfollowSuccess } = userUnfollow;
  const userFollow = useSelector((state) => state.userFollow);
  const { loading: followLoading, success: followSuccess } = userFollow;
  const dispatch = useDispatch();
  useEffect(() => {
    if (followSuccess || unfollowSuccess) {
      dispatch({ type: USER_FOLLOW_RESET });
      dispatch({ type: USER_UNFOLLOW_RESET });
    }

    if (
      (likes &&
        post.likes &&
        likes.length !== post.likes.length &&
        post.likes.length !== 0) ||
      likeSuccess ||
      dislikeSuccess ||
      followSuccess ||
      unfollowSuccess
    ) {
      dispatch(getPostLikesList(post._id));
      if (userInfo) {
        dispatch(getUserLists(userInfo._id));
      }
    }
    // eslint-disable-next-line
  }, [
    likeSuccess,
    dislikeSuccess,
    dispatch,
    likes,
    post.likes,
    followSuccess,
    unfollowSuccess,
  ]);
  return !likesLoading && likes.length === 0 ? (
    <Typography variant="h4" className={classes.marginTwoSides}>
      Looks like this post dones't have likes yet...
    </Typography>
  ) : (
    <>
      <Typography variant="h6" className={classes.marginTwoSides}>
        {likes && likes.length} Likes
      </Typography>
      <List>
        {likes &&
          likes.map((account) => (
            <Route
              render={({ history }) =>
                followLoading ||
                unfollowLoading ||
                likeLoading ||
                dislikeLoading ? (
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
                    authenticated={authenticated}
                    account={account}
                  />
                )
              }
            />
          ))}
      </List>
    </>
  );
};

export default LikesList;
