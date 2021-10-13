import React from "react";
import "../Styles/ArticlePost.css";
import "../Styles/InterviewPost.css";
import { Link } from "react-router-dom";

const InterviewPost = ({ post }) => {
  console.log(post, "this is <<<<<<<post interview");
  console.log(post.image);

  return (
    <>
      <Link to={`/originals/${post.title.replace(/ /g,"-")}/${post._id}`} style={{ textDecoration: "none", color: "inherit" }} >
        <div className="interviewpost">
          <div className="interviewpost-img">
            <img src={post.image} alt="" />
          </div>
          <div className="articlepost-info">
            <div className="interviewpost-header">{post.title}</div>
            <div className="articlepost-caption">{post.caption}</div>
          </div>

          {/* map karke phir banayenge */}

          {/* <div>
               <Modal isOpen={modalIsOn} className="interview-modal">
                 <div className="interview-modal-nav">
                     interview.
                 </div>
               </Modal>
             </div> */}
        </div>
      </Link>
    </>
  );
};

export default InterviewPost;
