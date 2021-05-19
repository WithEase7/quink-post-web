import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Styles/searchtab.css";
import Loader from "react-loader-spinner";
import BACKEND from "./Constants/Backend";
// import SearchArticle from './search/searchArticle';
import Post from "./post";
function Searchtab({ searchField }) {
  const globalState = useSelector((state) => state);
  const toggleLanguage = useSelector((state) => state.LANGUAGE_PREFERENCE);
  const showSearch = globalState.SHOW_SEARCH;
  // const searchField = globalState.SEARCH_POST
  // Shayari -- shayari
  // Story -- story
  //Quote --quote
  // poem
  // article
  // meme
  const [All, setAll] = useState(true);
  const [showLoader, setshowLoader] = useState(false);
  const [Article, setArticle] = useState(false);
  const [Shayari, setShayari] = useState(false);
  const [Story, setStory] = useState(false);
  const [Poem, setPoem] = useState(false);
  const [Meme, setMeme] = useState(false);
  const [Quote, setQuote] = useState(false);

  const [Feed, setFeed] = useState([]);
  const [MemeFeed, setMemeFeed] = useState([]);
  const [ArticleFeed, setArticleFeed] = useState([]);
  const [StoryFeed, setStoryFeed] = useState([]);
  const [PoemFeed, setPoemFeed] = useState([]);
  const [ShayariFeed, setShayariFeed] = useState([]);
  const [QuoteFeed, setQuoteFeed] = useState([]);

  useEffect(
    function () {
      try {
        const getData = async () => {
          setshowLoader(true);
          const resp = await axios.get(`${BACKEND}/post/all/${toggleLanguage}`);
          const datad = await resp.data;

          // console.log(datad, "this is dated")
          setFeed(datad.posts.reverse());

          setMemeFeed(datad.posts.filter((post) => post.type == "MEME"));
          setArticleFeed(datad.posts.filter((post) => post.type == "ARTICLE"));
          setStoryFeed(datad.posts.filter((post) => post.type == "STORY"));
          setPoemFeed(datad.posts.filter((post) => post.type == "POEM"));
          setShayariFeed(datad.posts.filter((post) => post.type == "SHAYARI"));
          setQuoteFeed(datad.posts.filter((post) => post.type == "QUOTE"));
          setshowLoader(false);
        };
        const searchPostData = async () => {
          // console.log("inside search Post<<<<<", showSearch, "<<showSearch ", searchField, "<<<searchField")
          setshowLoader(true);
          const posts = await axios.get(
            `${BACKEND}/search/post/${searchField}`
          );
          console.log(posts.data, "+++++++++++++", searchField);
          setFeed(posts.data.reverse());
          setMemeFeed(posts.data.filter((post) => post.type == "MEME"));
          setArticleFeed(posts.data.filter((post) => post.type == "ARTICLE"));
          setStoryFeed(posts.data.filter((post) => post.type == "STORY"));
          setPoemFeed(posts.data.filter((post) => post.type == "POEM"));
          setShayariFeed(posts.data.filter((post) => post.type == "SHAYARI"));
          setQuoteFeed(posts.data.filter((post) => post.type == "QUOTE"));
          setshowLoader(false);
        };
        // (!showSearch) ? getData() : searchPostData()
        if (showSearch != null) {
          searchPostData();
        } else {
          getData();
        }
        // getData();
      } catch (e) {
        console.log(e);
      }
    },
    [showSearch, toggleLanguage]
  );

  const handleClick0 = () => {
    setAll(true);
    setArticle(false);
    setShayari(false);
    setStory(false);
    setPoem(false);
    setQuote(false)
    setMeme(false);
  };
  const handleClick1 = () => {
    setAll(false);
    setArticle(true);
    setShayari(false);
    setStory(false);
    setQuote(false)
    setPoem(false);
    setMeme(false);
  };
  const handleClick2 = () => {
    setAll(false);
    setArticle(false);
    setShayari(true);
    setStory(false);
    setPoem(false);
    setQuote(false)
    setMeme(false);
  };
  const handleClick3 = () => {
    setAll(false);
    setArticle(false);
    setShayari(false);
    setQuote(false)
    setStory(true);
    setPoem(false);
    setMeme(false);
  };
  const handleClick4 = () => {
    setArticle(false);
    setAll(false);
    setQuote(false)
    setShayari(false);
    setStory(false);
    setPoem(true);
    setMeme(false);
  };
  const handleClick5 = () => {
    setArticle(false);
    setAll(false);
    setQuote(false)
    setShayari(false);
    setStory(false);
    setPoem(false);
    setMeme(true);
  };

  const handleClick6 = () => {
    setArticle(false);
    setAll(false);

    setShayari(false);
    setStory(false);
    setPoem(false);
    setMeme(false);
    setQuote(true)
  };
  return (
    <>
      <div className="searchtab-container">
        <div className="upper-category">
          <div
            className={`upper-category-each ${
              All && "upper-category-each-active"
            }`}
            onClick={handleClick0}
          >
            Feed
          </div>
          <div
            className={`upper-category-each ${
              Article && "upper-category-each-active"
            }`}
            onClick={handleClick1}
          >
            Articles
          </div>
          <div
            className={`upper-category-each ${
              Shayari && "upper-category-each-active"
            }`}
            onClick={handleClick2}
          >
            Shayari
          </div>
          <div
            className={`upper-category-each ${
              Story && "upper-category-each-active"
            }`}
            onClick={handleClick3}
          >
            Story
          </div>
          <div
            className={`upper-category-each ${
              Poem && "upper-category-each-active"
            }`}
            onClick={handleClick4}
          >
            Poem
          </div>
          <div
            className={`upper-category-each ${
              Meme && "upper-category-each-active"
            }`}
            onClick={handleClick5}
          >
            Meme
          </div>
          <div
            className={`upper-category-each ${
              Quote && "upper-category-each-active"
            }`}
            onClick={handleClick6}
          >
            Quote
          </div>
        </div>
        <div className="search-result-container">
          <div style={{ alignItems: "center", textAlign: "center" }}>
            <Loader
              visible={showLoader}
              type="MutatingDots"
              color="#00BFFF"
              height={100}
              width={100}
            />
          </div>
          <div className={`${!All && "search-display-none"}`}>
            <Post dataToShow={Feed} />
          </div>
          <div className={`${!Article && "search-display-none"}`}>
            <Post dataToShow={ArticleFeed} />
          </div>
          <div className={`${!Shayari && "search-display-none"}`}>
            <Post dataToShow={ShayariFeed} />
          </div>
          <div className={`${!Story && "search-display-none"}`}>
            <Post dataToShow={StoryFeed} />
          </div>
          <div className={`${!Poem && "search-display-none"}`}>
            <Post dataToShow={PoemFeed} />
          </div>
          <div className={`${!Meme && "search-display-none"}`}>
            <Post dataToShow={MemeFeed} />
          </div>
          <div className={`${!Quote && "search-display-none"}`}>
            <Post dataToShow={QuoteFeed} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchtab;
