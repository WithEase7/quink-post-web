import React from "react";
import ChatAvatar from "../chatavatar";

export default function CommunityChatItem({ data }) {
  // console.log(props.data,"<<))))))")\
  const { message, timeStamp, user } = data;
  // console.log(user, "this is data in community chat");
  // console.log(user,"this is userName")
  // const{userName,avatar}=user
  // console.log(message,timeStamp,user)
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${user ? user : ""}`}
    >
      <div className="chat__item__content">
        <span style={{fontWeight: 'normal', color: 'lightgrey'}}> {user?.userName}</span>
        <div style={{ backgroundColor: 'lightgrey', height: 1, marginBottom: 5, marginTop: 5 }}></div>
        <div className="chat__msg">{message}</div>
        <div className="chat__meta">
          <span>16 mins ago</span>
          <span>Seen 1.03PM</span>
        </div>
      </div>
      <ChatAvatar isOnline="active" image={user?.avatar} />
    </div>
  );
}
