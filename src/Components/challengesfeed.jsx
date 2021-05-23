import React, { useEffect, useState } from "react";
import "../Styles/communityfeed.css";
import search from "../Assets/search.png";
import AddIcon from "@material-ui/icons/Add";
import Challengepost from "./challengepost";
import BACKEND from "./Constants/Backend";
import axios from "axios";
import { useDispatch } from "react-redux"
import {CHALLENGE_POST} from "./Reducer/Action";

function Challengesfeed() {
  const dispatch = useDispatch()
  const [createcommunity, setCreatecommunity] = useState(false);
  const [challenge, setchallenge] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BACKEND}/challenge/all`);
        setchallenge(result.data.challenge);
        dispatch({ type: CHALLENGE_POST, payload: result.data.challenge })

      } catch (e) {
        console.log(e);
      }
    })();
  }, [createcommunity]);
  // setchallenge(useSelector(state => state?.challengePost))

  const handleCreate = () => {
    setCreatecommunity(true);
  };
  const handleCreate1 = () => {
    setCreatecommunity(false);
  };
  return (
    <div className="communityfeed-container">
      <div className="community-upper">
        <div className="community-pagetitle"> Challenges </div>
        <div className="create-community">
          {" "}
          <button className="createcommunity-button" onClick={handleCreate}>
            <AddIcon />
            Create challenges
          </button>{" "}
        </div>
      </div>
      <div className="community-secondary-container">
        <div
          className={`community-feed ${createcommunity && "show-createcommunity"
            }`}
        >
          {(() => {
            if (challenge?.length) {
              return challenge?.map((challenge, index) => {
                return <Challengepost challenge={challenge} key={index} />

              })
            }
          })()}
          {/* <Challengepost />
          <Challengepost />
          <Challengepost />
          <Challengepost />
          <Challengepost /> */}
        </div>
        <div
          className={`community-feed createcommunity ${!createcommunity && "show-createcommunity"
            }`}
        >
          <div>Challenges can be created after 2000 followers..</div>
          <div className="createcommunityback" onClick={handleCreate1}>
            Challenges Home
          </div>
        </div>
        <div className="sidebar">
          <div className="community-searchbox">
            <div>
              <img src={search} alt="" className="community-search-icon" />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search challenges.."
                className="community-search-input"
              />
            </div>
          </div>
          <div className="joined-communities">
            <div className="joined-communities-header">Joined Challenges</div>
            {/* <div className="joined-communities-body">
              <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Challenge Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div>
              <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Challenge Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div>
              <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Challenge Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div>
              <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Challenge Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div>
              <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Challenge Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div>
              <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Challenge Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div>
              <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Challenge Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div>
              <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Challenge Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div>
              <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Challenge Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div>
              <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Challenge Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Challengesfeed;
