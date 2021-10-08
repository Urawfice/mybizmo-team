import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Navbar from '../Navbar/Navbar';


import axios from '../../Axios';
import Cookies from 'universal-cookie';

import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import 'react-toastify/dist/ReactToastify.css';

import '../Sidenav/sidenavStyle.css';
// import './subscription.css';
import './topMenu.scss';
import './myActivity.scss';
import { Link, useHistory } from "react-router-dom";


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { toast } from "react-toastify";
import { Button, OverlayTrigger } from "react-bootstrap";
import { Popover, Tooltip } from "bootstrap";
import Activities from "./Activities";






const drawerWidth = 160;
toast.configure();

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

const useStyles1 = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
    position: 'fixed',
    zIndex: "20"
  },
  drawerPaper: {
    width: drawerWidth,
    // height: "auto",
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


const cookies = new Cookies();
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Simple tooltip
  </Tooltip>
);


export default function MyActivity(props) {

  const classes = useStyles();
  const classes1 = useStyles1();
  const [check, setCheck] = useState(2);
  const [online, setOnline] = useState([]);
  const [offLine, setOffLine] = useState([]);
  const [events, setEvents] = useState([]);
  const [audio, setAudio] = useState([]);
  const [video, setVideo] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [onlineCount, setOnlineCount] = useState();
  const [offlineCount, setofflineCount] = useState();
  const [onlineDef, setOnlineDef] = useState();
  const [offlineDef, setOfflineDef] = useState();
  const [eventCount, setEventCount] = useState();
  const [eventDef, setEventDef] = useState();
  const [onlinePack, setOnlinePack] = useState([]);
  const [offlinePack, setOfflinePack] = useState([]);
  const [eventPack, setEventPack] = useState([]);
  const [isHover, setHover] = useState(false);
  const [isHoverD, setHoverD] = useState(false);
  const [isMapDisplay, setMapDisplay] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isEvent, setIsEvent] = useState(false);
  const [isAll, setIsAll] = useState(true);
  const [arrM, setArrM] = useState([]);
  const [categ, setCateg] = useState([]);
  const [activecatId, setActiveCatId] = useState(0);
  const [activeBtn, setActiveBtn] = useState();
  const [isFilterShow, setIsFilterShow] = useState(false);
  const [HoverC, setHoverC] = useState();
  const [colId, setColId] = useState(-1);
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [arrFinal, setArrFinal] = useState('');
  const [arrLibFinal,setArrLibFinal] = useState([]);
  const [onlineFArray, setOnlineFArray] = useState([]);
  const [onlineNumArray, setOnlineNumArray] = useState([]);
  const [onlineCatArray, setOnlineCatArray] = useState([]);
  const [onlineDurArray, setOnlineDurArray] = useState([]);
  const [onlineInsArray, setOnlineInsArray] = useState([]);
  const [onlineRatArray,setOnlineRatArray] = useState([]);
  const [onlineFeatArray,setOnlineFeatArray] = useState([]);
  const [instruct, setInstruct] = useState([]);
  const [freeby,setFreeby] = useState([]);
  const [activeCl,setActiveCl] = useState('Classes');
  const [activeHead,setActiveHead] = useState('Activities');

  const [showDesc, setShowDesc] = useState(false);
  const [des, setDes] = useState('');


  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
  const handleResize = (e) => {
    setWindowWidth(document.documentElement.clientWidth);
  };
  useEffect(() => {
    if (windowWidth < 920) {
      setCheck(2);
    }
    

  }, [windowWidth])









  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);



  useEffect(() => {
    window.addEventListener("resize", handleResize);
    getImages();
    console.log(props.location)
    if (props.location.checkS !== undefined) {
      let check = props.location.checkS.displayTitle;
      if (check === 'Offline') {
        offlineClick();
      }
      else if (check === 'Events') {
        eventClick();
      }

      onlineClick();
    }
    else {
      onlineClick();
    }


    checkbtn();



  }, [])




  const getImages = async () => {

    let totalArr = [];
    console.log(cookies.get('token'))


    await axios.get('/users/subscription-list', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
      // params: {
      //   package_type: "Classes"
      // },
    })
      .then(res => {
        console.log(res);
        let arr = res.data.classes;
        let tar = [];
        arr.map((item) => {
          if (!tar.includes(item.main_master_name))
            tar.push(item.main_master_name);
        })
        setInstruct(tar);
        

        console.log(instruct)
        setArrM(arr)

        setArrFinal(arr)
        setOnlinePack(arr)
      })
      .catch(err => {
        console.log("err", err);
      })


    await axios.get('/users/subscription-list', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
      // params: {
      //   package_type: "Library"
      // },
    })
      .then(res => {
        console.log(res.data);
        let arr = res.data.library;

        setOfflinePack(arr)
        setArrLibFinal(arr);
      })
      .catch(err => {
        console.log("err", err);
      })







    await axios.get('/users/categories', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
    })
      .then(res => {
        console.log(res.data);

        setCateg(res.data);
        console.log(categ);
      })
      .catch(err => {
        console.log("err", err);
      })


      await axios.get('/users/recommendation-package-list', {
        headers: {
          'Authorization': 'Token' + ' ' + cookies.get('token')
        },
      })
        .then(res => {
          console.log(res.data);
  
          
          setFreeby(res.data);
        })
        .catch(err => {
          console.log("err", err);
        })






  }

  useEffect(() => {
    checkbtn();
  }, [onlinePack, offlinePack, eventPack])

  useEffect(() => {
    checkbtn();
  }, [isEvent, isOffline, isOnline])

  const checkbtn = (e) => {

    if (isEvent === true) {
      setArrM(eventPack);
     
    }
    else if (isOffline === true) {
      setArrM(offlinePack)
      
    }
    else if (isOnline === true) {
      setArrM(onlinePack)
    

    }
    else {
      let tp = [];
      tp.push(...onlinePack);
      tp.push(...offlinePack);
      tp.push(...eventPack);
      setArrM(tp);
    
    }
  }


  


  const onlineClick = (e) => {
    setIsOnline(true);
    setIsOffline(false);
    setIsEvent(false);
    setIsAll(false);
    setActiveCatId(0);
    setActiveBtn('Online')
     setOnlineNumArray([])
    setOnlineFArray([]);
    setOnlineCatArray([])
    setOnlineDurArray([])
    setOnlineInsArray([])
    setOnlineRatArray([])
    setOnlineFeatArray([]);
  }


  const clearAll =(e)=>{
    setOnlineNumArray([])
    setOnlineFArray([]);
    setOnlineCatArray([])
    setOnlineDurArray([])
    setOnlineInsArray([])
    setOnlineRatArray([])
    setOnlineFeatArray([]);
    if(isOffline){
      setArrM(arrLibFinal);
    }
    else{
      setArrM(arrFinal)
    }
  }


  const filterClick = (e) => {
    setIsFilterShow(true)
    if(arrM.length===0){
      if(isOffline){
        setArrM(arrLibFinal);
      }
      else{
        setArrM(arrFinal)
      }
    }
    console.log(isFilterShow)
    console.log("online :"+isOnline);
    console.log("offline :"+isOffline)
    // if(isOnline){
    //   setArrM(arrFinal);
    // }
    // else{
    //   console.log(arrLibFinal)
    //   setArrM(arrLibFinal)
    // }
    
    
  }
  const filterClose = (e) => {

    e.preventDefault();
    e.stopPropagation();
    setIsFilterShow(false)
    setHoverC(false)
    setOnlineFArray([]);

  }

  const onDClick = (e) => {
    console.log(e.target.className)
    setDes(e.target.className)
    e.preventDefault();
    e.stopPropagation();
    console.log("Dlcick")
    if (!showDesc)
      setShowDesc(true);
    else
      setShowDesc(false);

    return false;
  }

  const offlineClick = (e) => {
    setIsOnline(false);
    setIsOffline(true);
    setIsEvent(false);
    setIsAll(false);
    setActiveCatId(0);
    setActiveBtn('Offline')
     setOnlineNumArray([])
    setOnlineFArray([]);
    setOnlineCatArray([])
    setOnlineDurArray([])
    setOnlineInsArray([])
    setOnlineRatArray([])
    setOnlineFeatArray([]);
  }

  const eventClick = (e) => {
    setIsOnline(false);
    setIsOffline(false);
    setIsEvent(true);
    setIsAll(false);
    setActiveCatId(0);
    setActiveBtn('Events')
  }

  const allClick = (e) => {
    setIsOnline(false);
    setIsOffline(false);
    setIsEvent(false);
    setIsAll(true);
    setActiveCatId(0);
    setActiveBtn('all')
  }

  const onCatBtnClick = (e) => {
    setActiveCatId(e);
    console.log(e)
    let package_type = 'All'
    if (isOnline) {
      package_type = "Online Class"
    }
    else if (isOffline) {
      package_type = "Offline Class"
    }
    else if (isEvent) {
      package_type = "Event"
    }

    axios.get('/users/packages', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
    })
      .then(res => {
        console.log(res);

      })
      .catch(err => {
        console.log("err", err);
      })
  }



  const onApplyClick = (e) => {
    
    let tr=arrM;
    if(isOffline){
      tr=offlinePack;
    }

    if(onlineFeatArray.includes('Freebies')){
      tr=freeby;
    }

    var res = tr;
    if (onlineFArray.length > 0) {
      res = tr.filter(item => onlineFArray.includes(item.package_type))
      setArrM(res)
    }
    if(onlineFArray.includes('All')){
      res=tr;
    }
    console.log(res);
    let res1 = [];
    let timeArr = [];
    for (let j = 0; j < onlineNumArray.length; j++) {
      if (onlineNumArray[j] == 5) {
        timeArr.push({ min: 0, max: 5 });
      }
      if (onlineNumArray[j] == 10) {
        timeArr.push({ min: 5, max: 10 });
      }
      if (onlineNumArray[j] == 15) {
        timeArr.push({ min: 10, max: 15 });
      }
      if (onlineNumArray[j] == 20) {
        timeArr.push({ min: 15, max: 20 });
      }
      if (onlineNumArray[j] == 30) {
        timeArr.push({ min: 20, max: 30 });
      }
      if (onlineNumArray[j] == 31) {
        timeArr.push({ min: 30, max: 10000 });
      }
    }
    if (onlineFArray.length === 0) {
      res = tr;
    }
    for (let i = 0; i < res.length; i++) {
      for (let j = 0; j < timeArr.length; j++) {
        if (res[i].total_class >= timeArr[j].min && res[i].total_class < timeArr[j].max) {
          res1.push(res[i]);
        }
      }
    }

    console.log(res1);
    setIsFilterShow(false);
    console.log(onlineNumArray)
    if (onlineNumArray.length === 0) {
      console.log("PP")
      res1 = res;
    }
    setArrM(res1);
    console.log(res1)



    let res2 = []
    timeArr = [];
    for (let j = 0; j < onlineDurArray.length; j++) {
      if (onlineDurArray[j] == 5) {
        timeArr.push({ min: 0, max: 5 });
      }
      if (onlineDurArray[j] == 10) {
        timeArr.push({ min: 5, max: 10 });
      }
      if (onlineDurArray[j] == 30) {
        timeArr.push({ min: 10, max: 30 });
      }
      if (onlineDurArray[j] == 45) {
        timeArr.push({ min: 30, max: 45 });
      }
      if (onlineNumArray[j] == 60) {
        timeArr.push({ min: 45, max: 60 });
      }
      if (onlineNumArray[j] == 61) {
        timeArr.push({ min: 60, max: 100000 });
      }
    }
    for (let i = 0; i < res1.length; i++) {
      for (let j = 0; j < timeArr.length; j++) {
        if (res1[i].time_duration_in_days >= timeArr[j].min && res1[i].time_duration_in_days < timeArr[j].max) {
          res2.push(res1[i]);
        }
      }
    }


    setIsFilterShow(false);
    if (onlineDurArray.length === 0) {
      res2 = res1;
    }
    console.log(res2);
    console.log(res1);
    setArrM(res2);


    let res3 = [];

    if (onlineCatArray.length > 0) {
      res3 = res2.filter(item => onlineCatArray.includes(item.category_name))
      setArrM(res3)
    }
    else {
      res3 = res2;
    }


    let res4 = [];

    if (onlineInsArray.length > 0) {
      res4 = res3.filter(item => onlineInsArray.includes(item.main_master_name))
      setArrM(res4)
    }
    else {
      res4 = res3;
    }


    let res5 = [];

    if (onlineRatArray.length > 0) {
      
      
      res5 = res4.filter(item =>onlineRatArray.includes(item.rating))
      setArrM(res5)
    }
    else {
      res5 = res4;
    }





    // setOnlineNumArray([])
    // setOnlineFArray([]);
    // setOnlineCatArray([])
    // setOnlineDurArray([])
    // setOnlineInsArray([])

  }

  const onClassFilter = (e) => {
    console.log(e)
    let ta = onlineFArray;

    if (onlineFArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    }
    else {
      ta.push(e);
      console.log("1")
    }
    setOnlineFArray(ta);
    console.log(onlineFArray)
    return false;
  }


  const onFeatFilter = (e) => {
    console.log(e)
    let ta = onlineFeatArray;

    if (onlineFeatArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    }
    else {
      ta.push(e);
    }
    setOnlineFeatArray(ta);
    console.log(onlineFeatArray)
    return false;
  }

  const onRatFilter = (e) => {
    console.log(e)
    let ta = onlineRatArray;

    if (onlineRatArray.includes(e)) {
      if(e==3){
        ta.splice(ta.indexOf('3.5'), 1);
        ta.splice(ta.indexOf('2.5'), 1);
        ta.splice(ta.indexOf('2.0'), 1);
        ta.splice(ta.indexOf('1.5'), 1);
        ta.splice(ta.indexOf('1.0'), 1);
        ta.splice(ta.indexOf('0.5'), 1);
        ta.splice(ta.indexOf('0'), 1);
      }
      ta.splice(ta.indexOf(e), 1);
    }
    else {
      if(e==3){
        ta.push('3.5')
        ta.push('2.5')
        ta.push('2.0')
        ta.push('1.5')
        ta.push('1.0')
        ta.push('0.5')
        ta.push('0.0')
      }
      ta.push(e);

     
    }
    setOnlineRatArray(ta);
    console.log(onlineRatArray)
    return false;
  }



  const onCatFilter = (e) => {
    console.log(e);
    let ta = onlineCatArray;

    if (onlineCatArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    }
    else {
      ta.push(e);
    }
    setOnlineCatArray(ta);
    console.log(onlineCatArray)
    return false;

  }

  const onInsFilter = (e) => {
    console.log(e);
    let ta = onlineInsArray;

    if (onlineInsArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    }
    else {
      ta.push(e);
    }
    setOnlineInsArray(ta);
    console.log(onlineInsArray)
    return false;

  }


  const onNumClassFilter = (e) => {
    console.log(e)
    let ta = onlineNumArray;

    if (onlineNumArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    }
    else {
      ta.push(e);
    }
    setOnlineNumArray(ta);
    console.log(onlineNumArray)


    return false;
  }


  const onDurClassFilter = (e) => {
    console.log(e)
    let ta = onlineDurArray;

    if (onlineDurArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    }
    else {
      ta.push(e);
    }
    setOnlineDurArray(ta);
    console.log(onlineDurArray)


    return false;
  }







  const onHover = (e) => {
    setMapDisplay(false)
    setHover(true);
    setHoverD(true)
  }



  const onHoverColOff = (e, col) => {

    // setColor1(col.split(',')[0]);
    // setColor2(col.split(',')[1]);
    console.log("OO");
    setHoverC(false)
    setColId(-12);
  }

  const onHoverCol = (e, col) => {
    console.log(e);
    // console.log(col);
    if(col){
    setColor1(col.split(',')[0]);
    setColor2(col.split(',')[1]);
    }


    setHoverC(true);
    setColId(e);

    // console.log(HoverC+" "+colId)

  }


  const offHover = (e) => {
    setHover(false);
    setHoverD(false);
  }

  const elseLink = (e) => {
    console.log("None")
  }

  const locClick = (e) => {
    setMapDisplay(true);
  }



  // const setFav = (e) =>{
  //   e.preventDefault();

  //   axios({
  //     method: 'post',
  //     url: `users/add-favourite-package/${e.target.id}`,
  //     headers: {
  //       'Authorization': 'Token'+' '+cookies.get('token')
  //     },
  //   }).then(res => {      
  //     setTimeout(() => {
  //       window.location.reload()
  //     }, 2000);
  //     toast.success("added to favourite", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
  //     console.log(res.data, "addedd successfully");
  //   })
  //   .catch(err => {
  //     toast.error("There is an error", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000});
  //     console.log(err, "There is an error");
  //   })
  // }

  // const removeFav = (e) => {
  //   e.preventDefault();
  //   axios({
  //     method: 'delete',
  //     url: `users/remove-favourite-package/${e.target.id}`,
  //     headers: {
  //       'Authorization': 'Token'+' '+cookies.get('token')
  //     },
  //   }).then(res => {
  //     console.log(res.data, "removed successfully");    
  //     setTimeout(() => {
  //       window.location.reload()
  //     }, 2000);
  //     toast.warning("Removed from Favourite", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
  //   })
  //   .catch(err => {
  //     toast.error("There is an error", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
  //     console.log(err, "There is an error");
  //   })
  //   console.log("Clicked", e.target.id)
  // }




  const setBookmark = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    axios({
      method: 'post',
      url: `users/add-bookmark-package/${e.target.id}`,
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
    }).then(res => {
      setTimeout(() => {
        window.location.reload()
      }, 2000);
      toast.success("added to Bookmark", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
      console.log(res.data, "added successfully");
    })
      .catch(err => {
        toast.error("There is an error", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 });
        console.log(err, "There is an error");
      })
  }

  const removeBookmark = (e) => {
    e.preventDefault();
    axios({
      method: 'delete',
      url: `users/remove-bookmark-package/${e.target.id}`,
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
    }).then(res => {
      console.log(res.data, "removed successfully");
      setTimeout(() => {
        window.location.reload()
      }, 2000);
      toast.warning("Removed from Bookmarks", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
    })
      .catch(err => {
        toast.error("There is an error", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
        console.log(err, "There is an error");
      })
    console.log("Clicked", e.target.id)
  }









  const handleParentData = (value) => {
    setCheck(value)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Navbar value={check} handleData={handleParentData} />
      </AppBar>

      {check === 1 ?
        windowWidth < 918 ?
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
                <div>
                  <Link to="/home">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }} ><img onMouseOut={e => (e.currentTarget.src = 'Images/home.svg')} onMouseOver={e => (e.currentTarget.src = 'Images/home.svg')} id="icon" style={{ "height": "2.77vh" }} src='Images/home.svg' alt="classes" /></ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem" >
                  <Link to="/classes">
                    <button className="nbtn"  >
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/classes.svg' alt="classes" /> </ListItemIcon>
                        <ListItemText primary="Classes" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">

                  <Link to="/library">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/library.svg' alt="library" /></ListItemIcon>
                        <ListItemText primary="Library" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="">
                    <button className="nbtn" >
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/packages.svg' alt="packages" /></ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem  >
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="instructor">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/smeet.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="Influencers" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/subscription">
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="instructor">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/smeet.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="Biz Zone" />
                      </ListItem>
                    </button>
                  </Link>
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
                <div>
                  <Link to="/home">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }} ><img onMouseOut={e => (e.currentTarget.src = 'Images/home.svg')} onMouseOver={e => (e.currentTarget.src = 'Images/home.svg')} id="icon" style={{ "height": "2.77vh" }} src='Images/home.svg' alt="classes" /></ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem" >
                  <Link to="/classes">
                    <button className="nbtn"  >
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/classes.svg' alt="classes" /> </ListItemIcon>
                        <ListItemText primary="Classes" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">

                  <Link to="/library">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/library.svg' alt="library" /></ListItemIcon>
                        <ListItemText primary="Library" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/packages">
                    <button className="nbtn" >
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/packages.svg' alt="packages" /></ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem  >
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="instructor">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/smeet.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="Influencers" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/subscription">
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="instructor">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/smeet.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="Biz Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                
              </List>



            </div>
            <Toolbar />
          </Drawer>
        : <div></div>}
      <main className="my_activity_main">
        <div className='row noMargin noPadding top_menu_btn_sec_scss_class top_menu_activity'>
          <div className='col-12 top_menu_sec noPadding noMargin'>
            <Link to='/subscription' >
              <button className='topmenu_btn'><img className='topMenu_icon ' src='Images/subsA.svg' /> Subscriptions </button>
            </Link>

            <Link to='/my-schedule' >
              <button className='topmenu_btn'><img className='topMenu_icon' src='Images/mySchA.svg' /> My schedule </button>
            </Link>
            <button className='topmenu_btn active_menu'><img className='topMenu_icon' src='Images/myActA.svg' /> My activity </button>

            <Link to='/messaging' >
              <button className='topmenu_btn'><img className='topMenu_icon' src='Images/msgA.svg' />  Alerts and Messages </button>
            </Link>

            <Link to='/my-profile' >
              <button className='topmenu_btn'><img className='topMenu_icon' src='Images/myProA.svg' /> My Profile </button>
            </Link>
            <Link to='/forms' >
              <button className='topmenu_btn'><img className='topMenu_icon' src='Images/myActA.svg' /> Forms & Surveys </button>
            </Link>
          </div>
        </div>


        <div className="row noMargin noPadding btn_row" >
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 noMargin noPadding text-left button_margin_top" >
            {activeHead === 'Activities' ?
              <button onClick={() => setActiveHead('Activities')} className="common_btn blue_active">Activities</button>
              :
              <button onClick={() => setActiveHead('Activities')} className="common_btn not_active_btn">Activities</button>}

            {activeHead === 'Social' ?
              <button onClick={() => setActiveHead('Social')} className="common_btn blue_active margin_left_btn">Social Connect</button>
              :
              <button onClick={() => setActiveHead('Social')} className="common_btn not_active_btn margin_left_btn">Social Connect</button>}

            {activeHead === 'Gallery' ?
              <button onClick={() => setActiveHead('Gallery')} className="common_btn blue_active margin_left_btn">Gallery</button>
              :
              <button onClick={() => setActiveHead('Gallery')} className="common_btn not_active_btn margin_left_btn">Gallery</button>}
          </div>
          <div class={windowWidth < 768 ? "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 noMargin noPadding button_margin_top text-left" : "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 noMargin noPadding button_margin_top text-right"}>
            {activeCl === 'Library' ?
              <button onClick={() => setActiveCl('Library')} className="common_btn active_btn">Library</button>
              :
              <button onClick={() => setActiveCl('Library')} className="common_btn not_active_btn">Library</button>}

            {activeCl === 'Classes' ?
              <button onClick={() => setActiveCl('Classes')} className="common_btn active_btn margin_left_btn">Classes</button>
              :
              <button onClick={() => setActiveCl('Classes')} className="common_btn not_active_btn margin_left_btn">Classes</button>}

          </div>
        </div>

        {activeHead === 'Activities' && activeCl === 'Classes' ?
          <Activities title='Classes' />
          :
          <></>}
        {activeHead === 'Activities' && activeCl === 'Library' ?
          <Activities title='Library' />
          :
          <></>}


      </main>
    </div>
  );
}
