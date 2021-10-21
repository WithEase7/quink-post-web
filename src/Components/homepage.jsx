import React, { useEffect } from "react";
import Navbar from "./navbar";
import Primaryfeed from "./primaryfeed";
import HelmetBase from "./HelmetBase";

function Homepage() {
 
  useEffect(async () => {
    const value = await localStorage.getItem("QuinkPostUserLoggedIn");
    console.log("value", value);

    if (value == "false") {
      console.log("inside value");
      // history.push("/")
    }
  }, []);
 
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
