import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Original.css";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DevicesIcon from "@material-ui/icons/Devices";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import AssistantIcon from "@material-ui/icons/Assistant";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ArticleFeed from "./ArticleFeed";
import InterviewFeed from "./InterviewFeed";
import DescriptionIcon from "@material-ui/icons/Description";
import PeopleIcon from "@material-ui/icons/People";
import HelmetBase from "./HelmetBase";
const OriginalPage = () => {
  const [section, setsection] = useState(false);
  let OriginalSection;
  if (section === false) {
    OriginalSection = <ArticleFeed />;
  } else {
    OriginalSection = <InterviewFeed />;
  }
  // let handleClick =()=>{
  //   if (section === false) {
  //     setsection(true);
  //   } else {
  //     setsection(false);
  //   }
  // }
  let handleClick1 = () => {
    if (section === true) {
      setsection(false);
    }
  };
  let handleClick2 = () => {
    if (section === false) {
      setsection(true);
    }
  };
  return (
    <>
      <HelmetBase title="Quink Post - Originals" link="/originals" />
      <div className="originals-page">
        <div className="originals-menu">
          <div className="menu-1">
            <div className="home-mobile-responsive">
              <div className="home-original-button">
                <Link to="/" className="homemainlink">
                  <HomeRoundedIcon className="original-home-icon" />
                  <span className="home-text">Home</span>
                </Link>
              </div>
              {/* <div>
              <MoreVertIcon />
            </div> */}
            </div>

            <div className="original-menu-btn-container">
              <div
                className={`originals-menu-btn ${!section && "original-menu-active"
                  }`}
                onClick={handleClick1}
              >
                <DescriptionIcon className="original-home-icon" />
              Articles
            </div>
              <div
                className={`originals-menu-btn ${section && "original-menu-active"
                  }`}
                onClick={handleClick2}
              >
                <PeopleIcon className="original-home-icon" />
              Interviews
            </div>
            </div>
          </div>
          <div className="menu-2">
            <div className="trend-1-original">
              <TrendingUpIcon className="trend-icons-originals" />
            trending
          </div>
            <div className="trend-1-original">
              <DevicesIcon className="trend-icons-originals" />
            technology
          </div>
            <div className="trend-1-original">
              <LocalActivityIcon className="trend-icons-originals" />
            fashion
          </div>
            <div className="trend-1-original">
              <NextWeekIcon className="trend-icons-originals" />
            buisness
          </div>
            <div className="trend-1-original">
              <AssistantIcon className="trend-icons-originals" />
            entertainment
          </div>
          </div>
        </div>
        <div className="Originals-feed">{OriginalSection}</div>
      </div>
    </>
  );
};

export default OriginalPage;
