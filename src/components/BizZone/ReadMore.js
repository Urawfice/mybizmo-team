import React, { useState, useEffect } from "react";
import newsdate from "./BizImages/newsdate.png";
import "./ReadMore.css";
import share from "./BizImages/share.png";
import axios from "../../Axios";
import Cookies from "universal-cookie";
import { Link, useHistory } from "react-router-dom";
import emailimage from "./BizImages/email.png";

const cookies = new Cookies();

const ReadMore = (props) => {
  const history = useHistory();

  const [authorName, setAuthorName] = useState("");
  const [content, setcontent] = useState("");
  const [image1, setImage1] = useState("");
  const [title, setTitle] = useState("");
  const [createdDate, setCreadtedDate] = useState("");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  console.log(window.location.href);
  const [locationUrl, setLocationUrl] = useState("");

  useEffect(() => {
    setLocationUrl(window.location.href);
    console.log(props.match.params.id);

    axios
      .get(`/users/must-read-detail/${props.match.params.id}`, {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data.author_name);
        setAuthorName(res.data.author_name);
        console.log(res.data.content);
        setcontent(res.data.content);
        console.log(res.data.image);
        setImage1(res.data.image);
        console.log(res.data.created_at);
        setCreadtedDate(res.data.created_at);

        console.log(res.data.title);
        setTitle(res.data.title);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

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

  const goBackFn = () => {
    history.goBack();
  };

  return (
    <div>
      <div className="row pt-5">
        <div
          className="col-xl-10  mx-auto  rm-nav-background"
          onClick={goBackFn}
        >
          <p className="rm-nav-title mt-2"> Back to blog</p>
        </div>
      </div>
      <div className="row  ">
        <div className="col-xl-10  mx-auto pt-5 rm-card-background">
          <div className="row ">
            <div className="col-xl-11  mx-auto ">
              <div className="row rm-white-background">
                <div className="col-xl-6 col-lg-6 col-md-12 col-12 float-xl-left">
                  <img
                    src={image1}
                    style={{ maxWidth: "100%", height: "auto" }}
                  ></img>
                  {/* <img src={image1} style={{width:'38vw',height:"45vh",objectFit:"contain",margin:"auto"}}></img> */}
                </div>

                <div className="col-xl-6 col-lg-6 col-md-12 col-12 float-xl-right p-4">
                  <p className="rm-main-title-text">{title}</p>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                      <div className="row">
                        <div className="col-xl-2">
                          <img src={newsdate}></img>
                        </div>
                        <div className="col-xl-9">
                          <p className="rm-date-title">
                            {createdDate.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-6 ">
                      <div className="row">
                        <div className="col-xl-2">
                          <img src={newsdate}></img>
                        </div>
                        <div className="col-xl-9">
                          <p className="rm-date-title">{authorName}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="rm-all-details rm-content-text">{content}</p>

                  <p
                    className="mt-5 rm-share p-1"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    share{" "}
                    <img
                      src={share}
                      style={{
                        height: "20px",
                        width: "20px",
                        marginLeft: "10px",
                      }}
                    ></img>
                  </p>
                </div>
              </div>
            </div>
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
                      style={{ height: "50px", width: "50px", margin: "auto" }}
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
                  <p className="rm-copy-link pt-2"> or copy link</p>
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
    </div>
  );
};

export default ReadMore;
