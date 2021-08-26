import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import "../../Styles/Communitypost/communitymainpost.css";

function Communitymainpost({ posts }) {
  // console.log(posts,"this is in community mainpost")
  // const [communityinnerpost, setCommunityInnerPost] = useState([
  //   {
  //     displayname: "Display Name",
  //     username: "@ussername",
  //     caption:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi adipisci quibusdam cumque amet!",
  //     imagesrc: "Profile",
  //   },
  //   {
  //     displayname: "Display Name",
  //     username: "@ussername",
  //     caption:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi adipisci quibusdam cumque amet!",
  //     imagesrc: "Profile",
  //   },



  // ]);
  const [cmmt, setcmmt] = useState(false);
  let communityInnerPost = posts?.map((post, index) => {
    return (
      <div>
        <div
          className={`communitymain-post-container ${cmmt && "display-cmmt-none"
            }`}
        >
          <div className="communitymain-profile-1">
            <Avatar src={post?.author?.avatar} />
            <div className="communitymain-user">
              <p className="communitymain-displayname">{post?.author?.userName}</p>
              <p className="communitymain-username">{post.title
              }</p>
            </div>
          </div>
          <div className="communitymain-image">
            <img src={post?.image} alt="" />
          </div>
          <div className="communitymain-post-info">
            <div className="communitymain-caption question">{post.body}</div>
            <div className="communitymain-header">
              {/* <div className="Communitymain-icons">
                <FavoriteBorderIcon className="Communitymain-icons-icon" />
                {post?.likedBy?.length}
              </div> */}
              {/* <div className="Communitymain-icons" onClick={handleClick}>
                <ModeCommentOutlinedIcon />
                {post?.comment?.length}
              </div> */}
            </div>
          </div>
        </div>
        <div
          className={`communitymain-post-container ${!cmmt && "display-cmmt-none"
            }`}
        >
          <div className="communitymain-caption question">{post.caption}</div>
          {/* <div className="community-comment-header">
            <div>Comments</div>{" "}
            <div onClick={handleClick1}>
              {" "}
              <CancelIcon />
            </div>
          </div> */}
          {/* <div className="Comment-Box">{commentList}</div>
          <div>
            <textarea
              name="write"
              id=""
              cols="30"
              rows="10"
              placeholder="Write Commment"
              className="community-main-post-cmmt"
            ></textarea>
          </div>
          <div className="post-cmmt-btn"> Post</div> */}
        </div>
      </div>
    );
  });
  return <div>{communityInnerPost}</div>;
}

export default Communitymainpost;
