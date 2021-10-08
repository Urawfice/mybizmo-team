import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import "./test.css";
import Cookies from "universal-cookie";
import axios from "../../Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();
toast.configure();

function LoginTest(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policy, setPolicy] = useState("");
  const [terms, setTerms] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (cookies.get("token")) {
      history.push("/home");
    } else {
      axios
        .get(`/users/business-detail-list`)
        .then((res) => {
          console.log(res.data);
          setName(res.data[0].name);
          setImage(res.data[0].user_image);
          setPolicy(res.data[0].privacy_policy);
          setTerms(res.data[0].terms);
          setTag(res.data[0].tag_line);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    let formData = new FormData();
    if (email === "" || password === "") {
      toast.warning("Please fill all required field", {
        position: toast.POSITION.TOP_CENTER,
        setTimeout: 2000,
      });
    } else {
      if (!isNaN(email)) formData.append("phone_number", email);
      else formData.append("email", email);
      formData.append("password", password);

      axios
        .post(`/auth/user/login`, formData, {})
        .then((res) => {
          if (res.data.email !== null) cookies.set("email", res.data.email);
          else cookies.set("phone_number", res.data.phone_number);
          cookies.set("image", res.data.profile.image);
          cookies.set("username", res.data.profile.name);
          cookies.set("id", res.data.id);
          cookies.set("token", res.data.token);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          history.push("/home");
        })
        .catch((err) => {
          toast.warning(err.response.data.errors.error[0], {
            position: toast.POSITION.TOP_CENTER,
            setTimeout: 2000,
          });
          console.log("err", err.response);
        });
    }
  };

  return (
    <div
      className="login-container row"
      style={{ backgroundColor: "white", minHeight: window.innerHeight }}
    >
      <div className="login-left">
        <h1 className="login-business-name">Welcome to {name}</h1>
        <h1 className="login-business-subname">
          A one stop solution for your business needs
        </h1>
        <div class="login-img-container">
          <img src="Images/test2.jpg" alt="" />
          {/* {image!=null ? 
                    <img src={image}/>
                    :
                    <img src='Images/main.png'  />
                } */}
        </div>
        <h4
          className="text-left"
          style={{
            fontSize: "1.3vw",
            fontWeight: "500",
            paddingLeft: "9vw",
            marginTop: "4vh",
            position: "relative",
            color: "#252525",
          }}
        >
          Powered by
        </h4>
        <h4
          className="text-left"
          style={{
            fontSize: "1.3vw",
            fontWeight: "500",
            paddingLeft: "9vw",
            marginTop: "0vh",
            position: "relative",
            color: "#252525",
          }}
        >
          wellness @MyBizmo
        </h4>
      </div>

      <div className="login-right">
        <form className="login-form-style">
          <h3 className="login-form-title">Sign In</h3>
          <div className="form-group" style={{ marginBottom: "2.78vh" }}>
            <input
              className="no-outline"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={{
                padding: "0.97vw",
                borderRadius: "12px",
                backgroundColor: "#F2F1F7",
                fontStyle: "Nunito",
                border: "none",
                fontSize: "0.97vw",
                fontWeight: "500",
                width: "100%",
                height: "10vh",
                paddingLeft: "2vw",
              }}
              type="email"
              placeholder="Enter email/Phone Number"
            />
          </div>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <span>
              <input
                className="no-outline"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{
                  padding: "0.97vw",
                  borderRadius: "12px",
                  backgroundColor: "#F2F1F7",
                  fontStyle: "Nunito",
                  border: "none",
                  fontSize: "0.97vw",
                  fontWeight: "600",
                  width: "100%",
                  paddingLeft: "2vw",
                }}
                type={!isVisible ? "password" : "text"}
                placeholder="Enter your password"
              />
            </span>
            <span>
              <i
                style={{ marginLeft: "-2rem" }}
                onClick={(e) => setIsVisible(!isVisible)}
                class={isVisible ? "fa fa-eye" : "fa fa-eye-slash"}
              ></i>
            </span>
          </div>
          <Link
            to="/forgot-password-enter-email-page"
            className="already-account"
          >
            <p className="login-forgot-password text-right">
              Forgot Password ?
            </p>
          </Link>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-block p-2"
            style={{
              borderRadius: "12px",
              backgroundColor: "#03CBC9",
              color: "white",
              fontSize: "0.97vw",
              marginTop: "4vh",
              fontWeight: "400",
              height: "6vh",
            }}
          >
            {" "}
            Sign In
          </button>
          <Link to="/sign-up" className="already-account">
            <button
              type="submit"
              className="btn NotaMem btn-block p-2"
              style={{
                borderRadius: "9px",
                marginTop: "1.39vw",
                borderColor: "black",
                fontSize: "0.90vw",
                fontWeight: "500",
                height: "6vh",
                color: "#252525",
              }}
            >
              Not a member ? Sign Up
            </button>
          </Link>
          <p className="login-alternate-login-text">Or easy login with</p>
          <div>
            <Row
              className="iconDiv"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Col></Col>
              <Col className="login-google-style text-center">
                <img
                  src="Images/googleimage.png"
                  className="login-google-image-style"
                />
              </Col>
              <Col className="login-fb-style text-center">
                <img src="Images/fbicon.png" className="login-fb-image-style" />
              </Col>
              <Col className="login-apple-style text-center">
                <img
                  src="Images/appleimage.png"
                  className="login-apple-image-style"
                />
              </Col>
              <Col></Col>
            </Row>

            <div className="login-privacy-policy">
              <p
                className="text-center"
                style={{
                  paddingBottom: "-1vh",
                  paddingLeft: "auto",
                  paddingRight: "auto",
                  marginLeft: "5vw",
                  position: "absolute",
                  bottom: "9vh",
                }}
              >
                The &nbsp;
                <a href={terms} target="_blank" className="terms-color">
                  terms of use&nbsp;
                </a>{" "}
                and &nbsp;
                <a href={policy} target="_blank" className="terms-color">
                  our Policy
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginTest;
