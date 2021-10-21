// import React from "react";
// import "../Styles/communitypost.css";
// import "../Styles/challengepost.css";
// import Quinkpost from "../Assets/Quinkpost.jpg";
// import { Avatar } from "@material-ui/core";
// import PersonIcon from "@material-ui/icons/Person";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// function Challengepost({ challenge }) {
//   console.log(challenge);
//   const end = challenge?.duration.end;
//   const challengeId = challenge?._id;
//   const checkLogin  = useSelector(state => state.user)
//   return (
//     <div className="challenge-container">
//       <div className="community-header">
//         <Avatar src={Quinkpost} className="community-avatar" />
//         <div className="community-title">Quink Post Challenge</div>
//       </div>
//       <img src={challenge.image ? challenge?.image : Quinkpost} style={{ height: "35rem", width: "100%" }} />
//       <div className="join-community">
//         <div className="members">
//           <PersonIcon />
//           Participants :<div className="members-no">{parseInt(challenge?.participants?.length) + parseInt(104)}</div>
//         </div>
//         <Link to={{ pathname: (checkLogin != null)?`/challeng/${challenge?.title}/${challengeId}/participate`:"/login"  }} style={{ textDecoration: "none", color: "#282c37" }}>
//           <div className="community-readmore">Enter</div>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Challengepost;

import React, { useState } from "react";
import "../Styles/challengepost.css";
import Carousel from "react-elastic-carousel";
import Modal from "react-modal";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Challengepost({ challenge }) {
  const [leadermodal, setleadermodal] = useState(false);
  const checkLogin = useSelector((state) => state.user);
  const onHandleader = () => {
    setleadermodal(!leadermodal);
  };
  console.log(challenge, "-----------------------")

  return (
    <>
      <div class="wrapper-card-main">
        <div class="card-chall">
          <img
            // src="https://i.ytimg.com/vi/-IIGJgQQYtM/maxresdefault.jpg"
            src={challenge.image}
            style={{ objectFit: "contain" }}
            alt=""
          />
          <div class="descriptions-chall">
            <h1>{challenge.name}</h1>
            <p>{challenge.description}</p>
            <button onClick={onHandleader}>Participate and Win</button>
          </div>
        </div>
      </div>


      <Modal isOpen={leadermodal} className="leaderboard-modal">
        {/* <div className="follower-modal-header-head">Leaderboard</div> */}
        <div
          className="leaderboard-modal-body-main"
          style={{ height: "100%", overflow: "auto" }}
        >
          <div className="follower-modal-header">
            <div className="follower-modal-header-head">Leaderboard</div>
            <div onClick={onHandleader}>
              <CancelOutlinedIcon style={{ fontSize: "20px" }} />
            </div>
          </div>
          <Link
            to={{
              pathname:
                checkLogin != null
                  ? `/challenge/${challenge?.title.replace(/ /g,"-")}/${challenge._id}`
                  : "/login",
            }}
            style={{
              textDecoration: "none",
              color: "#282c37",
              textAlign: "center",
            }}
          >
            <div className="community-readmore">Participate</div>
          </Link>
          <body className="body-leaderboard">
            <div className="container-mod-leader shoe">
              <div className="productImage shoeImg"></div>
              <div className="size shoeSize">
                <h4 style={{ marginTop: "10px" }}>Prizes</h4>
                <ul style={{ marginLeft: "20px" }}>
                  <li style={{ fontSize: "10px" }}>Partcipation Certificate</li>
                  <li style={{ fontSize: "10px" }}>
                    Paid Content Creation Projects
                  </li>
                  <li style={{ fontSize: "10px" }}>Original Merchandize</li>
                </ul>
              </div>
              <div className="price shoePrice">
                <h4>Additional</h4>
                <span style={{ fontSize: "12px" }}>Get Featured in <br /> Q-Magazine</span>
              </div>
              <div className="color shoeColor">
                <h4>Rank</h4>
                <ul>
                  <li>
                    <span className="blue">#1</span>
                  </li>
                  <li>
                    <span className="yellow">#2</span>
                  </li>
                  <li>
                    <span className="red">#3</span>
                  </li>
                </ul>
              </div>
              <div className="productName shoeName" style={{ marginLeft: "65px" }}>OFFERING</div>
            </div>

            {/* <button >Participate</button> */}
            <div>
              <div
                style={{
                  fontSize: "1.5rem",
                  color: "#212121",
                  marginBottom: "35px",
                  textDecoration: "underline",
                }}
              >
                KNOW YOUR COMPETITOR
              </div>
              <div>
                {(() => {
                  return challenge.participants.map((part) => {
                    return (
                      <Link
                        to={{ pathname: `/user/${part.userName}/${part._id}` }}
                      >
                        <div
                          style={{
                            display: "flex",
                            background: "rgba(255,255,255,0.5)",
                            marginTop: "1rem",
                            boxShadow: "5px 5px 15px rgb(0 0 0 / 40%)",
                            padding: "12px",
                            borderRadius: "15px",
                          }}
                        >
                          <img
                            src={part.avatar}
                            style={{
                              objectFit: "contain",
                              borderRadius: "50%",
                              height: "2.5rem",
                              width: "2.5rem",
                            }}
                          />
                          <div
                            style={{
                              color: "#7b7878",
                              marginLeft: "15px",
                              alignSelf: "center",
                            }}
                          >
                            {part.userName}
                          </div>
                        </div>
                      </Link>
                    );
                  });
                })()}
              </div>
            </div>
          </body>
        </div>
      </Modal>
    </>
  );
}

export default Challengepost;
