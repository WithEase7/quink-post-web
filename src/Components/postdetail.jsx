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
import Modal from "react-modal";
import BACKEND from "./Constants/Backend"
import axios from "axios";
import { withRouter } from "react-router";
import { connect,useSelector } from "react-redux";


function Postdetail(props) {
  const postId=props.match.params.postId
  const user=useSelector(state=>state.user)
  const [postData,setpostData] = useState()
  const [cmmtMobModal, setcmmtMobModal] = useState(false);
  const [cmmnt, setCmmnt] = useState(false);
  const [commentInPost, setcommentInPost] = useState([])
  const [likeComment, setlikeComment] = useState([])
  const [totalComment, settotalComment] = useState("...")
  const [totalLikedPost, settotalLikedPost] = useState("...")
  const [liked, setLiked] = useState(false)
  const [textInComment, settextInComment] = useState("")
  const [commentToggle, setcommentToggle] = useState(false)
  useEffect(() => {
    (async () => {
      try {
        const getPostData=await axios.get(`${BACKEND}/post/open/${postId}`)
        // console.log(getPostData.data.post.body,"***********")
    const postBody=getPostData.data.post.body
    // console.log(postBody)
    // console.log(postBody.search("+"),"this is split")
        // console.log("called like")
        await setpostData(getPostData.data.post)

        console.log(postData,"this is post Data")

        const resultLikedPost = await axios.post(`${BACKEND}/like/checkIsLiked`, {
          userId: user._id,
          postId: postId
        })
        if (resultLikedPost.data.success) {
          console.log(resultLikedPost.data,"this is result from backend")

          setLiked(resultLikedPost.data.islikedBy)
          settotalLikedPost(resultLikedPost.data.length)
        }
        else { settotalLikedPost(resultLikedPost.data.length) }
      } catch (e) { console.log(e, "error") }

    })()

  }, [liked])

  useEffect(async () => {
    const result = await axios.get(`${BACKEND}/comment/inPost/${postId}`)
    // console.log(result);
    setcommentInPost(result.data.comments.reverse())
    result.data.comments.map(comment => {
      return setlikeComment(prev => {
        return { ...prev, [comment._id]: comment.likedBy }
      })
    })
    // settotalLikedPost(postData.likedBy.length)
    settotalComment(result.data.comments.length)
  }, [, commentToggle])



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

  const LikeThisPost = async () => {
    try {
      if (liked) {
        console.log("going to dislike")
        const result = await axios.patch(`${BACKEND}/like/dislike`, {
          userId: user._id,
          postId: postId
        })
        if (result.data.success) {

          setLiked(false)
        }
      }
      else {
        console.log("going to like")
        const result = await axios.patch(`${BACKEND}/like`, {
          userId: user._id,
          postId
        })
        if (result.data.success) {
          setLiked(true)

        }
      }
    } catch (e) { console.log(e) }
  }


  const postThisComment = async () => {
    console.log(textInComment, "this is texgt in comment")
    console.log("set comment")
    try {
      const result = await axios.post(`${BACKEND}/comment`, {
        text: textInComment,
        author: user._id,
        post: postId
      })
      if (result.data.success) {
        console.log(result.data.comment, "this is result")
        settextInComment(" ")
        setcommentToggle(!commentToggle)
        // setlikeComment(prev => { return { ...prev, [result.data.comment._id]: [] } })
        // setchangeStateOnSendComment(!changeStateOnSendComment)
      }
      // console.log(result.data)
    } catch (e) { console.log(e, "error while commenting"); }
  }


  const handlecmmtModal = () => {
    setcmmtMobModal(true);
  };
  let secondcontainer;
  if (cmmnt == false) {
    secondcontainer = (
      <div className="postdetail-container-body">
        {postData?.body}
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
                onChange={(e) => { settextInComment(e.target.value) }}
              ></textarea>
            </div>
            <div className="postdetail-container-comment-2-button-mobile" onClick={postThisComment}>
              Post Commen
            </div>
          </div>

          {(() => {
            {/* console.log("yes", commentInPost.length) */ }
            return commentInPost.reverse().map(comment => {
              {/* console.log(comment, "this") */ }
              return <div className="postdetail-container-comment-1-1">
                <div className="postdetail-comment-avatar">
                  <Avatar />
                </div>
                <div className="postdetail-comment-comment-box">
                  <div className="postdetail-comment-comment-box-username">
                    {comment.author.userName}
                  </div>
                  <div>{comment.text}</div>
                </div>
              </div>
            })
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
              onChange={(e) => { settextInComment(e.target.value) }}
            ></textarea>
          </div>
          <div className="postdetail-container-comment-2-button" style={{ cursor: "pointer" }} onClick={postThisComment}>
            Post Comment
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="postdetail-container">
      <div className="postdetail-container-upper">
        <div className="postdetail-container-upper-slider">
          <Slider {...settings} className="slider">


                <div className="slider-div">
                  <img src={postData?.image} alt="" className="slider-image" style={{maxWidth: '-webkit-fill-available', width: '-webkit-fill-available'}} />
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
            <IconButton className="swipeButtons__share">
              <NearMeOutlinedIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
      {secondcontainer}
    </div>
  );
}

export default Postdetail;
