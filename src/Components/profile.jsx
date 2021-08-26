import React, { useEffect, useState } from "react";
import "../Styles/profile.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
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
import iconqp from "../Assets/iconqp.png";

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
  const [revenuemodalIsOpen, revenuesetIsOpen] = useState(false);
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
  const handlerevenueModal1 = () => {
    revenuesetIsOpen(!revenuemodalIsOpen);
  };

  const deleteThisPost = async (postId) => {
    try {
      let isExecuted = window.confirm("Are you sure to delete this action?");
      if (isExecuted) {
        const checkDelete = await axios.delete(`${BACKEND}/post/${postId}`);
        if (checkDelete.data.success) {
          window.location.reload(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  // const EditThisPost = async () => {
  //   try {
  //     return <Link
  //   } catch (e) { console.log(e) }
  // }

  return (
    <div className="profile-container">
      <div className="profile-container-upper">
        <div
          className="profile-container-upper-heading"
          style={{ display: "flex" }}
        >
          <Avatar src={iconqp} style={{ marginRight: 1, alignSelf: "center" }} />
          <div style={{ alignSelf: "center" }}>
            <div className="profile-profile-displayname">
              {loggedInUser?.userName}
            </div>
            <div className="profile-profile-username">
              {loggedInUser?.firstName}
            </div>
          </div>
        </div>
        <div className="profile-container-upper-homeicon">
          <Link to="/">
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
          >
            <a class="ui red ribbon label">Amateur</a>
          </div>
        </div>
        <div className="profile-profile-info">
          {/* <div className="profile-profile-names">
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
          </div> */}
          <div style={{ alignSelf: "center" }}>
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
                        <Link
                          to={`/${followers?.userName}/${followers?._id}`}
                        // to={`/user/${followers?.userName}/${followers?._id}`}
                        >
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: 25,
              }}
            >
              <div style={{ borderLeft: "inset" }}>
                <div className="profile-bio">Bio:</div>
                <div className="profile-bio-detail">
                  {loggedInUser?.bio ? loggedInUser?.bio : "Add your bio"}
                </div>
              </div>
              <div style={{ alignSelf: "center" }}>
                <Link
                  to="/edit"
                  className="edit-link"
                // style={{ alignSelf: "center" }}
                >
                  <div className="editprofile">
                    <CreateIcon />
                    <span className="editprofile-text">Edit Profile</span>
                  </div>
                </Link>
                <div
                  className="edit-link"
                  style={{ cursor: "pointer" }}
                  onClick={handlerevenueModal1}
                >
                  <div className="editprofile">
                    <AttachMoneyIcon />
                    <span className="editprofile-text">Revenue Insight</span>
                  </div>
                </div>
                <Modal isOpen={revenuemodalIsOpen} className="followers-modal">
                  <div className="follower-modal-header">
                    <div className="follower-modal-header-head">Revenue Insight</div>
                    <div onClick={handlerevenueModal1}>
                      <CancelOutlinedIcon style={{ fontSize: "20px" }} />
                    </div>
                  </div>
                  <div style={{ textAlign: "center", marginTop: 55, fontWeight: "bold" }}>Total Revenue Generated</div>
                  <div style={{ textAlign: "center", marginTop: 20, fontWeight: "bold" }}>Rs {loggedInUser.revenue == undefined ? "0" : loggedInUser.revenue}</div>
                  <div style={{ textAlign: "center", marginTop: 35 }}>Minimum Redeem Limit is Rs 100</div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-saved-toggle">
        <div
          className={`profile-saved-toggle-each ${!saved && "profile-toggle-active"
            }`}
          onClick={handleClick}
        >
          <AllInboxIcon />
          Posts
        </div>
        <div
          className={`profile-saved-toggle-each ${saved && "profile-toggle-active"
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
          return userSavedPost?.reverse().map((post, index) => {
            // console.log(post, "this is saved post")
            return (
              // <Link
              //   to={{
              //     pathname: ``,
              //     state: { post, user: globalUser },
              //   }}
              // >
              <a
                // href={`/post/${post?.title.replace(/ /g, "-")}/${post?._id}`}
                href={`/${loggedInUser?.userName}/${post?.title.replace(/ /g, "-")}/${post?._id}`}
              >
                <div className="individual-post-profile" key={index}>
                  <img
                    src={post?.image}
                    alt=""
                    className="individual-post-profile-img"
                  />
                  <div className="individual-post-profile-heading">
                    {post?.title}
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
          return userPost?.reverse()?.map((post, index) => {
            // console.log(post)
            return (
              // <Link
              //   to={{
              //     pathname: `${post.title}/${loggedInUser}/${post._id}`,
              //     state: { post, user: globalUser },
              //   }}
              // >

              <>
                <a
                  href={`/${loggedInUser?.userName}/${post?.title.replace(/ /g, "-")}/${post?._id}`}
                >
                  <div className="individual-post-profile" key={index}>
                    <div
                      style={{
                        textAlign: "end",
                        transform: "translate(-10px, 35px)",
                      }}
                    >
                      <DeleteIcon
                        color="action"
                        style={{
                          borderRadius: "30px",
                          backgroundColor: "#f7f7f7",
                          boxShadow: "1px 1px 1px 0.001px rgb(94, 94, 94)",
                        }}
                        onClick={() => deleteThisPost(post._id)}
                      />
                    </div>

                    <img
                      src={post?.image ? post?.image : Quinkpost}
                      alt=""
                      className="individual-post-profile-img"
                    />
                    <div className="individual-post-profile-heading">
                      {post?.title}
                    </div>
                  </div>
                </a>
              </>
            );
          });
        })()}
      </div>
    </div>
  );
}

export default Profile;
