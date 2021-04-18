import React from "react";
import "../Styles/ArticlePost.css";
import Colour from "../Assets/colour.jpg";

const ArticlePost = ({ post }) => {
  console.log(post);
  return (
    <div className="articlepost">
      <div className="articlepost-img">
        <img src={post.image} alt="" />
      </div>
      <div className="articlepost-info">
        <div className="articlepost-header">{post.title}</div>
        <div className="articlepost-caption">{post.body}</div>
      </div>
    </div>
  );
};

export default ArticlePost;
