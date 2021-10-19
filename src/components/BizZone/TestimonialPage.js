import React, { useState, useEffect } from "react";
import quotes from "./BizImages/quotes.png";
import profilepictest from "./BizImages/profile-pic-test.jpeg";
import axios from "../../Axios";
import Cookies from "universal-cookie";
// import "./TestimonialPage.css";
import "./testimonial.scss";

const cookies = new Cookies();

const TestimonialPage = () => {
  const [testimonialList, setTestimonialList] = useState([]);

  useEffect(() => {
    axios
      .get("/users/testimonial-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setTestimonialList(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div className="testimonial_main">
      {testimonialList.length > 0 ? (
        <div className="row noPadding noMargin testimonial_sec_div">
          {testimonialList &&
            testimonialList.map((item) => (
              <div className="col-xl-4 col-lg-4 col-md-6 col-12 each_card_div">
              <div className="card testimonial_card">
                <img src={quotes} className="image_quotes" />

                  <div className="row noPadding noMargin">
                    <div className="col-xl-2 col-lg-2 col-md-1 col-sm-2 col-2 noMargin noPadding align_self_center">
                      <div className="profile_img_div">
                        <img src={item.user_image} className="biz-profile-pic" />
                      </div>
                    </div>
                    <div className="col-xl-10 col-lg-10 col-md-11 col-sm-10 col-10 noMargin noPadding align_self_center pro_details_sec">
                      <span className="profile_name_span">{item.name}</span>
                      <br></br>
                      <span className="profile_role_span">{item.designation}</span>
                    </div>
                </div>
                <div className="row noPadding noMargin test_desc_sec">
                  <div className="col-12 noPadding">
                    <p className="test_desc">{item.content}</p>
                  </div>
                </div>
              </div>
              </div>
            ))}
        </div>
      ) : (
        <div>
          <p className="add-your-review-text mt-5">Add your Review</p>
        </div>
      )}
    </div>
  );
};

export default TestimonialPage;
