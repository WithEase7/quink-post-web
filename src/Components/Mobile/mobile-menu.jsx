import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../../Styles/Mobile/mobile-menu.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppsIcon from "@material-ui/icons/Apps";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import blurimage from "../../Assets/blurred.png";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import axios from "axios";
import { useHistory } from "react-router-dom";
import BACKEND from "../Constants/Backend";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGE_PREFERENCE, USER_LOGGED_IN } from "../Reducer/Action";

function Mobilemenu() {
  const checkLoggedIn = useSelector((state) => state.user);
  const defaultUrl =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  const history = useHistory();
  const [isuserLoggedIn, setisuserLoggedIn] = useState(false);

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
    localStorage.setItem("QuinkPostUserLoggedIn", false);
    dispatch({ type: USER_LOGGED_IN, payload: null });
    history.push("/login");

    // history.push("/");
  };

  return (
    <div>
      <Navbar />

      {(() => {
        if (checkLoggedIn != null) {
          return (
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
                    <div className="profile-displayname">
                      {globalUser?.firstName}
                    </div>
                    <div className="profile-username">
                      {globalUser?.userName}
                    </div>
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
                    <div className="number">
                      {globalUser?.followers?.length}
                    </div>
                  </div>
                  <div className="line"></div>
                  <div className="profile-detail">
                    <div className="profile-detail-each">following</div>
                    <div className="number">
                      {globalUser?.followings?.length}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        } else {
          return (
            <div
              // style={{ position: "relative", width: "80%" }}
              className={`profile-card`}
            >
              <img
                src={blurimage}
                style={{ width: "100%", height: "100px", borderRadius: 10 }}
              />
              <Link to="/login" className="loginpost" style={{ top: "160px" }}>
                <button
                  className="addpost-button"
                  style={{ paddingBottom: "5px", paddingTop: "5px" }}
                >
                  <ExitToAppIcon
                    fontSize="small"
                    style={{ marginRight: "11px" }}
                  />
                  Sign In
                </button>
              </Link>
              <Link to="/login" className="loginpost" style={{ top: "200px" }}>
                <button
                  className="addpost-button"
                  style={{ paddingBottom: "5px", paddingTop: "5px" }}
                >
                  <PersonAddIcon
                    fontSize="small"
                    style={{ marginRight: "11px" }}
                  />
                  Sign Up
                </button>
              </Link>
            </div>
          );
        }
      })()}

      <div className={`sidemenu-container `}>
        <div className="sidemenu-btn" onClick={logoutHandler}>
          <ExitToAppIcon className="menu-icon-each" />
          {checkLoggedIn != null ? "Logout" : "Login"}
        </div>
        <div className="sidemenu-btn">
          <a
            href="https://play.google.com/store/apps/details?id=com.quinkpost.quinkpost"
            className="account-setting"
          >
            <AppsIcon className="menu-icon-each" />
            Download the App
          </a>
        </div>
        <a
          href="/about"
          style={{ textDecoration: "none", color: "inherit" }}
          className="sidemenu-btn"
        >
          <SettingsIcon className="menu-icon-each" />
          About Us
        </a>
        <a
          href="https://www.instagram.com/quink_post/"
          style={{ textDecoration: "none", color: "inherit" }}
          className="sidemenu-btn"
        >
          <InstagramIcon className="menu-icon-each" />
          Instagram
        </a>
        <a
          href="https://www.facebook.com/quinkpost.post/"
          style={{ textDecoration: "none", color: "inherit" }}
          className="sidemenu-btn"
        >
          <FacebookIcon className="menu-icon-each" />
          Facebook
        </a>
        <a
          href="https://www.linkedin.com/company/quinkpost"
          style={{ textDecoration: "none", color: "inherit" }}
          className="sidemenu-btn"
        >
          <LinkedInIcon className="menu-icon-each" />
          LinkedIn
        </a>
        {/* <div className="menu-cross">
          <CancelIcon onClick={closeMenu} />
        </div> */}
      </div>
    </div>
  );
}

export default Mobilemenu;
