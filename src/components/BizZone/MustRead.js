import React, { useState, useEffect } from "react";
import mustread from "./BizImages/mustread.png";
import "./mustRead.scss";
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
import newsdate from "./BizImages/newsdate.png";
import readAuthor from "./BizImages/read_author.png";
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
      <div className="must_read_main">
        {active === "normalcard" && (
          <div>
            {paginatedPosts.length > 0 ? (
              <div className="row noPadding news_sec_div">
                <div className="row noPadding noMargin">
                  <div className="col-12 sectionPinkHead">
                    <nav className="">
                      <ul className="pagination justify-content-end noMargin noPadding">
                        {pages.map((page) => (
                          <li
                            className={
                              page === currentPage
                                ? "new-pagination-active alignSelfCenter"
                                : "page-item alignSelfCenter"
                            }
                          >
                            <span
                              className="page_link"
                              onClick={() => pagination(page)}
                            >
                              {page}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                  <div className="col-12 noMargin sectionBody">
                    <div className="row noMargin ">
                      {paginatedPosts &&
                        paginatedPosts.map((item) => (
                          <div className="col-xl-4 col-lg-4 col-md-4 col-6 each_read_card_div noMargin">
                            <div className="card read_card">
                              {/* <div className="col-xl-12"> */}
                              <div className="read_card_div">
                                <img
                                  src={item.image}
                                  className="read_img"
                                ></img>
                                <span className="share_absolute_span">
                                  <img
                                    src={sharesmall}
                                    className="share_absolute_img"
                                    data-bs-toggle="modal"
                                    data-bs-target={"#exampleModal" + item.id}
                                  />
                                </span>
                              </div>

                              {/* </div> */}
                              <div className="row noMargin read_card_body">
                                <div className="col-12 noPadding noMargin card_title_div">
                                  <span className="card_title">
                                    {item.title}
                                  </span>
                                </div>
                                <div className="col-12 noPadding noMargin">
                                  <div className="row noMargin">
                                    <div className="col-6 noPadding noMargin">
                                      <span className="news_date_span">
                                        <img
                                          className="news_date_img"
                                          src={newsdate}
                                        ></img>
                                      </span>
                                      <span className="created_date">
                                        {item.updated_at.slice(0, 10)}
                                      </span>
                                    </div>
                                    <div className="col-6 noPadding noMargin">
                                      <span className="news_date_span">
                                        <img
                                          className="news_date_img"
                                          src={readAuthor}
                                        ></img>
                                      </span>
                                      <span className="created_date">
                                        {item.author_name}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 noPadding noMargin card_body_text_div">
                                  <span className="card_body_text">
                                    {item.content.length > 80
                                      ? item.content.slice(0, 80) + "..."
                                      : item.content}
                                  </span>
                                </div>
                                <div className="col-12 noPadding noMargin card_body_btn_div">
                                  <button
                                    className="blue_active common_btn"
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
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div
                              className="modal fade"
                              id={"exampleModal" + item.id}
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
                                  <div className="modal-header popupHead">
                                    <span
                                      className="modal-title biz_review_title align_self_center"
                                      id="exampleModalLabel"
                                    >
                                      Share this Article
                                    </span>
                                    <button
                                      type="button"
                                      className="btn-close align_self_center"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body review_modal_body">
                                    <div className="row noMargin">
                                      <div className="col-10 noPadding">
                                        <div className="">
                                          <span className="share_this_head">
                                            Share this with your Email contacts
                                          </span>
                                        </div>
                                        <div className="row noMargin normal_margin_top">
                                          <div className="col-2 noPadding text-center">
                                            <span className="normal_font">
                                              To
                                            </span>
                                          </div>
                                          <div className="col-10 noPadding ">
                                            <input
                                              type="text"
                                              className="must_read_input form-control"
                                              placeholder="Enter your email"
                                              value={email}
                                              onChange={(e) =>
                                                setEmail(e.target.value)
                                              }
                                            ></input>
                                          </div>
                                        </div>
                                        <div className="row noMargin normal_margin_top">
                                          <div className="col-2 noPadding text-center"></div>
                                          <div className="col-10 noPadding">
                                            <textarea
                                              className="must_read_input form-control must_read_area"
                                              value={message}
                                              rows="4"
                                              onChange={(e) =>
                                                setMessage(e.target.value)
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="row noMargin normal_margin_top">
                                          <div className="col-2 text-center noPadding"></div>
                                          <div className="col-3 noPadding">
                                            <button
                                              type="button"
                                              className="blue_active common_btn"
                                              onClick={updateBasic}
                                              style={{ width: "auto" }}
                                            >
                                              Share
                                            </button>
                                          </div>
                                        </div>
                                        <div className="row noMargin normal_margin_top">
                                          <div className="col-2 noPadding alignSelfCenter"></div>
                                          <div className="col-3 noPadding alignSelfCenter">
                                            <span className="normal_font">
                                              or copy link
                                            </span>
                                          </div>
                                          <div className="col-7 noPadding alignSelfCenter">
                                            <span className="must_read_input text-center form-control copy_url_span">
                                              {locationUrl}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-2 noPadding text-center">
                                        <img
                                          className="email_img"
                                          src={emailimage}
                                        />
                                      </div>
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
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      {active === "readmore" && <ReadMore />}
    </>
  );
};

export default MustRead;
