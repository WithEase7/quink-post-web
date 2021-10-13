import React from "react";

const PageNotFound = () => {
  return (
    <div className="pagenotfoundcss">
      <div style={{ textAlignLast: "center" }}>
        <img
          src="https://i.imgur.com/qIufhof.png"
          alt="This page could not be found"
          width="600px"
          height="600px"
        />
      </div>
      <h1 style={{textAlign: "center"}}>Error 404! Page not found</h1>
    </div>
  );
};

export default PageNotFound;
