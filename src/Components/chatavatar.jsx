import React from "react";
import { Avatar } from "@material-ui/core";

export default function ChatAvatar (props) {

    return (
      <div className="avatar__community">
        <div className="avatar-img">
          <Avatar src={props.image} className="contact-profile-avatar" />
        </div>
        <span className={`isOnline ${props.isOnline}`}></span>
      </div>
    );
}
