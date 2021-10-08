import React, { useState, useEffect } from "react";
import "./JoinUsPage.css";
import ss from "./BizImages/ss.png";
import axios from "../../Axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const JoinUsPage = () => {
  const [resume, setResume] = useState("");
  console.log(resume);

  const resumeFn = (e) => {
    setResume(e.target.files[0]);
  };

  // useEffect(() => {

  //   axios.get('/users/join-us', {
  //     headers: {
  //       'Authorization': 'Token' + ' ' + cookies.get('token')
  //     },

  //   })
  //     .then(res => {
  // console.log(res.data)
  //     })
  //     .catch(err => {
  //       console.log("err", err);
  //     })
  // }, [])

  function updateBasic() {
    let formData = new FormData();

    formData.append("resume", resume);

    axios
      .post(
        `/users/join-us`,
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
    <div>
      {/* <p>Join us page</p> */}
      <div className="row mt-5 ju-nav-back">
        <div className="col-xxl-12  ">
          <p className="ju-joinus-text ml-5 mt-2">Join Our Team</p>
        </div>
      </div>

      <div className="row ju-main-back ">
        <div className="col-xxl-6  p-3">
          <p className="ju-hiring-text ml-5 mt-3">We're Hiring</p>
          <p className="ju-bottom-text ml-5">
            Join us on our quest to lorem ipsum dolor sit amet
          </p>

          <div className="row">
            <div className="col-xl-4 ">
              {" "}
              <label
                className="ju-resume-btn p-2 mt-5 ml-5 mb-5"
                for="file-upload"
              >
                Share your resume
              </label>
            </div>
            <input type="file" id="file-upload" onChange={resumeFn}></input>
            {resume === "" ? (
              <></>
            ) : (
              <div className="col-xl-4 ">
                {" "}
                <p
                  className="ju-resume-btn p-2 mt-5 ml-5 mb-5"
                  onClick={updateBasic}
                >
                  Send
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="col-xxl-6  p-3 mt-2">
          <img
            src={ss}
            style={{
              height: "200px",
              width: "300px",
              display: "flex",
              margin: "auto",
            }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;
