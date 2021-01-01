import React, { useState, useEffect } from "react";
import useStyles from "../../styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  CREATE_POST_RESET,
  GET_POST_RESET,
} from "../../constants/postConstants";
import { createPost, updatePost } from "../../actions/postActions";
const PostForm = ({ history }) => {
  const classes = useStyles();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
  });
  const [postFile, setPostFile] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const postCreate = useSelector((state) => state.postCreate);
  const { error, success, loading } = postCreate;
  const postDetails = useSelector((state) => state.postDetails);
  const { post, loading: postLoading, error: postError } = postDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!postLoading && post) {
      setPostData({
        title: post.title,
        message: post.message,
        tags: post.tags,
      });
      setPostFile(post.selectedFile);
    }
    if (success) {
      setPostData({ title: "", message: "", tags: "" });
      setPostFile("");
      dispatch({ type: CREATE_POST_RESET });
      dispatch({ type: GET_POST_RESET });
    }
    // eslint-disable-next-line
  }, [success, dispatch, post]);
  const uploadingHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("selectedFile", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/uploads/selectedFile",
        formData,
        config
      );
      setPostFile(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (userInfo) {
      if (!post._id) {
        dispatch(
          createPost({
            title: postData.title,
            message: postData.message,
            tags: postData.tags,
            selectedFile: postFile,
          })
        );
      } else {
        dispatch(
          updatePost({ ...postData, _id: post._id, selectedFile: postFile })
        );
        dispatch({ type: GET_POST_RESET });
      }
      clearForm();
    } else {
      history.push("/login");
    }
  };
  const clearForm = () => {
    setPostData({ title: "", message: "", tags: "" });
    setPostFile("");
    dispatch({ type: GET_POST_RESET });
  };

  return (
    <Paper className={classes.paper}>
      {(loading || postLoading) && (
        <CircularProgress style={{ margin: "0 auto" }} color="secondary" />
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {postError && <Alert severity="error">{postError}</Alert>}
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={submitHandler}
      >
        <Typography className={classes.title} variant="h6">
          {post._id ? "Update your Memory" : "Share your Memory"}
        </Typography>
        <TextField
          name="creator"
          className={classes.marginSmall}
          variant="outlined"
          disabled
          label="Creator"
          fullWidth
          defaultValue={userInfo ? userInfo.name : ""}
        />
        <TextField
          name="title"
          className={classes.marginSmall}
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          className={classes.marginSmall}
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          className={classes.marginSmall}
          variant="outlined"
          label="Tag1,Tag2..."
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(",").map((word) => word.trim()),
            })
          }
        />
        <div className={`${classes.fileInput} ${classes.marginSmall}`}>
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            label={post.selectedFile}
            onChange={uploadingHandler}
          />
          {uploading && (
            <CircularProgress style={{ margin: "0 auto" }} color="secondary" />
          )}
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clearForm}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default PostForm;
