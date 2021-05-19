import React from "react";
import Post from "../post";
import "../../Styles/searchstyle/searchArticle.css";

function SearchArticle({ dataToShow }) {
  return (
    <div className="searchArticle-Container">
      <Post dataToShow={dataToShow} />
    </div>
  );
}

export default SearchArticle;
