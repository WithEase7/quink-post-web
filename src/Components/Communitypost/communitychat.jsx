import React, { createRef, useEffect, useState } from "react";
import "../../Styles/communitychatcontent.css";
import CommunityChatItem from "./communitychatitem";
import io from "socket.io-client"
import { useSelector } from "react-redux";
import BACKEND from "../Constants/Backend";
export default function CommunityChat(props) {
  const messagesEndRef = createRef(null);
    const globalUser = useSelector((state) => state);
    const socket = io(`${BACKEND}`,{transports:['websocket','polling','flashsocket']});

    const user=globalUser.user
  // const chatItms = [
  //
  //   {
  //     key: 4,
  //     image: "https://ui-avatars.com/api/?name=R+W",
  //     type: "",
  //     msg: "Awesome these days.",
  //   },
  //
  // ];
// const [user,setuser] = useState({})
  const [chats, setchats] = useState([])
  const [msg, setmsg] = useState("");

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     chat: this.chatItms,
  //     msg: "",
  //   };
  // }

  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  useEffect(() => {
    console.log("yes ")
 socket.emit("fetchMessage", { communityId: props.communityId })

        console.log("useEffect called")
        // (async()=>{
        //   const user=await AsyncStorage.getItem("quinkuser")
        // })()
    // window.addEventListener("keydown", (e) => {
    //   if (e.keyCode == 13) {
    //     if (msg != "") {
    //       chatItms.push({
    //         key: 1,
    //         type: "",
    //         msg: msg,
    //         image: "https://ui-avatars.com/api/?name=D+P",
    //       });
    //       setchat([...chatItms]);
    //       scrollToBottom();
    //       setmsg("");
    //     }
    //   }
    // });
    // scrollToBottom();
  },[]);

  socket.on("message", (messagevalue) => {
      // console.log(messagevalue,"this is msg")

  setchats(messagevalue)
})
socket.once("dupdateMessage", messagevalue => {
  console.log("this is message to updatae>>>",messagevalue)
  setchats(prev => { return [...prev, messagevalue] })
})


const send = async () => {
  try {
    console.log("sending message")
    // const result = await axios.post(`${BACKEND}/community/message`, {
    //   communityId: props.communityId,
    //   user: user._id,
    //   message: msg
    // })
    // console.log(result.data);
    // if (result.data.success) {
      socket.emit("updateMessage", {
        communityId: props.communityId,
        user: user._id,
        userName:user.userName,
        message: msg
      })
      // console.log(temp, "this istem")
      // settoggle(!toggle)
      setmsg("")
    // }
  } catch (e) { console.log(e) }
  // Data.push({ id: inputMessage, message: inputMessage });
  // setMessage("");
};


  const onStateChange = (e) => {
    e.preventDefault()
    setmsg(e.target.value);
  };

  return (
    <div className="main__chatcontent">
      <div className="community_content__body">
        <div className="chat__items">
          {chats.map((itm, key) => {
            return (
              <CommunityChatItem
                animationDelay={key+ 2}
                key={key}
                // key={itm.key}
                // user={itm.type ? itm.type : "me"}
                // msg={itm.msg}
                // image={itm.image}
                data={itm}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer2">
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
          <button className="btnSendMsg" id="sendMsgBtn" onClick={send}>
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
