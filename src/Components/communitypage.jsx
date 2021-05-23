import React from "react";
import Communityfeed from "./communityfeed";
import Navbar from "./navbar";
import HelmetBase from "./HelmetBase";
function Communitypage() {
  return (
    <div>
      <HelmetBase title="Quink Post - Community" link="/community" />
      <Navbar />
      <Communityfeed />
    </div>
  );
}

export default Communitypage;
