import React, { useState, useEffect } from "react";
import "./contactUs.scss";
import axios from "../../Axios";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { Phone } from "@material-ui/icons";
import phone from "./BizImages/phone.png";
import location from "./BizImages/location.png";
import messages from "./BizImages/message.png";
import fbimg from "./BizImages/biz_fb.png";
import igimg from "./BizImages/biz_insta.png";
import twitterimg from "./BizImages/biz_twitter.png";
import linkedinimg from "./BizImages/biz_linkedin.png";

const cookies = new Cookies();

const ContactUsPage = () => {
  const history = useHistory();

  // const[name,setName]=useState('')
  // const[contact,setContact]=useState('')
  // const[email,setEmail]=useState('')
  const [message, setMessage] = useState("");

  const [ofcAddress, setOfcAddress] = useState("");
  const [ofcEmail, setOfcEmail] = useState("");
  const [ofcPhone, setOfcPhone] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [fb, setFb] = useState("");
  const [ig, setIg] = useState("");

  useEffect(() => {
    axios
      .get("/users/find-us", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setOfcAddress(res.data.ofc_address);
        console.log(res.data.ofc_email);
        setOfcEmail(res.data.ofc_email);

        console.log(res.data.ofc_phone);
        setOfcPhone(res.data.ofc_phone);

        console.log(res.data.ofc_instagram);
        setIg(res.data.ofc_instagram);

        console.log(res.data.ofc_linkedin);
        setLinkedin(res.data.ofc_linkedin);

        console.log(res.data.ofc_twitter);
        setTwitter(res.data.ofc_twitter);

        console.log(res.data.ofc_fb);
        setFb(res.data.ofc_fb);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  function updateBasic() {
    let formData = new FormData();

    //   formData.append("full_name", name);
    //   formData.append("phone_number", contact);
    //   formData.append("email", email);
    formData.append("query_text", message);

    axios
      .post(
        `/users/public-query-create`,
        formData,

        {
          headers: {
            Authorization: "Token" + " " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        console.log("response from submitting the form successful", res.data);
        // location.reload();
      })
      .catch((err) => {
        console.log("ERROR  from update in form", err);
      });
  }

  return (
    <div className="contact_us_main">
      <div className="row news_sec_div noMargin">
        <div className="col-12 sectionPinkHead">
          Get in touch!
        </div>
        <div className="col-12 sectionBody">
          <div className="sectionBodyHead" style={{fontWeight: "600"}}>
            Any question or feedback?
          </div>
          <div className="sectionBodyText small_margin_top">
            Just write us a message
          </div>
          <div className="col-12 noPadding noMargin">
            <div className="cu-form-name-title small_margin_top">Message</div>
            <textarea className="form-control write_here_area" placeholder="write your message here..." rows="8" value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button className="blue_active common_btn small_margin_top" onClick={updateBasic}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="row news_sec_div noMargin last_sec">
        <div className="col-12 sectionPinkHead">
          Find us Here
        </div>
        <div className="col-12 sectionBody">
          <div className="row noMargin noPadding small_margin_top">
            <div className="col-4 noPadding noMargin text-center">
              <img className="cu-inage-style" src={phone}></img>
              <div className="text-center small_margin_top cu-find-us-text">Phone</div>
              <div className="text-center sectionBodyText">{ofcPhone}</div>
            </div>
            <div className="col-4 noPadding noMargin text-center">
              <img className="cu-inage-style" src={location}></img>
              <div className="text-center small_margin_top cu-find-us-text">Address</div>
              <div className="text-center sectionBodyText">{ofcAddress}</div>
            </div>
            <div className="col-4 noPadding noMargin text-center">
              <img className="cu-inage-style" src={messages}></img>
              <div className="text-center small_margin_top cu-find-us-text">Email</div>
              <div className="text-center sectionBodyText">{ofcEmail}</div>
            </div>
          </div>

          <div className="row noMargin noPadding section_marign_top">
            <div className="col-12 noMargin noPadding">
              <div className="sectionBodyHead text-center" style={{fontWeight: "600"}}>Connect with us</div>

              <div className="col-10 ml-auto noMargin noPadding">
                <div className="row noMargin noPadding">
                  <div className="col-3 noMargin noPadding text-center">
                    <a href={ig} target="_blank">
                      <div className="social_img_div">
                        <img src={igimg} className="social_img"></img>
                      </div>
                    </a>
                  </div>
                  <div className="col-3 noMargin noPadding text-center">
                    <a href={twitter} target="_blank">
                      <div className="social_img_div">
                        <img src={twitterimg} className="social_img"></img>
                      </div>
                    </a>
                  </div>

                  <div className="col-3 noMargin noPadding text-center">
                    <a href={fb} target="_blank">
                      <div className="social_img_div">
                        <img src={fbimg} className="social_img"></img>
                      </div>
                    </a>
                  </div>

                  <div className="col-3 noMargin noPadding text-center">
                    <a href={linkedin} target="_blank">
                      <div className="social_img_div">
                        <img className="social_img" src={linkedinimg}></img>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUsPage;
