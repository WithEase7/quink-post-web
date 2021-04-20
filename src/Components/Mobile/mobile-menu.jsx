import React, {useState, useEffect} from "react";
import Navbar from "../navbar";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import profileimage from "../../Assets/portrait.jpg";
import "../../Styles/Mobile/mobile-menu.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppsIcon from "@material-ui/icons/Apps";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CallIcon from "@material-ui/icons/Call";
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";
import axios from 'axios';
import CancelIcon from "@material-ui/icons/Cancel";
import { useHistory } from "react-router-dom";
import BACKEND from "../Constants/Backend";

function Mobilemenu() {
  const history = useHistory();
  const [showLink, setshowLink] = useState("https://www.google.com");

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${BACKEND}/app/link`);
        setshowLink(data?.data?.downloadlink);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const logoutHandler = () => {
    localStorage.setItem("Quink-Post", " ");
    history.push("/");
  };

  return (
    <div>
      <Navbar />
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <div className={`profile-card`}>
          <div className="profile-info">
            <div className="profile-img">
              <Avatar src={profileimage} className="profile-avatar" />
            </div>
            <div className="profile-names">
              <div className="profile-displayname">Display Name</div>
              <div className="profile-username">@user-name</div>
            </div>
          </div>
          <div className="profilesecondary">
            <div className="profile-detail">
              <div className="profile-detail-each">Quinks</div>
              <div className="number">24</div>
            </div>
            <div className="line"></div>
            <div className="profile-detail">
              <div className="profile-detail-each">followers</div>
              <div className="number">134</div>
            </div>
            <div className="line"></div>
            <div className="profile-detail">
              <div className="profile-detail-each">following</div>
              <div className="number">64</div>
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
          <a href={`${showLink}`} className="account-setting">
            <AppsIcon className="menu-icon-each" />
            Download the App
          </a>
        </div>
        <div className="sidemenu-btn">
          <LibraryBooksIcon className="menu-icon-each" />
          Terms of Use
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
