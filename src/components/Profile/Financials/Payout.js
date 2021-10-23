import React, { useState, useEffect, Component } from "react";
import axios from "../../../Axios";
import Cookies from "universal-cookie";
import "./payout.scss";
import readmore from "../../Images/readmore.png";
import cancel from "../../Images/cancel.png";
const cookies = new Cookies();
function Payout(props) {
  const [payoutDetails, setPayoutDetails] = useState([]);
  const [allDetails, setAllDetails] = useState("");
  useEffect(() => {
    axios
      .get("/masters/payout-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log("payout Details", res.data);
        setPayoutDetails(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [show, setShow] = useState(false);
  const showDiv = (e, item) => {
    e.preventDefault();
    setShow(true);
    console.log(item);
    axios
      .get(`/masters/payout-detail/${item}`, {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log("payout full Details", res.data);
        setAllDetails(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const cancelDiv = () => {
    setShow(false);
  };

  return (
    <div>
      {show === false ? (
        <table class="table" style={{ marginTop: "5%" }}>
          <thead className="table-header-fin">
            <tr>
              <th scope="col">Transaction ID</th>
              <th scope="col">Bill ID</th>
              <th scope="col">Transaction Date</th>
              <th scope="col">Amount Paid</th>
              <th scope="col">Mode of payment</th>
              <th scope="col">Receipt</th>
              <th scope="col">more</th>
            </tr>
          </thead>

          <tbody>
            {payoutDetails &&
              payoutDetails.map((item) => (
                <tr>
                  <td className="bank-more-details-data">
                    {item.transaction_id}
                  </td>
                  <td className="bank-more-details-data">{item.bill_id}</td>
                  <td className="bank-more-details-data">
                    {item.bill_date.slice(0, 10)}
                  </td>
                  <td className="bank-more-details-data">{item.amount_paid}</td>
                  <td className="bank-more-details-data">
                    {item.mode_of_payment}
                  </td>
                  <td className="bank-more-details-data">{item.receipt}</td>
                  <td>
                    <img
                      src={readmore}
                      onClick={(e) => showDiv(e, item.id)}
                    ></img>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}

      {show === true ? (
        <div className=" row pt-5 mt-5 bank-back">
          <div className="col-xl-11 mx-auto ">
            <div className="row">
              <div className="col-xl-1 " onClick={cancelDiv}>
                <img
                  src={cancel}
                  style={{ display: "flex", margin: "auto" }}
                ></img>
              </div>
              <div className="col-xl-4 ">
                <p className="bank-add-payment-title">
                  Transaction ID:{allDetails.transaction_id}
                </p>
              </div>
              <div className="col-xl-2 ">
                {/* {allDetails.created_at !== null &&
                  allDetails.created_at.slice(0, 10)} */}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-xl-1 ">
                <p className="bank-more-details-title text-center">Bill ID:</p>
              </div>
              <div className="col-xl-2 ">
                <p className="bank-more-details-data">{allDetails.bill_id}</p>
              </div>
              <div className="col-xl-1 "></div>
              <div className="col-xl-2 ">
                <p className="bank-more-details-title">Bill Date:</p>
              </div>
              <div className="col-xl-1 "></div>
            </div>

            <table class="table" style={{ marginTop: "5%" }}>
              <thead className="table-header-fin">
                <tr>
                  <th scope="col">Billed Amount</th>
                  <th scope="col">Amount withheld</th>
                  <th scope="col">Amount Paid</th>
                  <th scope="col">Mode of payment</th>
                  <th scope="col">Receipt</th>
                </tr>
              </thead>

              <tbody>
                {allDetails && (
                  <tr>
                    <td className="bank-more-details-data">{allDetails.id}</td>
                    <td className="bank-more-details-data">
                      {allDetails.amount_withheld}
                    </td>
                    <td className="bank-more-details-data">
                      {allDetails.amount_paid}
                    </td>
                    <td className="bank-more-details-data">
                      {allDetails.mode_of_payment}
                    </td>
                    <td className="bank-more-details-data">
                      {/* {allDetails.mode_of_payment} */}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <table class="table" style={{ marginTop: "5%" }}>
              <thead className="table-header-fin">
                <tr>
                  <th scope="col">Bill Description</th>
                </tr>
              </thead>

              <tbody>
                {allDetails && (
                  <tr>
                    <td className="bank-more-details-data">
                      {allDetails.bill_description}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <table class="table" style={{ marginTop: "5%" }}>
              <thead className="table-header-fin">
                <tr>
                  <th scope="col">Notes</th>
                </tr>
              </thead>

              <tbody>
                {allDetails && (
                  <tr>
                    <td className="bank-more-details-data">
                      {allDetails.bill_note}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Payout;
