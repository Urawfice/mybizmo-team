import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Navbar from '../Navbar/Navbar';
import PlayerControlExample from "./PlayerControlExample";

// import '~video-react/dist/video-react.css';
import { Player, ControlBar } from 'video-react';

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
// import './LibraryStyle.css';
import './SingleLibrary.scss';
// import '../Classes/ClassesStyle.css'
// import './LibraryStyle(new).css';
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


export default function SingleLibrary(props) {

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
  const [isMoreDetails, setIsMoreDetails] = useState(false);
  const [currPack, setCurrPack] = useState('');
  const [currBG, setCurrBG] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPack, setSelectedPack] = useState([]);
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const [disC, setDisC] = useState("");
  const [showDisC, setShowDis] = useState("");
  const [fullClass, setFullClass] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [insClickDat,setinsClickDat] = useState()

  const [currDesp, setCurrDesp ]  = useState();

  const [toEmails, setToEmails] = useState('');
  const [currUrl, setCurrUrl] = useState('');
  const [shareMsg, setShareMsg] = useState('')
  const [isCopy, setIsCopy] = useState('');



  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
  const [fullScreen, setFullScreen] = useState(1);


  const [couponList, setCouponList] = useState([]);
  const [actCoupon, setActCoupon] = useState('');
  const [appliedCoupon, setApplyCoupon] = useState('');
  const [verified, setVerified] = useState(false);



  const [instShow, setInstShow] = useState(false)
  const [profileShow, setProfileShow] = useState(false)
  const [checkVideoShow, setVideoShow] = useState(false)
  const [categoryShow, setCategoryShow] = useState(false)
  const [shareShow, setShareShow] = useState(false)

  const videoHandleClose = () => setVideoShow(false);
  const videoHandleShow = () => setVideoShow(true);
  const instHandleClose = () => setInstShow(false);
  const instHandleShow = () => setInstShow(true);
  const profileHandleClose = () => setProfileShow(false);
  const profileHandleShow = () => setProfileShow(true);
  const categoryHandleShow = () => setCategoryShow(true);
  const categoryHandleClose = () => setCategoryShow(false);
  const modalRef = useOnClickOutsideRef(() => {
    setShowDis(false)
    setShowMaster(false)

  })
  const shareHandleShow = () => {
    setShareShow(true);
    setIsCopy(false);
  }
  const shareHandleClose = () => setShareShow(false);
  const [rating, setRating] = useState(0)


  const handleResize = (e) => {
    if (document.fullscreenElement) {
      console.log(document.fullscreenElement)
      setFullClass(true)
    }
    else {
      setFullClass(false);
    }

    setWindowWidth(document.documentElement.clientWidth);

    let vid = document.getElementById("video1");


    if (vid && vid.paused) {
      setVideoPlaying(false);
      setIsPlaying(false);

    }
    else if (vid) {
      setVideoPlaying(true);
      setIsPlaying(true);
    }
  };


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
    if (windowWidth < 920) {
      setCheck(2);
    }

  }, [windowWidth])



  useEffect(() => {


    window.addEventListener("resize", handleResize);
    window.addEventListener("webkitfullscreenchange", handleResize);
    window.addEventListener("fullscreenchange", handleResize);
    window.addEventListener("webkitplaying", handleResize);






    const script = document.createElement("script");
    script.src = "/resource.js";
    script.async = true;
    document.body.appendChild(script);








    getImages();
    console.log(props.location)
    if (props.location.checkS !== undefined) {
      let check = props.location.checkS.displayTitle;
      if (check === undefined) {
        check = props.location.checkS.activeBtn;
      }
      console.log(check)
      if (check === 'Offline' || check === 'Video') {
        offlineClick();
      }
      else if (check === 'Events' || check == 'Quote') {
        eventClick();
      }
      else if (check === 'Online' || check == 'Audio') {
        onlineClick();
      }
    }







  }, [])

  const getImages = async () => {

    let totalArr = [];
    let id = 1;
    // console.log(props.match);
    if (props.match.params.id !== undefined) {
      id = props.match.params.id;

    }
    let url = '/users/audio-package-detail/'
    console.log(props.location)
    let tempC = '';
    if (props.location.checkS) {
      if (props.location.checkS.displayTitle) {
        localStorage.setItem("Package", props.location.checkS.displayTitle);
      }
    }
    tempC = localStorage.getItem('Package');
    console.log(tempC);
    if (tempC === 'Audio') {
      url = '/users/audio-package-detail/';
    }
    else if (tempC == 'Video') {
      url = '/users/video-package-detail/';
    }
    else {
      url = '/users/quote-package-detail/';
    }
    console.log(url)
    console.log(cookies.get('token'))

    await axios.get(url + id, {
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
        // console.log(res.data);
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
    axios.post(`users/package-rating/` + id, {
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



  const onDisClick = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    setTimeout(() => {
      if (showDisC) {
        console.log("showDis => false")
        setShowDis(false);
      }
      else {
        console.log("showDis => true")
        setShowDis(true);
      }

      setDisC(e)
      console.log("A");
      console.log(showDisC)
    }, 1);



  }



  const onChecked = (e) => {
    const id = e.id;
    const price = e.price;
    console.log(price + " " + id)
    let tr = selectedPack;
    let tp = totalPrice;
    if (tr.indexOf(id) >= 0) {
      let inx = tr.indexOf(id);
      tr.splice(inx, 1);
      setSelectedPack(tr);
      tp = tp - price;
      setTotalPrice(tp);
      console.log(tp + " " + totalPrice)

    }
    else {
      tr.push(id);
      tp = tp + price;
      setTotalPrice(tp);
      console.log(tp + " " + totalPrice)
    }

    console.log(e);

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

  const onShoWClick = (e) => {

    e.preventDefault();
    e.stopPropagation();
    if (isMoreDetails) {
      setIsMoreDetails(false)
    }
    else {
      setIsMoreDetails(true);
    }
    return false;
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


  const onShowMaster = (e1, e2,event) => {

    setTimeout(() => {
      setShowMaster(true);
      let cPack = e1;
      setCurrPack(cPack);
      setCurrBG(e2);
      setCurrDesp(event.description);
    }, 1);

  }
  const onCloseMaster = (e) => {
    setShowMaster(false);
    setVideoPlaying(false);
    setIsPlaying(false);

  }



  function playVid() {
    let vid = document.getElementById("video1");


    if (vid.paused) {
      vid.play();
      setVideoPlaying(true);
      setIsPlaying(true);
    }
    else {
      vid.pause();
      setVideoPlaying(false);
      setIsPlaying(false);
    }

  }

  function forward30() {
    let vid = document.getElementById("video1");
    vid.currentTime = vid.currentTime + 30;
  }

  function backward30() {
    let vid = document.getElementById("video1");
    vid.currentTime = vid.currentTime - 30;
  }
  // function pauseVid() {
  //   let vid = document.getElementById("video1");
  //     vid.pause();
  // }











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
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }} ><img onMouseOut={e => (e.currentTarget.src = '/Images/home.svg')} onMouseOver={e => (e.currentTarget.src = '/Images/home.svg')} id="icon" style={{ "height": "20px" }} src='/Images/home.svg' alt="classes" /></ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem" >
                  <Link to="/classes">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/classes.svg' alt="classes" /> </ListItemIcon>
                        <ListItemText primary="Classes" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/library">
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/libraryB.svg' alt="library" /></ListItemIcon>
                        <ListItemText primary="Library" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/packages">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/packages.svg' alt="packages" /></ListItemIcon>
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

                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/instructor">
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
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }} ><img onMouseOut={e => (e.currentTarget.src = '/Images/home.svg')} onMouseOver={e => (e.currentTarget.src = '/Images/home.svg')} id="icon" style={{ "height": "20px" }} src='/Images/home.svg' alt="classes" /></ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem" >
                  <Link to="/classes">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/classes.svg' alt="classes" /> </ListItemIcon>
                        <ListItemText primary="Classes" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/library">
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/libraryB.svg' alt="library" /></ListItemIcon>
                        <ListItemText primary="Library" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/packages">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/packages.svg' alt="packages" /></ListItemIcon>
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

                        <ListItemIcon style={{ minWidth: ' 2.27vw' }}><img style={{ "height": "2.77vh" }} src='/Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/instructor">
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
      <main className="single_lib_main_class" style={{ marginTop: "50px" }}>
        <div className="single_library_top_sec_card card row noMargin">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noPadding text-center">
            {isOnline === true ?
              <>
                <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "" } }}> <button onClick={allClick} className="single_lib_common_btn single_lib_not_active_btn single_lib_all_btn" >All</button></Link>

                {onlinePack.length > 0 ?
                  <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Audio" } }}> <button className="single_lib_active_btn single_lib_common_btn single_lib_audio_btn">Audio</button></Link>
                  : <></>}
                {offlinePack.length > 0 ?
                  <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Video" } }}><button onClick={offlineClick} className="single_lib_common_btn single_lib_not_active_btn single_lib_video_btn">Video</button></Link>
                  : <></>}
                {eventPack.length > 0 ?
                  <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Quote" } }}><button onClick={eventClick} className="single_lib_common_btn single_lib_not_active_btn">Quotes</button></Link>

                  : <></>}



              </>

              : isOffline === true ?
                <>
                  <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "" } }}><button onClick={allClick} className="single_lib_common_btn single_lib_not_active_btn single_lib_all_btn" >All</button></Link>
                  {onlinePack.length > 0 ?
                    <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Audio" } }}> <button onClick={onlineClick} className="single_lib_common_btn single_lib_not_active_btn single_lib_audio_btn">Audio</button> </Link>
                    : <></>}
                  {offlinePack.length > 0 ?
                    <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Video" } }}><button className="single_lib_common_btn single_lib_active_btn single_lib_video_btn">Video</button></Link>
                    : <></>}
                  {eventPack.length > 0 ?
                    <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Quote" } }}><button onClick={eventClick} className="single_lib_common_btn single_lib_not_active_btn">Quotes</button></Link>
                    : <></>}

                </>
                : isAll === true ?
                  <>
                    <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "" } }}><button className="single_lib_common_btn single_lib_active_btn single_lib_all_btn">All</button></Link>
                    {onlinePack.length > 0 ?
                      <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Audio" } }}> <button onClick={onlineClick} className="single_lib_common_btn single_lib_not_active_btn single_lib_audio_btn">Audio</button> </Link>
                      : <></>}
                    {offlinePack.length > 0 ?
                      <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Video" } }}><button onClick={offlineClick} className="single_lib_common_btn single_lib_not_active_btn single_lib_video_btn">Video</button></Link>
                      : <></>}
                    {eventPack.length > 0 ?
                      <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Quote" } }}><button onClick={eventClick} className="single_lib_common_btn single_lib_not_active_btn">Quotes</button></Link>
                      : <></>}

                  </>

                  :
                  <>
                    <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "" } }}><button onClick={allClick} className="single_lib_common_btn single_lib_not_active_btn single_lib_all_btn" >All</button></Link>
                    {onlinePack.length > 0 ?
                      <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Audio" } }}> <button onClick={onlineClick} className="single_lib_common_btn single_lib_not_active_btn single_lib_audio_btn">Audio</button> </Link>
                      : <></>}
                    {offlinePack.length > 0 ?
                      <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Video" } }}><button onClick={offlineClick} className="single_lib_common_btn single_lib_not_active_btn single_lib_video_btn">Video</button></Link>
                      : <></>}
                    {eventPack.length > 0 ?
                      <Link style={{ "textDecoration": "none" }} to={{ pathname: '/library', checkS: { displayTitle: "Quote" } }}><button className="single_lib_common_btn single_lib_active_btn">Quotes</button></Link>
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
                    <button onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDisClick(singlepackage.disclaimer)
                      return false;
                    }} className="single_lib_top_right_common_btn single_lib_top_right_disclaimer_btn">Disclaimer</button>
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


                        <div className="single_lib_header_sec_desc row noMargin">
                          <div className="single_lib_popup_desc col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding text-left">
                            Disclaimer
                          </div>
                          <div className="single_lib_popup_close col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding text-right">
                            <button className="single_lib_close_btn" onClick={onDisClick}  >Close</button>
                          </div>
                        </div>
                        <div className="single_lib_body_sec_desc row noMargin noPadding text-left">
                          <div className="single_lib_desc_div noPadding"> {disC}</div>
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
                  <div className="single_lib_scss_inst_sec row noPadding noMargin text-left">
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
                            <button onClick={()=>{
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
                              <span className="single_lib_inst_star_span">{singlepackage.rating}</span>
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
                                               insClickDat.main_master_skill && insClickDat.main_master_skill.toString()
                                             
                                              :
                                              
                                              insClickDat.skill && insClickDat.skill.toString()
                                             
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
                                        <Rating onClick={(rate) => handleRating(rate,insClickDat &&  insClickDat.id)} ratingValue={rating} className="rating_span_class align_self_center" size="15" />
                                        :
                                        <Rating onClick={(rate) => handleRating(rate,insClickDat && insClickDat.id)} ratingValue={rating} className="rating_span_class align_self_center" size="25" />
                                      }
                                      <span className="single_lib_table_header_tracks_span align_self_center">{rating} </span>
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
                <Modal.Header className="single_lib_header_sec_desc" closeButton>
                  <Modal.Title className="single_lib_popup_desc">Package Instructors</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  {singlepackage.masters ? singlepackage.masters.map((master) =>
                    <div className="single_lib_scss_inst_sec">
                      <div className="single_lib_inst_card row noMargin">
                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 noPadding text-left single_lib_inst_img_div">
                          <div className="single_lib_inst_pro_div noPadding modal_master_div">
                            <img className="single_lib_inst_pro_pic" src={master.image} />
                          </div>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding">
                          <div className="single_lib_name_n_see_profile_div">
                            <span className="single_lib_inst_name_span">{master.name}</span>
                            <button onClick={()=>{
                               profileHandleShow()
                               setinsClickDat(master);
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
                          {singlepackage.wellness_audios ?
                            <span className="align_self_center">{master.audio_track_count} Tracks</span>
                            :
                            <>
                              {singlepackage.wellness_videos ?
                                <span className="align_self_center">{master.video_track_count} Tracks</span>
                                :
                                <span className="align_self_center">{master.quote_count} Tracks</span>
                              }
                            </>
                          }
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

          <div className="single_lib_table_card card single_lib_scss_inst_sec">
            {(singlepackage.wellness_audios && singlepackage.wellness_audios.length > 0) ||
              (singlepackage.wellness_videos && singlepackage.wellness_videos.length > 0) ||
              (singlepackage.quotes && singlepackage.quotes.length > 0) || (singlepackage.events && singlepackage.events.length > 0)

              ?
              <div className="row noMargin text-center noPadding">
                <div className="single_lib_table_header_sec row noMargin">
                  <div className={singlepackage && singlepackage.is_subscribed ? "single_lib_table_header_div col-xl-4 col-lg-4 col-md-4 col-sm-5 col-5 noPadding text-left" : "single_lib_table_header_div col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5 noPadding text-left"}>
                    Package Details
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
                      {singlepackage.wellness_audios ?
                        <>
                          <span className="first_cat">{singlepackage.wellness_audios.length > 0 && singlepackage.wellness_audios[0].subcategory_name}</span>
                          <span className="next_count">+ {singlepackage.wellness_audios && singlepackage.wellness_audios.length} More</span>
                        </>
                        :
                        <>
                          {singlepackage.wellness_videos ?
                            <>
                              <span className="first_cat">{singlepackage.wellness_videos.length > 0 && singlepackage.wellness_videos[0].subcategory_name}</span>
                              <span className="next_count">+ {singlepackage.wellness_videos && singlepackage.wellness_videos.length} More</span>
                            </>
                            :
                            <>
                              <span className="first_cat">{singlepackage.quotes.length > 0 && singlepackage.quotes[0].subcategory_name}</span>
                              <span className="next_count">+ {singlepackage.quotes && singlepackage.quotes.length} More</span>
                            </>
                          }
                        </>
                      }
                      <img className="more_cat_arrow" src="/Images/Right Circle1.svg" />
                    </button>
                    {singlepackage.wellness_audios ?
                      <span className="single_lib_table_header_tracks_span">{singlepackage.wellness_audios.length} Tracks</span>
                      : singlepackage.wellness_videos ?
                        <span className="single_lib_table_header_tracks_span">{singlepackage.wellness_videos.length} Tracks</span>
                        : singlepackage.quotes ?
                          <span className="single_lib_table_header_tracks_span">{singlepackage.quotes.length} Tracks</span>
                          : <></>
                    }
                  </div>
                </div>


                <div className="single_lib_table_div row noMargin noPadding">
                  <table className="table text-left noPadding noMargin">
                    <thead className="theading">
                      <tr>
                        <th className="text-left">Title</th>
                        <th className="text-left">Narrator/ Speaker</th>
                        <th className="text-left single_lib_duration_th">Duration</th>
                        {/* <th></th> */}
                      </tr>
                    </thead>
                    <tbody className="single_lib_table_body">

                      {/* wellness audios */}
                      {singlepackage.wellness_audios ? singlepackage.wellness_audios.map(event =>

                        <tr key={event.id}>
                          <td>
                            <div className="row noPadding noMargin">
                              <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-2 noPadding"><input onChange={() => onChecked(event)} type="checkbox" className="chkinp" ></input></div>
                              <div className="col-xl-11 col-lg-11 col-md-10 col-sm-10 col-10 noPadding single_lib_table_vid_title">{event.title}</div>
                            </div>
                          </td>
                          <td>{event.narrator} </td>
                          {/* <td>{event.date}</td> */}
                          <td className="text-left">
                            <span className="single_lib_table_duration_span">{event.duration} min</span>
                            {event.lock && !event.free ?
                              <button className="single_lib_table_type_btn">
                                <img className="single_lib_table_type_img" src="/Images/videoLc.svg" />
                              </button>
                              :
                              <button onClick={() => onShowMaster(event.audio, event.background_image, event)} className="single_lib_table_type_btn">
                                <img className="single_lib_table_type_img" src="/Images/playB.svg" />
                              </button>
                            }
                          </td>
                        </tr>
                      )
                        :
                        <div></div>
                      }

                      {/* <Button onClick={videoHandleShow}>see Category</Button> */}
                      {/* <Modal size="lg" 
                      show={checkVideoShow} 
                      onHide={videoHandleClose} 
                      aria-labelledby="contained-modal-title-vcenter" 
                      centered>
                        <Modal.Header closeButton>
                          <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        </Modal.Body>
                      </Modal> */}

                      {/* wellness videos */}
                      {singlepackage.wellness_videos ? singlepackage.wellness_videos.map(event =>

                        <tr key={event.id}>
                          <td>
                            <div className="row noPadding noMargin">
                              <div className="col-1 noPadding"><input onChange={() => onChecked(event)} type="checkbox" className="chkinp" ></input></div>
                              <div className="col noPadding single_lib_table_vid_title">{event.title}</div>
                            </div>
                          </td>
                          <td>{event.narrator} </td>
                          <td className="text-left">
                            <span className="single_lib_table_duration_span">{event.duration} min</span>

                            {event.lock && !event.free ?
                              <button className="single_lib_table_type_btn">
                                <img className="single_lib_table_type_img" src="/Images/videoLc.svg" />
                              </button>
                              :
                              <button onClick={() => onShowMaster(event.video, event.background_image,event)} className="single_lib_table_type_btn">
                                <img className="single_lib_table_type_img" src="/Images/playB.svg" />
                              </button>
                            }
                          </td>
                        </tr>
                      )
                        :
                        <div> </div>
                      }

                      {/* Wellness Quotes */}
                      {singlepackage.quotes ? singlepackage.quotes.map(event =>

                        <tr key={event.id}>
                          <td>
                            <div className="row noPadding noMargin">
                              <div className="col-1 noPadding"><input onChange={() => onChecked(event)} type="checkbox" className="chkinp" ></input></div>
                              <div className="col noPadding">{event.title}</div>
                            </div>
                          </td>
                          <td>{event.narrator} </td>
                          {/* <td>{event.date}</td> */}
                          <td className="text-left">
                            <span className="single_lib_table_duration_span">{event.duration} min</span>
                            <button onClick={() => onShowMaster(event)} className="single_lib_table_type_btn">
                              <img className="single_lib_table_type_img" src="/Images/playB.svg" />
                            </button>
                          </td>
                        </tr>
                      )
                        :
                        <div></div>
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



        {showMaster === true ?
          <div className="single_lib_scss_inst_sec">

            <div ref={modalRef} id="single_lib_overlay2" className="single_lib_overlay2">
              <div className="overlay2-main" style={{ backgroundColor: "white", height: "auto" }}>
                <div className="single_lib_header_sec_desc row noMargin">
                  <div className="single_lib_popup_desc col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding text-left">
                    Class Details
                  </div>
                  <div className="single_lib_popup_close col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding text-right">
                    <button className="single_lib_close_btn" onClick={() => onCloseMaster()}  >Close</button>
                  </div>
                </div>
                <div className="single_lib_video_div">


                  {localStorage.getItem('Package') !== 'Video' ?
                    <div className={isPlaying ? "single_lib_test_trn single_lib_testTrnF" : "single_lib_test_trn"}  >
                      <img src={currBG} className="single_lib_AudImg" />
                    </div>

                    :
                    <></>
                  }

                  {localStorage.getItem('Package') === 'Video' ?
                    <video disablePictureInPicture controlsList="nodownload" className={fullClass ? "single_lib_full_cls single_lib_cls_vid" : "single_lib_half_cls single_lib_cls_vid"} autoplay id="video1" width="100%" height="64%" controls >
                      < source src={currPack} type="video/mp4" />

                    </video>
                    :
                    <video disablePictureInPicture controlsList="nodownload" className={fullClass ? "single_lib_full_cls single_lib_cls_vid" : "single_lib_half_cls single_lib_cls_vid"} autoplay id="video1" width="100%" height="64%" controls  >
                      < source src={currPack} type="video/mp4" />

                    </video>
                  }

                  <button onClick={() => backward30()} id="rewind1-btn" class="video-controls">
                    <img className="single_lib_plyBtn" src='/Images/rewind 1.svg' />
                  </button>
                  <button className="play-Btn" onClick={() => playVid()} id="play-btn" class="video-controls">
                    {!isVideoPlaying ?
                      <img className="single_lib_plyBtn" src='/Images/playW.svg' />
                      :
                      <img className="single_lib_plyBtn" src='/Images/videopause.png' />
                    }
                  </button>
                  <button onClick={() => forward30()} id="rewind2-btn" class="video-controls">
                    <img className="single_lib_plyBtn" src='/Images/rewind 2.svg' />
                  </button>
                </div>
                <div className={localStorage.getItem('Package') === 'Video' ? "single_lib_libInsVid" : "single_lib_libInsVid"} >
                  {/* <div className="insDiv indDivBl" style={{ width: "100%" }}> */}

                  {isMoreDetails === false ?

                    <div className="single_lib_insDesc" style={{ width: "100%" }}>
                      <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-2 noPadding text-left single_lib_inst_img_div">
                        <div className="single_lib_inst_pro_div noPadding">
                          <img className="single_lib_inst_pro_pic" src={singlepackage.main_master_image} />
                        </div>
                      </div>
                      <div className="col-xl-9 col-lg-9 col-md-7 col-sm-7 col-7 noPadding">
                        <div className="single_lib_name_n_see_profile_div">
                          <span className="single_lib_video_inst_name_span">{singlepackage.main_master_name} </span>
                          <button onClick={()=>{
                               profileHandleShow()
                               setinsClickDat(singlepackage);
                            }} className="single_lib_seePrBtn">See Profile</button>
                        </div>
                        <div className="single_lib_inst_quali_div" >
                          <span className="single_lib_vid_inst_quali_span">iwcniwcn</span>
                          {/* <span className="single_lib_vid_inst_quali_span">M.A. Ph.D. in Yoga Sciences</span> */}
                        </div>
                        <div className="single_lib_inst_rating_div row noPadding noMargin">
                          <div className="col-6 text-left mlLg noPadding">
                            <img className="single_lib_inst_rating_img align_self_center" src="/Images/star.svg" />
                            {/* <span className="single_lib_vid_inst_star_span">4.5</span> */}
                            {/* <span className="single_lib_vid_inst_star_span">vo0ejv0oerv</span> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-3 noPadding single_lib_inst_img_div">
                        {currDesp != null  ?
                          <button onClick={(e) => onShoWClick(e)} className="single_lib_see_more_vid_pop">
                            More Details
                            <img src='/Images/RightCircleB.svg' />
                          </button>
                          : <div></div>
                        }
                      </div>
                    </div>
                    :

                    <div className="row noMargin single_lib_more_desc_sec" >
                      <div className="col-xl-10 col-lg-10 col-md-9 col-sm-9 col-9 noPadding single_lib_vid_desc_div">
                        {/* <span>this sd9nv vdvnfv dffv inv vjjd vjdvvjd vjd vdfvj vjd vdvuisbv</span> */}
                        <span>{currDesp}</span>
                      </div>
                      <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-3 noPadding single_lib_desc_vid_div" style={{ "display": "grid" }}>
                        <button onClick={(e) => onShoWClick(e)} className="single_lib_see_more_vid_pop">
                          Less Details
                          <img src='/Images/RightCircleB.svg' />
                        </button>
                      </div>

                    </div>
                  }
                  {/* </div> */}

                </div>

              </div>
            </div>
          </div>
          :
          <></>}

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

            <div className="single_lib_scss_inst_sec">
              <div className="row noMargin noPadding wellness_header">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noPadding cat_head">Session Title</div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding cat_head">Sub Category</div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 noPadding cat_head">Duration</div>
              </div>
              <div className="row noMargin noPadding category_body">
                {singlepackage && singlepackage.wellness_audios && singlepackage.wellness_audios.map((item) => (
                  <div className="row noMargin noPadding each_category_sec">{/* Loop this div while binding */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noPadding cat_body">{item.title}</div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding cat_body">{item.subcategory_name}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 noPadding cat_body">{item.duration}mins</div>
                  </div>
                ))}
                {singlepackage && singlepackage.wellness_videos && singlepackage.wellness_videos.map((item) => (
                  <div className="row noMargin noPadding each_category_sec">{/* Loop this div while binding */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noPadding cat_body">{item.title}</div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding cat_body">{item.subcategory_name}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 noPadding cat_body">{item.duration}mins</div>
                  </div>
                ))}
                {singlepackage && singlepackage.quotes && singlepackage.quotes.map((item) => (
                  <div className="row noMargin noPadding each_category_sec">{/* Loop this div while binding */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noPadding cat_body">{item.title}</div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding cat_body">{item.subcategory_name}</div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 noPadding cat_body">{item.duration}mins</div>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
        </Modal>

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


      </main>
    </div>
  );
}


