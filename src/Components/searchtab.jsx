import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/searchtab.css";
import Loader from "react-loader-spinner";
import BACKEND from "./Constants/Backend";

// import SearchArticle from './search/searchArticle';
import Post from "./post";
function Searchtab({ searchField }) {
  const globalState = useSelector((state) => state);
  const toggleLanguage = useSelector((state) => state.LANGUAGE_PREFERENCE);
  const showSearch = globalState.SHOW_SEARCH;
// const SELECTED_NICHE = useSelector(state => state.SELECTED_NICHE)
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
  const [Art, setArt] = useState(false);

  const [Feed, setFeed] = useState([]);
  const [MemeFeed, setMemeFeed] = useState([]);
  const [ArticleFeed, setArticleFeed] = useState([]);
  const [StoryFeed, setStoryFeed] = useState([]);
  const [PoemFeed, setPoemFeed] = useState([]);
  const [ShayariFeed, setShayariFeed] = useState([]);
  const [QuoteFeed, setQuoteFeed] = useState([]);
  const [ArtFeed, setArtFeed] = useState([]);

  useEffect(
    function () {
// console.log("pathname",)
// if(nichevalue.length<2){
  //   return null
  // }
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
      setArtFeed(datad.posts.filter((post) => post.type == "ART"));
      setshowLoader(false);
    };
    const searchPostData = async () => {
      // console.log("inside search Post<<<<<", showSearch, "<<showSearch ", searchField, "<<<searchField")
      setshowLoader(true);
      const posts = await axios.get(
        `${BACKEND}/search/post/${searchField}`
        );
        // console.log(posts.data, "+++++++++++++", searchField);
        setFeed(posts.data.reverse());
        setMemeFeed(posts.data.filter((post) => post.type == "MEME"));
        setArticleFeed(posts.data.filter((post) => post.type == "ARTICLE"));
        setStoryFeed(posts.data.filter((post) => post.type == "STORY"));
        setPoemFeed(posts.data.filter((post) => post.type == "POEM"));
        setShayariFeed(posts.data.filter((post) => post.type == "SHAYARI"));
        setQuoteFeed(posts.data.filter((post) => post.type == "QUOTE"));
        setArtFeed(posts.data.filter((post) => post.type == "ART"));
          setshowLoader(false);
        };
        // (!showSearch) ? getData() : searchPostData()
        
        const nichevalue=window.location.pathname.split("/")
        // alert(nichevalue[2])
        if(nichevalue[2]==undefined){

          if (showSearch != null) {
            searchPostData();
          } else {
            getData();
          }
        }
        // getData();
      } catch (e) {
        console.log(e);
      }
    },
    [showSearch, toggleLanguage]
  );
  
const handleClick1 = () => {
  setAll(false);
  setArticle(true);
  setShayari(false);
  setStory(false);
  setArt(false)
  setQuote(false)
  setPoem(false);
  setMeme(false);
};
  useEffect(() => {
    // console.log("pathname",window.location.pathname,"pathname")
    const nichevalue=window.location.pathname.split("/")
    if(nichevalue[1]=="blog"){
      handleClick1()
    }
    // console.log(nichevalue)
    // const nicheText=capitalize(nichevalue[2])
    if(globalState.SELECTED_NICHE==null){
      const filterItem=Feed.filter(feed=>feed.type=="ARTICLE" )
      setArticleFeed(filterItem)
    }else{
      setshowLoader(true);
      (async()=>{
        console.log(`${BACKEND}/post/niche/${globalState.SELECTED_NICHE}`,"api")
        const {data}=await axios.get(`${BACKEND}/post/niche/${globalState.SELECTED_NICHE}`)
        // const {data}=await axios.get(`${BACKEND}/post/niche/Business`)
        console.log(data,"data")
        if(data.success){
          setshowLoader(false);
        setArticleFeed(data.posts)
       }
      })()
  
    }
  }, [globalState.SELECTED_NICHE])

  const handleClick0 = () => {
    setAll(true);
    setArticle(false);
    setShayari(false);
    setStory(false);
    setPoem(false);
    setQuote(false)
    setMeme(false);
    setArt(false)
  };

  const handleClick2 = () => {
    setAll(false);
    setArticle(false);
    setShayari(true);
    setArt(false)
    setStory(false);
    setPoem(false);
    setQuote(false)
    setMeme(false);
  };
  const handleClick3 = () => {
    setAll(false);
    setArticle(false);
    setArt(false)
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
    setArt(false)
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
    setArt(false);
    setPoem(false);
    setMeme(true);
  };

  const handleClick6 = () => {
    setArticle(false);
    setAll(false);
    setArt(false)
    setShayari(false);
    setStory(false);
    setPoem(false);
    setMeme(false);
    setQuote(true)
  };

  const handleClick7 = () => {
    setArticle(false);
    setAll(false);
    setArt(true)
    setShayari(false);
    setStory(false);
    setPoem(false);
    setMeme(false);
    setQuote(false)
  };

  return (
    <>
      <div className="searchtab-container">
        <div className="upper-category">
          <h4
            className={`upper-category-each ${
              All && "upper-category-each-active"
            }`}
            onClick={handleClick0}
          >
            Feed
          </h4>
          <h4
            className={`upper-category-each ${
              Article && "upper-category-each-active"
            }`}
            onClick={handleClick1}
          >
            Articles
          </h4>
          <h4
            className={`upper-category-each ${
              Meme && "upper-category-each-active"
            }`}
            onClick={handleClick5}
          >
            Meme
          </h4>
          <h4
            className={`upper-category-each ${
              Art && "upper-category-each-active"
            }`}
            onClick={handleClick7}
          >
            Art
          </h4>
          <h4
            className={`upper-category-each ${
              Shayari && "upper-category-each-active"
            }`}
            onClick={handleClick2}
          >
            Shayari
          </h4>
          <h4
            className={`upper-category-each ${
              Story && "upper-category-each-active"
            }`}
            onClick={handleClick3}
          >
            Story
          </h4>
          <h4
            className={`upper-category-each ${
              Poem && "upper-category-each-active"
            }`}
            onClick={handleClick4}
          >
            Poem
          </h4>
          <h4
            className={`upper-category-each ${
              Quote && "upper-category-each-active"
            }`}
            onClick={handleClick6}
          >
            Quote
          </h4>
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
          <div className={`${!Art && "search-display-none"}`}>
            <Post dataToShow={ArtFeed} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchtab;
