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
import { followUser, unfollowUser } from "../../actions/userActions";
import useStyles from "../../styles";
import {
  USER_DETAILS_RESET,
  USER_LISTS_RESET,
} from "../../constants/userConstants";
import defaultAvatar from "../../images/defaultAvatar.png";

const FollowerItem = ({ history, account, setMessage, authenticated }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
  };
  const mouseEnterHandler = (id) => {
    document.getElementById(id).innerText = "Unfollow";
  };
  const mouseLeaveHandler = (id) => {
    document.getElementById(id).innerText = "Following";
  };
  return (
    <>
      <ListItem key={account.follower._id}>
        <ListItemAvatar>
          {account.follower.avatar ? (
            <Avatar src={account.follower.avatar} />
          ) : (
            <Avatar src={defaultAvatar} />
          )}
        </ListItemAvatar>
        <Link
          className={classes.links}
          to={
            userInfo && userInfo._id === account.follower._id
              ? `/profile`
              : `/${account.follower._id}/profile`
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
          <ListItemText primary={account.follower.name} />
        </Link>
        {userInfo && authenticated ? (
          <ListItemSecondaryAction>
            {account.followed ? (
              <Button
                edge="end"
                id={account.follower._id}
                variant="contained"
                color="secondary"
                onMouseEnter={() => mouseEnterHandler(account.follower._id)}
                onMouseLeave={() => mouseLeaveHandler(account.follower._id)}
                onClick={() => {
                  unfollowBtnHandler(
                    account.follower._id,
                    account.follower.name
                  );
                }}
              >
                Following
              </Button>
            ) : (
              <Button
                variant="outlined"
                edge="end"
                id={account.follower._id}
                color="primary"
                onClick={() => {
                  followBtnHandler(account.follower._id, account.follower.name);
                }}
              >
                Follow
              </Button>
            )}
          </ListItemSecondaryAction>
        ) : (
          <> </>
        )}
      </ListItem>
      <Divider orientation="horizontal" />
    </>
  );
};

export default FollowerItem;
