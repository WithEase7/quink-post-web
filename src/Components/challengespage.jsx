import React from "react";
import Challengesfeed from "./challengesfeed";
import Navbar from "./navbar";
import HelmetBase from "./HelmetBase";

function Challengespage() {
  return (
    <div>
      <HelmetBase title="Quink Post - Challenge" link="/challenges" />
      <Navbar />
      <Challengesfeed />
    </div>
  );
}

export default Challengespage;
