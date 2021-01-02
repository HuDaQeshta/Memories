import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Divider,
  ListItem,
  TextField,
  List,
  Button,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PhotoCameraTwoToneIcon from "@material-ui/icons/PhotoCameraTwoTone";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUserDetails,
  updateUserProfile,
} from "../actions/userActions";
import useStyles from "../styles";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import defaultAvatar from "../images/defaultAvatar.png";
const ProfileEditScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdateProfile;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: deleteSuccess } = userDelete;
  const [avatar, setAvatar] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({
    text: "",
    severity: "",
  });
  const [charCount, setCharCount] = useState(180);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (!userInfo || deleteSuccess) {
      history.push("/login");
    }
    if (updateSuccess || !user || !user.name) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails("profile"));
    } else {
      setFormData({
        ...formData,
        name: user.name,
        email: user.email,
        bio: user.bio,
      });
      setAvatar(user.avatar);
      if (user.bio && user.bio.length !== 0) {
        setCharCount(180 - user.bio.length);
      } else {
        setCharCount(180);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, user, history, userInfo, updateSuccess, deleteSuccess]);

  const uploadingHandler = async (e) => {
    const file = e.target.files[0];
    const uploadFile = new FormData();
    uploadFile.append("avatar", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/uploads/avatar",
        uploadFile,
        config
      );
      setAvatar(data);
      console.log(data);
      console.log(avatar);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match!", severity: "error" });
    } else if (formData.bio && formData.bio.length > 180) {
      setMessage({
        text: "Your bio should be less than or equal to 180 chars only.",
        severity: "error",
      });
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: formData.name,
          avatar: avatar,
          email: formData.email,
          bio: formData.bio,
          password: formData.password,
        })
      );
    }
  };
  const deleteBtnHandler = () => {
    if (window.confirm("Are you sure? This cannot be undone!")) {
      dispatch(deleteUser());
    }
  };
  return loading ? (
    <Box>
      <CircularProgress
        color="secondary"
        left={-20}
        top={-20}
        className={classes.circularProgress}
      />
    </Box>
  ) : (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="center"
      className={classes.minimunHeight}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <Grid item xs={11} sm={10} className={classes.grid}>
        <Paper height="100vh">
          <Box style={{ background: "#36C9C6" }}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Box className={classes.avatarContainer}>
                {avatar ? (
                  <Box alignItems="center" justifyContent="center">
                    <img
                      className={classes.avatar}
                      alt={formData.name && formData.name + "Avatar"}
                      src={avatar}
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
                <input
                  accept="image/*"
                  style={{ visibility: "hidden" }}
                  id="icon-button-file"
                  type="file"
                  onChange={uploadingHandler}
                />
                <Box className={classes.btnOverlay}>
                  <label htmlFor="icon-button-file">
                    <IconButton component="span" className={classes.icon}>
                      <PhotoCameraTwoToneIcon />
                    </IconButton>
                  </label>
                </Box>
              </Box>

              <TextField
                name="bio"
                align="center"
                label="Bio"
                variant="outlined"
                multiline
                rows={5}
                rowsMax={10}
                value={formData.bio ? formData.bio : ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                  setCharCount(180 - e.target.value.length);
                }}
                className={classes.bio}
              />
              <strong className={classes.charCount}>
                * {charCount} characters left
              </strong>
            </Grid>
          </Box>
          <Divider orientation="horizontal" />
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} md={6}>
              {updateLoading && (
                <CircularProgress
                  color="secondary"
                  className={classes.circularProgress}
                />
              )}
              {updateError && <Alert severity="error">{updateError}</Alert>}
              {message && (
                <Alert severity={message.severity}>{message.text}</Alert>
              )}

              <form
                autoComplete="off"
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={submitHandler}
              >
                <List>
                  <ListItem>
                    <TextField
                      name="name"
                      className={classes.marginBig}
                      variant="outlined"
                      label="Name"
                      fullWidth
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </ListItem>
                  <Divider orientation="horizontal" />
                  <ListItem>
                    <TextField
                      name="email"
                      className={classes.marginBig}
                      variant="outlined"
                      label="Email Adress"
                      fullWidth
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </ListItem>
                  <Divider orientation="horizontal" />
                  <ListItem>
                    <TextField
                      name="password"
                      variant="outlined"
                      className={classes.marginBig}
                      label="Password"
                      fullWidth
                      required
                      helperText="Your password must be more than 8 characters"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </ListItem>
                  <Divider orientation="horizontal" />
                  <ListItem>
                    <TextField
                      name="confirmPassword"
                      variant="outlined"
                      className={classes.marginBig}
                      label="Confirm Password"
                      fullWidth
                      required
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </ListItem>
                  <Divider orientation="horizontal" />
                </List>
                <Box className={classes.marginSmall}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    type="submit"
                  >
                    Update
                  </Button>
                  <Button variant="contained" className={classes.goBackBtn}>
                    <Link to="/profile">Go Back</Link>
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
          <Box className={classes.centeredContent}>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={deleteBtnHandler}
            >
              Delete Account
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfileEditScreen;
