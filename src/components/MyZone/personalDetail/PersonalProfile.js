import React, {useState, useEffect} from 'react';
import Cookies from "universal-cookie";
import axios from "../../../Axios";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

const cookies = new Cookies();
toast.configure();

function PersonalProfile(props) {
    const [data, setData] = useState({
        name:'',
        address:'',
        country:'',
        city:'',
        dob:'',
        email:'',
        gender:'',
        id:'',
        image:'',
        interest:'',
        mail_verify:'',
        phone_number:'',
        phone_verify:'',
        pin:'',
        state:'',
        status:'',
    })
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        axios.get("/masters/profile-list", {
            headers: {
                Authorization: "Token" + " " + cookies.get("token"),
            },
        })
        .then(res => {
            setData({
                name:res.data.name,
                city:res.data.city,
                state:res.data.state,
                country:res.data.country,
                address:res.data.address,
                dob:res.data.dob,
                email:res.data.email,
                gender:res.data.gender,
                id:res.data.id,
                image:res.data.image,
                interest:res.data.interest,
                mail_verify:res.data.mail_verify,
                phone_number:res.data.phone_number,
                phone_verify:res.data.phone_verify,
                pin:res.data.pin,
                status:res.data.status,
            });
        })
        .catch(err => {
            console.log("Some server error");
        })
    },[])

    const updateProfile = (e) => {
        e.preventDefault();
        console.log(data);
        const updatedData = {
            "name":data.name,
            "gender":data.gender,
            "address":data.address,
            "phone_number":data.phone_number,
            "country":data.country,   
            "city":data.city,
            "name":data.name,
            "dob":data.dob,
        }
        axios.put(`users/profile-update`, updatedData, {
            headers: {
              Authorization: "Token " + cookies.get("token"),
            },
        })
        .then((res) => {
            console.log(res);
            toast.success("Profile updated successfully", {
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

    return (
        <div>                
        {data && !isEdit ? (
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
                    <img className="profile_img" src={data.image} />
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
                        <span className="user_name_span noPadding">{data.name}</span>
                    </div>
                    <div className="row noMargin noPadding address_row">
                        <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 noPadding sml_device">
                        <span className="profile_email">Email id: </span>
                        <span className="profile_email_id">{data.email}</span>
                        {data.mail_verify ? (
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
                            {data.phone_number}
                        </span>
                        {data.phone_verify ? (
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
                        <span className="profile_email_id">{data.dob}</span>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 noPadding sml_device">
                        <span className="profile_email">Gender: </span>
                        <span className="profile_email_id">{data.gender}</span>
                        </div>
                    </div>
                    <div className="row noMargin noPadding address_row">
                        <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 noPadding sml_device">
                        <span className="profile_email">Employee ID: </span>
                        <span className="profile_email_id">{data.id}</span>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 noPadding sml_device">
                        <span className="profile_email">Role: </span>
                        <span className="profile_email_id">{data.gender}</span>
                        </div>
                    </div>
                    
                    <div className="row noMargin noPadding address_row">
                        <div className="col-12 noMargin noPadding sml_device">
                        <span className="profile_email">Personal Address: </span>
                        <span className="profile_email_id">
                            {data.address}, {data.city}, {data.state}, {data.country}{" "}
                            {data.pin}
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

        {data && isEdit ? (
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
                        value={data.name}
                        onChange={(e) => setData({...data, name: e.target.value})}
                    ></input>
                    </div>
                    <div className="col-sm-6 col-12 noPadding each_input">
                    <span className="profile_gr">Email id</span>
                    <div>
                        <span className="input_text">{data.email}</span>                    
                        {data.email ? (
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
                        value={data.dob}
                        onChange={(e) => setData({...data, dob: e.target.value})}
                    />
                    </div>
                    <div className="col-sm-6 col-12 noMargin noPadding each_input">
                    <span className="profile_gr">Contact</span>
                    <div>
                        <span className="input_text">{data.phone_number}</span>
                        {data.phone_number ? (
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
                    <div className="col mt-3">
                        <div className="mb-2 jb-ps-pr">Gender</div>
                        <input
                            onChange={(e) => setData({...data, gender: e.target.value})}
                            className="inpt-add-expr"
                            type="radio"
                            value="male"
                            name="fav_language" 
                            checked={data.gender=="male"}
                            style={{ marginRight: "15px" }}
                        />
                        <label for="update_gender">Male</label>
                        <input
                            onChange={(e) => setData({...data, gender: e.target.value})}
                            className="inpt-add-expr"
                            type="radio"
                            value="female"
                            checked={data.gender=="female"}
                            name="fav_language" 
                            style={{ marginRight: "15px", marginLeft: "20px" }}
                        />
                        <label for="update_gender">Female</label>
                        <input
                            onChange={(e) => setData({...data, gender: e.target.value})}
                            className="inpt-add-expr"
                            type="radio"
                            value=""
                            checked={data.gender==""}
                            name="fav_language" 
                            style={{ marginRight: "15px", marginLeft: "20px" }}
                        />
                        <label for="update_gender">Prefer Not to say</label>
                    </div>
                    <div className="col-sm-6  noMargin noPadding each_input">
                        <span className="profile_gr">Employee ID</span>
                        <div>
                            <span className="input_text">{data.id}</span>
                            {data.id ? (
                            <img data-toggle="tooltip" data-placement="top" title='Employee ID is set by the "business" admin and can not be changed '
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
                        value={data.address}
                        onChange={(e) => setData({...data, address: e.target.value})}
                    ></input>
                    </div>
                    <div className="col-sm-6 col-12 noMargin noPadding each_input">
                    <span className="profile_gr">City</span>
                    <input
                        className="border profile_input form-control"
                        style={{ width: "80%" }}
                        value={data.city}
                        onChange={(e) => setData({...data, city: e.target.value})}
                    ></input>
                    </div>
                </div>

                <div className="row noMargin noPadding">
                    <div className="col-sm-6 col-12 noMargin noPadding each_input">
                    <span className="profile_gr">State</span>
                    <input
                        className="border profile_input form-control"
                        style={{ width: "80%" }}
                        value={data.state}
                        onChange={(e) => setData({...data, state: e.target.value})}
                    ></input>
                    </div>
                    <div className="col-sm-6 col-12 noMargin noPadding each_input">
                    <span className="profile_gr">Country</span>
                    <input
                        className="border profile_input form-control"
                        style={{ width: "80%" }}
                        value={data.country}
                        onChange={(e) => setData({...data, country: e.target.value})}
                    ></input>
                    </div>
                </div>

                <div className="row noMargin noPadding">
                    <div className="col-sm-6 col-12 noMargin noPadding each_input">
                    <span className="profile_gr">Pin code</span>
                    <input
                        className="border profile_input form-control"
                        style={{ width: "80%" }}
                        value={data.pin}
                        onChange={(e) => setData({...data, pin: e.target.value})}
                    ></input>
                    </div>
                </div>

                <div className="row noMargin noPadding">
                    <div className="col-12 noMargin noPadding each_input">
                    <button
                        className="blue_active edit_common_btn"
                        onClick={updateProfile}
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
        </div>
    );
}

export default PersonalProfile;