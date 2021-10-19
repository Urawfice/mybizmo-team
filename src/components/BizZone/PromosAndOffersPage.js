import React, { useState } from "react";
import Competitions from "./Competitions";
import CouponCode from "./CouponCode";
import ReferalCode from "./ReferalCode";
import "./promosAndOffers.scss";

const PromosAndOffersPage = () => {
  const [active, setActive] = useState("Competitions");
  const [compBtn, setCompBtn] = useState(true);
  const [coupBtn, setCoupBtn] = useState(false);
  const [reffralBtn, setReffral] = useState(false);

  const compBtnFn = (e) => {
    e.preventDefault();
    setCompBtn(true);
    setCoupBtn(false);
    setReffral(false);
  };
  const coupBtnFn = (e) => {
    setCompBtn(false);
    setCoupBtn(true);
    setReffral(false);
  };
  const reffralBtnFn = (e) => {
    setCompBtn(false);
    setCoupBtn(false);
    setReffral(true);
  };

  return (
    <div className="promos_and_offers_main">
      <div className="row noMargin noPadding news_sec_div">
        <div className="col-12 noMargin noPadding">
          {compBtn === true ? (
            <span onClick={(e) => setActive("Competitions")} >
              <button className="common_btn blue_active">Competitions</button>
            </span>
          ) : (
            <span onClick={(e) => setActive("Competitions")}>
              <button onClick={compBtnFn} className="common_btn not_active_btn  ">
                Competitions
              </button>
            </span>
          )}

          {coupBtn === true ? (
            <span onClick={(e) => setActive("Couponcode")}>
              <button className="common_btn blue_active margin_left_btn">Coupon Codes</button>
            </span>
          ) : (
            <span onClick={(e) => setActive("Couponcode")}>
              <button onClick={coupBtnFn} className="common_btn not_active_btn margin_left_btn">
                Coupon Codes
              </button>
            </span>
          )}

          {reffralBtn === true ? (
            <span onClick={(e) => setActive("Referalcode")}>
              <button className="common_btn blue_active margin_left_btn">Refferal Codes</button>
            </span>
          ) : (
            <span onClick={(e) => setActive("Referalcode")}>
              <button onClick={reffralBtnFn} className="common_btn not_active_btn margin_left_btn">
                Refferal Codes
              </button>
            </span>
          )}
        </div>
      </div>
      {active === "Competitions" && <Competitions />}

      {active === "Couponcode" && <CouponCode />}

      {active === "Referalcode" && <ReferalCode />}
    </div>
  );
};

export default PromosAndOffersPage;
