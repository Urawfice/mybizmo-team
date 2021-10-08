
import React, { useState, useEffect, useRef } from "react";
import "../Slider/styleS.css";
import './myProfile.scss'
// import './MyProfile.css'
import Cookies from 'universal-cookie';
import axios from '../../Axios';
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

const cookies = new Cookies();

export default function LoginSecurity(props) {
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [docs, setDocs] = useState('');

    const [selectedSubCateg, setSelectedSubCateg] = useState([]);

    const [selectedImage, setSelectedImage] = useState('');
    const [uploadId, setUploadId] = useState([]);
    const [isVisible1, setIsVisible1] = useState(false)
    const [isVisible2, setIsVisible2] = useState(false)
    const [isVisible3, setIsVisible3] = useState(false)


    const [currPassword, setCurrPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [isForgotPW, setIsForgotPW] = useState(false);
    const [isfpOTP, setisfpOTP] = useState(false)
    const [isfpsetPw, setisfpsetPW] = useState(false);
    const [fpOTP, setfpOTP] = useState('')
    const [isFEmailEntered, setisFEmailEntered] = useState('false');
    const [fpEmail, setfpEmail] = useState('');
    const [profileData, setProfileData] = useState([]);

    const [isVerifyNum, setisVerifyNum] = useState(false);
    const [isvnOTP, setisvnOTP] = useState(false);
    const [isvnCong, setIsvnCong] = useState(false);
    const [vnOTP, setvnOTP] = useState('');
    const [vnNum, setvnNum] = useState('');

    const [isVerifyEmail, setisVerifyEmail] = useState(false);
    const [isveOTP, setisveOTP] = useState(false);
    const [isveCong, setIsveCong] = useState(false);
    const [veOTP, setveOTP] = useState('');
    const [veEmail, setveEmail] = useState('');



    const modalRef = useOnClickOutsideRef(() => {
        cancelClick();

    })


    function useOnClickOutsideRef(callback, initialValue = null) {
        const elementRef = useRef(initialValue)
        useEffect(() => {
            function handler(event) {
                if (!elementRef.current?.contains(event.target)) {
                    callback()
                }
            }
            window.addEventListener('click', handler)
            return () => window.removeEventListener('click', handler)
        }, [callback])
        return elementRef
    }






    useEffect(() => {

      console.log(cookies)
        axios.get(`users/document-list`, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                setDocs(res.data)
                setUploadId(res.data)
                // toast.success("Successfully uodated", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })

            })
            .catch((err) => {
                console.log(err);
                // toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });



        axios.get('/users/profile-list', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
            // params: {
            //   package_type: 'a'
            // },
        })
            .then(res => {
                console.log(res.data);
                setProfileData(res.data);


            })
            .catch(err => {
                console.log("err", err);
            })



    }, [])


    const updateProfile = (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        let img = URL.createObjectURL(e.target.files[0]);
        // setSelectedImagePreview(img);
        let tr = uploadId;
        tr.push(img);
        setUploadId(tr);

        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        formData.append("name", e.target.files[0].name);
        for (var key of formData.entries()) {
            console.log(key[0] + ", " + key[1]);
        }
        axios.post(`users/document-create`, formData, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                toast.success("Document added successfully", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            })
            .catch((err) => {
                console.log(err);
                toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }


    const updatePassword = (e) => {

        if (newPassword != confPassword) {
            toast.warning("New Password and confirm password do not match", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            return;
        }
        if (newPassword.length < 8) {
            toast.warning("Password length must be atleast 8", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            return;

        }

        axios.post(`auth/change-password`, {
            old_password: currPassword,
            new_password: newPassword
        }, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                toast.success("Successfully updated", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                if (err.response.data) {
                    if (err.response.data.message === 'Please enter correct existing password') {
                        toast.warning("Current Password Do not match", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
                        return;
                    }
                }

                toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }


    const fpNext = (e) => {
        if (!fpEmail) {
            toast.warning("Enter valid email", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            return;
        }
        axios.post(`auth/user/forgot/password`, {
            email: fpEmail
        }, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                setTimeout(() => {
                    setIsForgotPW(false)
                    setisfpOTP(true)
                }, 1);
            })
            .catch((err) => {
                console.log(err);
                toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }
    const vnNext = (e) => {
        if (!vnNum) {
            toast.warning("Enter valid Number", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            return;
        }
        axios.post(`auth/send-otp`, {
            phone_no: vnNum,
        }, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                setTimeout(() => {
                    setisVerifyNum(false);
                    setisvnOTP(true);
                }, 1);
            })
            .catch((err) => {
                console.log(err);
                toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }
    const veNext = (e) => {
        if (!veEmail) {
            toast.warning("Enter valid email", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            return;
        }
        axios.post(`auth/send-otp`, {
            email: veEmail
        }, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                setTimeout(() => {
                    setisVerifyEmail(false);
                    setisveOTP(true);
                }, 1);
            })
            .catch((err) => {
                console.log(err);
                toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }


    const fpVerify = (e) => {
        if (!fpOTP) {
            toast.warning("Enter the OTP", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            return;
        }
        axios.post(`auth/user/forgot/password/verify`, {
            email: fpEmail,
            otp: fpOTP,
        }, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                if (res.data.error) {
                    toast.warning(res.data.error, { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
                    return;
                }
                if (res.data.message) {
                    setTimeout(() => {
                        setisfpOTP(false);
                        setisfpsetPW(true);
                        setNewPassword('');
                        setConfPassword('');
                    }, 1);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }

    const vnVerify = (e) => {
        if (!vnOTP) {
            toast.warning("Enter the OTP", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            return;
        }
        axios.post(`auth/change-phone-no`, {
            phone_no: vnNum,
            otp: vnOTP
        }, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                if (res.data.error) {
                    toast.warning(res.data.error, { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
                    return;
                }
                if (res.data.message) {
                    setTimeout(() => {
                        setisvnOTP(false);
                        setIsvnCong(true);
                    }, 1);

                    if (cookies.get("url")) {
                         axios.get('/auth/check-email-phone-verification', {
                            headers: {
                                'Authorization': 'Token' + ' ' + cookies.get('token')
                            },
                        })
                            .then(res => {

                                console.log(res.data)
                                if (res.data.email_verify && res.data.phone_verify) {
                                    toast.success("You can now proceed to buy the package")
                                    window.location.href = cookies.get("url");
                                }
                                else {

                                }

                            })
                            .catch(err => {
                                console.log("err", err);
                            })
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }

    const veVerify = (e) => {
        if (!veOTP) {
            toast.warning("Enter the OTP", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            return;
        }
        axios.post(`auth/change-email`, {
            email: veEmail,
            otp: veOTP,
        }, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                if (res.data.error) {
                    toast.warning(res.data.error, { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
                    return;
                }
                if (res.data.message) {
                    setTimeout(() => {
                        setisveOTP(false);
                        setIsveCong(true);
                    }, 1);

                    
                    if ( cookies.get("url")) {
                         axios.get('/auth/check-email-phone-verification', {
                            headers: {
                                'Authorization': 'Token' + ' ' + cookies.get('token')
                            },
                        })
                            .then(res => {

                                console.log(res.data)
                                if (res.data.email_verify && res.data.phone_verify) {
                                    toast.success("You can now proceed to buy the package")
                                    window.location.href =  cookies.get("url");
                                }
                                else {

                                }

                            })
                            .catch(err => {
                                console.log("err", err);
                            })
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }

    const fpUpdate = (e) => {
        if (newPassword != confPassword) {
            toast.warning("New Password and confirm password do not match", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            return;
        }
        if (newPassword.length < 8) {
            toast.warning("Password length must be atleast 8", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            return;

        }

        axios.post(`auth/user/reset/password`, {
            password: newPassword,
        }, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                toast.success("Successfully updated", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
                setTimeout(() => {
                    setisfpOTP(false)
                    setisfpsetPW(false)
                    setNewPassword('');
                    setConfPassword('')
                }, 1);

            })
            .catch((err) => {
                console.log(err);
                toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }


    const fpResendOTP = (e) => {
        axios.post(`auth/user/resend/otp`, {
            password: newPassword,
        }, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                setfpOTP('')
                toast.success("OTP has been resent to your email Id", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })

            })
            .catch((err) => {
                console.log(err);
                toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }


    const vneResendOTP = (e) => {
        console.log(veEmail + " " + vnNum)
        if (vnNum) {
            axios.post(`auth/send-otp`, {
                phone_no: vnNum,
            }, {
                headers: {
                    Authorization: "Token " + cookies.get("token"),
                }
            },
            )
                .then((res) => {
                    console.log(res)
                    setvnOTP('');
                    setveOTP('')
                    toast.success("OTP has been resent ", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })

                })
                .catch((err) => {
                    console.log(err);
                    toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
                });
        }
        else {
            axios.post(`auth/send-otp`, {
                email: veEmail,
            }, {
                headers: {
                    Authorization: "Token " + cookies.get("token"),
                }
            },
            )
                .then((res) => {
                    console.log(res)
                    setvnOTP('');
                    setveOTP('')
                    toast.success("OTP has been resent ", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })

                })
                .catch((err) => {
                    console.log(err);
                    toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
                });
        }
    }

    const cancelClick = (e) => {

        setisfpOTP(false);
        setisfpsetPW(false);
        setIsForgotPW(false);
        setNewPassword('')
        setConfPassword('')
        setfpOTP('')
        setfpEmail('')
        setisVerifyEmail(false);
        setisVerifyNum(false);
        setisveOTP(false);
        setisvnOTP(false);
        setIsveCong(false);
        setIsvnCong(false);
    }

    return (
        <div >
            <div className='row noMargin noPadding card doc_card'>
                <div className='row noMargin header_sec'>
                    <span className='select_interest_head noPadding' style={{color: "#03CBC9" }}>
                        Change Password
                    </span>
                </div>
                <div className='row noMargin noPadding body_sec'>
                    <div className='col-sm-4 col-12 each_security_sec noMargin' >
                        <span className='profile_gr'>Current password</span>
                        <div className="input-group group_class">
                            <input className='border profile_input form-control' value={currPassword} onChange={(e) => setCurrPassword(e.target.value)} style={{ borderRadius: "5px" }} type={!isVisible1 ? "password" : "text"} />
                            <span className="input-group-text grp_text"><i onClick={(e) => setIsVisible1(!isVisible1)} class={isVisible1 ? "fa pw-eye fa-eye eye-ic" : "eye-ic fa pw-eye fa-eye-slash"}></i></span>
                        </div>
                    </div>
                    <div className='col-sm-4 col-12 each_security_sec noMargin' >
                        <span className='profile_gr'>New Password</span>
                        <div className="input-group group_class">
                            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='border profile_input form-control' style={{ borderRadius: "5px" }} type={!isVisible2 ? "password" : "text"} />
                            <span className="input-group-text grp_text"><i onClick={(e) => setIsVisible2(!isVisible2)} class={isVisible2 ? "fa pw-eye fa-eye eye-ic" : "eye-ic fa pw-eye fa-eye-slash"}></i></span>
                        </div>
                    </div>
                    <div className='col-sm-4 col-12 each_security_sec noMargin' >
                        <span className='profile_gr'>Confirm Password</span>
                        <div className="input-group group_class">
                            <input value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className='border profile_input form-control' style={{ borderRadius: "5px" }} type={!isVisible3 ? "password" : "text"} />
                            <span className="input-group-text grp_text"><i onClick={(e) => setIsVisible3(!isVisible3)} class={isVisible3 ? "fa pw-eye fa-eye eye-ic" : "eye-ic fa pw-eye fa-eye-slash"}></i></span>
                        </div>
                    </div>
                </div>
                <div className='row noMargin noPadding body_sec'>
                    <div className='col-12 noPadding each_security_sec'>
                        <button onClick={updatePassword} className='blue_active edit_common_btn'>
                            Update
                        </button>

                    {/* </div> */}
                    {/* <div className='col-9 pl-sm-4 col-sm-8 pl-4'> */}
                        <button onClick={() => {
                            setTimeout(() => {
                                setIsForgotPW(true)
                            }, 1);

                        }} className='edit_common_btn not_active_security margin_left_btn'>
                            Forgot Password
                        </button>
                    </div>
                </div>
            </div>

            <div className='row noMargin noPadding'>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 noPadding noMargin contact_card'>
                    <div className='noMargin noPadding card profile_card'>
                        <div className='row noMargin'>
                            <span className='select_interest_head noPadding' style={{color: "#03CBC9" }}>
                                Contact Number
                            </span>
                        </div>
                        <div className='row noMargin noPadding button_margin_top'>
                            <div className='col-8 noPadding'>
                                <span className="security_mail_phn noPadding">{profileData && profileData.phone_number}</span>
                            </div>
                            <div className='col-4 noPadding text-right'>
                                {profileData.phone_verify ?
                                    <button className='verified_btn'>VERIFIED</button>
                                    : <></>
                                }
                            </div>
                        </div>
                        <div className='row noMargin noPadding button_margin_top'>
                            <div className='col-12 noPadding'>
                                <button onClick={() => {
                                    setTimeout(() => {
                                        setisVerifyNum(true);
                                    }, 1);

                                }} className='blue_active edit_common_btn'>
                                    Update
                                </button>

                            </div>

                        </div>

                    </div>
                </div>

                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 noMargin noPadding mail_card'>
                    <div className='noMargin noPadding card profile_card'>
                        <div className='row noMargin'>
                            <span className='select_interest_head noPadding' style={{color: "#03CBC9" }}>
                                Email Id
                            </span>
                        </div>
                        <div className='row noMargin noPadding button_margin_top'>
                            <div className='col-8 noPadding'>
                                <span className="security_mail_phn noPadding">{profileData && profileData.email}</span>
                            </div>
                            <div className='col-4 noPadding text-right'>
                                {profileData.mail_verify ?
                                    <button className='verified_btn'>VERIFIED</button>
                                    : <></>
                                }
                            </div>
                        </div>
                        <div className='row noMargin noPadding button_margin_top'>
                            <div className='col-12 noPadding'>
                                <button onClick={() => {
                                    setTimeout(() => {
                                        setisVerifyEmail(true);
                                    }, 1);

                                }} className='blue_active edit_common_btn'>
                                    Update
                                </button>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

            {isForgotPW ?

                <div ref={modalRef} className='overlay_security shadow-lg'>
                    <div className='text-center overlay_head' style={{ color: "#03cbc9"}}>
                        Forgot Password
                    </div>

                    <div className='row noPadding noMargin'>
                        <div className='text-center form_text button_margin_top'>
                            Enter your Email
                        </div>
                        <div className='text-center button_margin_top'>
                            <input type='email' onChange={(e) => setfpEmail(e.target.value)} value={fpEmail} className='border popup_input form-control'/>
                        </div>
                        <div className='text-center button_margin_top'>
                            <button onClick={cancelClick} className='not_active_security edit_common_btn'> Cancel</button>
                            <button onClick={fpNext} className='blue_active edit_common_btn margin_left_btn'>Next</button>
                        </div>
                    </div>
                </div>
                : <></>
            }
            {isfpOTP ?

                <div ref={modalRef} className='overlay_security shadow-lg'>
                    <div className='text-center overlay_head' style={{ color: "#03cbc9"}}>
                        Forgot Password
                    </div>
                    <div className='row noPadding noMargin'>
                        <div className='text-center form_text button_margin_top'>
                            Enter the OTP sent to your Email id
                        </div>
                        <div className='text-center button_margin_top'>
                            <input type='password' onChange={(e) => setfpOTP(e.target.value)} value={fpOTP} className='border popup_input form-control'/>
                        </div>
                        <div className='text-center button_margin_top'>
                            <button onClick={fpResendOTP} className='not_active_security edit_common_btn'> Resend OTP</button>
                            <button onClick={fpVerify} className='blue_active edit_common_btn margin_left_btn'>Verify</button>
                        </div>
                    </div>
                </div>
                : <></>
            }
            {isfpsetPw ?

                <div ref={modalRef} className='overlay_security_pass shadow-lg'>
                    <div className='text-center overlay_head' style={{ color: "#03cbc9"}}>
                        Forgot Password
                    </div>
                    <div className='row noPadding noMargin'>
                        <div className='text-center form_text button_margin_top'>
                            Enter new Password
                        </div>
                        <div className='text-center small_margin'>
                            <input type='password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className='border popup_input form-control'/>
                        </div>
                        <div className='text-center form_text button_margin_top'>
                            Confirm Password
                        </div>
                        <div className='text-center small_margin'>
                            <input type='password' onChange={(e) => setConfPassword(e.target.value)} value={confPassword} className='border popup_input form-control'/>
                        </div>
                        <div className='text-center button_margin_top'>
                            <button onClick={cancelClick} className='not_active_security edit_common_btn'> Cancel</button>
                            <button onClick={fpUpdate} className='blue_active edit_common_btn margin_left_btn'>Update</button>
                        </div>
                    </div>
                </div>
                : <></>
            }

            {isVerifyNum ?

                <div ref={modalRef} className='overlay_security shadow-lg'>
                    <div className='text-center overlay_head' style={{ color: "#03cbc9"}}>
                        Verify your contact number
                    </div>
                    <div className='row noPadding noMargin'>
                        <div className='text-center form_text button_margin_top'>
                            Enter your new Number
                        </div>
                        <div className='text-center button_margin_top'>
                            <input type='email' onChange={(e) => setvnNum(e.target.value)} value={vnNum} className='border popup_input form-control'/>
                        </div>
                        <div className='text-center button_margin_top'>
                            <button onClick={cancelClick} className='not_active_security edit_common_btn'> Cancel</button>
                            <button onClick={vnNext} className='blue_active edit_common_btn margin_left_btn'>Next</button>
                        </div>
                    </div>
                </div>
                : <></>
            }

            {isVerifyEmail ?

                <div ref={modalRef} className='overlay_security shadow-lg'>
                    <div className='text-center overlay_head' style={{ color: "#03cbc9"}}>
                        Verify your Email
                    </div>
                    <div className='row noPadding noMargin'>
                        <div className='text-center form_text button_margin_top'>
                            Enter your new Email
                        </div>
                        <div className='text-center button_margin_top'>
                            <input type='email' onChange={(e) => setveEmail(e.target.value)} value={veEmail} className='border popup_input form-control'/>
                        </div>
                        <div className='text-center button_margin_top'>
                            <button onClick={cancelClick} className='not_active_security edit_common_btn'> Cancel</button>
                            <button onClick={veNext} className='blue_active edit_common_btn margin_left_btn'>Next</button>
                        </div>
                    </div>
                </div>
                : <></>
            }
            {isvnOTP ?

                <div ref={modalRef} className='overlay_security shadow-lg'>
                    <div className='text-center overlay_head' style={{ color: "#03cbc9"}}>
                        Verify your Contact Number
                    </div>
                    <div className='row noPadding noMargin'>
                        <div className='text-center form_text button_margin_top'>
                            Enter the OTP sent to your Contact number
                        </div>
                        <div className='text-center button_margin_top'>
                            <input type='password' onChange={(e) => setvnOTP(e.target.value)} value={vnOTP} className='border popup_input form-control'/>
                        </div>
                        <div className='text-center button_margin_top'>
                            <button onClick={vneResendOTP} className='not_active_security edit_common_btn'> Resend OTP</button>
                            <button onClick={vnVerify} className='blue_active edit_common_btn margin_left_btn'>Verify</button>
                        </div>
                    </div>
                </div>
                : <></>
            }
            {isveOTP ?

                <div ref={modalRef} className='overlay_security shadow-lg'>
                    <div className='text-center overlay_head' style={{ color: "#03cbc9"}}>
                        Verify your Email
                    </div>
                    <div className='row noPadding noMargin'>
                        <div className='text-center form_text button_margin_top'>
                            Enter the OTP sent to your Email id
                        </div>
                        <div className='text-center button_margin_top'>
                            <input type='password' onChange={(e) => setveOTP(e.target.value)} value={veOTP} className='border popup_input form-control'/>
                        </div>
                        <div className='text-center button_margin_top'>
                            <button onClick={vneResendOTP} className='not_active_security edit_common_btn'> Resend OTP</button>
                            <button onClick={veVerify} className='blue_active edit_common_btn margin_left_btn'>Verify</button>
                        </div>
                    </div>
                </div>
                : <></>
            }
            {isvnCong ?

                <div ref={modalRef} className='overlay_status_msg shadow-lg'>
                    <div className='row noPadding noMargin'>
                        <div className='text-center form_text button_margin_top' style={{fontWeight: "600" }}>
                            Congratulations! 
                        </div>
                        <div className='text-center form_normal_text button_margin_top'>
                            Your contact Number has been verified
                        </div>
                    </div>
                </div>
                : <></>
            }
            {isveCong ?

                <div ref={modalRef} className='overlay_status_msg shadow-lg'>
                    <div className='row noPadding noMargin'>
                        <div className='text-center form_text button_margin_top' style={{fontWeight: "600" }}>
                            Congratulations! 
                        </div>
                        <div className='text-center form_normal_text button_margin_top'>
                            Your Email has been verified
                        </div>
                    </div>
                </div>
                : <></>
            }


        </div>
    );
}


