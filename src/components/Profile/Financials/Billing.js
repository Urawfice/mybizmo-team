import React, { useState, useEffect, Component } from "react";
import axios from "../../../Axios";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import more from "../../Images/more.png";
import less from "../../Images/less.png";
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
    setShowTable(false);
  };
  const cancelFn = () => {
    setAddNewBill(false);
    setShowTable(true);
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
        `/masters/bill-delete/${id}`,

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

  const [showEdit, setShowEdit] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editId, setEditId] = useState("");
  const [editBillId, setEditBillId] = useState("");

  const editFromFn = (e, id, billId) => {
    e.preventDefault();
    console.log(id, billId);
    setEditBillId(billId);
    setShowEdit(true);
    setEditId(id);
    setShowTable(false);
  };

  const editFormSubmit = () => {
    let formData = new FormData();

    formData.append("master", cookies.get("id"));
    formData.append("amount", amount);
    formData.append("currency", currency);
    formData.append("bill_description", description);
    formData.append("note", note);
    formData.append("bill_id", editBillId);
    axios
      .put(
        `/masters/bill-update/${editId}`,
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
            <div className="col-xl-2 col-lg-2 col-md-3 col-4  float-right">
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

      {showTable == true ? (
        <>
          <Row>
            <Col lg={12}>
              <Table responsive>
                <thead className="table-header-fin">
                  <tr>
                    <th>Bill ID</th>
                    <th>Bill Date</th>
                    <th>Bill Description</th>
                    <th>Amount</th>
                    <th>More</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {billDetails &&
                    billDetails.map((user) => (
                      <>
                        <tr key={user.id} style={{ color: "black" }}>
                          <td className="bank-more-details-data">
                            {user.bill_id}
                          </td>
                          <td className="bank-more-details-data">
                            {user.created_at.slice(0, 10)}
                          </td>
                          <td
                            className="bank-more-details-data"
                            style={{ maxWidth: "250px" }}
                          >
                            {user.bill_description.slice(0, 50)}
                          </td>
                          <td className="bank-more-details-data">
                            {user.amount}
                          </td>

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
                              <td colspan="5">
                                <div
                                  style={{
                                    backgroundColor: "#E6E4E9",
                                    color: "black",
                                  }}
                                >
                                  <div className="row pt-3">
                                    <div className="col-xl-12 mx-auto ">
                                      <div className="row">
                                        <div className="col-xl-11 mx-auto">
                                          <div className="row mt-2">
                                            <div className="col-xl-2">
                                              <p className="bank-more-details-title">
                                                {" "}
                                                Bill Description
                                              </p>
                                            </div>
                                            <div className="col-xl-8">
                                              <p className="bank-more-details-data">
                                                {" "}
                                                {user.bill_description}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row mt-2">
                                        <div className="col-xl-11 mx-auto">
                                          <div className="row">
                                            <div className="col-xl-2">
                                              <p className="bank-more-details-title">
                                                {" "}
                                                Notes
                                              </p>
                                            </div>
                                            <div className="col-xl-8">
                                              <p className="bank-more-details-data">
                                                {" "}
                                                {user.note}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row mt-3 mb-5">
                                        <div className="col-xl-11 mx-auto">
                                          <div className="row">
                                            <div className="col-xl-7"></div>
                                            <div className="col-xl-5">
                                              <div className="row mt-3">
                                                <div className="col-xl-5 ">
                                                  <button
                                                    className="common_btn blue_active"
                                                    onClick={(e) =>
                                                      editFromFn(
                                                        e,
                                                        user.id,
                                                        user.bill_id
                                                      )
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
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ) : null}
                        </>
                      </>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
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

      {showEdit === true ? (
        <div>
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
                    onClick={editFormSubmit}
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
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Billing;
