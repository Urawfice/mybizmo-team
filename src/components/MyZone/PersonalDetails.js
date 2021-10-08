import React, { useState, useEffect } from "react";
// import "../Slider/styleS.css";
import "./myProfile.scss";
import Cookies from "universal-cookie";
import axios from "../../Axios";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const cookies = new Cookies();

export default function PersonalDetails(props) {
  const [items, setItems] = useState([]);
  const [profile, setProfile] = useState();
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

  useEffect(() => {
    axios
      .get("/users/profile-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        // params: {
        //   package_type: 'a'
        // },
      })
      .then((res) => {
        console.log(res);
        setProfile(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setcontact(res.data.phone_number);
        setDob(res.data.dob);
        setGender(res.data.gender);
        setAddress(res.data.address);
        setCity(res.data.city);
        setState(res.data.state);
        setPincode(res.data.pin);
        setCountry(res.data.country);
        setSelectedSubCateg(res.data.interest.split(","));
        setSelectedImagePreview(res.data.image);

        setInterests(res.data.interest);
        console.log(interests);
      })
      .catch((err) => {
        console.log("err", err);
      });

    axios
      .get("/users/categories", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);

        setCateg(res.data);
        console.log(categ);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

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

  const updateProfile = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    let img = URL.createObjectURL(e.target.files[0]);
    setSelectedImagePreview(img);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    axios
      .put(`users/profile-update`, formData, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Image updated successfully", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Some error occured", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
      });
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
      {profile && !isEdit ? (
        <div className="row noMargin noPadding card profile_card">
          <div className="row noMargin noPadding">
            <div className="col-12 noPadding text-right">
              <img
                className="edit_img"
                src="/Images/editP.svg"
                onClick={() => setIsEdit(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="row noMargin noPadding">
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-5 text-center">
                <div className="profile_img_div">
                  <img className="profile_img" src={selectedImagePreview} />
                </div>
                <div class="col-12 noPadding noMargin text-center pro_pic_div">
                  <button className="blue_active profile_btn">
                    Change Profile Photo
                  </button>
                  <input
                    type="file"
                    onChange={updateProfile}
                    class="upload profile_img_upload"
                  />
                </div>
              </div>

              <div className="col-xl-9 col-lg-9 col-md-8 col-sm-8 col-7 noPadding">
                <div className="row noPadding noMargin right_sec_div">
                  <div className="row noMargin noPadding text-left">
                    <span className="user_name_span noPadding">{name}</span>
                  </div>
                  <div className="row noMargin noPadding address_row">
                    <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 noPadding sml_device">
                      <span className="profile_email">Email id: </span>
                      <span className="profile_email_id">{profile.email}</span>
                      {profile.mail_verify ? (
                        <img
                          className="green_tick"
                          style={{ paddingLeft: "10px" }}
                          src="/Images/gTick.svg"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 noPadding sml_device">
                      <span className="profile_email">Contact: </span>
                      <span className="profile_email_id">
                        {profile.phone_number}
                      </span>
                      {profile.phone_verify ? (
                        <img
                          className="green_tick"
                          style={{ paddingLeft: "10px" }}
                          src="/Images/gTick.svg"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="row noMargin noPadding address_row">
                    <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 noPadding sml_device">
                      <span className="profile_email">Date of Birth: </span>
                      <span className="profile_email_id">{profile.dob}</span>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 noPadding sml_device">
                      <span className="profile_email">Gender: </span>
                      <span className="profile_email_id">{profile.gender}</span>
                    </div>
                  </div>
                  <div className="row noMargin noPadding address_row">
                    <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 noPadding sml_device">
                      <span className="profile_email">Employee ID: </span>
                      <span className="profile_email_id">{profile.dob}</span>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 noPadding sml_device">
                      <span className="profile_email">Role: </span>
                      <span className="profile_email_id">{profile.gender}</span>
                    </div>
                  </div>
                  
                  <div className="row noMargin noPadding address_row">
                    <div className="col-12 noMargin noPadding sml_device">
                      <span className="profile_email">Personal Address: </span>
                      <span className="profile_email_id">
                        {profile.address} {profile.city} {profile.state}{" "}
                        {profile.pincode}
                      </span>
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

      {profile && isEdit ? (
        <div className="row noMargin noPadding card profile_card">
          <div className="row noMargin noPadding">
            <span
              className="edit_profile_head noPadding"
              style={{ color: "#03CBC9" }}
            >
              Edit Personal Profile
            </span>
          </div>
          <div className="row noMargin noPadding">
            <div className="edit_sec">
              <div className="row noMargin noPadding">
                <div className="col-sm-6 col-12 noPadding each_input">
                  <span className="profile_gr">Name</span>
                  <input
                    className="border profile_input form-control"
                    style={{ width: "80%" }}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="col-sm-6 col-12 noPadding each_input">
                  <span className="profile_gr">Email id</span>
                  {/* <input className='border profile_input form-control' style={{ width: "80%"}} value={profile.email} disabled={true}></input> */}
                  <div>
                    <span className="input_text">{profile.email}</span>                    
                    {profile.email ? (
                      <img data-toggle="tooltip" data-placement="top" title="Since Email id and Contact are used for login into your
                        account, you may change them from the Login and Security Tab"
                        className="i_icon"
                        src="/Images/i-icon.svg"
                        style={{ marginLeft: "10px" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div className="row  noMargin noPadding">
                <div className="col-sm-6 col-12 noMargin noPadding each_input">
                  <span className="profile_gr">Date of Birth</span>
                  <input
                    type="date"
                    className="border profile_input form-control"
                    style={{ width: "80%" }}
                    value={dob}
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                  />
                </div>
                <div className="col-sm-6 col-12 noMargin noPadding each_input">
                  <span className="profile_gr"> Contact</span>
                  <div>
                    <span className="input_text">{profile.phone_number}</span>
                    {profile.phone_number ? (
                      <img data-toggle="tooltip" data-placement="top" title="Since Email id and Contact are used for login into your
                      account, you may change them from the Login and Security Tab"
                        className="i_icon"
                        src="/Images/i-icon.svg"
                        style={{ marginLeft: "10px" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div className="row noMargin noPadding">
                <div className="col-sm-6 col-12 noMargin noPadding each_input">
                  <span className="profile_gr">Personal Address</span>
                  <input
                    className="border profile_input form-control"
                    style={{ width: "80%" }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
                <div className="col-sm-6 col-12 noMargin noPadding each_input">
                  <span className="profile_gr">Gender</span>
                  <input
                    list="genderlist"
                    className="border profile_input form-control"
                    style={{ width: "80%" }}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  ></input>
                  <datalist id="genderlist">
                    <option value="Male" />
                    <option value="Female" />
                  </datalist>
                </div>
              </div>

              <div className="row noMargin noPadding">
                <div className="col-sm-6 col-12 noMargin noPadding each_input">
                  <span className="profile_gr">City</span>
                  <input
                    className="border profile_input form-control"
                    style={{ width: "80%" }}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  ></input>
                </div>
                <div className="col-sm-6 col-12 noMargin noPadding each_input">
                  <span className="profile_gr">State</span>
                  <input
                    className="border profile_input form-control"
                    style={{ width: "80%" }}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="row noMargin noPadding">
                <div className="col-sm-6 col-12 noMargin noPadding each_input">
                  <span className="profile_gr">Country</span>
                  <input
                    className="border profile_input form-control"
                    style={{ width: "80%" }}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  ></input>
                </div>
                <div className="col-sm-6 col-12 noMargin noPadding each_input">
                  <span className="profile_gr">Pin Code</span>
                  <input
                    className="border profile_input form-control"
                    style={{ width: "80%" }}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="row noMargin noPadding">
                <div className="col-12 noMargin noPadding each_input">
                  <button
                    className="blue_active edit_common_btn"
                    onClick={updateDetails}
                  >
                    Update
                  </button>
                  <button
                    className="edit_cancel_btn edit_common_btn margin_left_btn"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

    <div className="row noMargin noPadding card profile_card">
        <div className="row noMargin noPadding">
          <div className="col-6 noPadding noMargin text-left">
            <span
              className="select_interest_head noPadding"
              style={{ color: "#03CBC9", fontSize:"1.4vw", marginLeft:"0.6vw" }}
            >
              Public Profile
            </span>
          </div>
         
          <div className="col-6 noPadding text-right">
              <img
                className="edit_img"
                src="/Images/editP.svg"
                onClick={() => setIsPublicProfileEdit(true)}
                style={{ cursor: "pointer" }}
              />
            </div>            
        </div>
        <div>
            <br></br>
            <div>
                <span className="public-profile-head">Bio: </span>
                <span className="public-profile-content">Ram was a track athelete for over 10 years. Currently a founder of Yoga Unidos, he is a 500 hr certified yoga teacher who apart from conducting classes online, also takes private and group classes catered to specific needs on all levels</span>
            </div>
            <br></br>
            <div>
                <span className="public-profile-head">Qualifications: </span>
                <span className="public-profile-content">B.sc in yoga sciences; 200 hr classical ashtanga yoga teacher training</span>
            </div>
            <br></br>
            <div>
                <span className="public-profile-head">Wellness Categories: </span>
                <span className="public-profile-content">Yoga, Health & Wellness, Mind & Body</span>
            </div>        
            <br></br>
            <div>
                <span className="public-profile-head">Wellness Sub-categories: </span>
                <span className="public-profile-content">Ashtanga Yoga, Hatha Yoga, Meditation</span>
            </div>
            <br></br>
            <div>
                <span className="public-profile-head">Languages: </span>
                <span className="public-profile-content">English, Hindi, Nagamese, Mizo Tawng</span>
            </div>
        </div>
    </div>


    <div className="row noMargin noPadding card profile_card">
        <div className="row noMargin noPadding">
          <div className="col-6 noPadding noMargin text-left">
            <span
              className="select_interest_head noPadding"
              style={{ color: "#03CBC9", fontSize:"1.4vw", marginLeft:"0.6vw" }}
            >
              Connect a Social Network
            </span>
          </div>                    
        </div>
        <br></br>
        <div className="row noMargin noPadding">
            <p style={{color:"#98989c", fontSize:"1vw", fontWeight:"700"}}>These social media profiles will be visible publicly to other users under your public profile.</p>
            <p style={{color:"#98989c", fontSize:"1vw", marginTop:"-1.5vw", fontWeight:"700"}}>Click the buttons below to begin connecting your accounts.</p>
        </div>
    </div>

    </div>
  );
}
