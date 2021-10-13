import React, { useState } from "react";
import Loader from "react-loader-spinner";

function ForgotPossword() {
  const [showforgotLoader, setshowforgotLoader] = useState(false);
  const [showinput, setshowinput] = useState(false);

  const handleshowforgotLoader = () => {
    setshowforgotLoader(true);
    setshowinput(true);
  };

  const handleSavePassword = ()=> {
      alert("Password Changed")
  }

  return (
    <>
      <div
        style={{
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "50px",
          fontSize: "20px",
        }}
      >
        Have you forgotten your password?
      </div>
      {(() => {
        if (showforgotLoader) {
          return (
            <div
              className="info-box"
              style={{ alignItems: "center", marginTop: "50px" }}
            >
              <Loader
                visible={showforgotLoader}
                type="Oval"
                color="#00BFFF"
                height={100}
                width={100}
              />
            </div>
          );
        } else {
          return (
            <div style={{ marginLeft: "27px", marginTop: "50px" }}>
              <div className="info-box">
                <label htmlFor="username">Email :</label>
                <input
                  type="text"
                  required
                  id="username"
                  //   value={login.userName}
                  //   onChange={(value) =>
                  //     setLogin({ ...login, userName: value.target.value })
                  //   }
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "50px",
                  fontSize: "22px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "grey",
                }}
                onClick={handleshowforgotLoader}
              >
                Enter
              </div>
            </div>
          );
        }
      })()}
      {(() => {
        if (showinput) {
          return (
            <div style={{ marginLeft: "3px", marginTop: "50px" }}>
              <div className="info-box">
                <label htmlFor="username">New Password :</label>
                <input
                  type="text"
                  id="username"
                  required
                  //   value={login.userName}
                  //   onChange={(value) =>
                  //     setLogin({ ...login, userName: value.target.value })
                  //   }
                />
              </div>
              <div className="info-box">
                <label htmlFor="username">Confirm Password :</label>
                <input
                  type="text"
                  required
                  id="username"
                  //   value={login.userName}
                  //   onChange={(value) =>
                  //     setLogin({ ...login, userName: value.target.value })
                  //   }
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "50px",
                  fontSize: "22px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "grey",
                }}
                onClick={handleSavePassword}
              >
                Save Changes
              </div>
            </div>
          );
        } else {
          return <></>;
        }
      })()}
    </>
  );
}

export default ForgotPossword;
