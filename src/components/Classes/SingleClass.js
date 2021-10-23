import React, { useState, useEffect, useRef } from "react";
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
import './SingleClass.scss';
import { Link, useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import SliderImg from "../Slider/Slider";
import SliderOne from "./SliderOne";
import { Button, Modal, Popover } from "react-bootstrap"
import { RatingView, Rating } from 'react-simple-star-rating'




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


export default function SingleClass(props) {

  const classes = useStyles();
  const classes1 = useStyles1();
  const [check, setCheck] = useState(2);
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
  const [categ, setCateg] = useState([]);
  const [singlepackage, setSinglePackage] = useState();
  const [showIns, setShowIns] = useState(false);
  const [showMaster, setShowMaster] = useState(false);
  const [arr, setArr] = useState(['1', '2']);
  const [eventShow, setEventShow] = useState([]);
  const [showDesc, setShowDesc] = useState(false);
  const [des, setDes] = useState('');
  const [disC, setDisC] = useState("");
  const [showDisC, setShowDis] = useState("");
  const [rating, setRating] = useState(0)
  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

  const [toEmails, setToEmails] = useState('');
  const [currUrl, setCurrUrl] = useState('');
  const [shareMsg, setShareMsg] = useState('')
  const [isCopy, setIsCopy] = useState('');
  const [insClickDat,setinsClickDat] = useState();

  const modalRef = useOnClickOutsideRef(() => {
    setShowDis(false)
    setShowMaster(false)
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


  const handleResize = (e) => {
    setWindowWidth(document.documentElement.clientWidth);

  };


  const [instShow, setInstShow] = useState(false)
  const [profileShow, setProfileShow] = useState(false)
  const [checkVideoShow, setVideoShow] = useState(false)
  const [categoryShow, setCategoryShow] = useState(false)
  const [shareShow, setShareShow] = useState(false)


  const videoHandleClose = () => setVideoShow(false);
  const videoHandleShow = (e) => {
    setVideoShow(true);
    setEventShow(e);
    // setShowMaster(true);
  }

  const [couponList, setCouponList] = useState([]);
  const [actCoupon, setActCoupon] = useState('');
  const [appliedCoupon, setApplyCoupon] = useState('');
  const [verified, setVerified] = useState(false);

  const instHandleClose = () => setInstShow(false);
  const instHandleShow = () => setInstShow(true);
  const profileHandleClose = () => setProfileShow(false);
  const profileHandleShow = () => setProfileShow(true);
  const categoryHandleShow = () => setCategoryShow(true);
  const categoryHandleClose = () => setCategoryShow(false);
  const shareHandleShow = () => setShareShow(true);
  const shareHandleClose = () => {
    setShareShow(false);
    setIsCopy(false);
  }





  useEffect(() => {
    if (windowWidth < 920) {
      setCheck(2);
    }


  }, [windowWidth])






  useEffect(() => {
    window.addEventListener("resize", handleResize);
    getImages();
    console.log(props.location)



    if (props.location.checkS !== undefined) {
      let check = props.location.checkS.displayTitle;
      if (check === undefined) {
        check = props.location.checkS.activeBtn;
      }
      console.log(check)
      if (check === 'Offline') {
        offlineClick();
      }
      else if (check === 'Event') {
        eventClick();
      }
      else if (check === 'Online') {
        onlineClick();
      }
    }







  }, [])

  const getImages = async () => {

    let totalArr = [];
    let id = 1;
    console.log(props.match.params.id);
    if (props.match.params.id !== undefined) {
      id = props.match.params.id;

    }
    console.log(cookies.get('token'))

    await axios.get('/users/packages/' + id, {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
    })
      .then(res => {
        console.log(res);

        setSinglePackage(res.data);
        console.log(window.location.href)
        setCurrUrl(window.location.href);
        let loginUrll = window.location.origin
        let msg = `Enter your message here \nGood Day! \nPlease find this package ${currUrl} ${res.data.name} ${res.data.category_name} mode \nHope you find interesting and please join us here ${loginUrll} `;
        console.log(msg);
        setShareMsg(msg)

      })
      .catch(err => {
        console.log("err", err);
      })



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

      })
      .catch(err => {
        console.log("err", err);
      })


    await axios.get('/users/coupon-list', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
    })
      .then(res => {

        setCouponList(res.data.coupons);
        console.log(res.data.coupons);
        console.log(couponList);

      })
      .catch(err => {
        console.log("err", err);
      })

    await axios.get('/auth/check-email-phone-verification', {
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
    })
      .then(res => {

        console.log(res.data)
        if (res.data.email_verify && res.data.phone_verify) {
          setVerified(true);
        }
        else {
          setVerified(false);
        }

      })
      .catch(err => {
        console.log("err", err);
      })
  }


  const handleRating = (rate, id) => {
    setRating(rate)
    console.log(rate)
    axios.post(`users/master-rating/` + id, {
      rating: rate
    },

      {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        }
      },
    )
      .then((res) => {
        toast.success("Successfully Rated", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // toast.warning("Some error occured", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
      });
    // Some logic
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

  const onChecked = (e) => {
    console.log(e);

  }


  const onDisClick = (e) => {
    // e.preventDefault();
    // e.stopPropagation();

    setTimeout(() => {
      if (showDisC) {
        setShowDis(false);
        setShowMaster(false)
      }
      else {
        setShowDis(true);
      }
      setDisC(e)
      console.log("A");
      console.log(showDisC)

    }, 1);



  }

const closeDis = (e) => {
  e.preventDefault();
  setShowDis(false);
  setShowMaster(false)
}
  const onApplyCoupon = (e) => {

    console.log(actCoupon)
    console.log(couponList)
    let check = 0;
    for (let i = 0; i < couponList.length; i++) {
      if (actCoupon === couponList[i].code) {
        check = 1;
        setApplyCoupon(actCoupon);
        break;
      }
    }
    if (check === 1) {
      toast.success("Succesfully applied Coupon", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 });
    }
    else {
      toast.warning("Invalid Coupon", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
    }
  }





  const onlineClick = (e) => {
    setIsOnline(true);
    setIsOffline(false);
    setIsEvent(false);
    setIsAll(false);

  }

  const offlineClick = (e) => {
    setIsOnline(false);
    setIsOffline(true);
    setIsEvent(false);
    setIsAll(false);

  }

  const eventClick = (e) => {
    setIsOnline(false);
    setIsOffline(false);
    setIsEvent(true);
    setIsAll(false);
    console.log("A");


  }

  const allClick = (e) => {
    setIsOnline(false);
    setIsOffline(false);
    setIsEvent(false);
    setIsAll(true);
  }

  const onShowIns = (e) => {
    setShowIns(true);
  }
  const onCloseIns = (e) => {
    setShowIns(false);
  }


  const onShowMaster = (e) => {
    setEventShow(e);
    setShowMaster(true);
  }
  const onCloseMaster = (e) => {
    setShowMaster(false);
  }


  const onShareClick = (e) => {
    let id = currUrl.slice(currUrl.length - 1, currUrl.length);
    console.log(id);
    axios.post('/users/share-package', {
      mail_to: toEmails,
      message: shareMsg,
      package_url: currUrl,
      user: cookies.get("id"),
      package: id,

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



  const setBookmark = (e) => {
    // e.preventDefault();
    console.log("bookmark", e);
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


  const setLike = (e) => {

    console.log(e);
    axios({
      method: 'post',
      url: `users/add-like-package/${e}`,
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
    }).then(res => {
      setTimeout(() => {
        window.location.reload()
      }, 2000);
      toast.success("Liked", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
      console.log(res.data, "Liked successfully");
    })
      .catch(err => {
        toast.error("There is an error", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 });
        console.log(err, "There is an error");
      })
  }

  const removeLike = (e) => {
    // console.log(e.target)
    axios({
      method: 'delete',
      url: `users/remove-like-package/${e}`,
      headers: {
        'Authorization': 'Token' + ' ' + cookies.get('token')
      },
    }).then(res => {
      console.log(res.data, "removed successfully");
      setTimeout(() => {
        window.location.reload()
      }, 2000);
      toast.warning("Removed from Likes", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
    })
      .catch(err => {
        toast.error("There is an error", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
        console.log(err, "There is an error");
      })
    console.log("Clicked", e)
  }

  const removeBookmark = (e) => {
    e.preventDefault();
    // console.log("bookmakr  remo",  e.target.id)
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
    console.log("Clicked", e)
  }






  const checkEndTime = (et,event) => {
    const endTime = new Date(new Date().toDateString() + ' ' + et)
    const currentTime = new Date();
    // console.log(endTime+" "+currentTime)

    return !event.finished;

    if (endTime < currentTime) {
      return false;
    }
    else {
      return true;
    }
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
                        <ListItemIcon style={{ minWidth: '2.27vw' }} ><img onMouseOut={e => (e.currentTarget.src = '/Images/home.svg')} onMouseOver={e => (e.currentTarget.src = '/Images/home.svg')} id="icon" style={{ "height": "2.77vh" }} src='/Images/home.svg' alt="classes" /></ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem" >
                  <Link to="/classes">
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/ClassesB.svg' alt="classes" /> </ListItemIcon>
                        <ListItemText primary="Classes" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">

                  <Link to="/library">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/library.svg' alt="library" /></ListItemIcon>
                        <ListItemText primary="Library" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/packages">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/packages.svg' alt="packages" /></ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem  >
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/instructor">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/smeet.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="Influencers" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/subscription">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/my-bizzone-main-page">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/smeet.svg' alt="zone" /></ListItemIcon>
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
                        <ListItemIcon style={{ minWidth: '2.27vw' }} ><img onMouseOut={e => (e.currentTarget.src = '/Images/home.svg')} onMouseOver={e => (e.currentTarget.src = '/Images/home.svg')} id="icon" style={{ "height": "2.77vh" }} src='/Images/home.svg' alt="classes" /></ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem" >
                  <Link to="/classes">
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/ClassesB.svg' alt="classes" /> </ListItemIcon>
                        <ListItemText primary="Classes" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">

                  <Link to="/library">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/library.svg' alt="library" /></ListItemIcon>
                        <ListItemText primary="Library" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/packages">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/packages.svg' alt="packages" /></ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem  >
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/instructor">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/smeet.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="Influencers" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/subscription">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/my-bizzone-main-page">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/smeet.svg' alt="zone" /></ListItemIcon>
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
      <main className="single_cls_main_class" style={{ marginTop: "50px" }}>
        <div className="single_library_top_sec_card card row noMargin">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding text-center">
            {isOnline === true ?
              <>
                <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "" } }}> <button onClick={allClick} className="single_lib_not_active_btn single_lib_common_btn single_lib_all_btn" >All</button></Link>

                {onlinePack.length > 0 ?
                  <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "Online" } }}> <button className="single_lib_active_btn single_lib_common_btn single_lib_audio_btn">Online</button></Link>
                  : <></>}
                {offlinePack.length > 0 ?
                  <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "Offline" } }}><button onClick={offlineClick} className="single_lib_not_active_btn single_lib_common_btn single_lib_video_btn">Offline</button></Link>
                  : <></>}
                {eventPack.length > 0 ?
                  <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "Events" } }}><button onClick={eventClick} className="single_lib_not_active_btn single_lib_common_btn">Events</button></Link>

                  : <></>}



              </>

              : isOffline === true ?
                <>
                  <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "" } }}><button onClick={allClick} className="single_lib_not_active_btn single_lib_common_btn single_lib_all_btn" >All</button></Link>
                  {onlinePack.length > 0 ?
                    <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "" } }}> <button onClick={onlineClick} className="single_lib_not_active_btn single_lib_common_btn single_lib_audio_btn">Online</button> </Link>
                    : <></>}
                  {offlinePack.length > 0 ?
                    <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "Offline" } }}><button className="single_lib_active_btn single_lib_common_btn single_lib_video_btn">Offline</button></Link>
                    : <></>}
                  {eventPack.length > 0 ?
                    <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "Events" } }}><button onClick={eventClick} className="single_lib_not_active_btn single_lib_common_btn">Events</button></Link>
                    : <></>}

                </>
                : isAll === true ?
                  <>
                    <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "" } }}><button className="single_lib_active_btn single_lib_common_btn single_lib_all_btn">All</button></Link>
                    {onlinePack.length > 0 ?
                      <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "Online" } }}> <button onClick={onlineClick} className="single_lib_not_active_btn single_lib_common_btn single_lib_audio_btn">Online</button> </Link>
                      : <></>}
                    {offlinePack.length > 0 ?
                      <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "Offline" } }}><button onClick={offlineClick} className="single_lib_not_active_btn single_lib_common_btn single_lib_video_btn">Offline</button></Link>
                      : <></>}
                    {eventPack.length > 0 ?
                      <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "Events" } }}><button onClick={eventClick} className="single_lib_not_active_btn single_lib_common_btn">Events</button></Link>
                      : <></>}

                  </>

                  :
                  <>
                    <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "" } }}><button onClick={allClick} className="single_lib_not_active_btn single_lib_common_btn single_lib_all_btn" >All</button></Link>
                    {onlinePack.length > 0 ?
                      <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "Online" } }}> <button onClick={onlineClick} className="single_lib_not_active_btn single_lib_common_btn single_lib_audio_btn">Online</button> </Link>
                      : <></>}
                    {offlinePack.length > 0 ?
                      <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "Offline" } }}><button onClick={offlineClick} className="single_lib_not_active_btn single_lib_common_btn single_lib_video_btn">Offline</button></Link>
                      : <></>}
                    {eventPack.length > 0 ?
                      <Link style={{ textDecoration: "none" }} to={{ pathname: '/classes', checkS: { displayTitle: "Events" } }}><button className="single_lib_active_btn single_lib_common_btn">Events</button></Link>
                      : <></>}
                  </>
            }

          </div>
        </div>

        {singlepackage !== undefined ?
          <div className="single_lib_head_card card">
            <div className="row noMargin text-center noPadding">
              {windowWidth < 576 ?
                <div className="single_lib_top_btn_sec row noPadding noMargin text-left">
                  <div className="single_lib_top_lang_btn_sec col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding text-left">
                    <button className="single_lib_top_right_common_btn single_lib_top_right_cat_btn" >
                      <img src={singlepackage.category_icon} />
                      {singlepackage.category_name}
                    </button>

                    <button className="single_lib_top_right_common_btn single_lib_top_right_level_btn">{singlepackage.level}</button>
                    <button className="single_lib_top_right_common_btn single_lib_top_right_lang_btn">{singlepackage.language}</button>
                  </div>
                  <div className="single_lib_top_bookmark_btn_sec col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding text-right">
                    <button onClick={() => onDisClick(singlepackage.disclaimer)} className="single_lib_top_right_common_btn single_lib_top_right_disclaimer_btn">Disclaimer</button>
                    {singlepackage.is_bookmark ?
                      <img className="single_lib_top_right_bookmark_icon" src="/Images/Frame 50.png" id={singlepackage.id} onClick={removeBookmark} />
                      :
                      <img className="single_lib_top_right_bookmark_icon" src="/Images/bookmark-nan.svg" id={singlepackage.id} onClick={setBookmark} />
                    }
                  </div>
                </div>
                : <div></div>
              }
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-12 noPadding text-center">
                < SliderOne show={1}>

                  <div className="single_lib_slider_img_div">
                    <div ><img src={singlepackage.image_one} className="single_lib_slider_img" /></div>
                  </div>
                  <div className="single_lib_slider_img_div">
                    <div ><img src={singlepackage.image_two} className="single_lib_slider_img" /></div>
                  </div>
                  <div className="single_lib_slider_img_div">
                    <div ><img src={singlepackage.image_three} className="single_lib_slider_img" /></div>
                  </div>
                  {singlepackage.video !== null ?
                    <div className="single_lib_slider_img_div">
                      <img className="sngPlay" src="/Images/video-waves 2.svg" />
                      <div >
                        <video disablePictureInPicture controlsList="nodownload" controls src={singlepackage.video} className="single_lib_slider_img" />
                      </div>
                    </div>
                    : <></>
                  }

                </SliderOne>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-7 col-12 noPadding text-center">
                <div className="single_lib_head_right row noPadding noMargin">
                  <div className="single_lib_title_sec row noPadding noMargin">
                    {windowWidth > 575 ?
                      <div className="single_lib_top_btn_sec row noPadding noMargin text-left">
                        <div className="single_lib_top_lang_btn_sec col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding text-left">
                          <button className="single_lib_top_right_common_btn single_lib_top_right_cat_btn" >
                            <img src={singlepackage.category_icon} />
                            {singlepackage.category_name}
                          </button>
                          {/* {console.log(singlepackage)} */}
                          <button className="single_lib_top_right_common_btn single_lib_top_right_level_btn">{singlepackage.level}</button>
                          <button className="single_lib_top_right_common_btn single_lib_top_right_lang_btn">{singlepackage.language}</button>
                        </div>
                        <div className="single_lib_top_bookmark_btn_sec col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding text-right">
                          <button onClick={() => onDisClick(singlepackage.disclaimer)} className="single_lib_top_right_common_btn single_lib_top_right_disclaimer_btn">Disclaimer</button>
                          {singlepackage.is_bookmark ?
                            <img className="single_lib_top_right_bookmark_icon" src="/Images/Frame 50.png" id={singlepackage.id} onClick={removeBookmark} />
                            :
                            <img className="single_lib_top_right_bookmark_icon" src="/Images/bookmark-nan.svg" id={singlepackage.id} onClick={setBookmark} />
                          }
                        </div>
                      </div>
                      : <div></div>
                    }
                    {/* Disclaimer popup */}
                    {showDisC ?
                      <div ref={modalRef} className="single_lib_desc_model noPadding" style={{ backgroundColor: "white" }}>
                        <div className="single_cls_header_sec_desc row noMargin">
                          <div className="single_cls_popup_desc col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding text-left">
                            Disclaimer
                          </div>
                          <div className="single_lib_popup_close col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding text-right">
                            <button className="single_lib_close_btn" onClick={closeDis}  >Close</button>
                          </div>
                        </div>
                        <div className="single_lib_body_sec_desc row noMargin text-left">
                          <div className="single_lib_desc_div"> {disC}</div>
                        </div>
                      </div>
                      : <></>
                    }
                  </div>
                  {/* Name Section */}
                  <div className="single_lib_right_name_sec row noPadding noMargin text-left">
                    <div className="single_lib_name_div noPadding">
                      <span className="single_lib_name_span">{singlepackage.name}</span>
                    </div>
                    <div className="single_lib_description_div noPadding">
                      <span className="single_lib_desc_para">
                        {singlepackage.description != null ?
                          singlepackage.description.length > 150 ? (singlepackage.description + "").slice(0, 150) + "...  " : singlepackage.description
                          : <></>
                        }
                      </span>
                    </div>
                  </div>


                  {/* Instructor details section */}
                  <div className="single_cls_scss_inst_sec row noPadding noMargin text-left">
                    <div className="single_lib_inst_name_sec col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9 noPadding text-left">
                      <div className="single_lib_inst_card row noMargin">
                        <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-3 noPadding text-left single_lib_inst_img_div">
                          <div className="single_lib_inst_pro_div noPadding">
                            <img className="single_lib_inst_pro_pic" src={singlepackage.main_master_image} />
                          </div>
                        </div>
                        <div className="col-xl-10 col-lg-10 col-md-9 col-sm-9 col-9 noPadding">
                          <div className="single_lib_name_n_see_profile_div">
                            <span className="single_lib_inst_name_span">{singlepackage.main_master_name}</span>
                            <button onClick= {()=>{
                               profileHandleShow()
                               setinsClickDat(singlepackage);
                            }} className="single_lib_seePrBtn">See Profile</button>
                          </div>
                          <div className="single_lib_inst_quali_div" >
                            <span className="single_lib_inst_quali_span">{singlepackage.main_master_skill && singlepackage.main_master_skill[0]}</span>
                            {/* <span className="single_lib_inst_quali_span">M.A. Ph.D. in Yoga Sciences</span> */}
                          </div>
                          <div className="single_lib_inst_rating_div row noPadding noMargin">
                            <div className="col-3 text-left mlLg noPadding">
                              <img className="single_lib_inst_rating_img align_self_center" src="/Images/star.svg" />
                              {/* <span className="single_lib_inst_star_span">4.5</span> */}
                              <span className="single_lib_inst_star_span">{singlepackage.main_master_rating}</span>
                            </div>
                            <div className="col-6 text-right noPadding">
                              {singlepackage.masters && singlepackage.masters.length > 0 ?
                                <Button onClick={instHandleShow} className={windowWidth < 768 ? "single_lib_other_mob_Btn" : "single_lib_other_Btn"}>
                                  <span>+ {singlepackage.masters && singlepackage.masters.length} others</span>
                                  <img src="/Images/Right Circle1.svg" />
                                </Button>
                                : <></>}
                            </div>
                          </div>
                        </div>
                      </div>


                      <Modal show={profileShow  && insClickDat }
                        onHide={profileHandleClose}
                        aria-labelledby="contained-modal-title-vcenter"
                        className="narrator_modal_dialogue"
                        size="lg"
                        centered>
                        <Modal.Header className="single_cls_header_sec_desc" closeButton>
                          <Modal.Title class="single_cls_popup_desc">Instructor/ Narrator Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                          <div className="single_cls_scss_inst_sec">
                            <div className="row noMargin noPadding single_lib_pro_model_div">
                              <div className="row noMargin single_cls_pro_head_div">
                                <div className="col-5 noPadding single_lib_pro_head_sub_div text-left">
                                  <span>{  insClickDat ?
                                              <>
                                              {insClickDat.main_master_name ?
                                              insClickDat.main_master_name 
                                             
                                              :
                                              
                                              insClickDat.name 
                                             
                                              }
                                               </> :<></>
                                  }
                                  </span>
                                  {/* {console.log(singlepackage)} */}
                                </div>
                                <div className="col-7 noPadding single_lib_pro_head_sub_div text-right">
                                  <span>{  insClickDat ?
                                              <>
                                              {insClickDat.main_master_skill ?
                                              insClickDat.main_master_skill.toString()
                                             
                                              :
                                              
                                              insClickDat.skill.toString()
                                             
                                              }
                                               </> :<></>
                                  }</span>
                                </div>
                              </div>
                              <div className="row noMargin noPadding single_cls_pro_tail_div">
                                <span className="single_class_pro_tail_heads">About the Instructor/ Narrator:</span><br></br>
                                <span className="single_class_pro_tail_text">{  insClickDat ?
                                              <>
                                              {insClickDat.main_master_bio ?
                                              insClickDat.main_master_bio
                                             
                                              :
                                              
                                              insClickDat.bio
                                             
                                              }
                                               </> :<></>
                                  }</span><br></br>
                                <span className="single_class_pro_tail_heads">Specialities:</span><br></br>
                                <span className="single_class_pro_tail_text">{  insClickDat ?
                                              <>
                                              {insClickDat.main_master_specialities ?
                                              insClickDat.main_master_specialities.toString()
                                             
                                              :
                                              
                                              insClickDat.specialities
                                             
                                              }
                                               </> :<></>
                                  }</span>
                                <div className="row text-left single_class_pro_like_count_sec">
                                  <div className="col-6 text-left">
                                    <div className="row noMargin text-left noPadding">
                                      <div className="col-6 text-left noPadding">
                                        <span className="single_class_pro_tail_heads">Rating</span><br></br>
                                        <div className="single_class_pro_tail_grid_div">
                                          <span>
                                            <img className="single_lib_pro_star_heart_img" style={{ marginBottom: "3px" }} src="/Images/star.svg" />
                                          </span>
                                          <span className="single_class_pro_tail_text">{  insClickDat ?
                                              <>
                                              {insClickDat.main_master_rating ?
                                              insClickDat.main_master_rating
                                             
                                              :
                                              
                                              insClickDat.rating
                                             
                                              }
                                               </> :<></>
                                  }</span>
                                          {/* <span className="single_class_pro_tail_text">{singlepackage.main_master_rating}</span> */}
                                        </div>

                                      </div>
                                      <div className="col-6 text-left noPadding">
                                        <span className="single_class_pro_tail_heads">Likes</span><br></br>
                                        <div className="single_class_pro_tail_grid_div">
                                          <span>
                                            <img className="single_lib_pro_star_heart_img" src="/Images/heart.svg" />
                                          </span>
                                          <span className="single_class_pro_tail_text">{  insClickDat ?
                                              <>
                                              {insClickDat.main_master_like_count ?
                                              insClickDat.main_master_like_count
                                             
                                              :
                                              
                                              insClickDat.like_count
                                             
                                              }
                                               </> :<></>
                                  } Likes</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 text-right noPadding">
                                    <span className="single_class_pro_tail_heads">Rate Instructor/ Narrator</span><br></br>
                                    <div className="rating_main_span">
                                      <span className="single_lib_table_header_tracks_span align_self_center" >Rating</span>
                                      {windowWidth < 768 ?
                                        <Rating onClick={(rate) => handleRating(rate,insClickDat &&  insClickDat.id)} ratingValue={singlepackage.main_master_rating} className="rating_span_class align_self_center" size="15" />
                                        :
                                        <Rating onClick={(rate) => handleRating(rate,insClickDat && insClickDat.id)} ratingValue={singlepackage.main_master_rating} className="rating_span_class align_self_center" size="25" />
                                      }
                                      <span className="single_lib_table_header_tracks_span align_self_center">{singlepackage.main_master_rating} </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>

                      </Modal>



                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-3 col-3 noPadding text-left">
                      <div className="single_lib_inst_like_sec">
                        <div className="row noMargin noPadding align_self_center">

                          {singlepackage.is_like ?
                            <div className="single_lib_inst_like_div col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 noPadding text-right">
                              <div className="displayInlineFlex">
                                <img className="single_lib_inst_like_img align_self_center" style={{ marginBottom: "3px" }} onClick={() => removeLike(singlepackage.id)} src="/Images/heart.svg" />
                                <span className="single_lib_share_like_span align_self_center">{singlepackage.like_count} Likes</span>
                              </div>
                            </div>
                            :
                            <div className="single_lib_inst_like_div col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 noPadding text-right">
                              <div className="displayInlineFlex">
                                <img className="single_lib_inst_like_img align_self_center" style={{ marginBottom: "3px" }} onClick={() => setLike(singlepackage.id)} src="/Images/heart-nan.svg" />
                                <span className="single_lib_share_like_span align_self_center">{singlepackage.like_count} Likes</span>
                              </div>
                            </div>
                          }
                          <div className={windowWidth < 768 ? "single_lib_inst_share_div col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 noPadding text-right" : "single_lib_inst_share_div col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 noPadding text-center"}>
                            <div onClick={shareHandleShow} className="displayInlineFlex">
                              <img className="single_lib_inst_share_img align_self_center" src="/Images/Vector (4).png" />
                              <span className="single_lib_share_like_span align_self_center">{singlepackage.share_count} Shares</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Instructor model */}
              <Modal show={instShow}
                onHide={instHandleClose}
                aria-labelledby="contained-modal-title-vcenter"
                className="package_inst_modal_dialogue"
                size="lg"
                centered>
                <Modal.Header className="single_cls_header_sec_desc" closeButton>
                  <Modal.Title className="single_cls_popup_desc">Package Instructors</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  {singlepackage.masters ? singlepackage.masters.map((master) =>
                    <div className="single_cls_scss_inst_sec">
                      <div className="single_lib_inst_card row noMargin">
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 noPadding text-left single_lib_inst_img_div">
                          <div className="single_lib_inst_pro_div noPadding modal_master_div">
                            <img className="single_lib_inst_pro_pic" src={master.image} />
                          </div>
                        </div>
                        <div className="col-xl-10 col-lg-10 col-md-8 col-sm-8 col-8 noPadding">
                          <div className="single_lib_name_n_see_profile_div">
                            <span className="single_lib_inst_name_span">{master.name}</span>
                            <button onClick= {()=>{
                               profileHandleShow()
                               setinsClickDat(master);
                               console.log(master)
                            }} className="single_lib_seePrBtn">See Profile</button>
                          </div>
                          <div className="single_lib_inst_quali_div" >
                            <span className="single_lib_inst_quali_span">{master.skill !== null && master.skill[0]}</span>
                            {/* <span className="single_lib_inst_quali_span">M.A. Ph.D. in Yoga Sciences</span> */}
                          </div>
                          <div className="single_lib_inst_rating_div row noPadding noMargin">
                            <div className="col-6 text-left mlLg noPadding">
                              <img className="single_lib_inst_rating_img align_self_center" src="/Images/star.svg" />
                              {/* <span className="single_lib_inst_star_span">4.5</span> */}
                              <span className="single_lib_inst_star_span">{master.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 noPadding single_lib_inst_img_div">
                          <span className="align_self_center">{master.class_count} Tracks</span>
                        </div>
                      </div>
                    </div>
                  )
                    : <></>
                  }
                </Modal.Body>
              </Modal>
            </div>
          </div>
          : <></>
        }

        {singlepackage !== undefined ?
          <div className="single_lib_table_card card single_cls_scss_inst_sec">
            {(singlepackage.wellness_audios && singlepackage.wellness_audios.length > 0) ||
              (singlepackage.wellness_videos && singlepackage.wellness_videos.length > 0) ||
              (singlepackage.quotes && singlepackage.quotes.length > 0) || (singlepackage.events && singlepackage.events.length > 0)

              ?
              <div className="row noMargin text-center noPadding">
                <div className="single_lib_table_header_sec row noMargin">
                  <div className={singlepackage && singlepackage.is_subscribed ? "single_lib_table_header_div col-xl-4 col-lg-4 col-md-4 col-sm-5 col-5 noPadding text-left" : "single_lib_table_header_div col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5 noPadding text-left"}>
                    <span className="align_self_center">Package Details</span>
                  </div>

                  {singlepackage && singlepackage.is_subscribed ?
                    <>
                      <div className={windowWidth < 768 ? "col-xl-4 col-lg-4 col-md-4 col-sm-7 col-7 noPadding text-right" : "col-xl-4 col-lg-4 col-md-4 col-sm-7 col-7 noPadding text-center"}>
                        <div className="rating_main_span">
                          <span className="single_lib_table_header_tracks_span align_self_center" >Rating</span>
                          {windowWidth < 768 ?
                            <Rating onClick={(rate) => handleRating(rate, singlepackage.id)} ratingValue={rating} className="rating_span_class align_self_center" size="15" />
                            :
                            <Rating onClick={(rate) => handleRating(rate, singlepackage.id)} ratingValue={rating} className="rating_span_class align_self_center" size="25" />
                          }

                          <span className="single_lib_table_header_tracks_span align_self_center">{rating} </span>
                        </div>
                      </div>
                    </>
                    : <></>
                  }


                  <div className={singlepackage && singlepackage.is_subscribed ? "col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 noPadding text-right" : "col-xl-6 col-lg-6 col-md-6 col-sm-7 col-7 noPadding text-right"}>
                    <button className="more_categories" onClick={categoryHandleShow}>
                      <span className="first_cat">{singlepackage.events && singlepackage.events.length > 0 && singlepackage.events[0].subcategory_name}</span>
                      <span className="next_count">+ {singlepackage.events && singlepackage.events.length} More</span>
                      <img className="more_cat_arrow" src="/Images/Right Circle1.svg" />
                    </button>
                    <span className="single_lib_table_header_tracks_span">{singlepackage.events.length} Classes</span>
                  </div>
                </div>


                <div className="single_lib_table_div row noMargin noPadding">
                  <table className="table text-left noPadding noMargin">
                    <thead className="theading">
                      <tr>
                        <th className="text-left">Title</th>
                        <th className="text-left">Time</th>
                        <th className="text-left">Date</th>
                        <th className="text-left single_lib_duration_th">Duration</th>
                        <th className="single_class_last_th"></th>
                      </tr>
                    </thead>
                    <tbody className="single_lib_table_body">
                      {singlepackage.events.length > 0 ? singlepackage.events.map(event =>

                        <tr key={event.id}>
                          <td>
                            <div className="row noPadding noMargin">
                              <div className="col-1 noPadding">
                                {checkEndTime(event.end_time, event) ?
                                  <img className="check_svg" src='/Images/uncheck.svg' />
                                  :
                                  <img className="check_svg" src='/Images/checked.svg' />
                                }

                              </div>
                              <div className="col noPadding single_lib_table_vid_title">{event.title}</div>
                            </div>
                          </td>
                          <td>{event.start_time.slice(0, 5)} - {event.end_time.slice(0, 5)}</td>
                          <td>{event.date}</td>
                          <td className="text-left">
                            <span className="single_lib_table_duration_span">{event.duration} min</span>
                          </td>
                          <td className="text-left">
                            <button onClick={() => videoHandleShow(event)} className="single_lib_table_type_btn">
                              {/* <button onClick={() => onShowMaster(event)} className="single_lib_table_type_btn"> */}
                              <img className="single_lib_table_type_img" src="/Images/RightCircleB.svg" />
                            </button>
                          </td>
                        </tr>
                      )
                        :
                        <tr>
                          <td>Currently </td>
                          <td>  no</td>
                          <td>data </td>
                          <td>to</td>
                          <td> display</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                  <div className="row noMargin noPadding">
                    <div className="single_lib_purchase_sec row noMargin">
                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 noPadding" style={{ display: "grid" }}>
                        <span className="single_lib_purchase_price_span">Total : <b>{singlepackage.price} INR</b></span>
                      </div>
                      {!singlepackage.is_subscribed ?
                        <div className="single_lib_coupon_div col-xl-4 offset-xl-1 col-lg-4 offset-lg-1 col-md-5 col-sm-6 col-6 noPadding">
                          <div className="row noMargin noPadding">

                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-7 col-7 noPadding">
                              <input onChange={(e) => setActCoupon(e.target.value)} type="text"></input>
                            </div>


                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-5 noPadding text-right">
                              <button onClick={onApplyCoupon} className="single_lib_coupon_btn">Apply Coupon</button>
                            </div >

                          </div >

                        </div >
                        :
                        <div className=" col-xl-4 offset-xl-1 col-lg-4 offset-lg-1 col-md-5 col-sm-6 col-6 noPadding">
                        </div>
                      }
                      {!singlepackage.is_subscribed ?
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 noPadding text-center" style={{ display: "grid" }}>
                          <div className="align_self_center">
                            {verified ?
                              <Link to={{ pathname: '/buy-package', id: singlepackage.id, coupon: appliedCoupon }}  >
                                <button className="single_lib_buy_btn" >Buy Package</button>
                              </Link>
                              :
                              <>

                                <Link to={{ pathname: '/my-profile', fromPackage: "Login", url: window.location.href }}  >
                                  <button onClick={() => {

                                    toast.warning("Verify Email and phone first ", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
                                  }} className="single_lib_buy_btn" >Buy Package</button>
                                </Link>
                              </>
                            }
                          </div>
                        </div>
                        :
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 noPadding text-center" style={{ display: "grid" }}>
                          <div className="align_self_center">
                            <button className="single_lib_buy_btn" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>PAID</button>
                          </div>
                        </div>
                      }


                    </div>
                  </div>
                </div>


              </div>
              : <></>}

          </div>

          : <></>
        }

        {/* Category Modal */}
        <Modal show={categoryShow}
          onHide={categoryHandleClose}
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
          centered>
          <Modal.Header className="single_cls_header_sec_desc" closeButton>
            <Modal.Title className="single_cls_popup_desc">Sessions - Wellness Categories</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="single_cls_scss_inst_sec">
              <div className="row noMargin noPadding wellness_header">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noPadding cat_head">Session Title</div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding cat_head">Sub Category</div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 noPadding cat_head">Duration</div>
              </div>
              <div className="row noMargin noPadding category_body">
                {singlepackage && singlepackage.events && singlepackage.events.map((item) => (
                  <div className="row noMargin noPadding each_category_sec">{/* Loop this div while binding */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noPadding cat_body">{item.title}</div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding cat_body">{item.subcategory_name}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 noPadding cat_body">{item.event_duration}mins</div>
                  </div>
                ))}

              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Class model */}
        {singlepackage !== undefined ?
          <Modal show={checkVideoShow}
            onHide={videoHandleClose}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered>
            <Modal.Header className="single_cls_header_sec_desc" closeButton>
              <Modal.Title className="single_cls_popup_desc">Class Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <div className="single_cls_scss_inst_sec">
                <div className="row noMargin noPadding">
                  <span className="single_class_pro_tail_heads noPadding">{eventShow.title}</span>
                  <span className="single_class_pro_tail_text noPadding">{eventShow.description}</span>
                </div>
                <div className="row noMargin noPadding time_sec">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding">
                    <span className="single_cls_time_span">
                      <img className="start_class_icon_img" src='/Images/clockB.svg' />
                      {eventShow.start_time} - {eventShow.end_time}
                    </span>
                    <span className="single_cls_time_span">
                      <img className="start_class_icon_img" src='/Images/timeD.svg' />
                      {eventShow.date}
                    </span>
                    <span className="single_cls_time_span">
                      <img className="start_class_icon_img" src='/Images/sndB.svg' />
                      {eventShow.event_duration} min
                    </span>
                  </div>
                </div>
                <div className="single_lib_inst_card row noMargin">
                  <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-2 noPadding text-left single_lib_inst_img_div">
                    <div className="single_lib_inst_pro_div noPadding">
                      <img className="single_lib_inst_pro_pic" src={singlepackage.main_master_image} />
                    </div>
                  </div>
                  <div className="col-xl-9 col-lg-9 col-md-8 col-sm-8 col-8 noPadding">
                    <div className="single_lib_name_n_see_profile_div">
                      <span className="single_lib_inst_name_span">{singlepackage.main_master_name}</span>
                      <button onClick= {()=>{
                               profileHandleShow()
                               setinsClickDat(singlepackage);
                            }} className="single_lib_seePrBtn">See Profile</button>
                    </div>
                    <div className="single_lib_inst_quali_div" >
                      <span className="single_lib_inst_quali_span">skill</span>
                      {/* <span className="single_lib_inst_quali_span">M.A. Ph.D. in Yoga Sciences</span> */}
                    </div>
                    <div className="single_lib_inst_rating_div row noPadding noMargin">
                      <div className="col-6 text-left mlLg noPadding">
                        <img className="single_lib_inst_rating_img align_self_center" src="/Images/star.svg" />
                        {/* <span className="single_lib_inst_star_span">rating</span> */}
                        {/* <span className="single_lib_inst_star_span">{master.rating}</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
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
                        <input type="text" className="form-control enter_mail_id" placeholder="Enter  ','  separated email Ids here" onChange={(e) => { setToEmails(e.target.value) }} />
                      </div>
                      <div className="col-xl-10 offset-xl-2 col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-10 offset-sm-2 col-10 offset-2 noPadding text-left">
                        <textarea rows="5" className="form-control enter_text" placeholder="Enter your message here" value={shareMsg} onChange={(e) => setShareMsg(e.target.value)} ></textarea>
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
                                <span style={{ cursor: "pointer" }} class="input-group-text copy_img_span" id="basic-addon2">

                                  {!isCopy ?
                                    <img onClick={() => {
                                      navigator.clipboard.writeText(currUrl)
                                      setIsCopy(true);
                                    }} className="copy_link_img" src="/Images/copy-link.svg" />
                                    :
                                    <span style={{ color: "#03cbc9", fontSize: "1.8vh" }}>Link Copied !</span>
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
                      <button style={{ background: "none", borderRadius: "50px", borderColor: "#03cbc9", height: "55px", width: "55px" }}> <img style={{ height: "20px" }} className="share_mail_img align_self_center" src="/Images/mailE.svg"></img> </button>
                      <p style={{ paddingLeft: "6px", color: "#03cbc9" }}>Email</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>


        { /* <a  class={singlepackage.description} onClick={onDClick} href="">Read More</a>
              {showDesc  ?
                <div className="overlay-des" style={{ backgroundColor: "white" }}>

                  <div className="packDet">
                    Description
                  </div>
                  <div className="packCl">
                    <button className="cls-Btn" onClick={onDClick}  >Close</button>
                  </div>
                  <div className="oDesc"> {des}</div>
                </div>
              :<></>
              } */}

      </main>
    </div>
  );
}
