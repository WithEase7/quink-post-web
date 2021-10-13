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
import Quinkpost from "../Assets/Quinkpost.jpg";
import iconqp from "../Assets/iconqp.png";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGGED_IN } from "./Reducer/Action";
function ProfileOther(props) {
  const dispatch = useDispatch();

  // const [followValue, setfollowValue] = useState(false)
  const [state, setstate] = useState([]);
  const defaultUrl =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  const [User, setUser] = useState({});
  const { OtherProfileId } = props.match.params;
  const globalState = useSelector((state) => state);
  const STARTED_FOLLOWING = "STARTED_FOLLOWING";
  const [follow, setFollow] = useState(false);
  const [followermodalIsOpen, followersetIsOpen] = useState(false);
  const [followingmodalIsOpen, followingsetIsOpen] = useState(false);
  const [toggleFollow, settoggleFollow] = useState(false);
  const [followValue, setfollowValue] = useState("Follow");
  const [followers, setFollowers] = useState(null)
  const [followings, setfollowings] = useState(null)

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${BACKEND}/user/${OtherProfileId}`);
      setUser(data.user);
      console.log(data.user, "TTTTTTTT");
    })();
  }, []);
  useEffect(async () => {
    try {
      const data = await axios.get(
        `${BACKEND}/user/follwers/followings/${props.match.params.OtherProfileId}`
      );
      console.log(data?.data, "newuseeffect")
      setFollowers(data?.data?.followers)
      setfollowings(data?.data?.followings)
      // console.log("newuseeffect")
    } catch (e) { console.log(e) }

  }, [])

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BACKEND}/post/ofUser/${OtherProfileId}`);
        console.log("comparing>>>>>");
        setstate(result.data.posts);
        // console.log(globalState.user.followings,">>>>>>>>>",User?._id)
      } catch (e) {
        console.log(e);
      }
    })();
  }, [toggleFollow]);

  // console.log(followers, followings, "<<<<akshay")

  useEffect(async () => {

    try {
      if (globalState) {

        const checkFollowing = await globalState?.user?.followings?.find(
          id => id == OtherProfileId
        );
        console.log("checkfollowing ", checkFollowing)
        console.log(checkFollowing?.length);
        if (checkFollowing?.length) {
          console.log("currently you following him");
          setfollowValue("Unfollow");
        } else {
          console.log("you are not following him yet");
        }
      }
    } catch (e) { console.log(e) }
  }
    , [toggleFollow]);



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
          const notiToUser = await axios.post(
            `${BACKEND}/notification/startedFollowing/${globalState?.user?._id}/${globalState?.user?.userName}/${STARTED_FOLLOWING}/${User._id}`
          );
          console.log(notiToUser.data);
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
        <div
          className="profile-container-upper-heading"
          style={{ display: "flex" }}
        >
          <Avatar src={iconqp} style={{ marginRight: 1, alignSelf: "center" }} />
          <div style={{ alignSelf: "center" }}>
            <div className="profile-profile-displayname">
              {User?.userName}
            </div>
            <div className="profile-profile-username">
              {User?.firstName}
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
      <div className="profile-other-container-infobox">
        <div className="profile-other-profile-image">
          <div
            className="profile-profile-image-img"
            style={{
              backgroundImage: User.avatar
                ? `url(${User?.avatar})`
                : `url(${defaultUrl})`,
            }}
          ></div>
        </div>
        <div className="profile-profile-info">
          {/* <div className="profile-profile-names">
            <div>
              <div className="profile-profile-displayname">
                {User?.userName}
              </div>
              <div className="profile-profile-username">{User?.firstName}</div>
            </div>
          </div> */}
          <div>
            <div className="profilesecondary">
              <div className="profile-detail">
                <div className="profile-detail-each">Quinks</div>
                <div className="number">{User?.post?.length}</div>
              </div>
              <div className="line"></div>
              <div className="profile-detail" onClick={handlefollowerModal}>
                <div
                  className="profile-detail-each"
                  style={{ cursor: "pointer" }}
                >
                  followers
                </div>
                <div className="number">{User?.followers?.length}</div>
              </div>
              <Modal isOpen={followermodalIsOpen} className="followers-modal">
                <div className="follower-modal-header">
                  <div
                    className="follower-modal-header-head"
                    style={{ cursor: "pointer" }}
                  >
                    Followers
                  </div>
                  <div onClick={handlefollowerModal1}>
                    <CancelOutlinedIcon style={{ fontSize: "20px" }} />
                  </div>
                </div>
                <div className="follower-each-modal-container">
                  {(() => followers?.map(foll => {
                    return <div className="follower-each-modal">
                      <div className="follower-each-modal-avatar">
                        <Avatar />
                      </div>
                      <div className="follower-each-modal-info">
                        <div className="follower-each-modal-info-displayname">
                          {foll?.userName}
                        </div>
                        <div className="follower-each-modal-info-username">
                          {foll?.firstName}
                        </div>
                      </div>
                      {/* <div className="follower-each-modal-remove">unfollow</div> */}
                    </div>
                  }))()}
                </div>
              </Modal>
              <div className="line"></div>
              <div className="profile-detail" onClick={handlefollowingModal}>
                <div
                  className="profile-detail-each"
                  style={{ cursor: "pointer" }}
                >
                  following
                </div>
                <div className="number">{User?.followings?.length}</div>
              </div>
              <Modal isOpen={followingmodalIsOpen} className="followers-modal">
                <div className="follower-modal-header">
                  <div
                    className="follower-modal-header-head"
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Following
                  </div>
                  <div onClick={handlefollowingModal1}>
                    <CancelOutlinedIcon style={{ fontSize: "20px" }} />
                  </div>
                </div>
                <div className="follower-each-modal-container">
                  {followings?.map(foll => {
                    return <div className="follower-each-modal">
                      <div className="follower-each-modal-avatar">
                        <Avatar />
                      </div>
                      <div className="follower-each-modal-info">
                        <div className="follower-each-modal-info-displayname">
                          {foll?.userName}
                        </div>
                        <div className="follower-each-modal-info-username">
                          {foll?.firstName}
                        </div>
                      </div>
                      {/* <div className="follower-each-modal-remove">unfollow</div> */}
                    </div>
                  })}
                </div>
              </Modal>
            </div>
            <div className="profileother-followbutton">
              <div
                style={{ cursor: "pointer" }}
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
              <Link
                to={{
                  pathname: "/messaging",
                  state: {
                    value: true,
                    user2Id: User._id,
                    user2Name: User?.userName,
                    user2Avatar: User?.avatar,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <div className="profileother-followbutton-each">Message</div>
              </Link>
            </div>
            <div style={{ borderLeft: "inset" }}>
              <div className="profile-bio">Bio:</div>
              <div className="profile-bio-detail">{User?.bio}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`main-profile-container`}>
        {(() => {
          return User.post?.reverse()?.map((post, key) => {
            // console.log(post);
            return (
              // <a href={`/post/${post.title.replace(/ /g,"-")}/${post._id}`}>
              <a href={`/post/${User?.userName}/${post.title.replace(/ /g, "-")}/${post._id}`}>
                <div className="individual-post-profile" key={key}>
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
              // <Link to={{ pathname: "/postDetails", state: { post } }}>
              //   {" "}
              //   <div className="individual-post-profile" key={key}>
              //     <img
              //       // src={profileimage}
              //       src={post?.image}
              //       alt="No picture"
              //       className="individual-post-profile-img"
              //     />
              //     <div className="individual-post-profile-heading">
              //       {post?.caption}
              //     </div>
              //   </div>
              // </Link>
            );
          });
        })()}
      </div>
    </div>
  );
}

export default ProfileOther;
