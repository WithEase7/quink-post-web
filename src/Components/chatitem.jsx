import React from "react";
import { useSelector } from "react-redux";
import ChatAvatar from "./chatavatar";

export default function ChatItem(props) {
  const { senderId } = props
  const { user } = useSelector(state => state)
  const userId = user._id
  console.log(props, "!!!!!!!!!!!!!!!!!!!!!")
  const checkLeftOrRight = () => {

    if (userId == senderId) {
      return "chat__item"
    }
    else {
      return "chat__item_other"
    }
  }
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={checkLeftOrRight()}
    >
      <div className="chat__item__content">
        <div className="chat__msg">{props?.msg}</div>
        <div className="chat__meta">
          <span>16 mins ago</span>
          <span>Seen 1.03PM</span>
        </div>
      </div>
      <ChatAvatar isOnline="active" image={props.image} />
    </div>
  );
}
