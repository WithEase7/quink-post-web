import React, { useEffect, useState } from "react";
import InterviewPost from "./InterviewPost";
import axios from "axios";
import BACKEND from "./Constants/Backend";
const qs = require('qs');
const InterviewFeed = () => {
  const [interview, setinterview] = useState([]);
  const [iframeValue, setiframeValue] = useState({})
  const [student, setstudent] = useState({})
  const [Svalue, setSvalue] = useState("")
  useEffect(async () => {
    const result = await axios.post('https://auroscholar.com/api/partnerapilogin.php', qs.stringify({
      'partner_id': '741',
      'partner_source': 'QUINZulSw2',
      'mobile_no': '8989802546',
      "student_class": "6"
    }))
    console.log(result.data, "this is if rame")
    if (result.data.type == "success") {
      setiframeValue(result.data.data)
      const value = window.btoa(result.data['data']['sudent_registration_id']);
      console.log(value, "base 64")
      setSvalue(value)
    }
  }, [])

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
        {/* <form action="https://auroscholar.com/api/partnerapilogin.php?mobile_no=8989802546"
          target="my-iframe"
        // method="post"
        >
          <label>partner_id</label><input type="text" value="741"></input>
          <label>partner_source</label><input type="text" value="QUINZulSw2"></input>
          <label>mobile_no</label><input type="text" value="8989802546"></input>
          <label>student_class</label><input type="text" value="6"></input>

          <button type="submit">submit</button>
        </form> */}
      </div>
    </div >
  );
};

export default InterviewFeed;
