import React, { useState } from "react";
import "../Styles/loginpage.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BACKEND from "./Constants/Backend";
import Scrollspy from "react-scrollspy";
import { USER_LOGGED_IN } from "./Reducer/Action";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import GoogleLogin from "react-google-login";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Loginpage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [userName, setUserName] = useState("")
  // const [password, setPassword] = useState("")
  const applink =
    "https://apkfab.com/quink-post/com.quinkpost.quinkpost/apk?h=32e536d86dfa2803a52be2c2faa5bfedef20d6399515110b994b6e84fe68d84e";
  const [login, setLogin] = useState({
    userName: "",
    password: "",
  });
  const [registerValue, setregisterValue] = useState({});
  const [showLink, setshowLink] = useState(applink);
  const [showLoader, setshowLoader] = useState(false);
  const [showtoken, setshowtoken] = useState("");
  const [Mismatch, setMismatch] = useState(false);
  const [forgot, setforgot] = useState({
    email: "",
    forgotPassword1: "",
    forgotPassword2: "",
  });
  const [emailmatched, setemailmatched] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const checklogin = await localStorage.getItem("QuinkPostUserLoggedIn");
        console.log(checklogin, "checklogin");
        const applink = await axios.get(`${BACKEND}/app/link`);
        const temp = applink.data;
        // console.log(temp[0]?.appLink)
        setshowLink(temp[0]?.appLink);
        // console.log(temp[0].applink)
        // setshowLoader(true);
        const userToken = await localStorage.getItem("Quink-Post");
        console.log(userToken, ">>>>>>");
        setshowtoken(userToken);
        if (userToken != " ") {
          console.log(userToken);
          const result = await axios.post(`${BACKEND}/user/key`, {
            token: userToken,
          });
          console.log(result.data, "from useEffect");
          if (result.data.success) {
            console.log(result.data);
            localStorage.setItem("QuinkPostUserLoggedIn", true);
            dispatch({ type: USER_LOGGED_IN, payload: result.data.user });
            setshowLoader(false);
            history.push("/");
          } else {
            localStorage.setItem("QuinkPostUserLoggedIn", false);
            setshowLoader(false);
          }
        } else {
          console.log("empty token ", userToken);
          setshowLoader(false);
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

        history.push("/");
      }
      // console.log(data)
      // const result = await axios.post(`${BACKEND}/user/login`,
      //   { userName: googleUser.userName, password: login.password })
    }
  };

  const submitLogin = async () => {
    console.log(login, "<<<<<");
    setshowLoader(true);
    if (login.userName == "" || login.password == "") {
      alert(" check username/password ");
      setshowLoader(false);
      return null;
    }
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
        setshowLoader(false);
        history.push("/");
        // localStorage.setItem("Quink-Post-User", result.data.user)
        // navigation.navigate("BottomTab", { screen: "HomeScreen" });
        // window.location.pathname = `/home`
      } else {
        setshowLoader(false);
        alert("Invalid username/password");
        localStorage.setItem("QuinkPostUserLoggedIn", false);
        console.log("invalid user name");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const featurecard1 = (
    <Card elevation="20" style={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Earn Money"
          height="180"
          image="https://m.economictimes.com/thumb/msid-70740347,width-1200,height-900,resizemode-4,imgsize-186055/rupee-getty-1200.jpg"
          title="Earn Money"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Create Content! Earn Money!
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            India's first platform that let's you earn through content creation.
            Content can be created in native languages as well.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        <Button href="/about" size="small" color="primary">
          Get Started
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );

  const featurecard2 = (
    <Card style={{ maxWidth: 345 }} elevation="20">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Content Creation Challenges"
          height="180"
          image="data:image/jpeg;base64,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"
          title="Content Creation Challenges"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Participate in Ongoing Challenges.
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Participate in content creation challenges and win fiscal
            incentives.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        <Button href="/about" size="small" color="primary">
          Get Started
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );

  const featurecard3 = (
    <Card style={{ maxWidth: 345 }} elevation="20">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Infotainment"
          height="180"
          image="https://thumbs.dreamstime.com/b/infotainment-media-word-concepts-banner-soft-news-mass-tv-entertainment-infographics-linear-icons-purple-background-206580029.jpg"
          title="Infotainment"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            A complete Infotainment Platform.
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            A platform where you can get both infotainment and knowledgeable
            stuff.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        <Button href="/about" size="small" color="primary">
          Get Started
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );

  const featurecard4 = (
    <Card style={{ maxWidth: 345 }} elevation="20">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Connect with Community members"
          height="180"
          image="https://legamart.com/articles/wp-content/uploads/2020/08/unnamed.png"
          title="Connect with Community members"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Join Community! Interact, Share & Work!
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Connect with similar minds. Share your knowledge and learn from
            them.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        <Button href="/about" size="small" color="primary">
          Get Started
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );

  const matchThisEmail = async () => {
    try {
      console.log(forgot.email, "<<<<");
      const { data } = await axios.get(
        `${BACKEND}/user/forgotit/${forgot.email}`
      );
      // console.log(data)
      if (data.success) {
        setemailmatched(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submitRegister = async (e) => {
    setshowLoader(true);
    e.preventDefault();
    if (registerValue.password == registerValue.confirmPassword) {
      try {
        const result = await axios.post(`${BACKEND}/user/signUp`, {
          userName: registerValue.userName,
          firstName: registerValue.firstName,
          password: registerValue.password,
          email: registerValue.email,
          // console.log(result.data)
        });
        if (result.data.success) {
          await localStorage.setItem("Quink-Post", result.data.token);
          console.log(result.data);
          dispatch({ type: USER_LOGGED_IN, payload: result.data.user });
          localStorage.setItem("QuinkPostUserLoggedIn", true);

          history.push("/");
          setshowLoader(false);
        } else {
          setshowLoader(false);
          alert("Username is already taken");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("password and confirm password should be same");
    }
  };

  const handleclick4 = () => {
    setemailmatched(false);
    if (register === null) {
      setRegister(false);
    }
    if (register != null) {
      setRegister(null);
    }
  };

  const ChangePass = async () => {
    try {
      if (forgot.forgotPassword1 != forgot.forgotPassword2) {
        setMismatch(true);
      } else {
        const { data } = await axios.patch(
          `${BACKEND}/user/changePassword/${forgot.email}/${forgot.forgotPassword1}`
        );
        if (data.success) {
          alert("reset password successful");
          setRegister(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

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
            Login with google
          </span>
          <GoogleLogin
            clientId="990734078330-qteq6i15s9cni5apfkt9qv2okudhqk93.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        {(() => {
          if (showLoader) {
            return (
              <>
                <div className="info-box" style={{ alignItems: "center" }}>
                  <Loader
                    visible={showLoader}
                    type="MutatingDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                  />
                </div>
              </>
            );
          } else {
            return (
              <>
                <div className="info-box">
                  <label htmlFor="firstname">FirstName:</label>
                  <input
                    type="text"
                    required
                    id="firstname"
                    value={registerValue.firstName}
                    onChange={(e) =>
                      setregisterValue((prev) => {
                        return { ...prev, firstName: e.target.value };
                      })
                    }
                  />
                  {/* <label htmlFor="lastname">LastName:</label>
          <input type="text" id="lastname" /> */}
                  <label htmlFor="username-1">User Name</label>
                  <input
                    required
                    type="text"
                    id="username-1"
                    value={registerValue.userName}
                    onChange={(e) =>
                      setregisterValue((prev) => {
                        return { ...prev, userName: e.target.value };
                      })
                    }
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    required
                    value={registerValue.email}
                    onChange={(e) =>
                      setregisterValue((prev) => {
                        return { ...prev, email: e.target.value };
                      })
                    }
                  />
                  <label htmlFor="pass-set">Password:</label>
                  <input
                    type="password"
                    id="pass-set"
                    required
                    value={registerValue.password}
                    onChange={(e) =>
                      setregisterValue((prev) => {
                        return { ...prev, password: e.target.value };
                      })
                    }
                  />
                  <label htmlFor="pass-set-1">Confirm Password:</label>
                  <input
                    type="password"
                    required
                    id="pass-set-1"
                    value={registerValue.confirmPassword}
                    onChange={(e) =>
                      setregisterValue((prev) => {
                        return { ...prev, confirmPassword: e.target.value };
                      })
                    }
                  />
                </div>
              </>
            );
          }
        })()}

        <button className="button-login" onClick={submitRegister}>
          Register
        </button>
        <button onClick={handleclick1} className="button-toggle">
          {formtitle}
        </button>
      </div>
    );
  } else if (register == false) {
    form = (
      <div className="loginbox position-1">
        <a href="https://play.google.com/store/apps/details?id=com.quinkpost.quinkpost">
          <button
            className="button-login"
            style={{
              width: "8rem",
              height: "3rem",
              fontSize: "1rem",
              padding: "4px",
            }}
          >
            Download App
          </button>
        </a>

        <h1>Quink Post | Login</h1>

        <div style={{ marginBottom: 10 }}>
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
            Login with google
            {/* {showtoken} */}
          </span>
          <GoogleLogin
            clientId="990734078330-qteq6i15s9cni5apfkt9qv2okudhqk93.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        {(() => {
          if (showLoader) {
            return (
              <>
                <div className="info-box" style={{ alignItems: "center" }}>
                  <Loader
                    visible={showLoader}
                    type="MutatingDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                  />
                </div>
              </>
            );
          } else {
            return (
              <>
                {" "}
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
              </>
            );
          }
        })()}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            margin: "10px",
          }}
        >
          <input type="checkbox" style={{ cursor: "pointer" }} />{" "}
          <div style={{ fontSize: 14 }}>remember me</div>
          <span
            onClick={handleclick4}
            style={{
              marginLeft: "60px",
              textDecoration: "none",
              color: "blue",
              fontSize: 14,
            }}
          >
            forgot password?
          </span>
        </div>
        <button className="button-login" onClick={submitLogin}>
          Login
        </button>
        <button onClick={handleclick1} className="button-toggle">
          {formtitle}
        </button>
      </div>
    );
  } else if (register == null) {
    form = (
      <div className="loginbox position-1">
        <a href="https://play.google.com/store/apps/details?id=com.quinkpost.quinkpost">
          <button
            className="button-login"
            style={{
              width: "8rem",
              height: "3rem",
              fontSize: "1rem",
              padding: "4px",
            }}
          >
            Download App
          </button>
        </a>

        <h1>Quink Post | Forgot Password</h1>

        <div style={{ marginBottom: 10 }}>
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
            Login with google
            {/* {showtoken} */}
          </span>
          <GoogleLogin
            clientId="990734078330-qteq6i15s9cni5apfkt9qv2okudhqk93.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        {(() => {
          if (showLoader) {
            return (
              <>
                <div className="info-box" style={{ alignItems: "center" }}>
                  <Loader
                    visible={showLoader}
                    type="MutatingDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                  />
                </div>
              </>
            );
          } else {
            // setemailmatched(false)

            return (
              <>
                {" "}
                <div className="info-box">
                  <label htmlFor="email">Email :</label>
                  <input
                    type="text"
                    id="username"
                    value={forgot.email}
                    onChange={(value) =>
                      setforgot({ ...forgot, email: value.target.value })
                    }
                  />
                  {(() => {
                    if (emailmatched) {
                      // if(Mismatch){
                      //   // return  <div> Password should be same</div>
                      // }
                      return (
                        <>
                          <label htmlFor="password">New Password :</label>
                          <input
                            type="password"
                            id="password"
                            value={forgot.forgotPassword1}
                            onChange={(value) =>
                              setforgot({
                                ...forgot,
                                forgotPassword1: value.target.value,
                              })
                            }
                          />
                          <label htmlFor="password">Retype password</label>
                          <input
                            type="password"
                            id="password"
                            value={forgot.forgotPassword2}
                            onChange={(value) =>
                              setforgot({
                                ...forgot,
                                forgotPassword2: value.target.value,
                              })
                            }
                          />
                        </>
                      );
                    }
                  })()}
                </div>
              </>
            );
          }
        })()}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            margin: "10px",
          }}
        >
          <input type="checkbox" style={{ cursor: "pointer" }} />{" "}
          <div style={{ fontSize: 14 }}>remember me</div>
          <span
            onClick={handleclick4}
            style={{
              marginLeft: "60px",
              textDecoration: "none",
              color: "blue",
              fontSize: 14,
            }}
          >
            {" "}
            Go to Login
          </span>
        </div>
        {(() => {
          if (!emailmatched) {
            return (
              <button className="button-login" onClick={matchThisEmail}>
                Submit
              </button>
            );
          } else {
            if (Mismatch) {
              return (
                <button
                  className="button-login"
                  style={{ backgroundColor: "red" }}
                  onClick={() => setMismatch(false)}
                >
                  Password should be same
                </button>
              );
            }
            return (
              <button className="button-login" onClick={ChangePass}>
                Change Password
              </button>
            );
          }
        })()}

        <button onClick={handleclick1} className="button-toggle">
          {formtitle}
        </button>
      </div>
    );
  }

  return (
    <>
      <Scrollspy
        className="scrollspy"
        items={[
          // "section-1",
          // "section-2",
          "section-3",
          "section-4",
        ]}
        currentClassName="isCurrent"
      >
        <h3 style={{ margin: "10px", padding: "6px 0", color: "#fff" }}>
          Quink Post
        </h3>
        {/* <li style={{ margin: "10px", padding: "9px 0", marginLeft: "auto" }}>
          <a style={{ color: "#fff", textDecoration: "none" }} href="#section-1">
            Login
          </a>
        </li> */}
        {/* <li style={{ margin: "10px", padding: "9px 0", marginLeft: "auto" }}>
          <a style={{ color: "#fff", textDecoration: "none" }} href="#section-2">
            Register
          </a>
        </li> */}
        <li style={{ margin: "10px", padding: "9px 0", marginLeft: "auto" }}>
          <a
            style={{ color: "#fff", textDecoration: "none" }}
            href="#section-3"
          >
            Features
          </a>
        </li>
        <li style={{ margin: "10px", padding: "9px 0" }}>
          <a
            style={{ color: "#fff", textDecoration: "none" }}
            href="#section-4"
          >
            Contact
          </a>
        </li>
      </Scrollspy>

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

        <div className="services-quink">
          {/* <section id="section-1">
            <h2>Section 1</h2>
            <p>
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of Le
            </p>
          </section> */}
          {/* <section id="section-2">
            <h2>Section 2</h2>
            <p>
              look even slightly believable. If you are going to use a passage
              of Lorem Ipsum, you need to be sure there isn't anything
              embarrassing hidden in the middle of text. All the Lorem Ipsum
              generators on the Internet tend to repeat predefined chunks as
              necessary, making this the first true generator on the Internet.
              It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum
              which looks reasonable. The generated Lorem Ipsum is therefore
              always free from repetition, injected humour, or
              non-characteristic words etc.
            </p>
          </section> */}
          <div id="section-3">
            <h2 style={{ fontSize: "35px" }}>Features</h2>
            {/* <p>
              India's first infotainment platform that let's you earn through
              content creation.
            </p>
            <p>
              A platform with content creation, community
              connect/work with similar minds, mentorship and content creation
              challenges also providing Quink Post original content such as transcribed
              interviews, survey reports, research summaries, written podcasts,
              magazines, articles.
            </p>
            <p>Create Content! Earn Money!</p> */}
            <div style={{ textAlign: "-webkit-center" }}>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={6} lg={3} md={3}>
                  <div>{featurecard1}</div>
                </Grid>
                <Grid item xs={12} sm={6} lg={3} md={3}>
                  <div>{featurecard2}</div>
                </Grid>
                <Grid item xs={12} sm={6} lg={3} md={3}>
                  <div>{featurecard3}</div>
                </Grid>
                <Grid item xs={12} sm={6} lg={3} md={3}>
                  <div>{featurecard4}</div>
                </Grid>
              </Grid>
            </div>
            {/* <div style={{ display: "flex" }}>
              <div style={{ marginRight: "25px" }}>{featurecard1}</div>
              <div style={{ marginRight: "25px" }}>{featurecard2}</div>
              <div style={{ marginRight: "25px" }}>{featurecard3}</div>
              <div style={{ marginRight: "25px" }}>{featurecard3}</div>
              <div style={{ marginRight: "25px" }}>{featurecard3}</div>
            </div> */}
          </div>
          <div id="section-4">
            <h2 style={{ fontSize: "35px" }}>Contact Us</h2>
            <p style={{ fontWeight: "bold", marginLeft: "8px" }}>
              E-Mail : info@quinkpost.com
            </p>
            <p style={{ fontWeight: "bold", marginLeft: "8px" }}>
              Address : Bhopal Smart City Development Corporation Ltd,
              Govindpura
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
