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
import './ClassesStyle.css';
import { Link, useHistory } from "react-router-dom";


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { toast } from "react-toastify";
import { Button, Modal, OverlayTrigger } from "react-bootstrap";
import { Popover, Tooltip } from "bootstrap";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));





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


const cookies = new Cookies();
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Simple tooltip
  </Tooltip>
);


export default function Classes(props) {

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

  const [showDesc, setShowDesc] = useState(false);
  const [des, setDes] = useState('');

  const [toEmails, setToEmails] = useState('');
  const [currUrl,setCurrUrl] =useState('');
  const [shareMsg, setShareMsg] = useState('')
  const [isCopy,setIsCopy] = useState('');
  
  const [instShow, setInstShow] = useState(false)
  const [profileShow, setProfileShow] = useState(false)
  const [checkVideoShow, setVideoShow] = useState(false)
  const [categoryShow, setCategoryShow] = useState(false)
  

  const instHandleClose = () => setInstShow(false);
  const instHandleShow = () => setInstShow(true);
  const profileHandleClose = () => setProfileShow(false);
  const profileHandleShow = () => setProfileShow(true);
  const categoryHandleShow = () => setCategoryShow(true);
  const categoryHandleClose = () => setCategoryShow(false);

  
  const [shareShow, setShareShow] = useState(false)
  const shareHandleShow = (pack) => {
    setShareShow(true);
    let id =pack.id
    console.log(window.location.href)
    
    let loginUrll = window.location.origin
    let curU=window.location.href+"/"+id;
    setCurrUrl(curU);
    
    let msg = `Enter your message here \nGood Day! \nPlease find this package ${curU} ${pack.name} ${pack.category_name} mode \nHope you find interesting and please join us here ${loginUrll} `;
    console.log(msg);
    setShareMsg(msg);

  }
  const shareHandleClose = () => {
    setShareShow(false);
    setIsCopy(false);
  }


  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
  const handleResize = (e) => {
    setWindowWidth(document.documentElement.clientWidth);
    console.log(document.documentElement.clientWidth)
  };
  useEffect(() => {
    if(windowWidth<920){
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
      else if (check === 'Online') {
        onlineClick();
      }
    }

    checkbtn();



  }, [activeBtn])




  const getImages = async () => {

    let totalArr = [];
    console.log(cookies.get('token'))


    await axios.get('/users/packages', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
      params: {
        package_type: "Online Class"
      },
    })
      .then(res => {
        console.log(res.data);
        let arr = res.data;
        setArrM(arr)
        setOnlinePack(arr)
      })
      .catch(err => {
        console.log("err", err);
      })

    await axios.get('/users/packages', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
      params: {
        package_type: "Offline Class"
      },
    })
      .then(res => {

        let arr = res.data;


        setOfflinePack(arr)


      })
      .catch(err => {
        console.log("err", err);
      })


    await axios.get('/users/packages', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
      params: {
        package_type: "Event"
      },
    })
      .then(res => {

        let arr = res.data;
        setEventPack(arr)
        totalArr.push(...eventPack);
      })
      .catch(err => {
        console.log("err", err);
      })






    let type='All';

    if(activeBtn==='Online'){
      type='Online Class'
    }
    else if(activeBtn==='Offline'){
      type='Offline Class'
    }
    else if(activeBtn==='Events'){
      type='Event'
    }


    await axios.get('/users/category-list-by-package-type', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
      params: {
        content_type: type
      },
    })
      .then(res => {
        // console.log(res.data);

        setCateg(res.data);
        console.log(res.data);
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

    axios.get('/users/class-package-filter', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
      params: {
        package_type: package_type,
        category_id: e
      },
    })
      .then(res => {
        console.log(package_type + " " + e);
        if (e == '0') {
          checkbtn();
        }
        else if (package_type == 'All') {
          let arr = [];
          console.log(res.data)
          arr.push(...res.data["Online Class"])
          arr.push(...res.data["Offline Class"])
          arr.push(...res.data["Event"])
          console.log(arr);
          setArrM(arr);
        }
        else {
          console.log(res.data)
          setArrM(res.data[package_type]); 
        }
      })
      .catch(err => {
        console.log("err", err);
      })
  }


  const onShareClick = (pack) => {

  
    let id= currUrl.slice(currUrl.length-1,currUrl.length);
    console.log(id);
    axios.post('/users/share-package',{
        mail_to:toEmails,
        message:shareMsg,
        package_url:currUrl,
        user:cookies.get("id"),
        package:id,

    }, {
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





  const onHover = (e) => {
    setMapDisplay(false)
    setHover(true);
    setHoverD(true)

  }
  const offHover = (e) => {
    setHover(false);
    setHoverD(false);
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
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/ClassesB.svg' alt="classes" /> </ListItemIcon>
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
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/packages.svg' alt="packages" /></ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem  >
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/instructor">
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
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/my-bizzone-main-page">
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
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/ClassesB.svg' alt="classes" /> </ListItemIcon>
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
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/packages.svg' alt="packages" /></ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem  >
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/instructor">
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
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/my-bizzone-main-page">
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
      <main className="class_main_class">

        <div className="class_top_sec_card card row noMargin">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding text-center">
            {isOnline === true ?
              <>
                <Link to={{ pathname: '/classes', checkS: { displayTitle: "" } }}>
                  <button onClick={allClick} className="class_not_active_btn class_common_btn class_all_btn" >All</button>
                </Link>

                {onlinePack.length > 0 ?
                  <Link to={{ pathname: '/classes', checkS: { displayTitle: "Online" } }}>
                    <button className="class_active_btn class_common_btn class_online_btn">Online</button>
                  </Link>
                  : <></>
                }
                {offlinePack.length > 0 ?
                  <Link to={{ pathname: '/classes', checkS: { displayTitle: "Offline" } }}>
                    <button onClick={offlineClick} className="class_not_active_btn class_common_btn class_offline_btn">Offline</button>
                  </Link>
                  : <></>
                }
                {eventPack.length > 0 ?
                  <Link to={{ pathname: '/classes', checkS: { displayTitle: "Events" } }}>
                    <button onClick={eventClick} className="class_not_active_btn class_common_btn class_events_btn">Events</button>
                  </Link>

                  : <></>
                }
              </>

              : isOffline === true ?
                <>
                  <Link to={{ pathname: '/classes', checkS: { displayTitle: "" } }}>
                    <button onClick={allClick} className="class_not_active_btn class_common_btn class_all_btn" >All</button>
                  </Link>
                  {onlinePack.length > 0 ?
                    <Link to={{ pathname: '/classes', checkS: { displayTitle: "" } }}>
                      <button onClick={onlineClick} className="class_not_active_btn class_common_btn class_online_btn">Online</button>
                    </Link>
                    : <></>}
                  {offlinePack.length > 0 ?
                    <Link to={{ pathname: '/classes', checkS: { displayTitle: "Offline" } }}>
                      <button className="class_active_btn class_common_btn class_offline_btn">Offline</button>
                    </Link>
                    : <></>}
                  {eventPack.length > 0 ?
                    <Link to={{ pathname: '/classes', checkS: { displayTitle: "Events" } }}>
                      <button onClick={eventClick} className="class_not_active_btn class_common_btn class_events_btn">Events</button>
                    </Link>
                    : <></>}

                </>
                : isAll === true ?
                  <>
                    <Link to={{ pathname: '/classes', checkS: { displayTitle: "" } }}>
                      <button className="class_active_btn class_common_btn class_all_btn">All</button>
                    </Link>
                    {onlinePack.length > 0 ?
                      <Link to={{ pathname: '/classes', checkS: { displayTitle: "Online" } }}>
                        <button onClick={onlineClick} className="class_not_active_btn class_common_btn class_online_btn">Online</button>
                      </Link>
                      : <></>}
                    {offlinePack.length > 0 ?
                      <Link to={{ pathname: '/classes', checkS: { displayTitle: "Offline" } }}>
                        <button onClick={offlineClick} className="class_not_active_btn class_common_btn class_offline_btn">Offline</button>
                      </Link>
                      : <></>}
                    {eventPack.length > 0 ?
                      <Link to={{ pathname: '/classes', checkS: { displayTitle: "Events" } }}>
                        <button onClick={eventClick} className="class_not_active_btn class_common_btn class_events_btn">Events</button>
                      </Link>
                      : <></>}

                  </>

                  :
                  <>
                    <Link to={{ pathname: '/classes', checkS: { displayTitle: "" } }}>
                      <button onClick={allClick} className="class_not_active_btn class_common_btn class_all_btn" >All</button>
                    </Link>
                    {onlinePack.length > 0 ?
                      <Link to={{ pathname: '/classes', checkS: { displayTitle: "Online" } }}>
                        <button onClick={onlineClick} className="class_not_active_btn class_common_btn class_online_btn">Online</button>
                      </Link>
                      : <></>}
                    {offlinePack.length > 0 ?
                      <Link to={{ pathname: '/classes', checkS: { displayTitle: "Offline" } }}>
                        <button onClick={offlineClick} className="class_not_active_btn class_common_btn class_offline_btn">Offline</button>
                      </Link>
                      : <></>}
                    {eventPack.length > 0 ?
                      <Link to={{ pathname: '/classes', checkS: { displayTitle: "Events" } }}>
                        <button className="class_active_btn class_common_btn class_events_btn">Events</button>
                      </Link>
                      : <></>}
                  </>
            }

          </div>
        </div>

        <div className="class_category_sec row noMargin">
          {activecatId === 0 ?
            <button onClick={() => onCatBtnClick(0)} className="class_active_cat_btn class_common_btn class_cat_common_btn">All</button>
            :
            <button onClick={() => onCatBtnClick(0)} className="class_not_active_cat_btn class_common_btn class_cat_common_btn">All</button>
          }

          {categ.length > 0 ? categ.map((item) =>
            activecatId === item.id ?
              <button onClick={() => onCatBtnClick(item.id)} className="class_active_cat_btn class_common_btn class_cat_common_btn">{item.name} </button>
              :
              <button onClick={() => onCatBtnClick(item.id)} className="class_not_active_cat_btn class_common_btn class_cat_common_btn">{item.name} </button>

          )
            :
            <>
            </>

          }
        </div>


        <div className="cards_sec">
          <div className="row noMargin">
            {arrM.length !== 0 ? arrM.map((item) => (
              item.image_one !== undefined ?
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 class_card_main_div">
                  <Link style={{ textDecoration: "none" }} to={{
                    pathname: `/class/${item.id}`,
                    checkS: { activeBtn,"displayTitle": item.package_type.split(' ')[0] },
                    id: item.id,
                  }}>
                    <div className="card class_cards">
                      <div className="class_card_head">
                        <div className="class_card_header_sec">
                          {item.image_one !== null ?
                            <img className="class_card-img-top" alt="img" src={item.image_one}/>
                            :
                            <img className="class_card-img-top"alt="img" src='/Images/default-banner.png'/>
                          }
                          <img onMouseOver={onHover} onMouseOut={offHover} className="class_card_absolute_first_img" src={item.category_icon} alt="icon" />
                          <div className="class_hover_category_name">
                            <span className="class_cat_name_hover"> {item.category_name}</span>
                          </div>
                          {item.is_bookmark ?
                            <img className="class_card_absolute_sec_img" src="/Images/Frame 50.png" id={item.id} onClick={removeBookmark} alt="icon" />
                          :
                            <img className="class_card_absolute_sec_img" src="/Images/bookmark-nan.svg" id={item.id} onClick={setBookmark} alt="icon" />
                          }
                        </div>
                      </div>
                      <div className="class_card_body row noMargin">
                        <h4 className="class_card-title">{item.name}</h4>
                        <div className="class_module_description">
                          <a value={item.description} className={item.description} onClick={onDClick} href="">{item.description && item.description.length > 50 ? (item.description + "").slice(0, 50) + "...  " : item.description}</a>
                        </div>
                      </div>
                      <div className="class_modal_footer row noMargin">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 noPadding text-left">
                          <img className="card_footer_icons" src="/Images/Vector (2).png" alt="icon" /> 
                          <span className="class_card_footer_span">
                            {item.total_class !== null ?
                              <> {item.total_class} classes </>
                            :
                              <> {item.time_duration_in_days} days </>
                            }
                          </span>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-3 noPadding text-center">
                          <img className="card_footer_icons" src="/Images/heart.svg" alt="icon" id={item.id} /> 
                          <span className="class_card_footer_span"> {item.like_count}</span>
                        </div>
                        <div   className="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-3 noPadding text-right">
                          <img onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            shareHandleShow(item);
                            return false;
                          } } className="card_footer_icons" src="/Images/Vector (4).png" alt="icon" /> 
                          <span className="class_card_footer_span"> {item.share_count}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                : <div></div>
            ))
              : <></>
            }
          </div>
        </div>



        {showDesc ?
          <div className="class_desc_model" style={{ backgroundColor: "white" }}>

            <div className="class_header_sec_desc row noMargin">
              <div className="class_popup_desc col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding">
                Description
              </div>
              <div className="popup_close col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding text-right">
                <button className="class_close_btn" onClick={onDClick}  >Close</button>
              </div>
            </div>
            <div className="body_sec_desc row noMargin">
              <div className="class_desc_div"> {des}</div>
            </div>
          </div>
          // </div>

          : <></>
        }

         {/* share model */}
         <Modal show={shareShow}
          onHide={shareHandleClose}
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
          centered>
          <Modal.Header className="single_cls_header_sec_desc" closeButton>
            <Modal.Title className="single_cls_popup_desc">Share This Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="single_cls_scss_inst_sec">
              <div className="row noMargin noPadding">
                <div className="row noMargin noPadding">
                  <div className="col-xl-10 col-lg-10 col-md-11 col-sm-10 col-10 noPadding">
                    <span className="single_class_pro_tail_heads noPadding">Share wellness package with your contacts</span>
                    <div className="row noMargin noPadding mail_sec">
                      <div className="col-xl-2 col-lg-2 col-md-1 col-sm-2 col-2 text-right" style={{ display: "grid" }}>
                        <span className="align_self_center">To</span>
                      </div>
                      <div className="col-xl-10 col-lg-10 col-md-11 col-sm-10 col-10 noPadding text-left">
                        <input type="text" className="form-control enter_mail_id" placeholder="Enter  ','  separated email Ids here" onChange={(e)=>{setToEmails(e.target.value)}} />
                      </div>
                      <div className="col-xl-10 offset-xl-2 col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-10 offset-sm-2 col-10 offset-2 noPadding text-left">
                        <textarea rows="5" className="form-control enter_text" placeholder="Enter your message here" value={shareMsg} onChange={(e)=>setShareMsg(e.target.value)} ></textarea>
                      </div>
                      <div className="col-xl-10 offset-xl-2 col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-10 offset-sm-2 col-10 offset-2 noPadding text-left">
                        <button onClick={onShareClick} className="mail_share_btn">Share</button>
                      </div>
                      <div className="col-xl-10 offset-xl-2 col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-10 offset-sm-2 col-10 offset-2 noPadding text-left">
                        <div className="row noMargin noPadding mail_sec">
                          <div className="col-xl-3 col-lg-2 col-md-3 col-sm-3 col-3 text-left noPadding" style={{ display: "grid" }}>
                            <span className="align_self_center">Or Copy Link</span>
                          </div>
                          <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 noPadding text-left">
                            <div class="input-group copy_link_grp">
                              <input type="text" className="form-control copy_link" value={currUrl} aria-describedby="basic-addon2" />
                              <div class="input-group-append">
                                <span style={{cursor:"pointer"}}  class="input-group-text copy_img_span" id="basic-addon2">
                                  
                                  {!isCopy ?
                                  <img onClick={() => {
                                    navigator.clipboard.writeText(currUrl)
                                    setIsCopy(true);
                                    }} className="copy_link_img" src="/Images/copy-link.svg" />
                                    :
                                    <span style={{color:"#03cbc9",fontSize:"1.8vh"}}>Link Copied !</span>
                                  }

                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-1 col-sm-2 col-2 noPadding text-center">
                    <div className="mail_img_div">
                      {/* <img className="share_mail_img align_self_center" src="/Images/share_mail_img.png" style={{ display: "block" }}></img> */}
                     <button style={{background:"none",borderRadius:"50px",borderColor:"#03cbc9",height:"55px",width:"55px"}}> <img style={{height:"20px"}} className="share_mail_img align_self_center" src="/Images/mailE.svg"></img> </button>
                     <p style={{paddingLeft:"6px",color:"#03cbc9"}}>Email</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>


      </main>
    </div>
  );
}
