import Cookies from "js-cookie";
import React from "react";
import "../Navbar.scss";

function User(props) {
  const isLoggedIn = props.loggedUser !== "";

  const logout = () => {
    const url = "http://" + document.domain + ":8080/logout";
    fetch(url, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          props.setLoggedUser("");
          Cookies.remove("isLoggedIn");
          console.log("logged out");
        } else {
          console.log("response from server was not 200");
        }
      })
      .catch((error) => console.log(error));
  };

  let content = "";
  if (isLoggedIn) {
    content = (
      <span className="nav-element-content" href="/account">
        <p>
          hello <span className="user-name">{props.loggedUser}</span>
        </p>
        <p className="user-logout" onClick={logout}>
          Log Out
        </p>
      </span>
    );
  } else {
    content = (
      <a href="/login" className="nav-element-content user-login">
        Log In
      </a>
    );
  }

  return (
    <li key="user" className="nav-element user">
      {content}
    </li>
  );
}

export default User;