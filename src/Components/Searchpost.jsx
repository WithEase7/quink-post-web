import React, { useState, useEffect } from "react";
import Profile from "../Assets/colour.jpg";
import { Avatar } from "@material-ui/core";
import "../Styles/post.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const SearchPost = ({ search }) => {
  console.log("thisi  is searchPost")
  // const globalState = useSelector(state => state)
  // console.log(globalState)
  // console.log(globalState, "this is user")
  const [Feed, setFeed] = useState([])
  // const [globalState, setglobalState] = useState({})
  const globalState = useSelector(state => state)
  // console.log(globalState)
  useEffect(() => {
   
  }, []);

  const [details, setDetails] = useState(true);

  let postList = Feed?.map((post, index) => {
    console.log(post, "thsi is post feed list>>>>>>>>>>>>>>>>>>>>>>>>>")
    
    const handleclick = () => {
      if (details === false) {
        setDetails(true);
      } else {
        setDetails(false);
      }
    };
    if (details === true) {
      console.log("insidei if state")
      return (
        <div className="post-container">
          <div className="profile-1">
            <Link to={{ pathname: "/profileOther", state: { author: post?.author, globalState } }}>    <Avatar src={post?.author?.avatar ? post?.author?.avatar : Profile} /></Link>
            <div className="user">
              <p className="displayname">{(() => { if (post.author) { return post?.author.userName } else { return "Loading..." } })()}</p>
              <p className="username">{(() => { if (post.author) { return post?.author.firstName } else { return "Loading..." } })()}</p>
            </div>
          </div>
          <div  >
            {/* <Link to="/postDetails"> <img src={post.image} alt=""  /></Link> */}
            <Link to={{
              // pathname: `/post/${post?.author?.userName}/${post.title.replace(/ /g,"-")}/${post._id}`,
              pathname: `/${post.title.replace(/ /g,"-")}/${post._id}`,
              state: { post, user: globalState }
            }} className="image" ><img src={post.image} alt="" /></Link>
          </div>
          <div className="post-info">
            <div className="header">{post.title}</div>
            <div className="caption">{post.caption}</div>
          </div>
          <div className="readmore" onClick={handleclick}>
            Read
          </div>
        </div>
      );
    } else {
      console.log(post,"thsi is in else sttate")
      return (
        <div className="post-container">
          <div className="profile-1">
            <Avatar src={Profile} />
            <div className="user">
              <p className="displayname">{post.displayName}</p>
              <p className="username">{post.username}</p>
            </div>
          </div>
          <div className="image">
            <img src={Profile} alt="" />
          </div>
          <div className="post-info">
            <div className="header">{post.header}</div>
            <div className="caption">{post.body}</div>
          </div>
          <div className="readmore" onClick={handleclick}>
            Done
          </div>
        </div>
      );
    }
  });

  return <div>{postList}</div>;
}

export default SearchPost;
