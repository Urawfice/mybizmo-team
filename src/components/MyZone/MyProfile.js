import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Navbar from "../Navbar/Navbar";

import axios from "../../Axios";
import Cookies from "universal-cookie";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "react-toastify/dist/ReactToastify.css";

import "../Classes/ClassesStyle.css";
import "../Library/LibraryStyle.css";

import "../Library/LibraryStyle(new).css";
// import '../Library/SingleLibrary.css';
import "../Sidenav/sidenavStyle.css";
// import './subscription.css';

import "./topMenu.scss";
// import './MyActivity.css';
import "./myProfile.scss";
import { Link, useHistory } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import { Button, OverlayTrigger } from "react-bootstrap";
import { Popover, Tooltip } from "bootstrap";
import Activities from "./Activities";
import PersonalDetails from "./PersonalDetails";
import UploadDocs from "./UploadDocs";
import LoginSecurity from "./LoginSecurity";
import ProfessionalDetails from "./ProfessionalDetails";

const drawerWidth = 160;
toast.configure();

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
    position: "fixed",
    zIndex: "20",
  },
  drawerPaper: {
    width: drawerWidth,
    // height: "auto",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const cookies = new Cookies();
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Simple tooltip
  </Tooltip>
);

export default function MyProfile(props) {
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
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [arrFinal, setArrFinal] = useState("");
  const [arrLibFinal, setArrLibFinal] = useState([]);
  const [onlineFArray, setOnlineFArray] = useState([]);
  const [onlineNumArray, setOnlineNumArray] = useState([]);
  const [onlineCatArray, setOnlineCatArray] = useState([]);
  const [onlineDurArray, setOnlineDurArray] = useState([]);
  const [onlineInsArray, setOnlineInsArray] = useState([]);
  const [onlineRatArray, setOnlineRatArray] = useState([]);
  const [onlineFeatArray, setOnlineFeatArray] = useState([]);
  const [instruct, setInstruct] = useState([]);
  const [freeby, setFreeby] = useState([]);
  const [activeCl, setActiveCl] = useState("Classes");
  const [activeHead, setActiveHead] = useState("personal");

  const [showDesc, setShowDesc] = useState(false);
  const [des, setDes] = useState("");

  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.clientWidth
  );
  const handleResize = (e) => {
    setWindowWidth(document.documentElement.clientWidth);
  };

  // useEffect(() => {
  //   interval();

  // },[])
  useEffect(() => {
    if (windowWidth < 920) {
      setCheck(2);
    }
    window.setTimeout(console.log("BBB"), 2000);

    console.log(props.location.url);
    if (props.location.fromPackage) {
      setActiveHead("Login");
      cookies.set("url", props.location.url);
    }
  }, [windowWidth]);

  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    getImages();
    console.log(props.location);
    if (props.location.checkS !== undefined) {
      let check = props.location.checkS.displayTitle;
      if (check === "Offline") {
        offlineClick();
      } else if (check === "Events") {
        eventClick();
      }

      onlineClick();
    } else {
      onlineClick();
    }

    checkbtn();
  }, []);

  const getImages = async () => {
    let totalArr = [];
    console.log(cookies.get("token"));

    await axios
      .get("/users/subscription-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        // params: {
        //   package_type: "Classes"
        // },
      })
      .then((res) => {
        console.log(res);
        let arr = res.data.classes;
        let tar = [];
        arr.map((item) => {
          if (!tar.includes(item.main_master_name))
            tar.push(item.main_master_name);
        });
        setInstruct(tar);

        console.log(instruct);
        setArrM(arr);

        setArrFinal(arr);
        setOnlinePack(arr);
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/subscription-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        // params: {
        //   package_type: "Library"
        // },
      })
      .then((res) => {
        console.log(res.data);
        let arr = res.data.library;

        setOfflinePack(arr);
        setArrLibFinal(arr);
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/categories", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);

        setCateg(res.data);
        console.log(categ);
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/recommendation-package-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);

        setFreeby(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    checkbtn();
  }, [onlinePack, offlinePack, eventPack]);

  useEffect(() => {
    checkbtn();
  }, [isEvent, isOffline, isOnline]);

  const checkbtn = (e) => {
    if (isEvent === true) {
      setArrM(eventPack);
    } else if (isOffline === true) {
      setArrM(offlinePack);
    } else if (isOnline === true) {
      setArrM(onlinePack);
    } else {
      let tp = [];
      tp.push(...onlinePack);
      tp.push(...offlinePack);
      tp.push(...eventPack);
      setArrM(tp);
    }
  };

  const onlineClick = (e) => {
    setIsOnline(true);
    setIsOffline(false);
    setIsEvent(false);
    setIsAll(false);
    setActiveCatId(0);
    setActiveBtn("Online");
    setOnlineNumArray([]);
    setOnlineFArray([]);
    setOnlineCatArray([]);
    setOnlineDurArray([]);
    setOnlineInsArray([]);
    setOnlineRatArray([]);
    setOnlineFeatArray([]);
  };

  const offlineClick = (e) => {
    setIsOnline(false);
    setIsOffline(true);
    setIsEvent(false);
    setIsAll(false);
    setActiveCatId(0);
    setActiveBtn("Offline");
    setOnlineNumArray([]);
    setOnlineFArray([]);
    setOnlineCatArray([]);
    setOnlineDurArray([]);
    setOnlineInsArray([]);
    setOnlineRatArray([]);
    setOnlineFeatArray([]);
  };

  const eventClick = (e) => {
    setIsOnline(false);
    setIsOffline(false);
    setIsEvent(true);
    setIsAll(false);
    setActiveCatId(0);
    setActiveBtn("Events");
  };

  const handleParentData = (value) => {
    setCheck(value);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Navbar value={check} handleData={handleParentData} />
      </AppBar>

      {check === 1 ? (
        windowWidth < 918 ? (
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
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            onMouseOut={(e) =>
                              (e.currentTarget.src = "Images/home.svg")
                            }
                            onMouseOver={(e) =>
                              (e.currentTarget.src = "Images/home.svg")
                            }
                            id="icon"
                            style={{ height: "2.77vh" }}
                            src="Images/home.svg"
                            alt="classes"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/profile">
                    <button className="nbtn" style={{ color: "#03CBC9" }}>
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/myZone.svg"
                            alt="profile"
                          />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </ListItem>
                    </button>
                  </Link>
                </div>

                <div id="menuItem">
                  <Link to="/schedules">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/myZone.svg"
                            alt="schedules"
                          />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Schedules" />
                      </ListItem>
                    </button>
                  </Link>
                </div>

                <div id="menuItem">
                  <Link to="/connect">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/myZone.svg"
                            alt="connect"
                          />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Connect" />
                      </ListItem>
                    </button>
                  </Link>
                </div>

                <div id="menuItem">
                  <Link to="/financials">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/library.svg"
                            alt="financials"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Financials" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="">
                    <button className="nbtn">
                      <ListItem className="test1">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/packages.svg"
                            alt="packages"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="instructor">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/smeet.svg"
                            alt="zone"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Influencers" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/subscription">
                    <button className="nbtn" style={{ color: "#03CBC9" }}>
                      <ListItem className="test1">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/myZone.svg"
                            alt="zone"
                          />
                        </ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="instructor">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/smeet.svg"
                            alt="zone"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Biz Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
              </List>
            </div>
          </Drawer>
        ) : (
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
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            onMouseOut={(e) =>
                              (e.currentTarget.src = "Images/home.svg")
                            }
                            onMouseOver={(e) =>
                              (e.currentTarget.src = "Images/home.svg")
                            }
                            id="icon"
                            style={{ height: "2.77vh" }}
                            src="Images/home.svg"
                            alt="classes"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/profile">
                    <button className="nbtn" style={{ color: "#03CBC9" }}>
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/myZone.svg"
                            alt="profile"
                          />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </ListItem>
                    </button>
                  </Link>
                </div>

                <div id="menuItem">
                  <Link to="/schedules">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/myZone.svg"
                            alt="schedules"
                          />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Schedules" />
                      </ListItem>
                    </button>
                  </Link>
                </div>

                <div id="menuItem">
                  <Link to="/connect">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/myZone.svg"
                            alt="connect"
                          />{" "}
                        </ListItemIcon>
                        <ListItemText primary="Connect" />
                      </ListItem>
                    </button>
                  </Link>
                </div>

                <div id="menuItem">
                  <Link to="/financials">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/library.svg"
                            alt="financials"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Financials" />
                      </ListItem>
                    </button>
                  </Link>
                </div>

                <div id="menuItem">
                  <Link to="/packages">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/packages.svg"
                            alt="packages"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="instructor">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/smeet.svg"
                            alt="zone"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Influencers" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/subscription">
                    <button className="nbtn" style={{ color: "#03CBC9" }}>
                      <ListItem className="test1">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/myZone.svg"
                            alt="zone"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="instructor">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="Images/smeet.svg"
                            alt="zone"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Biz Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
              </List>
            </div>
            <Toolbar />
          </Drawer>
        )
      ) : (
        <div></div>
      )}
      <main className="my_profile_main">
        <div className="row noMargin noPadding top_menu_btn_sec_scss_class">
          <div className="col-12 top_menu_sec noPadding noMargin">
            <button
              className={
                activeHead == "personal"
                  ? "topmenu_btn active_menu"
                  : "topmenu_btn"
              }
              onClick={() => setActiveHead("personal")}
            >
              <img className="topMenu_icon " src="Images/subsA.svg" /> Personal
              Details{" "}
            </button>

            <button
              className={
                activeHead == "professional"
                  ? "topmenu_btn active_menu"
                  : "topmenu_btn"
              }
              onClick={() => setActiveHead("professional")}
            >
              <img className="topMenu_icon" src="Images/mySchA.svg" />{" "}
              Professional Details{" "}
            </button>

            <button
              className={
                activeHead == "upload"
                  ? "topmenu_btn active_menu"
                  : "topmenu_btn"
              }
              onClick={() => setActiveHead("upload")}
            >
              <img className="topMenu_icon" src="Images/myActA.svg" /> Upload
              Documents{" "}
            </button>
            <Link to="/messaging">
              <button className="topmenu_btn">
                <img className="topMenu_icon" src="Images/msgA.svg" /> Gallery{" "}
              </button>
            </Link>

            <Link to="/my-profile">
              <button
                className={
                  activeHead == "login"
                    ? "topmenu_btn active_menu"
                    : "topmenu_btn"
                }
                onClick={() => setActiveHead("login")}
              >
                <img className="topMenu_icon" src="Images/myProA.svg" /> Login &
                Security{" "}
              </button>
            </Link>
          </div>
        </div>

        {activeHead === "personal" ? <PersonalDetails /> : <></>}

        {activeHead === "professional" ? <ProfessionalDetails /> : <></>}

        {activeHead === "upload" ? <UploadDocs /> : <></>}

        {activeHead === "login" ? <LoginSecurity /> : <></>}
      </main>
    </div>
  );
}
