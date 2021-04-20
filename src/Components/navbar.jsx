import React, { useState } from "react";
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
import { Badge } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Modal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DevicesIcon from "@material-ui/icons/Devices";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import AssistantIcon from "@material-ui/icons/Assistant";
// import { useSelector ,useDispatch} from "react-redux";
// import Action from "./Reducer/Action"

function Navbar() {
  
 
  const [notiModal, setnotiModal] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
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
  return (
    <div className="navbarcontainer">
      <div className="brand">
        <div>QuinkPost.</div>
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
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
            <div className="noti-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            </div>
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
