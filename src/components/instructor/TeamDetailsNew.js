import React, { useEffect, useState,useRef } from "react";
// import Dashboard from "../Dashboard";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Navbar from '../Navbar/Navbar';
import axios from '../../Axios';
import Cookies from "universal-cookie";
import "./TeamNew.css";
import addbtn2 from "./ProjectImages/addbtn2.png";
import profilestatus from "./ProjectImages/profilestatus.png";
import keycont from "./ProjectImages/keycont.png";
import search from "./ProjectImages/search.png";
import defaultImage from "./ProjectImages/defaultImage.png";
import editbtn from "./ProjectImages/editbtn.png";
import verticaldots from "./ProjectImages/verticaldots.png"; 
import stars from './ProjectImages/stars.png';
import { Link, useHistory } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Button } from "react-bootstrap";
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import { url } from "../../Const";
import { RatingView,Rating } from 'react-simple-star-rating'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();



const cookies = new Cookies();




const drawerWidth=160;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

const TeamDetailsNew = () => {
  const [teamlist, setTeamList] = useState([]);
  const [activeBtn,setActiveBtn] = useState(1);
  const[input,setInput]=useState('');
  const[output,setOutput]=useState([]);
  const[role,setrole]=useState([]);
  const classes = useStyles();
  const [check, setCheck] = useState(2);
  const [numsF,setNumsF] = useState([1]);
  
  const [insOverlay, setinsOverlay] = useState(false);
  const [insData,setInsData]  = useState();
  const [next,setNext] = useState();
  const [prev,setPrev] = useState();
  const [isMsg, setIsMsg] = useState(false);
  const [sub,setSub] = useState('');
  const [message,setMessage] = useState('');
  const [rating, setRating] = useState(0)

  const modalRef = useOnClickOutsideRef(() => {
    setinsOverlay(false);
    setIsMsg(false);

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
    axios
      .get(`users/instructor-list?page=1`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setTeamList(res.data.results.results.map((item) => item));
         setOutput(res.data.results.results)
         setNext(res.data.next);
         setPrev(res.data.previous)
         let page = res.data.results.page_no;
        let ta =[];
        for(let i=1;i<=page;i++){
          ta.push(i);
        }
        setNumsF(ta);
        //  setrole(res.data.map((item)=>item.category))
         console.log("role",res.data[3].category.split(','))
         console.log("role new try",res.data.map((item)=>(item.category!==null) && item.category.split(',')))

         setrole(res.data.results.map((item)=>(item.category!==null) && item.category.split(',')))
         
        
        // setrole(res.data.map((item)=>item.category))
        // console.log(role!==null && role.map((item)=>item))
        // console.log('role array',res.data.map((item)=>item.category.map((item)=>item!==null && item.split(','))))
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  useEffect(() => {
    axios
    .get(`users/instructor-list?page=${activeBtn}`, {
      headers: {
        Authorization: "Token " + cookies.get("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      setTeamList(res.data.results.results.map((item) => item));
       setOutput(res.data.results.results)
       setNext(res.data.next);
       setPrev(res.data.previous)
       console.log("role",res.data[3].category.split(','))
       console.log("role new try",res.data.map((item)=>(item.category!==null) && item.category.split(',')))
       setrole(res.data.results.results.map((item)=>(item.category!==null) && item.category.split(',')))
      
    })
    .catch((err) => {
      console.log(err);
    });
    


}, [activeBtn])

  useEffect(() => {
    setOutput([])
    teamlist.filter(val=>{
     
      
        if((val.name!=null)&& val.name.toLowerCase().includes(input.toLowerCase())){
            setOutput(output=>[...output,val])
        }else if((val.phone_number!=null)&& val.phone_number.toLowerCase().includes(input.toLowerCase())){
          setOutput(output=>[...output,val])
        }
        else if((val.website!=null)&& val.website.toLowerCase().includes(input.toLowerCase())){
          setOutput(output=>[...output,val])
        }else if((val.status!=null)&& val.status.toLowerCase().includes(input.toLowerCase())){
          setOutput(output=>[...output,val])
        }
        
        
    })
}, [input])


const handleParentData = (value) => {
  setCheck(value)
}

function getMonthName(date){
  const d = new Date();
  let day = parseInt(date.split('-')[2]);
  let month = parseInt(date.split('-')[1]);
  let year = parseInt(date.split('-')[0]);

  d.setMonth(month-1);
  let monthName = d.toLocaleString("default", {month: "long"});
  monthName=monthName.slice(0,3);
  let finalDate= day+" "+monthName+" "+year;
  return finalDate;
}

const onBtnClick = (e) =>{
  setActiveBtn(e);
}
const onNextClick = (e) =>{
 
  if(next!==null){
    setActiveBtn(activeBtn+1);
  }
}
const onPrevClick = (e) =>{
  console.log(prev)
  if(prev){
    setActiveBtn(activeBtn - 1);
  }
}


const onSendMsg =(id) =>{
  console.log('a')
  console.log(id);
  console.log(cookies.get('id'));
  console.log(cookies.get('token'))

  axios.post(`users/message-send`, {
    sender: cookies.get('id'),
    receiver:id,
    header:sub,
    message:message,
}, {
    headers: {
      Authorization: "Token " + cookies.get("token"),
    }},
 )
  .then((res) => {
    console.log(res)
    toast.success("Successfully Sent", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
  })
  .catch((err) => {
    console.log(err);
    toast.warning("Some error occured", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
  });


}



const onInsOverClick = (e) =>{

  setTimeout(() => {
    setinsOverlay(true);
    setInsData(e);
  }, 1);

}

const onMsgClick = (e) =>{
  // console.log("AAA")
  setTimeout(() => {
    setInsData(e);
    if(isMsg){
      setIsMsg(false);
    }
    else{
      setIsMsg(true);
    }
  }, 1);
 
}

const onInsCloseClick = (e)=>{
  setinsOverlay(false);
}


const onLike = (e)=>{

  axios.post(`users/master-like-create`,{
    master:e
  },
  
  {
    headers: {
      Authorization: "Token " + cookies.get("token"),
    }},
 )
  .then((res) => {
    console.log(res)
    toast.success("Successfully Liked", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
    window.location.reload();
  })
  .catch((err) => {
    console.log(err);
    toast.warning("Some error occured", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
  });
  
  
}


const onDislike = (e)=>{

  axios.delete(`users/master-like-remove`, {
    master:e
  },{
    headers: {
      Authorization: "Token " + cookies.get("token"),
    }},
 )
  .then((res) => {
    console.log(res)
    toast.success("Successfully Removed Like", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
    window.location.reload();
  })
  .catch((err) => {
    console.log(err);
    toast.warning("Some error occured", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
  });
  
}

const handleRating = (rate,id) => {
  setRating(rate)
  console.log(rate)
  axios.post(`users/master-rating/`+id,{
    rating:rate
  },
  
  {
    headers: {
      Authorization: "Token " + cookies.get("token"),
    }},
 )
  .then((res) => {
    console.log(res)
    toast.success("Successfully Rated", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
    // window.location.reload();
  })
  .catch((err) => {
    console.log(err);
    // toast.warning("Some error occured", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
  });
  // Some logic
}

 const ratingChanged = (newRating) => {
  console.log(newRating);
};
 
  return (
    <>
      {/* <Dashboard /> */}

      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Navbar value={check} handleData={handleParentData} />
      </AppBar>


      {check===1 ?
      <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                <div>
                  <Link to="/home">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }} ><img onMouseOut={e => (e.currentTarget.src = 'Images/home.svg')} onMouseOver={e => (e.currentTarget.src = 'Images/home.svg')} id="icon" style={{ "height": "20px" }} src='Images/home.svg' alt="classes" /></ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem" >
                  <Link to="/classes">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/classes.svg' alt="classes" /> </ListItemIcon>
                        <ListItemText primary="Classes" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/library">
                    <button className="nbtn" >
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/library.svg' alt="library" /></ListItemIcon>
                        <ListItemText primary="Library" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/packages">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/packages.svg' alt="packages" /></ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem  >
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/instructor">
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/instr.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="Influencers" />
                      </ListItem>
                    </button>
                  </Link>
                </div>

                <div id="menuItem">
                <Link to="/subscription">
                    <button className="nbtn">
                      <ListItem className="test" >

                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/instructor">
                    <button className="nbtn" >
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="Biz Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
               
              </List>



            </div>
            <Toolbar />
          </Drawer>
          :<></>
          }








      <div className='ins_narr'>Instructors / Narrators</div>
      <div className="containerF mt-3"  >
      

      
      
      <div class="row ">
        { output && output.map((item)=>(

          

          <div class="col-sm-12 col-md-6 col-sm-offset-1 "  onClick={() => onInsOverClick(item)} >
            <div class="card mx-auto my-2" >
              <div class="card-body">

                <div className='top_svg'>
                <img className='msg_svg' src='Images/mailE.svg'  onClick={(e)=> {
                  onMsgClick(item);
                  e.preventDefault();
                  e.stopPropagation();
                  
                } } />
                <img  className='menu_svg' src='Images/menuB.svg' />
                  
                </div>
                
                <div className='image-cropper'>
                    <img src = {item.profile_image} className="profile_img_ins2  rounded " />
                </div>
                <span className='ins_name' >{item.name}</span>
                <div className='role_ins' > &nbsp; { item.role && item.role.replace(',' , ' | ') }  </div>
                <hr className='hr_line'></hr>
                <div>
                  <span className='joined_on'>Joined On : </span> 
                  <span  class='date_ins'>{getMonthName(item.created_at)}</span>
                  {item.rating ? 
                  <span className='rating_ins'>
                  <img src='/Images/star.svg' style={{paddingRight:"10px",paddingBottom:"5px"}} ></img>
                    {item.rating}
                  </span>
                  :<></>}
                </div>

                <div>

                    { item.category && item.category.split(',')[0]  ? 
                     <button  className='btn_blue'>{item.category.split(',')[0]}</button>
                     :<>&nbsp;</>
                    } 

                    { item.category &&  item.category.split(',')[1]  ? 
                      <button className='btn_purple' >{item.category.split(',')[1]}</button>
                    :<></>
                    }

                    {item.category && item.category.split(',')[2]  ? 
                    <button className='btn_green'>{item.category.split(',')[2]}</button>
                    :<></>
                    }

                    { item.category &&  item.category.split(',')[3]  ? 
                    <button  className='btn_red'>{item.category.split(',')[3]}</button>
                    :<></>
                    }
                    <span className='btn_right_two'> {item.category  && item.category.split(',').length >4 && '+' + (5-item.category.split(',').length )} </span>
                </div>


              </div>
            </div>
          </div>
          
        ) )}
        </div>


      </div>
      <div className='footer_num text-center' >
          <img src = '/Images/lar.svg'  style={{marginRight:"20px",cursor:"pointer"}} onClick={() => onPrevClick() }/>
          {
            numsF.map((num) =>(
              activeBtn===num ?
              <button className='ftr-nbtn active-btn'>{num}</button>
              :
              <button className='ftr-nbtn'  onClick={()=> onBtnClick(num) }>{num}</button>
            ))
          }
          <img src = '/Images/rar.svg' style={{cursor:"pointer"}}  onClick={() => onNextClick()} />




          {
            insOverlay && insData ?
            <div ref={modalRef}   className='overlay-ins shadow-lg'  style={{textAlign:"left"}}>
              {/* <div className='top_blue' > </div> */}

              <div  style={{backgroundColor:"#9929FD",paddingBottom:"20px"}}>
              <div className='image-cropper'>
              <img src = {insData.profile_image} className="profile_img_ins2 profile_img_ins_over2 rounded " />
              </div>
              <span  className='mr-3 mt-3 cross-icon' style={{float:"right",color:"white",height:"2.2vh"}} onClick={() => onInsCloseClick()}>Close</span>
                <span style={{color:"white"}} className='ins_name' >{insData.name}</span>
                <div className='role_ins role_ins_over'  > &nbsp; { insData.role && insData.role.replace(',' , ' | ') } </div>
                  

        
                  {/* {insData.rating ?
                  <span className='rating_ins rating_ins_over'  >
                  <img src='/Images/star.svg' style={{paddingRight:"10px",paddingBottom:"3px"}} ></img>
                    {insData.rating} / 5
                  </span>
                  :<></>} */}
                  </div>


                  {/* <hr style={{width:"90%",marginLeft:"5%",height:"3px"}} className='hr_line text-center'></hr> */}
                  <div className='bio-over'>{insData.bio}</div>

                  <div className='des-over'>
                    <span className='head-over'> Qualifications : </span>
                    <span className='det-over'>{insData.qualification}</span>
                  </div>
                  <div className='des-over'>
                    <span className='head-over'> Wellness Sub-Categories : </span>
                    <span className='det-over'>{insData.subcategory}</span>
                  </div>
                  <div className='des-over'>
                    <span className='head-over'> Languages : </span>
                    <span className='det-over'>{insData.language}</span>
                  </div>

                  <div className='container-fluid ml-2 mt-3' >
                    <div className='row' >
                      <div className='col-2 ' >
                        Rating
                      </div>
                      <div className='col-3  col-md-6' >
                        Likes
                      </div>
                      <div className='col-7 col-md-4' >
                        Rate Instructor/ Narrator
                      </div>
                    

                    </div>
                    <div className='row ' >
                      <div className='col-2 pr-0 ' >
                      <span className='rating_ins rating_ins_over'  >
                      <img src='/Images/star.svg' style={{paddingRight:"4px",paddingBottom:"3px",marginLeft:"-5px"}} ></img>
                        {insData.rating}
                      </span>
                      </div>
                      <div className='col-3  col-md-6 pr-0' >
                      {insData.user_like ?
                      <img onClick={()=>onDislike(insData.id) } src='/Images/heart.svg' style={{paddingRight:"4px",paddingBottom:"3px",marginLeft:"-5px",height:"2.8vh"}} ></img>
                      :
                      <img onClick={()=>onLike(insData.id) } src='/Images/heart-nan.svg' style={{paddingRight:"4px",paddingBottom:"3px",marginLeft:"-5px",height:"2.8vh"}} ></img>}
                       {insData && insData.like_count}
                      </div>
                      <div className='col-7 col-md-4' >
                      
                      <Rating onClick={(rate) =>handleRating(rate,insData.id)}  ratingValue={rating} />
                      <span className="instructor-rating">{rating}</span>
                      </div>
                    

                    </div>

                  </div>

                  {/* <div style={{display:"inline-flex"}}>
                   {insData.rating ?
                   <>
                   <div>Ratn</div>
                  <span className='rating_ins rating_ins_over'  >
                  <img src='/Images/star.svg' style={{paddingRight:"10px",paddingBottom:"3px"}} ></img>
                    {insData.rating} / 5
                  </span>
                  </>
                  :<></>}
                  </div> */}




                  <div className=''>
                    <span>
                      <img className='loc-img' src='/Images/loci.svg'></img>
                    </span>
                    <span className='loc-name'>
                      {insData.location} 
                    </span>
                    <span style={{float:"right"}}>
                   
                   
                    <span onClick={()=>{
                      setinsOverlay(false);
                      setTimeout(() => {
                        setIsMsg(true);
                      }, 1);
                    }} className='have_ques' >
                      Have Questions ? Send Mail
                      {/* <span className='shoot-over'>
                      
                    </span> */}
                      
                    </span>
                    <img style={{float:"right",marginRight:"20px"}} className='mail-img' src='Images/mailE.svg' />
                    
                   
                    </span>
                    
                   

                  </div>

            </div>
            :
            <></>
            
          }

            {     
              isMsg  && insData?
              <div ref={modalRef}  className='overlay-msg shadow-lg' >
                <div className='ovr-head'>
                <span className='compose-msg' >Compose a message</span>

                <span className='mt-2 mr-2 ovr-cls' onClick={() => onMsgClick() } >
                  {/* <img className='ovr-cr' src='/Images/crosss.svg' /> */}
                  Close
                  </span>
                </div>


               
                 {/* <div className='To-input mt-2'>
                  To : <input type='text' value={insData.name} readOnly />
                  </div> */}

                <div className='ovr-con'>
                <div>
                To : <input type='text' className='To-input mt-2'  value={insData.name} />
                 </div>
                 <hr style={{marginLeft:"-5%",height:"0px"}}></hr>

                  <div>
                 Subject of the message :<input type='text'  className='Sub-input' placeholder=''  onChange={(e)=>{
                   setSub(e.target.value);
                 }} />
                 </div>
                 <hr style={{marginLeft:"-5%",height:"0px"}}></hr>
                
                <div className='mt-4'>
                
                 <textarea type='text1' className='' style={{minHeight:"120px",minWidth:"80%",border:"none"}} placeholder='Enter Message Here' onChange={(e)=>{
                   setMessage(e.target.value);
                 }} />
                </div>
                </div>

                <button style={{marginTop:"100px"}} className='mt-5 btn btn-del' onClick={() => onMsgClick()} >Delete</button>
                <button className='mt-5 btn btn-send' onClick={() => onSendMsg(insData.id)} >Send</button>
                
              
              </div>
              :<></>
            }

      </div>
      
    </>
  );
};

export default TeamDetailsNew;
