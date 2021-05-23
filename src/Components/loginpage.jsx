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

  useEffect(() => {
    (async () => {
      try {
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
            history.push("/home");
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

        history.push("/home");
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
        history.push("/home");
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
        <Button size="small" color="primary">
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
          image="https://islamfact.com/wp-content/uploads/2019/01/huUIsZLk5o.jpg"
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
        <Button size="small" color="primary">
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
        <Button size="small" color="primary">
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
        <Button size="small" color="primary">
          Get Started
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );

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

          history.push("/home");
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
  } else {
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

        <div style={{ display: "flex", flexDirection: "row", alignContent: 'center', margin: "10px" }}>
          <input type="checkbox" style={{ cursor: "pointer" }} /> <div style={{fontSize: 14}}>remember me</div>
          <Link to='/forgotPassword' style={{ marginLeft: "60px", textDecoration: "none", color: "blue", fontSize: 14 }}>forgot password?</Link>
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
          <section id="section-3">
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
          </section>
          <section id="section-4">
            <h2 style={{ fontSize: "35px" }}>Contact Us</h2>
            <p style={{ fontWeight: "bold", marginLeft: "8px" }}>
              E-Mail : info@quinkpost.com
            </p>
            <p style={{ fontWeight: "bold", marginLeft: "8px" }}>
              Address : Bhopal Smart City Development Corporation Ltd,
              Govindpura
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
