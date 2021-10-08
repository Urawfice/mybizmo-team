import React, { useState } from "react";
import Competitions from "./Competitions";
import CouponCode from "./CouponCode";
import ReferalCode from "./ReferalCode";
import "./PromosAndOffersPage.css";

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
    <div>
      <div className="row mt-5">
        {compBtn === true ? (
          <div
            className="col-xl-2 col-lg-2 col-md-4 col-6 mr-4 text-center"
            onClick={(e) => setActive("Competitions")}
          >
            <p className="promos-btn-color p-2">Competitions</p>
          </div>
        ) : (
          <div
            className="col-xl-2 col-lg-2 col-md-4 col-6 mr-4 text-center"
            onClick={(e) => setActive("Competitions")}
          >
            <p onClick={compBtnFn} className="promos-btn-disabled-white  p-2">
              Competitions
            </p>
          </div>
        )}

        {coupBtn === true ? (
          <div
            className="col-xl-2 col-lg-2 col-md-4 col-6 mr-4 text-center"
            onClick={(e) => setActive("Couponcode")}
          >
            <p className="promos-btn-color  p-2">Coupon Codes</p>
          </div>
        ) : (
          <div
            className="col-xl-2 col-lg-2 col-md-4 col-6 mr-4 text-center"
            onClick={(e) => setActive("Couponcode")}
          >
            <p onClick={coupBtnFn} className="promos-btn-disabled-white  p-2">
              Coupon Codes
            </p>
          </div>
        )}

        {reffralBtn === true ? (
          <div
            className="col-xl-2 col-lg-2 col-md-4 col-6 mr-4 text-center"
            onClick={(e) => setActive("Referalcode")}
          >
            {" "}
            <p className="promos-btn-color p-2">Refferal Codes</p>
          </div>
        ) : (
          <div
            className="col-xl-2 col-lg-2 col-md-4 col-6 mr-4 text-center"
            onClick={(e) => setActive("Referalcode")}
          >
            {" "}
            <p
              onClick={reffralBtnFn}
              className="promos-btn-disabled-white  p-2"
            >
              Refferal Codes
            </p>
          </div>
        )}
      </div>
      {active === "Competitions" && <Competitions />}

      {active === "Couponcode" && <CouponCode />}

      {active === "Referalcode" && <ReferalCode />}
    </div>
  );
};

export default PromosAndOffersPage;
