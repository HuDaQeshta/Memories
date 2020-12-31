import { Button, Grid, Grow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import Post from "../components/Posts/Post/Post";
import PostForm from "../components/Forms/PostForm";
import LikesList from "../components/Lists/LikesList";
import useStyles from "../styles";
import {
  DISLIKE_POST_RESET,
  GET_POST_RESET,
  LIKE_POST_RESET,
  LIST_POST_LIKES_RESET,
} from "../constants/postConstants";
import { getPost } from "../actions/postActions";
import { USER_LISTS_RESET } from "../constants/userConstants";
import { getUserLists } from "../actions/userActions";
function PostDetailsScreen({ match }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const postDetails = useSelector((state) => state.postDetails);
  const { post } = postDetails;
  const postLike = useSelector((state) => state.postLike);
  const { success: likeSuccess } = postLike;
  const postDislike = useSelector((state) => state.postDislike);
  const { success: dislikeSuccess } = postDislike;
  const userLists = useSelector((state) => state.userLists);
  const { loading: listLoading } = userLists;
  useEffect(() => {
    if (likeSuccess) {
      dispatch({ type: LIKE_POST_RESET });
    }
    if (dislikeSuccess) {
      dispatch({ type: DISLIKE_POST_RESET });
    }
    if (!post.title || likeSuccess || dislikeSuccess) {
      dispatch(getPost(match.params.id));
    }
    if (listLoading && userInfo) {
      getUserLists(userInfo._id);
    }
    // eslint-disable-next-line
  }, [dispatch, post, likeSuccess, dislikeSuccess, listLoading]);
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          dispatch({ type: GET_POST_RESET });
          dispatch({ type: USER_LISTS_RESET });
          dispatch({ type: LIST_POST_LIKES_RESET });
        }}
        flaot="left"
        className={`${classes.goBackBtn} ${classes.marginSmall}`}
      >
        <Link to="/">Go Back</Link>
      </Button>
      <Grow in>
        {userInfo && userInfo._id === post.userId ? (
          <Grid
            container
            justify="space-around"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={3}>
              {userInfo ? (
                <LikesList setMessage={setMessage} authenticated={true} />
              ) : (
                <LikesList setMessage={setMessage} authenticated={false} />
              )}
            </Grid>
            <Grid item xs={12} sm={5}>
              <Route
                render={({ history }) => <Post post={post} history={history} />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Route render={({ history }) => <PostForm history={history} />} />
            </Grid>
          </Grid>
        ) : (
          <Grid container justify="space-around" alignItems="stretch">
            <Grid item xs={12} sm={3}>
              {userInfo ? (
                <LikesList setMessage={setMessage} authenticated={true} />
              ) : (
                <LikesList setMessage={setMessage} authenticated={false} />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Route
                render={({ history }) => <Post post={post} history={history} />}
              />
            </Grid>
          </Grid>
        )}
      </Grow>
    </>
  );
}

export default PostDetailsScreen;
