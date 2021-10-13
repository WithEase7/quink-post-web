import React, { useState, useEffect } from "react";
import Profile from "../Assets/colour.jpg";
import { Avatar } from "@material-ui/core";
import "../Styles/post.css";
import { useSelector } from "react-redux";
const Post = ({ dataToShow }) => {
  // console.log("POST Ok IS IN SCREEN")
  // console.log(props.post, "thsi is post in post ")
  // console.log(props?.post, "this i spost in post screen")
  const globalState = useSelector((state) => state);
  console.log(globalState, "<<<<");
  // const [showSearch, setshowSearch] = useState(globalState.SHOW_SEARCH)
  // const [searchField, setsearchField] = useState(globalState.SEARCH_POST)
  const showSearch = globalState.SHOW_SEARCH;
  const searchField = globalState.SEARCH_POST;
  // console.log(globalState, "{}{}")
  // const setValues = async () => {
  //   const value = await globalState?.SHOW_SEARCH
  //   setshowSearch(value)
  //   const searchvalue = await globalState?.SEARCH_POST
  //   console.log(searchvalue, "inside :::::")
  //   setsearchField(searchvalue)
  // }
  // setValues()

  console.log(showSearch, "  ", searchField, "<<<<<<<<<<<");
  // console.log(globalState)
  // console.log(globalState, "this is user")
  const [currState, setcurrState] = useState("FEED");
  const [Feed, setFeed] = useState([]);
  const [Meme, setMeme] = useState([]);
  const [Article, setArticle] = useState([]);
  const [Story, setStory] = useState([]);
  // const [value, setValue] = useState(false)

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

  // const DataToShow =
  // console.log(dataToShow, "%%")

  useEffect(
    function () {
      try {
        //   const getData = async () => {
        //     console.log("inside getData<<<<<", showSearch, "<<showSearch ", searchField, "<<<searchField")
        //     const resp = await axios.get(`${BACKEND}/post/all`);
        //     const datad = await resp.data;
        //     // console.log(datad, "this is dated")
        //     setFeed(datad.posts.reverse());
        //     dispatch({ type: SEARCH_POST, payload: datad.posts })
        //     setMeme(datad.posts.filter(post => post.type == "MEME"))
        //     setArticle(datad.posts.filter(post => post.type == "ARTICLE"))
        //     setStory(datad.posts.filter(post => post.type == "STORY"))
        //   };
        //   const searchPostData = async () => {
        //     console.log("inside search Post<<<<<", showSearch, "<<showSearch ", searchField, "<<<searchField")
        //     const posts = await axios.get(`${BACKEND}/search/post/${searchField}`)
        //     console.log(posts.data)
        //   }
        //   (!showSearch) ? getData() : searchPostData()
      } catch (e) {
        console.log(e);
      }
    },
    [showSearch]
  );

  const [details, setDetails] = useState(true);
  const defaultUrl =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  let postList = dataToShow.map((post, index) => {
    // let postList = Feed?.map((post, index) => {
    // console.log(post, "this is post>>>>>>>>>>>>>>>>>>>>>")

    const imagePresent = () => {
      if (post?.image) {
        return (
          <div>
            <a
              href={`/post/${post?.author?.userName}/${post.title.replace(
                / /g,
                "-"
              )}/${post._id}`}
              className="image"
            >
              <img src={post.image} alt={post?.title} />
            </a>
          </div>
        );
      } else {
        return(
          <></>
        );
      }
    };

    if (details === true) {
      return (
        <div className="post-container">
          <div className="profile-1">
            {/* <a href={`/user/${post?.author?.userName}/${post?.author?._id}`}> */}
            <a href={`/${post?.author?.userName}/${post?.author?._id}`}>
              <Avatar
                alt={post?.author?.userName}
                src={post?.author?.avatar ? post?.author?.avatar : defaultUrl}
              />
            </a>
            <div className="user">
              <h4 className="displayname">
                {(() => {
                  if (post.author) {
                    return post?.author?.userName;
                  } else {
                    return "Loading...";
                  }
                })()}
              </h4>
              <h5 className="username">
                {(() => {
                  if (post.author) {
                    return post?.author?.firstName;
                  } else {
                    return "Loading...";
                  }
                })()}
              </h5>
            </div>

            <div
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                marginLeft: "auto",
                alignSelf: "center",
                color: "#ff6550",
                borderRadius: 15,
                border: "outset",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              {post?.author?.userName == "Quink Post Admin"
                ? "Admin"
                : post?.author?.post?.length < 5
                  ? "Amatuer"
                  : post?.author?.post?.length < 20
                    ? "Creative"
                    : "Master"}
            </div>
          </div>
          {imagePresent()}
          <div className="post-info">
            <h3 className="header">{post?.title}</h3>
            <h4 className="caption">{post?.caption}</h4>
          </div>
          {/* <Link to={{
            pathname: `/${post.title}/${globalState.user.userName}/${post._id}`,
            //  state: { post, user: globalState }
          }}>  <div className="readmore">
              Read
          </div></Link> */}
          <div className="readmore">
            <a
              style={{ textDecoration: "none", color: "#282c37" }}
              // href={`/post/${post?.title.replace(/ /g,"-")}/${post?._id}`}
              href={`/post/${post?.author?.userName}/${post?.title.replace(/ /g,"-")}/${post?._id}`}
            >
              Read
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="post-container">
          <div className="profile-1">
            <Avatar src={Profile} alt={post?.displayName} />
            <div className="user">
              <p className="displayname">{post?.displayName}</p>
              <p className="username">{post?.username}</p>
            </div>
          </div>
          <div className="image">
            <img src={Profile} alt={post?.header} />
          </div>
          <div className="post-info">
            <div className="header">{post.header}</div>
            <div className="caption">{post.body}</div>
          </div>
          <div className="readmore">Done</div>
        </div>
      );
    }
  });

  return <div>{postList}</div>;
};

export default Post;
