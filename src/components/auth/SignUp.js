import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, InputGroup } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from "../../Axios";
import "../auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();
toast.configure();

const SignUp = () => {
  const history = useHistory();
  const [fullName, setFullName] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [policy, setPolicy] = useState("");
  const [terms, setTerms] = useState("");
  const [tag, setTag] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
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
  }, []);

  function Updatesubmit(e) {
    e.preventDefault();
    let formData = new FormData();

    console.log(email, !isNaN(email));
    if (
      password === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.warning("All fields are required", {
        position: toast.POSITION.TOP_CENTER,
        setTimeout: 2000,
      });
    } else if (password != confirmPassword) {
      toast.warning("Password doesn't Match", {
        position: toast.POSITION.TOP_CENTER,
        setTimeout: 2000,
      });
    } else if (email === "") {
      toast.warning("Please enter a valid email address or phone Number", {
        position: toast.POSITION.TOP_CENTER,
        setTimeout: 2000,
      });
    } else {
      console.log(fullName, email);
      formData.append("name", fullName);
      if (!isNaN(email)) {
        formData.append("phone_number", "+" + email);
      } else formData.append("email", email);
      formData.append("password", password);

      axios
        .post(`/auth/user/register`, formData, {})
        .then((res) => {
          console.log("response from submitting the form successful", res.data);
          let url = "";
          if (res.data.phone_number !== null)
            url = "auth/user/phone/verification";
          else url = "auth/user/email/verification";
          history.push({
            pathname: "/verify-otp",
            state: { cookArr: res.data, url },
          });
        })
        .catch((err) => {
          console.log("ERROR  from update in form", err);
          if (err.response.data.errors.email)
            toast.warning(err.response.data.errors.email[0], {
              position: toast.POSITION.TOP_CENTER,
              setTimeout: 2000,
            });
          else if (err.response.data.errors.phone_number)
            toast.warning(err.response.data.errors.phone_number[0], {
              position: toast.POSITION.TOP_CENTER,
              setTimeout: 2000,
            });
          else if (err.response.data.errors.password)
            toast.warning(err.response.data.errors.password[0], {
              position: toast.POSITION.TOP_CENTER,
              setTimeout: 2000,
            });
          else
            toast.warning("Server error", {
              position: toast.POSITION.TOP_CENTER,
              setTimeout: 2000,
            });
        });
    }
  }

  return (
    // <div className="login-container row">
    //   <div className="login-left">
    //       <h1 className="login-business-name">Welcome to Business Name</h1>
    //       <h1 className="login-business-subname">A one stop solution for your business needs</h1>
    //       <div class="login-img-container">
    //           <img src="Images/test2.jpg" alt=""/>
    //       {/* {image!=null ?
    //           <img src={image}/>
    //           :
    //           <img src='Images/main.png'  />
    //       } */}
    //       </div>
    //       <h4 className="text-left" style={{fontSize:"1.3vw",fontWeight:"500", paddingLeft:"9vw", marginTop:"4vh", position:"relative",color:"#252525"}}>Powered by</h4>
    //       <h4 className="text-left" style={{fontSize:"1.3vw",fontWeight:"500", paddingLeft:"9vw", marginTop:"0vh", position:"relative",color:"#252525"}}>wellness @MyBizmo</h4>
    //   </div>

    //   <div className="login-right">
    //       <form className="signup-form-style">
    //         <h3 className="signup-form-title">Sign Up</h3>
    //         <div className="form-group" style={{ marginBottom: "2.78vh" }}>
    //         <input className="no-outline"
    //           onChange={(e) => setFullName(e.target.value)}
    //           style={{
    //             padding: "0.97vw",
    //             borderRadius: "12px",
    //             backgroundColor: "#F2F1F7",
    //             fontStyle: "Nunito",
    //             border: "none",
    //             fontSize: "0.97vw",
    //             fontWeight: "600",
    //             width:"100%",
    //             paddingLeft:"2vw"
    //           }}
    //           placeholder="Enter Full Name"
    //         />
    //       </div>

    //       <div className="form-group" style={{ marginBottom: "20px" }}>
    //         <input className="no-outline"
    //           onChange={(e) => setEmail(e.target.value)}
    //           style={{
    //             padding: "0.97vw",
    //             borderRadius: "12px",
    //             backgroundColor: "#F2F1F7",
    //             fontStyle: "Nunito",
    //             border: "none",
    //             fontSize: "0.97vw",
    //             width:"100%",
    //             fontWeight: "600",
    //             paddingLeft:"2vw"
    //           }}
    //           placeholder="Enter email/Phone Number"
    //         />
    //       </div>

    //       <div className="form-group" style={{ marginBottom: "20px" }}>
    //         <span><input  className="no-outline"
    //           onChange={(e) => setPassword(e.target.value)}
    //           style={{
    //             padding: "0.97vw",
    //             borderRadius: "12px",
    //             backgroundColor: "#F2F1F7",
    //             fontStyle: "Nunito",
    //             border: "none",
    //             width:"100%",
    //             fontSize: "0.97vw",
    //             fontWeight: "600",
    //             paddingLeft:"2vw"
    //           }}
    //           type={!isVisible?"password":"text"}
    //           placeholder="Enter your password"
    //         />
    //         </span>
    //         <span><i style={{marginLeft:"-2vw", color:"grey"}} onClick={(e)=>setIsVisible(!isVisible)} class={isVisible? "fa fa-eye" : "fa fa-eye-slash" }></i></span>
    //       </div>

    //       <div className="form-group" style={{ marginBottom: "2.78vh" }}>
    //         <span><input  className="no-outline"
    //           onChange={(e) => setConfirmPassword(e.target.value)}
    //           style={{
    //             padding: "0.97vw",
    //             borderRadius: "12px",
    //             backgroundColor: "#F2F1F7",
    //             fontStyle: "Nunito",
    //             border: "none",
    //             width:"100%",
    //             fontSize: "0.97vw",
    //             fontWeight: "600",
    //             paddingLeft:"2vw"
    //           }}
    //           type={!isVisible1?"password":"text"}
    //           placeholder="Confirm password"
    //         /></span>
    //         <span>
    //         <i style={{marginLeft:"-2vw", color:"grey"}} onClick={(e)=>setIsVisible1(!isVisible1)} class={isVisible1? "fa fa-eye" : "fa fa-eye-slash" }></i></span>
    //       </div>
    //       {!checked ?
    //         <button
    //           type="submit"
    //           onClick={Updatesubmit}
    //           className="btn  btn-block p-2"
    //           disabled
    //           style={{
    //             borderRadius: "12px",
    //             backgroundColor: "#03CBC9",
    //             color: "white",
    //             marginTop:"4vh",
    //             fontSize: "0.92vw",
    //             fontWeight: "normal",
    //             width:"100%",
    //             height:"6vh"
    //           }}
    //         >
    //         Sign Up
    //         </button>
    //         :
    //         <button
    //           type="submit"
    //           onClick={Updatesubmit}
    //           className="btn  btn-block p-2"
    //           style={{
    //             borderRadius: "12px",
    //             backgroundColor: "#03CBC9",
    //             marginTop:"4vh",
    //             color: "white",
    //             fontSize: "1rem",
    //             height:"6vh",
    //             fontWeight: "normal",
    //           }}
    //         > Sign Up
    //         </button>
    //       }
    //       <Link to="/login" className='already-account '>
    //         {" "}
    //         <button
    //           type="submit"
    //           className="btn btn-block p-2 NotaMem"
    //           style={{
    //             borderRadius: "12px",
    //             marginTop: "10px",
    //             marginTop:"2vh",
    //             borderColor: "black",
    //             height:"6vh",
    //             fontSize: "0.75rem",
    //             fontWeight: "500",
    //           }}
    //         >
    //           Already have an Account ? Sign In
    //         </button>
    //       </Link>

    //       <div className='signup-privacy-policy' style={{ position:"absolute",bottom:"11vh"}}>
    //         <input type="checkbox" id="fruit1" name="fruit-1" value="Apple" onChange={(e)=>setChecked(!checked)}/>&nbsp;&nbsp;
    //         <label for="policy"> By signing you agree to the
    //           <a href={terms} target="_blank" className="terms-color"> terms of use &nbsp;</a>and &nbsp;
    //           <a href={policy} target="_blank" className="terms-color">our Policy</a>
    //         </label>
    //       </div>
    //     </form>
    //   </div>
    // </div>

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
                  <h3 className="form-title">Sign Up</h3>
                  <div className="form-group">
                    <input
                      className="form_input"
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                      type="name"
                      placeholder="Enter Full Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form_input"
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
                  <div className="form-group">
                    <input
                      className="form_input"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      type={!isVisible1 ? "password" : "text"}
                      placeholder="Confirm password"
                    />
                    <span className="eye_span">
                      <i
                        style={{ marginLeft: "-2rem" }}
                        onClick={(e) => setIsVisible1(!isVisible1)}
                        class={isVisible1 ? "fa fa-eye" : "fa fa-eye-slash"}
                      ></i>
                    </span>
                  </div>
                  {!checked ? (
                    <button
                      type="submit"
                      disabled
                      className="btn  btn-block p-2 sign_in_btn"
                      style={{ cursor: "default" }}
                    >
                      {" "}
                      Sign In
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={Updatesubmit}
                      className="btn  btn-block p-2 sign_in_btn"
                    >
                      {" "}
                      Sign In
                    </button>
                  )}
                  <Link to="/login" className="already-account">
                    <button
                      type="submit"
                      className="btn  btn-block p-2 not_a_member_btn"
                    >
                      Already have an account ? Sign In
                    </button>
                  </Link>
                  <div>
                    <div className="privacy-policy col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding footer_sec text-center">
                      {/* <InputGroup className="ml-3"> */}
                      <p className="ml-3" className="footer-text">
                        <input
                          type="checkbox"
                          onChange={(e) => setChecked(!checked)}
                        />
                        &nbsp;&nbsp; By signing you agree to the{" "}
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
                      {/* </InputGroup> */}
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
};

export default SignUp;
