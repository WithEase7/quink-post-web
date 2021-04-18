import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../Styles/postdetail.css";
import ReplayIcon from "@material-ui/icons/Replay";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import IconButton from "@material-ui/core/IconButton";
import { Avatar } from "@material-ui/core";
import "../Styles/communitydes.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import NotListedLocationRoundedIcon from "@material-ui/icons/NotListedLocationRounded";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import Post from "./post";
import Communitymainpost from "./Communitypost/communitymainpost";
import AttachmentOutlinedIcon from "@material-ui/icons/AttachmentOutlined";
import Communityquestion from "./Communitypost/communityquestion";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Modal from "react-modal";
import CancelIcon from "@material-ui/icons/Cancel";
import BACKEND from "./Constants/Backend"
import CommunityChat from "./Communitypost/communitychat";
import axios from "axios";


function Communitydes(props) {
  // console.log(props.match.params.communityId,"<<<<<<<<<<<<<<<< This is community des page ")
  const communityId=props.match.params.communityId
  // const posts=props.history.location.state.post
  // const questions=props.history.location.state.question
  const [post,setpost] = useState()
  const [questions,setquestions] = useState()
  // const communityId=props.history.location.state._id
  const [enter, setEnter] = useState(false)
  const [compost, setCompost] = useState(true);
  const [que, setQue] = useState(false);
  const [chat, setChat] = useState(false);
  const [challengesModal, setChallengesModal] = useState(false);

// >>>>>>>>>>>>>>>
useEffect(() => {
(async()=>{
  const result = await axios.get(`${BACKEND}/community/allPost/${communityId}`)
  console.log(result.data,"*************************")
  setpost(result.data.community.post)
  setquestions(result.data.community.question)
 })()
}, [])


  const handleModal = () => {
    setChallengesModal(true);
  };
  const handleModal1 = () => {
    setChallengesModal(false);
  };
  const handleEnter = () => {
    if (enter == true) {
      setEnter(false);
    }
    if (enter == false) {
      setEnter(true);
    }
  };
  const handleClick1 = () => {
    setCompost(true);
    setQue(false);
    setChat(false);
  };
  const handleClick2 = () => {
    setCompost(false);
    setQue(true);
    setChat(false);
  };
  const handleClick3 = () => {
    setCompost(false);
    setQue(false);
    setChat(true);
  };
  return (
    <div className="Communitydes-container">
      <div className="Communitydes-container-upper">
        <div className="Communitydes-container-upper-info">
          <div className="mobile-vertical-icon">
            <div className="Communitydes-container-upper-info-1">
              <div className="Communitydes-container-upper-info-brand">
                Communinty Name
              </div>
              <div className="Community-members">Members: 123</div>
              <div className="Community-members online">Online: 23</div>
            </div>
            <div className="mobile-icon community-three-dot-mobile">
              <MoreVertOutlinedIcon onClick={handleModal} />
              <Modal isOpen={challengesModal}>
                <div className="Community-container-members-enter-button-container">
                  <div
                    className={`Community-container-members-enter-button ${
                      !enter && "show-communitydes"
                    }`}
                    onClick={handleEnter}
                  >
                    Enter Community
                  </div>
                  <div
                    className={`Community-container-members-leave-button ${
                      enter && "show-communitydes"
                    }`}
                    onClick={handleEnter}
                  >
                    Leave Community
                  </div>
                  <div>
                    <CancelIcon onClick={handleModal1} />
                  </div>
                </div>

                <div className="Community-container-members-members">
                  <div className="Community-container-members-members-heading">
                    Community Members
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          <div className="Communinty-container-secondary">
            <div className="Communinty-container-secondary-navbar">
              <div
                className={`community-items first-item ${
                  compost && "community-items-active"
                }`}
                onClick={handleClick1}
              >
                <HomeRoundedIcon className="Community-item-icon" />{" "}
                <span className="mobilehidden"> Home</span>
              </div>
              <div
                className={`community-items ${que && "community-items-active"}`}
                onClick={handleClick2}
              >
                <NotListedLocationRoundedIcon className="Community-item-icon" />
                <span className="mobilehidden">Questions</span>
              </div>
              <div
                className={`community-items ${
                  chat && "community-items-active"
                }`}
                onClick={handleClick3}
              >
                <ForumRoundedIcon className="Community-item-icon" />{" "}
                <span className="mobilehidden">Chat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`Community-container-main ${
          !compost && "show-communitydetail"
        }`}
      >
        <div className="Community-container-main-addpost">
          <div className="Community-container-main-addpost-title">
            Add a Post
          </div>
          <div className="community-container-main-addpost-container">
            <textarea
              name=""
              className="community-container-main-addpost-textarea"
            ></textarea>
          </div>
          <div className="Community-container-main-addpost-lower">
            <div className="Community-container-main-addpost-lower-attach">
              <AttachmentOutlinedIcon />
            </div>
            <div className="Community-container-main-addpost-lower-button">
              Post to community
            </div>
          </div>
        </div>
        <Communitymainpost posts={post}/>
      </div>
      <div
        className={`Community-container-main ${!que && "show-communitydetail"}`}
      >
        <div className="Community-container-main-addpost">
          <div className="Community-container-main-addpost-title">
            Add a Question
          </div>
          <div className="community-container-main-addpost-container">
            <textarea
              name=""
              className="community-container-main-addpost-textarea"
            ></textarea>
          </div>
          <div className="Community-container-main-addpost-lower-question">
            <div className="Community-container-main-addpost-lower-button">
              Post a Question
            </div>
          </div>
        </div>
        {(()=>{
          return questions?.map((question,index)=>{

            return <Communityquestion key={index} question={question} />
          })

        })()}
        {/* <Communityquestion />
        <Communityquestion />
        <Communityquestion />
        <Communityquestion /> */}
        {/* <Communityquestion /> */}
      </div>
      <div
        className={`Community-container-main ${
          !chat && "show-communitydetail"
        }`}
      >
        <CommunityChat communityId={communityId} />
      </div>
      <div className="Community-container-members">
        <div className="Community-container-members-enter-button-container">
          <div
            className={`Community-container-members-enter-button ${
              !enter && "show-communitydes"
            }`}
            onClick={handleEnter}
          >
            Enter Community
          </div>
          <div
            className={`Community-container-members-leave-button ${
              enter && "show-communitydes"
            }`}
            onClick={handleEnter}
          >
            Leave Community
          </div>
        </div>

        <div className="Community-container-members-members">
          <div className="Community-container-members-members-heading">
            Community Members
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communitydes;
