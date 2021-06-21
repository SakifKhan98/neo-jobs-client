import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHome,
  faGripHorizontal,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../App";
// import { HashLink } from "react-router-hash-link";

const Sidebar = () => {
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [isEmployer, setIsEmployer] = useState(false);

  useEffect(() => {
    fetch("https://rocky-river-97926.herokuapp.com/isEmployer", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setIsEmployer(data));
  }, []);

  return (
    <div
      className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4"
      style={{ height: "100vh", color: "white" }}
    >
      <ul
        style={{ listStyle: "none", marginTop: "60px", paddingRight: "20px" }}
        className="list-unstyled"
      >
        <li>
          <Link to="/dashboard" className="text-white">
            <FontAwesomeIcon icon={faGripHorizontal} /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="text-white">
            <FontAwesomeIcon icon={faHome} /> <span>Home</span>
          </Link>
        </li>
        <div>
          <li>
            <Link to="/AddJobs" className="text-white">
              <FontAwesomeIcon icon={faPlus} /> <span>Add Jobs</span>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
