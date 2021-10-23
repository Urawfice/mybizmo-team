import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import axios from "../../Axios";
import Cookies from "universal-cookie";
import { Dropdown } from "react-bootstrap";
import {
  BrowserRouter,
  Route,
  Redirect,
  useHistory,
  Link,
} from "react-router-dom";
import SliderOne from "./SliderOne";
import Whirligig from "react-whirligig";
import { Button, Modal, Popover } from "react-bootstrap";
import phone from "./BizImages/phone.png";
import location from "./BizImages/location.png";
import messages from "./BizImages/message.png";
import fbimg from "./BizImages/fb.png";
import igimg from "./BizImages/ig.png";
import twitterimg from "./BizImages/twitter.png";
import linkedinimg from "./BizImages/linkedin.png";
import GoogleMapReact from "google-map-react";
import MapContainer from "../../Map";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../BizZone/ContactUsPage.css";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const cookies = new Cookies();
toast.configure();

export default function ReachUs(props) {
  const [name, setName] = useState("");
  const [terms, setTerms] = useState("");
  const [policy, setPolicy] = useState("");
  const [logo, setLogo] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [data, setData] = useState("");
  const [smInf, setsmInf] = useState(false);
  const [smTest, setsmTest] = useState(false);
  const [smtopRead, setsmTopRead] = useState(false);
  const [smNews, setsmNews] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [activeInfId, setActiveInfId] = useState(-1);
  const [newsShow, setnewsShow] = useState(false);
  const [trshow, settrShow] = useState(false);
  const [trData, settrData] = useState("");
  const [newsData, setnewsData] = useState("");
  const [trReadMore, SettrReadMore] = useState(false);
  const [trReadData, settrReadData] = useState("");

  const [name1, setName1] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [ofcAddress, setOfcAddress] = useState("");
  const [ofcEmail, setOfcEmail] = useState("");
  const [ofcPhone, setOfcPhone] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [fb, setFb] = useState("");
  const [ig, setIg] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [showContact, setShowContact] = useState(false);

  let whirligig;
  const next = () => whirligig.next();
  const prev = () => whirligig.prev();

  useEffect(() => {
    setName(cookies.get("username"));
    console.log(cookies);
    window.scrollTo(0, 0);
    if (cookies.get("token")) {
      window.location.href = "/home";
    }

    axios
      .get(`/users/business-detail-list`)
      .then((res) => {
        console.log(res.data);
        cookies.set("logo", res.data[0].logo);
        cookies.set("businessName", res.data[0].name);
        setBusinessName(res.data[0].name);
        setTerms(res.data[0].terms);
        setLogo(res.data[0].logo);
        setOfcAddress(res.data[0].ofc_address);
        setOfcEmail(res.data[0].ofc_email);
        setOfcPhone(res.data[0].ofc_phone);
        setTwitter(res.data[0].ofc_twitter);
        setLinkedin(res.data[0].ofc_linkedin);
        setIg(res.data[0].ofc_instagram);
        setFb(res.data[0].ofc_fb);
        setLat(res.data[0].ofc_lat);
        setLong(res.data[0].ofc_long);
        setPolicy(res.data[0].privacy_policy);
      })
      .catch((err) => {
        console.log("err", err);
      });

    axios
      .get("/users/landing-page", {
        // headers: {
        //     'Authorization': 'Token' + ' ' + cookies.get('token')
        // }
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const history = useHistory();
  const submitForm = (e) => {
    console.log(props.value);
    if (props.value === 1) props.handleData(2);
    else props.handleData(1);
  };

  const onLogout = async () => {};

  const handleArrowNext = (e) => {
    if (data) {
      if (currIndex < data.news.length - 1) {
        setCurrIndex(currIndex + 1);
      }
    }
  };
  const handleArrowPrev = (e) => {
    if (data) {
      if (currIndex > 0) {
        setCurrIndex(currIndex - 1);
      }
    }
  };

  function updateBasic() {
    let formData = new FormData();

    formData.append("full_name", name1);
    formData.append("phone_number", contact);
    formData.append("email", email);
    formData.append("query_text", message);

    axios
      .post(`/users/public-query-create`, formData, {})
      .then((res) => {
        console.log("response from submitting the form successful", res.data);
        toast.success("Thanks for submitting a response", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
        // location.reload();
      })
      .catch((err) => {
        console.log("ERROR  from update in form", err);
      });
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <header id="navbar">
        <div id="home">
          {/* <button id="menubtn" onClick={() => submitForm()}>
                        <img src='/Images/menuicon.svg' height="15vh" alt="" style={{ "margin": "3px 5px", "color": "black", }} /> </button> */}
          {/* <img alt="" id="menufull" src='/Images/menuicon.svg' height="15px" onClick={() => submitForm()} style={{ "margin": "3px 5px", "color": "black", 'cursor': "pointer" }} /> */}
          <Link to="/">
            <img alt="" style={{ margin: "0px 10px" }} id="mylogo" src={logo} />
          </Link>
          <Link to="/">
            <p
              style={{
                "font-size": "3vh",
                margin: "0px 0px",
                color: "black",
                fontFamily: "GFS Neohellenic, sans-serif",
              }}
            >
              {businessName}
            </p>
          </Link>
        </div>
        <div id="userLinks">
          <Link to="/about-us">
            <p
              className="pn"
              id="name"
              style={{ margin: "4px 25px", color: "black", fontSize: "2.2vh" }}
            >
              ABOUT US
            </p>
          </Link>
          <p
            className="pn"
            id="name"
            style={{ margin: "4px 25px", color: "black", fontSize: "2.2vh" }}
          >
            {" "}
            <a
              href="/#topreads"
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              MUST READ{" "}
            </a>{" "}
          </p>
          <p
            className="pn"
            id="name"
            style={{ margin: "4px 25px", color: "black", fontSize: "2.2vh" }}
          >
            <a href="/#infs" style={{ textDecoration: "none", color: "black" }}>
              INFLUENCERS{" "}
            </a>
          </p>
          <p
            onClick={() => setShowContact(true)}
            className="pn"
            id="name"
            style={{
              margin: "4px 25px",
              color: "black",
              fontSize: "2.2vh",
              cursor: "pointer",
            }}
          >
            REACH US
          </p>
          <Link to="/login">
            <p
              className="pn"
              id="name"
              style={{ margin: "4px 25px", color: "black", fontSize: "2.2vh" }}
            >
              SIGN IN / SIGN UP
            </p>
          </Link>
          {/* <a className="pn" style={{"margin":"0px 5px","color":"black"}} alt="profilepic" ><img alt="profilepic" src='/Images/profilepic.png' height="30px" /></a> */}
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <img
                className="down-ar-lp"
                src="/Images/downarr.svg"
                height="15px"
                alt="Arrow"
                style={{ margin: "2px 3px", color: "black" }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link to="/about-us">
                <Dropdown.Item id="namedown" href="#/action-1">
                  ABOUT US
                </Dropdown.Item>
              </Link>
              <Dropdown.Item href="/#topreads">MUST READ</Dropdown.Item>
              <Dropdown.Item href="/#infs">INFLUENCERS</Dropdown.Item>
              <Dropdown.Item onClick={() => setShowContact(true)}>
                REACH US
              </Dropdown.Item>

              <Dropdown.Item>
                <Link to="/login">SIGN IN / SIGN UP</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>

      <div>
        <div style={{ width: "93.5%" }} className="row pt-4 mx-auto mt-5">
          <div
            // style={{ width: "93.5%" }}
            className="col-12 mx-auto  Cu-nav-background "
          >
            <p className="cu-nav-title pt-2 pl-3 pb-2 mb-0"> Get in touch!</p>
          </div>
        </div>
        <div>
          <div
            className="row  cu-form-background p-3 m-auto"
            style={{ width: "93.5%" }}
          >
            <div className="col-11 m-auto">
              <p className="cu-form-title"> Any question or feedback?</p>
              <p className="cu-form-subtitle"> Just write us a message</p>

              <div className="row ">
                <div className="col-md-5  mr-5">
                  <div className="row">
                    <div className="col-xl-12 ">
                      <p className="cu-form-name-title mb-0">Name</p>
                      <input
                        type="text"
                        className="cu-form-input p-1"
                        value={name1}
                        onChange={(e) => setName1(e.target.value)}
                      ></input>
                    </div>
                    <div className="col-xl-12 mt-2">
                      <p className="cu-form-name-title mb-0">Contact Number</p>
                      <input
                        type="text"
                        className="cu-form-input p-1"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      ></input>
                    </div>

                    <div className="col-xl-12 mt-2">
                      <p className="cu-form-name-title mb-0">Email Id</p>
                      <input
                        type="email"
                        className="cu-form-input p-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="col-md-5  ">
                  <p className="cu-form-name-title mb-0">Message</p>
                  <textarea
                    className="cu-form-input"
                    placeholder="write your message here..."
                    rows="8"
                    cols="50"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <button
                onClick={() => updateBasic()}
                className="cu-submit-btn mt-5 mb-5"
              >
                Submit
              </button>
            </div>
          </div>

          <div
            style={{ width: "93.5%" }}
            className="row mx-auto  Cu-nav-background mt-5"
          >
            <div className="col-xl-12 ">
              <p className="cu-nav-title pt-2 pl-3 pb-2 mb-1"> Find us Here</p>
            </div>
          </div>

          {/* <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 1 }}

                        >
                            <AnyReactComponent
                                lat={59.955413}
                                lng={30.337844}
                                text="My Marker"
                            />
                        </GoogleMapReact>
                    </div> */}

          <div style={{ height: "400px", width: "200px" }}>
            <MapContainer data={{ lat: lat, long: long }} />
          </div>

          <div
            style={{ width: "93.5%" }}
            className="row mx-auto cu-form-background pt-5"
          >
            {ofcPhone.length > 0 ? (
              <div className="col-xl-3  mx-auto">
                <img className="cu-inage-style" src={phone}></img>
                <p className="text-center mt-3 cu-find-us-text">Phone</p>
                <p className="text-center cu-find-us-info-text">{ofcPhone}</p>
              </div>
            ) : (
              <></>
            )}
            {ofcAddress.length > 0 ? (
              <div className="col-xl-3  mx-auto">
                <img className="cu-inage-style" src={location}></img>
                <p className="text-center mt-3 cu-find-us-text">Address</p>
                <p className="text-center cu-find-us-info-text">{ofcAddress}</p>
              </div>
            ) : (
              <></>
            )}
            {ofcEmail.length > 0 ? (
              <div className="col-xl-3  mx-auto">
                <img
                  className="cu-inage-style"
                  style={{ width: "100px", height: "80px" }}
                  src={messages}
                ></img>
                <p className="text-center mt-4 cu-find-us-text">Email</p>
                <p className="text-center cu-find-us-info-text">{ofcEmail}</p>
              </div>
            ) : (
              <></>
            )}
          </div>

          {ig.length > 0 ||
          twitter.length > 0 ||
          fb.length > 0 ||
          linkedin.length > 0 ? (
            <div
              style={{ width: "93.5%" }}
              className="row  mx-auto cu-form-background"
            >
              <div className="col-xxl-6  mx-auto mt-5">
                <p className="text-center cu-connect-withus-text">
                  Connect with us
                </p>
                <div className="row mt-5 pb-5">
                  {ig.length > 0 ? (
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-6 mx-auto ">
                      <a href={ig} target="_blank">
                        <img src={igimg} className="cu-inage-style"></img>
                      </a>
                    </div>
                  ) : (
                    <></>
                  )}
                  {twitter.length > 0 ? (
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-6 mx-auto ">
                      <a href={twitter} target="_blank">
                        <img src={twitterimg} className="cu-inage-style"></img>
                      </a>
                    </div>
                  ) : (
                    <></>
                  )}
                  {fb.length > 0 ? (
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-6 mx-auto ">
                      <a href={fb} target="_blank">
                        <img src={fbimg} className="cu-inage-style"></img>
                      </a>
                    </div>
                  ) : (
                    <></>
                  )}
                  {ofcEmail.length > 0 ? (
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-6 mx-auto ">
                      <a href={linkedin} target="_blank">
                        <img className="cu-inage-style" src={linkedinimg}></img>
                      </a>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="footer-cont-lp mt-3 p-3">
        <div className="row">
          <div className="col-12 col-md-4 desc-footer-lp text-center mb-3">
            <img
              src="/Images/cIcon.svg"
              style={{ height: "2vh", marginRight: "5px" }}
            />
            Copyright@MyBizmo_wellness
          </div>
          <div className="col-12 col-md-5 desc-footer-lp text-center mb-3">
            {twitter.length > 0 ? (
              <a href={twitter} target="_blank">
                <img
                  className="px-3"
                  src="/Images/twittorI.svg"
                  style={{ height: "3vh" }}
                />
              </a>
            ) : (
              <></>
            )}
            {ig.length > 0 ? (
              <a href={ig} target="_blank">
                <img
                  className="px-3"
                  src="/Images/youtubeI.svg"
                  style={{ height: "3vh" }}
                />
              </a>
            ) : (
              <></>
            )}
            {ig.length > 0 ? (
              <a href={ig} target="_blank">
                <img
                  className="px-3"
                  src="/Images/instagram.svg"
                  style={{ height: "3vh" }}
                />
              </a>
            ) : (
              <></>
            )}
            {fb.length > 0 ? (
              <a href={fb} target="_blank">
                <img
                  className="px-3"
                  src="/Images/facebook (1).svg"
                  style={{ height: "3vh" }}
                />
              </a>
            ) : (
              <></>
            )}
            {ig.length > 0 ? (
              <a href={ig} target="_blank">
                <img
                  className="px-3"
                  src="/Images/whatsapp.svg"
                  style={{ height: "3vh" }}
                />
              </a>
            ) : (
              <></>
            )}
            {linkedin.length > 0 ? (
              <a href={linkedin} target="_blank">
                <img
                  className="px-3"
                  src="/Images/linkedin.svg"
                  style={{ height: "3vh" }}
                />
              </a>
            ) : (
              <></>
            )}
          </div>
          <div className="col-12 col-md-3 desc-footer-lp text-center ">
            {terms.length > 0 ? (
              <span>
                <a href={terms} target="_blank">
                  T&C
                </a>
              </span>
            ) : (
              <></>
            )}
            {terms.length > 0 ? (
              <span>
                <a href={policy} target="_blank">
                  {" "}
                  &nbsp;&nbsp;&nbsp;Privacy Policy
                </a>
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
