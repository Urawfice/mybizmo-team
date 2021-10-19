import React, { useState, useEffect } from "react";
import coupon from "./BizImages/coupon.png";
import { Link, useHistory } from "react-router-dom";
import "./referalCode.scss";
import axios from "../../Axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const CouponCode = () => {
  const [couponCodeList, setCouponCodeList] = useState([]);

  useEffect(() => {
    axios
      .get("/users/coupon-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setCouponCodeList(res.data.coupons);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <>
      {couponCodeList.length < 0 ? (
        <div className="referral_code_main">
          <div className="row noMargin noPadding news_sec_div">
            <div className="col-12 sectionPinkHead">
            Redeem Coupon Codes
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 sectionBody">
            {couponCodeList &&
              couponCodeList.map((item) => (
                <div className="row card referral_card noMargin">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding noMargin">
                    <div className="row noPadding noMargin">
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12 noPadding noMargin">
                        <div>
                          {item.discount_in_percentage == 0 ? (
                            <span className="referal-card-title">GET {item.discount_in_amount}Rs OFF</span>
                          ) : (
                            <span className="referal-card-title">GET {item.discount_in_percentage}% OFF</span>
                          )}
                        </div>
                        <div>
                          <span className="referal-card-subtitle">LIMITED TIME OFFER</span>
                        </div>
                        <div>
                          <span className="referal-card-text">
                            Please redeem this coupon code on any product before{" "}
                            {item.expiry_date.slice(0, 10)} to receive an instant{" "}
                            {item.discount_in_amount == 0
                              ? item.discount_in_percentage
                              : item.discount_in_amount}{" "}
                            while purchasing paid packages.
                          </span>
                        </div>
                        <div className="row noMargin noPadding button_margin_top">
                          <div className="col-8 noPadding">
                            <button className="referal-code-text text-center">{item.code}</button>
                          </div>
                          <div className="col-4 noPadding">
                            <button className="referal-code-copy text-center">
                              COPY
                            </button>
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
              ))}

          </div>
        </div>
      ) : (
        <>
          <p className="text-center mt-5 no-coupon-code-text">
            No coupon codes available
          </p>
        </>
      )}
    </>
  );
};

export default CouponCode;
