import React, { useState, useEffect } from "react";
import Communityfeed from "./communityfeed";
import Navbar from "./navbar";
import OriginalPage from "./Original";
import Primaryfeed from "./primaryfeed";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Action from "./Reducer/Action"
import axios from "axios";
import { useHistory } from "react-router-dom";

function Homepage(props) {
  const dispatch = useDispatch()
  const [canGo, setCanGo] = useState(false)
  const history = useHistory()
  // useEffect(async () => {
  //   const value = await localStorage.getItem("QuinkPostUserLoggedIn")
  //   console.log(value)
  //   setCanGo(value)
  //   // if (value == false) {
  //   //   history.push("/login")
  //   // }

  // }, [])
  // console.log(props.route.params, "this params is in home screen")
  // console.log(localStorage.getItem("Quink-Post-User"),"this is user <<<<<<<<<<<<<<<")
  //   useEffect(() => {
  //  (async()=>{
  //   try{
  //   //   const user=await axios.get("/user/6034c1d7b440fa71fc16fc5b")
  //   // console.log(user.data,"this is kuser from backend")
  //   // dispatch({type:Action.USER_LOGGED_IN,payload:user.data.user})

  //   }catch(e){console.log(e)}
  //  })()  

  //   }, [])

 return (
    <div className="homecontainer" style={{overflowX: 'hidden', overflowY: 'hidden'}}>
      <Navbar />
      <Primaryfeed />
    </div>
  );
}

export default Homepage;
