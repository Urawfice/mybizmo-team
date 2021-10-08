import React, { useState, useEffect, createRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Navbar from '../Navbar/Navbar';
import SliderImg from '../Slider/Slider';
import Library from '../Slider/Library'
import Loader from "react-loader-spinner";
import Carousel from "react-elastic-carousel";

import {withRouter} from 'react-router-dom'
import { Link, useHistory } from "react-router-dom";
import axios from '../../Axios';
import Cookies from 'universal-cookie';

import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import Card from '../Slider/Card';
import EventCard from '../Slider/EventCard';
import {Container, Row, Col} from 'reactstrap';

// import { Link } from "@material-ui/core";

import Scrollable from '../Slider/Scrollable'
import Recommended from '../Slider/Recommended'
import './Main.css';
import './Main1.css';
import ExclusiveFreebies from '../Slider/ExclusiveFreebies'
import { GoogleApiWrapper } from "google-maps-react";
import MapContainer from '../../Map'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer  +1,
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
    position:'fixed',
    zIndex:"20"
  },
  drawerPaper: {
    width: "100%",
    height:"auto",
  },
  drawerContainer: {
    // overflow: 'auto',
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




const cookies = new Cookies();

const styles = theme =>({
  listItemText: {
    fontSize :'40px',
  }
})



export default function Sidenav() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [check, setCheck] = useState(1);
  const [online, setOnline] = useState([]);
  const [offLine, setOffLine] = useState([]);
  const [events, setEvents] = useState([]);
  const [audio, setAudio] = useState([]);
  const [video,setVideo] = useState([]);
  const [quotes,setQuotes] = useState([]);
  const [onlineCount, setOnlineCount] = useState();
  const [offlineCount, setofflineCount] = useState();
  const[onlineDef,setOnlineDef] = useState();
  const[offlineDef,setOfflineDef] = useState();
  const[eventCount,setEventCount]= useState();
  const [eventDef,setEventDef] = useState();
  const [onlinePack,setOnlinePack] = useState([]);
  const [offlinePack,setOfflinePack] =useState([]);
  const [eventPack,setEventPack] = useState([]);
  const [windowWidth,setWindowWidth] = useState(document.documentElement.clientWidth);
  const [showDesc,setShowDesc] = useState(false);
  const [des,setDes] = useState('');


  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 490, itemsToShow:2 },
    { width: 710, itemsToShow: 3 },
    { width: 940, itemsToShow: 4 },
    { width: 1150, itemsToShow: 5 }
  ];

  const handleResize = (e) => { 
    setWindowWidth(document.documentElement.clientWidth);
   };
   useEffect(() => {
    if(windowWidth<920){
      setCheck(2);
    }
    else{
      setCheck(1);
    }
  
  }, [windowWidth])
 


 

 
  
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  console.log(check);

   
    


  useEffect(() => {
    window.addEventListener("resize", handleResize);
    getImages();
  
  }, [])


 

  const onDClick = (e) =>{
    console.log(e.target.className)
    setDes(e.target.className)
    e.preventDefault();
    e.stopPropagation();
    console.log("Dlcick")
    if(!showDesc)
      setShowDesc(true);
    else
      setShowDesc(false);

    return false;
  }
  






 const getImages = async()=>{
        console.log(cookies.get('token'))

  await axios.get('/users/banner-list',{
    headers: {
        'Authorization': 'Token'+' '+cookies.get('token')    
      }
})
.then(res => {
  console.log(res.data);
  var arr=[];
  if(res.data.length===1 || res.data.length===2){
    arr.push('X');
  }
  arr.push(...res.data);
  while(arr.length <4){
    arr.push("X");
  }
  setItems(arr.slice(0,arr.length-1))
})
.catch(err => {
  console.log("err", err);
})


  await axios.get('/users/today-events',{
      headers: {
          'Authorization': 'Token'+' '+cookies.get('token')    
        }
    })
  .then(res => {
    console.log(res.data);
    var arr=res.data.daa;
    console.log(arr)
    setOnline(res.data.daa);
    setOffLine(res.data.daa);
    setOnlineCount(res.data.online_count);
    setofflineCount(res.data.offline_count);
    setOfflineDef(res.data.empty_offline_class);
    setOnlineDef(res.data.empty_online_class)
    })
    .catch(err => {
    console.log("err", err);
  })


  await axios.get('/users/today-stream',{
    headers: {
        'Authorization': 'Token'+' '+cookies.get('token')    
      }
    })
    .then(res => {
      console.log(res.data);
      setEvents(res.data.data);
      setEventCount(res.data.stream_count);
      setEventDef(res.data.empty_event);
    })
    .catch(err => {
    console.log("err", err);
    })

    await axios.get('/users/audio-package-list',{
      headers: {
          'Authorization': 'Token'+' '+cookies.get('token')    
        }
      })
      .then(res => {
        console.log(res.data);
        setAudio(res.data);
      })
      .catch(err => {
      console.log("err", err);
      })
      await axios.get('/users/video-package-list',{
        headers: {
            'Authorization': 'Token'+' '+cookies.get('token')    
          }
        })
        .then(res => {
          console.log(res.data);
          setVideo(res.data);
        })
        .catch(err => {
        console.log("err", err);
        })


        await axios.get('/users/quote-package-list',{
          headers: {
              'Authorization': 'Token'+' '+cookies.get('token')    
            }
          })
          .then(res => {
            console.log(res.data);
            setQuotes(res.data);
          })
          .catch(err => {
          console.log("err", err);
          })







          await axios.get('/users/packages',{
            headers: {
                'Authorization': 'Token'+' '+cookies.get('token')    
              },
              params: {
                package_type:"Online Class"
              },
        })
        .then(res => {
          console.log(res.data);
          setOnlinePack(res.data)
          console.log(onlinePack)
        })
        .catch(err => {
          console.log("err", err);
        })

        await axios.get('/users/packages',{
          headers: {
              'Authorization': 'Token'+' '+cookies.get('token')    
            },
            params: {
              package_type:"Offline Class"
            },
      })
      .then(res => {
        console.log(res.data);
        setOfflinePack(res.data)
      })
      .catch(err => {
        console.log("err", err);
      })


      await axios.get('/users/packages',{
        headers: {
            'Authorization': 'Token'+' '+cookies.get('token')    
          },
          params: {
            package_type:"Event"
          },
    })
    .then(res => {
      console.log(res.data);
      // while(arr.length<5){
      //   arr.push("A")
      // }
      setEventPack(res.data)
    })
    .catch(err => {
      console.log("err", err);
    })

  } 

  const handleParentData = (value) => {
    setCheck(value)
    // console.log(window.innerWidth);
    // console.log("A")
  }

  return (
     <>
    { onlinePack.length===0  || offlinePack.length===0  || eventPack.length===0  || quotes.data.length===0?
      <div style={{backgroundColor:"white"}}>
        <div style={{marginTop:"200px",marginLeft:"40%"}} >
      <Loader  
      type="TailSpin"
      color="#00BFFF"
      height={200}
      width={200}
      timeout={3000} //3 secs
    />
    </div>
    </div>
    :

    <div className={classes.root}>
      
    
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Navbar value={check}  handleData={handleParentData} />
      </AppBar>

      { check===1 ?
      windowWidth<920 ?
      <Drawer
        className={classes1.drawer}
        variant="permanent"
        classes={{
          paper: classes1.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes1.drawerContainer}>
          <List>
              <div >
              <button className="nbtn"   style={{"color":"#03CBC9"}}>
              <ListItem className="test1" >
                <ListItemIcon  style={{minWidth:'2.27vw'}} ><img onMouseOut={e => (e.currentTarget.src='Images/homeB.svg')}  onMouseOver={e => (e.currentTarget.src='Images/homeB.svg')}   id="icon" style={{"height":"2.77vh"}} src='Images/homeB.svg' alt="classes" /></ListItemIcon>
                <ListItemText classes={{primary:classes.listItemText}}  primary="Home" />
              </ListItem>
              </button>
              </div>

              <div id="menuItem">
                <Link to="/classes">
              <button className="nbtn">
              <ListItem className="test" >
                <ListItemIcon  style={{minWidth:'2.27vw'}}><img onMouseOut={e => (e.currentTarget.src='Images/classes.svg')}  onMouseOver={e => (e.currentTarget.src='Images/classes.svg')} style={{"height":"2.77vh"}}src='Images/classes.svg' alt="classes" /> </ListItemIcon>
                <ListItemText primary="Classes" />
              </ListItem>
              </button>
              </Link>
              </div>

              <div id="menuItem">
              <Link to="/library">
              
              <button className="nbtn">
              <ListItem  className="test" >
                      <ListItemIcon style={{minWidth:'2.27vw'}}><img style={{"height":"2.77vh"}} src='Images/library.svg' alt="library" /></ListItemIcon>
                      <ListItemText primary="Library" />
              </ListItem>
              
              </button>
              </Link>
              </div>
              <div id="menuItem">
              <Link to="/packages">
              <button className="nbtn">
              <ListItem  className="test" >
                      <ListItemIcon style={{minWidth:'2.27vw'}}><img  style={{"height":"2.77vh"}} src='Images/packages.svg' alt="packages" /></ListItemIcon>
                      <ListItemText primary="Packages" />
              </ListItem >
              </button>
              </Link>
              </div>
              <div id="menuItem">
              <button className="nbtn">
              <ListItem  className="test" >
              
                <ListItemIcon  style={{minWidth:'2.27vw'}}><img style={{"height":"2.77vh"}} src='Images/myZone.svg' alt="zone" /></ListItemIcon>
                <ListItemText primary="My Zone" />
              </ListItem>
              </button>
              </div>
	 </List>
	      
           
        
        </div>
      </Drawer>
      :

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
              <div >
              <button className="nbtn"   style={{"color":"#03CBC9"}}>
              <ListItem className="test1" >
                <ListItemIcon  style={{minWidth:'2.27vw'}} ><img onMouseOut={e => (e.currentTarget.src='Images/homeB.svg')}  onMouseOver={e => (e.currentTarget.src='Images/homeB.svg')}   id="icon" style={{"height":"2.77vh"}} src='Images/homeB.svg' alt="classes" /></ListItemIcon>
                <ListItemText classes={{primary:classes.listItemText}}  primary="Home" />
              </ListItem>
              </button>
              </div>

              <div id="menuItem">
                <Link to="/classes">
              <button className="nbtn">
              <ListItem className="test" >
                <ListItemIcon  style={{minWidth:'2.27vw'}}><img onMouseOut={e => (e.currentTarget.src='Images/classes.svg')}  onMouseOver={e => (e.currentTarget.src='Images/classes.svg')} style={{"height":"2.77vh"}}src='Images/classes.svg' alt="classes" /> </ListItemIcon>
                <ListItemText primary="Classes" />
              </ListItem>
              </button>
              </Link>
              </div>

              <div id="menuItem">
              <Link to="/library">
              
              <button className="nbtn">
              <ListItem  className="test" >
                      <ListItemIcon style={{minWidth:'2.27vw'}}><img style={{"height":"2.77vh"}} src='Images/library.svg' alt="library" /></ListItemIcon>
                      <ListItemText primary="Library" />
              </ListItem>
              
              </button>
              </Link>
              </div>
              <div id="menuItem">
              <Link to="/packages">
              <button className="nbtn">
              <ListItem  className="test" >
                      <ListItemIcon className="menuIc" style={{minWidth:'2.27vw'}}><img  style={{"height":"2.77vh"}} src='Images/packages.svg' alt="packages" /></ListItemIcon>
                      <ListItemText primary="Packages" />
              </ListItem  >
              </button>
              </Link>
              </div>
              <div id="menuItem">
              <button className="nbtn">
              <ListItem  className="test" >
              
                <ListItemIcon  style={{minWidth:'2.27vw'}}><img style={{"height":"2.77vh"}} src='Images/myZone.svg' alt="zone" /></ListItemIcon>
                <ListItemText primary="My Zone" />
              </ListItem>
              </button>
              </div>
	 </List>
	      
           
        
        </div>
      </Drawer>
      :<div></div>}
      <main className={classes.content}>
         <Toolbar/>
   
   {windowWidth >380 ?
	 <SliderImg show={3}>
      {items.map((item) => (
            <>
            {item==="X" || item.banner_image===undefined ? 
            <div style={{backgroundColor:"white",borderRadius:"10px",}} className="item outer" > 
              <img className="img1"  alt="img" src="/Images/default-banner.png"   />
              </div>
              :
            <div style={{backgroundColor:"white",borderRadius:"10px", position:"relative"}} className="item outer" > 
              <img className="img1" alt="img" src={item.banner_image}   /> 
            </div>
            }
            </>
          ))}     
     </SliderImg>
     :
     <SliderImg show={1}>
      {items.map((item) => (
            <>
            {item==="X" || item.banner_image===undefined ? 
            <div style={{backgroundColor:"white",borderRadius:"10px",}} className="item outer" > 
              <img className="img1"  alt="img" src="/Images/default-banner.png"   />
              </div>
              :
            <div style={{backgroundColor:"white",borderRadius:"10px", position:"relative"}} className="item outer" > 
              <img className="img1" alt="img" src={item.banner_image}   /> 
            </div>
            }
            </>
          ))}     
     </SliderImg>
      }
    

   {onlinePack.length>0 && offlinePack.length>0 && eventPack.length>0 ?
    <div>
    <div style={{"marginBottom":"2.77vh",paddingLeft:"0px",paddingTop:"1.10vh",marginTop:"12px"}} id="yourS" >Your Schedule For Today</div> 
    <Container fluid>
      <Row>
        <Col><Card  count={onlineCount} defImg={onlineDef} title="online" items={online} /></Col>
        <Col><Card count={offlineCount} defImg={offlineDef} title="offline" items={offLine} /></Col> 
        <Col><EventCard count={eventCount} defImg={eventDef} title="events" items={events} /></Col>
      </Row>
    </Container>
    </div>
    :<div></div>
  
  }
   
    {onlinePack.length>0 || offlinePack.length>0 || eventPack.length>0 ?
      <div style={{"marginBottom":"-2.07vh", "paddingTop":"1.38vh",marginTop:"15px"}} id="yourS" >Explore Packages</div>
      : <></>
    }
     
    
    <div class="bg-white mt-5">
      <div  class="ml-5 font-weight-bold pt-3  pb-3 fs-5">Online</div>
      <div className="mt-3">
      <Carousel breakPoints={breakPoints}>
      {onlinePack.map((item) =>(
          <span class="" style={{flex:"0 0 auto"}}>
          <span class="card m-2 shadow-sm bg-white rounded" style={ windowWidth>1600 ? {width: "17vw",display:"inline-block"} : {width: "15.4rem",display:"inline-block"}  }>
          
          <div style={{padding:"5px",display:"flex"}} class="card-img-top"   alt="Card image cap" >
            <img class="card-img-top" src={item.image_one} style={ windowWidth <1600 ? {height:"120px",maxWidth:"100%"} :windowWidth< 2000 ? {height:"165px",maxWidth:"100%"} :{height:"194px",maxWidth:"100%"} }    />
          </div>
          <div class="card-body mb-0 pb-0">
            <h5  style={{marginLeft:"-8px"}} class="fs-6 font-weight-bold">{item.name}</h5>
            <p  style={{height:"40px",marginLeft:"-8px"}} class=" card-text">{(item.description+ "").slice(0,25)+"...  " }
            <a value={item.description} class={item.description} onClick={onDClick} href="">Read More</a>
            </p>
            {showDesc  ?
           <div className="overlay-des overlay-desHm" style={{backgroundColor:"white"}}>
      
          <div className="packDet">
                    Description
                </div>
                <div className="packCl">
                    <button className="cls-Btn" onClick={onDClick}  >Close</button>
                </div>
                <hr></hr> 
           <div className="oDesc"> {des}</div>
            </div>
           :<></>
          }
           
            <div style={{width:"120%",marginLeft:"-20px",boxShadow:"0 1px 13px -7px"}} class="shadowBottom" id="likeScr" >
            <div className="lScr"><img className="fa3" src="/Images/Vector (2).png" alt="icon" /> 
              {item.total_class!==null ? 
                <>{item.total_class} classes </>
                :
                <>{item.time_duration_in_days} days </>
              }
            </div>
          
              <div className="mScr">
                  <img className="fa3" src="/Images/heart.svg" alt="icon" id={item.id} /> {item.like_count}
              </div>
  
           
            <div className="rScr"> <img className="fa3" src="/Images/Vector (4).png" alt="icon" />{item.share_count}</div>
           
           </div>
            </div>
          
        </span>
        </span>
      
      ))}
      </Carousel>
      </div>
      </div>
    


      </main>
    </div>
  }
  </>
  );
}
