import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { InputGroup } from 'react-bootstrap';
import axios from '../../Axios';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../auth.css'

const cookies = new Cookies();
toast.configure();

const ForgotPassword = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [policy, setPolicy] = useState('');
    const [name, setName] = useState('');
    const [terms, setTerms] = useState('');
    const [tag, setTag] = useState('');
    const [image, setImage] = useState(null);
    const [checked, setChecked] = useState(false);

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

    const requestOtp = (e) => {
        e.preventDefault();
        let formData = new FormData();
        if(email==='') {
            toast.warning("Please enter a valid email address or phone Number", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
        }  
        else {
            if(!isNaN(email))
                formData.append("phone_number", email)                   
            else 
                formData.append("email", email);
            axios.post(`/auth/user/forgot/password`,formData,{})
            .then(res => {
                console.log(res.data);
                toast.success(res.data.message, {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
                history.push({
                    pathname: '/enter-otp',
                    state: { token: res.data.token, email: email }
                });
            })
            .catch(err => {
                console.log(err);
                toast.warning("user doesn't exist", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
            })
        }
    }
    return (
        
        // <div className="login-container row">
        //     <div className="login-left">
        //         <h1 className="login-business-name">Welcome to Business Name</h1>
        //         <h1 className="login-business-subname">A one stop Solution for your business needs</h1>
        //         <div class="login-img-container">
        //             <img src="Images/test2.jpg" alt=""/>
        //         </div>                
        //         <h4 className="text-left" style={{fontSize:"1.3vw",fontWeight:"500", paddingLeft:"9vw", marginTop:"4vh", position:"relative", color:"#252525"}}>Powered by</h4>
        //         <h4 className="text-left" style={{fontSize:"1.3vw",fontWeight:"500",paddingLeft:"9vw", marginTop:"0vh", position:"relative", color:"#252525"}}>wellness @MyBizmo</h4>                
        //     </div>

        //     <div className="login-right">
        //         <form className="forgot-form-style">
        //             <h3 className="forgot-form-title">Forgot Password</h3>
        //             <div className="form-group" style={{marginBottom:"3rem"}}>                    
        //                 <input   type="email" name="user_email" value={email} onChange={(e)=>setEmail(e.target.value)} 
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
        //                 }}  type="email" className="form-control" placeholder="Enter your email Id or Phone Number" />
        //             </div>        
        //                 <button
        //                 type="submit"
        //                 onClick={requestOtp}
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
        //                 </button>
        //             <Link to="/login"><button type="submit" className="btn btn-block p-2" style={{borderRadius:'12px',marginTop:"10px",borderColor:"black",fontSize:'0.8vw',fontWeight:"500", backgroundColor:"white", height:"6vh"}}>Already have an Account ? Sign In</button></Link>    
                    
                   
        //             <div className='forgot-privacy-policy'>
        //                     <p className="text-center" style={{paddingBottom:"-1vh", paddingLeft:"auto", paddingRight:"auto",marginLeft:"5vw", position:"absolute",bottom:"9vh"}}>
        //                                        The  &nbsp;
        //                         <a href={terms} target="_blank" className="terms-color">terms of use&nbsp;</a> and &nbsp;
        //                         <a href={policy} target="_blank" className="terms-color">our Policy</a>
        //                     </p>
        //                 </div>
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
                            <h3 className="form-title">Forgot password</h3>
                            <div className="form-group">                    
                                <input className="form_input" onChange={(e)=>setEmail(e.target.value)} value={email}  type="name" placeholder="Enter your email Id or Phone Number" />
                            </div>                    
                            <button type="submit" onClick={requestOtp} className="btn  btn-block p-2 sign_in_btn">Next</button>                            
                            <Link to="/login" className='already-account'> 
                                <button type="submit" className="btn  btn-block p-2 not_a_member_btn" >Already have an account ? Sign In</button>
                            </Link>  
                            {/* <div className='privacy-policy col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding footer_sec text-center'>
                                <p className="ml-3" className="footer-text">
                                    The{" "}
                                    <em style={{ color: "#03CBC9" }}><a href={terms} target="_blank" className="terms-color">terms of use</a></em> and{" "}
                                    <em style={{ color: "#03CBC9" }}><a href={policy} target="_blank" className="terms-color">our Policy</a></em>
                                </p>
                            </div>   */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default ForgotPassword
