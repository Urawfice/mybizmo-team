import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import "../auth.css";

const cookies = new Cookies();

function Logout(props) {
  const history = useHistory();
  useEffect(() => {
    cookies.remove("id");
    cookies.remove("token");
    cookies.remove("email");
    cookies.remove("isVerify");
    cookies.remove("username");
    cookies.remove("businessName");
    cookies.remove("logo");
    cookies.remove("image");
    history.push("/login");
  }, []);
  return <div></div>;
}

export default Logout;
