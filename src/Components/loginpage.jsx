import React, { useState } from "react";
import "../Styles/loginpage.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import BACKEND from "./Constants/Backend";
import { USER_LOGGED_IN } from "./Reducer/Action";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
const Loginpage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [userName, setUserName] = useState("")
  // const [password, setPassword] = useState("")
  const [login, setLogin] = useState({});
  const [registerValue, setregisterValue] = useState({})

  useEffect(() => {
    (async () => {
      try {
        const userToken = await localStorage.getItem("Quink-Post");
        // if(userToken!="")
        // if(userToken==" "){console.log(" usertoken empty")}else{
        //   console.log(userToken,"<<<<user tokeni s here")
        // }
        if (userToken !== " ") {
          console.log(userToken);
          const result = await axios.post(`${BACKEND}/user/key`, {
            token: userToken,
          });
          console.log(result.data, "from useEffect");
          if (result.data.success) {
            console.log(result.data);
            localStorage.setItem("QuinkPostUserLoggedIn", true);
            dispatch({ type: USER_LOGGED_IN, payload: result.data.user });

            history.push("/homeScreen");
          } else {
            localStorage.setItem("QuinkPostUserLoggedIn", false);
          }
        } else {
          console.log("empty token ", userToken);
        }
        // console.log(window)
      } catch (e) {
        console.log(e, "something prob");
      }
    })();
  }, []);

  const [register, setRegister] = useState(false);
  const [active, setActive] = useState(false);

  const responseGoogle = async (response) => {
    // response.preventDefault()
    // window.reload(false)
    console.log(response);
    // console.log(response,"this is response")
    // await localStorage.setItem("Quink-Post", response.user)
    if (response.profileObj) {
      // const googleUser=response.profileObj
      const { googleId, profileObj } = response;
      const { data } = await axios.post(
        `${BACKEND}/google/googleUser/${googleId}`,
        {
          profileObj,
        }
      );
      console.log(data);
      const { success, token, user } = data;
      if (success) {
        console.log("successfully loged in from google");
        await localStorage.setItem("Quink-Post", token);
        dispatch({ type: USER_LOGGED_IN, payload: user });
        localStorage.setItem("QuinkPostUserLoggedIn", true);

        history.push("/homeScreen");
      }
      // console.log(data)
      // const result = await axios.post(`${BACKEND}/user/login`,
      //   { userName: googleUser.userName, password: login.password })
    }
  };

  const submitLogin = async () => {
    try {
      console.log("checking logim");
      console.log(login);
      const result = await axios.post(`${BACKEND}/user/login`, {
        userName: login.userName,
        password: login.password,
      });
      console.log("here i am");
      console.log(result.data, "where is data");
      if (result.data.success) {
        await localStorage.setItem("Quink-Post", result.data.token);
        console.log(result.data);
        dispatch({ type: USER_LOGGED_IN, payload: result.data.user });
        localStorage.setItem("QuinkPostUserLoggedIn", true);

        history.push("/homeScreen");
        // localStorage.setItem("Quink-Post-User", result.data.user)
        // navigation.navigate("BottomTab", { screen: "HomeScreen" });
        // window.location.pathname = `/homeScreen`
      } else {
        // alert("Invalid username/password")
        localStorage.setItem("QuinkPostUserLoggedIn", false);

        console.log("invalid user name");
      }
    } catch (e) {
      console.log(e);
    }
  };


  const submitRegister = async (e) => {
    e.preventDefault()
    if (registerValue.password == registerValue.confirmPassword) {
      try {
        const result = await axios.post(`${BACKEND}/user/signUp`, {
          userName: registerValue.userName,
          firstName: registerValue.firstName,
          password: registerValue.password,
          email: registerValue.email,
          // console.log(result.data)
        })
        if (result.data.success) {
          await localStorage.setItem("Quink-Post", result.data.token)
          console.log(result.data)
          dispatch({ type: USER_LOGGED_IN, payload: result.data.user })
          localStorage.setItem("QuinkPostUserLoggedIn", true)

          history.push("/homeScreen");
        }

      } catch (e) { console.log(e) }
    }
    else {
      alert("password and confirm password should be same")
    }
  }


  const handleclick1 = () => {
    if (register === true) {
      setRegister(false);
    }
    if (active == true) {
      setActive(false);
    }
    if (register === false) {
      setRegister(true);
    }
    if (active == false) {
      setActive(true);
    }
  };
  let form;
  let formtitle;
  if (register === true) {
    formtitle = (
      <>
        <div>Already a User? Login</div>
      </>
    );
  } else {
    formtitle = (
      <>
        <div>New User? Signup</div>
      </>
    );
  }
  if (register === true) {
    form = (
      <div className="loginbox position-2">
        <h1>Create Account</h1>
        <div style={{ marginBottom: 10 }}>
          {" "}
          <span
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#0095f6",
              marginRight: 10,
              backgroundColor: "#fff",
              textShadow: "1px 1px grey",
            }}
          >
            Login with google{" "}
          </span>{" "}
          <GoogleLogin
            clientId="990734078330-qteq6i15s9cni5apfkt9qv2okudhqk93.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="info-box">
          <label htmlFor="firstname">FirstName:</label>
          <input type="text" id="firstname" value={registerValue.firstName} onChange={e => setregisterValue(prev => { return { ...prev, firstName: e.target.value } })} />
          {/* <label htmlFor="lastname">LastName:</label>
          <input type="text" id="lastname" /> */}
          <label htmlFor="username-1">User Name</label>
          <input type="text" id="username-1" value={registerValue.userName} onChange={e => setregisterValue(prev => { return { ...prev, userName: e.target.value } })} />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={registerValue.email} onChange={e => setregisterValue(prev => { return { ...prev, email: e.target.value } })} />
          {/* <label htmlFor="email">Address line 1:</label>
          <input type="text" id="email" /> */}
          {/* <label htmlFor="email">Address line 2:</label>
          <input type="text" id="email" /> */}
          {/* <label htmlFor="email">Address line 3:</label>
          <input type="text" id="email" /> */}
          {/* <label htmlFor="email">Pin Code:</label>
          <input type="text" id="email" /> */}
          {/* <label htmlFor="email">City:</label>
          <input type="text" id="email" /> */}
          {/* <label htmlFor="email">State:</label>
          <input type="text" id="email" /> */}
          <label htmlFor="pass-set">Password:</label>
          <input type="password" id="pass-set" value={registerValue.password} onChange={e => setregisterValue(prev => { return { ...prev, password: e.target.value } })} />
          <label htmlFor="pass-set-1">Confirm Password:</label>
          <input type="password" id="pass-set-1" value={registerValue.confirmPassword} onChange={e => setregisterValue(prev => { return { ...prev, confirmPassword: e.target.value } })} />
        </div>
        <button className="button-login">Register</button>
        <button onClick={handleclick1} className="button-toggle">
          {formtitle}
        </button>
      </div>
    );
  } else {
    form = (
      <div className="loginbox position-1">
        <h1>Quink Post | Login</h1>
        <div style={{ marginBottom: 10 }}>
          {" "}
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#0095f6",
              marginRight: 10,
              backgroundColor: "#fff",
              textShadow: "1px 1px grey",
            }}
          >
            Login with google{" "}
          </span>{" "}
          <GoogleLogin
            clientId="990734078330-qteq6i15s9cni5apfkt9qv2okudhqk93.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="info-box">
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            id="username"
            value={login.userName}
            onChange={(value) =>
              setLogin({ ...login, userName: value.target.value })
            }
          />
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            value={login.password}
            onChange={(value) =>
              setLogin({ ...login, password: value.target.value })
            }
          />
        </div>
        <div className="remember-me">
          <input type="checkbox" style={{ cursor: "pointer" }} /> remember me{" "}
        </div>
        <button className="button-login" onClick={submitLogin}>
          Login
        </button>
        <button onClick={handleclick1} className="button-toggle">
          {formtitle}
        </button>
      </div>
    );
  }
  return (
    <div className={`container ${register && "container2"}`}>
      <div>{form}</div>
      <div className="watermark">
        <span>Quink</span>
        <span className="post">
          Post<span className="dot">.</span>
        </span>
      </div>
      <div className="info">
        <span>"</span>Every Content Matters.. Make sure your's mean something
      </div>
    </div>
  );
};

export default Loginpage;
