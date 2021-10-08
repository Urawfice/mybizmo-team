import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "../../Axios";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();
toast.configure();

const VerifyOtp = (props) => {
  const [otp, setOtp] = useState("");
  const [isSend, setIsSend] = useState(true);
  const [policy, setPolicy] = useState("");
  const [name, setName] = useState("");
  const [terms, setTerms] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState(null);

  const history = useHistory();
  const location = useLocation();

  console.log(location.state.cookArr);
  const url = location.state.url;
  let email = location.state.cookArr.email;
  let id = location.state.cookArr.id;
  let phone_number = location.state.phone_number;
  let token = location.state.cookArr.token;
  let profile_image = location.state.cookArr.profile.image;
  let username = location.state.cookArr.profile.username;

  useEffect(() => {
    if (cookies.get("token")) {
      // history.push('/home');
    } else {
      console.log(location.state);
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

  const resendOtp = () => {
    let url = "";
    if (phone_number !== null) url = "auth/user/resend/otp/phone";
    else url = "auth/user/resend/otp";
    axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: "Token " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
        setIsSend(false);
        setTimeout(() => {
          setIsSend(true);
        }, 60000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log(typeof otp);
    if (email !== null) formData.append("otp", otp);
    else formData.append("otp_phone", otp);
    console.log("token");
    axios
      .post(url, formData, {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (
          res.data.message === "Your otp does not match" ||
          res.data.message === "Verification code does not match"
        ) {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
            setTimeout: 2000,
          });
        } else if (
          res.data.message === "Your phone number verified successfully" ||
          res.data.message === "Successfully verified your email"
        ) {
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
        }
      })
      .catch((err) => {
        toast.error("there is a server error", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
        console.log(err);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setOtp(e.target.value);
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
                <form className="form-style otpB">
                  <h3 className="form-title">Enter Otp</h3>
                  <div className="form-group">
                    <input
                      className="form_input"
                      onChange={handleChange}
                      value={otp}
                      type="name"
                      placeholder="Enter OTP here"
                    />
                  </div>

                  {isSend ? (
                    <p
                      className="forgot-password text-right"
                      onClick={resendOtp}
                      style={{ cursor: "pointer" }}
                    >
                      Resend OTP
                    </p>
                  ) : (
                    <p className="forgot-password text-right">
                      OTP will be resend after one minute
                    </p>
                  )}
                  <button
                    type="submit"
                    onClick={verifyOtp}
                    className="btn  btn-block p-2 sign_in_btn"
                  >
                    {" "}
                    Verify
                  </button>
                  <div></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
