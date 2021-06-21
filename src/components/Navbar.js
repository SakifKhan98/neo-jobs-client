import React, { useContext, useEffect, useState } from "react";
import ResponsiveAntMenu from "responsive-ant-menu";
import { Button, Menu } from "antd";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [isEmployer, setIsEmployer] = useState(false);

  useEffect(() => {
    fetch("https://localhost:5000/isEmployer", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setIsEmployer(data));
  }, []);

  return (
    <ResponsiveAntMenu
      // activeLinkKey={location.pathname}
      mobileMenuContent={(isMenuShown) =>
        isMenuShown ? <button>Close</button> : <button>Open</button>
      }
      menuClassName={"responsive-ant-menu"}
    >
      {(onLinkClick) => (
        <Menu>
          <Menu.Item key="/" className={"menu-home"}>
            <Link onClick={onLinkClick} to="/">
              Home
            </Link>
          </Menu.Item>

          {loggedInUser.name !== undefined ? (
            <Menu.Item key="/#login">{loggedInUser.name}</Menu.Item>
          ) : (
            <>
              <Menu.Item key="/login">
                <Button>
                  <a onClick={onLinkClick} href={"/login"}>
                    Login As Employer
                  </a>
                </Button>
              </Menu.Item>
              <Menu.Item key="/loginAsJobSeeker">
                <Button>
                  <a onClick={onLinkClick} href={"/loginAsJobSeeker"}>
                    Login As Job Seeker
                  </a>
                </Button>
              </Menu.Item>
            </>
          )}

          <Menu.Item key="/dashboard">
            <Link onClick={onLinkClick} to="/dashboard">
              Employer Dashboard
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </ResponsiveAntMenu>
  );
};

export default Navbar;
