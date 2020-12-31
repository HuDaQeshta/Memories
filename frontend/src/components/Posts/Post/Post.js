import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import {
  deletePost,
  dislikePost,
  likePost,
  getPost,
  getPostLikesList,
} from "../../../actions/postActions";
import { getUserLists } from "../../../actions/userActions";
import {
  DISLIKE_POST_RESET,
  LIKE_POST_RESET,
  GET_POST_RESET,
} from "../../../constants/postConstants";
import {
  USER_LISTS_RESET,
  USER_DETAILS_RESET,
} from "../../../constants/userConstants";
const Post = ({ post, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const postUpdate = useSelector((state) => state.postUpdate);
  const { success: updateSuccess, post: updatedPost } = postUpdate;
  const [id, setId] = useState("");

  useEffect(() => {
    if (userInfo) {
      setId(userInfo._id);
    } else {
      setId(post.userId);
    }
  }, [updateSuccess, userInfo, dispatch, post, updatedPost]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? ")) {
      dispatch(deletePost(id));
    }
  };
  const btnHandler = (id, likes) => {
    if (!userInfo) {
      history.push("/login");
    }
    if (
      userInfo &&
      likes &&
      likes.filter((like) => like.userId === userInfo._id).length !== 0
    ) {
      dispatch(dislikePost(id));
    } else {
      dispatch(likePost(id));
    }
  };
  return (
    <Card className={classes.card}>
      <Link to={`/${post._id}/post`}>
        <CardMedia
          className={classes.media}
          onClick={(e) => {
            dispatch({ type: GET_POST_RESET });
            dispatch(getPost(post._id));
            dispatch(getPostLikesList(post._id));
            userInfo && dispatch(getUserLists(userInfo._id));
          }}
          image={
            updateSuccess && updatedPost && post && updatedPost._id === post._id
              ? updatedPost.selectedFile
              : post.selectedFile
          }
        />
      </Link>
      <div className={classes.overlay}>
        <Link
          to={
            userInfo && id === post.userId
              ? `/profile`
              : `/${post.userId}/profile`
          }
          className={classes.profileLink}
          onClick={() => {
            dispatch({ type: USER_LISTS_RESET });
            dispatch({ type: USER_DETAILS_RESET });
            dispatch({ type: DISLIKE_POST_RESET });
            dispatch({ type: LIKE_POST_RESET });
          }}
        >
          <Typography variant="h6">
            {updateSuccess &&
            updatedPost &&
            post &&
            updatedPost._id === post._id
              ? updatedPost.creator
              : post.creator}
          </Typography>
        </Link>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {userInfo && id === post.userId && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              dispatch(getPost(post._id));
            }}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {updateSuccess && updatedPost && post && updatedPost._id === post._id
            ? updatedPost.tags && updatedPost.tags.map((tag) => `#${tag} `)
            : post.tags && post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {updateSuccess && updatedPost && post && updatedPost._id === post._id
          ? updatedPost.title
          : post.title}
      </Typography>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {updateSuccess && updatedPost && post && updatedPost._id === post._id
            ? updatedPost.message
            : post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          id={post && post._id}
          onClick={() => btnHandler(post._id, post.likes)}
        >
          <ThumbUpAltIcon fontSize="small" />
          {post.likes &&
          userInfo &&
          post.likes.filter((like) => like.userId === userInfo._id).length !== 0
            ? `Liked ${post.likes && post.likes.length}`
            : `Like ${post.likes && post.likes.length}`}
        </Button>
        {userInfo && id === post.userId && (
          <Button
            size="small"
            color="secondary"
            onClick={() => deleteHandler(post._id)}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
