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
import { Route } from "react-router-dom";
import useStyles from "../styles";
import Posts from "../components/Posts/Posts";
import FollowingList from "../components/Lists/FollowingList";
import FollowersList from "../components/Lists/FollowersList";
import ProfileTop from "../components/Profile/ProfileTop";
const UserProfileScreen = ({ history, match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ID = match.params.id;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const [selectedTab, setSelectedTab] = useState(0);
  const [message, setMessage] = useState("");
  const postCreate = useSelector((state) => state.postCreate);
  const { success: createSuccess } = postCreate;
  const postUpdate = useSelector((state) => state.postUpdate);
  const { success: updateSuccess } = postUpdate;

  useEffect(() => {
    if (!user || user._id !== ID) {
      dispatch(getUserDetails(ID));
    }
    // eslint-disable-next-line
  }, [dispatch, history, userInfo, ID, createSuccess, updateSuccess]);
  //Handle tselected tap change
  const handleTabChange = (e, newValue) => {
    setSelectedTab(newValue);
  };

  return loading || !user ? (
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
      <Grid item xs={11} sm={10}>
        <Paper height="100vh">
          <Route
            render={({ history }) => (
              <ProfileTop setMessage={setMessage} history={history} />
            )}
          />
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
                {message && <Alert severity="success">{message}</Alert>}

                <FollowingList setMessage={setMessage} authenticated={false} />
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
                {message && <Alert severity="success">{message}</Alert>}

                <FollowersList setMessage={setMessage} authenticated={false} />
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
              <Grid item xs={12} sm={12}>
                <Typography variant="h6" className={classes.listTitle}>
                  Posts List
                </Typography>
                <Posts user={ID} columns={6} />
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfileScreen;
