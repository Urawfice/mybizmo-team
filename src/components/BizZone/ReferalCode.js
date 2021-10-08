import React, { useState, useEffect } from "react";
import coupon from "./BizImages/coupon.png";
import { Link, useHistory } from "react-router-dom";
import "./ReferalCode.css";
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
    <div>
      <div className="row  mt-5 ">
        <div className="col-xxl-12  referal-backgroubnd-nav pt-2 pl-5">
          <p>Invite Friends</p>
        </div>
      </div>
      <div className="row  referal-light-background">
        <div className="col-xl-11 mx-auto ">
          <div className="row  mt-5 p-5 referal-card-background">
            <div className="col-xl-7  col-lg-7 col-md-7 col-11">
              <p className="referal-card-title">FREE CREDIT</p>
              <p className="referal-card-subtitle">GET UNLIMITED FREE CREDIT</p>
              <p className="referal-card-text">
                Please redeem this referal code on any product before August 28,
                2021 to receive an instant 20% while purchasing paid packages.
              </p>
              <div className="row">
                <div className="col-xl-8   ">
                  <p className="referal-code-text text-center p-2 mt-2">
                    {referralCode}
                  </p>
                </div>
                <div className="col-xl-4   ">
                  <p
                    className="referal-code-copy text-center p-2 mt-2 "
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    SHARE
                  </p>
                </div>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title refral-review-title"
                          id="exampleModalLabel"
                        >
                          Share this Referral Code
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p className="refral-review-form-title mb-0">Email</p>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="refral-review-input"
                          value={referralEmail}
                          onChange={(e) => setReferralEmail(e.target.value)}
                        ></input>
                      </div>
                      <div className="modal-footer justify-content-start">
                        <button
                          type="button"
                          className="btn  refral-review-submit-btn mt-0 mb-0 "
                          onClick={updateBasic}
                        >
                          Send
                        </button>
                        <button
                          type="button"
                          className="btn  referal-review-cancel-btn"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="referal-terms-condition-text">
                Read <Link>terms and Conditions</Link> here
              </p>
            </div>

            <div className="col-xl-5 col-lg-5 col-md-5 col-11">
              <img
                src={coupon}
                style={{
                  display: "flex",
                  margin: "auto",
                  heigh: "15vh",
                  width: "15vw",
                }}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferalCode;
