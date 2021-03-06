import React, { useEffect, useState } from "react";
import "../Styles/chatpage.css";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import profileimageC from "../Assets/profile.jpg";
import InfoIcon from "@material-ui/icons/Info";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { TOGGLE_CHAT_CONTACT } from "./Reducer/Action";

import Modal from "react-modal";
import ChatContent from "./chatcontent";
import axios from "axios";
import BACKEND from "./Constants/Backend";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
const socket = io(`${BACKEND}`, {
  transports: ["websocket", "polling", "flashsocket"],
});

function Chatpage(props) {
  console.log(props?.location?.state);
  const otherState = props?.location?.state;
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const { user } = globalState;
  const [Data, setData] = useState([]);
  const [chatUser1, setchatUser1] = useState();
  const [chatUser2, setchatUser2] = useState();
  const [chatCommonId, setchatCommonId] = useState();
  const [toggleContact, settoggleContact] = useState(null);
  const [showRecentChat, setshowRecentChat] = useState("hide-recentchats");
  const [user2Name, setuser2Name] = useState("");
  const [user2avatar, setuser2avatar] = useState("");
  useEffect(() => {
    // console.log(toggleContact)
    if (toggleContact != null) {
      // socket.emit("getPrivatePreviousChat", {
      //     chatId: chatCommonId,tate
      //     sender: user._id,
      //     user2: chatUser2,
      //   })
    }
    // soc
  }, [toggleContact]);

  const handleRecentChats = () => {
    if (showRecentChat == "show-recentchats") {
      setshowRecentChat("hide-recentchats");
    } else {
      setshowRecentChat("show-recentchats");
    }
  };

  // const otherState=props.location.state

  const selectContact = (user2, chatId, user2Name, user2avatar) => {
    setchatUser2(user2);
    setuser2Name(user2Name);
    setchatCommonId(chatId);
    setuser2avatar(user2avatar);
    if (toggleContact == null) {
      settoggleContact(false);
      dispatch({ type: TOGGLE_CHAT_CONTACT, payload: toggleContact });
    } else {
      settoggleContact(!toggleContact);
      dispatch({ type: TOGGLE_CHAT_CONTACT, payload: toggleContact });
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `${BACKEND}/personalChat/getPartner`,
          {
            userId: globalState?.user?._id,
          }
        );
        // console.log(result.data);
        setData(data.userChats);
        if (otherState.value) {
          selectContact(
            otherState?.user2Id,
            undefined,
            otherState?.user2Name,
            otherState?.user2Avatar
          );
        }

        // console.log(Data, "******************")
        // console.log(Data, "this is ???????????DAta")
        // setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const contactList = Data?.map((contact) => {
    // console.log(contact,"++++++")
    // console.log(contact,"<<<<<thi s is contact")
    const { user1, user2 } = contact;

    const temUser = () => {
      if (user1._id == user._id) {
        return {
          userName: user2.userName,
          user2Id: user2._id,
          avatar: user2.avatar,
        };
      } else {
        return {
          userName: user1.userName,
          user2Id: user1._id,
          avatar: user1.avatar,
        };
      }
    };

    const get2User = temUser();

    return (
      <div
        className="contact-individual"
        onClick={() =>
          selectContact(
            get2User.user2Id,
            contact._id,
            get2User.userName,
            get2User.avatar
          )
        }
        style={{ cursor: "pointer" }}
      >
        <div className="contact-individual-1">
          <div className="contact-profile">
            <Avatar src={get2User.avatar} className="contact-profile-avatar" />{" "}
          </div>
          <div className="contact-individual-container">
            <div className="contact-individual-name"> {get2User.userName} </div>
            <div className="contact-individual-message">{contact.mssg}</div>
          </div>
        </div>
        <div className="new-mssg-badge">{contact.newno}</div>
      </div>
    );
  });

  const [newchatModal, setNewchatModal] = useState(false);
  const handlemodal = () => {
    setNewchatModal(true);
  };
  const handlemodal1 = () => {
    setNewchatModal(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-upper">
        <div>Quink Post | Messaging</div>
        <div>
          <Link to="/" className="chat-home-link">
            <button className="chat-home">Home</button>
          </Link>
        </div>
      </div>
      <div onClick={handleRecentChats} className="button-recentchat">
        Recent Chats
      </div>
      <div className="mainchat-container">
        <div className={`contacts ${showRecentChat}`}>
          <div className="search-newchat">
            <input type="text" className="chat-search" placeholder="Search.." />
            {/* <div> */}
            <AddBoxIcon className="newchat-icon" onClick={handlemodal} />
            {/* </div> */}
          </div>
          <Modal isOpen={newchatModal} className="new-chat-modal">
            <div className="new-chat-modal-header">
              <div className="new-chat-modal-header-1">New Chat</div>
              <div className="new-chat-modal-header-2" onClick={handlemodal1}>
                x
              </div>
            </div>
            <div className="new-chat-modal-body">
              <div className="new-chat-each-user">
                <div>
                  <Avatar />
                </div>
                <div className="new-chat-each-user-info">
                  <div className="new-chat-each-user-info-displayname">
                    Display name
                  </div>
                  <div className="new-chat-each-user-info-username">
                    @username
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <div
            className="chat-coantainer-1"
          // style={{
          //   display: `${showRecentChat[0]}`,
          //   height: `${showRecentChat[1]}`,
          // }}
          >
            {contactList}
          </div>
        </div>
        <div className="chat">
          <div className="chat-header">
            <div className="chat-header-1">
              <Avatar src={user2avatar} className="chat-header-avatar" />
              <div className="main-contact">{user2Name}</div>
            </div>
            <div className="info-icon">
              <InfoIcon />
            </div>
          </div>

          {/* {(props?.location?.state) ?
            () => {
              settoggleContact(false)
              dispatch({ type: TOGGLE_CHAT_CONTACT, payload: toggleContact })
              return <ChatContent chatCommonId={null} sender={user._id} user2Name={otherState?.user2Name} user2Id={otherState?.user2Id} />
            } : */}
          {user2Name ? (
            <ChatContent
              chatCommonId={chatCommonId}
              sender={user._id}
              user2Name={user2Name}
              user2Id={chatUser2}
            />
          ) : (
            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
                fontWeight: "bold",
              }}
            >
              No chat selected. Double Tap to select a contact
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatpage;
