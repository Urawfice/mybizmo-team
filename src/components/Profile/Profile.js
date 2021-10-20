import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Navbar from "../Navbar/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { toast } from "react-toastify";
import PersonalDetails from "../MyZone/PersonalDetails";

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

function Profile(props) {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [check, setCheck] = useState(2);
  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.clientWidth
  );
  const handleParentData = (value) => {
    setCheck(value);
  };
  return (
    <div>
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
      <main className="subscription_main_class">
        <div className="row noMargin noPadding top_menu_btn_sec_scss_class">
          <div className="col-12 top_menu_sec noPadding noMargin">
            <button className="topmenu_btn active_menu">
              <img className="topMenu_icon " src="Images/subsA.svg" /> Personal
              Details{" "}
            </button>

            <Link to="/my-schedule">
              <button className="topmenu_btn">
                <img className="topMenu_icon" src="Images/mySchA.svg" />{" "}
                Professional Details{" "}
              </button>
            </Link>

            <Link to="/my-activity">
              <button className="topmenu_btn">
                <img className="topMenu_icon" src="Images/myActA.svg" /> Upload
                Documents{" "}
              </button>
            </Link>

            <Link to="/messaging">
              <button className="topmenu_btn">
                <img className="topMenu_icon" src="Images/myProA.svg" /> Login &
                Security{" "}
              </button>
            </Link>
            {/* <button className='topmenu-btn'><img className='topMenu-icon' src='Images/moreA.svg'/> More </button> */}
          </div>
        </div>
        <PersonalDetails />
      </main>
    </div>
  );
}

export default Profile;
