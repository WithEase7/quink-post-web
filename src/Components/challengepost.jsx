import React from "react";
import "../Styles/communitypost.css";
import "../Styles/challengepost.css";
import Quinkpost from "../Assets/Quinkpost.jpg";
import { Avatar } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";

function Challengepost({ challenge }) {
  console.log(challenge);
  const end = challenge?.duration.end;
  const challengeId = challenge?._id;
  // console.log(end,"this is end date of challenge")
  return (
    <div className="challenge-container">
      <div className="community-header">
        <Avatar src={Quinkpost} className="community-avatar" />
        <div className="community-title">Quink Post Challenge</div>
      </div>
      {/* <div className="post-info">
        <div className="challenge-discription">
          <div className="challenge-discription-1">
            <div className="challenge-discription-header">Description :</div>
            {challenge?.description}
          </div>
          <div className="challenge-discription-1">
            <div className="challenge-discription-header">
              {`${challengeDate.getDate()}/${
                challengeDate.getMonth() + 1
              }/${challengeDate.getFullYear()}`}
            </div>
            12 feb 2021
          </div>
          <div className="challenge-discription-1">
            <div className="challenge-discription-header">Prize :</div>
          </div>
        </div>
      </div> */}
      <img src={challenge.image ? challenge?.image : Quinkpost} style={{ height: "35rem", width: "100%" }} />
      <div className="join-community">
        <div className="members">
          <PersonIcon />
          Participants :<div className="members-no">{parseInt(challenge?.participants?.length) + parseInt(104)}</div>
        </div>
        <Link to={{ pathname: `/challenge/${challenge?.title}/${challengeId}/participate` }} style={{ textDecoration: "none", color: "#282c37" }}>
          <div className="community-readmore">Enter</div>
        </Link>
      </div>
    </div>
  );
}

export default Challengepost;
