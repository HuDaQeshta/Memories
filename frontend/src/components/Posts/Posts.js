import React, { useEffect } from "react";
import Post from "./Post/Post";
import { Grid, Box, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUserPosts } from "../../actions/postActions";
import { Alert } from "@material-ui/lab";

import useStyles from "../../styles";
import { Route } from "react-router-dom";
const Posts = ({ keyword, user, columns }) => {
  const classes = useStyles();
  const postList = useSelector((state) => state.postList);
  const { loading, posts } = postList;
  const postMyList = useSelector((state) => state.postMyList);
  const { loading: userLoading, posts: userPosts } = postMyList;
  const dispatch = useDispatch();
  const postCreate = useSelector((state) => state.postCreate);
  const { success: createSuccess } = postCreate;
  const postDelete = useSelector((state) => state.postDelete);
  const { success: deleteSuccess } = postDelete;
  const postLike = useSelector((state) => state.postLike);
  const { success: likeSuccess, loading: likeLoading } = postLike;
  const postDislike = useSelector((state) => state.postDislike);
  const { success: dislikeSuccess, loading: dislikeLoading } = postDislike;
  const postUpdate = useSelector((state) => state.postUpdate);
  const { success: updateSuccess, loading: updateLoading } = postUpdate;

  useEffect(() => {
    if (user === null && keyword === "") {
      dispatch(getPosts());
    }
    if (user === null && keyword !== "") {
      dispatch(getPosts(keyword));
    }
    if (user !== null) {
      dispatch(getUserPosts(user));
    }
  }, [
    dispatch,
    createSuccess,
    user,
    keyword,
    deleteSuccess,
    likeSuccess,
    updateSuccess,
    dislikeSuccess,
  ]);

  return (loading || userLoading) &&
    !likeSuccess &&
    !dislikeSuccess &&
    !updateSuccess &&
    !likeLoading &&
    !dislikeLoading &&
    !updateLoading ? (
    <Box>
      <CircularProgress
        topcolor="secondary"
        left={-20}
        top={-20}
        className={classes.circularProgress}
      />
    </Box>
  ) : (
    <Grid
      className={classes.postsContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {user ? (
        !userPosts ? (
          <Alert severity="info">This user has no posts yet!</Alert>
        ) : (
          userPosts &&
          userPosts.map((post) => (
            <Grid item xs={12} sm={columns} key={post._id}>
              <Route
                render={({ history }) => <Post post={post} history={history} />}
              />
            </Grid>
          ))
        )
      ) : !posts || (posts && posts.length === 0 && keyword !== "") ? (
        <Alert severity="info">
          Sorry, There are No Posts to show right now!
        </Alert>
      ) : (
        posts &&
        posts.map((post) => (
          <Grid item xs={12} sm={columns} key={post._id}>
            <Route
              render={({ history }) => <Post post={post} history={history} />}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Posts;
