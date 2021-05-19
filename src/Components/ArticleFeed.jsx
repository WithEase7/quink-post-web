import React, { useEffect, useState } from "react";
import "../Styles/ArticleFeed.css";
import ArticlePost from "./ArticlePost";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "../Styles/Original.css";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DevicesIcon from "@material-ui/icons/Devices";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import AssistantIcon from "@material-ui/icons/Assistant";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

import InterviewFeed from "./InterviewFeed";
import DescriptionIcon from "@material-ui/icons/Description";
import PeopleIcon from "@material-ui/icons/People";
import BACKEND from "./Constants/Backend";
import axios from "axios";
const ArticleFeed = () => {
  const [article, setarticle] = useState([]);

  useEffect(() => {
    {
      (async () => {
        const result = await axios.get(`${BACKEND}/admin`);
        console.log(result.data);
        const posts = result.data.adminPost;
        posts.map((post, index) => {
          if (post.type != "TRANSCRIBED") {
            setarticle((prev) => {
              return [...prev, post];
            });
          }
        });
      })();
    }
  }, []);

  return (
    <div className="articleFeed">
      <div className="articleFeed-title ">Quink Post Articles.</div>
      <div className="articlePost">
        {(() => {
          return article.map((post, index) => {
            return <ArticlePost post={post} key={index} />;
          });
        })()}

        {/* <ArticlePost /> */}
        {/* <ArticlePost />        
        <ArticlePost /> */}
      </div>
    </div>
  );
};

export default ArticleFeed;
