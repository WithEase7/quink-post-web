import React, { useEffect, useState } from "react";
import InterviewPost from "./InterviewPost";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import BACKEND from "./Constants/Backend";

const InterviewFeed = () => {
  const [interview, setinterview] = useState([]);

  useEffect(() => {
    {
      (async () => {
        const result = await axios.get(`${BACKEND}/admin`);
        console.log(result.data);
        const posts = result.data.adminPost;
        posts.map((post, index) => {
          if (post.type == "TRANSCRIBED") {
            setinterview((prev) => {
              return [...prev, post];
            });
          }
        });
      })();
    }
  }, []);
  return (
    <div className="articleFeed">
      <div className="articleFeed-title ">Quink Post Interviews.</div>
      <div className="articlePost">
        {(() => {
          return interview.map((post, key) => {
            return <InterviewPost post={post} />;
          });
        })()}

        {/* <InterviewPost /> */}
        {/* <InterviewPost />
        <InterviewPost />
        <InterviewPost />
        <InterviewPost /> */}
      </div>
    </div>
  );
};

export default InterviewFeed;
