import React, { useState, useEffect, Component } from "react";
import axios from "../../../Axios";
import Cookies from "universal-cookie";
import "./payout.scss";
const cookies = new Cookies();
function Payout(props) {
  const [payoutDetails, setPayoutDetails] = useState([]);
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
  return (
    <div>
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
                <td>{item.transaction_id}</td>
                <td>{item.bill_id}</td>
                <td>{item.bill_date.slice(0, 10)}</td>
                <td>{item.amount_paid}</td>
                <td>{item.mode_of_payment}</td>
                <td>{item.receipt}</td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payout;
