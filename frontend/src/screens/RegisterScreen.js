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
import { register } from "../actions/userActions";
import memories from "../images/memories.png";
const RegisterScreen = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setMessage("Your password is less than 8 characters");
    } else if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
    } else if (
      formData.password === formData.confirmPassword &&
      formData.password.length > 8
    ) {
      dispatch(register(formData.name, formData.email, formData.password));
    }
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
            {message && <Alert severity="error">{message}</Alert>}
            <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={submitHandler}
            >
              <Typography className={classes.title} align="center" variant="h6">
                Sign up to share your memories
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
                name="name"
                className={classes.marginBig}
                variant="outlined"
                label="Name"
                fullWidth
                required
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
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
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
              <TextField
                name="password"
                variant="outlined"
                className={classes.marginBig}
                label="Password"
                fullWidth
                required
                type="password"
                helperText="Your password must be more than 8 characters"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
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
                  setFormData({ ...formData, [e.target.name]: e.target.value })
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
                Sign Up
              </Button>
              <p>
                Already joined?{" "}
                <Link className={classes.links} to="/login">
                  Sign In to your account.
                </Link>
              </p>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterScreen;
