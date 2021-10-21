import React, { useEffect, useState } from "react";
import "../Styles/ArticleFeed.css";
import ArticlePost from "./ArticlePost";
import "../Styles/Original.css";
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
