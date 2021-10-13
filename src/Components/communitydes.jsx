import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom"
import "../Styles/postdetail.css";
import "../Styles/communitydes.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import NotListedLocationRoundedIcon from "@material-ui/icons/NotListedLocationRounded";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import Communitymainpost from "./Communitypost/communitymainpost";
import Communityquestion from "./Communitypost/communityquestion";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Modal from "react-modal";
import CancelIcon from "@material-ui/icons/Cancel";
import BACKEND from "./Constants/Backend"
import CommunityChat from "./Communitypost/communitychat";
import axios from "axios";
import { useSelector } from "react-redux";
import HelmetBase from "./HelmetBase";
import { Helmet } from "react-helmet";

function Communitydes(props) {
  // console.log(props.match.params.communityId,"<<<<<<<<<<<<<<<< This is community des page ")
  const communityId = props.match.params.communityId
  const globalUser = useSelector((state) => state.user);
  // const posts=props.history.location.state.post
  // const questions=props.history.location.state.question
  const [post, setpost] = useState()
  const [questions, setquestions] = useState()
  // const communityId=props.history.location.state._id
  const [enter, setEnter] = useState(false)
  const [compost, setCompost] = useState(true);
  const [que, setQue] = useState(false);
  const [chat, setChat] = useState(false);
  const [challengesModal, setChallengesModal] = useState(false);
  const [articleImage, setarticleImage] = useState("")
  const [caption, setcaption] = useState("")
  const [commName, setCommName] = useState("")
  const [communitydet, setCommunitydet] = useState("")
  // >>>>>>>>>>>>>>>
  useEffect(() => {
    (async () => {
      const result = await axios.get(`${BACKEND}/community/allPost/${communityId}`)
      console.log(result.data, "*************************")
      setpost(result.data.community.post)
      setquestions(result.data.community.question)
      setCommunitydet(result.data.community.title)
      setCommName(result.data.community.title)
    })()
  }, [])


  const handleImageArticle = async (imageAdd) => {
    // console.log("this is image add >>>>>>",imageAdd)
    try {
      console.log(imageAdd[0], "handle image called");
      // console.log("handleUpload called")
      const data = new FormData();
      data.append("file", imageAdd[0]);
      data.append("upload_preset", "quinkpost");
      data.append("cloud_name", "Quink-Post");
      console.log("before cloud post");

      fetch("https://api.cloudinary.com/v1_1/quink-post/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "this is data from cloudinakdfj");
          setarticleImage(data.secure_url);
        })
        .catch((e) => console.log(e, "error from the n catch"));
    } catch (e) {
      console.log(e, "error while sending in cloudinary");
    }
  };
  const submitPost = async () => {
    try {
      const { data } = await axios.post(`${BACKEND}/community/post`, {
        communityId,
        body: caption,
        image: articleImage,
        author: globalUser._id


      })
      if (data.success) {
        console.log("post uploaded")
        setcaption("")
        setarticleImage("")
      }
    } catch (e) { console.log(e) }
  }

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
      <HelmetBase title={`Quink Post -${communitydet} community`} link={`/community/$${communitydet}/${communityId}`} />
      <div className="Communitydes-container-upper">
        <div className="Communitydes-container-upper-info">
          <div className="mobile-vertical-icon">
            <div className="Communitydes-container-upper-info-1">
              <div className="Communitydes-container-upper-info-brand">
                {communitydet}
              </div>
              <div className="Community-members">Members: 123</div>
              <div className="Community-members online">Online: 23</div>
            </div>
            <div className="mobile-icon community-three-dot-mobile">
              <MoreVertOutlinedIcon onClick={handleModal} />
              <Modal isOpen={challengesModal}>
                <div className="Community-container-members-enter-button-container">
                  <div
                    className={`Community-container-members-enter-button ${!enter && "show-communitydes"
                      }`}
                    onClick={handleEnter}
                  >
                    Enter Community
                  </div>
                  <Link to={`/`} style={{ textDecoration: "none" }}> <div
                    className={`Community-container-members-leave-button ${enter && "show-communitydes"
                      }`}
                    onClick={handleEnter}
                  >
                    Leave Communitya
                  </div></Link>
                  <div>
                    <CancelIcon onClick={handleModal1} />
                  </div>
                </div>

                <div className="Community-container-members-members">
                  <div className="Community-container-members-members-heading">
                    Community Members
                  </div>
                  {/* <div className="Community-container-members-members-each">
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
                  </div> */}
                </div>
              </Modal>
            </div>
          </div>
          <div className="Communinty-container-secondary">
            <div className="Communinty-container-secondary-navbar">
              <div
                className={`community-items first-item ${compost && "community-items-active"
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
                className={`community-items ${chat && "community-items-active"
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
        className={`Community-container-main ${!compost && "show-communitydetail"
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
              value={caption}
              onChange={(e) =>
                setcaption(e.target.value)
              }
            ></textarea>
          </div>
          <div className="Community-container-main-addpost-lower">
            <div className="Community-container-main-addpost-lower-attach">
              {/* <AttachmentOutlinedIcon type="file"/> */}
              <input
                type="file"
                // id="upload-image"
                onChange={(e) => handleImageArticle(e.target.files)}
              />
            </div>
            <div className="Community-container-main-addpost-lower-button" style={{ cursor: "pointer" }} onClick={submitPost}>
              Post
            </div>
          </div>
        </div>
        <Communitymainpost posts={post} />
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
        {(() => {
          return questions?.map((question, index) => {

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
        className={`Community-container-main ${!chat && "show-communitydetail"
          }`}
      >
        <CommunityChat communityId={communityId} />
      </div>
      <div className="Community-container-members">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="Community-container-members-enter-button-container">
            <div
              className={`Community-container-members-enter-button ${!enter && "show-communitydes"
                }`}
              onClick={handleEnter}
            >
              Enter Community
            </div>
            <div
              className={`Community-container-members-leave-button ${enter && "show-communitydes"}`}
              onClick={handleEnter}
            >
              Leave Community
            </div>
          </div>
        </Link>

        <div className="Community-container-members-members">
          <div className="Community-container-members-members-heading">
            Community Members
          </div>
          {/* <div className="Community-container-members-members-each">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Communitydes;
