import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from '../../Axios';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();
toast.configure();

const OtpPage = (props) => {
  const [otp, setOtp] = useState('');
  const [isSend, setIsSend] = useState(true);
  const [policy, setPolicy] = useState('');
  const [name, setName] = useState('');
  const [terms, setTerms] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState(null);

  const history = useHistory();
  const location = useLocation();

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
  },[])

  const resendOtp = () => {
    axios.post(`/auth/user/resend/otp`, {}, {      
      headers: {
        'Authorization': 'Token ' + location.state.token
      }
    })
    .then(res => {
      console.log(res.data);
      toast.success(res.data.message, {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
      setIsSend(false)
      setTimeout(() => {
        setIsSend(true);
      }, 60000);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    console.log("here");
    axios.post(`/auth/user/forgot/password/verify`, {
      email: location.state.email,
      otp: otp
    }, {
      headers: {
        'Authorization': 'Token ' + location.state.token
      }
    })
    .then(res => {
      console.log(res.data);
      if(res.data.error==='The verification code entered does not match') {
        toast.error(res.data.error, {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
      }
      else{
        history.push({
            pathname: '/reset-password',
            state: { token: location.state.token }
        });
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

return(
//     <div className="login-container row">      
//       <div className="login-left">
//           <h1 className="login-business-name">Welcome to {name}</h1>
//           <h1 className="login-business-subname">A one stop solution for your business needs</h1>
//           <div class="login-img-container">
//               <img src="Images/test2.jpg" alt=""/>
//           </div>                
//           <h4 className="text-left" style={{fontSize:"1.3vw",fontWeight:"500", paddingLeft:"9vw", marginTop:"4vh", position:"relative", color:"#252525"}}>Powered by</h4>
//           <h4 className="text-left" style={{fontSize:"1.3vw",fontWeight:"500", paddingLeft:"9vw", marginTop:"0vh", position:"relative", color:"#252525"}}>wellness @MyBizmo</h4>                
//       </div>
//       <div className="login-right">
//         <form className="forgot-form-style">
//           <h3 className="forgot-form-title">Forgot Password</h3>
//           <div className="form-group">                
//               <input value={otp} onChange={e=>setOtp(e.target.value)}  type="email" name="otp" 
//               style={{                       
//                 padding: "0.97vw",
//                 borderRadius: "12px",
//                 backgroundColor: "#F2F1F7",
//                 fontStyle: "Nunito",
//                 border: "none",
//                 fontSize: "0.97vw",
//                 fontWeight: "600",
//                 width:"100%",
//                 paddingLeft:"2vw"
//               }}  type="email" className="form-control" placeholder="Enter OTP here" />
//           </div>
//           {isSend? 
//           <p className="forgot-password text-right" style={{fontSize:"10vw", marginRight:"10vw"}} onClick={resendOtp} style={{cursor:"pointer"}}>Resend OTP</p>
//           :
//           <p className="forgot-password text-right">OTP will be resend after one minute</p>
//           }
          
//           <button
//             type="submit"
//             onClick={verifyOtp}
//             className="btn  btn-block p-2"
//             style={{
//                 borderRadius: "12px",
//                 backgroundColor: "#03CBC9",
//                 color: "white",
//                 fontSize: "1vw",
//                 fontWeight: "500",
//                 height:"6vh",
//                 marginBottom: "1rem"
//             }}
//             > Next
//             </button>
//             <Link to="/login"><button type="submit" className="btn btn-block p-2" style={{borderRadius:'12px',marginTop:"10px",borderColor:"black",fontSize:'0.8vw',fontWeight:"500", backgroundColor:"white", height:"6vh"}}>Already have an Account ? Sign In</button></Link>    
//         </form>                       
//       </div>
//     </div>

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
                        <h3 className="form-title">Enter Otp</h3>
                        <div className="form-group">                    
                            <input className="form_input" onChange={e=>setOtp(e.target.value)} value={otp}  type="name" placeholder="Enter OTP here" />
                        </div>
                        
                       {isSend? 
                          <p className="forgot-password text-right" onClick={resendOtp} style={{cursor:"pointer"}}>Resend OTP</p>
                          :
                          <p className="forgot-password text-right">OTP will be resend after one minute</p>
                        } 
                        <button type="submit" onClick={verifyOtp} className="btn  btn-block p-2 sign_in_btn"> Next</button>                        
                        <Link to="/login" className='already-account'> 
                          <button type="submit" className="btn  btn-block p-2 not_a_member_btn" >Already have an account ? Sign In</button>
                        </Link>
                        <div>                    
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

export default OtpPage
