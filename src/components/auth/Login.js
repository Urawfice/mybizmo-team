import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import "../auth.css";
import Cookies from "universal-cookie";
import axios from "../../Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();
toast.configure();

function Login(props) {
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
          cookies.set("logo", res.data[0].logo);
          cookies.set("businessName", res.data[0].name);
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
          console.log(res.data);
          if (res.data.email !== null) cookies.set("email", res.data.email);
          else cookies.set("phone_number", res.data.phone_number);
          cookies.set("image", res.data.profile.image);
          cookies.set("username", res.data.profile.name);
          cookies.set("id", res.data.id);
          cookies.set("token", res.data.token);
          if (
            res.data.profile.otp_verified_phone ||
            res.data.profile.otp_verified
          ) {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            console.log("A");
            history.push("/home");
          } else {
            console.log("B");
            let url = "";
            // if(res.data.phone_number!==null)
            //     url = 'auth/user/phone/verification'
            // else
            url = "auth/user/email/verification";
            history.push({
              pathname: "/verify-otp",
              state: { cookArr: res.data, url },
            });
            // history.push("/verify-otp")
          }
        })
        .catch((err) => {
          if (err.data) {
            toast.warning(err.response.data.errors.error[0], {
              position: toast.POSITION.TOP_CENTER,
              setTimeout: 2000,
            });
          } else {
            toast.warning("error occured", {
              position: toast.POSITION.TOP_CENTER,
              setTimeout: 2000,
            });
          }

          console.log("err", err.response);
        });
    }
  };

  return (
    <div
      className="font-style"
      style={{ backgroundColor: "white", minHeight: window.innerHeight }}
    >
      <div
        className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding"
        style={{ backgroundColor: "white" }}
      >
        <div className="container main_container">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding login_mian_sec">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 displayInline img_section">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding">
                <h2 className="heading-text">Welcome to {name}</h2>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding">
                <h4 className="heading-text-description">{tag}</h4>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding img_sec_part">
                <div className="login_img_div">
                  {image != null ? (
                    <img src={image} className="landing-page-image" />
                  ) : (
                    <img src="Images/main.png" className="landing-page-image" />
                  )}
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding text-right powered_by">
                <h4 className="btm">Powered by wellness @MyBizmo</h4>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 displayInline">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 sign_in_sec">
                <div className="col-12 noPadding head_sec_for_mob">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding">
                    <h2 className="heading-text">Welcome to {name}</h2>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding">
                    <h4 className="heading-text-description">{tag}</h4>
                  </div>
                </div>
                <form className="form-style loginB">
                  <h3 className="form-title">Sign In</h3>
                  <div className="form-group">
                    <input
                      className="form_input"
                      style={{ paddingLeft: "2vw" }}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      placeholder="Enter email/Phone Number"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form_input"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type={!isVisible ? "password" : "text"}
                      placeholder="Enter your password"
                    />
                    <span className="eye_span">
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
                    <p className="forgot-password text-right">
                      Forgot Password ?
                    </p>
                  </Link>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn  btn-block p-2 sign_in_btn"
                  >
                    {" "}
                    Sign In
                  </button>
                  <Link to="/sign-up" className="already-account">
                    <button
                      type="submit"
                      className="btn  btn-block p-2 not_a_member_btn"
                    >
                      Not a Member ? Sign Up
                    </button>
                  </Link>
                  <p className="alternate-login-text text-center">
                    Or easy login with
                  </p>
                  <div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding easy_login">
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 noPadding text-right">
                        <span className="google-style img_div">
                          <img
                            src="Images/googleimage.png"
                            className="google-image-style social_image"
                          />
                        </span>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 noPadding text-center">
                        <span className="fb-style img_div">
                          {/* <img src='Images/fbicon.png' className="fb-image-style social_image" /> */}
                          <img
                            src="Images/appleimage.png"
                            className="fb-image-style social_image"
                          />
                        </span>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 noPadding text-left">
                        <span className="apple-style img_div">
                          <img
                            src="Images/appleimage.png"
                            className="apple-image-style social_image"
                          />
                        </span>
                      </div>
                    </div>

                    <div className="privacy-policy col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding footer_sec text-center">
                      <p className="ml-3" className="footer-text">
                        The{" "}
                        <em style={{ color: "#03CBC9" }}>
                          <a
                            href={terms}
                            target="_blank"
                            className="terms-color"
                          >
                            terms of use
                          </a>
                        </em>{" "}
                        and{" "}
                        <em style={{ color: "#03CBC9" }}>
                          <a
                            href={policy}
                            target="_blank"
                            className="terms-color"
                          >
                            our Policy
                          </a>
                        </em>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
