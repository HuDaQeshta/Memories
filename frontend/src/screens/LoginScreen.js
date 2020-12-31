import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useStyles from "../styles";
import { login } from "../actions/userActions";
import memories from "../images/memories.png";
const LoginScreen = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  return (
    <>
      {loading && (
        <Box>
          <CircularProgress
            color="secondary"
            left={-20}
            top={-20}
            className={classes.circularProgress}
          />
        </Box>
      )}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "97.5vh" }}
      >
        <Grid item xs={11} sm={6} lg={4}>
          <Paper className={classes.paper}>
            {error && <Alert severity="error">{error}</Alert>}

            <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={submitHandler}
            >
              <Typography className={classes.title} align="center" variant="h6">
                Log in to share your memories
              </Typography>
              <Link className={classes.links} to="/">
                <Typography
                  className={classes.heading}
                  variant="h3"
                  align="center"
                >
                  Memories
                  <img
                    className={classes.image}
                    src={memories}
                    alt="logo"
                    height="50"
                  />
                </Typography>
              </Link>
              <TextField
                name="email"
                className={classes.marginBig}
                variant="outlined"
                label="Email Adress"
                fullWidth
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                name="password"
                variant="outlined"
                className={classes.marginBig}
                label="Password"
                fullWidth
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
              >
                Log in
              </Button>
              <p>
                New to Memories?{" "}
                <Link className={classes.links} to="/register">
                  Create an Account
                </Link>
              </p>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginScreen;
