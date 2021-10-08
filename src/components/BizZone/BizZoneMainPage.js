import React, { useEffect, useState } from "react";
import "./BizZoneMainPage.css";
import axios from "../../Axios";
import Cookies from "universal-cookie";
import profilepictest from "./BizImages/profile-pic-test.jpeg";
import aboutus1 from "./BizImages/aboutus1.png";
import aboutus2 from "./BizImages/aboutus2.png";
import contactus1 from "./BizImages/contactus1.png";
import review from "./BizImages/review.png";
import TestimonialPage from "./TestimonialPage";
import leaf from "./BizImages/leaf.png";
import News from "./News";
import MustRead from "./MustRead";
import JoinUsPage from "./JoinUsPage";
import ContactUsPage from "./ContactUsPage";
import PromosAndoffersPage from "./PromosAndOffersPage";
import { Link, useHistory } from "react-router-dom";
import au from "./BizImages/au.png";
import cu from "./BizImages/cu.png";
import po from "./BizImages/po.png";
import ju from "./BizImages/ju.png";
import review2 from "./BizImages/review2.png";

const cookies = new Cookies();
const BizZoneMainPage = () => {
  const history = useHistory();

  const [whoWeAre, setWhoWeAre] = useState("");
  const [ourMission, setOurMission] = useState("");
  const [ourMissionHeading, setOurMissionHeading] = useState("");

  const [certificate, setCertificate] = useState([]);

  const [teamList, setTeamList] = useState([]);

  const [active, setActive] = useState("ourTeam");
  const [activeMain, setActiveMain] = useState("aboutus");

  const [reviewRole, setReviewRole] = useState(null);
  const [review, setReview] = useState(null);

  const [color, setColor] = useState("red");
  const [textColor, setTextColor] = useState("white");

  const [auActive, setAuActive] = useState(true);
  const [poActive, setPoActive] = useState(false);
  const [cuActive, setCuActive] = useState(false);
  const [juActive, setJuActive] = useState(false);

  const aboutUsFn = () => {
    setAuActive(true);
    setPoActive(false);
    setCuActive(false);
    setJuActive(false);
  };

  const poFn = () => {
    setAuActive(false);
    setPoActive(true);
    setCuActive(false);
    setJuActive(false);
  };

  const CuFn = () => {
    setAuActive(false);
    setPoActive(false);
    setCuActive(true);
    setJuActive(false);
  };

  const JuFn = () => {
    setAuActive(false);
    setPoActive(false);
    setCuActive(false);
    setJuActive(true);
  };

  const [outteamBtn, setOurTeamBtn] = useState(true);
  const [testimonialBtn, setTestimonialBtn] = useState(false);
  const [newsBtn, setNewsBtn] = useState(false);
  const [mustRead, setMustRead] = useState(false);

  const ourTeambtn = () => {
    setOurTeamBtn(true);
    setTestimonialBtn(false);
    setNewsBtn(false);
    setMustRead(false);
  };

  const testimonialBtnFn = () => {
    setOurTeamBtn(false);
    setTestimonialBtn(true);
    setNewsBtn(false);
    setMustRead(false);
  };

  const newsBtnFn = () => {
    setNewsBtn(true);
    setOurTeamBtn(false);
    setTestimonialBtn(false);
    setMustRead(false);
  };

  const mustReadBtnFn = () => {
    setNewsBtn(false);
    setOurTeamBtn(false);
    setTestimonialBtn(false);
    setMustRead(true);
  };

  useEffect(() => {
    axios
      .get("/users/about-us", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
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

    axios
      .get("/users/all-team-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setTeamList(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  function updateBasic() {
    let formData = new FormData();

    formData.append("designation", reviewRole);
    formData.append("content", review);

    axios
      .post(
        `/users/create-testimonial`,
        formData,

        {
          headers: {
            Authorization: "Token" + " " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        console.log("response from submitting the form successful", res.data);
        // location.reload();
      })
      .catch((err) => {
        console.log("ERROR  from update in form", err);
      });
  }

  return (
    <div style={{ marginLeft: "70px", marginRight: "50px" }}>
      <div className="row  pt-5">
        {auActive === true ? (
          <div className="col-xxl-1 col-xl-2 col-lg-3 col-md-4 col-5 biz-top-nav-padding  biz-top-nav-back-clr biz-btm-bordr">
            <p
              className="biz-zone-text-top biz-zone-top-font-size text-center biz-black-clr pt-2 mb-0 pb-2 "
              onClick={(e) => setActiveMain("aboutus")}
            >
              <span style={{ paddingRight: "20px" }}>
                <img
                  src={au}
                  style={{
                    position: "absolute",
                    paddingLeft: "4px",
                    paddingTop: "4px",
                  }}
                />
                <img src={aboutus1}></img>
              </span>
              About us
            </p>
          </div>
        ) : (
          <div
            className="col-xxl-1 col-xl-2 col-lg-3 col-md-4 col-5 biz-top-nav-padding  biz-top-nav-back-clr"
            onClick={aboutUsFn}
          >
            <p
              className="biz-zone-text-top biz-zone-top-font-size text-center biz-black-clr pt-2 mb-0 pb-2 "
              onClick={(e) => setActiveMain("aboutus")}
            >
              <span style={{ paddingRight: "20px" }}>
                <img
                  src={au}
                  style={{
                    position: "absolute",
                    paddingLeft: "4px",
                    paddingTop: "4px",
                  }}
                />
                <img src={aboutus1}></img>
              </span>
              About us
            </p>
          </div>
        )}

        {poActive === true ? (
          <div className="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-5 biz-top-nav-padding  biz-top-nav-back-clr biz-btm-bordr">
            <p
              className="biz-zone-text-top biz-zone-top-font-size text-center biz-black-clr pt-2 mb-0 pb-2"
              onClick={(e) => setActiveMain("promosandoffers")}
            >
              <span style={{ paddingRight: "20px" }}>
                <img
                  src={po}
                  style={{
                    position: "absolute",
                    paddingLeft: "8px",
                    paddingTop: "8px",
                  }}
                />
                <img src={contactus1}></img>
              </span>
              Promos & Offers
            </p>
          </div>
        ) : (
          <div
            className="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-5 biz-top-nav-padding  biz-top-nav-back-clr"
            onClick={poFn}
          >
            <p
              className="biz-zone-text-top biz-zone-top-font-size text-center biz-black-clr pt-2 mb-0 pb-2"
              onClick={(e) => setActiveMain("promosandoffers")}
            >
              <span style={{ paddingRight: "20px" }}>
                <img
                  src={po}
                  style={{
                    position: "absolute",
                    paddingLeft: "8px",
                    paddingTop: "8px",
                  }}
                />
                <img src={contactus1}></img>
              </span>
              Promos & Offers
            </p>
          </div>
        )}

        {cuActive === true ? (
          <div className="col-xxl-1 col-xl-2 col-lg-3 col-md-4 col-5 biz-top-nav-padding  biz-top-nav-back-clr biz-btm-bordr">
            <p
              className="biz-zone-text-top biz-zone-top-font-size text-center biz-black-clr pt-2 mb-0 pb-2"
              onClick={(e) => setActiveMain("contactUs")}
            >
              {" "}
              <span style={{ paddingRight: "20px" }}>
                <img
                  src={cu}
                  style={{
                    position: "absolute",
                    paddingLeft: "8px",
                    paddingTop: "6px",
                  }}
                />
                <img src={contactus1}></img>
              </span>
              Contact us
            </p>{" "}
          </div>
        ) : (
          <div
            className="col-xxl-1 col-xl-2 col-lg-3 col-md-4 col-5 biz-top-nav-padding  biz-top-nav-back-clr"
            onClick={CuFn}
          >
            <p
              className="biz-zone-text-top biz-zone-top-font-size text-center biz-black-clr pt-2 mb-0 pb-2"
              onClick={(e) => setActiveMain("contactUs")}
            >
              {" "}
              <span style={{ paddingRight: "20px" }}>
                <img
                  src={cu}
                  style={{
                    position: "absolute",
                    paddingLeft: "8px",
                    paddingTop: "6px",
                  }}
                />
                <img src={contactus1}></img>
              </span>
              Contact us
            </p>{" "}
          </div>
        )}

        {juActive === true ? (
          <div className="col-xxl-1 col-xl-2 col-lg-2 col-md-4 col-5 biz-top-nav-padding  biz-top-nav-back-clr biz-btm-bordr">
            <p
              className="biz-zone-text-top biz-zone-top-font-size text-center biz-black-clr pt-2 mb-0 pb-2"
              onClick={(e) => setActiveMain("joinuspage")}
            >
              <span style={{ paddingRight: "20px" }}>
                <img
                  src={ju}
                  style={{
                    position: "absolute",
                    paddingLeft: "8px",
                    paddingTop: "6px",
                  }}
                />
                <img src={contactus1}></img>
              </span>
              Join us
            </p>
          </div>
        ) : (
          <div
            className="col-xxl-1 col-xl-2 col-lg-2 col-md-4 col-5 biz-top-nav-padding  biz-top-nav-back-clr"
            onClick={JuFn}
          >
            <p
              className="biz-zone-text-top biz-zone-top-font-size text-center biz-black-clr pt-2 mb-0 pb-2"
              onClick={(e) => setActiveMain("joinuspage")}
            >
              <span style={{ paddingRight: "20px" }}>
                <img
                  src={ju}
                  style={{
                    position: "absolute",
                    paddingLeft: "8px",
                    paddingTop: "6px",
                  }}
                />
                <img src={contactus1}></img>
              </span>
              Join us
            </p>
          </div>
        )}
      </div>
      {activeMain === "aboutus" && (
        <>
          <div className="row  mt-5 ">
            {outteamBtn === true ? (
              <div className="col-xxl-1 col-xl-2 mt-2 col-lg-2 col-md-4 col-5 biz-top-nav-padding  biz-zone-button-top ">
                <p
                  className="biz-zone-text-top  biz-zone-bottom-font-size text-center pt-2 mb-0 pb-2"
                  onClick={(e) => setActive("ourTeam")}
                >
                  Our Team
                </p>
              </div>
            ) : (
              <div
                className="col-xxl-1 col-xl-2 mt-2 col-lg-2 col-md-4 col-5 biz-top-nav-padding  biz-btn-disabled-white "
                onClick={ourTeambtn}
              >
                <p
                  className="biz-zone-text-top  biz-zone-bottom-font-size text-center pt-2 mb-0 pb-2"
                  onClick={(e) => setActive("ourTeam")}
                >
                  Our Team
                </p>
              </div>
            )}

            {testimonialBtn === true ? (
              <div className="col-xxl-1 col-xl-2 mt-2  col-lg-2 col-md-4 col-5 biz-top-nav-padding  biz-zone-button-top">
                <p
                  className="biz-zone-text-top  biz-zone-bottom-font-size text-center pt-2 mb-0 pb-2"
                  onClick={(e) => setActive("testimonial")}
                >
                  Testimonials
                </p>
              </div>
            ) : (
              <div
                className="col-xxl-1 col-xl-2 mt-2  col-lg-2 col-md-4 col-5 biz-top-nav-padding  biz-btn-disabled-white"
                onClick={testimonialBtnFn}
              >
                <p
                  className="biz-zone-text-top  biz-zone-bottom-font-size text-center pt-2 mb-0 pb-2"
                  onClick={(e) => setActive("testimonial")}
                >
                  Testimonials
                </p>
              </div>
            )}

            {newsBtn === true ? (
              <div className="col-xxl-1 col-xl-2 mt-2 col-lg-2 col-md-4 col-5 biz-top-nav-padding  biz-zone-button-top">
                <p
                  className="biz-zone-text-top  biz-zone-bottom-font-size text-center pt-2 mb-0 pb-2"
                  onClick={(e) => setActive("news")}
                >
                  News
                </p>
              </div>
            ) : (
              <div
                className="col-xxl-1 col-xl-2 mt-2 col-lg-2 col-md-4 col-5 biz-top-nav-padding  biz-btn-disabled-white"
                onClick={newsBtnFn}
              >
                <p
                  className="biz-zone-text-top  biz-zone-bottom-font-size text-center pt-2 mb-0 pb-2"
                  onClick={(e) => setActive("news")}
                >
                  News
                </p>
              </div>
            )}

            {mustRead === true ? (
              <div className="col-xxl-1 col-xl-2 mt-2 col-lg-2 col-md-4 col-5 biz-top-nav-padding  biz-zone-button-top">
                <p
                  className="biz-zone-text-top  biz-zone-bottom-font-size text-center pt-2 mb-0 pb-2"
                  onClick={(e) => setActive("mustread")}
                >
                  Must Read
                </p>
              </div>
            ) : (
              <div
                className="col-xxl-1 col-xl-2 mt-2 col-lg-2 col-md-4 col-5 biz-top-nav-padding  biz-btn-disabled-white"
                onClick={mustReadBtnFn}
              >
                <p
                  className="biz-zone-text-top  biz-zone-bottom-font-size text-center pt-2 mb-0 pb-2"
                  onClick={(e) => setActive("mustread")}
                >
                  Must Read
                </p>
              </div>
            )}

            {active === "testimonial" && (
              <div className="col-xxl-1 col-xl-2 mt-2 col-lg-2 col-md-4 col-5 ">
                {" "}
                <button
                  type="button"
                  className="btn btn-primary biz-giveyourreview-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Give your review{" "}
                  <img src={review2} style={{ paddingLeft: "10px" }}></img>
                </button>
              </div>
            )}

            <div
              className="modal fade "
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content ">
                  <div className="modal-header">
                    <h5
                      className="modal-title biz-review-title"
                      id="staticBackdropLabel"
                    >
                      Your Review
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p className="biz-review-subtitle ">
                      {" "}
                      Give your review of your overall experience with <br></br>
                      "our wellness business"
                    </p>

                    <p className="biz-review-form-title mb-0">
                      Designation / Role
                    </p>
                    <input
                      type="text"
                      className="biz-review-input p-1"
                      placeholder="Enter your designation or role here"
                      value={reviewRole}
                      onChange={(e) => setReviewRole(e.target.value)}
                    ></input>

                    <p className="biz-review-form-title mb-0 mt-3">Review</p>
                    <textarea
                      placeholder="write your review"
                      rows="8"
                      cols="81"
                      style={{ borderRadius: "5px" }}
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer justify-content-start">
                    <button
                      type="button"
                      className="btn btn-primary biz-review-submit-btn"
                      onClick={updateBasic}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary biz-review-cancel-btn"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {active === "ourTeam" && (
            <>
              {whoWeAre === "" ? (
                <></>
              ) : (
                <div className="row simpl-border mt-5  ">
                  <div className="col-xxl-12  p-2 biz-title-backg-clr ">
                    <p className="biz-zone-padding-text biz-white-clr biz-zone-text-top biz-font-big mt-3">
                      Who We Are
                    </p>
                  </div>
                  <div className="col-xxl-12  biz-bottom-card-back ">
                    <p className="biz-zone-long-text-padding mt-4 biz-zone-text-top biz-zone-top-font-size">
                      {whoWeAre}
                    </p>
                  </div>
                </div>
              )}
              {ourMission === "" ? (
                <></>
              ) : (
                <div className="row simpl-border mt-3 ">
                  <div className="col-xxl-12  biz-title-backg-clr  p-2">
                    <p className="biz-zone-padding-text biz-white-clr biz-zone-text-top biz-font-big mt-3">
                      Our Mission
                    </p>
                  </div>
                  <div className="col-xxl-12  biz-bottom-card-back">
                    <p className="text-center mt-3 biz-zone-text-top biz-font-weight-big biz-zone-top-font-size mt-5">
                      {ourMissionHeading}
                    </p>
                    <p className="biz-zone-long-text-padding mt-4 biz-zone-text-top biz-zone-top-font-size mt-4">
                      {ourMission}
                    </p>
                    {/* <div className="row ">
                  {certificate.length>0 && certificate.map((item)=>
                    <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-11  mx-auto">
                      <img
                        src={leaf}
                        // style={{ display: "flex", margin: "auto"}}
                      />
                       <p className="text-center biz-zone-text-top biz-font-weight-big biz-zone-top-font-size ">
                        {item.certified_by}
                      </p>
                      <p
                        style={{ position: "absolute", top: "50px", display: "flex", margin: "auto"}}
                        className="our-mission-title-text "
                      >
                        {item.name}
                      </p>
                     
                      <p className="text-center biz-zone-text-top biz-zone-top-font-size">
                        {item.created_at.slice(0,10)}
                      </p>
                    </div>
                  )}
                    
                  </div> */}

                    {/* <div className="row ">
                  {certificate.length>0 && certificate.map((item)=>
                    <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-11  mx-auto">
                      <img
                        src={leaf}
                        // style={{ display: "flex", margin: "auto"}}
                      />
                       <p className="text-center biz-zone-text-top biz-font-weight-big biz-zone-top-font-size ">
                        {item.certified_by}
                      </p>
                      <p
                        style={{ position: "absolute", top: "50px", display: "flex", margin: "auto"}}
                        className="our-mission-title-text "
                      >
                        {item.name}
                      </p>
                     
                      <p className="text-center biz-zone-text-top biz-zone-top-font-size">
                        {item.created_at.slice(0,10)}
                      </p>
                    </div>
                  )}
                    
                  </div> */}

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
                </div>
              )}
              {teamList.length > 0 ? (
                <div className="row  mt-2 biz-bottom-card-back ">
                  <div className="col-xxl-12   biz-title-backg-clr  p-2">
                    <p className="biz-zone-padding-text biz-white-clr biz-zone-text-top biz-font-big mt-3">
                      Meet the Team
                    </p>
                  </div>

                  <div className="row  p-4 ">
                    <div class="accordion" id="accordionExample">
                      {teamList &&
                        teamList.map((item) => (
                          <div class="accordion-item">
                            <h2 class="accordion-header" id={item.user_id}>
                              <button
                                class="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="flush-collapseOne"
                              >
                                <img
                                  src={item.profile_image}
                                  className="biz-profile-pic-style"
                                  style={{
                                    height: "100px",
                                    width: "100px",
                                    objectFit: "cover",
                                  }}
                                />
                                <p className="biz-zone-text-top biz-font-weight-big biz-zone-top-font-size ml-3">
                                  {" "}
                                  {item.name}
                                </p>{" "}
                                <br></br>
                                <p className="biz-zone-text-top biz-zone-top-font-size ml-3">
                                  {item.role}
                                </p>
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              class="accordion-collapse collapse show"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <strong>{item.bio}</strong>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          )}

          {active === "testimonial" && <TestimonialPage />}
          {active === "news" && <News />}
          {active === "mustread" && <MustRead />}
        </>
      )}

      {activeMain == "joinuspage" && <JoinUsPage />}

      {activeMain == "contactUs" && <ContactUsPage />}

      {activeMain == "promosandoffers" && <PromosAndoffersPage />}
    </div>
  );
};

export default BizZoneMainPage;
