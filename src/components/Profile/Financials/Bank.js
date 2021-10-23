import React, { useState, useEffect, Component } from "react";
import axios from "../../../Axios";
import Cookies from "universal-cookie";
import "./Bank.css";
import "./payout.scss";
import unselectimg from "../../Images/unselectimg.png";
import selectimg from "../../Images/selectimg.png";

// Table from react-bootstrap
import { Table } from "react-bootstrap";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// To make rows collapsible
import "bootstrap/js/src/collapse.js";
import del from "../../Images/delete.png";
import edit from "../../Images/edit.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import more from "../../Images/more.png";
import less from "../../Images/less.png";

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
    setShowTable(false);
  };
  const cancelFn = () => {
    setAddPaymentActive(false);
    setShowTable(true);
  };

  const [showEditForm, setShowEditForm] = useState(false);

  const cancelEdit = () => {
    setShowEditForm(false);
    setShowTable(true);
  };

  const [editId, setEditId] = useState();
  const editForm = (e, id) => {
    setShowEditForm(true);
    setEditId(id);
    e.preventDefault();
    console.log(id);
    setShowTable(false);
  };

  const [showTable, setShowTable] = useState(true);

  const showTableFn = () => {
    setShowTable(false);
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

  // State variable to keep track of all the expanded rows
  // By default, nothing expanded. Hence initialized with empty array.
  const [expandedRows, setExpandedRows] = useState([]);

  // State variable to keep track which row is currently expanded.
  const [expandState, setExpandState] = useState({});

  /**
   * This function gets called when show/hide link is clicked.
   */
  const handleEpandRow = (event, userId) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(userId);

    let obj = {};
    isRowExpanded ? (obj[userId] = false) : (obj[userId] = true);
    setExpandState(obj);

    // If the row is expanded, we are here to hide it. Hence remove
    // it from the state variable. Otherwise add to it.
    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== userId)
      : currentExpandedRows.concat(userId);

    setExpandedRows(newExpandedRows);
  };

  const deleteFn = (e, id) => {
    e.preventDefault();
    console.log(id);
    axios
      .delete(
        `/masters/payment-detail-delete/${id}`,

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
  };

  const EditFormCreate = () => {
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
      .put(
        `/masters/payment-detail-update/${editId}`,
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
  };

  const primaryBankFn = (e) => {
    e.preventDefault();
    axios
      .get(`/masters/payment-detail-primary-select/${modalId}`, {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log("payment details", res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const [modalId, setModalId] = useState("");
  const gettingBankIdFn = (e, id) => {
    e.preventDefault();
    console.log("test modal id", id);
    setModalId(id);
  };

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

        {showTable === true ? (
          <div>
            <p className="bank-add-payment-title">Bank Accounts</p>

            <Row>
              <Col lg={12}>
                <Table responsive>
                  <thead className="table-header-fin">
                    <tr>
                      <th></th>
                      <th>Account Number</th>
                      <th>Account Holder's Name</th>
                      <th>Bank Name</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankAccountDetails.map((user) =>
                      user.detail_type === "Bank Account" ? (
                        <>
                          <tr key={user.id} style={{ color: "black" }}>
                            <td>
                              {user.primary === false ? (
                                <img
                                  type="button"
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  className="mt-2"
                                  src={unselectimg}
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                    display: "flex",
                                    margin: "auto",
                                  }}
                                  onClick={(e) => gettingBankIdFn(e, user.id)}
                                ></img>
                              ) : (
                                <img
                                  type="button"
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  className="mt-2"
                                  src={selectimg}
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                    display: "flex",
                                    margin: "auto",
                                  }}
                                  onClick={(e) => gettingBankIdFn(e, user.id)}
                                ></img>
                              )}
                            </td>
                            <td className="bank-more-details-data">
                              {user.account_no}
                            </td>
                            <td className="bank-more-details-data">
                              {user.person_name}
                            </td>
                            <td className="bank-more-details-data">
                              {user.bank_name}
                            </td>
                            <td></td>

                            <td>
                              <Button
                                variant="link"
                                onClick={(event) =>
                                  handleEpandRow(event, user.id)
                                }
                              >
                                {expandState[user.id] ? (
                                  <img
                                    src={less}
                                    style={{ height: "10px", width: "20px" }}
                                  />
                                ) : (
                                  <img
                                    src={more}
                                    style={{ height: "10px", width: "20px" }}
                                  />
                                )}
                              </Button>
                            </td>
                          </tr>
                          <>
                            {expandedRows.includes(user.id) ? (
                              <tr style={{ backgroundColor: "#E6E4E9" }}>
                                <td colspan="6">
                                  <div
                                    style={{
                                      backgroundColor: "#E6E4E9",
                                      color: "black",
                                    }}
                                  >
                                    <div className="row pt-5">
                                      <div className="col-xl-11 mx-auto ">
                                        <div className="row">
                                          <div className="col-xl-4 ">
                                            <div className="row">
                                              <div className="col-xl-4 ">
                                                <p className="bank-more-details-title">
                                                  {" "}
                                                  Bank Branch
                                                </p>
                                              </div>
                                              <div className="col-xl-8 ">
                                                <p className="bank-more-details-data">
                                                  {" "}
                                                  {user.branch_address}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="row mt-3">
                                              <div className="col-xl-4 ">
                                                <p className="bank-more-details-title">
                                                  {" "}
                                                  MMID
                                                </p>
                                              </div>
                                              <div className="col-xl-8 ">
                                                <p className="bank-more-details-data">
                                                  {" "}
                                                  {user.mmid}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-xl-4 ">
                                            <div className="row">
                                              <div className="col-xl-4 ">
                                                <p className="bank-more-details-title">
                                                  {" "}
                                                  IFSC
                                                </p>
                                              </div>
                                              <div className="col-xl-8 ">
                                                <p className="bank-more-details-data">
                                                  {" "}
                                                  {user.ifsc}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-xl-4 ">
                                            <div className="row">
                                              <div className="col-xl-5 ">
                                                <p className="bank-more-details-title">
                                                  VPA
                                                </p>
                                              </div>
                                              <div className="col-xl-7 ">
                                                <p className="bank-more-details-data">
                                                  {" "}
                                                  {user.vpa}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="row mt-3">
                                              <div className="col-xl-5 ">
                                                <button
                                                  className="common_btn blue_active"
                                                  onClick={(e) =>
                                                    editForm(e, user.id)
                                                  }
                                                >
                                                  Edit
                                                </button>
                                              </div>
                                              <div className="col-xl-5 ">
                                                <button
                                                  className="common_btn not_active_btn"
                                                  onClick={(e) =>
                                                    deleteFn(e, user.id)
                                                  }
                                                >
                                                  Delete
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ) : null}
                          </>
                        </>
                      ) : (
                        <></>
                      )
                    )}
                  </tbody>

                  <p className="mt-5 bank-add-payment-title">UPI</p>
                  {bankAccountDetails &&
                    bankAccountDetails.map((item) =>
                      item.detail_type === "UPI" ? (
                        <tbody className="bank-details-table">
                          <tr>
                            <td>
                              {" "}
                              {item.primary === false ? (
                                <img
                                  type="button"
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  className="mt-2"
                                  src={unselectimg}
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                    display: "flex",
                                    margin: "auto",
                                  }}
                                  onClick={(e) => gettingBankIdFn(e, item.id)}
                                ></img>
                              ) : (
                                <img
                                  type="button"
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  className="mt-2"
                                  src={selectimg}
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                    display: "flex",
                                    margin: "auto",
                                  }}
                                  onClick={(e) => gettingBankIdFn(e, item.id)}
                                ></img>
                              )}
                            </td>
                            <td className="table-text">{item.upi_id}</td>
                            <td className="table-text">{item.person_name}</td>
                            <td></td>
                            <td>
                              <img
                                onClick={(e) => editForm(e, item.id)}
                                src={edit}
                                style={{ height: "40px", width: "40px" }}
                              ></img>{" "}
                            </td>

                            <td>
                              <img
                                src={del}
                                className="mt-2"
                                style={{ height: "20px", width: "20px" }}
                                onClick={(e) => deleteFn(e, item.id)}
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
                            <td>
                              {" "}
                              {item.primary === false ? (
                                <img
                                  className="mt-2"
                                  src={unselectimg}
                                  type="button"
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                    display: "flex",
                                    margin: "auto",
                                  }}
                                  onClick={(e) => gettingBankIdFn(e, item.id)}
                                ></img>
                              ) : (
                                <img
                                  className="mt-2"
                                  src={selectimg}
                                  type="button"
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                    display: "flex",
                                    margin: "auto",
                                  }}
                                  onClick={(e) => gettingBankIdFn(e, item.id)}
                                ></img>
                              )}
                            </td>
                            <td className="table-text">
                              {item.wallet_phone_no}
                            </td>
                            <td className="table-text">{item.person_name}</td>
                            <td></td>
                            <td>
                              {" "}
                              <img
                                onClick={(e) => editForm(e, item.id)}
                                src={edit}
                                style={{ height: "40px", width: "40px" }}
                              ></img>{" "}
                            </td>

                            <td>
                              <img
                                style={{ height: "20px", width: "20px" }}
                                src={del}
                                className="mt-2"
                                onClick={(e) => deleteFn(e, item.id)}
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
                            <td>
                              {" "}
                              {item.primary === false ? (
                                <img
                                  type="button"
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  className="mt-2"
                                  src={unselectimg}
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                    display: "flex",
                                    margin: "auto",
                                  }}
                                  onClick={(e) => gettingBankIdFn(e, item.id)}
                                ></img>
                              ) : (
                                <img
                                  className="mt-2"
                                  src={selectimg}
                                  type="button"
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                    display: "flex",
                                    margin: "auto",
                                  }}
                                  onClick={(e) => gettingBankIdFn(e, item.id)}
                                ></img>
                              )}
                            </td>
                            <td className="table-text">{item.paypal_mail}</td>
                            <td className="table-text">{item.person_name}</td>
                            <td></td>
                            <td>
                              <img
                                onClick={(e) => editForm(e, item.id)}
                                src={edit}
                                style={{ height: "40px", width: "40px" }}
                              ></img>{" "}
                            </td>

                            <td>
                              <img
                                src={del}
                                className="mt-2"
                                style={{ height: "20px", width: "20px" }}
                                onClick={(e) => deleteFn(e, item.id)}
                              ></img>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <></>
                      )
                    )}
                </Table>
              </Col>
            </Row>
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

        {showEditForm === true ? (
          <div>
            <div className="row mt-5">
              <div className="col-xl-11 mx-auto  bank-back">
                <p className=" ml-5 mt-4 bank-add-payment-title">
                  Add payment Information
                </p>
                <div className="row">
                  <div className="col-xl-11 mx-auto  ">
                    <div className="row">
                      <div className="col-xl-6 mt-4">
                        <p className="bank-form-title mb-1">
                          Receive Payment In
                        </p>
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
                            <p className="bank-form-title mb-1">
                              Account Number
                            </p>
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
                              <option value="BHIM Axis Pay">
                                BHIM Axis Pay
                              </option>
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
                            <p className="bank-form-title mb-1">
                              Digital Wallet
                            </p>
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
                            <p className="bank-form-title mb-1">
                              Contact Number
                            </p>
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
                      <div className="col-xl-2 " onClick={EditFormCreate}>
                        <button className="common_btn blue_active">
                          {" "}
                          Save
                        </button>
                      </div>
                      <div className="col-xl-2 " onClick={cancelEdit}>
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
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        className="modal fade "
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-center "
                id="exampleModalLongTitle"
              >
                Change primary payment detail
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
              <div className="row">
                <div className="col-xl-10 mx-auto">
                  <p className="text-center">
                    Are you sure you want to add 'Bank Account-ICICI' as your
                    new primary payment detail?
                  </p>
                  <p className="text-center">
                    (The default one will be removed as primary and appear under
                    the "Bank Account" section)
                  </p>
                </div>
                <div className="row">
                  <div className="col-xl-12 mx-auto">
                    <div className="row mt-2 mb-3">
                      <div className="col-xl-6 ">
                        <button
                          className="common_btn blue_active"
                          onClick={primaryBankFn}
                        >
                          {" "}
                          yes
                        </button>
                      </div>
                      <div className="col-xl-6 ">
                        <button
                          className="common_btn not_active_btn"
                          data-dismiss="modal"
                        >
                          {" "}
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bank;
