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
import { useSelector } from "react-redux";
import axios from "axios";
import BACKEND from "./Constants/Backend";
import { SaveOutlined, TrendingUpTwoTone } from "@material-ui/icons";
// import Link  from "react-router-dom"

function Profile() {
  const globalUser = useSelector((state) => state);
  console.log(globalUser);
  const loggedInUser = globalUser?.user;
  const [saved, setSaved] = useState(false);
  const [followermodalIsOpen, followersetIsOpen] = useState(false);
  const [followingmodalIsOpen, followingsetIsOpen] = useState(false);
  const [followers, setFollowers] = useState([])
  const [followings, setfollowings] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${BACKEND}/user/follwers/followings/${globalUser.user._id}`)
        setFollowers(data.data.followers)
        setfollowings(data.data.followings)
      } catch (e) { console.log(e) }
    })()

  }, [])

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
            style={{ backgroundImage: `url(${profileimage})` }}
          ></div>
        </div>
        <div className="profile-profile-info">
          <div className="profile-profile-names">
            <div>
              <div className="profile-profile-displayname">
                {loggedInUser?.userName}
              </div>
              <div className="profile-profile-username">{loggedInUser?.firstName}</div>
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
                  {loggedInUser?.post.length}
                </div>
              </div>
              <div className="line"></div>
              <div className="profile-detail" onClick={handlefollowerModal}>
                <div className="profile-detail-each-profile">followers</div>
                <div className="number-profile">
                  {loggedInUser?.followers.length}
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
                      console.log(followers, "this is>>>>>>>>>>>>>>>>>")
                      return (<div className="follower-each-modal" key={key}>
                        <div className="follower-each-modal-avatar">
                          <Avatar />
                        </div>
                        <div className="follower-each-modal-info">
                          <div className="follower-each-modal-info-displayname">
                            {followers?.userName}
                          </div>
                          <div className="follower-each-modal-info-username">
                            {followers?.firstName}
                          </div>
                        </div>
                        <div className="follower-each-modal-remove">remove</div>
                      </div>)
                    })
                  })()}

                </div>
              </Modal>
              <div className="line"></div>
              <div className="profile-detail" onClick={handlefollowingModal}>
                <div className="profile-detail-each-profile">following</div>
                <div className="number-profile">
                  {loggedInUser?.followings.length}
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
                      return <div className="follower-each-modal">
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
                        <div className="follower-each-modal-remove">unfollow</div>
                      </div>
                    })
                  })()}
                </div>
              </Modal>
            </div>
            <div className="profile-bio">Bio:</div>
            <div className="profile-bio-detail">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              rem sed vero.
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
          return loggedInUser?.savedPost.map((post, index) => {
            return (
              <Link
                to={{
                  pathname: "/postDetails",
                  state: { post, user: globalUser },
                }}
              >
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
              </Link>
            );
          });
        })()}
      </div>
      <div
        className={`main-profile-container ${saved && "profile-display-none"}`}
      >
        {(() => {
          return loggedInUser?.post.map((post, index) => {
            return (
              <Link
                to={{
                  pathname: "/postDetails",
                  state: { post, user: globalUser },
                }}
              >
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
              </Link>
            );
          });
        })()}
      </div>
    </div>
  );
}

export default Profile;
