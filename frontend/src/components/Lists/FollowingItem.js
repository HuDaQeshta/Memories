import React from "react";
import {
  Divider,
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { unfollowUser, followUser } from "../../actions/userActions";
import useStyles from "../../styles";
import {
  USER_DETAILS_RESET,
  USER_LISTS_RESET,
} from "../../constants/userConstants";
import defaultAvatar from "../../images/defaultAvatar.png";

const FollowingItem = ({ history, account, setMessage, authenticated }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userLists = useSelector((state) => state.userLists);
  const { following } = userLists;

  const followBtnHandler = (id, name) => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(followUser(id));
      setMessage(`${name} is now one of your followings.`);
    }
  };
  const unfollowBtnHandler = (id, name) => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(unfollowUser(id));
      setMessage(`${name} is not in your followings.`);
    }
    document.getElementById(id).innerText = "Follow";
  };
  const mouseEnterHandler = (id) => {
    document.getElementById(id).innerText = "Unfollow";
  };
  const mouseLeaveHandler = (id) => {
    document.getElementById(id).innerText = "Following";
  };

  return (
    <>
      <ListItem key={account._id}>
        <ListItemAvatar>
          {account.avatar ? (
            <Avatar src={account.avatar && account.avatar} />
          ) : (
            <Avatar src={defaultAvatar} />
          )}
        </ListItemAvatar>
        <Link
          className={classes.links}
          to={
            userInfo && userInfo._id === account._id
              ? `/profile`
              : `/${account._id}/profile`
          }
          onClick={() => {
            dispatch({
              type: USER_LISTS_RESET,
            });
            dispatch({
              type: USER_DETAILS_RESET,
            });
          }}
        >
          <ListItemText primary={account.name} />
        </Link>
        {userInfo && authenticated && userInfo._id !== account._id ? (
          <ListItemSecondaryAction>
            {following &&
            following.filter(
              (followingItem) => followingItem._id === account._id
            ).length !== 0 ? (
              <Button
                edge="end"
                id={account._id}
                variant="contained"
                color="secondary"
                onMouseEnter={() => mouseEnterHandler(account._id)}
                onMouseLeave={() => mouseLeaveHandler(account._id)}
                onClick={() => {
                  unfollowBtnHandler(account._id, account.name);
                }}
              >
                Following
              </Button>
            ) : (
              <Button
                variant="outlined"
                edge="end"
                id={account._id}
                color="primary"
                onClick={(e) => {
                  followBtnHandler(account._id, account.name);
                }}
              >
                Follow
              </Button>
            )}
          </ListItemSecondaryAction>
        ) : (
          <></>
        )}
      </ListItem>
      <Divider orientation="horizontal" />
    </>
  );
};

export default FollowingItem;
