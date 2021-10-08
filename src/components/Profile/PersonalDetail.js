import React, { useState, useEffect } from "react";
// import "../Slider/styleS.css";
import "./myProfile.scss";
import Cookies from "universal-cookie";
import axios from "../../Axios";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

const cookies = new Cookies();

export default function PersonalDetail(props) {
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
                    <div className="col-12 noMargin noPadding sml_device">
                      <span className="profile_email">Address: </span>
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
              Edit Profile
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
                    {iwarn ? (
                      <div className="overlay-iwarn">
                        Since Email id and Contact are used for login into your
                        account, you may change them from the{" "}
                        <a href="">'Login and Security'</a> Tab .
                      </div>
                    ) : (
                      <></>
                    )}
                    {profile.email ? (
                      <img
                        className="i_icon"
                        src="/Images/i-icon.svg"
                        onMouseOver={() => {
                          setiWarn(true);
                        }}
                        onMouseOut={() => {
                          setiWarn(false);
                        }}
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
                    <span className="input_text">{profile.email}</span>
                    {profile.phone_number ? (
                      <img
                        className="i_icon"
                        src="/Images/i-icon.svg"
                        onMouseOver={() => {
                          setiWarn(true);
                        }}
                        onMouseOut={() => {
                          setiWarn(false);
                        }}
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
                  <span className="profile_gr">Address Line 1</span>
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
              style={{ color: "#03CBC9" }}
            >
              Select your Interests
            </span>
          </div>
          <div className="col-6 noPadding noMargin text-right">
            <button
              className="blue_active edit_common_btn"
              onClick={updateDetails}
            >
              Submit
            </button>
          </div>
        </div>

        <div
          style={{ backgroundColor: "#F6ECFF" }}
          className="row noMargin noPadding interest_val_sec"
        >
          {categ &&
            categ.map((item) => (
              <>
                <div className="row noPadding noMargin each_interest_type_row">
                  <div className="col-sm-11 col-9 noPadding noMargin">
                    {checkEle(interests, item.sub_categories) ? (
                      <img src="/Images/checked.svg" className="btn_check" />
                    ) : (
                      <img src="/Images/uncheck.svg" className="btn_check" />
                    )}
                    <span className="interest_name">{item.name}</span>
                  </div>
                  <div className="col-sm-1 col-3 noPadding noMargin text-right">
                    <img
                      className="down_arrow_img"
                      src="/Images/downarr.svg"
                      onClick={() => downClick(item.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="row noPadding noMargin">
                    <div className="col-12 noPadding noMargin each_input">
                      {activecatId === item.id &&
                        item.sub_categories.map((subCat) => (
                          <>
                            {selectedSubCateg.includes(subCat.name) ? (
                              <button
                                onClick={() => {
                                  let id = activecatId;
                                  setActiveCatId(-1);
                                  clickSubCateg(subCat.name, id);
                                }}
                                className="profile_btn pink_active margin_right_btn"
                              >
                                {subCat.name}
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  let id = activecatId;
                                  setActiveCatId(-1);
                                  clickSubCateg(subCat.name, id);
                                }}
                                className="profile_btn pink_not_active margin_right_btn"
                              >
                                {subCat.name}
                              </button>
                            )}
                          </>
                        ))}
                    </div>
                  </div>
                </div>
                {/* <hr style={{marginLeft:"-1%",marginRight:"-1%",height:"0px"}} className="p-0" ></hr> */}
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
