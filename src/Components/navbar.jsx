import React, { useState, useEffect } from "react";
import "../Styles/navbar.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import PeopleOutlineRoundedIcon from "@material-ui/icons/PeopleOutlineRounded";
import BarChartRoundedIcon from "@material-ui/icons/BarChartRounded";
import ImportContactsRoundedIcon from "@material-ui/icons/ImportContactsRounded";
import { Link, NavLink } from "react-router-dom";
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TranslateIcon from "@material-ui/icons/Translate";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, Badge } from "@material-ui/core";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Cancel";
import Modal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import BACKEND from "./Constants/Backend";
import { useDispatch, useSelector } from "react-redux";
import ACTION, {
  LANGUAGE_PREFERENCE,
  LikedYourPost,
  NEW_POST_NOTI,
  SEARCH_POST,
  SHOW_SEARCH,
  STARTED_FOLLOWING_NOTI,
} from "./Reducer/Action";

function Navbar() {
  const layerUser = useSelector((state) => state);
  const [notiModal, setnotiModal] = useState(false);
  const [contentType, setcontentType] = useState("All");
  const [notiItem, setNotiItem] = useState([]);
  const [menuModal, setMenuModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const IS_USER_LOGGED_IN = layerUser.user
  // const isuserLoggedIn = useSelector(state => state.isuserLoggedIn)
  const [isuserLoggedIn, setisuserLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const checkLogin = useSelector((state) => state.user);
  console.log(IS_USER_LOGGED_IN, "<<<<<<this is is_User_logged_in")
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setcontentType(value);
    console.log(value);
    dispatch({ type: LANGUAGE_PREFERENCE, payload: contentType });
    setAnchorEl(null);
  };

  useEffect(() => {
    (async () => {
      const checkloggedIn = await localStorage.getItem("QuinkPostUserLoggedIn");
      setisuserLoggedIn(checkloggedIn);
      console.log("this is isuserlogged in >>>>>>", isuserLoggedIn);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const getNoti = await axios.get(
        `${BACKEND}/notification/all/${layerUser?.user?._id}`
      );
      const notifications = getNoti.data.NotiFilter;
      console.log(notifications, "%%%");
      setNotiItem(notifications);
    })();
  }, []);

  const handleNotimodal = () => {
    setnotiModal(true);
  };
  const handleNotimodal1 = () => {
    setnotiModal(false);
  };
  const handleMenuModal = () => {
    setMenuModal(true);
  };
  const handleMenuModal1 = () => {
    setMenuModal(false);
  };

  let notiList = notiItem?.reverse()?.map((noti, index) => {
    // console.log(noti?.followingId);
    const timeStamp = new Date(noti.timeStamp);
    const months = [
      "Dec",
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
    ];

    const getDate = {
      month: months[timeStamp.getMonth() + 1],
      date: timeStamp.getDate(),
      hour: timeStamp.getHours(),
      minute: timeStamp.getMinutes(),
    };
    console.log(timeStamp, "_____", noti?.timeStamp);
    if (noti.Type === STARTED_FOLLOWING_NOTI) {
      return (
        <div className="noti-item">
          <Avatar
            className="chat-header-avatar"
            style={{ marginRight: "7px" }}
          />
          <div>
            <Link
              to={`/${noti?.followingId?.followingName}/${noti?.followingId?.following._id}`}
              // to={`/user/${noti?.followingId?.followingName}/${noti?.followingId?.following._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginRight: "3px",
              }}
            >
              {noti?.followingId?.followingName}
            </Link>
            started following you
            <div>
              {getDate.hour}:{getDate.minute} {getDate.date} {getDate.month}
            </div>
          </div>
        </div>
      );
    }
    if (noti.Type === NEW_POST_NOTI) {
      return (
        <div className="noti-item">
          <Avatar
            className="chat-header-avatar"
            src={noti?.newPostIdByFollowing?.image}
            style={{ marginRight: "7px" }}
          />
          <div>
            <Link
              to={`/${noti?.newPostIdByFollowing?.author?.userName}/${noti?.newPostIdByFollowing?.author?._id}`}
              // to={`/user/${noti?.newPostIdByFollowing?.author?.userName}/${noti?.newPostIdByFollowing?.author?._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginRight: "3px",
              }}
            >
              {noti?.newPostIdByFollowing?.author?.userName}
            </Link>
            uploaded new Quink
            <Link
              to={`/${noti?.newPostIdByFollowing?.author?.userName}/${noti?.newPostIdByFollowing?.title}/${noti?.newPostIdByFollowing?._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginLeft: "3px",
              }}
            >
              Open Quink
            </Link>
            <div>
              {getDate.hour}:{getDate.minute} {getDate.date} {getDate.month}
            </div>
          </div>
        </div>
      );
    }
    if (noti.Type === LikedYourPost) {
      return (
        <div className="noti-item">
          <Avatar
            className="chat-header-avatar"
            src={noti?.LikedBy?.LikedByUser?.avatar}
            style={{ marginRight: "7px" }}
          />
          <div>
            <Link
              // to={`/user/${noti?.LikedBy?.LikedByUser?.userName}/${noti?.LikedBy?.LikedByUser?._id}`}
              to={`/${noti?.LikedBy?.LikedByUser?.userName}/${noti?.LikedBy?.LikedByUser?._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginRight: "3px",
              }}
            >
              {noti?.LikedBy?.LikedByUser?.userName}
            </Link>
            liked your Quink
            <Link
              to={`/${noti?.LikedBy?.LikedByUser?.userName}/${noti?.LikedBy?.postId?.title}/${noti?.LikedBy?.postId?._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginLeft: "3px",
              }}
            >
              {noti?.LikedBy?.postId?.title}
            </Link>
            <div>
              {getDate.hour}:{getDate.minute} {getDate.date} {getDate.month}
            </div>
          </div>
        </div>
      );
    }

    // return <div className="noti-item">{noti.noti}</div>;
  });

  return (
    <div className="navbarcontainer">
      <div className="brand">
        <div>Quink Post.</div>
        <div className="mobile-icon mobile-chat-icon-box">
          <TranslateIcon
            className="mobile-chat-icon-box-icons"
            // style={{ fontSize: 30 }}
            onClick={handleClick}
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              horizontal: "center",
            }}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: "bold",
                textAlign: "center",
                backgroundColor: "lightgrey",
                verticalAlign: "center",
                paddingBottom: "3px",
              }}
            >
              Double tap to select
            </div>
            <MenuItem onClick={() => handleClose("All")}>
              Mixed Content
            </MenuItem>
            <MenuItem onClick={() => handleClose("English")}>English</MenuItem>
            <MenuItem onClick={() => handleClose("Hindi")}>Hindi</MenuItem>
          </Menu>
          <NotificationsIcon
            className="mobile-chat-icon-box-icons"
            onClick={handleNotimodal}
          />
          <Badge badgeContent={0} color="error">
            <Link to="/messaging" className="chatpage-mobile-link">
              <ChatIcon className="mobile-chat-icon-box-icons" />
            </Link>
          </Badge>
          <MoreVertIcon
            className="mobile-chat-icon-box-icons"
            onClick={handleMenuModal}
          />
          <Modal isOpen={menuModal} className="menuModal">
            <Link to="/originals" className="original-link">
              <div className="original-btn-modal">Originals</div>
            </Link>
            {(() => {
              if (IS_USER_LOGGED_IN != null) {
                return (
                  <Link to="/addpost" className="addpost ">
                    <div>
                      <button className="addpost-button addpost-mobile">
                        <AddIcon />
                        Add Post
                      </button>
                    </div>
                  </Link>
                );
              } else {
                return (
                  <Link to="/login" className="addpost ">
                    {" "}
                    <div>
                      <button className="addpost-button addpost-mobile">
                        <AddIcon />
                        Add Post
                      </button>
                    </div>
                  </Link>
                );
              }
            })()}

            <div
              style={{
                border: "1px solid lightgrey",
                width: "90%",
                marginTop: "15px",
                padding: "0 15px",
                borderRadius: "20px",
                textAlign: "-webkit-center",
              }}
            >
              <div className="recommend-quink">Trending Quinks</div>
              <Link
                to="/Quink/auroscholar"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  textAlign: "center",
                  borderBottom: "0.5px solid grey",
                  marginBottom: "14px",
                  padding: "0 1px",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    background: "linear-gradient(45deg, white, #00000070)",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  Test your skills and get microscholarship
                </div>
              </Link>
              <Link
                to="/challenges"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  textAlign: "center",
                  borderBottom: "0.5px solid grey",
                  marginBottom: "18px",
                  padding: "0 1px",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#000",
                    background: "linear-gradient(45deg, white, #00000070)",
                  }}
                >
                  Participate in challenges and earn money
                </div>
              </Link>
              <div className="recommend-quink-mobile">Top Creators</div>
              <div className="trend-1 trend-mobile">
                <Avatar />
                <div style={{ fontWeight: "bold", paddingLeft: "22px" }}>
                  Jayesh Sharma
                </div>
              </div>
              <div className="trend-1 trend-mobile">
                <Avatar />
                <div style={{ fontWeight: "bold", paddingLeft: "22px" }}>
                  Mishika Ashwin
                </div>
              </div>
              <div className="trend-1 trend-mobile">
                <Avatar />
                <div style={{ fontWeight: "bold", paddingLeft: "22px" }}>
                  Suyogita Patel
                </div>
              </div>
            </div>

            <div className="menu-mobile-cross" onClick={handleMenuModal1}>
              <CancelIcon />
            </div>
          </Modal>
        </div>
        <Modal isOpen={notiModal} className="notimodal">
          <div className={`noti-Container`}>
            <div className="noti-header">
              <div>Notifications.</div>
              <div>
                <CancelIcon
                  className="noti-cancel"
                  onClick={handleNotimodal1}
                />
              </div>
            </div>
            <div>{notiList}</div>
            {/* <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div> */}
          </div>
        </Modal>
      </div>
      <Link to="/originals" className="original-link">
        <div className="original-btn">Originals</div>
      </Link>
      <div className="mobile-navbtn-holder">
        <NavLink
          exact={true}
          to="/"
          className="navbar-btn"
          activeClassName="navbar-btn-active"
        >
          <div className="navbar-btn-div">
            <HomeRoundedIcon className="navbar-btn-icon" />
            <span className="abcd">Home</span>
          </div>
        </NavLink>
        <NavLink
          to={checkLogin != null ? "/community" : "/login"}
          className="navbar-btn"
          activeClassName="navbar-btn-active"
        >
          <div className="navbar-btn-div">
            <PeopleOutlineRoundedIcon className="navbar-btn-icon" />
            <span className="abcd">Community</span>
          </div>
        </NavLink>
        <NavLink
          to="/challenges"
          className="navbar-btn"
          activeClassName="navbar-btn-active"
        >
          <div className="navbar-btn-div">
            <BarChartRoundedIcon className="navbar-btn-icon" />
            <span className="abcd">Challenges</span>
          </div>
        </NavLink>
        <NavLink
          to="/magazines"
          className="navbar-btn"
          activeClassName="navbar-btn-active"
        >
          <div className="navbar-btn-div">
            <ImportContactsRoundedIcon className="navbar-btn-icon" />
            <span className="abcd">Magazines</span>
          </div>
        </NavLink>
        <NavLink
          to="/mobile-menu"
          className="navbar-btn mobile-icon"
          activeClassName="navbar-btn-active mobile-icon"
        >
          <div className="navbar-btn-div mobile-icon">
            <MenuIcon className="navbar-btn-icon" />
            <span className="abcd"></span>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
