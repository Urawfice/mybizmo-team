import React, { useState, useEffect } from "react";
import coupon from "./BizImages/coupon.png";
import { Link, useHistory } from "react-router-dom";
import "./Couponcode.css";
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
        <div>
          <div className="row  mt-5 ">
            <div className="col-xxl-12  coupon-backgroubnd-nav pt-2 pl-5">
              <p>Redeem Coupon Codes</p>
            </div>
          </div>
          <div className="row  coupon-light-background">
            {couponCodeList &&
              couponCodeList.map((item) => (
                <div className="col-xl-11 mx-auto ">
                  <div className="row  mt-5 p-5 coupon-card-background mb-5">
                    <div className="col-xl-7  col-lg-7 col-md-7 col-11">
                      {item.discount_in_percentage == 0 ? (
                        <p className="coupon-card-title">
                          GET {item.discount_in_amount}Rs OFF
                        </p>
                      ) : (
                        <p className="coupon-card-title">
                          GET {item.discount_in_percentage}% OFF
                        </p>
                      )}

                      <p className="coupon-card-subtitle">LIMITED TIME OFFER</p>
                      <p className="coupon-card-text">
                        Please redeem this coupon code on any product before{" "}
                        {item.expiry_date.slice(0, 10)} to receive an instant{" "}
                        {item.discount_in_amount == 0
                          ? item.discount_in_percentage
                          : item.discount_in_amount}{" "}
                        while purchasing paid packages.
                      </p>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-8 col-12  ">
                          <p className="coupon-code-text text-center p-2 mt-2">
                            {item.code}
                          </p>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4  col-6">
                          <p className="coupon-code-copy text-center p-2 mt-2">
                            COPY
                          </p>
                        </div>
                      </div>
                      <p className="coupon-terms-condition-text">
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
              ))}

            {/* <div className="col-xl-11 mx-auto ">
                
                <div className='row  mt-5 p-5 coupon-card-background'>
                <div className='col-xl-7  col-lg-7 col-md-7 col-11'>
 <p className="coupon-card-title">GET 20% OFF</p>
 <p className="coupon-card-subtitle">LIMITED TIME OFFER</p>
 <p className="coupon-card-text">Please redeem this coupon code on any product before August 28, 2021 
 to receive an instant 20% while purchasing paid packages.</p>
 <div className='row'>
 <div className='col-xl-8   '><p className="coupon-code-text text-center p-2 mt-2">PACKGS-USER-20</p></div>
<div className='col-xl-4   '><p className="coupon-code-copy text-center p-2 mt-2">COPY</p></div>
 </div>
 <p className="coupon-terms-condition-text">Read <Link>terms and Conditions</Link>  here</p>
 
 
 </div>
 
 <div className='col-xl-5 col-lg-5 col-md-5 col-11'>
 
     <img src={coupon} style={{display:'flex',margin:"auto", heigh:"15vh",width:"15vw"}}></img>
 </div>
                </div>
                 
                 </div> */}
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
