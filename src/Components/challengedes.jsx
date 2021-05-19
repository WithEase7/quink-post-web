import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../Styles/postdetail.css";
import { Avatar } from "@material-ui/core";
import "../Styles/communitydes.css";
import "../Styles/challengedes.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Modal from "react-modal";
import CancelIcon from "@material-ui/icons/Cancel";

function Challengedes() {
  const [enter, setEnter] = useState(false);
  const [challengesModal, setChallengesModal] = useState(false);
  const handleModal = () => {
    setChallengesModal(true);
  };
  const handleModal1 = () => {
    setChallengesModal(false);
  };
  const handleEnter = () => {
    if (enter == true) {
      setEnter(false);
    }
    if (enter == false) {
      setEnter(true);
    }
  };
  return (
    <div className="Challengedes-container">
      <div className="Challengedes-container-upper">
        <div className="Challengedes-container-upper-info">
          <div className="mobile-vertical-icon">
            <div className="Challengedes-container-upper-info-1">
              <div className="Challengedes-container-upper-info-brand">
                Challenge Name
              </div>
              <div className="Challenge-members">Participants: 123</div>
              <div className="Challenge-members online">Online: 23</div>
            </div>
            <div className="mobile-icon">
              <MoreVertOutlinedIcon onClick={handleModal} />
              <Modal isOpen={challengesModal}>
                <div className="Community-container-members-enter-button-container">
                  <div
                    className={`Community-container-members-enter-button ${
                      !enter && "show-communitydes"
                    }`}
                    onClick={handleEnter}
                  >
                    Enter Challenge
                  </div>
                  <div
                    className={`Community-container-members-leave-button ${
                      enter && "show-communitydes"
                    }`}
                    onClick={handleEnter}
                  >
                    Leave Challenge
                  </div>
                  <div>
                    <CancelIcon onClick={handleModal1} />
                  </div>
                </div>

                <div className="Community-container-members-members">
                  <div className="Community-container-members-members-heading">
                    Challenge Members
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                  <div className="Community-container-members-members-each">
                    <div className="Community-container-members-members-avatar">
                      <Avatar />
                    </div>
                    <div className="Community-container-members-members-displayname">
                      Display Name
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div className="Challenge-container-main">
        <div className="Challenge-container-main-headings">
          Challenge Description:
        </div>
        <div className="Challenge-container-main-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit facere
          consequuntur, dolores inventore alias ab officia nisi voluptates
          doloremque magni odio officiis non beatae nemo reiciendis aliquid
          sapiente autem. Quod, sequi praesentium illo, laborum, iusto deleniti
          nisi molestiae eveniet fuga quia alias labore amet possimus impedit.
          Cumque velit quasi praesentium odit incidunt vel exercitationem,
          quisquam voluptate!
        </div>
        <div className="Challenge-container-main-headings">
          Last Date of Entering:
        </div>
        <div className="Challenge-container-main-content">12 feb 2021</div>
        <div className="Challenge-container-main-headings">Prize:</div>
        <div className="Challenge-container-main-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit facere
          consequuntur
        </div>
        <div className="Challenge-attach-File">Attach File</div>
      </div>
      <div className="Community-container-members">
        <div className="Community-container-members-enter-button-container">
          <div
            className={`Community-container-members-enter-button ${
              !enter && "show-communitydes"
            }`}
            onClick={handleEnter}
          >
            Enter Challenge
          </div>
          <div
            className={`Community-container-members-leave-button ${
              enter && "show-communitydes"
            }`}
            onClick={handleEnter}
          >
            Leave Challenge
          </div>
        </div>

        <div className="Community-container-members-members">
          <div className="Community-container-members-members-heading">
            Challenge Members
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
          <div className="Community-container-members-members-each">
            <div className="Community-container-members-members-avatar">
              <Avatar />
            </div>
            <div className="Community-container-members-members-displayname">
              Display Name
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Challengedes;
