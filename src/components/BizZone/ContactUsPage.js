import React, { useState, useEffect } from "react";
import "./ContactUsPage.css";
import axios from "../../Axios";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { Phone } from "@material-ui/icons";
import phone from "./BizImages/phone.png";
import location from "./BizImages/location.png";
import messages from "./BizImages/message.png";
import fbimg from "./BizImages/fb.png";
import igimg from "./BizImages/ig.png";
import twitterimg from "./BizImages/twitter.png";
import linkedinimg from "./BizImages/linkedin.png";

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
    <div>
      <div className="row  mt-5">
        <div className="col-xl-12  Cu-nav-background">
          <p className="cu-nav-title pt-2 pl-3 pb-2 mb-0"> Get in touch!</p>
        </div>
      </div>
      <div className="row  cu-form-background p-3">
        <div className="col-xl-12 ">
          <p className="cu-form-title"> Any question or feedback?</p>
          <p className="cu-form-subtitle"> Just write us a message</p>

          <div className="row ">
            {/* <div className='col-xxl-5  mr-5'>
    
   <div className='row'>
   <div className="col-xl-12 ">
  <p className="cu-form-name-title mb-0">Name</p>
  <input type="text" className="cu-form-input p-1" value={name} onChange={(e)=>setName(e.target.value)} ></input>
   </div>
   <div className="col-xl-12 mt-2">
   <p className="cu-form-name-title mb-0">Contact</p>
  <input type="text"  className="cu-form-input p-1" value={contact} onChange={(e)=>setContact(e.target.value)} ></input>
   </div>

   <div className="col-xl-12 mt-2">
   <p className="cu-form-name-title mb-0">Email</p>
  <input type="email"  className="cu-form-input p-1" value={email} onChange={(e)=>setEmail(e.target.value)} ></input>
   </div>

    </div>
    
    
    </div> */}
            <div className="col-xxl-5  ">
              <p className="cu-form-name-title mb-0">Message</p>
              <textarea
                className="cu-form-input"
                placeholder="write your message here..."
                rows="8"
                cols="50"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>

          <button className="cu-submit-btn mt-5 mb-5" onClick={updateBasic}>
            Submit
          </button>
        </div>
      </div>

      <div className="row  Cu-nav-background mt-5">
        <div className="col-xl-12 ">
          <p className="cu-nav-title pt-2 pl-3 pb-2 mb-1"> Find us Here</p>
        </div>
      </div>

      {/* <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:1}}
          
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div> */}

      <div className="row  cu-form-background pt-5">
        <div className="col-xl-3  mx-auto">
          <img className="cu-inage-style" src={phone}></img>
          <p className="text-center mt-3 cu-find-us-text">Phone</p>
          <p className="text-center cu-find-us-info-text">{ofcPhone}</p>
        </div>
        <div className="col-xl-3  mx-auto">
          <img className="cu-inage-style" src={location}></img>
          <p className="text-center mt-3 cu-find-us-text">Address</p>
          <p className="text-center cu-find-us-info-text">{ofcAddress}</p>
        </div>
        <div className="col-xl-3  mx-auto">
          <img
            className="cu-inage-style"
            style={{ width: "100px", height: "80px" }}
            src={messages}
          ></img>
          <p className="text-center mt-4 cu-find-us-text">Email</p>
          <p className="text-center cu-find-us-info-text">{ofcEmail}</p>
        </div>
      </div>

      <div className="row  cu-form-background">
        <div className="col-xxl-6  mx-auto mt-5">
          <p className="text-center cu-connect-withus-text">Connect with us</p>

          <div className="row mt-5 pb-5">
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-6 mx-auto ">
              <a href={ig} target="_blank">
                <img src={igimg} className="cu-inage-style"></img>
              </a>
            </div>
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-6 mx-auto ">
              <a href={twitter} target="_blank">
                <img src={twitterimg} className="cu-inage-style"></img>
              </a>
            </div>

            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-6 mx-auto ">
              <a href={fb} target="_blank">
                <img src={fbimg} className="cu-inage-style"></img>
              </a>
            </div>

            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-6 mx-auto ">
              <a href={linkedin} target="_blank">
                <img className="cu-inage-style" src={linkedinimg}></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
