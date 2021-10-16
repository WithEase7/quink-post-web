import React, { useEffect } from "react";
import Navbar from "./navbar";
import Primaryfeed from "./primaryfeed";
import { useHistory } from "react-router-dom";
import HelmetBase from "./HelmetBase";
import { Helmet } from "react-helmet";

function Homepage(props) {
  const history = useHistory();
  const value = localStorage.getItem("QuinkPostUserLoggedIn");
  // if (value == false) {
  //   history.push("/")

  // }
  useEffect(async () => {
    const value = await localStorage.getItem("QuinkPostUserLoggedIn");
    console.log("value", value);

    if (value == "false") {
      console.log("inside value");
      // history.push("/")
    }
  }, []);
  // console.log(props.route.params, "this params is in home screen")
  // console.log(localStorage.getItem("Quink-Post-User"),"this is user <<<<<<<<<<<<<<<")
  //   useEffect(() => {
  //  (async()=>{
  //   try{
  //   //   const user=await axios.get("/user/6034c1d7b440fa71fc16fc5b")
  //   // console.log(user.data,"this is kuser from backend")
  //   // dispatch({type:Action.USER_LOGGED_IN,payload:user.data.user})

  //   }catch(e){console.log(e)}
  //  })()

  //   }, [])
  const keywordstoSend = [
    "blogging",
    "bloggers",
    "Earn money through blogging",
    "How to make a blog",
    "Challenges",
    "Content Creators",
  ];

  return (
    <div
      className="homecontainer"
      style={{ overflowX: "hidden", overflowY: "hidden" }}
    >
      <HelmetBase
        title="Quink Post | Content Creation Platoform for Content Writers And Bloggers"
        // link={`/post/${postData?.title}/${postData?.author?._id}`}
        link="/"
        description="A platform which lets you earn through content creation and its challenges. Create fully optimized free blogs and get better reach over the world. This Platform is for new Bloggers to start their hussle-free Blogging Jurney. "
        keywords={keywordstoSend}
        // structuredJSON={postData?.seo}
        usernameSchema="Quink Post"
        // imageSchema={postData?.image}
        // authorSchema={`https://www.quinkpost.com/${author?.userName}/${author?._id}`}
      />

      <Navbar />
      <Primaryfeed />
    </div>
  );
}

export default Homepage;
