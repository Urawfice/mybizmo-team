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
import './PackageStyle.css';
import { Link, useHistory } from "react-router-dom";


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { toast } from "react-toastify";
import { Button, OverlayTrigger } from "react-bootstrap";
import { Popover, Tooltip } from "bootstrap";






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
    width: "100%",
    height: "auto",
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
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Simple tooltip
  </Tooltip>
);


export default function Package(props) {

  const classes = useStyles();
  const classes1 = useStyles1();
  const [check, setCheck] = useState(1);
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
  const [onlineFArray, setOnlineFArray] = useState([]);
  const [onlineNumArray, setOnlineNumArray] = useState([]);
  const [onlineCatArray, setOnlineCatArray] = useState([]);
  const [onlineDurArray, setOnlineDurArray] = useState([]);
  const [onlineInsArray, setOnlineInsArray] = useState([]);
  const [instruct, setInstruct] = useState([]);

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
    else {
      setCheck(1);
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


    await axios.get('/users/package-list-by-content', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
      params: {
        package_type: "Classes"
      },
    })
      .then(res => {
        console.log(res.data);
        let arr = res.data;
        let tar = [];
        arr.map((item) =>{
          if(!tar.includes(item.main_master_name))
            tar.push(item.main_master_name);
        })
        setInstruct(tar);
        console.log(instruct)
        setArrM(arr)
        
        setArrFinal(arrM)
        setOnlinePack(arr)
      })
      .catch(err => {
        console.log("err", err);
      })


    await axios.get('/users/package-list-by-content', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
      params: {
        package_type: "Library"
      },
    })
      .then(res => {
        console.log(res.data);
        let arr = res.data;

        setOfflinePack(arr)
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
      setArrFinal(arrM)
    }
    else if (isOffline === true) {
      setArrM(offlinePack)
      setArrFinal(arrM)
    }
    else if (isOnline === true) {
      setArrM(onlinePack)
      setArrFinal(arrM)

    }
    else {
      let tp = [];
      tp.push(...onlinePack);
      tp.push(...offlinePack);
      tp.push(...eventPack);
      setArrM(tp);
      setArrFinal(arrM)
    }
  }


  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );


  const onlineClick = (e) => {
    setIsOnline(true);
    setIsOffline(false);
    setIsEvent(false);
    setIsAll(false);
    setActiveCatId(0);
    setActiveBtn('Online')
  }


  const filterClick = (e) => {
    setIsFilterShow(true)
    setArrM(arrFinal);
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
    var res = arrM;
    if (onlineFArray.length > 0) {
      res = arrM.filter(item => onlineFArray.includes(item.package_type))
      setArrM(res)
    }
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
    if(onlineFArray.length===0){
      res=arrFinal;
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
    if(onlineNumArray.length===0) {
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


    let res3=[];

    if (onlineCatArray.length > 0) {
      res3 = res2.filter(item => onlineCatArray.includes(item.category_name))
      setArrM(res3)
    }
    else{
      res3=res2;
    }


    let res4=[];

    if (onlineInsArray.length > 0) {
      res4 = res3.filter(item => onlineInsArray.includes(item.main_master_name))
      setArrM(res4)
    }
    else{
      res4=res3;
    }







    setOnlineNumArray([])
    setOnlineFArray([]);
    setOnlineCatArray([])
    setOnlineDurArray([])
    setOnlineInsArray([])

  }

  const onClassFilter = (e) => {
    console.log(e)
    // if(e==='All'){
    //   return false;
    // }
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



  const onCatFilter = (e) =>{
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

  const onInsFilter = (e) =>{
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

    setColor1(col.split(',')[0]);
    setColor2(col.split(',')[1]);

    setHoverC(false)
    setColId(-1);
  }

  const onHoverCol = (e, col) => {
    // console.log(e);
    // console.log(col);
    setColor1(col.split(',')[0]);
    setColor2(col.split(',')[1]);


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
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/packages.svg' alt="packages" /></ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem  >
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="clasess">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
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
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/packages.svg' alt="packages" /></ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem  >
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="clasess">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
              </List>



            </div>
          </Drawer>
        : <div></div>}
      <main className={classes.content}>
        <Toolbar />
        <div className="topBtn topBtnPc" >





          <span className="packagesTil"> Package</span>
          {isOnline === true ?
            <>
              <Link to={{ pathname: '/packages', checkS: { displayTitle: "Online" } }}><button onClick={onlineClick} className="btn2 ">Classes</button></Link>
              <Link to={{ pathname: '/packages', checkS: { displayTitle: "Offline" } }}><button onClick={offlineClick} className="btnMe btnMePc">Library</button></Link>
            </>
            :
            <></>}

          {isOffline === true ?
            <>
              <Link to={{ pathname: '/packages', checkS: { displayTitle: "Online" } }}><button onClick={onlineClick} className="btnMe btnMePc ">Classes</button></Link>
              <Link to={{ pathname: '/packages', checkS: { displayTitle: "Offline" } }}><button onClick={offlineClick} className="btn2">Library</button></Link>
            </>
            :
            <></>}


          <button onClick={filterClick} className="filterPc btnMe btnMePc">
            <img className="filterIc" src="/Images/filter.svg" />
            Filters
          </button>

        </div>


        <div classname="classCon" id="cl">

          <Grid container spacing={3}>

            {arrM.length !== 0 ? arrM.map((item) => (
              item.image_one !== undefined ?


                <div className="boxCard inx conwid boxCardSz boxCardPc" onMouseOver={() => onHoverCol(item.id, item.package_color)} onMouseOut={() => onHoverColOff(item.id, item.package_color)}

                  style={(HoverC && colId === item.id) ? { "backgroundImage": `url('/Images/Rect17.png'),url('/Images/Rect18.png'),linear-gradient(104.31deg, ${color1} 0%  , ${color2} 90%)` } : { "backgroundImage": `url('/Images/Rect17.png'),url('/Images/Rect18.png')` }}
                //  style={{  "backgroundImage":`url('http://localhost:3000/Images/Rectangle\ 17.png'),url('http://localhost:3000/Images/Rectangle\ 18.svg'),linear-gradient(104.31deg, #FF6343 4.26%, ${item.package_color} 135.08%) `}}  
                >



                  {/* <Link  onClick={ isFilterShow ?  e => e.preventDefault() : elseLink }   style={{textDecoration:"none"}} to ={
              isFilterShow ?
              {
              pathname:`/packages`,
              checkS:{activeBtn},
              id: item.id,
            }:
            {
              pathname:`/class/${item.id}`,
              checkS:{activeBtn},
              id: item.id,
            }
          
          }> */}
                  <div className="containerI  contISz contPc"   >
                    <button className="horCatBtn horCatBtnPc">
                      <img src={item.category_icon} alt="I" height="2.077vh" style={{ borderRadius: "10px" }} />
                      {item.category_name}
                    </button>

                    <button className="horAdvBtn horAdvBtnPc">{item.level}</button>
                    <button className="horEngBtn horEngBtnPc ">{item.language}</button>

                    {item.is_bookmark ?
                      <img className="fa2 fa2Pc" src="/Images/Frame 50.png" id={item.id} onClick={removeBookmark} alt="icon" />
                      :
                      <img className="fa2 fa2Pc" src="/Images/bookmarkBl.svg" id={item.id} onClick={setBookmark} alt="icon" />
                    }





                    <div className="namePc" >{item.name}</div>
                    <div className="clshrPc" >{item.total_class} classes | 2 hours
                      <span className="lkshPc" >{item.like_count} likes | {item.share_count} shares</span>
                    </div>

                    <div className="ratePc" >Package Rate</div>
                    <div className="authPc">Author/ Instructor</div>
                    <div className="pricePc" ><i class="fa fa-inr"></i> {item.price}</div>
                    <div className="authnamePc"> {item.main_master_name} </div>












                    {isFilterShow ?
                      <div className="overlay-filter" >
                        <div className="inFilter">Filters</div>
                        <div className="packCl">

                          <button className="cls-Btn" onClick={filterClose}  >Close</button>

                        </div>
                        <div className="claType">Class Type</div>
                        <div className="tp-con">
                          <button className="tp-option tp-all" style={{ width: "100px", background: "none", border: "none" }}>
                            {onlineFArray.includes("All") ?
                              <img src="/Images/checked.svg" style={{ height: "15px", float: "left", marginTop: "11px" }} onClick={() => onClassFilter("All")} />
                              :
                              <img src="/Images/uncheck.svg" style={{ height: "15px", float: "left", marginTop: "11px" }} onClick={() => onClassFilter("All")}  ></img>
                            }


                            All</button>
                          <button className="tp-option tp-on" style={{ width: "100px", background: "none", border: "none" }}>
                            {onlineFArray.includes("Online Class") ?
                              <img src="/Images/checked.svg" style={{ height: "15px", float: "left", marginTop: "11px" }} onClick={() => onClassFilter("Online Class")} />
                              :
                              <img src="/Images/uncheck.svg" style={{ height: "15px", float: "left", marginTop: "11px" }} onClick={() => onClassFilter("Online Class")}  ></img>
                            }

                            Online
                          </button>
                          <button className="tp-option tp-off"  style={{ width: "100px", background: "none", border: "none" }}>
                            {onlineFArray.includes("Offline Class") ?
                              <img src="/Images/checked.svg" style={{ height: "15px", float: "left", marginTop: "11px" }} onClick={() => onClassFilter("Offline Class")} />
                              :
                              <img src="/Images/uncheck.svg" style={{ height: "15px", float: "left", marginTop: "11px" }} onClick={() => onClassFilter("Offline Class")}  ></img>
                            }
                            Offline</button>
                          <button className="tp-option tp-evn" style={{ width: "100px", background: "none", border: "none" }}>
                          {onlineFArray.includes("Event") ?
                              <img src="/Images/checked.svg" style={{ height: "15px", float: "left", marginTop: "11px" }} onClick={() => onClassFilter("Event")} />
                              :
                              <img src="/Images/uncheck.svg" style={{ height: "15px", float: "left", marginTop: "11px" }} onClick={() => onClassFilter("Event")}  ></img>
                            }
                            
                            Event</button>

                        </div>
                        <div className="claType wellnessCat">Wellness Category</div>
                        <div className="catPc" >
                          {categ && categ.map((item) =>(
                              <button onClick={()=> onCatFilter(item.name) } className="indCat">
                              {onlineCatArray.includes(item.name) ?
                              <button style={{ background: item.color.split(',')[0] }} className="outCrl">
                                <button style={{ background: item.color.split(',')[1]  }} className="inCrl">
                                  &nbsp;
                                </button>
                              </button>
                              :
                              <button  className="outCrl">
                                <button  className="inCrl">
                                  &nbsp;
                                </button>
                              </button>

                              }
                              {item.name}
                            </button>
                          )) }
                          
                          
                          

                        </div>




                        {/* <div className="claType wellnessCat scCat">Sub Category</div>
                        <div className="catPc" >

                          <button className="indCat"  >
                            <input className="scInp" type="checkbox"></input>
                            Sukhasana
                          </button>
                          <button className="indCat">
                            <input className="scInp" type="checkbox"></input>
                            Naukasana
                          </button>
                          <button className="indCat">
                            <input className="scInp" type="checkbox"></input>
                            Sukhasana
                          </button>
                          <button className="indCat">
                            <input className="scInp" type="checkbox"></input>
                            Naukasana
                          </button>

                        </div> */}


                        <div className="claType wellnessCat scCat">No. of Classes</div>
                        <div className="catPc" >

                          <button className={onlineNumArray.includes(5) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onNumClassFilter(5)} >

                            Less than 5
                          </button>
                          <button className={onlineNumArray.includes(10) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onNumClassFilter(10)}>

                            5 - 10
                          </button>
                          <button className={onlineNumArray.includes(15) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onNumClassFilter(15)}>

                            10 - 15
                          </button>
                          <button className={onlineNumArray.includes(20) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onNumClassFilter(20)}>

                            15 -20
                          </button>
                          <button className={onlineNumArray.includes(30) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onNumClassFilter(30)}>

                            20 - 30
                          </button>
                          <button className={onlineNumArray.includes(31) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onNumClassFilter(31)}>

                            More than 30
                          </button>

                        </div>



                        <div className="claType wellnessCat scCat">Duration in Days</div>
                        <div className="catPc" >

                          <button className={onlineDurArray.includes(5) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onDurClassFilter(5)} >

                            Below 5
                          </button>
                          <button className={onlineDurArray.includes(10) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onDurClassFilter(10)}>

                            5 - 10
                          </button>
                          <button className={onlineDurArray.includes(30) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onDurClassFilter(30)}>

                            10 - 30
                          </button>
                          <button className={onlineDurArray.includes(45) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onDurClassFilter(45)}>

                            30 - 45
                          </button>
                          <button className={onlineDurArray.includes(60) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onDurClassFilter(60)}>

                            45 - 60
                          </button>
                          <button className={onlineDurArray.includes(61) ? "indCat numClas incl" : "indCat numClas"} onClick={() => onDurClassFilter(61)}>

                            More than 60
                          </button>

                        </div>



                        <div className="claType wellnessCat scCat">Instructors/ Masters</div>
                        <div className="catPc MasScl" >
                        {instruct && instruct.map((item) =>(
                            <button className="indCat MasIns"   >
                            {onlineInsArray.includes(item) ?
                              <img src="/Images/checked.svg" style={{ height: "15px", float: "left", marginTop: "2px",paddingRight:"10px" }} onClick={() => onInsFilter(item)} />
                              :
                              <img src="/Images/uncheck.svg" style={{ height: "15px", float: "left", marginTop: "2px",paddingRight:"10px" }} onClick={() => onInsFilter(item)}  ></img>
                            }
                            {item}
                          </button>
                        ))}
                          
                          

                        </div>





                        <div className="claType wellnessCat scCat">Star Rating</div>
                        <div className="catPc" >

                          <button className="indCat numClas"  >

                            5
                          </button>
                          <button className="indCat numClas">

                            4.5
                          </button>
                          <button className="indCat numClas">

                            5
                          </button>
                          <button className="indCat  numClas">

                            Less than 4
                          </button>
                        </div>


                        <div className="claType wellnessCat scCat">Featured</div>
                        <div className="catPc" >

                          <button className="indCat numClas"  >

                            Most Liked
                          </button>
                          <button className="indCat numClas">

                            Most Shared
                          </button>
                          <button className="indCat numClas">

                            Freebies
                          </button>

                        </div>



















                        <div>
                          <button onClick={onApplyClick} style={{ marginTop: "30px", borderRadius: "8px" }} className="btn2">Apply</button>
                          <button className="btnClr"> Clear All</button>
                        </div>



                      </div>
                      :
                      <></>
                    }



                  </div>


                  {/* </Link> */}
                </div>

                : <div></div>
            ))
              : <></>
            }

          </Grid>
        </div>


      </main>
    </div>
  );
}
