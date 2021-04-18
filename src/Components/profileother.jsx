import React, { useEffect, useState } from "react";
import "../Styles/profile.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import IconButton from "@material-ui/core/IconButton";
// import profileimage from "../Assets/colour.jpg";
import { Link } from "react-router-dom";
// import CreateIcon from "@material-ui/icons/Create";
// import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
// import AllInboxIcon from "@material-ui/icons/AllInbox";
import "../Styles/profileother.css";
import Modal from "react-modal";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import BACKEND from "./Constants/Backend";

import { useSelector, useDispatch } from "react-redux";
import { USER_LOGGED_IN } from "./Reducer/Action";
function ProfileOther(props) {
  const dispatch = useDispatch();

  // const [followValue, setfollowValue] = useState(false)
  const [state, setstate] = useState([]);
  const [User, setUser] = useState({})
  // const globalState = useSelector(state => state)
  // console.log(props.match.params.OtherProfileId, "///*")
  const { OtherProfileId } = props.match.params
  console.log(props.location);
  // const User = props.location.state.author;
  const globalState = useSelector(state => state)
  console.log(globalState, "<<<<<<<<<<")
  // console.log(globalState, "this is global state>>>>>>>>>>");
  console.log(User);
  const [follow, setFollow] = useState(false);
  const [followermodalIsOpen, followersetIsOpen] = useState(false);
  const [followingmodalIsOpen, followingsetIsOpen] = useState(false);
  const [toggleFollow, settoggleFollow] = useState(false);
  const [followValue, setfollowValue] = useState("Follow");


  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${BACKEND}/user/${OtherProfileId}`)
      setUser(data.user)
      console.log(data.user, "TTTTTTTT")
    })()

  }, [])

  useEffect(() => {

    (async () => {
      try {

        const result = await axios.get(`${BACKEND}/post/ofUser/${User?._id}`);
        console.log("comparing>>>>>");
        setstate(result.data.posts);
        // console.log(globalState.user.followings,">>>>>>>>>",User?._id)
      } catch (e) {
        console.log(e);
      }
    })();
  }, [toggleFollow]);
  useEffect(async () => {
    // console.log(
    //   globalState.user.followings,
    //   "<<<<thisis  followings of logged in user"
    // );
    if (globalState) {
      const checkFollowing = await globalState.user.followings.find(
        (id) => id._id == User?._id
      );
      console.log(checkFollowing);
      if (checkFollowing) {
        console.log("currently you following him");
        setfollowValue("Unfollow");
      } else {
        console.log("you are not following him yet");
      }
    }
  }, []);

  const followThisUser = async () => {
    console.log("calling this function");
    try {
      if (globalState) {
        if (followValue == "Follow") {
          console.log("going to follow");
          const result = await axios.post(`${BACKEND}/follow`, {
            followerId: globalState.user._id,
            followingToId: User._id,
          });
          // console.log(result.data)
          setfollowValue("Unfollow");
          console.log(result.data.user, "this is user from backend");
          dispatch({ type: USER_LOGGED_IN, payload: result.data.user });
          console.log(
            globalState.user.followings,
            "<<<<thisis  followings of logged in user"
          );
          settoggleFollow(!toggleFollow);
        } else {
          console.log("going to unfollow");
          const result = await axios.post(`${BACKEND}/follow/unfollow`, {
            followerId: globalState.user._id,
            followingToId: User._id,
          });
          // console.log(result.data)
          if (result.data.success) {
            // console.log(result.data)
            setfollowValue("Follow");
            dispatch({ type: USER_LOGGED_IN, payload: result.data.user });
            settoggleFollow(!toggleFollow);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };


  const handleClick2 = () => {
    setFollow(false);
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
        <div className="profile-container-upper-homeicon">
          <Link to="/homeScreen">
            <IconButton className="iconbutton-profile">
              <HomeRoundedIcon />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="profile-other-container-infobox">
        <div className="profile-other-profile-image">
          <div
            className="profile-profile-image-img"
            style={{ backgroundImage: `url(${User?.avatar})` }}
          ></div>
        </div>
        <div className="profile-profile-info">
          <div className="profile-profile-names">
            <div>
              <div className="profile-profile-displayname">
                {User?.userName}
              </div>
              <div className="profile-profile-username">{User?.firstName}</div>
            </div>
          </div>
          <div>
            <div className="profilesecondary">
              <div className="profile-detail">
                <div className="profile-detail-each">Quinks</div>
                <div className="number">{User?.post?.length}</div>
              </div>
              <div className="line"></div>
              <div className="profile-detail" onClick={handlefollowerModal}>
                <div className="profile-detail-each">followers</div>
                <div className="number">{User?.followers?.length}</div>
              </div>
              <Modal isOpen={followermodalIsOpen} className="followers-modal">
                <div className="follower-modal-header">
                  <div className="follower-modal-header-head">Followers</div>
                  <div onClick={handlefollowerModal1}>
                    <CancelOutlinedIcon style={{ fontSize: "20px" }} />
                  </div>
                </div>
                <div className="follower-each-modal-container">
                  <div className="follower-each-modal">
                    <div className="follower-each-modal-avatar">
                      <Avatar />
                    </div>
                    <div className="follower-each-modal-info">
                      <div className="follower-each-modal-info-displayname">
                        Display name
                      </div>
                      <div className="follower-each-modal-info-username">
                        @username
                      </div>
                    </div>
                    <div className="follower-each-modal-remove">remove</div>
                  </div>
                </div>
              </Modal>
              <div className="line"></div>
              <div className="profile-detail" onClick={handlefollowingModal}>
                <div className="profile-detail-each">following</div>
                <div className="number">{User?.followings?.length}</div>
              </div>
              <Modal isOpen={followingmodalIsOpen} className="followers-modal">
                <div className="follower-modal-header">
                  <div className="follower-modal-header-head">Following</div>
                  <div onClick={handlefollowingModal1}>
                    <CancelOutlinedIcon style={{ fontSize: "20px" }} />
                  </div>
                </div>
                <div className="follower-each-modal-container">
                  <div className="follower-each-modal">
                    <div className="follower-each-modal-avatar">
                      <Avatar />
                    </div>
                    <div className="follower-each-modal-info">
                      <div className="follower-each-modal-info-displayname">
                        Display name
                      </div>
                      <div className="follower-each-modal-info-username">
                        @username
                      </div>
                    </div>
                    <div className="follower-each-modal-remove">unfollow</div>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="profileother-followbutton">
              <div
                className={`profileother-followbutton-each ${follow && "display-follow"
                  }`}
                onClick={followThisUser}
              >
                {followValue}
              </div>
              <div
                className={`profileother-followbutton-each-following ${!follow && "display-follow"
                  }`}
                onClick={handleClick2}
              >
                Following
              </div>
              <div className="profileother-followbutton-each">Message</div>
            </div>
            <div className="profile-bio">Bio:</div>
            <div className="profile-bio-detail">{User?.bio}</div>
          </div>
        </div>
      </div>
      <div className={`main-profile-container`}>
        {(() => {
          return User.post?.map((post, key) => {
            console.log(post);
            return (
              <Link to={{ pathname: "/postDetails", state: { post } }}>
                {" "}
                <div className="individual-post-profile" key={key}>
                  <img
                    // src={profileimage}
                    src={post?.image}
                    alt="No picture"
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

export default ProfileOther;
