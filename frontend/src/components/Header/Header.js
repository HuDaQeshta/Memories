import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {
  InputBase,
  Badge,
  MenuItem,
  Avatar,
  CircularProgress,
  Backdrop,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Menu from "@material-ui/core/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonAddTwoToneIcon from "@material-ui/icons/PersonAddTwoTone";
import ThumbUpTwoToneIcon from "@material-ui/icons/ThumbUpTwoTone";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, logout } from "../../actions/userActions";
import useStyles from "./styles";
import {
  USER_DETAILS_RESET,
  USER_LISTS_RESET,
} from "../../constants/userConstants";
import { getPost, getPostLikesList } from "../../actions/postActions";
import {
  GET_POST_RESET,
  DISLIKE_POST_RESET,
  LIKE_POST_RESET,
} from "../../constants/postConstants";

const Header = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifyAnchorEl, setNotifyAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationsMenuOpen = Boolean(notifyAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  const dispatch = useDispatch();
  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleNotificationsMenuOpen = (e) => {
    handleMenuClose();
    setNotifyAnchorEl(e.currentTarget);
  };

  const handleNotificationsMenuClose = () => {
    setNotifyAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(e.currentTarget);
  };
  const handleVisitedNotification = (id) => {
    if (userInfo.notifications.length === 1) {
      dispatch(updateUserProfile({ ...userInfo, notifications: [] }));
    } else {
      let userNotifications = userInfo.notifications.filter(
        (notification) => notification._id.toString() !== id
      );
      dispatch(
        updateUserProfile({
          ...userInfo,
          notifications: [...userNotifications],
        })
      );
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push("/login");
  };
  const menuId = "profile-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      className={classes.marginTopSm}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          dispatch({ type: USER_LISTS_RESET });
          dispatch({ type: USER_DETAILS_RESET });
          dispatch({ type: DISLIKE_POST_RESET });
          dispatch({ type: LIKE_POST_RESET });
          handleMenuClose();
        }}
      >
        <Link to="/profile" className={classes.menuLink}>
          Profile
        </Link>
      </MenuItem>
      <MenuItem className={classes.menuLink} onClick={handleLogout}>
        Log out
      </MenuItem>
    </Menu>
  );

  const notificationsMenuId = "notifications";
  const renderNotificationsMenu = (
    <>
      {userInfo &&
      userInfo.notifications &&
      userInfo.notifications.length !== 0 ? (
        <Menu
          anchorEl={notifyAnchorEl}
          className={classes.marginTopSm}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={notificationsMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isNotificationsMenuOpen}
          onClose={handleNotificationsMenuClose}
        >
          {userInfo &&
            userInfo.notifications &&
            userInfo.notifications.map((item) =>
              item.notification === "follow" ? (
                <MenuItem
                  className={classes.highLight}
                  onClick={handleNotificationsMenuClose}
                >
                  <PersonAddTwoToneIcon />
                  <Link
                    to={`/${item.userId}/profile`}
                    id={item._id}
                    onClick={() => handleVisitedNotification(item._id)}
                    className={`${classes.menuLink} ${classes.linkPadding}`}
                  >
                    {item.userName}
                  </Link>
                  Followed you!
                </MenuItem>
              ) : (
                <MenuItem
                  className={classes.highLight}
                  onClick={() => {
                    dispatch({ type: GET_POST_RESET });
                    dispatch(getPost(item.postId));
                    dispatch(getPostLikesList(item.postId));
                    handleVisitedNotification(item._id);
                    handleNotificationsMenuClose();
                    history.push(`/${item.postId}/post`);
                  }}
                >
                  <ThumbUpTwoToneIcon />
                  <Link
                    to={`/${item.userId}/profile`}
                    id={item._id}
                    className={`${classes.menuLink} ${classes.linkPadding}`}
                  >
                    {item.userName}
                  </Link>
                  Liked your post!
                </MenuItem>
              )
            )}
        </Menu>
      ) : (
        <> </>
      )}
    </>
  );

  const mobileMenuId = "profile-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      className={classes.marginTopSm}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      {!userInfo ? (
        <MenuItem>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </MenuItem>
      ) : (
        <div>
          <MenuItem onClick={handleNotificationsMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="notifications"
              aria-haspopup="true"
              color="inherit"
            >
              <Badge
                badgeContent={
                  userInfo.notifications && userInfo.notifications.length
                }
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="profile-menu"
              aria-haspopup="true"
              color="inherit"
            >
              {userInfo.avatar ? (
                <Avatar src={userInfo.avatar && userInfo.avatar} />
              ) : (
                <Avatar>
                  {userInfo.name && userInfo.name[0].toUpperCase()}
                </Avatar>
              )}
            </IconButton>
            <p>{userInfo && userInfo.name}</p>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      {loading && (
        <Backdrop>
          <CircularProgress color="secondary" />
        </Backdrop>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography> */}
          <form onSubmit={submitHandler}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search by Hashtags…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </form>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {userInfo ? (
              <>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={notificationsMenuId}
                  aria-haspopup="true"
                  onClick={handleNotificationsMenuOpen}
                  color="inherit"
                >
                  <Badge
                    badgeContent={
                      userInfo.notifications && userInfo.notifications.length
                    }
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {userInfo.avatar ? (
                    <Avatar src={userInfo.avatar && userInfo.avatar} />
                  ) : (
                    <Avatar>
                      {userInfo.name && userInfo.name[0].toUpperCase()}
                    </Avatar>
                  )}
                  {/* <AccountCircle /> */}
                </IconButton>
              </>
            ) : (
              <Button color="inherit">
                <Link
                  to="/login"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Button>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderNotificationsMenu}
      {renderMenu}
    </div>
  );
};
export default Header;
