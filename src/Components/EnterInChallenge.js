import React, { useState } from "react";
import "../Styles/addpost.css";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import Carousel from "react-elastic-carousel";
import profile from "../Assets/profile.jpg";

import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BACKEND from "./Constants/Backend";
import axios from "axios";
// import TextEditorpost from "./TextEditorpost";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../Styles/TextEditorPost.css";

function PostChallenge(props) {
    const history = useHistory();

    const globalState = useSelector((state) => state);
    const challengeId = props.match.params.challengeId;
    const challengeName = props.match.params.challengeName
    console.log(props, "<<<<<<<<<<<<<<<<<<<<<<<");
    const [article, setArticle] = useState(true);
    const [image, setimage] = useState("");
    const [articleImage, setarticleImage] = useState("");
    const [articleData, setarticleData] = useState({});
    const [imageData, setimageData] = useState({});
    const [selectedValue, setselectedValue] = useState("SELECT");
    const [showLoader, setshowLoader] = useState(false)
    const [lang, setLang] = useState("Select")

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };
    const convertContentToHTML = () => {
        // {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        let currentContentAsHTML = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
        );
        setConvertedContent(currentContentAsHTML);
    };
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html),
        };
    };

    const uploadImageCallBack = (imageAdd) => {
        // console.log(file, "thsii is file")

        return new Promise((resolve, reject) => {

            console.log(imageAdd, "handle image called");
            // console.log("handleUpload called")
            const data = new FormData();
            data.append("file", imageAdd);
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
                    // setimage(data.secure_url);
                    resolve({ data: { link: data.secure_url } })
                    // resolve(data.url)
                    console.log(data.url, "<<<<<<<thii si rurl")



                    //   const xhr = new XMLHttpRequest();
                    //   xhr.open(
                    //     "POST",
                    //     "https://api.cloudinary.com/v1_1/quink-post/image/upload "
                    //   ).then(res=>{console.log(res)});
                    //   xhr.setRequestHeader("Authorization", "Client-ID quinkpost");
                    //   const data = new FormData();
                    //   data.append("image", file);
                    //   xhr.send(data);
                    //   // console.log(xhr, "<<<<")
                    //   xhr.addEventListener("load", () => {
                    //     const response = JSON.parse(xhr.responseText);
                    //     console.log(response, "<<<<<<");
                    //     resolve({ data: { link: response.url } })
                    //   });
                    //   xhr.addEventListener("error", () => {
                    //     const error = JSON.parse(xhr.responseText);
                    //     console.log(error);
                    //     reject(error);
                    //   });
                });
        })
    }
    // try {
    //   console.log(imageAdd, "handle image called");
    //   // console.log("handleUpload called")
    //   const data = new FormData();
    //   data.append("file", imageAdd);
    //   data.append("upload_preset", "quinkpost");
    //   data.append("cloud_name", "Quink-Post");
    //   console.log("before cloud post");

    //   fetch("https://api.cloudinary.com/v1_1/quink-post/image/upload", {
    //     method: "post",
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data, "this is data from cloudinakdfj");
    //       // setimage(data.secure_url);
    //       resolve(data.url)
    //       console.log(data.url, "<<<<<<<thii si rurl")
    //       // return data.url
    //     })
    //     .catch((e) => console.log(e, "error from the n catch"));
    // } catch (e) {
    //   console.log(e, "error while sending in cloudinary");
    // }
    // };

    const handleImage = async (imageAdd) => {
        // console.log("this is image add >>>>>>",imageAdd)
        try {
            console.log(imageAdd[0], "handle image called", imageAdd);
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
    const submitWithImage = async () => {
        try {
            // console.log({title,description})
            const result = await axios.post(`${BACKEND}/post/upload`, {
                author: globalState.user._id,
                title: " ",
                //   body: description,
                type: "MEME",
                caption: imageData.caption,
                image: image,
            });
            if (result.data.success) {
                console.log("success");
            }
        } catch (e) {
            console.log(e);
        }
    };
    console.log(selectedValue, "<<<<");
    const submitArticle = async (e) => {
        try {
            setshowLoader(true)
            const checkvalue = window.confirm("ARE YOU SURE ,YOU WANT TO SUBMIT YOUR CONTENT.")
            e.preventDefault();
            if (articleData.caption.length > 150) {
                setshowLoader(false)
                return alert("caption should be less than 150 characters")
            }
            if (checkvalue) {

                // console.log(articleData, "{{{{{{{{{{{{{{{{{{{");
                // console.log({ title, description })
                const result = await axios.post(`${BACKEND}/challenge/participate`, {
                    author: globalState.user._id,
                    title: articleData.title,
                    challengeId: challengeId,
                    body: convertedContent,
                    lang: lang,
                    type: selectedValue,
                    caption: articleData.caption,
                    image: articleImage,
                    isChallengePost: true
                });
                if (result.data.success) {
                    console.log(result.data, "<<<<{{{");
                    console.log("success");
                    setConvertedContent(null)
                    setarticleData({ title: "", caption: "" })
                    setshowLoader(false)
                    history.push("/");
                } else {
                    setshowLoader(false)
                    alert("Fill your content correctly something is missing ??")
                }
            }


        } catch (e) {
            console.log(e);
        }
    };

    console.log(convertedContent);

    let postForm;
    console.log(image, "<<<< this is image Add");
    if (article == true) {
        postForm = (
            <div className="addpost-form-div">

                <form className="addpost-form">
                    <div className="posttype-div">
                        <label htmlFor="post-type" className="form-post-type-label">
                            Choose a content label:
                        </label>
                        <select
                            id="post-type"
                            name="posttype"
                            className="form-post-type-select"
                            // onSelect={value => setselectedValue(value)}
                            onChange={(value) => setselectedValue(value.target.value)}
                        >
                            <option value="SELECT">Select</option>
                            <option value="ARTICLE">Article</option>
                            <option value="POEM">Poem</option>
                            <option value="SHAYARI">Shayari</option>
                            <option value="STORY">Story</option>
                            <option value="MEME">Meme</option>
                        </select>
                        <div className="posttype-div">
                            <label htmlFor="post-type" className="form-post-type-label">
                                Select Language:
                            </label>
                            <select
                                id="post-type"
                                name="Lannguage"
                                className="form-post-type-select"
                                // onSelect={value => setselectedValue(value)}
                                onChange={(value) => setLang(value.target.value)}
                            >
                                <option value="Select">Select</option>
                                <option value="English">ENGLISH</option>
                                <option value="Hindi">HINDI</option>
                                {/* <option value="SHAYARI">Shayari</option>
                            <option value="STORY">Story</option>
                            <option value="MEME">Meme</option> */}
                            </select>
                        </div>
                    </div>
                    <div style={{ flexDirection: "row", alignSelf: "center", textAlign: "center" }}>
                        <label htmlFor="upload-image" style={{ display: "inline-flex", marginTop: "10px" }}>
                            Upload cover image related to your content (helps in better
                            reach):
                        </label>
                        <input
                            type="file"
                            id="upload-image"
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
                    <label htmlFor="heading">Title:</label>
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
                    <label htmlFor="caption">Caption:</label>
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
                    {/* {(() => {
            if (selectedValue != "MEME") {
              return (
                <>
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
                </>
              );
            }
          })()} */}
                    {/* <TextEditorpost /> */}
                    {selectedValue != "MEME" ? (<>
                        <label htmlFor="body" style={{ marginBottom: "10px" }}>Body:</label>
                        <div className="App">
                            {/* <header className="App-header">Rich Text Editor Example</header> */}
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={handleEditorChange}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                toolbar={{
                                    image: {
                                        uploadCallback: uploadImageCallBack,
                                        alt: { present: true, mandatory: false },
                                    },
                                }}
                            />
                            {/* <div
              className="preview"
              dangerouslySetInnerHTML={createMarkup(convertedContent)}
            >
            </div> */}
                        </div></>) : null}

                    <div style={{ alignItems: "center", textAlign: "center" }}>
                        <Loader
                            visible={showLoader}
                            type="MutatingDots"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                    </div>

                    <button className="post-final-button" onClick={submitArticle}>
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
                    <div style={{ flexDirection: "row" }}>
                        <label htmlFor="upload-image">
                            Upload Image related to article:
                        </label>
                        {/* <button id="upload-image" >Upload Image</button> */}
                        <input
                            type="file"
                            id="upload-image"
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
                <div className="addpost-title">{challengeName}</div>
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
