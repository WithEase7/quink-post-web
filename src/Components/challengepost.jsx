import React from 'react'
import "../Styles/communitypost.css";
import "../Styles/challengepost.css"
import Profile from "../Assets/colour.jpg";
import { Avatar } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import {Link} from "react-router-dom"

function Challengepost({challenge}) {
console.log(challenge)
const end=challenge?.duration.end
const challengeDate=new Date(end)
const challengeId=challenge?._id
// console.log(end,"this is end date of challenge")
    return (
        <div className="communitypost-container">
        <div className="post-info">
        <div className="community-header">
        <Avatar src={Profile} className="community-avatar"/>
                <div className="community-title">{challenge?.title}</div>
                </div>
        <div className="challenge-discription">
            <div className="challenge-discription-1">
               <div className="challenge-discription-header">
                  Description :
               </div>
{challenge?.description}
{/* description */}
            </div>
            <div className="challenge-discription-1">
               <div className="challenge-discription-header">
{`${challengeDate.getDate()}/${challengeDate.getMonth()+1}/${challengeDate.getFullYear()}`}
                     {/* {`${new Date(challenge.duration.end.getDay())}/${new Date(challenge.duration.end.getMonth())+1}/${new Date(challenge.duration.end.getFullYear())}`} */}
               </div>
               12 feb 2021
            </div>
            <div className="challenge-discription-1">
               <div className="challenge-discription-header">
                  Prize :
               </div>
               {/* {challenge.description} */}
            </div>
        </div>
        </div>
        <div className="join-community">
       <div className="members">
       <PersonIcon />Participants :
            <div className="members-no">431</div>
      </div>
      <Link to={{pathname:`/postChallenge/${challengeId}`}}>
    <div
        className="community-readmore"
      >
        Enter
      </div></Link>
       </div>
        </div>
    )
}

export default Challengepost
