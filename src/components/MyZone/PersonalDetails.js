import React, { useState, useEffect } from "react";
// import "../Slider/styleS.css";
import "./myProfile.scss";
import Cookies from "universal-cookie";
import axios from "../../Axios";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import PersonalProfile from "./personalDetail/PersonalProfile";
import PublicProfile from "./personalDetail/PublicProfile";
import Social from "./personalDetail/Social";

const cookies = new Cookies();

export default function PersonalDetails(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setcontact] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isPublicProfileEdit, setIsPublicProfileEdit] = useState(false);
  const [categ, setCateg] = useState();
  const [activecatId, setActiveCatId] = useState(-1);
  const [curSubCateg, setCurrSubCateg] = useState("");
  const [selectedSubCateg, setSelectedSubCateg] = useState([]);
  const [country, setCountry] = useState();
  const [interests, setInterests] = useState();
  const [selectedImagePreview, setSelectedImagePreview] = useState("");
  const [iwarn, setiWarn] = useState(false);
  const [activeHead, setActiveHead] = useState("personal-profile");

  const downClick = (id) => {
    if (activecatId === id) {
      setActiveCatId(-1);
    } else {
      setActiveCatId(id);
    }
  };

  const checkEle = (arr, check) => {
    var found = false;
    if (!arr) {
      return false;
    }
    for (var i = 0; i < check.length; i++) {
      if (arr.indexOf(check[i].name) > -1) {
        found = true;
        break;
      }
    }
    return found;
  };

  const clickSubCateg = (e, id) => {
    console.log(e);
    let ta = selectedSubCateg;

    if (selectedSubCateg.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    } else {
      if (e) ta.push(e);
    }
    setSelectedSubCateg(ta);
    console.log(selectedSubCateg);

    setTimeout(() => {
      setActiveCatId(id);
    }, 0.0001);

    return false;
  };

  const updateDetails = (e) => {
    e.preventDefault();
    console.log(state);
    let intr = "";
    for (let i = 0; i < selectedSubCateg.length; i++) {
      if (selectedSubCateg[i]) intr = intr + selectedSubCateg[i] + ",";
    }
    axios
      .put(
        `users/profile-update`,
        {
          dob: dob,
          gender: gender,
          name: name,
          address: address,
          city: city,
          state: state,
          country: country,
          pin: pincode,
          interest: intr,
          email: email,
          phone_number: contact,
        },
        {
          headers: {
            Authorization: "Token " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Successfully updated", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Some error occured", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
      });
  };

  let liveIn;

  return (
    <div>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noMargin noPadding text-left button_margin_top">
          {activeHead === "personal-profile" ? (
            <button
              onClick={() => setActiveHead("personal-profile")}
              className="common_btn blue_active"
            >
              Personal Profile
            </button>
          ) : (
            <button
              onClick={() => setActiveHead("personal-profile")}
              className="common_btn not_active_btn"
            >
              Personal Profile
            </button>
          )}

          {activeHead === "public-profile" ? (
            <button
              onClick={() => setActiveHead("public-profile")}
              className="common_btn blue_active margin_left_btn"
            >
              Public Profile
            </button>
          ) : (
            <button
              onClick={() => setActiveHead("public-profile")}
              className="common_btn not_active_btn margin_left_btn"
            >
              Public Profile
            </button>
          )}

          {activeHead === "social" ? (
            <button
              onClick={() => setActiveHead("social")}
              className="common_btn blue_active margin_left_btn"
            >
              Social Network
            </button>
          ) : (
            <button
              onClick={() => setActiveHead("social")}
              className="common_btn not_active_btn margin_left_btn"
            >
              Social Network
            </button>
          )}
      </div>

      {activeHead == "personal-profile" ? <PersonalProfile /> : <></>}
      {activeHead == "public-profile" ? <PublicProfile /> : <></>}
      {activeHead == "social" ? <Social /> : <></>}

    </div>
  );
}
