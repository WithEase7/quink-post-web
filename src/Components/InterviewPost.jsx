import React, { useState } from "react";
import "../Styles/ArticlePost.css";
import "../Styles/InterviewPost.css";
// import Colour from "../images/colour.jpg";
import Portrait from "../Assets/portrait.jpg";
// import Modal from "react-modal";

const InterviewPost = ({ post }) => {
  console.log(post, "this is <<<<<<<post interview");
  // const [modalIsOn, setmodalIsOn] = useState(false);
  console.log(post.image);

  return (
    <div className="interviewpost" /*onClick={()=>setmodalIsOn(true)}*/>
      <div className="interviewpost-img">
        <img src={post.image} alt="" />
      </div>
      <div className="articlepost-info">
        <div className="interviewpost-header">{post.title}</div>
        <div className="articlepost-caption">{post.body}</div>
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
  );
};

export default InterviewPost;
