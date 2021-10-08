import React, { useState, useEffect } from "react";
import mustread from "./BizImages/mustread.png";
import "./MustRead.css";
import vertical from "./BizImages/vertical.jpg";
import pan from "./BizImages/pan.jfif";
import refe from "./BizImages/refe.jfif";
import axios from "../../Axios";
import Cookies from "universal-cookie";
import { Link, useHistory } from "react-router-dom";
import ReadMore from "./ReadMore";
import _ from "lodash";
import sharesmall from "./BizImages/sharesmall.png";
import { Button, Modal, OverlayTrigger } from "react-bootstrap";
import share from "./BizImages/share.png";
import emailimage from "./BizImages/email.png";
const cookies = new Cookies();
const MustRead = () => {
  const [mustRead, mustReadList] = useState([]);
  const [active, setActive] = useState("normalcard");

  const [pagesNo, setPages] = useState([]);

  const [currentPage, setCurretPage] = useState(1);
  const [paginatedPosts, setPaginatedPosts] = useState([]);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  console.log(window.location.href);
  const [locationUrl, setLocationUrl] = useState("");

  const pageSize = 6;

  useEffect(() => {
    axios
      .get("/users/must-read-list?page=1", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        // mustReadList(res.data.results)
        setPaginatedPosts(res.data.results);
        setPages(res.data.count);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const pageCount = pagesNo <= pageSize ? 0 : Math.ceil(pagesNo / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (page) => {
    // e.preventDefault();

    console.log(page);
    setCurretPage(page);
    console.log(page);

    axios
      .get(`/users/must-read-list?page=${page}`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setPaginatedPosts(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function updateBasic() {
    let formData = new FormData();

    formData.append("mail_to", email);
    formData.append("message", message);

    axios
      .post(
        `/users/must-read-share`,
        formData,

        {
          headers: {
            Authorization: "Token" + " " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        console.log("response from submitting the form successful", res.data);
      })
      .catch((err) => {
        console.log("ERROR  from update in form", err);
      });
  }

  return (
    <>
      {active === "normalcard" && (
        <div>
          {paginatedPosts.length > 0 ? (
            <div>
              <div className="row mt-5 mr-top-nav">
                <div className="col-xl-12 ">
                  <nav className="">
                    <ul className="pagination pagination-md justify-content-end paginationStyling ">
                      {pages.map((page) => (
                        <li
                          className={
                            page === currentPage
                              ? "new-pagination-active "
                              : "page-item"
                          }
                        >
                          <p
                            className="page-link"
                            onClick={() => pagination(page)}
                          >
                            {page}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="row  mr-main-back">
                {paginatedPosts &&
                  paginatedPosts.map((item) => (
                    <div
                      className="col-xl-3 col-lg-3 col-md-5 col-10  mx-auto mr-card-style mt-5 "
                      style={{ minWidth: "350px", maxWidth: "20vw" }}
                    >
                      <div className="row mr-row-absolute">
                        {/* <div className="col-xl-12"> */}
                        <div className="mr-share-small-background"></div>
                        <img
                          src={sharesmall}
                          className="mr-shae-small "
                          data-toggle="modal"
                          data-target="#exampleModal"
                        />
                        <img
                          src={item.image}
                          style={{
                            height: "200px",
                            width: "600px",
                            objectFit: "contain",
                          }}
                          className="mr-image-borders"
                        ></img>
                        {/* </div> */}
                        <div className="col-xl-12 ">
                          <p className="mr-card-title-text">{item.title}</p>
                        </div>
                        <div className="col-xl-12 ">
                          <div className="row">
                            <div className="col-xl-6">
                              <p className="mr-date-text">
                                {item.updated_at.slice(0, 10)}
                              </p>
                            </div>
                            <div className="col-xl-6">
                              <p className="mr-date-text">{item.author_name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 ">
                          <p className="mr-details-text">
                            {item.content.slice(0, 80)}...
                          </p>
                        </div>
                        <div className="col-xl-4 col-4 ">
                          <p
                            className="mr-read-more text-center p-2"
                            onClick={(e) => setActive("readmore")}
                          >
                            <Link
                              to={{
                                pathname: "/read-more-page/" + item.id,
                                query: { id: item.id },
                              }}
                            >
                              Read More
                            </Link>
                          </p>
                        </div>
                      </div>

                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered modal-lg"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title rm-review-title"
                                id="exampleModalLabel"
                              >
                                Share this Article
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
                                <div className="col-xl-10 ">
                                  {" "}
                                  <p className="rm-review-form-title mb-0">
                                    Share this with your Email contacts
                                  </p>
                                </div>
                                <div className="col-xl-2 ">
                                  <img
                                    src={emailimage}
                                    style={{
                                      height: "50px",
                                      width: "50px",
                                      margin: "auto",
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-xl-2  text-center">
                                  <p className="rm-to-text">To</p>
                                </div>
                                <div className="col-xl-8  ">
                                  <input
                                    type="text"
                                    className="rm-input-text"
                                    placeholder="| Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  ></input>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-xl-2  text-center"></div>
                                <div className="col-xl-8  ">
                                  <textarea
                                    className="rm-input-text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows="4"
                                    cols="50"
                                  />
                                </div>
                              </div>

                              {/* <input type="text" placeholder="Enter your email" className="rm-review-input" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <p className="rm-review-form-title mb-0 mt-3">Message</p>
        <input type="text" placeholder="Write your message" className="rm-review-input" value={message} onChange={(e)=>setMessage(e.target.value)}></input> */}
                            </div>
                            {/* <div className="modal-footer justify-content-start"> */}

                            <div className="row">
                              <div className="col-xl-2  text-center"></div>
                              <div className="col-xl-3">
                                <button
                                  type="button"
                                  className="btn btn-primary rm-review-submit-btn"
                                  onClick={updateBasic}
                                >
                                  Share
                                </button>
                              </div>
                            </div>

                            <div className="row mt-3 pb-5">
                              <div className="col-xl-2  mb-0 "></div>
                              <div className="col-xl-2  mb-0">
                                <p className="rm-copy-link pt-2">
                                  {" "}
                                  or copy link
                                </p>
                              </div>
                              <div className="col-xl-5  rm-link-styling mb-0">
                                <p className="rm-link-copy-text mb-0 pt-2 text-center">
                                  {locationUrl}
                                </p>
                              </div>
                            </div>

                            {/* <button type="button" className="btn btn-secondary rm-review-cancel-btn" data-dismiss="modal">Close</button> */}

                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
      {active === "readmore" && <ReadMore />}
    </>
  );
};

export default MustRead;
