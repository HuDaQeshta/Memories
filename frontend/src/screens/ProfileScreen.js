import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Divider,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";
import useStyles from "../styles";
import PostForm from "../components/Forms/PostForm";
import Posts from "../components/Posts/Posts";
import FollowingList from "../components/Lists/FollowingList";
import FollowersList from "../components/Lists/FollowersList";
import ProfileTop from "../components/Profile/ProfileTop";

const ProfileScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [selectedTab, setSelectedTab] = useState(0);
  const [message, setMessage] = useState("");
  const postCreate = useSelector((state) => state.postCreate);
  const { success: createSuccess } = postCreate;
  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { error: unfollowError } = userUnfollow;
  const userFollow = useSelector((state) => state.userFollow);
  const { error: followError } = userFollow;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (createSuccess || !user || !user.name) {
      dispatch(getUserDetails("profile"));
    }
  }, [dispatch, user, history, userInfo, createSuccess]);
  //Handle tselected tap change
  const handleTabChange = (e, newValue) => {
    setSelectedTab(newValue);
  };

  return loading ? (
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
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="center"
      className={classes.minimunHeight}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <Grid item xs={12} sm={10}>
        <Paper height="100vh">
          <ProfileTop setMessage={setMessage} />
          <Divider orientation="horizontal" />
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered
            aria-label="Your Following, Followers, and Posts Tab"
          >
            <Tab label="Following" />
            <Divider orientation="vertical" className={classes.divider} />
            <Tab label="Followers" />
            <Divider orientation="vertical" className={classes.divider} />
            <Tab label="Posts" />
          </Tabs>
          <Divider orientation="horizontal" />
          {selectedTab === 0 && (
            <Grid
              container
              spacing={0}
              direction="row"
              className={classes.grid}
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} md={6}>
                {unfollowError && (
                  <Alert severity="error">{unfollowError}</Alert>
                )}
                {message && <Alert severity="success">{message}</Alert>}
                <FollowingList setMessage={setMessage} authenticated={true} />
              </Grid>
            </Grid>
          )}
          {selectedTab === 2 && (
            <Grid
              container
              spacing={0}
              className={classes.grid}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} md={6}>
                {followError && <Alert severity="error">{followError}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
                <FollowersList setMessage={setMessage} authenticated={true} />
              </Grid>
            </Grid>
          )}
          {selectedTab === 4 && (
            <Grid
              container
              spacing={0}
              className={classes.grid}
              direction="row"
              justify="space-between"
            >
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.listTitle}>
                  Posts List
                </Typography>
                <Posts user={userInfo._id} columns={12} />
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <PostForm />
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfileScreen;
