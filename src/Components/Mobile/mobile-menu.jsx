import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../../Styles/Mobile/mobile-menu.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppsIcon from "@material-ui/icons/Apps";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CallIcon from "@material-ui/icons/Call";
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";
import axios from "axios";
import { useHistory } from "react-router-dom";
import BACKEND from "../Constants/Backend";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGE_PREFERENCE } from "../Reducer/Action";

function Mobilemenu() {
  const defaultUrl =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  const history = useHistory();
  const dispatch = useDispatch();
  const [showLink, setshowLink] = useState("https://www.google.com");
  const [contentType, setcontentType] = useState("Langauge");
  const globalUser = useSelector((state) => state.user);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${BACKEND}/app/link`);
        // setshowLink(data?.data?.downloadlink);
        const temp = data?.data;
        // console.log(temp[0]?.appLink)
        setshowLink(temp[0]?.appLink);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const LanguagePriority = () => {
    if (contentType == "Hindi") {
      setcontentType("English");
      dispatch({ type: LANGUAGE_PREFERENCE, payload: contentType });
    } else {
      setcontentType("Hindi");
      dispatch({ type: LANGUAGE_PREFERENCE, payload: contentType });
    }
  };


  const logoutHandler = () => {
    localStorage.setItem("Quink-Post", " ");
    localStorage.setItem("QuinkPostUserLoggedIn", false)
    history.push("/");
    // history.push("/");
  };

  return (
    <div>
      <Navbar />
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <div className={`profile-card`}>
          <div className="profile-info">
            <div className="profile-img">
              <Avatar
                src={globalUser?.avatar ? globalUser?.avatar : defaultUrl}
                className="profile-avatar"
              />
            </div>
            <div className="profile-names">
              <div className="profile-displayname">{globalUser?.firstName}</div>
              <div className="profile-username">{globalUser?.userName}</div>
            </div>
          </div>
          <div className="profilesecondary">
            <div className="profile-detail">
              <div className="profile-detail-each">Quinks</div>
              <div className="number">{globalUser?.post?.length}</div>
            </div>
            <div className="line"></div>
            <div className="profile-detail">
              <div className="profile-detail-each">followers</div>
              <div className="number">{globalUser?.followers?.length}</div>
            </div>
            <div className="line"></div>
            <div className="profile-detail">
              <div className="profile-detail-each">following</div>
              <div className="number">{globalUser?.followings?.length}</div>
            </div>
          </div>
        </div>
      </Link>
      <div className={`sidemenu-container `}>
        <div className="sidemenu-btn" onClick={logoutHandler}>
          <ExitToAppIcon className="menu-icon-each" />
          Logout
        </div>
        <div className="sidemenu-btn">
          <a href='https://play.google.com/store/apps/details?id=com.quinkpost.quinkpost' className="account-setting">
            <AppsIcon className="menu-icon-each" />
            Download the App
          </a>
        </div>
        <div className="sidemenu-btn" onClick={LanguagePriority}>
          <LibraryBooksIcon className="menu-icon-each" />
          {`${contentType}`} Content
        </div>
        <div className="sidemenu-btn">
          <CallIcon className="menu-icon-each" />
          Contact us
        </div>
        <div className="sidemenu-btn">
          <HelpIcon className="menu-icon-each" />
          Help and Support
        </div>
        <div className="sidemenu-btn">
          <SettingsIcon className="menu-icon-each" />
          Account Settings
        </div>
        {/* <div className="menu-cross">
          <CancelIcon onClick={closeMenu} />
        </div> */}
      </div>
    </div>
  );
}

export default Mobilemenu;
