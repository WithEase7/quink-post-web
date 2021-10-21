import React, { useEffect, useState } from "react";
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";
import "../Styles/primaryfeed.css";
import searchicon from "../Assets/search.png";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import { Avatar } from "@material-ui/core";
import blurimage from "../Assets/blurred.png";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddIcon from "@material-ui/icons/Add";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TranslateIcon from "@material-ui/icons/Translate";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DevicesIcon from "@material-ui/icons/Devices";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import AssistantIcon from "@material-ui/icons/Assistant";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "../Styles/notification.css";
import CancelIcon from "@material-ui/icons/Cancel";
import "../Styles/sidemenu.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppsIcon from "@material-ui/icons/Apps";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link, BrowserRouter } from "react-router-dom";
import Searchtab from "./searchtab";
import cross from "../Assets/cross.png";
import { useDispatch, useSelector } from "react-redux";
import BACKEND from "./Constants/Backend";
import ACTION, {
  LANGUAGE_PREFERENCE,
  LikedYourPost,
  NEW_POST_NOTI,
  SEARCH_POST,
  SELECTED_NICHE,
  SHOW_SEARCH,
  STARTED_FOLLOWING_NOTI,
  USER_LOGGED_IN,
} from "./Reducer/Action";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Primaryfeed() {
  const layerUser = useSelector((state) => state);
  const showsearchRed = layerUser?.SHOW_SEARCH;
  const history = useHistory();

  const dispatch = useDispatch();

  const [noti, setNoti] = useState(false);
  const [notiItem, setNotiItem] = useState([]);
  const [notiLength, setnotiLength] = useState(null);
  const [sidebar, setSidebar] = useState(true);
  const [contentType, setcontentType] = useState("All");
  const [menubtn, setMenubtn] = useState(false);
  const [showShade, setshowShade] = useState(null);
  // const [showSearch, setshowSearch] = useState(layerUser?.SHOW_SEARCH)
  const [search, setSearch] = useState(false);
  const [searchField, setsearchField] = useState("");
  const [showLink, setshowLink] = useState("https://www.google.com");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const IS_USER_LOGGED_IN = layerUser.user;

  // const [isuserLoggedIn, setisuserLoggedIn] = useState(null)
  console.log(layerUser, "checklogin");
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
      try {
        console.log(" In ++++++++++++++++++++++++++++++++++");

        const userToken = await localStorage.getItem("Quink-Post");
        if (userToken == "") {
          history.push("/login");
        }
        dispatch({ type: SHOW_SEARCH, payload: null });
        const data = await axios.get(`${BACKEND}/app/link`);

        const temp = data?.data;
        // console.log(temp[0]?.appLink)
        setshowLink(temp[0]?.appLink);
        // setshowLink(data?.data?.downloadlink);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const checkloggedIn = localStorage.getItem("QuinkPostUserLoggedIn");

  useEffect(() => {
    (async () => {
      const getNoti = await axios.get(
        `${BACKEND}/notification/all/${layerUser?.user?._id}`
      );
      console.log("%%%getiingig");
      const notifications = getNoti.data.NotiFilter;
      console.log(notifications, "%%%");
      const tem = layerUser.user.notification
        ? layerUser?.user?.notification
        : 0;
      const intprevnoti = parseInt(tem);
      const intCurrentNoi = parseInt(notifications.length);
      const popupValue = intCurrentNoi - intprevnoti;
      setnotiLength(popupValue);
      setshowShade(popupValue);
      console.log(popupValue, "this is popup <<<<<<");
      setNotiItem(notifications.reverse());
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

  // const LanguagePriority = () => {
  //   if (contentType == "Hindi") {
  //     setcontentType("English");
  //     dispatch({ type: LANGUAGE_PREFERENCE, payload: contentType });
  //   } else {
  //     setcontentType("Hindi");
  //     dispatch({ type: LANGUAGE_PREFERENCE, payload: contentType });
  //   }
  // };

  const openNoti = async () => {
    setNoti(true);
    setSidebar(false);
    setMenubtn(false);
    try {
      const { data } = await axios.patch(
        `${BACKEND}/user/updateNoti/${layerUser?.user?._id}/${notiItem?.length}`
      );
      if (data.success) {
        const updatedUser = data?.user;
        // console.log(data?.user, "<<<<OOO");

        dispatch({ type: USER_LOGGED_IN, payload: updatedUser });
        setnotiLength(null);
      }
    } catch (E) {
      console.log(E);
    }
  };

  let notiList = notiItem?.map((noti, index) => {
    const giveShade = index < showShade ? true : false;
    console.log(noti, "______");
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

    if (noti.Type === STARTED_FOLLOWING_NOTI) {
      return (
        <div
          className="noti-item"
          style={{ backgroundColor: giveShade ? "#E8E8E8" : "white" }}
        >
          <Avatar
            className="chat-header-avatar"
            src={noti?.following?.followingId?.avatar}
            style={{ marginRight: "7px" }}
          />
          <div>
            <Link
              // to={`/user/${noti?.following?.followingId?.userName}/${noti?.following?.followingId._id}`}
              to={`/${noti?.following?.followingId?.userName}/${noti?.following?.followingId._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginRight: "3px",
              }}
            >
              {noti?.following?.followingId?.userName}
            </Link>{" "}
            started following you
            <div style={{ fontSize: "12px", color: "gray" }}>
              {getDate.hour}:{getDate.minute} {getDate.date} {getDate.month}
            </div>
          </div>
        </div>
      );
    }
    if (noti.Type === NEW_POST_NOTI) {
      return (
        <div
          className="noti-item"
          style={{ backgroundColor: giveShade ? "#E8E8E8" : "white" }}
        >
          <Avatar
            className="chat-header-avatar"
            src={noti?.newPostIdByFollowing?.image}
            style={{ marginRight: "7px" }}
          />
          <div>
            <Link
              // to={`/user/${noti?.newPostIdByFollowing?.author?.userName}/${noti?.newPostIdByFollowing?.author?._id}`}
              to={`/${noti?.newPostIdByFollowing?.author?.userName}/${noti?.newPostIdByFollowing?.author?._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginRight: "3px",
              }}
            >
              {noti?.newPostIdByFollowing?.author?.userName}
            </Link>{" "}
            uploaded new Quink
            <Link
              to={`/${noti?.newPostIdByFollowing?.author?.userName}/${noti?.newPostIdByFollowing?.title}/${noti?.newPostIdByFollowing?._id}`}
              // to={`/user/${noti?.newPostIdByFollowing?.author?.userName}/${noti?.newPostIdByFollowing?.title}/${noti?.newPostIdByFollowing?._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginLeft: "3px",
              }}
            >
              Open Quink
            </Link>
            <div style={{ fontSize: "12px", color: "gray" }}>
              {getDate.hour}:{getDate.minute} {getDate.date} {getDate.month}
            </div>
          </div>
        </div>
      );
    }
    if (noti.Type === LikedYourPost) {
      return (
        <div
          className="noti-item"
          style={{ backgroundColor: giveShade ? "#E8E8E8" : "white" }}
        >
          <Avatar
            className="chat-header-avatar"
            src={noti?.LikedBy?.LikedByUser?.avatar}
            style={{ marginRight: "7px" }}
          />
          <div>
            <Link
              to={`/${noti?.LikedBy?.LikedByUser?.userName}/${noti?.LikedBy?.LikedByUser?._id}`}
              // to={`/user/${noti?.LikedBy?.LikedByUser?.userName}/${noti?.LikedBy?.LikedByUser?._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginRight: "3px",
              }}
            >
              {noti?.LikedBy?.LikedByUser?.userName}
            </Link>{" "}
            liked your Quink{" "}
            <Link
              to={`/${noti?.LikedBy?.LikedByUser?.userName}/${noti?.LikedBy?.postId?.title}/${noti?.LikedBy?.postId?._id}`}
              // to={`/user/${noti?.LikedBy?.LikedByUser?.userName}/${noti?.LikedBy?.postId?.title}/${noti?.LikedBy?.postId?._id}`}
              style={{
                textDecoration: "none",
                color: "rgb(56 56 56)",
                fontWeight: "bold",
                marginLeft: "3px",
              }}
            >
              {noti?.LikedBy?.postId?.title}
            </Link>
            <div style={{ fontSize: "12px", color: "gray" }}>
              {getDate.hour}:{getDate.minute} {getDate.date} {getDate.month}
            </div>
          </div>
        </div>
      );
    }

    // return <div className="noti-item">{noti.noti}</div>;
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
  // console.log(showSearch, "<<<<thsi is search");
  const handleSelectedNiche = (value) => {
    // console.log(value,"niche")
    // alert(value)
    dispatch({ type: SELECTED_NICHE, payload: value });
  };
  const submitSearch = async (e) => {
    e.preventDefault();
    // console.log(searchField, "<<<<<", searchField.trim());
    // console.log("ok time submit it");
    if (searchField.trim() != "") {
      // console.log(get)
      // setTimeout(() => {
      //   dispatch({ type: SEARCH_POST, payload: searchField })
      // }, 4000)
      dispatch({ type: SHOW_SEARCH, payload: !showsearchRed });
    } else {
      dispatch({ type: SHOW_SEARCH, payload: null });
    }

    // if

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
    localStorage.setItem("QuinkPostUserLoggedIn", false);
    dispatch({ type: USER_LOGGED_IN, payload: null });
    history.push("/login");
  };
  const handleSearch = () => {
    setSearch(false);
  };
  const handleSearch1 = () => {
    setSearch(false);
  };
  return (
    <div className="primaryfeed-container">
      <div className="upper">
        <div className="searchbox" onClick={handleSearch}>
          <div className="searchbox-div1">
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
            <img
              src={cross}
              alt=""
              className="search-icon"
              onClick={() => {
                setsearchField("");
                dispatch({ type: SHOW_SEARCH, payload: null });
                // dispatch({ type: SHOW_SEARCH, payload: searchField })

                // setshowSearch(false)
              }}
            />
          </div>
        </div>
        <div className="upper-icons">
          <div className="icon">
            <TranslateIcon
              className="icons"
              x
              style={{ fontSize: 30 }}
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
                vertical: "bottom",
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
              <MenuItem onClick={() => handleClose("English")}>
                English
              </MenuItem>
              <MenuItem onClick={() => handleClose("Hindi")}>Hindi</MenuItem>
              <MenuItem onClick={() => handleClose("Gujarati")}>Gujarati</MenuItem>
            <MenuItem onClick={() => handleClose("Kannada")}>Kannada</MenuItem>
            <MenuItem onClick={() => handleClose("Marathi")}>Marathi</MenuItem>
            <MenuItem onClick={() => handleClose("Telugu")}>Telugu</MenuItem>
            </Menu>
          </div>
          <div className="icon">
            <Badge badgeContent={notiLength} color="error">
              <NotificationsIcon
                className="icons"
                x
                style={{ fontSize: 30 }}
                onClick={openNoti}
              />
            </Badge>
          </div>
          <div className="icon">
            <Link to="/messaging">
              <Badge badgeContent={0} color="error">
                <ChatIcon className="icons" style={{ fontSize: 30 }} />
              </Badge>
            </Link>
          </div>
          {(() => {
            if (IS_USER_LOGGED_IN != null) {
              return (
                <Link to="/addpost" className="addpost ">
                  <div>
                    <button className="addpost-button">
                      <AddIcon />
                      Add post
                    </button>
                  </div>
                </Link>
              );
            } else {
              return (
                <Link to="/login" className="addpost ">
                  {" "}
                  <div>
                    <button className="addpost-button">
                      <AddIcon />
                      Add Post
                    </button>
                  </div>
                </Link>
              );
            }
          })()}
          {/* {(isuserLoggedIn) ? (<Link to="/addpost" className="addpost ">
            <div>
              <button className="addpost-button">
                <AddIcon />
                Add post
              </button>
            </div>
          </Link>) : (
            <div>
              <button className="addpost-button">
                <AddIcon />
                Add
              </button>
            </div>
          )} */}
          <div className="menu">
            <MoreVertIcon onClick={openMenu} />
          </div>
        </div>
      </div>
      <div className="secondary-container">
        <BrowserRouter>
          <div className={`feed ${!search && "display-feed"}`}>
            {/* <Post /> */}
          </div>
          <div className={`feed ${search && "display-searchtab"}`}>
            <Searchtab
              // lang={contentType}
              className={`searchtab-component ${search && "display-searchtab"}`}
              searchField={searchField}
            />
          </div>
        </BrowserRouter>
        <div className="sidebar">
          <div
            className={`sidemenu-container ${!menubtn && "sidemenu-hidden"}`}
          >
            <div className="sidemenu-btn" onClick={logOut}>
              <ExitToAppIcon className="menu-icon-each" />
              {IS_USER_LOGGED_IN != null ? "Logout" : "Login"}
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
              className={"sidemenu-btn"}
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

          {(() => {
            if (IS_USER_LOGGED_IN != null) {
              return (
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <div
                    className={`profile-card ${
                      !sidebar && "profile-card-hidden"
                    }`}
                  >
                    <div className="profile-info">
                      <div className="profile-img">
                        <Avatar
                          src={layerUser?.user?.avatar}
                          className="profile-avatar"
                          alt={layerUser?.user?.userName}
                        />
                      </div>
                      <div className="profile-names">
                        <h3 className="profile-displayname">
                          {(() => {
                            if (layerUser) {
                              return layerUser?.user?.userName;
                            }
                          })()}
                        </h3>
                        <h3 className="profile-username">
                          {(() => {
                            if (layerUser) {
                              return layerUser?.user?.firstName;
                            }
                          })()}
                        </h3>
                      </div>
                    </div>
                    <div className="profilesecondary">
                      <div className="profile-detail">
                        <h3 className="profile-detail-each">Quinks</h3>
                        <h3 className="number">
                          {(() => {
                            if (layerUser) {
                              return layerUser?.user?.post?.length;
                            }
                          })()}
                        </h3>
                      </div>
                      <div className="line"></div>
                      <div className="profile-detail">
                        <h3 className="profile-detail-each">followers</h3>
                        <h3 className="number">
                          {(() => {
                            if (layerUser) {
                              return layerUser?.user?.followers?.length;
                            }
                          })()}
                        </h3>
                      </div>
                      <div className="line"></div>
                      <div className="profile-detail">
                        <h3 className="profile-detail-each">following</h3>
                        <h3 className="number">
                          {(() => {
                            if (layerUser) {
                              return layerUser?.user?.followings?.length;
                            }
                          })()}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            } else {
              return (
                <div
                  style={{ position: "relative", width: "80%" }}
                  className={`profile-card ${
                    !sidebar && "profile-card-hidden"
                  }`}
                >
                  <img
                    src={blurimage}
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                  <Link
                    to="/login"
                    className="loginpost"
                    style={{ top: "33%" }}
                  >
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
                  <Link
                    to="/login"
                    className="loginpost"
                    style={{ top: "62%" }}
                  >
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

          <div className={`trend ${!sidebar && "profile-card-hidden"}`}>
            {/* <div className="recommend-quink">Trending Quinks</div> */}
            {/* <Link
              to="/Quink/auroscholar"
              style={{
                textDecoration: "none",
                background: "linear-gradient(45deg, white, #E0E0E0)",
                color: "inherit",
                textAlign: "center",
                borderBottom: "0.5px solid grey",
                marginBottom: "14px",
                padding: "0 1px",
                borderRadius: "2px"
              }}
            >
              <h5 style={{ fontSize: 13, fontWeight: "bold", color: "#000", margin: 0 }}>
                Test your skills and get microscholarship
              </h5>
            </Link>
            <Link
              to="/challenges"
              style={{
                textDecoration: "none",
                background: "linear-gradient(45deg, white, #00000070)",
                background: "linear-gradient(45deg, white, #E0E0E0)",
                color: "inherit",
                textAlign: "center",
                borderBottom: "0.5px solid grey",
                marginBottom: "18px",
                padding: "0 1px",
                borderRadius: "2px"
              }}
            >
              <h5 style={{ color: "#000", margin: 0  }}>
                Participate in challenges and earn money
              </h5>
            </Link>
            <div className="recommend-quink">Top Creators</div>
            <div className="trend-1">
              <Avatar />
              <div style={{ fontWeight: "bold" }}>Jayesh Sharma</div>
            </div>
            <div className="trend-1">
              <Avatar />
              <div style={{ fontWeight: "bold" }}>Mishika Ashwin</div>
            </div>
            <div className="trend-1">
              <Avatar />
              <div style={{ fontWeight: "bold" }}>Suyogita Patel</div>
            </div> */}

            <div className="menu-2">
              <a
                className="trend-1-original"
                onClick={() => handleSelectedNiche(null)}
                href="/"
              >
                <AssistantIcon className="trend-icons-originals" />
                All
              </a>

              <a
                href="/blog/technology"
                className="trend-1-original"
                onClick={() => handleSelectedNiche("Technology")}
              >
                {/* <div
                  className="trend-1-original"
                  onClick={() => handleSelectedNiche("Technology")}
                > */}
                <DevicesIcon className="trend-icons-originals" />
                Technology
                {/* </div> */}
              </a>

              <a
                className="trend-1-original"
                onClick={() => handleSelectedNiche("Sports")}
                href="/blog/sports"
              >
                <TrendingUpIcon className="trend-icons-originals" />
                Sports
              </a>
              <a
                className="trend-1-original"
                onClick={() => handleSelectedNiche("Health")}
                href="/blog/health"
              >
                <LocalActivityIcon className="trend-icons-originals" />
                Health
              </a>
              <a
                className="trend-1-original"
                onClick={() => handleSelectedNiche("Business")}
                href="/blog/business"
              >
                <NextWeekIcon className="trend-icons-originals" />
                Business
              </a>

              <a
                className="trend-1-original"
                onClick={() => handleSelectedNiche("Entertainment")}
                href="/blog/entertainment"
              >
                <AssistantIcon className="trend-icons-originals" />
                Entertainment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Primaryfeed;
