import React, { useState } from "react";
import "../../Styles/searchstyle/peopleSearch.css";
import profile from "../../Assets/colour.jpg";
import SearchPeople from "./searchPeople";

function PeopleSearch() {
  const [searchpeople1, setSearchpeople] = useState([
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
    {
      displayname: "Display Name",
      username: "@username",
    },
  ]);
  let peopleList = searchpeople1.map((people, index) => {
    return (
      <div className="peopleSearch-Container">
        <div
          className="peopleSearch-Profileimg"
          style={{ backgroundImage: `url(${profile})` }}
        ></div>
        <div className="peopleSearch-Profileinfo">
          <div className="peopleSearch-displayname">{people.displayname}</div>
          <div className="peopleSearch-username">{people.username}</div>
        </div>
      </div>
    );
  });
  return (
    <div>{peopleList}</div>
    // <div className="peopleSearch-Container">
    //   <div
    //     className="peopleSearch-Profileimg"
    //     style={{ backgroundImage: `url(${profile})` }}
    //   ></div>
    //   <div className="peopleSearch-Profileinfo">
    //     <div className="peopleSearch-displayname">Display Name</div>
    //     <div className="peopleSearch-username">@Username</div>
    //   </div>
    // </div>
  );
}

export default PeopleSearch;
