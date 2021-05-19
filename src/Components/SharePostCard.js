import React from "react";
import { useSelector } from "react-redux";
import ChatAvatar from "./chatavatar";
import Quinkpost from '../Assets/Quinkpost.jpg'

export default function SharePostCard(props) {

    const { senderId, timeStamp } = props
    const { user } = useSelector(state => state)
    const userId = user._id
    const getTime = () => {
        // const months=["jan","fab","mar"]
        const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"];
        const date = new Date(timeStamp)
        // console.log(date.getDate(), date.getHours(), "+++++++++")
        return { hour: date.getHours(), minute: date.getMinutes(), date: date.getDate(), month: months[(date.getMonth())] }
        // console.log(timeStamp, "+++++++")
    }

    const checkLeftOrRight = () => {
        // console.log(userId, "<<0", senderId)
        if (userId == senderId) {
            // console.log("should be right", props.title)
            return "chat__item"
        }
        else {

            console.log("should be left", props.title)
            return "chat__item other"
        }
    }
    return (
        <div
            style={{ animationDelay: `0.8s` }}
            className={checkLeftOrRight()}
        // className="chat__item"
        >
            <div className="chat__item__content">
                <div>{props.title}</div>
                <div style={{textAlign: "center"}}><img style={{ width: "75%", marginTop: "10px" }} src={props.image ? props.image : Quinkpost} /></div>
                <div> {props.caption}</div>
                <div className="chat__meta">

                    <span >{getTime().hour}:{getTime().minute} | {getTime().date} {getTime().month}</span>
                    {/* <span>Seen 1.03PM</span> */}
                </div>
            </div>
            <ChatAvatar isOnline="active" image={props?.avatar} />
        </div>
    );
}
