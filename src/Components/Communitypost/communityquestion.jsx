import React from "react";
import Profile from "../../Assets/colour.jpg";
import { Avatar } from "@material-ui/core";
import "../../Styles/Communitypost/communitymainpost.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import { Link } from "react-router-dom";

function Communityquestion({ question }) {
  console.log(question, "this is question");
  return (
    <div className="communitymain-post-container">
      <div className="communitymain-profile-1">
        <Avatar src={Profile} />
        <div className="communitymain-user">
          <p className="communitymain-displayname">Display Name</p>
          <p className="communitymain-username">user_name</p>
        </div>
      </div>
      <div className="communitymain-post-info">
        <div className="communitymain-caption">{question.question}</div>
        <div className="communitymain-header-question">
          <Link
            to={{
              pathname: "/questiondes",
              question: question.question,
              questionId: question._id,
            }}
          >
            Answer {question.answers.length}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Communityquestion;
