import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Post.js";
import { generateToken } from "../utils/auth.js";

// // @route    POST api/users/login
// // @desc     Authintecate users
// // @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || "",
      notifications: user.notifications,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

// // @route    POST api/users/register
// // @desc     Register user
// // @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists.");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      notifications: user.notifications,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data.");
  }
});

// // @route    GET api/users/profile
// // @desc     Get user profile
// // @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      avatar: user.avatar || "",
      following: user.following,
      followers: user.followers,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found.");
  }
});

// // @route    PUT api/users/profile
// // @desc     Update user profile
// // @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const posts = await Post.find({ userId: req.user._id });
  const users = await User.find({});
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;
    user.avatar = req.body.avatar || user.avatar || "";
    user.notifications = req.body.notifications || user.notifications;
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.name) {
      for (let i = 0; i < posts.length; i++) {
        posts[i].creator = req.body.name;
        await posts[i].save();
      }
      for (let j = 0; j < users.length; j++) {
        let notificationsToUpdate = users[j].notifications.filter(
          (notification) => notification.userId === req.user._id
        );
        if (notificationsToUpdate.length !== 0) {
          for (let x = 0; x < notificationsToUpdate.length; x++) {
            notificationsToUpdate[x].userName = req.body.name;
          }
          users[j].notifications = notificationsToUpdate;
          await users[j].save();
        }
      }
    }
    const updatedUser = await user.save();
    if (req.body.password) {
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        notifications: updatedUser.notifications,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        notifications: updatedUser.notifications,
      });
    }
  } else {
    res.status(404);
    throw new Error("User Not Found.");
  }
});

// // @route    GET api/users/:id
// // @desc     Get a user by ID
// // @access   Public
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      avatar: user.avatar || "",
      following: user.following,
      followers: user.followers,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// // @route    POST api/users/:id/follow
// // @desc     Follow a user
// // @access   Private
const followUser = asyncHandler(async (req, res) => {
  const followingUser = await User.findById(req.user._id).select("-password");
  const followedUser = await User.findById(req.params.id).select(
    "-password -email"
  );
  const followingUserObject = {
    userId: followingUser._id,
  };
  const followedUserObject = {
    userId: followedUser._id,
  };

  if (followingUser && followedUser) {
    if (
      followingUser.following.find(
        (user) => user.userId.toString() === req.params.id
      )
    ) {
      res.json(`${followedUser.name} is Already Followed.`);
    } else {
      followingUser.following.unshift(followedUserObject);
      followedUser.followers.unshift(followingUserObject);
      if (
        followingUser.followers.find(
          (user) => user.userId.toString() === req.params.id
        )
      ) {
        followingUser.followers.find(
          (user) => user.userId == req.params.id
        ).followed = true;
      }

      if (
        followedUser.following.find(
          (user) => user.userId.toString() === req.user._id.toString()
        ) &&
        followedUser.followers.find(
          (user) => user.userId.toString() === req.user._id.toString()
        )
      ) {
        followedUser.followers.find(
          (user) => user.userId.toString() === req.user._id.toString()
        ).followed = true;
      }
      followedUser.notifications.unshift({
        userId: followingUser._id,
        userName: followingUser.name,
        notification: "follow",
      });
      await followingUser.save();
      await followedUser.save();
      res.json(`${followedUser.name} Followed Successfully!`);
    }
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// // @route    DELETE api/users/:id/unfollow
// // @desc     Unfollow a user
// // @access   Private
const unfollowUser = asyncHandler(async (req, res) => {
  const followingUser = await User.findById(req.user._id);
  const unFollowedUser = await User.findById(req.params.id).select("-password");
  let following = [];
  let followers = [];
  if (followingUser && unFollowedUser) {
    if (
      followingUser.followers.find(
        (user) => user.userId.toString() === req.params.id
      )
    ) {
      followingUser.followers.find(
        (user) => user.userId.toString() === req.params.id
      ).followed = false;
    }
    following = followingUser.following.filter(
      (user) => user.userId.toString() !== req.params.id
    );
    followers = unFollowedUser.followers.filter(
      (user) => user.userId.toString() !== req.user._id.toString()
    );

    followingUser.following = following;
    unFollowedUser.followers = followers;

    await followingUser.save();
    await unFollowedUser.save();
    res.json(`${unFollowedUser.name} Unfollowed Successfully!`);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// // @route    GET api/users/:id/lists
// // @desc     Get user Following and followers List
// // @access   Public
const getUserLists = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  let followingList = [];
  let followersList = [];
  if (user) {
    if (user.following.length !== 0) {
      for (let i = 0; i < user.following.length; i++) {
        followingList.push(
          await User.findById(user.following[i].userId).select(
            "-password -email"
          )
        );
      }
    }
    if (user.followers.length !== 0) {
      for (let i = 0; i < user.followers.length; i++) {
        let follower = await User.findById(user.followers[i].userId).select(
          "-password -email"
        );
        followersList.push({
          follower,
          followed: user.followers[i].followed,
        });
      }
    }
    res.json({ followingList, followersList });
  } else {
    res.status(404);
    throw new Error("User Not Found.");
  }
});

// @route    DELETE api/users
// @desc     Delete a user by user ID
// @access   Private
const deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const userPosts = await Post.find({ userId: req.user._id });
  if (user) {
    for (let i = 0; i < userPosts.length; i++) {
      await userPosts[i].remove();
    }
    const posts = await Post.find({});
    let likes = [];
    for (let j = 0; j < posts.length; j++) {
      if (
        posts[j].likes &&
        posts[j].likes.filter(
          (like) => like.userId.toString() === req.user._id.toString()
        ).length !== 0
      ) {
        likes = posts[j].likes.filter(
          (like) => like.userId.toString() !== req.user._id.toString()
        );
        posts[j].likes = likes;
        await posts[j].save();
      }
    }
    const users = await User.find({});
    let following = [];
    let followers = [];
    let notifications = [];
    for (let j = 0; j < users.length; j++) {
      if (users[j]._id !== req.user._id) {
        if (
          users[j].following &&
          users[j].following.filter(
            (account) => account.userId.toString() === req.user._id.toString()
          ).length !== 0
        ) {
          following = users[j].following.filter(
            (account) => account.userId.toString() !== req.user._id.toString()
          );
          users[j].following = following;
        }
        if (
          users[j].followers &&
          users[j].followers.filter(
            (account) => account.userId.toString() === req.user._id.toString()
          ).length !== 0
        ) {
          followers = users[j].followers.filter(
            (account) => account.userId.toString() !== req.user._id.toString()
          );
          users[j].followers = followers;
        }
        if (
          users[j].notifications &&
          users[j].notifications.filter(
            (account) => account.userId.toString() === req.user._id.toString()
          ).length !== 0
        ) {
          notifications = users[j].notifications.filter(
            (account) => account.userId.toString() !== req.user._id.toString()
          );
          users[j].notifications = notifications;
        }
        await users[j].save();
      }
    }
    await user.remove();
    res.json({ message: "Account has been removed!" });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

// // @route    PUT api/users/:id
// // @desc     Update user by id
// // @access   Private
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      notifications: updatedUser.notifications,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found.");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  followUser,
  unfollowUser,
  getUserLists,
  deleteAccount,
  updateUserById,
};
