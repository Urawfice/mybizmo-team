import React, { useState, useEffect } from "react";
import "./joinUs.scss";
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
    <div className="join_us_main">
      {/* <p>Join us page</p> */}
      <div className="row news_sec_div noMargin">
        <div className="col-12 sectionPinkHead">
          Join Our Team
        </div>

        <div className="col-12 sectionBody">
          <div className="row noMargin noPadding">
            <div className="col-8 noPadding">
              <div className="sectionBodyHead" style={{ fontWeight: "600" }}>
                We're Hiring
              </div>
              <div className="sectionBodyText small_margin_top">
                Join us on our quest to lorem ipsum dolor sit amet
              </div>
              <div className="col-12 noPadding">
                <div className="row noMargin noPadding resume_upload_row">
                  <span className="blue_active common_btn" style={{ "width": "auto" }}>
                    <label for="file-upload" style={{ "marginBottom": "0" }}>
                      Share your resume
                    </label>
                  </span>
                  <input type="file" id="file-upload" className="file_input_upload" onChange={resumeFn}></input>
                  {resume === "" ? (
                    <></>
                  ) : (
                    <button className="blue_active common_btn left_margin" onClick={updateBasic}>
                      Send
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-4 noPadding" style={{ "display": "grid" }}>
              <img className="mike_img" src={ss} ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;
