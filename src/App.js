import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

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
import Challengedes from "./Components/challengedes";
import ProfileOther from "./Components/profileother";
import Editprofile from "./Components/editprofile";
import Mobilemenu from "./Components/Mobile/mobile-menu";
import Questiondes from "./Components/Communitypost/Questiondes";
import AccountSetting from "./Components/accountsetting";
import PostChallenge from "./Components/PostChallenge";
import DownloadApp from "./Components/downloadapp";
import { useHistory } from "react-router-dom";
import draftjsToHtml from "draftjs-to-html";
import OriginalsDetial from "./Components/originalsDetail";
import AdminPostsUpload from "./Components/AdminPostsUpload"

function App() {

  // draftjsToHtml 416 no line

  // if (entity.type === 'IMAGE') {
  //   var alignment = entity.data.alignment;

  //   if (!alignment || alignment == 'none') {
  //     alignment = 'center';
  //   }
  //   return `<div style="text-align:${alignment};"><img src="${entity.data.src}" alt="${entity.data.alt}" style="height: ${entity.data.height};width: ${entity.data.width}"/></div>`;
  // }
  return (
    <Switch>
      <div className="App">
        {/* <Loginpage /> */}

        <Route exact path="/" component={Loginpage} />
        {(() => {

          return (
            <>
              <Route exact path="/homeScreen" component={Homepage} />
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
              <Route exact path="/:title/:username/:postId" component={Postdetail} />
              <Route exact path="/Communitydes/:communityId" component={Communitydes} />
              <Route exact path="/questiondes" component={Questiondes} />
              <Route exact path="/:challengeName/:challengeId" component={EnterInChallenge} />
              <Route exact path="/profileOther/:OtherProfileId/" component={ProfileOther} />
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
  );
}

export default withRouter(App);
