import React, { useEffect } from "react";
import Navbar from "./navbar";
import Primaryfeed from "./primaryfeed";
import { useHistory } from "react-router-dom";

function Homepage(props) {
  const history = useHistory()
  const value = localStorage.getItem("QuinkPostUserLoggedIn");
  // if (value == false) {
  //   history.push("/")

  // }
  useEffect(async () => {
    const value = await localStorage.getItem("QuinkPostUserLoggedIn")
    console.log("value", value)

   
    if (value == "false") {
      console.log("inside value")
      history.push("/")
    }

  }, [])
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
    <div className="homecontainer" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
      <Navbar />
      <Primaryfeed />
    </div>
  );
}

export default Homepage;
