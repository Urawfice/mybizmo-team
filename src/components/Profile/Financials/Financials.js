import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Navbar from "../../Navbar/Navbar";

import axios from "../../../Axios";
import Cookies from "universal-cookie";
import { Link, useHistory } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "react-toastify/dist/ReactToastify.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { toast } from "react-toastify";
import Billing from "./Billing";
import Payout from "./Payout";
import Bank from "./Bank";

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

function Financials(props) {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [check, setCheck] = useState(2);
  const [activeHead, setActiveHead] = useState("billing");
  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.clientWidth
  );
  const handleResize = (e) => {
    setWindowWidth(document.documentElement.clientWidth);
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
                    <button className="nbtn">
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
                            src="NavImages/scheduleimg.png"
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
                            src="NavImages/connectimg.png"
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
                    <button className="nbtn"  style={{ color: "#03CBC9" }}>
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="NavImages/financialsimg.png"
                            alt="financials"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Financials" />
                      </ListItem>
                    </button>
                  </Link>
                </div>                
                <div id="menuItem">
                  <Link to="/my-bizzone-main-page">
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
                    <button className="nbtn">
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
                            src="NavImages/scheduleimg.png"
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
                            src="NavImages/connectimg.png"
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
                    <button className="nbtn"  style={{ color: "#03CBC9" }}>
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
                            style={{ height: "2.77vh" }}
                            src="NavImages/financialsimg.png"
                            alt="financials"
                          />
                        </ListItemIcon>
                        <ListItemText primary="Financials" />
                      </ListItem>
                    </button>
                  </Link>
                </div>

                <div id="menuItem">
                  <Link to="/my-bizzone-main-page">
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
                activeHead == "billing"
                  ? "topmenu_btn active_menu"
                  : "topmenu_btn"
              }
              onClick={() => setActiveHead("billing")}
            >
              <img className="topMenu_icon " src="Images/subsA.svg" /> Billing{" "}
            </button>

            <button
              className={
                activeHead == "payout"
                  ? "topmenu_btn active_menu"
                  : "topmenu_btn"
              }
              onClick={() => setActiveHead("payout")}
            >
              <img className="topMenu_icon" src="Images/mySchA.svg" /> Payout{" "}
            </button>

            <button
              className={
                activeHead == "bank" ? "topmenu_btn active_menu" : "topmenu_btn"
              }
              onClick={() => setActiveHead("bank")}
            >
              <img className="topMenu_icon" src="Images/myActA.svg" /> Payment
              Details{" "}
            </button>
          </div>
        </div>

        {activeHead === "billing" ? <Billing /> : <></>}
        {activeHead === "payout" ? <Payout /> : <></>}
        {activeHead === "bank" ? <Bank /> : <></>}
      </main>
    </div>
  );
}

export default Financials;
