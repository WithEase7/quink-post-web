import React, { useEffect, useState } from "react";
import InterviewPost from "./InterviewPost";
import axios from "axios";

const qs = require("qs");
const AuroScholar = () => {
  const [interview, setinterview] = useState([]);
  const [iframeValue, setiframeValue] = useState({});
  const [contact, setcontact] = useState("");
  const [Svalue, setSvalue] = useState(`https://auroscholar.com/dashboard.php?student=`);
  const [StudentClass, setStudentClass] = useState(6)
  const [school_name, setschool_name] = useState("")
  const [student_name, setstudent_name] = useState("")
  const [email_verified, setemail_verified] = useState("")
  const [email_id, setemail_id] = useState("")
  const [board_type, setboard_type] = useState("")


  const result = async () => {
    console.log(contact, "this is contanct")
    const greatresult = await axios.post(
      "https://auroscholar.com/api/partnerapilogin.php",
      qs.stringify({
        partner_id: "458",
        partner_source: "QUINZuISw2",
        // partner_source: "QUINZuLSw2",
        mobile_no: contact,
        student_class: `${StudentClass}`,
        email_verified: email_id.trim() != null ? true : false,
        student_name,
        school_name,
        board_type,
      })
    );
    // https://auroscholar.org?partner_source=QUINZulSw2&mobile_no=8989802546 
    // console.log(greatresult.data.data, "this is if rame");
    if (greatresult.data.type == "success") {

      setiframeValue(greatresult.data.data);
      const value = window.btoa(greatresult.data["data"]["sudent_registration_id"]);
      // console.log(value, "base 64");
      setSvalue(greatresult.data.data.url);
      // setSvalue(`https://auroscholar.org/?partner_source=QUINZuISw2&mobile_no=${contact}`);
      console.log(greatresult.data.data.url, "data url")
      const win = window.open(greatresult.data.data.url, '_blank');
      win.focus();
      // return <a href={greatresult.data.data.url} target="_blank">t</a>
    }
    else {
      alert("invalid number")
    }
  };

  // console.log(StudentClass)

  return (
    <div className="articleFeed">
      {/* <Navbar /> */}
      <div >

        <div className="articleFeed-title " style={{ backgroundColor: "#e6e6e6" }}>Quink Post Scholar</div>
        <div style={{ textAlign: "center" }}>
          <label htmlFor="heading" style={{ marginRight: "15px" }}>
            Select class:
          </label>
          <select name="select" onChange={value => setStudentClass(value.target.value)}>
            {/* <option value="null">Select Class</option> */}
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <div style={{ textAlign: "center" }}>
          <label htmlFor="heading" style={{ marginRight: "15px" }}>
            Contact Number:
          </label>
          <input
            // value={contact}
            onChange={(e) => setcontact(e.target.value)}
            type="number"
            id="heading"
            className="addpost-input-feilds"
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <label htmlFor="heading" style={{ marginRight: "15px" }}>
            Student Name:
          </label>
          <input
            // value={contact}
            onChange={(e) => setstudent_name(e.target.value)}
            type="text"
            id="heading"
            className="addpost-input-feilds"
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <label htmlFor="heading" style={{ marginRight: "15px" }}>
            School Name:
          </label>
          <input
            // value={contact}
            onChange={(e) => setschool_name(e.target.value)}
            type="text"
            id="heading"
            className="addpost-input-feilds"
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <label htmlFor="heading" style={{ marginRight: "15px" }}>
            Email:
          </label>
          <input
            // value={contact}
            onChange={(e) => setemail_verified(e.target.value)}
            type="text"
            id="heading"
            className="addpost-input-feilds"
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <label htmlFor="heading" style={{ marginRight: "15px" }}>
            Board Type:
          </label>
          <select name="Board Type" onChange={value => setboard_type(value.target.value)}>
            {/* <option value="null">Select Class</option> */}
            {/* <option value="Select">Select</option> */}
            <option value="CBSE">CBSE</option>
            <option value="HBSE">HBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="OTHER">OTHER</option>

          </select>
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: "40%",
            marginRight: "40%",
            borderRadius: "15px",
            border: "1px solid",
            marginBottom: "15px",
            cursor: "pointer",          // width: "fit-content",
            padding: "0 5px",
          }}
          onClick={result}
        >
          Submit
        </div>

      </div>
      <div style={{ overflowX: "hidden", overflowY: "hidden" }} className="articlePost">
        <iframe
          id="iframe"
          name="my-iframe"
          src={Svalue}
          // src={`https://auroscholar.org?partner_source=QUINZuISw2&mobile_no=8989802546`}
          height="100%"
          width="100%"
          allow="camera *;microphone *"
        ></iframe>
      </div>
    </div>
  );
};

export default AuroScholar;
