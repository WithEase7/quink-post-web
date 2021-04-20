import React, { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../Assets/colour.jpg";
import { Avatar } from "@material-ui/core";
import "../Styles/post.css";
import BACKEND from "./Constants/Backend"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SEARCH_POST } from "./Reducer/Action"
const Post = (props) => {
  // console.log("POST Ok IS IN SCREEN")
  // console.log(props.post, "thsi is post in post ")
  // console.log(props?.post, "this i spost in post screen")
  const globalState = useSelector(state => state)
  const dispatch = useDispatch()
  // console.log(globalState)
  // console.log(globalState, "this is user")
  const [currState, setcurrState] = useState("FEED")
  const [Feed, setFeed] = useState([])
  const [Meme, setMeme] = useState([])
  const [Article, setArticle] = useState([])
  const [Story, setStory] = useState([])
  const [value, setValue] = useState(false)
  // setFeed(useSelector(state => state?.searchPost))
  // const [globalState, setglobalState] = useState({})
  // useSelector(state => {
  //   console.log("this is searchPost", state)
  //   setFeed(state?.searchPost)
  // })
  //   (async () => {
  //     const globalState = await useSelector(state => state)
  //     setFeed(globalState.searchPost)
  //   })()
  // console.log(globalState, "this is global state")
  // console.log(globalState)
  useEffect(function () {
    try {
      const getData = async () => {
        const resp = await axios.get(`${BACKEND}/post/all`);
        const datad = await resp.data;

        console.log(datad, "this is dated")
        setFeed(datad.posts.reverse());

        dispatch({ type: SEARCH_POST, payload: datad.posts })
        setMeme(datad.posts.filter(post => post.type == "MEME"))
        setArticle(datad.posts.filter(post => post.type == "ARTICLE"))
        setStory(datad.posts.filter(post => post.type == "STORY"))

      };
      getData();
    } catch (e) {
      console.log(e);
    }
  }, [value]);

  const [details, setDetails] = useState(true);

  let postList = Feed.map((post, index) => {
    // let postList = Feed?.map((post, index) => {
    console.log(post, "this is post>>>>>>>>>>>>>>>>>>>>>")
    if (post.author) {

    } else {

    }

    if (details === true) {
      return (
        <div className="post-container">
          <div className="profile-1">
            <a href={`/profileOther/${post?.author?._id}`}>    <Avatar src={post?.author?.avatar ? post?.author?.avatar : Profile} /></a>
            <div className="user">
              <p className="displayname">{(() => { if (post.author) { return post?.author.userName } else { return "Loading..." } })()}</p>
              <p className="username">{(() => { if (post.author) { return post?.author.firstName } else { return "Loading..." } })()}</p>
            </div>
          </div>
          <div  >
            {/* <Link to="/postDetails"> <img src={post.image} alt=""  /></Link> */}
            <a href={`/${post.title}/${globalState.user.userName}/${post._id}`} className="image" ><img src={post.image} alt="" /></a>
          </div>
          <div className="post-info">
            <div className="header">{post.title}</div>
            <div className="caption">{post.caption}</div>
          </div>
          {/* <Link to={{
            pathname: `/${post.title}/${globalState.user.userName}/${post._id}`,
            //  state: { post, user: globalState }
          }}>  <div className="readmore">
              Read
          </div></Link> */}
          <div className="readmore">
            <a style={{textDecoration: 'none', color: '#282c37'}} href={`/${post.title}/${globalState.user.userName}/${post._id}`}>Read</a>
          </div>
        </div>
      );
    } else {
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
          <div className="readmore" >
            Done
          </div>
        </div>
      );
    }
  });

  return <div>{postList}</div>;
}

export default Post;
