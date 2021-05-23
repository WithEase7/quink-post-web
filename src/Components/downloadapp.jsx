import React, { useEffect, useState } from "react";
import axios from "axios";
import BACKEND from "./Constants/Backend";

function DownloadApp() {
  const applink =
    "https://apkfab.com/quink-post/com.quinkpost.quinkpost/apk?h=63233fa45dd2a7675dac0c2a5bd93a06325d4d52f358ee54f564608b8a637131";
  const [showLink, setshowLink] = useState(applink);

  useEffect(() => {
    (async () => {
      try {
        const applink = await axios.get(`${BACKEND}/app/link`);
        setshowLink(applink?.data?.downloadlink);
      } catch (e) {
        console.log(e, "something prob");
      }
    })();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <a
        href={`${showLink}`}
        style={{ textDecoration: "none", textAlign: "center" }}
      >
        <button
          className="button-login"
          style={{
            width: "12rem",
            height: "3rem",
            fontSize: "1rem",
            padding: "4px",
          }}
        >
          Link to Download App
        </button>
      </a>
    </div>
  );
}

export default DownloadApp;
