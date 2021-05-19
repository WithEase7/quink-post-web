import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../Styles/postdetail.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
// import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Quinkpost from '../Assets/Quinkpost.jpg';
import ReplayIcon from "@material-ui/icons/Replay";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import DOMPurify from "dompurify";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import IconButton from "@material-ui/core/IconButton";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookShareButton,
  InstapaperShareButton,
  InstapaperIcon,
  LineShareButton,
  LineIcon,
  LinkedinShareButton,
  LinkedinIcon,
  LivejournalShareButton,
  LivejournalIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TumblrShareButton,
  TumblrIcon,
  ViberShareButton,
  ViberIcon,
  VKShareButton,
  VKIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
} from "react-share";
import { Avatar } from "@material-ui/core";
import Modal from "react-modal";
import BACKEND from "./Constants/Backend";
import axios from "axios";
import { withRouter } from "react-router";
import { connect, useSelector, useDispatch } from "react-redux";
// import { SaveSharpIcon } from "@material-ui/icons";
import SaveSharpIcon from "@material-ui/icons/SaveSharp";
import io from "socket.io-client"
const socket = io(`${BACKEND}`, { transports: ['websocket', 'polling', 'flashsocket'] });


function Postdetail(props) {
  const postId = props.match.params.postId;
  const user = useSelector((state) => state.user);
  const [postData, setpostData] = useState();
  const [cmmtMobModal, setcmmtMobModal] = useState(false);
  const [cmmnt, setCmmnt] = useState(false);
  const [commentInPost, setcommentInPost] = useState([]);
  const [likeComment, setlikeComment] = useState([]);
  const [totalComment, settotalComment] = useState("...");
  const [totalLikedPost, settotalLikedPost] = useState("...");
  const [liked, setLiked] = useState(false);
  const [textInComment, settextInComment] = useState("");
  const [commentToggle, setcommentToggle] = useState(false);
  const [sharemodalIsOpen, setsharemodalIsOpen] = useState(false);
  const [forwardmodalIsOpen, setforwardmodalIsOpen] = useState(false);
  const [toggelSave, settoggelSave] = useState(true);
  const [chatData, setchatData] = useState([])
  const locationExact = window.location.href;
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const getPostData = await axios.get(`${BACKEND}/post/open/${postId}`);
        // console.log(getPostData.data.post.body,"***********")
        const postBody = getPostData.data.post.body;
        // console.log(postBody)
        // console.log(postBody.search("+"),"this is split")
        // console.log("called like")
        await setpostData(getPostData.data.post);

        console.log(postData, "this is post Data");

        const resultLikedPost = await axios.post(
          `${BACKEND}/like/checkIsLiked`,
          {
            userId: user._id,
            postId: postId,
          }
        );
        if (resultLikedPost.data.success) {
          // console.log(resultLikedPost.data, "this is result from backend");

          setLiked(resultLikedPost.data.islikedBy);
          settotalLikedPost(resultLikedPost.data.length);
        } else {
          settotalLikedPost(resultLikedPost.data.length);
        }
      } catch (e) {
        console.log(e, "error");
      }
    })();
  }, [liked]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `${BACKEND}/personalChat/getPartner`,
          {
            userId: user?._id,
          }
        );
        setchatData(data.userChats );
        // if (otherState.value) {
        //   selectContact(otherState?.user2Id, undefined, otherState?.user2Name, otherState?.user2Avatar)
        // }
      } catch (e) { console.log(e) }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const result = await axios.post(`${BACKEND}/save/checkIsSaved`, {
        userId: user._id,
        postId: postId,
      });
      console.log(result.data, "this is saved console");
      if (result.data.success) {
        settoggelSave(true);
      } else {
        settoggelSave(false);
      }
    })();
  }, []);

  useEffect(async () => {
    const result = await axios.get(`${BACKEND}/comment/inPost/${postId}`);
    // console.log(result);
    setcommentInPost(result.data.comments.reverse());
    result.data.comments.map((comment) => {
      return setlikeComment((prev) => {
        return { ...prev, [comment._id]: comment.likedBy };
      });
    });
    // settotalLikedPost(postData.likedBy.length)
    settotalComment(result.data.comments.length);
  }, [, commentToggle]);

  const send = (user2Id, chatId) => {
    // console.log(mem,"this ismem")
    // console.log(user2Id, "this is id");

    socket.emit("OneToOneChat", {
      sender: { _id: user._id },
      user2: user2Id,
      chatId: chatId,
      sharePost: true,
      data: postData,
    });
  };
  
  // const send = (user2Id, chatId) => {
  //   // console.log(mem,"this ismem")
  //   console.log(user2Id, "this is id");

  //   socket.emit("OneToOneChat", {
  //     sender: { _id: user._id },
  //     user2: user2Id,
  //     chatId: chatId,
  //     sharePost: true,
  //     data: postData,
  //   });
  // };


  const contactList = chatData?.map((contact) => {
    // console.log(contact,"++++++")
    console.log(contact,"<<<<<thi s is contact")
    // console.log(contact, "<<<<<")
    const { user1, user2 } = contact

    const temUser = () => {

      if (user1._id == user._id) {
        return { userName: user2.userName, user2Id: user2._id, avatar: user2.avatar }
      }
      else {
        return { userName: user1.userName, user2Id: user1._id, avatar: user1.avatar }
      }
    }

    const get2User = temUser()

    return (
      <div className="contact-individual" style={{ cursor: "pointer" }}>
        <div className="contact-individual-1">
          <div className="contact-profile">
            <Avatar src={get2User.avatar} className="contact-profile-avatar" />{" "}
          </div>
          <div className="contact-individual-container">
            <div className="contact-individual-name"> {get2User.userName} </div>
            {/* <div className="contact-individual-message">{contact.mssg}</div> */}
          </div>
        </div>
        <div className="new-mssg-badge" onClick={() => send(get2User?.user2Id, contact._id)}>Send </div>
      </div>
    );
  });


// console.log(contactList,"<<<<<<<<<<<<<<<<<<<<<")
  const onSave = async () => {
    try {
      if (toggelSave) {
        const result = await axios.patch(`${BACKEND}/save/unsave`, {
          userId: user._id,
          postId: postId,
        });
        if (result.data.success) {
          // dispatch({ type: USER_LOGGED_IN, payload: result.data.user });
          settoggelSave(false);
        }
      } else {
        const result = await axios.patch(`${BACKEND}/save`, {
          userId: user._id,
          postId: postId,
        });

        if (result.data.success) {
          // dispatch({ type: USER_LOGGED_IN, payload: result.data.user });
          settoggelSave(true);
        }
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const handleShareModal = () => {
    setsharemodalIsOpen(!sharemodalIsOpen);
  };

  const handleforwardModal = () => {
    setforwardmodalIsOpen(!forwardmodalIsOpen);
  };

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const handleComment = () => {
    if (cmmnt == true) {
      setCmmnt(false);
      // console.log(cmmnt);
    }
    if (cmmnt == false) {
      setCmmnt(true);
    }
  };

  const shareUrl = `${locationExact}`;

  const LikeThisPost = async () => {
    try {
      if (liked) {
        // console.log("going to dislike");
        const result = await axios.patch(`${BACKEND}/like/dislike`, {
          userId: user._id,
          postId: postId,
        });
        if (result.data.success) {
          setLiked(false);
        }
      } else {
        console.log("going to like");
        const result = await axios.patch(`${BACKEND}/like`, {
          userId: user._id,
          postId,
        });
        if (result.data.success) {
          await axios.post(`${BACKEND}/notification/likedBy/${user._id}/${postData._id}/LikedYourPost`)
          setLiked(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const postThisComment = async () => {
    // console.log(textInComment, "this is texgt in comment");
    // console.log("set comment");
    try {
      const result = await axios.post(`${BACKEND}/comment`, {
        text: textInComment,
        author: user._id,
        post: postId,
      });
      if (result.data.success) {
        // console.log(result.data.comment, "this is result");
        settextInComment(" ");
        setcommentToggle(!commentToggle);
        // setlikeComment(prev => { return { ...prev, [result.data.comment._id]: [] } })
        // setchangeStateOnSendComment(!changeStateOnSendComment)
      }
      // console.log(result.data)
    } catch (e) {
      console.log(e, "error while commenting");
    }
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  // console.log(postData?.body);

  const handlecmmtModal = () => {
    setcmmtMobModal(true);
  };
  let secondcontainer;
  if (cmmnt == false) {
    secondcontainer = (
      <div
        className="postdetail-container-body"
        dangerouslySetInnerHTML={createMarkup(postData?.body)}
      >
        {/* {draftToHtml(convertToRaw(editorState.getCurrentContent()))} */}

        {/* {postData?.body} */}
      </div>
      // {
      // <>
      // <h2>{postData?.body}</h2>
      // {postData}

      // <p>{postData?.body}</p>
      // </>
      // }
      // <textarea
      //   name="post-caption"
      //   id="post-caption"
      //   cols="20"
      //   rows="10"
      //   value={articleData.caption}
      //   onChange={e => setarticleData({ ...articleData, caption: e.target.value })}
      //   className="addpost-input-feilds"
      // ></textarea>
    );
  }
  if (cmmnt == true) {
    secondcontainer = (
      <div className="postdetail-container-comment">
        <div className="postdetail-container-comment-1">
          <div className="postdetail-container-comment-2-mobile">
            <div className="postdetail-container-comment-2-head">
              Write a comment..
            </div>
            <div className="postdetail-container-comment-2-textbox">
              <textarea
                name="comment-postdetail"
                id=""
                cols="30"
                rows="10"
                className="comment-textbox-mobile"
                onChange={(e) => {
                  settextInComment(e.target.value);
                }}
              ></textarea>
            </div>
            <div
              className="postdetail-container-comment-2-button-mobile"
              onClick={postThisComment}
            >
              Post Comment
            </div>
          </div>

          {(() => {
            {
              /* console.log("yes", commentInPost.length) */
            }
            return commentInPost.map((comment) => {
              // console.log(comment, "this is comment");
              {
                /* console.log(comment, "this") */
              }
              return (
                <div className="postdetail-container-comment-1-1">
                  <div className="postdetail-comment-avatar">
                    <Avatar src={comment?.author?.avatar} />
                  </div>
                  <div className="postdetail-comment-comment-box">
                    <div className="postdetail-comment-comment-box-username">
                      {comment.author.userName}
                    </div>
                    <div>{comment.text}</div>
                  </div>
                </div>
              );
            });
          })()}

          {/* <div className="postdetail-container-comment-1-1">
            <div className="postdetail-comment-avatar">
              <Avatar />
            </div>
            <div className="postdetail-comment-comment-box">
              <div className="postdetail-comment-comment-box-username">
                @username
              </div>
              <div>Lorem ipsum dolor, sit ame</div>
            </div>
          </div> */}
        </div>
        <div className="postdetail-container-comment-2 display-none-cmmt">
          <div className="postdetail-container-comment-2-head">
            Write a comment..
          </div>
          <div className="postdetail-container-comment-2-textbox">
            <textarea
              name="comment-postdetail"
              id=""
              cols="30"
              rows="10"
              className="comment-textbox"
              onChange={(e) => {
                settextInComment(e.target.value);
              }}
            ></textarea>
          </div>
          <div
            className="postdetail-container-comment-2-button"
            style={{ cursor: "pointer" }}
            onClick={postThisComment}
          >
            Post Comment
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="profile-container-upper"
      // style={{ backgroundColor: "lightgrey" }}
      >
        <div
          className="profile-container-upper-homeicon"
          style={{ flexDirection: "row", display: "flex" }}
        >
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            to="/homeScreen"
          >
            <IconButton className="iconbutton-profile">
              <HomeRoundedIcon />
            </IconButton>
          </Link>
          <div
            style={{
              marginLeft: "15px",
              fontSize: 23,
              fontWeight: "bold",
              marginTop: "6.5px",
            }}
          >
            Quink Post
          </div>
        </div>
      </div>
      <div className="postdetail-container">
        <div className="postdetail-container-upper">
          <div className="postdetail-container-upper-slider">
            <Slider {...settings} className="slider">
              <div className="slider-div">
                <img
                  src={postData?.image ? postData?.image : Quinkpost}
                  alt=""
                  className="slider-image"
                  style={{
                    maxWidth: "-webkit-fill-available",
                    width: "-webkit-fill-available",
                  }}
                />
              </div>
            </Slider>
          </div>
          <div className="postdetail-container-upper-info">
            <div className="postdetail-container-upper-info-1">
              {postData?.title}
            </div>
            <div className="postdetail-container-upper-info-2">
              <IconButton className="swipeButtons__like" onClick={LikeThisPost}>
                <FavoriteBorderOutlinedIcon fontSize="large" />{" "}
                <span className="no-span">{totalLikedPost}</span>
              </IconButton>
              <IconButton
                className="swipeButtons__comment"
                onClick={handleComment}
              >
                <ModeCommentOutlinedIcon fontSize="large" />{" "}
                <span className="no-span">{totalComment}</span>
              </IconButton>
              <IconButton>
                {/* {(())()}
                {toggelSave}?<SaveSharpIcon fontSize="large" color="white" />:<SaveOutlinedIcon fontSize="large" color="white" /> */}
                {(() => {
                  if (toggelSave) {
                    return (
                      <SaveSharpIcon
                        fontSize="large"
                        color="white"
                        onClick={onSave}
                      />
                    );
                  } else {
                    return (
                      <SaveOutlinedIcon
                        fontSize="large"
                        color="white"
                        onClick={onSave}
                      />
                    );
                  }
                })()}
              </IconButton>

              <IconButton
                className="swipeButtons__share"
                onClick={handleforwardModal}
              >
                <NearMeOutlinedIcon fontSize="large" color="primary" />
              </IconButton>

              <IconButton
                className="swipeButtons__share"
                onClick={handleShareModal}
              >
                <ShareOutlinedIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        </div>
        {secondcontainer}
      </div>
      <Modal isOpen={forwardmodalIsOpen} className="followers-modal">
        <div className="follower-modal-header">
          <div className="follower-modal-header-head">Foward the content</div>
          <div onClick={handleforwardModal}>
            <CancelOutlinedIcon style={{ fontSize: "20px" }} />
          </div>
        </div>
            { contactList}
      </Modal>

      <Modal isOpen={sharemodalIsOpen} className="followers-modal">
        <div className="follower-modal-header">
          <div className="follower-modal-header-head">Share the content</div>
          <div onClick={handleShareModal}>
            <CancelOutlinedIcon style={{ fontSize: "20px" }} />
          </div>
        </div>
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </WhatsappShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </TwitterShareButton>
          <TelegramShareButton url={shareUrl}>
            <TelegramIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </TelegramShareButton>
          <EmailShareButton url={shareUrl}>
            <EmailIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </EmailShareButton>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </FacebookShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </LinkedinShareButton>
          <LineShareButton url={shareUrl}>
            <LineIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </LineShareButton>
          <InstapaperShareButton url={shareUrl}>
            <InstapaperIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </InstapaperShareButton>
          <LivejournalShareButton url={shareUrl}>
            <LivejournalIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </LivejournalShareButton>
          <PinterestShareButton url={shareUrl}>
            <PinterestIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </PinterestShareButton>
          <RedditShareButton url={shareUrl}>
            <RedditIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </RedditShareButton>
          <FacebookMessengerShareButton url={shareUrl}>
            <FacebookMessengerIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </FacebookMessengerShareButton>
          <TumblrShareButton url={shareUrl}>
            <TumblrIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </TumblrShareButton>
          <ViberShareButton url={shareUrl}>
            <ViberIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </ViberShareButton>
          <VKShareButton url={shareUrl}>
            <VKIcon
              size={30}
              style={{ marginLeft: "12px", marginTop: "10px" }}
            />
          </VKShareButton>
        </div>
        {/* <div>
          {contactList}
        </div> */}
      </Modal>
    </div>
  );
}

export default Postdetail;
