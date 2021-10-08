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
import leaf from "./BizImages/leaf.png";
import "react-toastify/dist/ReactToastify.css";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const cookies = new Cookies();
toast.configure();

export default function AboutUs(props) {
  const [name, setName] = useState("");
  const [terms, setTerms] = useState("");
  const [policy, setPolicy] = useState("");
  const [logo, setLogo] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [data, setData] = useState("");
  const [smInf, setsmInf] = useState(true);
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

  const [showContact, setShowContact] = useState(false);

  const [whoWeAre, setWhoWeAre] = useState("");
  const [ourMission, setOurMission] = useState("");
  const [ourMissionHeading, setOurMissionHeading] = useState("");

  const [certificate, setCertificate] = useState([]);

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
        setPolicy(res.data[0].privacy_policy);
        setTwitter(res.data[0].ofc_twitter);
        setLinkedin(res.data[0].ofc_linkedin);
        setIg(res.data[0].ofc_instagram);
        setFb(res.data[0].ofc_fb);
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

    axios
      .get("/users/about-us", {})
      .then((res) => {
        console.log(res.data);
        console.log(res.data[0].certificates.map);
        setCertificate(res.data[0].certificates);
        console.log(res.data[1].who_are_we);
        setWhoWeAre(res.data[1].who_are_we);
        console.log(res.data[2].our_mission);
        setOurMission(res.data[2].our_mission);
        console.log(res.data[3].our_mission_heading);
        setOurMissionHeading(res.data[3].our_mission_heading);
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
      .post(
        `/users/public-query-create`,
        formData
        // {
        //     headers: {
        //         'Authorization': 'Token' + ' ' + cookies.get('token')
        //     },
        // }
      )
      .then((res) => {
        console.log("response from submitting the form successful", res.data);
        toast.success("Thanks for submitting a response", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
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
          <p
            className="pn"
            id="name"
            style={{ margin: "4px 25px", color: "black", fontSize: "2.2vh" }}
          >
            ABOUT US
          </p>
          <p
            className="pn"
            id="name"
            style={{ margin: "4px 25px", color: "black", fontSize: "2.2vh" }}
          >
            {" "}
            <a href="/#topreads"> MUST READ </a>{" "}
          </p>
          <p
            className="pn"
            id="name"
            style={{ margin: "4px 25px", color: "black", fontSize: "2.2vh" }}
          >
            <a href="/#infs">INFLUENCERS </a>
          </p>
          <Link to="/reach-us">
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
          </Link>
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
              <Dropdown.Item id="namedown" href="#/action-1">
                ABOUT US
              </Dropdown.Item>
              <Dropdown.Item href="/#topreads">MUST READ</Dropdown.Item>
              <Dropdown.Item href="/#infs">INFLUENCERS</Dropdown.Item>
              <Link to="/reach-us">
                <Dropdown.Item onClick={() => setShowContact(true)}>
                  REACH US
                </Dropdown.Item>
              </Link>

              <Dropdown.Item>
                <Link to="/login">SIGN IN / SIGN UP</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="inf-3-lp mt-4 pt-5 ">
        <div className="pur-tp py-3 pl-4">WHO WE ARE</div>
        <div className="col-xxl-12  biz-bottom-card-back ">
          <p className="biz-zone-long-text-padding p-4 biz-zone-text-top biz-zone-top-font-size">
            {whoWeAre}
          </p>
        </div>
      </div>

      <div className="inf-3-lp ">
        <div className="pur-tp py-3 pl-4">OUR MISSION</div>
        <div className="col-xxl-12  biz-bottom-card-back">
          <p className="text-center pt-4 pb-3 biz-zone-text-top biz-font-weight-big biz-zone-top-font-size ">
            {ourMissionHeading}
          </p>
          <p className="biz-zone-long-text-padding mt-4 biz-zone-text-top biz-zone-top-font-size mt-4">
            {ourMission}
          </p>
        </div>

        <div className="row ">
          {certificate.length > 0 &&
            certificate.map((item) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-11  mx-auto">
                <div className="row">
                  <div className="col-xl-12 mx-auto ">
                    <img
                      src={leaf}
                      style={{ display: "flex", margin: "auto" }}
                    />
                    <p
                      style={{ position: "absolute", top: "30px" }}
                      className="our-mission-title-text text-center"
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className="col-xl-12 mx-auto ">
                    <p className="text-center biz-zone-text-top biz-font-weight-big biz-zone-top-font-size ">
                      {item.certified_by}
                    </p>
                  </div>

                  <div className="col-xl-12 mx-auto ">
                    <p className="text-center biz-zone-text-top biz-zone-top-font-size">
                      {item.created_at.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {!smInf ? (
        <div id="infs" className="inf-3-lp ">
          <div className="pur-tp py-3 pl-4">
            MEET THE TEAM
            <span
              className="pr-4"
              onClick={() => setsmInf(true)}
              style={{ float: "right", cursor: "pointer" }}
            >
              {" "}
              Show More
            </span>
          </div>
          <div
            className="pb-4 pt-3 mb-4"
            style={{ backgroundColor: "#f1eeee" }}
          >
            <div className="row mt-4">
              <div className="col-12 col-md-4 text-center m-auto ">
                <div className="con-img-lp">
                  <img
                    className="inf-img-lp"
                    src={data && data.influencers[0].image}
                  />
                </div>
                <div className="font-weight-bold">
                  {data && data.influencers[0].name}
                </div>
                <div>{data && data.influencers[0].role}</div>
              </div>
              <div className="col-12 col-md-4  text-center  ">
                <div className="con-img-lp">
                  <img
                    className="inf-img-lp"
                    src={data && data.influencers[1].image}
                  />
                </div>
                <div className="font-weight-bold">
                  {data && data.influencers[1].name}
                </div>
                <div>{data && data.influencers[1].role}</div>
              </div>
              <div className="col-12 col-md-4  text-center m-auto ">
                <div className="con-img-lp">
                  <img
                    className="inf-img-lp"
                    src={data && data.influencers[2].image}
                  />
                </div>
                <div className="font-weight-bold">
                  {data && data.influencers[2].name}
                </div>
                <div>{data && data.influencers[2].role}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="infs" className="inf-3-lp ">
          <div className="pur-tp py-3 pl-4">
            MEET THE TEAM
            {/* <span className='pr-4' onClick={() => setsmInf(false)} style={{ float: "right", cursor: "pointer" }} > Show Less</span> */}
          </div>
          <div
            className="less-padding-card pb-4 pt-3 mb-4 p-5"
            style={{ backgroundColor: "#f1eeee" }}
          >
            <div
              class="accordion"
              id="accordionExample"
              style={{ maxHeight: "520px", overflow: "auto" }}
            >
              {data &&
                data.influencers.map((item) => (
                  <div class="accordion-item">
                    <h2 class="accordion-header" id={item.user_id}>
                      <div className="row">
                        <div className="col">
                          <img
                            src={item.image}
                            className="biz-profile-pic-style  m-2"
                            style={{
                              height: "100px",
                              width: "100px",
                              objectFit: "cover",
                            }}
                          />

                          <span
                            style={{ fontSize: "2vh" }}
                            className="name-lp-inf biz-font-weight-big  ml-2"
                          >
                            {" "}
                            {item.name}
                          </span>
                          <span
                            style={{
                              fontSize: "1.8vh",
                              position: "absolute",
                              top: "78px",
                              left: "133px",
                            }}
                            className="role-inf-lp  ml-2"
                          >
                            {item.role}
                          </span>
                        </div>

                        <div className="col-12 col-sm m-auto text-right">
                          {activeInfId === item.id ? (
                            <button
                              className="know-ins"
                              onClick={() => setActiveInfId(-1)}
                            >
                              Know Less
                              <img
                                style={{ height: "18px", marginLeft: "10px" }}
                                src="/Images/back-icon.svg"
                              />
                            </button>
                          ) : (
                            <button
                              className="know-ins"
                              onClick={() => setActiveInfId(item.id)}
                            >
                              Know More
                              <img
                                src="/Images/downarr.svg"
                                style={{ height: "18px", marginLeft: "10px" }}
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    </h2>
                    {activeInfId === item.id ? (
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <strong>{item.master_bio} Some Bio</strong>
                          <div className="mt-3">
                            <span style={{ fontWeight: "600" }}>
                              Certifications :{" "}
                            </span>
                            {item.master_certification}
                          </div>
                          <div className="mt-3">
                            <a href={item.fb} target="_blank">
                              <img
                                src="/Images/fbC.svg"
                                style={{ height: "3vh", marginRight: "25px" }}
                              />
                            </a>
                            <a href={item.instagram} target="_blank">
                              <img
                                src="/Images/instaC.svg"
                                style={{ height: "3vh", marginRight: "25px" }}
                              />
                            </a>
                            <a href={item.twitter} target="_blank">
                              <img
                                src="/Images/twitC.svg"
                                style={{ height: "3vh", marginRight: "25px" }}
                              />
                            </a>
                            <a href={item.linkedin} target="_blank">
                              <img
                                src="/Images/linkedC.svg"
                                style={{ height: "3vh", marginRight: "25px" }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
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
                 &nbsp;&nbsp;&nbsp; Privacy Policy
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
