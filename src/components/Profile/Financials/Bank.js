import React, { useState, useEffect, Component } from "react";
import axios from "../../../Axios";
import Cookies from "universal-cookie";
import "./Bank.css";
import "./payout.scss";

// Table from react-bootstrap
import { Table } from "react-bootstrap";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// To make rows collapsible
import "bootstrap/js/src/collapse.js";
import del from "../../Images/delete.png";
import edit from "../../Images/edit.png";

const cookies = new Cookies();

function Bank(props) {
  const [addPaymentActive, setAddPaymentActive] = useState(false);
  const [bankAccountActive, setBankAccountActive] = useState("");

  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [personName, setpersonName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [accountType, setAccountType] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [mmid, setmmid] = useState("");
  const [vpa, setVpa] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiIdName, setUpiIdName] = useState("");
  const [walletName, setWalletName] = useState("");
  const [walletPhoneNo, setWalletPhoneNo] = useState("");
  const [payPalName, setPayPalName] = useState("");
  const [paypalMail, setPaypalMail] = useState("");

  const bankActiveFn = (e) => {
    e.preventDefault();
    setBankAccountActive(e.target.value);
  };

  const addPaymentFn = () => {
    setAddPaymentActive(true);
  };
  const cancelFn = () => {
    setAddPaymentActive(false);
  };

  function BankFormCreateFn() {
    let formData = new FormData();

    formData.append("master", cookies.get("id"));
    formData.append("detail_type", bankAccountActive);
    formData.append("bank_name", bankName);
    formData.append("account_no", accountNo);
    formData.append("person_name", personName);
    formData.append("branch_address", branchAddress);
    formData.append("ifsc", ifscCode);
    formData.append("account_type", accountType);
    formData.append("mmid", mmid);
    formData.append("vpa", vpa);
    formData.append("upi_id_name", upiIdName);
    formData.append("upi_id", upiId);
    formData.append("wallet_name", walletName);
    formData.append("wallet_phone_no", walletPhoneNo);
    formData.append("paypal_mail", paypalMail);

    axios
      .post(
        `/masters/payment-detail-create`,
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

  const [bankAccountDetails, setBankAccountDetails] = useState([]);

  useEffect(() => {
    axios
      .get("/masters/payment-detail-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log("payment details", res.data);
        setBankAccountDetails(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div>
      <div className="row mt-5">
        <div className="col-xl-12 mx-auto  ">
          <div className="row">
            <div className="col-xl-4 ">
              <p className="bank-main-title">
                Your Payment Details
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
                onClick={addPaymentFn}
              >
                Add Payout Info
              </p>
            </div>
          </div>
        </div>
        {addPaymentActive === false ? (
          <div>
            <p className="bank-add-payment-title">Bank Accounts</p>
            <Table>
              <thead className="table-header-fin ">
                <tr>
                  <th></th>
                  <th>Account Number</th>
                  <th>Account Holders's Name</th>
                  <th>Bank Name</th>
                  <th></th>
                </tr>
              </thead>
              {bankAccountDetails &&
                bankAccountDetails.map((item) =>
                  item.detail_type === "Bank Account" ? (
                    <tbody className="p-3">
                      <tr
                        data-toggle="collapse"
                        data-target=".multi-collapse1"
                        aria-controls="multiCollapseExample1"
                      >
                        <td></td>
                        <td className="table-text">{item.account_no}</td>
                        <td className="table-text">{item.person_name}</td>
                        <td className="table-text">{item.bank_name}</td>
                        <td></td>
                      </tr>
                      <tr
                        class="collapse multi-collapse1"
                        id="multiCollapseExample1"
                      ></tr>
                    </tbody>
                  ) : (
                    <></>
                  )
                )}
              <p className="mt-5 bank-add-payment-title">UPI</p>
              {bankAccountDetails &&
                bankAccountDetails.map((item) =>
                  item.detail_type === "UPI" ? (
                    <tbody className="bank-details-table">
                      <tr>
                        <td></td>
                        <td className="table-text">{item.upi_id}</td>
                        <td className="table-text">{item.person_name}</td>
                        <td></td>
                        <td>
                          <img
                            src={edit}
                            style={{ height: "20px", width: "20px" }}
                          ></img>{" "}
                          <img
                            src={del}
                            style={{ height: "20px", width: "20px" }}
                          ></img>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <></>
                  )
                )}
              <p className="mt-5 bank-add-payment-title">Wallet</p>
              {bankAccountDetails &&
                bankAccountDetails.map((item) =>
                  item.detail_type === "Wallet" ? (
                    <tbody>
                      <tr>
                        <td></td>
                        <td className="table-text">{item.wallet_phone_no}</td>
                        <td className="table-text">{item.person_name}</td>
                        <td></td>
                        <td>
                          <img
                            src={edit}
                            style={{ height: "20px", width: "20px" }}
                          ></img>{" "}
                          <img
                            style={{ height: "20px", width: "20px" }}
                            src={del}
                          ></img>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <></>
                  )
                )}
              <p className="mt-5 bank-add-payment-title">PayPal</p>
              {bankAccountDetails &&
                bankAccountDetails.map((item) =>
                  item.detail_type === "Paypal" ? (
                    <tbody>
                      <tr>
                        <td></td>
                        <td className="table-text">{item.paypal_mail}</td>
                        <td className="table-text">{item.person_name}</td>
                        <td></td>
                        <td>
                          <img
                            src={edit}
                            style={{ height: "20px", width: "20px" }}
                          ></img>{" "}
                          <img
                            src={del}
                            style={{ height: "20px", width: "20px" }}
                          ></img>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <></>
                  )
                )}
            </Table>
          </div>
        ) : (
          <></>
        )}

        {addPaymentActive === true ? (
          <div className="row mt-5">
            <div className="col-xl-11 mx-auto  bank-back">
              <p className=" ml-5 mt-4 bank-add-payment-title">
                Add payment Information
              </p>
              <div className="row">
                <div className="col-xl-11 mx-auto  ">
                  <div className="row">
                    <div className="col-xl-6 mt-4">
                      <p className="bank-form-title mb-1">Receive Payment In</p>
                      <select
                        onClick={bankActiveFn}
                        className="bank-form-input"
                      >
                        <option value="">Select</option>
                        <option value="Bank Account">Bank Account</option>
                        <option value="UPI">UPI</option>
                        <option value="Wallet">Digital Wallet</option>
                        <option value="Paypal">PayPal</option>
                      </select>
                    </div>
                    {bankAccountActive === "Bank Account" ? (
                      <>
                        <div className="col-xl-6 mt-4">
                          <p className="bank-form-title mb-1">Bank Name</p>
                          <select
                            onClick={(e) => setBankName(e.target.value)}
                            className="bank-form-input"
                          >
                            <option value="">Select</option>
                            <option value="State Bank of India">
                              State Bank of India
                            </option>
                            <option value="ICIC Bank">ICIC Bank</option>
                            <option value="HDFC Bank">HDFC Bank</option>
                            <option value="Canara Bank">Canara Bank</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="col-xl-6 mt-4 mx-auto">
                          <p className="bank-form-title mb-1">Account Number</p>
                          <input
                            className="bank-form-input"
                            type="text"
                            onChange={(e) => setAccountNo(e.target.value)}
                            placeholder="Please enter your account number"
                          ></input>
                        </div>
                        <div className="col-xl-6 mt-4 mx-auto">
                          <p className="bank-form-title mb-1">
                            Account Holder’s Name
                          </p>
                          <input
                            className="bank-form-input"
                            type="text"
                            onChange={(e) => setpersonName(e.target.value)}
                            placeholder="Your name as provided in the bank statement"
                          ></input>
                        </div>

                        <div className="col-xl-6 mt-4 mx-auto">
                          <p className="bank-form-title mb-1">Bank Branch</p>
                          <input
                            className="bank-form-input"
                            type="text"
                            onChange={(e) => setBranchAddress(e.target.value)}
                            placeholder="Please enter the branch name of your bank"
                          ></input>
                        </div>
                        <div className="col-xl-6 mt-4 mx-auto">
                          <p className="bank-form-title mb-1">Account Type</p>
                          <select
                            className="bank-form-input"
                            onClick={(e) => setAccountType(e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Current Account">
                              Current Account
                            </option>
                            <option value="Savings Account">
                              Savings Account
                            </option>
                            <option value="Salary Account">
                              Salary Account
                            </option>
                            <option value="Fixed deposit Account">
                              Fixed deposit Account
                            </option>
                            <option value="Recurring deposit Account">
                              Recurring deposit Account
                            </option>
                            <option value="NRO">NRO Accounts</option>
                            <option value="NRE">NRE Accounts</option>
                            <option value="FCNR ">FCNR Accounts</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="col-xl-6 mt-4 mx-auto">
                          <p className="bank-form-title mb-1">IFSC</p>
                          <input
                            className="bank-form-input"
                            onChange={(e) => setIfscCode(e.target.value)}
                            placeholder="Please enter the IFSC  of your bank"
                          ></input>
                        </div>
                        <div className="col-xl-6 mt-4 mx-auto">
                          <p className="bank-form-title mb-1">MMID</p>
                          <input
                            className="bank-form-input"
                            onChange={(e) => setmmid(e.target.value)}
                            placeholder="Please enter the MMID associated with  your bank"
                          ></input>
                        </div>
                        <div className="col-xl-6 mt-4 ">
                          <p className="bank-form-title mb-1">VPA</p>
                          <input
                            className="bank-form-input"
                            onChange={(e) => setVpa(e.target.value)}
                            placeholder="Please enter the VPA associated with  your bank"
                          ></input>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {bankAccountActive === "UPI" ? (
                      <>
                        <div className="col-xl-6 mt-4 ">
                          <p className="bank-form-title mb-1">UPI Payment</p>
                          <select
                            onClick={(e) => setUpiIdName(e.target.value)}
                            className="bank-form-input"
                          >
                            <option value="">Select</option>
                            <option value="Paytm">PayTm</option>
                            <option value="Gpay">Gpay</option>
                            <option value="Amazon Pay">Amazon Pay</option>
                            <option value="BHIM">BHIM</option>
                            <option value="BHIM Axis Pay">BHIM Axis Pay</option>
                            <option value="iMobile ICICI Bank">
                              iMobile ICICI Bank
                            </option>
                            <option value="PhonePe">PhonePe</option>
                            <option value="Ola Money">Ola Money</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="col-xl-6 mt-4 ">
                          <p className="bank-form-title mb-1">UPI ID</p>
                          <input
                            className="bank-form-input"
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Please enter your Upi ID"
                          ></input>
                        </div>
                        <div className="col-xl-6 mt-4 ">
                          <p className="bank-form-title mb-1">
                            UPI ID Holder's Name
                          </p>
                          <input
                            className="bank-form-input"
                            onChange={(e) => setpersonName(e.target.value)}
                            placeholder="Please enter your name associated with ID"
                          ></input>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {bankAccountActive === "Wallet" ? (
                      <>
                        <div className="col-xl-6 mt-4 ">
                          <p className="bank-form-title mb-1">Digital Wallet</p>
                          <select
                            onClick={(e) => setWalletName(e.target.value)}
                            className="bank-form-input"
                          >
                            <option value="">Select</option>
                            <option value="Paytm">PayTm</option>
                            <option value="Gpay">Gpay</option>
                            <option value="Amazon Pay">Amazon Pay</option>
                            <option value="Freecharge">Freecharge</option>
                            <option value="Mobiwik">Mobiwik</option>
                            <option value="Airtel Money">Airtel Money</option>
                            <option value="PhonePe">PhonePe</option>
                            <option value="Ola Money">Ola Money</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="col-xl-6 mt-4 ">
                          <p className="bank-form-title mb-1">Contact Number</p>
                          <input
                            className="bank-form-input"
                            onChange={(e) => setWalletPhoneNo(e.target.value)}
                            placeholder="Enter your contact number connected to the wallet"
                          ></input>
                        </div>
                        <div className="col-xl-6 mt-4 ">
                          <p className="bank-form-title mb-1">
                            Wallet Holders's Name
                          </p>

                          <input
                            className="bank-form-input"
                            onChange={(e) => setpersonName(e.target.value)}
                            placeholder="Please enter your name as associated with your wallet"
                          ></input>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {bankAccountActive === "Paypal" ? (
                      <>
                        <div className="col-xl-6 mt-4 ">
                          <p className="bank-form-title mb-1">PayPal ID</p>
                          <input
                            className="bank-form-input"
                            onChange={(e) => setPaypalMail(e.target.value)}
                            placeholder="Please enter your PayPal ID"
                          ></input>
                        </div>
                        <div className="col-xl-6 mt-4 ">
                          <p className="bank-form-title mb-1">Name</p>
                          <input
                            className="bank-form-input"
                            onChange={(e) => setpersonName(e.target.value)}
                            placeholder="Please enter your name as mentioned on your PayPal account"
                          ></input>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="row mt-5 mb-5">
                    <div className="col-xl-2 " onClick={BankFormCreateFn}>
                      <button className="common_btn blue_active"> Save</button>
                    </div>
                    <div className="col-xl-2 " onClick={cancelFn}>
                      <button className="common_btn not_active_btn">
                        {" "}
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Bank;
