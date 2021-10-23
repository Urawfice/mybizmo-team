import React, { useEffect, useState } from "react";
// import "./BizZoneMainPage.css";
import "./bizZoneMainPage.scss";
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
    <div className="biz_zone_main_page_main">
      {/* Button section START */}
      <div className="row noMargin noPadding top_menu_btn_sec_scss_class top_menu_activity">
        <div className="col-12 noMargin noPadding">
          {auActive === true ? (
            <button className="topmenu_btn active_menu">
              <span onClick={(e) => setActiveMain("aboutus")}>
                <span className="img_span">
                  <img className="topMenu_icon " src={au} />
                  <img className="btn_background_img_span" src={aboutus1}></img>
                </span>
                About us
              </span>
            </button>
          ) : (
            <button className="topmenu_btn" onClick={aboutUsFn}>
              <span onClick={(e) => setActiveMain("aboutus")}>
                <span className="img_span">
                  <img className="topMenu_icon" src={au} />
                  <img className="btn_background_img_span" src={aboutus1}></img>
                </span>
                About us
              </span>
            </button>
          )}
          {poActive === true ? (
            <button className="topmenu_btn active_menu">
              <span onClick={(e) => setActiveMain("promosandoffers")}>
                <span className="img_span">
                  <img className="topMenu_icon " src={po} />
                  <img
                    className="btn_background_img_span"
                    src={contactus1}
                  ></img>
                </span>
                Promos & Offers
              </span>
            </button>
          ) : (
            <button className="topmenu_btn" onClick={poFn}>
              <span onClick={(e) => setActiveMain("promosandoffers")}>
                <span className="img_span">
                  <img className="topMenu_icon " src={po} />
                  <img
                    className="btn_background_img_span"
                    src={contactus1}
                  ></img>
                </span>
                Promos & Offers
              </span>
            </button>
          )}
          {cuActive === true ? (
            <button className="topmenu_btn active_menu">
              <span onClick={(e) => setActiveMain("contactUs")}>
                <span className="img_span">
                  <img className="topMenu_icon " src={cu} />
                  <img
                    className="btn_background_img_span"
                    src={contactus1}
                  ></img>
                </span>
                Contact us
              </span>
            </button>
          ) : (
            <button className="topmenu_btn" onClick={CuFn}>
              <span onClick={(e) => setActiveMain("contactUs")}>
                <span className="img_span">
                  <img className="topMenu_icon " src={cu} />
                  <img
                    className="btn_background_img_span"
                    src={contactus1}
                  ></img>
                </span>
                Contact us
              </span>
            </button>
          )}
          {juActive === true ? (
            <button className="topmenu_btn active_menu">
              <span onClick={(e) => setActiveMain("joinuspage")}>
                <span className="img_span">
                  <img className="topMenu_icon " src={ju} />
                  <img
                    className="btn_background_img_span"
                    src={contactus1}
                  ></img>
                </span>
                Join us
              </span>
            </button>
          ) : (
            <button className="topmenu_btn" onClick={JuFn}>
              <span onClick={(e) => setActiveMain("joinuspage")}>
                <span className="img_span">
                  <img className="topMenu_icon " src={ju} />
                  <img
                    className="btn_background_img_span"
                    src={contactus1}
                  ></img>
                </span>
                Join us
              </span>
            </button>
          )}
        </div>
      </div>

      {activeMain === "aboutus" && (
        <>
          <div className="row noPadding noMargin">
            <div className="row noMargin noPadding btn_row">
              <div className="col-sm-9 col-12 noMargin noPadding text-left button_margin_top">
                {outteamBtn === true ? (
                  <button className="common_btn blue_active">
                    <span onClick={(e) => setActive("ourTeam")}>Our Team</span>
                  </button>
                ) : (
                  <button
                    className="common_btn not_active_btn"
                    onClick={ourTeambtn}
                  >
                    <span onClick={(e) => setActive("ourTeam")}>Our Team</span>
                  </button>
                )}
                {testimonialBtn === true ? (
                  <button className="common_btn blue_active margin_left_btn">
                    <span onClick={(e) => setActive("testimonial")}>
                      Testimonials
                    </span>
                  </button>
                ) : (
                  <button
                    className="common_btn not_active_btn margin_left_btn"
                    onClick={testimonialBtnFn}
                  >
                    <span onClick={(e) => setActive("testimonial")}>
                      Testimonials
                    </span>
                  </button>
                )}
                {newsBtn === true ? (
                  <button className="common_btn blue_active margin_left_btn">
                    <span onClick={(e) => setActive("news")}>News</span>
                  </button>
                ) : (
                  <button
                    className="common_btn not_active_btn margin_left_btn"
                    onClick={newsBtnFn}
                  >
                    <span onClick={(e) => setActive("news")}>News</span>
                  </button>
                )}
                {mustRead === true ? (
                  <button className="common_btn blue_active margin_left_btn">
                    <span onClick={(e) => setActive("mustread")}>
                      Must Read
                    </span>
                  </button>
                ) : (
                  <button
                    className="common_btn not_active_btn margin_left_btn"
                    onClick={mustReadBtnFn}
                  >
                    <span onClick={(e) => setActive("mustread")}>
                      Must Read
                    </span>
                  </button>
                )}
              </div>
              {active === "testimonial" && (
                <div className="col-sm-3 col-12 noMargin noPadding text-right button_margin_top">
                  <button
                    className="common_btn_review green_active margin_left_btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <span className="review_span">Give your review</span>
                    <img className="review_icon" src={review2}></img>
                  </button>
                </div>
              )}
            </div>

            {/* Button section END */}

            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content ">
                  <div className="modal-header popupHead">
                    <span
                      className="modal-title biz_review_title align_self_center"
                      id="staticBackdropLabel"
                    >
                      Your Review
                    </span>
                    <button
                      type="button"
                      className="btn-close align_self_center"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body review_modal_body">
                    <span className="biz-review-subtitle ">
                      Give your review of your overall experience with <br></br>
                      "our wellness business"
                    </span>
                    <div className="designation_div">
                      <span className="biz-review-form-title">
                        Designation / Role
                      </span>
                    </div>
                    <input
                      type="text"
                      className="biz-review-input form-control"
                      placeholder="Enter your designation or role here"
                      value={reviewRole}
                      onChange={(e) => setReviewRole(e.target.value)}
                    ></input>
                    <div className="designation_div">
                      <span className="biz-review-form-title">Review</span>
                    </div>
                    <textarea
                      placeholder="write your review"
                      rows="8"
                      className="pop_review_text_area form-control"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer justify-content-start review_footer">
                    <button
                      type="button"
                      className="common_btn blue_active"
                      onClick={updateBasic}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="common_btn not_active_grey_btn"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row noMargin our_team_content content_sec">
            {active === "ourTeam" && (
              <>
                {whoWeAre === "" ? (
                  <></>
                ) : (
                  <div className="row noPadding who_we_are_main">
                    <div className="col-12 sectionPinkHead">Who We Are</div>
                    <div className="col-12 sectionBody">
                      <span className="sectionBodyText">{whoWeAre}</span>
                    </div>
                  </div>
                )}
                {ourMission === "" ? (
                  <></>
                ) : (
                  <div className="row noPadding who_we_are_main">
                    <div className="col-12 sectionPinkHead">Our Mission</div>
                    <div className="col-12 sectionBody">
                      <div
                        className="text-center sectionBodyHead"
                        style={{ fontWeight: "600" }}
                      >
                        {ourMissionHeading}
                      </div>
                      <div className="text-center mission_body_text_div">
                        <span className="sectionBodyText">{ourMission}</span>
                      </div>

                      <div className="row noMargin certi_leaf_sec">
                        {certificate.length > 0 &&
                          certificate.map((item) => (
                            <div className="col-xl-3 col-lg-4 col-md-6 col-12 mx-auto">
                              <div className="row noMargin">
                                <div className="col-12 mx-auto noPadding cert_main_sec">
                                  <div className="leaf_img_div">
                                    <img className="leaf_img" src={leaf} />
                                    <span className="leaf_item_name">
                                      {item.name}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 mx-auto noPadding text-center certified_by_div">
                                  <span className="sectionBodyHead">
                                    {item.certified_by}
                                  </span>
                                </div>

                                <div className="col-12 mx-auto text-center">
                                  <span className="sectionBodyText">
                                    {item.created_at.slice(0, 10)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
                {teamList.length > 0 ? (
                  <div className="row noPadding who_we_are_main">
                    <div className="col-12 sectionPinkHead">Meet the Team</div>
                    <div className="col-12 sectionBody">
                      <div class="accordion" id="accordionExample">
                        {teamList &&
                          teamList.map((item) => (
                            <div class="accordion-item">
                              {console.log(item)}
                              <div
                                class="accordion-header row noMargin"
                                id={item.user_id}
                              >
                                <button
                                  class="accordion-button acc_btn"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={"#collapseOne" + item.user_id}
                                  aria-expanded="false"
                                  aria-controls={
                                    "flush-collapseOne" + item.user_id
                                  }
                                >
                                  <div className="row noMargin noPadding profile_row_sec">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noMargin noPadding">
                                      <div className="row noMargin noPadding">
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2 noMargin noPadding align_self_center">
                                          <div className="profile_img_div">
                                            <img
                                              src={item.profile_image}
                                              className="biz-profile-pic"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-xl-11 col-lg-11 col-md-11 col-sm-10 col-10 noMargin noPadding align_self_center pro_details_sec">
                                          <span className="profile_name_span">
                                            {item.name}
                                          </span>
                                          <br></br>
                                          <span className="profile_role_span">
                                            {item.role}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </button>
                              </div>
                              <div
                                id={"collapseOne" + item.user_id}
                                class="accordion-collapse collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                              >
                                <div class="accordion-body acc_body">
                                  <span className="bio_text">
                                    <strong>{item.bio}</strong>
                                  </span>
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
          </div>
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
