import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/editprofile.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import profileimage from "../Assets/colour.jpg";
import { useDispatch } from "react-redux"
import {USER_LOGGED_IN} from "./Reducer/Action"
import BACKEND from "./Constants/Backend"
import { useSelector } from "react-redux"
import axios from "axios"

// import BACKEND from "."

function Editprofile() {
  const globalState = useSelector(state => state)
  const dispatch = useDispatch()

  // const [image, setimage] = useState();
  const [formData, setformData] = useState({});

  const editMyProfile = async () => {
    console.log("ok you are here now");
    //
    try {
      const result = await axios.patch(`${BACKEND}/user/update`, {
        userId: globalState?.user._id,
        userName: formData?.userName,
        firstName: formData?.firstName,
        bio: formData?.bio,
        avatar: formData?.image
      })
      if (result.data.success) {
        console.log(result.data)
        dispatch({ type: USER_LOGGED_IN, payload: result.data.user })

      }
    } catch (e) { console.log(e) }

  };

  const handleImage = async (imageAdd) => {
    try {
      console.log(imageAdd, "handle image called");
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
          setformData({ ...formData, image: data.url });
        })
        .catch((e) => console.log(e, "error from the n catch"));
    } catch (e) {
      console.log(e, "error while sending in cloudinary");
    }
  };

  return (
    <div className="editprofile-container">
      <div className="editprofile-container-upper">
        <div className="editprofile-container-upper-heading">Edit-profile</div>
        <div className="editprofile-container-upper-homeicon">
          <Link to="/profile">
            <IconButton className="iconbutton-editprofile">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="secondary-editprofile-container">
        <div className="edit-profile-image-container">
          <div className="secondary-editprofile-container-1">Profile Image</div>
          <div className="secondary-editprofile-container-2">
            <div className="secondary-2-edit-profile-image">
              <div className="secondary-2-edit-profile-image-1">
                <div
                  className="editprofile-profile-image-img"
                  style={{ backgroundImage: `url(${formData?.image})` }}
                ></div>
                <input type="file" onChange={(e) => handleImage(e.target.files)} />
              </div>
              <div className="secondary-2-edit-profile-image-2">
                <div className="upload-new-image-editprofile">
                  Upload New Image
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="editname-container">
          <div className="secondary-editprofile-container-1">Display Name</div>
          <div className="secondary-editprofile-container-2">
            <input
              type="text"
              value={formData?.firstName}
              onChange={(e) =>
                setformData({ ...formData, firstName: e.target.value })
              }
              className="editprofile-textinputbox"
            />
          </div>
        </div>
        <div className="editname-container">
          <div className="secondary-editprofile-container-1">Username</div>
          <div className="secondary-editprofile-container-2">
            <input
              type="text"
              className="editprofile-textinputbox"
              value={formData?.userName}
              onChange={(e) =>
                setformData({ ...formData, userName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="editbio-container">
          <div className="secondary-editprofile-container-1">Bio</div>
          <div className="secondary-editprofile-container-2">
            <textarea name="bio-textarea" className="bio-textarea"></textarea>
          </div>
        </div>
        <div className="editname-container">
          <div className="secondary-editprofile-container-1">Email</div>
          <div className="secondary-editprofile-container-2">
            <input type="text" className="editprofile-textinputbox" />
          </div>
        </div>
        <div className="editname-container">
          <div className="secondary-editprofile-container-1">Phone Number</div>
          <div className="secondary-editprofile-container-2">
            <input type="text" className="editprofile-textinputbox" />
          </div>
        </div>
        <div className="editname-container">
          <div className="secondary-editprofile-container-1">Language</div>
          <div className="secondary-editprofile-container-2">
            <select
              id="language"
              name="language-select"
              className="editprofile-language-type-select"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>
        <div className="editname-container">
          <div className="secondary-editprofile-container-1">Gender</div>
          <div className="secondary-editprofile-container-2">
            <select
              id="gender"
              name="gender-select"
              className="editprofile-language-type-select"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="savechanges-container">
          <div className="savechanges-button" onClick={() => console.log("ok")} >
            Save chang
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;
