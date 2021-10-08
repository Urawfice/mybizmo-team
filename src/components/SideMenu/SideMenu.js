import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Navbar from "../Navbar/Navbar";
// import PlayerControlExample from "./PlayerControlExample";

// import '~video-react/dist/video-react.css';
import { Player, ControlBar } from "video-react";

import axios from "../../Axios";
import Cookies from "universal-cookie";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "react-toastify/dist/ReactToastify.css";

import "../Sidenav/sidenavStyle.css";
// import "./SingleLibrary.scss";
import { Link, useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import SliderImg from "../Slider/Slider";
// import SliderOne from "./SliderOne";
import { Button, Modal, Popover } from "react-bootstrap";
import { RatingView, Rating } from "react-simple-star-rating";

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

export default function SideMenu(props) {
  {
    /*
                    Active menu :->
                    Change src 
                    Change ListItem classname to test1 from test 
                    Change button color to  "#03CBC9"
                */
  }

  const classes = useStyles();
  const classes1 = useStyles1();

  return (
    <>
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
                    <ListItemIcon style={{ minWidth: " 2.27vw" }}>
                      <img
                        onMouseOut={(e) =>
                          (e.currentTarget.src = "/Images/home.svg")
                        }
                        onMouseOver={(e) =>
                          (e.currentTarget.src = "/Images/home.svg")
                        }
                        id="icon"
                        style={{ height: "20px" }}
                        src="/Images/home.svg"
                        alt="classes"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </button>
              </Link>
            </div>
            <div id="menuItem">
              <Link to="/classes">
                <button className="nbtn">
                  <ListItem className="test">
                    <ListItemIcon style={{ minWidth: " 2.27vw" }}>
                      <img
                        style={{ height: "2.77vh" }}
                        src="/Images/classes.svg"
                        alt="classes"
                      />{" "}
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                  </ListItem>
                </button>
              </Link>
            </div>
            <div id="menuItem">
              {/*
                    Active menu
                    Change src
                    Change ListItem classname to test1 from test 
                    Change button color to  "#03CBC9"
                    */}

              <Link to="/library">
                <button className="nbtn" style={{ color: "#03CBC9" }}>
                  <ListItem className="test1">
                    <ListItemIcon style={{ minWidth: " 2.27vw" }}>
                      <img
                        style={{ height: "2.77vh" }}
                        src="/Images/libraryB.svg"
                        alt="library"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Library" />
                  </ListItem>
                </button>
              </Link>
            </div>
            <div id="menuItem">
              <Link to="/packages">
                <button className="nbtn">
                  <ListItem className="test">
                    <ListItemIcon style={{ minWidth: " 2.27vw" }}>
                      <img
                        style={{ height: "2.77vh" }}
                        src="/Images/packages.svg"
                        alt="packages"
                      />
                    </ListItemIcon>
                    <ListItemText primary="Packages" />
                  </ListItem>
                </button>
              </Link>
            </div>
            <div id="menuItem">
              <Link to="/instructor">
                <button className="nbtn">
                  <ListItem className="test">
                    <ListItemIcon style={{ minWidth: "2.27vw" }}>
                      <img
                        style={{ height: "2.77vh" }}
                        src="/Images/smeet.svg"
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
                <button className="nbtn">
                  <ListItem className="test">
                    <ListItemIcon style={{ minWidth: " 2.27vw" }}>
                      <img
                        style={{ height: "2.77vh" }}
                        src="/Images/myZone.svg"
                        alt="zone"
                      />
                    </ListItemIcon>
                    <ListItemText primary="My Zone" />
                  </ListItem>
                </button>
              </Link>
            </div>
            <div id="menuItem">
              <Link to="/instructor">
                <button className="nbtn">
                  <ListItem className="test">
                    <ListItemIcon style={{ minWidth: "2.27vw" }}>
                      <img
                        style={{ height: "2.77vh" }}
                        src="/Images/smeet.svg"
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
    </>
  );
}
