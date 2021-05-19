import React, { useEffect, useState } from "react";
import "../Styles/profile.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import IconButton from "@material-ui/core/IconButton";
import profileimage from "../Assets/colour.jpg";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import { Avatar } from "@material-ui/core";
import Modal from "react-modal";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BACKEND from "./Constants/Backend";
import { USER_LOGGED_IN } from "./Reducer/Action";
import Quinkpost from "../Assets/Quinkpost.jpg";

function Profile() {
  const defaultUrl =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
  const globalUser = useSelector((state) => state);
  // console.log(globalUser);
  const dispatch = useDispatch();
  const loggedInUser = globalUser?.user;
  const [saved, setSaved] = useState(false);
  const [followermodalIsOpen, followersetIsOpen] = useState(false);
  const [followingmodalIsOpen, followingsetIsOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followings, setfollowings] = useState([]);
  const [userPost, setuserPost] = useState([]);
  const [userSavedPost, setuserSavedPost] = useState([]);
  const [toggleFollowers, settoggleFollowers] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const userPost = await axios.get(
          `${BACKEND}/user/${globalUser.user._id}`
        );
        setuserPost(userPost.data.user.post);
        setuserSavedPost(userPost.data.user.savedPost);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      console.log("useEffect called  *************");
      // const globalUser = useSelector((state) => state);
      const data = await axios.get(
        `${BACKEND}/user/follwers/followings/${globalUser.user._id}`
      );
      console.log(data.data, "<<<<this is inside effect");
      setFollowers(data.data.followers);
      setfollowings(data.data.followings);
    })();
  }, [toggleFollowers]);

  const removeFollowing = async (user2Id) => {
    try {
      console.log("kok lkjsdfj<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      const result = await axios.post(`${BACKEND}/follow/unfollow`, {
        followerId: loggedInUser._id,
        followingToId: user2Id,
      });
      console.log(result.data, "in remove follower function");
      if (result.data.success) {
        settoggleFollowers(!toggleFollowers);
        console.log("follower removed <<<<<<<<<<<<<<<<");
        console.log(result.data, "<<<<<<<<<<<<<<<<<<<<<");
        dispatch({ type: USER_LOGGED_IN, payload: result.data.user });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = () => {
    setSaved(false);
  };
  const handleClick1 = () => {
    setSaved(true);
  };

  const handlefollowerModal = () => {
    followersetIsOpen(true);
  };
  const handlefollowerModal1 = () => {
    followersetIsOpen(false);
  };
  const handlefollowingModal = () => {
    followingsetIsOpen(true);
  };
  const handlefollowingModal1 = () => {
    followingsetIsOpen(false);
  };
  return (
    <div className="profile-container">
      <div className="profile-container-upper">
        <div className="profile-container-upper-heading">Profile</div>
        <div className="profile-container-upper-homeicon">
          <Link to="/homeScreen">
            <IconButton className="iconbutton-profile">
              <HomeRoundedIcon />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="profile-container-infobox">
        <div className="profile-profile-image">
          <div
            className="profile-profile-image-img"
            style={{
              backgroundImage: loggedInUser?.avatar
                ? `url(${loggedInUser?.avatar})`
                : `url(${defaultUrl})`,
            }}
          ></div>
        </div>
        <div className="profile-profile-info">
          <div className="profile-profile-names">
            <div>
              <div className="profile-profile-displayname">
                {loggedInUser?.userName}
              </div>
              <div className="profile-profile-username">
                {loggedInUser?.firstName}
              </div>
            </div>
            <Link to="/edit" className="edit-link">
              <div className="editprofile">
                <CreateIcon />
                <span className="editprofile-text">Edit Profile</span>
              </div>
            </Link>
          </div>
          <div>
            <div className="profilesecondary">
              <div className="profile-detail-profile">
                <div className="profile-detail-each-profile">Quinks</div>
                <div className="number-profile">
                  {loggedInUser?.post?.length}
                </div>
              </div>
              <div className="line"></div>
              <div className="profile-detail" onClick={handlefollowerModal}>
                <div className="profile-detail-each-profile">followers</div>
                <div className="number-profile">
                  {loggedInUser?.followers?.length}
                </div>
              </div>
              <Modal isOpen={followermodalIsOpen} className="followers-modal">
                <div className="follower-modal-header">
                  <div className="follower-modal-header-head">Follower</div>
                  <div onClick={handlefollowerModal1}>
                    <CancelOutlinedIcon style={{ fontSize: "20px" }} />
                  </div>
                </div>
                <div className="follower-each-modal-container">
                  {(() => {
                    return followers?.map((followers, key) => {
                      // console.log(followers, "this is>>>>>>>>>>>>>>>>>")
                      return (
                        <Link to={`/profileOther/${followers?._id}`}>
                          <div
                            className="follower-each-modal"
                            key={key}
                            style={{ textDecoration: "none" }}
                          >
                            <div className="follower-each-modal-avatar">
                              <Avatar />
                            </div>
                            <div className="follower-each-modal-info">
                              <div
                                className="follower-each-modal-info-displayname"
                                style={{ textDecoration: "none" }}
                              >
                                {followers?.userName}
                              </div>
                              <div className="follower-each-modal-info-username">
                                {followers?.firstName}
                              </div>
                            </div>

                            {/* <div className="follower-each-modal-remove" style={{ cursor: "pointer" }}>remove</div> */}
                          </div>
                        </Link>
                      );
                    });
                  })()}
                </div>
              </Modal>
              <div className="line"></div>
              <div className="profile-detail" onClick={handlefollowingModal}>
                <div className="profile-detail-each-profile">following</div>
                <div className="number-profile">
                  {loggedInUser?.followings?.length}
                </div>
              </div>
              <Modal isOpen={followingmodalIsOpen} className="followers-modal">
                <div className="follower-modal-header">
                  <div className="follower-modal-header-head">Following</div>
                  <div onClick={handlefollowingModal1}>
                    <CancelOutlinedIcon style={{ fontSize: "20px" }} />
                  </div>
                </div>
                <div className="follower-each-modal-container">
                  {(() => {
                    return followings?.map((following, key) => {
                      return (
                        <div className="follower-each-modal">
                          <div className="follower-each-modal-avatar">
                            <Avatar />
                          </div>
                          <div className="follower-each-modal-info">
                            <div className="follower-each-modal-info-displayname">
                              {following?.userName}
                            </div>
                            <div className="follower-each-modal-info-username">
                              {following?.firstName}
                            </div>
                          </div>
                          <div
                            style={{ cursor: "pointer" }}
                            className="follower-each-modal-remove"
                            onClick={() => removeFollowing(following._id)}
                          >
                            unfollow
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </Modal>
            </div>
            <div style={{ borderLeft: "inset" }}>
              <div className="profile-bio">Bio:</div>
              <div className="profile-bio-detail">
                {loggedInUser?.bio ? loggedInUser?.bio : "Add your bio"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-saved-toggle">
        <div
          className={`profile-saved-toggle-each ${
            !saved && "profile-toggle-active"
          }`}
          onClick={handleClick}
        >
          <AllInboxIcon />
          Posts
        </div>
        <div
          className={`profile-saved-toggle-each ${
            saved && "profile-toggle-active"
          }`}
          onClick={handleClick1}
        >
          <BookmarkBorderIcon />
          Saved Posts
        </div>
      </div>
      <div
        className={`main-profile-container ${!saved && "profile-display-none"}`}
      >
        {(() => {
          return userSavedPost.map((post, index) => {
            // console.log(post, "this is saved post")
            return (
              // <Link
              //   to={{
              //     pathname: ``,
              //     state: { post, user: globalUser },
              //   }}
              // >
              <a href={`${post?.title}/${loggedInUser}/${post?._id}`}>
                <div className="individual-post-profile" key={index}>
                  <img
                    src={post?.image}
                    alt=""
                    className="individual-post-profile-img"
                  />
                  <div className="individual-post-profile-heading">
                    {post?.caption}
                  </div>
                </div>
              </a>
            );
          });
        })()}
      </div>
      <div
        className={`main-profile-container ${saved && "profile-display-none"}`}
      >
        {(() => {
          return userPost.map((post, index) => {
            // console.log(post)
            return (
              // <Link
              //   to={{
              //     pathname: `${post.title}/${loggedInUser}/${post._id}`,
              //     state: { post, user: globalUser },
              //   }}
              // >
              <a href={`${post?.title}/${loggedInUser}/${post?._id}`}>
                <div className="individual-post-profile" key={index}>
                  <img
                    src={post?.image ? post?.image : Quinkpost}
                    alt=""
                    className="individual-post-profile-img"
                  />
                  <div className="individual-post-profile-heading">
                    {post?.caption}
                  </div>
                </div>
              </a>
            );
          });
        })()}
      </div>
    </div>
  );
}

export default Profile;
