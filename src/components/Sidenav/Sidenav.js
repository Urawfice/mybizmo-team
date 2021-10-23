import React, { useState, useEffect, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Navbar from "../Navbar/Navbar";
import SliderImg from "../Slider/Slider";
import Library from "../Slider/Library";
import Loader from "react-loader-spinner";

import { withRouter } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import axios from "../../Axios";
import Cookies from "universal-cookie";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Home from "@material-ui/icons/Home";
import Card from "../Slider/Card";
import EventCard from "../Slider/EventCard";
import { Container, Row, Col } from "reactstrap";
// import { Link } from "@material-ui/core";

import Scrollable from "../Slider/Scrollable";
import Recommended from "../Slider/Recommended";
import "./sidenav.scss";
// import '../Slider/banner.css';
// import '../Slider/Recommended_ExclusiveFree.css';
// import '../Slider/Explore_package.css';
// import '../Slider/your_schedule.css';
// import '../Slider/home_library.css'

import ExclusiveFreebies from "../Slider/ExclusiveFreebies";
import { GoogleApiWrapper } from "google-maps-react";
import MapContainer from "../../Map";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const drawerWidth = 160;

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
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const cookies = new Cookies();

const styles = (theme) => ({
  listItemText: {
    fontSize: "40px",
  },
});

export default function Sidenav() {
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
  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.clientWidth
  );

  const handleResize = (e) => {
    setWindowWidth(document.documentElement.clientWidth);
  };
  useEffect(() => {
    // if(windowWidth<920){
    setCheck(2);
    // }
    // else{
    //   setCheck(1);
    // }
  }, [windowWidth]);

  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  console.log(check);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    getImages();
  }, []);

  const getImages = async () => {
    console.log(cookies.get("token"));

    await axios
      .get("/users/banner-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        var arr = [];
        if (res.data.length === 1 || res.data.length === 2) {
          arr.push("X");
        }
        arr.push(...res.data);
        while (arr.length < 4) {
          arr.push("X");
        }
        setItems(arr.slice(0, arr.length - 1));
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/today-events", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        var arr = res.data.daa;
        console.log(arr);
        setOnline(res.data.daa);
        setOffLine(res.data.daa);
        setOnlineCount(res.data.online_count);
        setofflineCount(res.data.offline_count);
        setOfflineDef(res.data.empty_offline_class);
        setOnlineDef(res.data.empty_online_class);
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/today-stream", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setEvents(res.data.data);
        setEventCount(res.data.stream_count);
        setEventDef(res.data.empty_event);
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/audio-package-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setAudio(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    await axios
      .get("/users/video-package-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setVideo(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/quote-package-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setQuotes(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/packages", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          package_type: "Online Class",
        },
      })
      .then((res) => {
        console.log(res.data);
        setOnlinePack(res.data);
        console.log(onlinePack);
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/packages", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          package_type: "Offline Class",
        },
      })
      .then((res) => {
        console.log(res.data);
        setOfflinePack(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/packages", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          package_type: "Event",
        },
      })
      .then((res) => {
        console.log(res.data);
        // while(arr.length<5){
        //   arr.push("A")
        // }
        setEventPack(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleParentData = (value) => {
    setCheck(value);
    // console.log(window.innerWidth);
    // console.log("A")
  };

  return (
    <>
      {onlinePack.length === 0 ||
      offlinePack.length === 0 ||
      eventPack.length === 0 ||
      quotes.data.length === 0 ? (
        <div style={{ backgroundColor: "white" }}>
          <div style={{ marginTop: "200px", marginLeft: "0%" }}>
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={200}
              width={200}
              timeout={3000} //3 secs
            />
          </div>
        </div>
      ) : (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Navbar value={check} handleData={handleParentData} />
          </AppBar>

          {check === 1 ? (
            windowWidth < 920 ? (
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
                      <button className="nbtn" style={{ color: "#03CBC9" }}>
                        <ListItem className="test1">
                          <ListItemIcon style={{ minWidth: "2.27vw" }}>
                            <img
                              onMouseOut={(e) =>
                                (e.currentTarget.src = "Images/homeB.svg")
                              }
                              onMouseOver={(e) =>
                                (e.currentTarget.src = "Images/homeB.svg")
                              }
                              id="icon"
                              style={{ height: "2.77vh" }}
                              src="Images/homeB.svg"
                              alt="classes"
                            />
                          </ListItemIcon>
                          <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Home"
                          />
                        </ListItem>
                      </button>
                    </div>

                    <div id="menuItem">
                      <Link to="/classes">
                        <button className="nbtn">
                          <ListItem className="test">
                            <ListItemIcon style={{ minWidth: "2.27vw" }}>
                              <img
                                onMouseOut={(e) =>
                                  (e.currentTarget.src = "Images/classes.svg")
                                }
                                onMouseOver={(e) =>
                                  (e.currentTarget.src = "Images/classes.svg")
                                }
                                style={{ height: "2.77vh" }}
                                src="Images/classes.svg"
                                alt="classes"
                              />{" "}
                            </ListItemIcon>
                            <ListItemText primary="Classes" />
                          </ListItem>
                        </button>
                      </Link>
                    </div>

                    <div id="menuItem">
                      <Link to="/library">
                        <button className="nbtn">
                          <ListItem className="test">
                            <ListItemIcon style={{ minWidth: "2.27vw" }}>
                              <img
                                style={{ height: "2.77vh" }}
                                src="Images/library.svg"
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
                      <Link to="/instructor">
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
                        <button className="nbtn">
                          <ListItem className="test">
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
                      <Link to="/instructor">
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
                      <button className="nbtn" style={{ color: "#03CBC9" }}>
                        <ListItem className="test1">
                          <ListItemIcon style={{ minWidth: "2.27vw" }}>
                            <img
                              onMouseOut={(e) =>
                                (e.currentTarget.src = "Images/homeB.svg")
                              }
                              onMouseOver={(e) =>
                                (e.currentTarget.src = "Images/homeB.svg")
                              }
                              id="icon"
                              style={{ height: "2.77vh" }}
                              src="Images/homeB.svg"
                              alt="classes"
                            />
                          </ListItemIcon>
                          <ListItemText
                            classes={{ primary: classes.listItemText }}
                            primary="Home"
                          />
                        </ListItem>
                      </button>
                    </div>

                    <div id="menuItem">
                      <Link to="/classes">
                        <button className="nbtn">
                          <ListItem className="test">
                            <ListItemIcon style={{ minWidth: "2.27vw" }}>
                              <img
                                onMouseOut={(e) =>
                                  (e.currentTarget.src = "Images/classes.svg")
                                }
                                onMouseOver={(e) =>
                                  (e.currentTarget.src = "Images/classes.svg")
                                }
                                style={{ height: "2.77vh" }}
                                src="Images/classes.svg"
                                alt="classes"
                              />{" "}
                            </ListItemIcon>
                            <ListItemText primary="Classes" />
                          </ListItem>
                        </button>
                      </Link>
                    </div>

                    <div id="menuItem">
                      <Link to="/library">
                        <button className="nbtn">
                          <ListItem className="test">
                            <ListItemIcon style={{ minWidth: "2.27vw" }}>
                              <img
                                style={{ height: "2.77vh" }}
                                src="Images/library.svg"
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
                      <Link to="/instructor">
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
                        <button className="nbtn">
                          <ListItem className="test">
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
          <main className="home_page_main_class">
            {/* ------------------Top Slider START-------------- */}
            <div className="row noPadding noMargin top_slider_div">
              <SliderImg show={3}>
                {items.map((item) => (
                  <>
                    {item === "X" || item.banner_image === undefined ? (
                      <div
                        style={{
                          backgroundColor: "white",
                          borderRadius: "10px",
                        }}
                        className="item outer"
                      >
                        <img
                          className="slider_img"
                          alt="img"
                          src="/Images/default-banner.png"
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "white",
                          borderRadius: "10px",
                          position: "relative",
                        }}
                        className="slider_img_div"
                      >
                        <img
                          className="slider_img"
                          alt="img"
                          src={item.banner_image}
                        />
                      </div>
                    )}
                  </>
                ))}
              </SliderImg>
            </div>
            {/* -------------------Top Slider END-------------- */}

            {/* ------------------Schedule section START-------------- */}
            {onlinePack.length > 0 &&
            offlinePack.length > 0 &&
            eventPack.length > 0 ? (
              <div className="row noMargin noPadding">
                <div className="section_head text-left">
                  Your Schedule For Today
                </div>
                <div className="row noMargin noPadding">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin schedule_card_div">
                    <Card
                      count={onlineCount}
                      defImg={onlineDef}
                      title="online"
                      items={online}
                    />
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin schedule_card_div">
                    <Card
                      count={offlineCount}
                      defImg={offlineDef}
                      title="offline"
                      items={offLine}
                    />
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin schedule_card_div">
                    <EventCard
                      count={eventCount}
                      defImg={eventDef}
                      title="events"
                      items={events}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {/* ------------------Schedule section END-------------- */}

            {/* ------------------Explore section START-------------- */}
            {onlinePack.length > 0 ||
            offlinePack.length > 0 ||
            eventPack.length > 0 ? (
              <div className="section_head text-left">Explore Packages</div>
            ) : (
              <></>
            )}
            <div className="row noMargin explore_main_div">
              <div className="card explore_card noPadding">
                {onlinePack.length > 0 ? (
                  <div className="row noMargin noPadding">
                    <div class="online_scroll_div noPadding">
                      <Scrollable
                        package="Online Class"
                        title="online"
                        url="/users/packages"
                        items={onlinePack}
                      />
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                {offlinePack.length > 0 ? (
                  <div className="row noMargin noPadding">
                    <div class="offline_scroll_div">
                      <Scrollable
                        package="Offline Class"
                        title="offline"
                        url="/users/packages"
                        items={offlinePack}
                      />
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                {eventPack.length > 0 ? (
                  <div className="row noMargin noPadding">
                    <div class="event_scroll_div">
                      <Scrollable
                        package="Event"
                        title="events"
                        url="/users/packages"
                        items={eventPack}
                      />
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            {/* ------------------Explore section END-------------- */}

            {/* ------------------Content Library section START-------------- */}
            {onlinePack.length === 0 &&
            offlinePack.length === 0 &&
            eventPack.length === 0 ? (
              <div>
                {audio.data || video.data || quotes.data ? (
                  <div className="section_head text-left">
                    Content Library Packages
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : audio.data || video.data || quotes.data ? (
              <div className="section_head text-left">
                Content Library Packages
              </div>
            ) : (
              <div className="section_head text-left">
                Content Library Packages
              </div>
            )}
            {audio.data || video.data || quotes.data ? (
              <div className="row noMargin noPadding">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin audio_card_div">
                  <Library title="Audio" items={audio} />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin video_card_div">
                  <Library title="Video" items={video} />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin quotes_card_div">
                  <Library title="Quote" items={quotes} />
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {/* ------------------Content Library section END-------------- */}

            {/* ------------------Recommended and ExclusiveFreebies section START-------------- */}
            <div className="row noMargin explore_main_div recommended_main_div">
              <div className="card explore_card noPadding">
                <div className="row noMargin noPadding">
                  <div class="online_scroll_div noPadding">
                    <Recommended
                      title="Recommended For You"
                      url="/users/recommendation-package-list"
                    />
                  </div>
                </div>
                <div className="row noMargin noPadding">
                  <div class="online_scroll_div noPadding">
                    <ExclusiveFreebies
                      title="Exclusive Freebies"
                      url="/users/recommendation-other-list"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------Recommended and ExclusiveFreebies section END-------------- */}
          </main>
        </div>
      )}
    </>
  );
}
