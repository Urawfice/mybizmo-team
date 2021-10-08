import React, {useEffect, useState} from 'react'
import { useHistory, useLocation,Link } from 'react-router-dom';
import axios from '../../Axios';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();
toast.configure();

export const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [policy, setPolicy] = useState('');
    const [name, setName] = useState('');
    const [terms, setTerms] = useState('');
    const [tag, setTag] = useState('');
    const [image, setImage] = useState(null);

    const location = useLocation();
    const history = useHistory()

    useEffect(() => {               
        if(cookies.get('token')) {
            history.push('/home');
        } 
        else {
            axios.get(`/users/business-detail-list`)
            .then(res => {
            console.log(res.data);
            setName(res.data[0].name)
            setImage(res.data[0].user_image)
            setPolicy(res.data[0].privacy_policy)
            setTerms(res.data[0].terms)
            setTag(res.data[0].tag_line)
            })
            .catch(err => {
            console.log("err", err);
            })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("here");
        if(password!==confirmPassword) {
            toast.success("confirm password and password should be same", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
        }
        else {
            axios.post(`/auth/user/reset/password`, {password}, {                
                headers: {
                    'Authorization': 'Token ' + location.state.token
                }
            })
            .then(res => {
                if(res.data.email!==null)
                    cookies.set("email", res.data.email);
                else
                    cookies.set("phone_number", res.data.phone_number);
                cookies.set('image', res.data.profile.image)
                cookies.set('username', res.data.profile.name)
                cookies.set('id', res.data.id)
                cookies.set('token', res.data.token)                 
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
                history.push('/home')
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    return (
        // <div className="login-container row">      
        //   <div className="login-left">
        //       <h1 className="login-business-name">Welcome to {name}</h1>
        //       <h1 className="login-business-subname">A one stop solution for your business needs</h1>
        //       <div class="login-img-container">
        //           <img src="Images/test2.jpg" alt=""/>
        //       </div>                
        //       <h4 className="text-left" style={{fontSize:"1.3vw",fontWeight:"500", paddingLeft:"9vw", marginTop:"4vh", position:"relative", color:"#252525"}}>Powered by</h4>
        //       <h4 className="text-left" style={{fontSize:"1.3vw",fontWeight:"500", paddingLeft:"9vw", marginTop:"0vh", position:"relative", color:"#252525"}}>wellness @MyBizmo</h4>                
        //   </div>
        //   <div className="login-right">
        //         <form className="login-form-style fg2">
        //             <h3 className="login-form-title">Reset Password</h3>        
        //             <div className="form-group" style={{marginBottom:"20px"}}>                            
        //                 <input type="password" name="password"  value={password} onChange={e=>setPassword(e.target.value)} 
        //                 style={{                                        
        //                     padding: "0.97vw",
        //                     borderRadius: "12px",
        //                     backgroundColor: "#F2F1F7",
        //                     fontStyle: "Nunito",
        //                     border: "none",
        //                     fontSize: "0.97vw",
        //                     fontWeight: "600",
        //                     width:"100%",
        //                     paddingLeft:"2vw"
        //                 }}   className="form-control" placeholder="Enter new Password" />
        //             </div>
        //             <div className="form-group" style={{marginBottom:"20px"}}>                            
        //                 <input type="password" name="confirmpassword" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} 
        //                 style={{                                            
        //                     padding: "0.97vw",
        //                     borderRadius: "12px",
        //                     backgroundColor: "#F2F1F7",
        //                     fontStyle: "Nunito",
        //                     border: "none",
        //                     fontSize: "0.97vw",
        //                     fontWeight: "600",
        //                     width:"100%",
        //                     paddingLeft:"2vw"
        //                 }}   className="form-control" placeholder="Confirm new Password" />
        //             </div>                      
        //             <button
        //                 type="submit"
        //                 onClick={handleSubmit}
        //                 className="btn  btn-block p-2"
        //                 style={{
        //                     borderRadius: "12px",
        //                     backgroundColor: "#03CBC9",
        //                     color: "white",
        //                     fontSize: "1vw",
        //                     fontWeight: "500",
        //                     height:"6vh",
        //                     marginBottom: "1rem"
        //                 }}
        //                 > Next
        //             </button>      
        //             <Link to="/login"><button type="submit" className="btn btn-block p-2" style={{borderRadius:'12px',marginTop:"10px",borderColor:"black",fontSize:'0.8vw',fontWeight:"500", backgroundColor:"white", height:"6vh"}}>Already have an Account ? Sign In</button></Link>         
        //         </form>
        //     </div>
        // </div>            
        <div className="font-style">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding" style={{backgroundColor:"white"}}>
            <div className="container main_container">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding login_mian_sec">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 displayInline img_section">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding">
                            <h2 className="heading-text">Welcome to {name}</h2>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding">
                            <h4 className="heading-text-description">{tag}</h4> 
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding img_sec_part">
                            <div className="login_img_div">
                                {image!=null ? 
                                    <img src={image}  className="landing-page-image"/>
                                    :
                                    <img src='Images/main.png'  className="landing-page-image" />
                                }
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding text-right powered_by">
                            <h4 className="btm">Powered by wellness @MyBizmo</h4>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 displayInline">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 sign_in_sec">
                            <div className="col-12 noPadding head_sec_for_mob">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding">
                                    <h2 className="heading-text">Welcome to {name}</h2>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding">
                                    <h4 className="heading-text-description">{tag}</h4> 
                                </div>
                            </div>
                            <form className="form-style otpB">
                                <h3 className="form-title">Reset Password</h3>
                                <div className="form-group">                    
                                    <input className="form_input" onChange={e=>setPassword(e.target.value)} value={password}  type="password" placeholder="Enter new password" />
                                </div>
                                <div className="form-group">                    
                                    <input className="form_input" onChange={e=>setConfirmPassword(e.target.value)} value={confirmPassword}  type="password" placeholder="Enter new password" />
                                </div>                                
                                <button type="submit" onClick={handleSubmit} className="btn  btn-block p-2 sign_in_btn">Submit</button>                                
                                <Link to="/login" className='already-account'> 
                                    <button type="submit" className="btn  btn-block p-2 not_a_member_btn" >Already have an account ? Sign In</button>
                                </Link>
                                <div className='privacy-policy col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding footer_sec text-center'>
                                    <p className="ml-3" className="footer-text">
                                        The{" "}
                                        <em style={{ color: "#03CBC9" }}><a href={terms} target="_blank" className="terms-color">terms of use</a></em> and{" "}
                                        <em style={{ color: "#03CBC9" }}><a href={policy} target="_blank" className="terms-color">our Policy</a></em>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    )
}

export default ResetPassword