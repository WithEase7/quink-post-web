import React, { useEffect, useState } from "react";
import "../Styles/communitypost.css";
import Profile from "../Assets/colour.jpg";
import { Avatar } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import axios from "axios";
import BACKEND from "./Constants/Backend";
// import { Link } from '@material-ui/icons';

function Communitypost({ title, description, communityId }) {
  // ????????
  // console.log(data);
  console.log(communityId, "thi i s data from community post .js")

  // useEffect(() => {
  //   {(async()=>{
  //    const result = await axios.get(`${BACKEND}/community`)
  //    console.log(result.data)
  //    setcommunity(result.data)
  //   })()}
  //  }, [])
  // console.log(data);
  return (
    <div className="communitypost-container">
      <div className="post-info">
        <div className="community-header">
          <Avatar src={Profile} className="community-avatar" />
          <div className="community-title">{title}</div>
        </div>
        <div className="community-caption">
          {/* {data.description} */}
          {/* {data.description} */}
          {description}
        </div>
      </div>
      <div className="join-community">
        <div className="members">
          <PersonIcon />
          Members :<div className="members-no">4301</div>
        </div>
        <div className="community-readmore">
          <Link style={{ textDecoration: 'none', color: '#282c37' }} to={{ pathname: `/communitydes/${communityId}`, }}>Join</Link>
        </div>
      </div>
    </div>
  );
}

export default Communitypost;
