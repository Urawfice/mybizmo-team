import React, {useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import {url} from '../../const'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Dashboard from "../Dashboard"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();
toast.configure();

 export const ResetPassword2 = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const location = useLocation();
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("here");
        if(password!==confirmPassword) {
            toast.success("confirm password and password should be same", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
        }
        else {
            axios.post(`${url}/auth/user/reset/password`, {password}, {                
                headers: {
                    'Authorization': 'Token'+' '+cookies.get('token')
                }
            })
            .then(res => {
                console.log(res);
                history.push('/home')
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    return (
        <>
        <Dashboard />
        <div style={{ marginLeft: "250px" }}>
        <div className="loginBg" >
                <div className="loginBox  px-3 m-auto">
                    <div className="row p-12" style={{ minHeight: '50vh',width:'fit-content',margin:'auto' }}>
                        
                        <div className="col-12 rightLoginPanelBg">
                            <h4>Reset Password</h4>
                            <div className="row  h-75">
                            <div className="col my-auto">
                            <div>
                                <div className="input-group mb-2">
                                    <input type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control loginInput" id="inlineFormInputGroup"  placeholder="Password" />
                                </div>
                            </div>
                            <div>
                                <div className="input-group mb-2">
                                    <input type="password" name="confirmpassword" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="form-control loginInput" id="inlineFormInputGroup"  placeholder="Confirm Password" />
                                </div>
                            </div>

                            <div className="p-2 text-right">
                                <button style={{backgroundColor:"green", color:"white"}} onClick={handleSubmit} >Reset Password</button>
                            </div>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </>
    )
}
