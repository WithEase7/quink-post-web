import React, { useRef } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Quinkpost from "../Assets/Quinkpost.jpg";
import '../Styles/comingsoon.css';

function Comingsoon() {
  const ref = useRef();

  const flipcard = () => {
    return (
      <Flippy
        flipOnHover={true} // default false
        flipDirection="horizontal" // horizontal or vertical
        ref={ref} // to use toggle method like ref.curret.toggle()
        // if you pass isFlipped prop component will be controlled component.
        // and other props, which will go to div
        style={{ width: "320px", height: "320px" }} /// these are optional style, it is not necessary
      >
        <FrontSide style={{ backgroundColor: "#41669d", padding: 0 }}>
          <img
            src={Quinkpost}
            style={{ maxWidth: "-webkit-fill-available", height: "320px" }}
          />
        </FrontSide>
        <BackSide style={{backgroundColor: "#d3d9dbd5"}}>
          <div
            style={{
              textAlign: "center",
              fontSize: 27,
              fontWeight: "bold",
              color: "black",
              paddingBottom: "65px",
            }}
          >
            Quink's Infotainment Magz
          </div>
          <a href="https://heyzine.com/flip-book/59de7901e9.html" style={{ color: "inherit", textDecorationColor: "#000" }}>
            <div
              style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: "#000" }}
            >
              View
            </div>
          </a>
        </BackSide>
      </Flippy>
    );
  };

  return (
    <div className="coming-soon">
      {/* This Feature will be soon Available. */}
      {/* <a href="https://heyzine.com/flip-book/59de7901e9.html"> Flipbook </a> */}
      <div> {flipcard()}</div>
    </div>
  );
}

export default Comingsoon;
