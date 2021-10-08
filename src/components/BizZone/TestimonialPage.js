import React, { useState, useEffect } from "react";
import review from "./BizImages/review.png";
import profilepictest from "./BizImages/profile-pic-test.jpeg";
import axios from "../../Axios";
import Cookies from "universal-cookie";
import "./TestimonialPage.css";

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
    <div>
      {testimonialList.length > 0 ? (
        <div className="row mt-5 test-card-row-padding">
          {testimonialList &&
            testimonialList.map((item) => (
              <div
                className="col-xl-3 col-lg-3 col-md-5 col-10 mt-5 pt-2 mx-auto test-card-style "
                style={{ minWidth: "350px", maxWidth: "20vw" }}
              >
                <img src={review} className="image-review" />
                <img src={review} className="image-review1" />

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
                <div className="row p-2 mt-2">
                  <div className="col-xxl-12">
                    <p className="test-review-text">{item.content}</p>
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
