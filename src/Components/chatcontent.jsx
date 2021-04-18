import React, { createRef, useEffect, useState } from "react";
import "../Styles/chatcontent.css";
import ChatItem from "./chatitem";
import io from "socket.io-client"
import { useSelector } from "react-redux"
const socket = io("https://quinkpostbackend.herokuapp.com", { transports: ['websocket', 'polling', 'flashsocket'] });

export default function ChatContent({ chatCommonId, sender, user2Id, user2Name }) {
  console.log(chatCommonId, sender, user2Id, "<<<<<")
  // console.log(ChatMessage,"this is chat message from chat content screen")
  // const senderId=ChatMessage[0].sender._id
  const messagesEndRef = createRef(null);



  const [msg, setmsg] = useState("");
  const [newMessage, setnewMessage] = useState(false)
  const user = useSelector(state => state.user)
  const toggleContactReducer = useSelector(state => state.toggleContactReducer)
  console.log(toggleContactReducer, "<<<<<<This is toggleChat contact")
  // const [initialMessage,setinitialMessage] = useState(false)
  // const [inComingChat,setinComingChat] = useState(ChatMessage)
  const [ChatMessage, setChatMessage] = useState([])
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    // setinComingChat(ChatMessage)
    // console.log("useEffectCalled")
    console.log("inside useEffect")
    socket.emit("getPrivatePreviousChat", {
      chatId: chatCommonId,
      sender: sender,
      user2: user2Id,
    })
  }, [toggleContactReducer])

  socket.on("initialMessage", data => {
    // console.log(data)
    // console.log ( data,"this is initial message")
    console.log(data[0], "this is data")

    setChatMessage(data)
  })





  // useEffect(() => {

  //   window.addEventListener("keydown", (e) => {
  //     if (e.keyCode == 13) {
  //       if (msg != "") {
  //         ChatMessage.push({
  //           key: 1,
  //           type: "",
  //           msg: msg,
  //           image: "https://ui-avatars.com/api/?name=D+P",
  //         });
  //         // setchat([...chatItms]);
  //         scrollToBottom();
  //         setmsg("");
  //       }
  //     }
  //   });
  //   scrollToBottom();
  // },[newMessage]);

  const onStateChange = (e) => {
    setmsg(e.target.value);
  };

  const sendThisMessage = () => {
    socket.emit('OneToOneChat', { sender: { _id: user._id, userName: user.userName, avatar: user.avatar }, user2: user2Id, chatId: chatCommonId, message: msg })

  }
  socket.on('messageFromOne', data => {
    // console.log(data,">><<gettint message")
    // console.log("new message >>>>>>>>>>", data.message.message, ">>>>>>>>>>>>>",socket.id)
    // console.log('Incoming message:', data)
    console.log(data.message, "this is data from sending me")
    // console.log(data.message, "this is messages")

    setChatMessage([...ChatMessage, data.message])

  });


  return (
    <div className="main__chatcontent">
      <div className="content__body">
        <div className="chat__items">
          {ChatMessage?.map((itm, index) => {
            // console.log(itm,"this is one item")
            return (
              <ChatItem
                animationDelay={index + 2}
                key={itm.key}
                user={user2Name}
                msg={itm.message}
                senderId={itm?.sender?._id}
                image={itm?.sender?.avatar}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={onStateChange}
            value={msg}
          />
          <button className="btnSendMsg" id="sendMsgBtn" onClick={sendThisMessage}>
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
