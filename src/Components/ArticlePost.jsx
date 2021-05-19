import React from "react";
import "../Styles/ArticlePost.css";
import Colour from "../Assets/colour.jpg";
import { Link } from "react-router-dom";

const ArticlePost = ({ post }) => {
  console.log(post);
  return (
    <Link
      to={`/originals/details/${post._id}/quinkpost`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="articlepost">
        <div className="articlepost-img">
          <img src={post.image} alt="" />
        </div>
        <div className="articlepost-info">
          <div className="articlepost-header">{post?.title}</div>
          <div className="articlepost-caption">{post?.caption}</div>
          {/* <div className="articlepost-caption">{post?.body}</div> */}
        </div>
      </div>
    </Link>
  );
};

export default ArticlePost;
