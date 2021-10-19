import React, { useState, useEffect } from "react";
import coupon from "./BizImages/coupon.png";
import { Link, useHistory } from "react-router-dom";
import "./referalCode.scss";
import axios from "../../Axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ReferalCode = () => {
  const history = useHistory();

  const [referralCode, setReferralCode] = useState("");
  const [referralEmail, setReferralEmail] = useState(null);

  useEffect(() => {
    axios
      .get("/users/referral-code", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data.code);
        setReferralCode(res.data.code);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  function updateBasic() {
    let formData = new FormData();

    formData.append("email", referralEmail);

    axios
      .post(
        `/users/send-referral-code`,
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
    <div className="referral_code_main">
      <div className="row noMargin noPadding news_sec_div">
        <div className="col-12 sectionPinkHead">
          Invite Friends
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 sectionBody">
          <div className="row card referral_card noMargin">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding noMargin">
              <div className="row noPadding noMargin">
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 noPadding noMargin">
                  <div>
                    <span className="referal-card-title">FREE CREDIT</span>
                  </div>
                  <div>
                    <span className="referal-card-subtitle">GET UNLIMITED FREE CREDIT</span>
                  </div>
                  <div>
                    <span className="referal-card-text">
                      Please redeem this referal code on any product before August 28,
                      2021 to receive an instant 20% while purchasing paid packages.
                    </span>
                  </div>

                  <div className="row noMargin noPadding button_margin_top">
                    <div className="col-8 noPadding">
                      <button className="referal-code-text text-center">{referralCode}</button>
                    </div>
                    <div className="col-4 noPadding">
                      <button className="referal-code-copy text-center" data-toggle="modal" data-target="#exampleModal">
                        Share
                      </button>
                    </div>

                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                          <div className="modal-header popupHead">
                            <span className="modal-title biz_review_title align_self_center" id="staticBackdropLabel">
                              Share this Referral Code
                            </span>
                            {/* <button type="button" className="btn-close align_self_center close" data-dismiss="modal" aria-label="Close"></button> */}
                            <button type="button" className="close align_self_center" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body body_modal">
                            <p className="refral-review-form-title">Email</p>
                            <input type="email"
                              placeholder="Enter your email"
                              className="refral-review-input form-control"
                              value={referralEmail}
                              onChange={(e) => setReferralEmail(e.target.value)}
                            ></input>
                          </div>
                          <div className="modal-footer justify-content-start popupHead">
                            <button type="button" className="blue_active common_btn" onClick={updateBasic}>
                              Send
                            </button>
                            <button type="button" className="common_btn not_active_btn" data-dismiss="modal" style={{"border": "1px solid #787676;"}}>
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row noMargin noPadding button_margin_top">
                    <span className="referal-terms-condition-text noPadding">
                      Read <Link><span style={{ "color": "#9929FD" }}>terms and Conditions</span></Link> here
                    </span>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 noPadding noMargin alignSelfCenter mob_display_none">
                  <div className="coupon_img_div">
                    <img className="coupon_img" src={coupon}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferalCode;
