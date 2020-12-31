import React, { useEffect } from "react";
import { Container, Grow, Grid, AppBar, Typography } from "@material-ui/core";
import { Route } from "react-router-dom";
import memories from "../images/memories.png";
import Posts from "../components/Posts/Posts";
import Header from "../components/Header/Header";
import PostForm from "../components/Forms/PostForm";
import useStyles from "../styles";
import { useSelector } from "react-redux";
const HomeScreen = ({ match }) => {
  const classes = useStyles();
  const keyword = match.params.keyword;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {}, [userInfo, keyword]);
  return (
    <>
      <Route render={({ history }) => <Header history={history} />} />
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">
            Memories
          </Typography>
          <img
            className={classes.image}
            src={memories}
            alt="logo"
            height="60"
          />
        </AppBar>
        <Grow in>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={8}>
              <Posts keyword={keyword} user={null} columns={6} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Route render={({ history }) => <PostForm history={history} />} />
            </Grid>
          </Grid>
        </Grow>
      </Container>
    </>
  );
};

export default HomeScreen;
