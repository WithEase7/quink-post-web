import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import DOMPurify from "dompurify";
import Quinkpost from "../Assets/Quinkpost.jpg";
import BACKEND from "./Constants/Backend"
import axios from "axios";
function OriginalsDetial(props) {
  const postId = props.match.params.postId;
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const [Post, setPost] = useState({})
  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get(`${BACKEND}/admin/${postId}`)
        const adminPost = data?.adminPost
        console.log(data, "Original")
        setPost(adminPost[0])
      })()
    } catch (e) { console.log(e) }
  }, [])


  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
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
              {/* <div className="slider-div"> */}
              <img
                src={(Post?.image) ? Post?.image : Quinkpost}
                alt=""
                className="slider-image"
                style={{
                  maxWidth: "-webkit-fill-available",
                  width: "-webkit-fill-available",
                }}
              />
              <img
                src={Quinkpost}
                alt=""
                className="slider-image"
                style={{
                  maxWidth: "-webkit-fill-available",
                  width: "-webkit-fill-available",
                }}
              />
              {/* </div> */}
            </Slider>
          </div>
          <div className="postdetail-container-upper-info">
            <div className="postdetail-container-upper-info-4">
              {Post?.title}
            </div>
          </div>
        </div>
        <div className="postdetail-container-body">
          <div
            className="postdetail-container-body"
            dangerouslySetInnerHTML={createMarkup(Post?.body)}
          ></div>
        </div>
      </div>
    </>
  );
}

export default OriginalsDetial;
