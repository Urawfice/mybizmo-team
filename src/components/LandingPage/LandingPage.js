import React, { useState, useEffect, useRef } from "react";
import "./LandingPage.css";
import axios from "../../Axios";
import Cookies from "universal-cookie";
import { Dropdown } from "react-bootstrap";
// import Gallery from '../Gallery/Gallery';
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
import parser from "html-react-parser";

const cookies = new Cookies();

export default function LandingPage(props) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [policy, setPolicy] = useState("");
  const [terms, setTerms] = useState("");
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

  const [trId, settrId] = useState(-1);

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
  const [insOverlay, setinsOverlay] = useState(true);

  const [shareSubject, setShareSubject] = useState("");
  const [shareEmail, setShareEmail] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [showShare, setShowShare] = useState(false);

  const [showContact, setShowContact] = useState(false);
  const shareHandleShow = () => setShowShare(true);
  const shareHandleClose = () => {
    setShowShare(false);
  }
  let whirligig;
  const next = () => whirligig.next();
  const prev = () => whirligig.prev();

  const modalRef = useOnClickOutsideRef(() => {
    // setShowShare(false);
  });
  function useOnClickOutsideRef(callback, initialValue = null) {
    const elementRef = useRef(initialValue);
    useEffect(() => {
      window.scrollTo(0, 0);
    },[])
    useEffect(() => {
      function handler(event) {
        if (!elementRef.current?.contains(event.target)) {
          callback();
        }
      }
      window.addEventListener("click", handler);
      return () => window.removeEventListener("click", handler);
    }, [callback]);
    return elementRef;
  }

  useEffect(() => {
    setName(cookies.get("username"));
    console.log(cookies);

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
        setLogo(res.data[0].logo);
        setTerms(res.data[0].terms);
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
      .post(`/users/public-query-create`, formData, {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log("response from submitting the form successful", res.data);
        // location.reload();
      })
      .catch((err) => {
        console.log("ERROR  from update in form", err);
      });
  }
  const onMsgClick = (e) => {
    console.log("close");
    setShowShare(!showShare);
  };
  const onSendMsg = (e) => {
    console.log("send");
    axios
      .post(
        "/users/must-read-share",
        {
          mail_to: shareEmail,
          message: shareMessage,
        },
        {}
      )
      .then((res) => {
        console.log(res);
        alert("Artical shared successfully");
      })
      .catch((err) => {
        console.log("There is in error");
      });
  };
  return (
    <div>
      <div style={{ backgroundColor: "white" }}>
        <header id="navbar">
          <div id="home">
            {/* <button id="menubtn" onClick={() => submitForm()}>
                        <img src='/Images/menuicon.svg' height="15vh" alt="" style={{ "margin": "3px 5px", "color": "black", }} /> </button> */}
            {/* <img alt="" id="menufull" src='/Images/menuicon.svg' height="15px" onClick={() => submitForm()} style={{ "margin": "3px 5px", "color": "black", 'cursor': "pointer" }} /> */}
            <img alt="" style={{ margin: "0px 10px" }} id="mylogo" src={logo} />

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
          </div>
          <div id="userLinks">
            <Link to="/about-us">
              <p
                className="pn"
                id="name"
                style={{
                  margin: "4px 25px",
                  color: "black",
                  fontSize: "2.2vh",
                }}
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
              <a href="#topreads"> MUST READ </a>{" "}
            </p>
            <p
              className="pn"
              id="name"
              style={{ margin: "4px 25px", color: "black", fontSize: "2.2vh" }}
            >
              <a href="#infs">INFLUENCERS </a>
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
                style={{
                  margin: "4px 25px",
                  color: "black",
                  fontSize: "2.2vh",
                }}
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
                <Dropdown.Item href="#topreads">MUST READ</Dropdown.Item>
                <Dropdown.Item href="#infs">INFLUENCERS</Dropdown.Item>
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

        <div style={{ height: "3vh" }}></div>

        <div className="banner-image-lp">
          {/* < SliderOne show={1}>
                    <div >
                        <img className='banner-img' src={data && data.banners[0].banner_image}  />
                    </div>
                    <div >
                        <img className='banner-img' src={data && data.banners[0].banner_image}  />
                    </div>
                    <div >
                        <img src={data && data.banners[0].banner_image}  />
                    </div>
                    <div >
                        <img src={data && data.banners[0].banner_image}  />
                    </div>
                   
                </SliderOne> */}
          {/* <img className='banner-img' src={data && data.banners[0].banner_image} /> */}

          <img onClick={prev} src="/Images/leftArr2.svg" className="arrow-lp" />
          <Whirligig
            visibleSlides={1}
            preventSwipe
            preventScroll
            gutter="1em"
            ref={(_whirligigInstance) => {
              whirligig = _whirligigInstance;
            }}
          >
            {data &&
              data.banners.map((item) => (
                <img className="banner-img" src={item.banner_image} />
              ))}
          </Whirligig>

          <img
            onClick={next}
            src="/Images/RightArr2.svg"
            className="arrow-lp"
          />
        </div>
        <div className="gallery-lp">
          <div className="pur-tp pl-4 py-3">OUR GALLERY</div>
          <div
            style={{
              maxHeight: "55vh",
              overflow: "auto",
              backgroundColor: "#f1eeee",
            }}
          >
            {/* <Gallery /> */}
            {/* {data &&
              data.banners.map((item) => (
                <img
                  style={{
                    padding: "20px",
                    maxHeight: "75vh",
                    maxWidth: "80vw",
                  }}
                  src={item.banner_image}
                />
              ))} */}
          </div>
        </div>

        {data && data.influencers.length > 0 ? (
          <>
            {!smInf ? (
              <div id="infs" className="inf-3-lp ">
                <div className="pur-tp py-3 pl-4">
                  TOP INFLUENCERS
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
                  TOP INFLUENCERS
                  <span
                    className="pr-4"
                    onClick={() => setsmInf(false)}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    {" "}
                    Show Less
                  </span>
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
                    {true &&
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
                                      style={{
                                        height: "18px",
                                        marginLeft: "10px",
                                      }}
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
                                      style={{
                                        height: "18px",
                                        marginLeft: "10px",
                                      }}
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
                                <strong>{item.master_bio}</strong>
                                <div className="mt-3">
                                  <span style={{ fontWeight: "600" }}>
                                    Certifications :{" "}
                                  </span>
                                  {item.master_certification}
                                </div>
                                <div className="mt-3">
                                {item.fb!==null ? 
                                  <a href={item.fb} target="_blank">
                                    <img
                                      src="/Images/fbC.svg"
                                      style={{
                                        height: "3vh",
                                        marginRight: "25px",
                                      }}
                                    />
                                  </a>
                                  :
                                  <></>
                                }
                                {item.instagram!==null ? 
                                  <a href={item.instagram} target="_blank">
                                    <img
                                      src="/Images/instaC.svg"
                                      style={{
                                        height: "3vh",
                                        marginRight: "25px",
                                      }}
                                    />
                                  </a>
                                  :
                                  <></>
                                }
                                {item.twitter!==null ? 
                                  <a href={item.twitter} target="_blank">
                                    <img
                                      src="/Images/twitC.svg"
                                      style={{
                                        height: "3vh",
                                        marginRight: "25px",
                                      }}
                                    />
                                  </a>
                                  :
                                  <></>
                                }
                                {item.linkedin!==null ? 
                                  <a href={item.linkedin} target="_blank">
                                    <img
                                      src="/Images/linkedC.svg"
                                      style={{
                                        height: "3vh",
                                        marginRight: "25px",
                                      }}
                                    />
                                  </a>
                                  :
                                  <></>
                                }
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
          </>
        ) : (
          <></>
        )}

        <div className="card-con-lp ">
          <div className="row pb-4">
            {data && data.library_packages.length > 0 ? (
              <div className="col">
                <div
                  id="card"
                  className="card3 "
                  style={{ marginTop: "3px" }}
                  class="card"
                >
                  <div className="pur-tp py-3 pl-4">CONTENT LIBRARY</div>
                  <div
                    className="crdHgt"
                    style={{
                      margin: "0px",
                      overflow: "auto",
                      scrollbarWidth: "1px",
                      width: "100%",
                      backgroundColor: "#f1eeee",
                    }}
                  >
                    {data ? (
                      data.library_packages.map((items) => (
                        <div class="row no-gutters">
                          {true ? (
                            <>
                              <div
                                className="outer2"
                                style={{ margin: "1.38vh", width: "30%" }}
                                class="col-auto"
                              >
                                <div className="containerG outer2">
                                  <img
                                    src={items.image_one}
                                    class="img-fluid inner2"
                                    width="95%"
                                    height="100%"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div class="col">
                                <div class="card-block ">
                                  <p id="category" class="card-text">
                                    {items.name}
                                  </p>
                                  {items.package_type == "Audio" ? (
                                    <p
                                      style={{
                                        fontSize: "1.8vh",
                                        paddingLeft: "10px",
                                      }}
                                    >
                                      Audio track count : {items.content_count}
                                    </p>
                                  ) : (
                                    <>
                                      {items.package_type == "Video" ? (
                                        <p
                                          style={{
                                            fontSize: "1.8vh",
                                            paddingLeft: "10px",
                                          }}
                                        >
                                          Video track count :{" "}
                                          {items.content_count}
                                        </p>
                                      ) : (
                                        <p
                                          style={{
                                            fontSize: "1.8vh",
                                            paddingLeft: "10px",
                                          }}
                                        >
                                          Quote count : {items.content_count}
                                        </p>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <div> </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div>
                        <div id="noItems">No data </div>
                        {/* <img src={defImg} height="210vh"  /> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {data && data.class_packages.length > 0 ? (
              <div className="col">
                <div
                  id="card"
                  className="card3"
                  style={{ marginTop: "3px" }}
                  class="card"
                >
                  <div className="pur-tp py-3 pl-4">CLASS PACKAGES</div>
                  <div
                    className="crdHgt"
                    style={{
                      margin: "0px",
                      overflow: "auto",
                      scrollbarWidth: "1px",
                      width: "100%",
                      backgroundColor: "#f1eeee",
                    }}
                  >
                    {data ? (
                      data.class_packages.map((items) => (
                        <div class="row no-gutters">
                          {true ? (
                            <>
                              <div
                                className="outer2"
                                style={{ margin: "1.38vh", width: "30%" }}
                                class="col-auto"
                              >
                                <div className="containerG outer2">
                                  <img
                                    src={items.image_one}
                                    class="img-fluid inner2"
                                    width="95%"
                                    height="100%"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div class="col">
                                <div class="card-block ">
                                  <p id="category" class="card-text">
                                    {items.name}
                                  </p>
                                  {items.package_type == "Event" ? (
                                    <p
                                      style={{
                                        fontSize: "1.8vh",
                                        paddingLeft: "10px",
                                      }}
                                    >
                                      Events Count : {items.content_count}
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        fontSize: "1.8vh",
                                        paddingLeft: "10px",
                                      }}
                                    >
                                      Session Count : {items.content_count}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <div> </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div>
                        <div id="noItems">No data </div>
                        {/* <img src={defImg} height="210vh"  /> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {data && data.testimonials.length > 0 ? (
          <>
            {!smTest ? (
              <div className="inf-3-lp ">
                <div className="pur-tp py-3 pl-4">
                  TESTIMONIALS
                  <span
                    className="pr-4"
                    onClick={() => setsmTest(true)}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    {" "}
                    Show More
                  </span>
                </div>
                <div
                  className="row  pt-5 m-auto pb-3 px-4 "
                  style={{ backgroundColor: "#f1eeee", width: "100%" }}
                >
                  {data &&
                    data.testimonials.slice(0, 3).map((item) => (
                      <div className="col-12 col-sm-6 col-md-4 px-2  mb-4 ">
                        <div
                          className="test-card-style"
                          style={{ width: "96%", marginLeft: "1%" }}
                        >
                          <img
                            src="/Images/review.png"
                            className="image-review2"
                          />
                          <img
                            src="/Images/review.png"
                            className="image-review3"
                          />

                          <div className="row pt-2">
                            <div className="col-xl-3 pt-2">
                              <img
                                src={item.user_image}
                                style={{
                                  height: "60px",
                                  width: "60px",
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                  display: "flex",
                                  margin: "auto",
                                }}
                              ></img>
                            </div>
                            <div className="col-xl-9 pt-2">
                              <div className="row">
                                <div className="col-xxl-12">
                                  <p className="test-title-text test-fontsize-title mb-0">
                                    {item.name}
                                  </p>
                                </div>
                                <div className="col-xxl-12">
                                  <p className="test-title-text test-fontsize-title test-font-weight-normal mb-0">
                                    {item.designation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row p-2 mt-2 px-4">
                            <div className="col-xxl-12">
                              <p className="test-review-text">
                                {item.content.slice(0, 120)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="inf-3-lp ">
                <div className="pur-tp py-3 pl-4 ">
                  TESTIMONIALS
                  <span
                    className="pr-4"
                    onClick={() => setsmTest(false)}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    {" "}
                    Show Less
                  </span>
                </div>
                <div
                  className="row  pt-5 m-auto pb-3 px-4"
                  style={{
                    backgroundColor: "#f1eeee",
                    width: "100%",
                    maxHeight: "800px",
                    overflow: "auto",
                  }}
                >
                  {data &&
                    data.testimonials.map((item) => (
                      <div className="col-12 col-sm-6 col-md-4 px-2  mb-4 ">
                        <div
                          className="test-card-style m-auto"
                          style={{ width: "96%", marginLeft: "1%" }}
                        >
                          <img
                            src="/Images/review.png"
                            className="image-review2"
                          />
                          <img
                            src="/Images/review.png"
                            className="image-review3"
                          />

                          <div className="row pt-2">
                            <div className="col-xl-3 pt-2">
                              <img
                                src={item.user_image}
                                style={{
                                  height: "60px",
                                  width: "60px",
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                  display: "flex",
                                  margin: "auto",
                                }}
                              ></img>
                            </div>
                            <div className="col-xl-9 pt-2">
                              <div className="row">
                                <div className="col-xxl-12">
                                  <p className="test-title-text test-fontsize-title mb-0">
                                    {item.name}
                                  </p>
                                </div>
                                <div className="col-xxl-12">
                                  <p className="test-title-text test-fontsize-title test-font-weight-normal mb-0">
                                    {item.designation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row p-2 mt-2 px-4">
                            <div className="col-xxl-12">
                              <p className="test-review-text">
                                {item.content.slice(0, 120)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <></>
        )}

        {data && data.top_read.length > 0 ? (
          <>
            {trReadMore && trReadData ? (
              <>
                <div id="topreads" className="inf-3-lp d-none d-lg-block ">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => SettrReadMore(false)}
                    className="pur-tp py-3 pl-4"
                  >
                    {/* TOP READS */}
                    Back to Top Reads
                    {/* <span className='pr-3' onClick={() => setsmTopRead(true)} style={{ float: "right", cursor: "pointer" }} > Show More</span> */}
                  </div>

                  <div
                    className="row  pt-4 m-auto pb-3 "
                    style={{
                      backgroundColor: "rgb(241, 238, 238)",
                      width: "100%",
                    }}
                  >
                    <div className="col-6">
                      <div>
                        <p className="mr-card-title-text pl-3">
                          {trReadData.title}
                        </p>
                      </div>
                      <div>
                        <div className="row">
                          <div className="col-6 pl-4">
                            <p className="mr-date-text pl-2">
                              <img
                                src="/Images/newsdate.png"
                                style={{ height: "18px", marginRight: "5px" }}
                              />
                              {trReadData.created_at.slice(0, 10)}
                            </p>
                          </div>

                          <div className="col-6">
                            <p
                              className="mr-date-text"
                              style={{ fontSize: "15px" }}
                            >
                              <img
                                src="/Images/trauth.svg"
                                style={{ height: "18px", marginRight: "5px" }}
                              />
                              {trReadData.author_name}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12 ">
                        <p className="mr-details-text">
                          {parser(trReadData.content)}
                        </p>
                      </div>
                    </div>

                    <div className="col-6 text-center">
                      {console.log(trReadData)}
                      <img
                        src={trReadData.image}
                        style={{
                          height: "350px",
                          width: "auto",
                          maxWidth: "100%",
                          borderRadius: "10px",
                          padding: "20px",
                        }}
                        className="mr-image-borders "
                      ></img>
                    </div>
                    <hr style={{ width: "90%", margin: "auto" }}></hr>
                    <div className="mt-4">
                      <div className="row pl-4">
                        <div
                          className="col-12"
                          style={{ color: "#98989c", fontWeight: "600" }}
                        >
                          <u>ABOUT THE AUTHOR </u>
                          <img
                            src="/Images/trauth.svg"
                            style={{ height: "18px", marginLeft: "15px" }}
                          />
                        </div>
                        <div className="col-2">
                          <img
                            src="/Images/Frame 392.svg"
                            style={{ height: "120px" }}
                          />
                        </div>
                        <div
                          className="col-10 mt-3"
                          style={{ marginLeft: "-20px" }}
                        >
                          <div className="mt-1" style={{ fontWeight: "600" }}>
                            {trReadData.author_name}
                          </div>
                          <div className="mt-1" style={{ color: "#98989c" }}>
                            Author | Instructor | Trainer
                          </div>
                          <div>
                            Some Bio Some Bio Some Bio Some Bio Some Bio Some
                            Bio Some Bio Some Bio
                          </div>
                          <div className="mt-1" style={{ color: "#03CBC9" }}>
                            <img
                              src="/Images/mailE.svg"
                              style={{ height: "2.5vh", marginRight: "10px" }}
                            />
                            Have Questions? Send Mail
                          </div>
                        </div>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => SettrReadMore(false)}
                          className="col-xl-6 col-6 mt-4"
                        >
                          <p className="mr-read-more text-center p-2 ">Back</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="topreads" className="inf-3-lp  d-lg-none ">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => SettrReadMore(false)}
                    className="pur-tp py-3 pl-4"
                  >
                    {/* TOP READS */}
                    Back to Top Reads
                    {/* <span className='pr-3' onClick={() => setsmTopRead(true)} style={{ float: "right", cursor: "pointer" }} > Show More</span> */}
                  </div>
                  <div
                    className="row  pt-4 m-auto pb-3 "
                    style={{ backgroundColor: "white", width: "100%" }}
                  >
                    <div className="col-12">
                      <div
                        className="px-2 m-auto"
                        style={{
                          width: "95%",
                          backgroundColor: "white",
                          borderRadius: "10px",
                        }}
                      >
                        <div className="row px-3">
                          <img
                            src={trReadData.image}
                            style={{
                              height: "200px",
                              width: "auto",
                              maxWidth: "100%",
                              objectFit: "contain",
                              borderRadius: "10px",
                              padding: "20px",
                            }}
                            className="mr-image-borders "
                          ></img>
                          {/* </div> */}
                          <div className="col-xl-12 ">
                            <p className="mr-card-title-text">
                              {trReadData.title}
                            </p>
                          </div>
                          <div className="col-xl-12 ">
                            <div className="row">
                              <div className="col-4">
                                <p className="mr-date-text">
                                  <img
                                    src="/Images/newsdate.png"
                                    style={{
                                      height: "18px",
                                      marginRight: "5px",
                                    }}
                                  />
                                  {trReadData.created_at.slice(0, 10)}
                                </p>
                              </div>
                              <div className="col-6">
                                <p className="mr-date-text">
                                  <img
                                    src="/Images/trauth.svg"
                                    style={{
                                      height: "18px",
                                      marginRight: "5px",
                                    }}
                                  />
                                  {trReadData.author_name}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12 ">
                            <p className="mr-details-text">
                              {parser(trReadData.content)}
                            </p>
                          </div>
                          <hr style={{ width: "90%", margin: "auto" }}></hr>
                          <div className="mt-4">
                            <div className="row  pl-2">
                              <div
                                className="col-12"
                                style={{ color: "#98989c", fontWeight: "600" }}
                              >
                                <u>ABOUT THE AUTHOR </u>
                                <img
                                  src="/Images/trauth.svg"
                                  style={{ height: "18px", marginLeft: "15px" }}
                                />
                              </div>
                              <div className="col-12 col-sm-3">
                                <img
                                  src="/Images/Frame 392.svg"
                                  style={{ height: "120px" }}
                                />
                              </div>
                              <div
                                className="col-12 col-sm-9 mt-3"
                                style={{ marginLeft: "0px" }}
                              >
                                <div
                                  className="mt-1"
                                  style={{ fontWeight: "600" }}
                                >
                                  {trReadData.author_name}
                                </div>
                                <div
                                  className="mt-1"
                                  style={{ color: "#98989c" }}
                                >
                                  Author | Instructor | Trainer
                                </div>
                                <div>
                                  Some Bio Some Bio Some Bio Some Bio Some Bio
                                  Some Bio Some Bio Some Bio
                                </div>
                                <div
                                  className="mt-1"
                                  style={{ color: "#03CBC9" }}
                                >
                                  <img
                                    src="/Images/mailE.svg"
                                    style={{
                                      height: "2.5vh",
                                      marginRight: "10px",
                                    }}
                                  />
                                  Have Questions? Send Mail
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => SettrReadMore(false)}
                            className="col-xl-6 col-6 mt-4"
                          >
                            <p className="mr-read-more text-center p-2 ">
                              Back
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : !smtopRead ? (
              <div id="topreads" className="inf-3-lp ">
                <div className="pur-tp py-3 pl-4">
                  TOP READS
                  <span
                    className="pr-4"
                    onClick={() => setsmTopRead(true)}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    {" "}
                    Show More
                  </span>
                </div>

                <div
                  className="row  pt-4 m-auto pb-3"
                  style={{ backgroundColor: "#f1eeee", width: "100%" }}
                >
                  {data &&
                    data.top_read.slice(0, 3).map((item) => (
                      <div className="col-12 col-sm-6 col-md-4 mb-4">
                        <div
                          className="px-2 m-auto"
                          style={{
                            width: "95%",
                            backgroundColor: "white",
                            borderRadius: "10px",
                          }}
                        >
                          {trId !== item.id ? (
                            <img
                              // src="/Images/Tag.svg"
                              // onClick={onMsgClick}
                              onMouseOver={() => {
                                settrId(item.id);
                              }}
                              onMouseOut={() => settrId(-1)}
                              style={{
                                marginTop: "10px",
                                marginLeft: "10px",
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <img
                              // src="/Images/Tag (1).svg"
                              onClick={shareHandleShow}
                              onMouseOver={() => {
                                settrId(item.id);
                              }}
                              onMouseOut={() => settrId(-1)}
                              style={{
                                marginTop: "10px",
                                marginLeft: "10px",
                                cursor: "pointer",
                              }}
                            />
                          )}

                          <div className="row px-3">
                            <img
                              src={item.image}
                              style={{
                                height: "200px",
                                width: "600px",
                                objectFit: "contain",
                                borderRadius: "10px",
                                padding: "20px",
                              }}
                              className="mr-image-borders "
                            ></img>
                            {/* </div> */}
                            <div
                              style={{ height: "4vh" }}
                              className="col-xl-12 "
                            >
                              <p className="mr-card-title-text">{item.title}</p>
                            </div>
                            <div className="col-xl-12 ">
                              <div
                                className="row"
                                style={{ paddingTop: "10px" }}
                              >
                                <div className="col-6">
                                  <p className="mr-date-text">
                                    <img
                                      src="/Images/newsdate.png"
                                      style={{
                                        height: "10px",
                                        marginRight: "5px",
                                      }}
                                    />
                                    {item.created_at.slice(0, 10)}
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="mr-date-text">
                                    <img
                                      src="/Images/trauth.svg"
                                      style={{
                                        height: "12px",
                                        marginRight: "5px",
                                      }}
                                    />
                                    {item.author_name}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{ height: "5.5vh" }}
                              className="col-xl-12 "
                            >
                              <p className="mr-details-text">
                                {item.description}
                              </p>
                            </div>
                            <div
                              onClick={() => {
                                // settrData(item.content);
                                // settrShow(true)
                                settrReadData(item);
                                setTimeout(() => {
                                  SettrReadMore(true);
                                }, 1);
                              }}
                              className="col-xl-6 col-6 "
                            >
                              <p className="mr-read-more text-center p-2">
                                Read more
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div id="topreads" className="inf-3-lp">
                <div className="pur-tp py-3 pl-4">
                  TOP READS
                  <span
                    className="pr-4"
                    onClick={() => setsmTopRead(false)}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    {" "}
                    Show Less
                  </span>
                </div>
                <div
                  className="row pt-4 m-auto pb-3 "
                  style={{
                    backgroundColor: "#f1eeee",
                    width: "100%",
                    maxHeight: "800px",
                    overflow: "auto",
                  }}
                >
                  {data &&
                    data.top_read.map((item) => (
                      <div className="col-12 col-sm-6 col-md-4 mb-4 ">
                        <div
                          className="px-2 m-auto"
                          style={{
                            width: "95%",
                            backgroundColor: "white",
                            borderRadius: "10px",
                          }}
                        >
                          <div className="row px-3">
                            <img
                              src={item.image}
                              style={{
                                height: "200px",
                                width: "600px",
                                objectFit: "contain",
                                borderRadius: "10px",
                                padding: "20px",
                              }}
                              className="mr-image-borders "
                            ></img>
                            {/* </div> */}
                            <div
                              style={{ height: "4vh" }}
                              className="col-xl-12 "
                            >
                              <p className="mr-card-title-text">{item.title}</p>
                            </div>
                            <div className="col-xl-12 ">
                              <div className="row">
                                <div className="col-6">
                                  <p className="mr-date-text">
                                    <img
                                      src="/Images/newsdate.png"
                                      style={{
                                        height: "18px",
                                        marginRight: "5px",
                                      }}
                                    />
                                    {item.created_at.slice(0, 10)}
                                  </p>
                                </div>
                                <div className="col-6">
                                  <p className="mr-date-text">
                                    <img
                                      src="/Images/trauth.svg"
                                      style={{
                                        height: "18px",
                                        marginRight: "5px",
                                      }}
                                    />
                                    {item.author_name}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{ height: "5.5vh" }}
                              className="col-xl-12 "
                            >
                              <p className="mr-details-text">
                                {item.description}
                              </p>
                            </div>
                            <div
                              onClick={() => {
                                // settrData(item.content);
                                // settrShow(true)
                                settrReadData(item);
                                SettrReadMore(true);
                              }}
                              className="col-xl-6 col-6 "
                            >
                              <p className="mr-read-more text-center p-2">
                                Read more
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <></>
        )}

        {data && data.news.length > 0 ? (
          <>
            {!smNews ? (
              <div className="inf-3-lp ">
                <div className="pur-tp py-3 pl-4">
                  NEWS HIGHLIGHTS
                  <span
                    className="pr-4"
                    onClick={() => setsmNews(true)}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    {" "}
                    Show More
                  </span>
                </div>
                <div
                  className="row mx-auto "
                  style={{ backgroundColor: "#f1eeee", width: "100%" }}
                >
                  {data && currIndex < data.news.length ? (
                    <div
                      className="col-12 mx-auto new-card-background"
                      style={{ width: "100%" }}
                    >
                      <div className="row px-3">
                        <div className="col-12 " style={{ width: "100%" }}>
                          <img
                            src={data.news[currIndex].publisher_logo}
                            style={{
                              height: "150px",
                              width: "150px",
                              objectFit: "contain",
                            }}
                          ></img>
                        </div>
                        <div className="col-12 ">
                          <p className="news-title-text">
                            {data.news[currIndex].title}
                          </p>
                        </div>

                        <div className="col-12 col-sm-5 ">
                          <p className="news-date-text">
                            <span style={{ marginRight: "10px" }}>
                              <img src="/Images/newsdate.png"></img>
                            </span>{" "}
                            {data.news[currIndex].created_at.slice(0, 10)}
                          </p>
                        </div>
                        <div className="col-12 col-sm-6 ">
                          <p className="news-date-text">
                            <span style={{ marginRight: "10px" }}>
                              <img src="/Images/newstitle.png"></img>
                            </span>
                            {data.news[currIndex].publisher}
                          </p>
                        </div>
                        <div className="col-xl-12 mt-3">
                          <p className="new-data-text ">
                            {data.news[currIndex].content}
                          </p>
                        </div>

                        <div className="col">
                          <a
                            href={data.news[currIndex].news_link}
                            target="_blank"
                          >
                            {" "}
                            <p className="news-readmore-btn p-1">Read More</p>
                          </a>
                        </div>
                        <div className="col "></div>
                        <div className="col-12 col-sm-4 text-right">
                          <img
                            onClick={handleArrowPrev}
                            src="/Images/larPur.svg"
                            style={{ marginRight: "20px", height: "4vh" }}
                          />
                          {currIndex + 1}
                          <img
                            onClick={handleArrowNext}
                            src="/Images/rarPur.svg"
                            style={{ marginLeft: "20px", height: "4vh" }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <div className="inf-3-lp ">
                <div className="pur-tp py-3 pl-4">
                  NEWS HIGHLIGHTS
                  <span
                    className="pr-4"
                    onClick={() => setsmNews(false)}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    {" "}
                    Show Less
                  </span>
                </div>
                <div
                  className="row mx-auto "
                  style={{
                    backgroundColor: "#f1eeee",
                    width: "100%",
                    maxHeight: "800px",
                    overflow: "auto",
                  }}
                >
                  {data &&
                    data.news.map((item) => (
                      <div
                        className="col-12 mx-auto new-card-background"
                        style={{ width: "100%" }}
                      >
                        <div className="row px-3">
                          <div className="col-12 " style={{ width: "98%" }}>
                            <img
                              src={item.publisher_logo}
                              style={{
                                height: "150px",
                                width: "150px",
                                objectFit: "contain",
                              }}
                            ></img>
                          </div>
                          <div className="col-12 ">
                            <p className="news-title-text">{item.title}</p>
                          </div>

                          <div className="col-12 col-sm-5 ">
                            <p className="news-date-text">
                              <span style={{ marginRight: "10px" }}>
                                <img src="/Images/newsdate.png"></img>
                              </span>{" "}
                              {item.created_at.slice(0, 10)}
                            </p>
                          </div>
                          <div className="col-12 col-sm-6 ">
                            <p className="news-date-text">
                              <span style={{ marginRight: "10px" }}>
                                <img src="/Images/newstitle.png"></img>
                              </span>
                              {item.publisher}
                            </p>
                          </div>
                          <div className="col-xl-12 mt-3">
                            <p className="new-data-text ">{item.content}</p>
                          </div>
                          <div className="col-6 col-sm-4 col-md-2">
                            <a href={item.news_link} target="_blank">
                              {" "}
                              <p className="news-readmore-btn p-1">Read More</p>
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <></>
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
                    &nbsp;&nbsp;&nbsp;Privacy policy
                  </a>
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {showShare ? (
          <div ref={modalRef} className="overlay-msg shadow-lg">
            <div className="ovr-head">
              <span className="compose-msg">Compose a message</span>
              <span className="mt-2 mr-2 ovr-cls" onClick={() => onMsgClick()}>
                {/* <img className='ovr-cr' src='/Images/crosss.svg' /> */}
                Close
              </span>
            </div>
            <div className="ovr-con">
              <div>
                To :{" "}
                <input
                  type="text"
                  className="To-input mt-2"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                />
              </div>
              {/* <hr style={{marginLeft:"-5%",height:"0px"}}></hr> */}
              {/* <div>
                        Subject of the message :<input type='text'  className='Sub-input' placeholder='' onChange={(e)=>{
                        setShareSubject(e.target.value);
                        }} />
                        </div> */}
              <hr style={{ marginLeft: "-5%", height: "0px" }}></hr>
              <div className="mt-4">
                <textarea
                  type="text1"
                  className=""
                  style={{
                    minHeight: "120px",
                    minWidth: "80%",
                    border: "none",
                  }}
                  placeholder="Enter Message Here"
                  onChange={(e) => {
                    setShareMessage(e.target.value);
                  }}
                />
              </div>
              <hr
                style={{ marginLeft: "-5%", height: "0px", marginTop: "5%" }}
              ></hr>
            </div>
            <button
              className="mt-5 btn btn-send"
              onClick={() => onSendMsg()}
              style={{ marginTop: "-5%" }}
            >
              Send
            </button>
          </div>
        ) : (
          <></>
        )}
        <Modal
          show={trshow}
          onHide={() => settrShow(false)}
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
          centered
        >
          <Modal.Header className="single_lib_header_sec_desc" closeButton>
            <Modal.Title className="single_lib_popup_desc">
              Description
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{trData && trData}</div>
          </Modal.Body>
        </Modal>

        <Modal
          show={newsShow}
          onHide={() => setnewsShow(false)}
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
          centered
        >
          <Modal.Header className="single_lib_header_sec_desc" closeButton>
            <Modal.Title className="single_lib_popup_desc">
              Description
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{newsData && newsData}</div>
          </Modal.Body>
        </Modal>

        
        {/* share model */}
        <Modal show={showShare}
          onHide={shareHandleClose}
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
          centered>
          <Modal.Header className="single_cls_header_sec_desc" closeButton>
            <Modal.Title className="single_cls_popup_desc">Share This Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="single_cls_scss_inst_sec">
              <div className="row noMargin noPadding">
                <div className="row noMargin noPadding">
                  <div className="col-xl-10 col-lg-10 col-md-11 col-sm-10 col-10 noPadding">
                    <span className="single_class_pro_tail_heads noPadding">Share wellness package with your contacts</span>
                    <div className="row noMargin noPadding mail_sec">
                      <div className="col-xl-2 col-lg-2 col-md-1 col-sm-2 col-2 text-right" style={{ display: "grid" }}>
                        <span className="align_self_center">To</span>
                      </div>
                      <div className="col-xl-10 col-lg-10 col-md-11 col-sm-10 col-10 noPadding text-left">
                        <input type="text" className="form-control enter_mail_id" placeholder="Enter  ','  separated email Ids here" onChange={(e) => { setShareEmail(e.target.value) }} />
                      </div>
                      <div className="col-xl-10 offset-xl-2 col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-10 offset-sm-2 col-10 offset-2 noPadding text-left">
                        <textarea rows="5" className="form-control enter_text" placeholder="Enter your message here" value={shareMessage} onChange={(e) => setShareMessage(e.target.value)} ></textarea>
                      </div>
                      <div className="col-xl-10 offset-xl-2 col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-10 offset-sm-2 col-10 offset-2 noPadding text-left">
                        <button onClick={onSendMsg} className="mail_share_btn">Share</button>
                      </div>
                      <div className="col-xl-10 offset-xl-2 col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-10 offset-sm-2 col-10 offset-2 noPadding text-left">
                        <div className="row noMargin noPadding mail_sec">
                          {/* <div className="col-xl-3 col-lg-2 col-md-3 col-sm-3 col-3 text-left noPadding" style={{ display: "grid" }}>
                            <span className="align_self_center">Or Copy Link</span>
                          </div>
                          <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 noPadding text-left">
                            <div class="input-group copy_link_grp">
                              <input type="text" className="form-control copy_link" value={currUrl} aria-describedby="basic-addon2" />
                              <div class="input-group-append">
                                <span style={{ cursor: "pointer" }} class="input-group-text copy_img_span" id="basic-addon2">

                                  {!isCopy ?
                                    <img onClick={() => {
                                      navigator.clipboard.writeText(currUrl)
                                      setIsCopy(true);
                                    }} className="copy_link_img" src="/Images/copy-link.svg" />
                                    :
                                    <span style={{ color: "#03cbc9", fontSize: "1.8vh" }}>Link Copied !</span>
                                  }

                                </span>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-1 col-sm-2 col-2 noPadding text-center">
                    <div className="mail_img_div">
                      {/* <img className="share_mail_img align_self_center" src="/Images/share_mail_img.png" style={{ display: "block" }}></img> */}
                      <button style={{ background: "none", borderRadius: "50px", borderColor: "#03cbc9", height: "55px", width: "55px" }}> <img style={{ height: "20px" }} className="share_mail_img align_self_center" src="/Images/mailE.svg"></img> </button>
                      <p style={{ paddingLeft: "6px", color: "#03cbc9" }}>Email</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
