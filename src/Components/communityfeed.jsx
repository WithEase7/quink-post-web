import React, { useEffect, useState } from "react";
import "../Styles/communityfeed.css";
import search from "../Assets/search.png";
import AddIcon from "@material-ui/icons/Add";
import Communitypost from "./communitypost";
import axios from "axios"
import BACKEND from "./Constants/Backend"

function Communityfeed() {
  const [createcommunity, setCreatecommunity] = useState(false);
  const [community, setcommunity] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${BACKEND}/community`)
        // console.log(result.data,"this is community data full")
        setcommunity(result.data)

      } catch (e) { console.log(e); }
    })()
  }, [])



  const handleCreate = () => {
    setCreatecommunity(true);
  };
  const handleCreate1 = () => {
    setCreatecommunity(false);
  };
  return (
    <div className="communityfeed-container">
      <div className="community-upper">
        <div className="community-pagetitle"> Communities </div>
        <div className="create-community">
          {" "}
          <button className="createcommunity-button" onClick={handleCreate}>
            <AddIcon />
            Create community
          </button>{" "}
        </div>
      </div>
      <div className="community-secondary-container">
        <div
          className={`community-feed ${createcommunity && "show-createcommunity"
            }`}
        >
          {(() => {
            return community.map(post => {
              return <Communitypost title={post.title} description={post.description} communityId={post._id} />
            })

          })()}

        </div>
        <div
          className={`community-feed createcommunity ${!createcommunity && "show-createcommunity"
            }`}
        >
          <div>Communities can be created after 2000 followers..</div>
          <div className="createcommunityback" onClick={handleCreate1}>
            Back to Communities 
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
                placeholder="Search communities.."
                className="community-search-input"
              />
            </div>
          </div>
          <div className="joined-communities">
            <div className="joined-communities-header">Joined Communities</div>
            <div className="joined-communities-body">
              {/* <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Community Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div> */}
              {/* <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Community Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div> */}
              {/* <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Community Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div> */}
              {/* <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Community Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div> */}
              {/* <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Community Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div> */}
              {/* <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Community Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div> */}
              {/* <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Community Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div> */}
              {/* <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Community Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div> */}
              {/* <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Community Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div> */}
              {/* <div className="each-joined-community">
                <div className="each-joined-community-avatar">
                  <Avatar />
                </div>
                <div className="each-joined-community-info">
                  <div className="each-joined-community-info-1">
                    Community Name
                  </div>
                  <div className="each-joined-community-info-2">
                    Members:123
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communityfeed;
