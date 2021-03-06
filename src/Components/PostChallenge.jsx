import React, { useState } from "react";
import "../Styles/addpost.css";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import Carousel from "react-elastic-carousel";
import profile from "../Assets/profile.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BACKEND from "./Constants/Backend";
import axios from "axios";

function PostChallenge(props) {
  // console.log(props.match)
  const challengeId = props.match.params.challengeId;
  const globalState = useSelector((state) => state);
  console.log(props, "<<<<<<<<<<<<<<<<<<<<<<<");
  const [article, setArticle] = useState(true);
  const [image, setimage] = useState("");
  const [articleImage, setarticleImage] = useState("");
  const [articleData, setarticleData] = useState({
    title: "",
    body: "",
    caption: "",
  });
  const [imageData, setimageData] = useState({});

  const handleImage = async (imageAdd) => {
    // console.log("this is image add >>>>>>",imageAdd)

    try {
      console.log(imageAdd, "handle image called");
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
          setimage(data.secure_url);
        })
        .catch((e) => console.log(e, "error from the n catch"));
    } catch (e) {
      console.log(e, "error while sending in cloudinary");
    }
  };
  const handleImageArticle = async (imageAdd) => {
    // console.log("this is image add >>>>>>",imageAdd)
    try {
      console.log(imageAdd, "handle image called");
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
  const submitWithImage = async (e) => {
    try {
      // console.log(title.type)
      const result = await axios.post(
        `${BACKEND}/challenge/participate`,
        {
          author: globalState.user._id,
          challengeId: props.location.state.challengeId,
          title: imageData.title,
          caption: imageData.caption,
          image: image,
          // body: articleData.body,
          type: "MEME",
        }
      );
      console.log(result.data);
      // if
    } catch (e) {
      console.log(e);
    }
  };

  const submitArticle = async (e) => {
    try {
      // e.preventDefault()
      // console.log(title.type)

      console.log(articleData, "this is article data");
      const result = await axios.post(`${BACKEND}/challenge/participate`, {
        author: globalState.user._id,
        challengeId: challengeId,
        title: articleData.title,
        body: articleData.body,
        image: articleImage,
        caption: articleData.caption,
        type: "ARTICLE",
      });
      console.log(result.data, "**************");
      if (result.data.success) {
        alert("Successfully submited post");
      } else {
        alert("something problem while submititng post");
      }
    } catch (e) {
      console.log(e);
      alert("error while submit");
    }
  };

  let postForm;
  console.log(image, "<<<< this is image Add");
  if (article == true) {
    postForm = (
      <div className="addpost-form-div">
        <form className="addpost-form" onSubmit={submitArticle}>
          <div className="posttype-div" style={{ marginBottom: "10px" }}>
            <label htmlFor="post-type" className="form-post-type-label" style={{ marginBottom: "10px" }}>
              Choose a Post label:
            </label>
            <select
              id="post-type"
              name="posttype"
              className="form-post-type-select"
            >
              <option value="Health">Health and Fitness</option>
              <option value="Fashion">Fashion</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Learning">Learning</option>
            </select>
          </div>
          <div style={{ flexDirection: "row", textAlign: "center" }}>
            <label htmlFor="upload-image">
              Upload Image related to content:
            </label>
            <input
              id="upload-image"
              type="file"
              onChange={(e) => handleImageArticle(e.target.files)}
            />
          </div>
          {/* <button id="upload-image">Upload Image</button> */}
          <Carousel className="image-carousel">
            <img
              src={
                articleImage
                  ? articleImage
                  : "https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
              }
              alt=""
              className="carousel-image"
            />
            <img src={profile} alt="" className="carousel-image" />
          </Carousel>
          <label htmlFor="heading">Post title:</label>
          <input
            type="text"
            id="heading"
            className="addpost-input-feilds"
            value={articleData.title}
            onChange={(e) =>
              setarticleData((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
          />
          <label htmlFor="caption">Post Caption:</label>
          <textarea
            name="post-caption"
            id="post-caption"
            cols="20"
            rows="10"
            value={articleData.caption}
            onChange={(e) =>
              setarticleData((prev) => {
                return { ...prev, caption: e.target.value };
              })
            }
            className="addpost-input-feilds"
          ></textarea>
          <label htmlFor="caption">Post Body:</label>
          <textarea
            name="post-caption"
            id="post-caption"
            cols="40"
            rows="10"
            value={articleData.body}
            onChange={(e) =>
              setarticleData((prev) => {
                return { ...prev, body: e.target.value };
              })
            }
            className="addpost-input-feilds"
          ></textarea>
          <button className="post-final-button" type="submit">
            Post Content
          </button>
        </form>
      </div>
    );
  }
  if (article == false) {
    postForm = (
      <div className="addpost-form-div">
        <form className="addpost-form">
          <div className="posttype-div">
            <label htmlFor="post-type" className="form-post-type-label">
              Choose a Post label:
            </label>
            <select
              id="post-type"
              name="posttype"
              className="form-post-type-select"
            >
              <option value="Health">Health and Fitness</option>
              <option value="Fashion">Fashion</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Learning">Learning</option>
            </select>
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <label htmlFor="upload-image">
              Upload Image related to article:
            </label>
            {/* <button id="upload-image" >Upload Image</button> */}
            <input
              id="upload-image"
              type="file"
              onChange={(value) => {
                // console.log(value)
                handleImage(value.target.files);
              }}
            />
          </div>
          {/* <button id="upload-image" >Upload Image</button> */}
          <Carousel className="image-carousel">
            <img src={image} alt="" className="carousel-image" />
            <img src={profile} alt="" className="carousel-image" />
          </Carousel>
          <label htmlFor="caption">Post Caption:</label>
          <textarea
            name="post-caption"
            value={imageData.caption}
            onChange={(e) =>
              setimageData({ ...imageData, caption: e.target.value })
            }
            id="post-caption"
            cols="20"
            rows="10"
            className="addpost-input-feilds"
          ></textarea>
          <button className="post-final-button" onClick={submitWithImage}>
            Post Image
          </button>
        </form>
      </div>
    );
  }
  const handleTypeClick1 = () => {
    setArticle(true);
  };
  const handleTypeClick2 = () => {
    setArticle(false);
  };
  return (
    <div className="addpost-container">
      <div className="addpost-header">
        <div className="addpost-title">Create Post</div>
        <div className="cancel-addpost">
          <Link to="/" className="cancel-icon-addpost">
            <CancelOutlinedIcon style={{ fontSize: 32 }} />
          </Link>
        </div>
      </div>
      {/* <div className="addpost-type">
        <div
          className={`post-type-toggle ${article && "post-type-active"}`}
          onClick={handleTypeClick1}
        >
          Article
        </div>
        <div
          className={`post-type-toggle ${!article && "post-type-active"}`}
          onClick={handleTypeClick2}
        >
          Image
        </div>
      </div> */}
      <div>{postForm}</div>
    </div>
  );
}

export default PostChallenge;
