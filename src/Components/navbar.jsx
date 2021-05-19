import React, { useState, useEffect } from "react";
import "../Styles/navbar.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import PeopleOutlineRoundedIcon from "@material-ui/icons/PeopleOutlineRounded";
import BarChartRoundedIcon from "@material-ui/icons/BarChartRounded";
import ImportContactsRoundedIcon from "@material-ui/icons/ImportContactsRounded";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, Badge } from "@material-ui/core";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Cancel";
import Modal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DevicesIcon from "@material-ui/icons/Devices";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import AssistantIcon from "@material-ui/icons/Assistant";
import BACKEND from "./Constants/Backend";
import { useSelector } from "react-redux";
import ACTION, {
  LikedYourPost,
  NEW_POST_NOTI,
  SEARCH_POST,
  SHOW_SEARCH,
  STARTED_FOLLOWING_NOTI,
} from "./Reducer/Action";

function Navbar() {
  const layerUser = useSelector((state) => state);
  const [notiModal, setnotiModal] = useState(false);
  const [notiItem, setNotiItem] = useState([]);
  const [menuModal, setMenuModal] = useState(false);

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
    const timeStamp = new Date(noti.timeStamp)
    const months = ["Dec", "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov"];

    const getDate = {
      month: months[timeStamp.getMonth() + 1],
      date: timeStamp.getDate(),
      hour: timeStamp.getHours(),
      minute: timeStamp.getMinutes()
    }
    console.log(timeStamp, "_____", noti?.timeStamp)
    if (noti.Type === STARTED_FOLLOWING_NOTI) {
      return (
        <div className="noti-item">
          <Avatar className="chat-header-avatar" style={{ marginRight: "7px" }} />
          <div>
            <Link
              to={`/profileOther/${noti?.followingId?.following}`}
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
          <div>{getDate.hour}:{getDate.minute}  {getDate.date} {getDate.month}</div>

          </div>
      
        </div>
      );
    }
    if (noti.Type === NEW_POST_NOTI) {
      return (
        <div className="noti-item">
          <Avatar className="chat-header-avatar" src={noti?.newPostIdByFollowing?.image} style={{ marginRight: "7px" }} />
          <div>
            <Link
              to={`/profileOther/${noti?.newPostIdByFollowing?.author?._id}`}
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
              to={`/${noti?.newPostIdByFollowing?.title}/${noti?.newPostIdByFollowing?.author?.userName}/${noti?.newPostIdByFollowing?._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginLeft: "3px",
              }}
            >
              Open Quink
            </Link>
            <div>{getDate.hour}:{getDate.minute}  {getDate.date} {getDate.month}</div>

          </div>
        </div>
      );
    }
    if (noti.Type === LikedYourPost) {
      return (
        <div className="noti-item">
          <Avatar className="chat-header-avatar" src={noti?.LikedBy?.LikedByUser?.avatar} style={{ marginRight: "7px" }} />
          <div>
            <Link
              to={`/profileOther/${noti?.LikedBy?.LikedByUser?._id}`}
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
              to={`${noti?.LikedBy?.postId?.title}/${noti?.LikedBy?.LikedByUser?.userName}/${noti?.LikedBy?.postId?._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginLeft: "3px",
              }}
            >
              {noti?.LikedBy?.postId?.title}
            </Link>
            <div>{getDate.hour}:{getDate.minute}  {getDate.date} {getDate.month}</div>

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
          <Badge badgeContent={3} color="error">
            <NotificationsIcon
              className="mobile-chat-icon-box-icons"
              onClick={handleNotimodal}
            />
          </Badge>
          <Badge badgeContent={2} color="error">
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
            <Link to="/addpost" className="addpost ">
              <div>
                <button className="addpost-button addpost-mobile">
                  <AddIcon />
                  Add post
                </button>
              </div>
            </Link>
            <div className="trend-1 trend-mobile">
              <TrendingUpIcon className="trend-icons" />
              trending
            </div>
            <div className="trend-1 trend-mobile">
              <DevicesIcon className="trend-icons" />
              technology
            </div>
            <div className="trend-1 trend-mobile">
              <LocalActivityIcon className="trend-icons" />
              fashion
            </div>
            <div className="trend-1 trend-mobile">
              <NextWeekIcon className="trend-icons" />
              buisness
            </div>
            <div className="trend-1 trend-mobile">
              <AssistantIcon className="trend-icons" />
              entertainment
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
          to="/homeScreen"
          className="navbar-btn"
          activeClassName="navbar-btn-active"
        >
          <div className="navbar-btn-div">
            <HomeRoundedIcon className="navbar-btn-icon" />
            <span className="abcd">Home</span>
          </div>
        </NavLink>
        <NavLink
          to="/community"
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
