import React, { useEffect, useState } from "react";
import "../Styles/primaryfeed.css";
import searchicon from "../Assets/search.png";
import chat from "../Assets/chat.png";
import noti from "../Assets/noti.png";
import Post from "./post";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import { Avatar } from "@material-ui/core";
import profileimage from "../Assets/profile.jpg";
import AddIcon from "@material-ui/icons/Add";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DevicesIcon from "@material-ui/icons/Devices";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import AssistantIcon from "@material-ui/icons/Assistant";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "../Styles/notification.css";
import CancelIcon from "@material-ui/icons/Cancel";
import "../Styles/sidemenu.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppsIcon from "@material-ui/icons/Apps";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CallIcon from "@material-ui/icons/Call";
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link, NavLink, BrowserRouter, Route } from "react-router-dom";
import Searchtab from "./searchtab";
import cross from "../Assets/cross.png";
import { useDispatch, useSelector } from "react-redux";
import BACKEND from "./Constants/Backend";
import ACTION from "./Reducer/Action";
import axios from "axios";
import SearchPost from "./Searchpost";
import { useHistory } from "react-router-dom";

function Primaryfeed() {
  const layerUser = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(layerUser, "this is layer user in primary feed");
  // console.log(layerUser,"this is redux");

  const [Feed, setFeed] = useState([]);
  const [noti, setNoti] = useState(false);
  const [notiItem, setNotiItem] = useState([
    { noti: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam" },
  ]);

  const [sidebar, setSidebar] = useState(true);
  const [menubtn, setMenubtn] = useState(false);
  const [search, setSearch] = useState(true);
  const [searchField, setsearchField] = useState("");
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

  // useEffect(async () => {
  //   // console.log("caled",searchField)
  //   try {
  //     if (searchField == "") {
  //       console.log("show all")
  //       const resp = await axios.get(`/post/all`);
  //       setFeed(resp.data)
  //       // dispatch({ type: ACTION.SEARCH_POST, payload: resp.data.posts })
  //     }
  //     else {
  //       console.log("show search")
  //       const resp = await axios.get(`${BACKEND}/search/post/${searchField}`)
  //       // dispatch({ type: ACTION.SEARCH_POST, payload: resp.data })
  //       setFeed(resp.data)
  //     }
  //   } catch (e) { console.log(e) }

  // }, [showSearch]);

  // const onSearchChange = (event) => {
  //   setsearchField(event.target.value)
  //   refreshFunction(event.target.value)
  // }

  const openNoti = () => {
    setNoti(true);
    setSidebar(false);
    setMenubtn(false);
  };

  let notiList = notiItem.map((noti, index) => {
    return <div className="noti-item">{noti.noti}</div>;
  });
  const closeNoti = () => {
    setNoti(false);
    setSidebar(true);
    setMenubtn(false);
  };
  const openMenu = () => {
    setNoti(false);
    setSidebar(false);
    setMenubtn(true);
  };
  const closeMenu = () => {
    setNoti(false);
    setSidebar(true);
    setMenubtn(false);
  };

  const submitSearch = async (e) => {
    // e.preventDefault()
    // console.log("ok time submit it")
    // setshowSearch(!showSearch)
    // console.log(showSearch)
    // if (searchField.trim() == "") {
    //   console.log("ALL")
    //   setshowSearch(false)
    //   // settogglePost("SEARCHED")
    // }
    // else {
    //   console.log("SEARCHED")
    //   setshowSearch(true)
    //   // settogglePost("ALL")
    // }
    // try {
    //   // const posts = await axios.get(`${BACKEND}/search/post/${searchField}`)
    //   return <SearchPost />
    //   // dispatch({type:ACTION.SEARCH_POST,payload:posts.data})
    // } catch (E) { console.log(E) }
  };
  const logOut = () => {
    localStorage.setItem("Quink-Post", " ");
    history.push("/");
  };
  const handleSearch = () => {
    setSearch(false);
  };
  const handleSearch1 = () => {
    setSearch(true);
  };
  return (
    <div className="primaryfeed-container">
      <div className="upper">
        <div className="searchbox">
          <div className="searchbox-div1" onClick={handleSearch}>
            <div>
              <img src={searchicon} alt="" className="search-icon" />
            </div>
            <form onSubmit={submitSearch}>
              <div>
                <input
                  type="text"
                  placeholder="search here.."
                  className="search-input"
                  value={searchField}
                  onChange={(event) => setsearchField(event.target.value)}
                />
              </div>
            </form>
          </div>
          <div
            className={`search-cross-icon ${search && "search-cross-display"}`}
            onClick={handleSearch1}
          >
            <img src={cross} alt="" className="search-icon" />
          </div>
        </div>
        <div className="upper-icons">
          <div className="icon">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon
                className="icons"
                style={{ fontSize: 36 }}
                onClick={openNoti}
              />
            </Badge>
          </div>
          <div className="icon">
            <Link to="/messaging">
              <Badge badgeContent={4} color="error">
                <ChatIcon className="icons" style={{ fontSize: 36 }} />
              </Badge>
            </Link>
          </div>
          <Link to="/addpost" className="addpost ">
            <div>
              <button className="addpost-button">
                <AddIcon />
                Add post
              </button>
            </div>
          </Link>
          <div className="menu">
            <MoreVertIcon onClick={openMenu} />
          </div>
        </div>
      </div>
      <div className="secondary-container">
        <BrowserRouter>
          <div className={`feed ${!search && "display-feed"}`}>
            <Post />
          </div>
          <div className={`feed ${search && "display-searchtab"}`}>
            <Searchtab
              className={`searchtab-component ${search && "display-searchtab"}`}
            />
          </div>
        </BrowserRouter>
        <div className="sidebar">
          <div
            className={`sidemenu-container ${!menubtn && "sidemenu-hidden"}`}
          >
            <div className="sidemenu-btn" onClick={logOut}>
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
            <div className={"sidemenu-btn"}>
              <SettingsIcon className="menu-icon-each" />
              Account Settings
            </div>
            <div className="menu-cross">
              <CancelIcon onClick={closeMenu} />
            </div>
          </div>
          <div className={`noti-Container ${!noti && "noti-hidden"}`}>
            <div className="noti-header">
              <div>Notifications.</div>{" "}
              <div>
                <CancelIcon className="noti-cancel" onClick={closeNoti} />
              </div>
            </div>
            {notiList}
          </div>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div
              className={`profile-card ${!sidebar && "profile-card-hidden"}`}
            >
              <div className="profile-info">
                <div className="profile-img">
                  <Avatar src={profileimage} className="profile-avatar" />
                </div>
                <div className="profile-names">
                  <div className="profile-displayname">
                    {(() => {
                      if (layerUser) {
                        return layerUser.user.userName;
                      }
                    })()}
                  </div>
                  <div className="profile-username">
                    {(() => {
                      if (layerUser) {
                        return layerUser.user.firstName;
                      }
                    })()}
                  </div>
                </div>
              </div>
              <div className="profilesecondary">
                <div className="profile-detail">
                  <div className="profile-detail-each">Quinks</div>
                  <div className="number">
                    {(() => {
                      if (layerUser) {
                        return layerUser.user.post.length;
                      }
                    })()}
                  </div>
                </div>
                <div className="line"></div>
                <div className="profile-detail">
                  <div className="profile-detail-each">followers</div>
                  <div className="number">
                    {(() => {
                      if (layerUser) {
                        return layerUser.user.followers.length;
                      }
                    })()}
                  </div>
                </div>
                <div className="line"></div>
                <div className="profile-detail">
                  <div className="profile-detail-each">following</div>
                  <div className="number">
                    {(() => {
                      if (layerUser) {
                        return layerUser.user.followings.length;
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className={`trend ${!sidebar && "profile-card-hidden"}`}>
            <div className="trend-1">
              <TrendingUpIcon className="trend-icons" />
              trending
            </div>
            <div className="trend-1">
              <DevicesIcon className="trend-icons" />
              technology
            </div>
            <div className="trend-1">
              <LocalActivityIcon className="trend-icons" />
              fashion
            </div>
            <div className="trend-1">
              <NextWeekIcon className="trend-icons" />
              buisness
            </div>
            <div className="trend-1">
              <AssistantIcon className="trend-icons" />
              entertainment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Primaryfeed;
