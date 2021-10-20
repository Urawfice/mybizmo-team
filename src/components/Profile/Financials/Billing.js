import React, { useState, useEffect, Component } from "react";
import axios from "../../../Axios";
import Cookies from "universal-cookie";
import "./payout.scss";

const cookies = new Cookies();

function Billing(props) {
  const [billDetails, setBillDetails] = useState([]);
  const [addNewBill, setAddNewBill] = useState(false);

  useEffect(() => {
    axios
      .get("/masters/bill-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log("Billing Details", res.data);
        setBillDetails(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const addBillFn = () => {
    setAddNewBill(true);
  };
  const cancelFn = () => {
    setAddNewBill(false);
  };

  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");

  console.log(currency, amount, description, note);

  function BillingFormCreateFn() {
    let formData = new FormData();

    formData.append("master", cookies.get("id"));
    formData.append("amount", amount);
    formData.append("currency", currency);
    formData.append("bill_description", description);
    formData.append("note", note);
    axios
      .post(
        `/masters/bill-create`,
        formData,

        {
          headers: {
            Authorization: "Token" + " " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        console.log("response from submitting the form successful", res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("ERROR  from update in form", err);
      });
  }

  return (
    <div>
      <div className="row mt-4">
        <div className="col-xl-12 mx-auto ">
          <div className="row">
            <div className="col-xl-4 ">
              <p className="bank-main-title">
                Your Bills
                <span className="bank-main-title-fade">
                  {" "}
                  (for collecting payouts)
                </span>
              </p>
            </div>
            <div className="col-xl-6 mt-4"></div>
            <div className="col-xl-2   float-right">
              <p
                className="text-center bank-payment-info pl-2 pr-2 pt-1 pb-1 mt-2"
                onClick={addBillFn}
              >
                Create New Bill
              </p>
            </div>
          </div>
        </div>
      </div>

      {addNewBill === false ? (
        <table class="table mt-5">
          <thead className="table-header-fin">
            <tr>
              <th scope="col">Bill ID</th>
              <th scope="col">Bill Date</th>
              <th scope="col">Bill Description</th>
              <th scope="col">Amount</th>
              <th scope="col">More</th>
            </tr>
          </thead>
          <tbody>
            {billDetails &&
              billDetails.map((item) => (
                <tr>
                  <td className="table-text">{item.bill_id}</td>
                  <td className="table-text">{item.created_at.slice(0, 10)}</td>
                  <td className="table-text">{item.bill_description}</td>
                  <td className="table-text">{item.amount}</td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}

      {addNewBill === true ? (
        <div className="row">
          <div className="col-xl-11 mx-auto  p-5 bank-back">
            <p className="  bank-add-payment-title">Create-new Bill</p>
            <div className="row">
              <div className="col-xl-1 ">
                <p className="bank-form-title mb-1">Amount</p>
                <select
                  className="bank-form-input"
                  onClick={(e) => setCurrency(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="inr">INR</option>
                  <option value="usd">USD</option>
                  <option value="euro">Euro</option>
                  <option value="pound">Pound</option>
                </select>
              </div>
              <div className="col-xl-3 ">
                <input
                  placeholder="Please enter the amount here"
                  className="bank-form-input mt-4"
                  onChange={(e) => setAmount(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-xl-6 ">
                <p className="bank-form-title mb-1">Bill Description</p>
                <textarea
                  className="bank-form-input"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter package name, package ID, no. of classes taken, no. of hours taken, hourly rate etc..."
                  rows="4"
                  cols="60"
                />
              </div>
              <div className="col-xl-6 mx-auto ">
                <p className="bank-form-title mb-1">Notes</p>
                <textarea
                  className="bank-form-input"
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Please enter any additional notes here..."
                  rows="4"
                  cols="60"
                />
              </div>
            </div>

            <div className="row mt-5 mb-5">
              <div className="col-xl-2 ">
                <button
                  className="common_btn blue_active"
                  onClick={BillingFormCreateFn}
                >
                  {" "}
                  Save
                </button>
              </div>
              <div className="col-xl-2 " onClick={cancelFn}>
                <button className="common_btn not_active_btn"> Cancel</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Billing;
