
import React, { useState, useEffect } from "react";
import "./Categories.css";
import axios from '../../Axios';
import Cookies from 'universal-cookie';
import { Dropdown } from "react-bootstrap";
import { BrowserRouter, Route, Redirect, useHistory, Link } from 'react-router-dom';

const cookies = new Cookies();

export default function Navbar(props) {
   const [name, setName] = useState('');

   useEffect(() => {
    setName(cookies.get('username'))
console.log(cookies);
  }, []);


  const history = useHistory();
const submitForm = (e) => {
 
	console.log(props.value)
    if(props.value===1)
      props.handleData(2)
    else
      props.handleData(1)
  }

const onLogout= async () => {
  const token=cookies.get('token');
  const api = `auth/user/logout`
  cookies.remove("token");
  cookies.remove("email");
  cookies.remove("id");
  cookies.remove("image");
  cookies.remove("username");
  cookies.remove("logo");
  cookies.remove("businessname");
  cookies.remove("phone_number");
  cookies.remove("isVerify");
  history.push('/')

//   axios.post(api,{}, {
//     headers: {
//       'Authorization': 'Token'+' '+cookies.get('token')    
//     }
// })
// .then(response => {
//     console.log(response);
//     console.log(cookies);
//     cookies.remove("token");
//     cookies.remove("email");
//     cookies.remove("id");
//     cookies.remove("image");
//     cookies.remove("username");
//     cookies.remove("logo");
//     cookies.remove("businessname");
//     cookies.remove("phone_number");
//     cookies.remove("isVerify");
//     history.push('/')
// })
// .catch((error) => {
//     console.log(error); 
//   });
}
 
    return (  
      <div>

<header id="navbar">
  <div id="home">
    <button id="menubtn" onClick={()=> submitForm()}>
    <img  src='/Images/menuicon.svg' height="15vh" alt=""  style={{"margin":"3px 5px","color":"black", }} /> </button>
    <img alt="" id="menufull" src='/Images/menuicon.svg' height="15px"  onClick={()=> submitForm()} style={{"margin":"3px 5px","color":"black", 'cursor':"pointer" }} />
    <Link to='/home'>
      <img alt="" style={{"margin":"0px 10px" }} id="mylogo"  src={cookies.get('logo')}  />
    </Link>
    <Link to='/home'>
      <p style={{"font-size":"3vh", "margin":"0px 0px","color":"black", fontFamily:"GFS Neohellenic, sans-serif" }}>{cookies.get('businessName')}</p>
    </Link>
  </div>
  <div id="userLinks">
    <p className="pn" id="name"  style={{"margin":"4px 5px","color":"black",fontSize:"2.2vh" }}>Welcome, {name}</p>
    {cookies.get('image').length < 1 ?
      <a className="pn" style={{"margin":"0px 5px","color":"black"}} alt="profilepic" ><img alt="profilepic" src='/Images/profilepic.png' height="30px" /></a>
      :
      <a className="pn" style={{"margin":"0px 5px","color":"black"}} alt="profilepic" ><img alt="profilepic" style={{borderRadius:"50%"}} src={cookies.get('image')} height="30px" /></a>
    }
<Dropdown>
  <Dropdown.Toggle  id="dropdown-basic">
    <img src='/Images/downarr.svg' height="15px"  alt="Arrow" style={{"margin":"2px 3px","color":"black" }} />
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item  id="namedown" href="#/action-1">Welcome, {name}</Dropdown.Item>
    <Dropdown.Item   href="/my-profile">Profile</Dropdown.Item>
    <Dropdown.Item   href="/subscription">Subscriptions</Dropdown.Item>
    <Dropdown.Item   href="/messaging">Messages</Dropdown.Item>
    <Dropdown.Item   href="/my-activity">Activity</Dropdown.Item>
    <Dropdown.Item   href="">Payments</Dropdown.Item>

    <Dropdown.Item onClick={()=> onLogout()} href="/">Logout</Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>
    
 </div>
</header>

</div>


    )
}