import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Chatpage from "./Components/chatpage";
import Homepage from "./Components/homepage";
import Loginpage from "./Components/loginpage";
import OriginalPage from "./Components/Original";
import Communitypage from "./Components/communitypage";
import Addpost from "./Components/addpost.jsx";
import Postdetail from "./Components/postdetail";
import Profile from "./Components/profile";
import Challengespage from "./Components/challengespage";
import Magzinepage from "./Components/magzinepage";
import Communitydes from "./Components/communitydes";
import EnterInChallenge from "./Components/EnterInChallenge"
import ProfileOther from "./Components/profileother";
import Editprofile from "./Components/editprofile";
import Mobilemenu from "./Components/Mobile/mobile-menu";
import Questiondes from "./Components/Communitypost/Questiondes";
import AccountSetting from "./Components/accountsetting";
import DownloadApp from "./Components/downloadapp";
import OriginalsDetial from "./Components/originalsDetail";
import AdminPostsUpload from "./Components/AdminPostsUpload"
import HelmetBase from "./Components/HelmetBase";

function App() {

  return (
       <>
      <HelmetBase
        title="Quink Post - Content creation plateform"
        link="/"
        description="an infotainment platform providing both knowledgeable and entertaining content. a platform which lets you earn through content creation and its challenges."
      />
    <Switch>
      <div className="App">
        {/* <Loginpage /> */}

        <Route exact path="/" component={Loginpage} />
        {(() => {

          return (
            <>
              <Route exact path="/home" component={Homepage} />
              <Route exact path="/magz1">
                <Redirect push to={"/Flipbook/flipbook.html"} />
              </Route>{" "}
              <Route exact path="/originals" component={OriginalPage} />
              <Route exact path="/messaging" component={Chatpage} />
              <Route exact path="/community" component={Communitypage} />
              <Route exact path="/addpost" component={Addpost} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/challenges" component={Challengespage} />
              <Route exact path="/magazines" component={Magzinepage} />
              <Route exact path="/edit" component={Editprofile} />
              <Route exact path="/mobile-menu" component={Mobilemenu} />
              <Route exact path="/downloadApp" component={DownloadApp} />
              <Route exact path="/accountsetting" component={AccountSetting} />
              <Route exact path="/originals/details/:postId/quinkpost" component={OriginalsDetial} />
              <Route exact path="/user/:username/:title/:postId" component={Postdetail} />
              <Route exact path="/Community/:communityName/:communityId" component={Communitydes}/>
              <Route exact path="/questiondes" component={Questiondes} />
             <Route exact path="/user/:userName/:OtherProfileId" component={ProfileOther} />
              <Route exact path="/challenge/:challengeName/:challengeId/participate" component={EnterInChallenge} />
              <Route exact path="/admin/quinkpost/741258/originals" component={AdminPostsUpload} />

            </>
          );

        })()}
        {/* <Postdetail /> */}
        {/* <Communitydes /> */}
        {/* <Challengedes /> */}
        {/* <ProfileOther /> */}
        {/* <Questiondes /> */}
      </div>
    </Switch>
    </>
  );
}

export default withRouter(App);
