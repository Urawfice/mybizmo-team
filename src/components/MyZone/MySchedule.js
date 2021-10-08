import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Navbar from "../Navbar/Navbar";
import DatePicker from "react-datepicker";

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
// import './subscription.css';
// import './Messaging.css'
import "./topMenu.scss";
import "./mySchedule.scss";
import { Link, useHistory } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import { Button, OverlayTrigger } from "react-bootstrap";
import { Popover, Tooltip } from "bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { Today } from "@material-ui/icons";

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

export default function MySchedule(props) {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [check, setCheck] = useState(2);
  const [onlinePack, setOnlinePack] = useState([]);
  const [offlinePack, setOfflinePack] = useState([]);
  const [eventPack, setEventPack] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isEvent, setIsEvent] = useState(false);
  const [isAll, setIsAll] = useState(true);
  const [arrM, setArrM] = useState([]);
  const [categ, setCateg] = useState([]);
  const [activecatId, setActiveCatId] = useState(0);
  const [activeBtn, setActiveBtn] = useState();
  const [activeBtn1, setActiveBtn1] = useState("Today");
  const [isFilterShow, setIsFilterShow] = useState(false);
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
  const [msgData, setMsgData] = useState();
  const [clickData, setClickData] = useState();
  const [isMsg, setIsMsg] = useState(false);
  const [isMsgOpen, setisMsgOpen] = useState(false);
  const [sub, setSub] = useState("");
  const [message, setMessage] = useState("");
  const [insData, setInsData] = useState();
  const [insAll, setInsAll] = useState("");
  const [actIns, setActiveIns] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [activeId, setactiveId] = useState([]);
  const [finalA, setFinal] = useState();
  const [todayData, setTodayData] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [isCustom, setIsCustom] = useState(false);
  const [changeEveryMin, setChangeEveryMin] = useState(1);

  const [showDesc, setShowDesc] = useState(false);
  const [des, setDes] = useState("");

  const [isLive, setIsLive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.clientWidth
  );

  const [name, setName] = useState("");
  const [foundUsers, setFoundUsers] = useState();
  const [timeLeft, setTimeLeft] = useState("");

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = insAll.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(insAll);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };

  const handleResize = (e) => {
    setWindowWidth(document.documentElement.clientWidth);
  };
  useEffect(() => {
    if (windowWidth < 920) {
      setCheck(2);
    }
    setInterval(() => {
      setChangeEveryMin(changeEveryMin + 1);
    }, 10000);
  }, [windowWidth]);

  const handleCheck = (e) => {
    console.log(e);
    let ta = activeId;
    console.log(e);
    if (activeId.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    } else {
      ta.push(e);
      console.log("A");
    }
    setactiveId(ta);
    console.log(activeId);
    return false;
  };

  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    getImages();
  }, []);

  useEffect(() => {
    if (finalA) {
      console.log("Aa");
      setMsgData(finalA);
    }
    onfilterDate();
  }, [toDate, fromDate]);

  const onSendMsg = () => {
    console.log("a");
    let id = actIns.user_id;
    console.log(cookies.get("id"));

    axios
      .post(
        `users/message-send`,
        {
          sender: cookies.get("id"),
          receiver: id,
          header: sub,
          message: message,
        },
        {
          headers: {
            Authorization: "Token " + cookies.get("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Successfully Sent", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Some error occured", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
      });
  };

  const onfilterDate = () => {
    onCustomClick();
    // let ta= finalA;
    // console.log('date filter '+toDate+" "+fromDate );
    // if(toDate && fromDate && ta){
    //   console.log('date filter1');
    //   var ar = ta.filter((item)=>{
    //     console.log(item.created_at.slice(0,10))
    //     return item.created_at.slice(0,10) >=fromDate && item.created_at.slice(0,10)<=toDate
    //   })
    //   console.log(ar)
    //   setMsgData(ar);

    // }
  };

  const getImages = async () => {
    let totalArr = [];
    console.log(cookies.get("token"));

    await axios
      .get("/users/today-events", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        let ta = res.data.daa;
        console.log(ta);

        axios
          .get("/users/today-stream", {
            headers: {
              Authorization: "Token" + " " + cookies.get("token"),
            },
          })
          .then((res) => {
            ta.push(...res.data.data);
            console.log(ta);
            setTodayData(ta);
            setDaysData(ta);
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/package-list-by-content", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          package_type: "Classes",
        },
      })
      .then((res) => {
        console.log(res.data);
        let arr = res.data;
        let tar = [];
        arr.map((item) => {
          if (!tar.includes(item.main_master_name))
            tar.push(item.main_master_name);
        });
        setInstruct(tar);

        setArrM(arr);

        setArrFinal(arr);
        setOnlinePack(arr);
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/package-list-by-content", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          package_type: "Library",
        },
      })
      .then((res) => {
        console.log(res.data);
        let arr = res.data;

        setOfflinePack(arr);
        setArrLibFinal(arr);
      })
      .catch((err) => {
        console.log("err", err);
      });

    await axios
      .get("/users/all-team-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setFoundUsers(res.data);
        setInsAll(res.data);
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

  function getMonthName(date) {
    const d = new Date();
    if (!date) {
      return;
    }
    let day = parseInt(date.split("-")[2]);
    let month = parseInt(date.split("-")[1]);
    let year = parseInt(date.split("-")[0]);

    d.setMonth(month - 1);
    let monthName = d.toLocaleString("default", { month: "long" });
    monthName = monthName.slice(0, 3);
    let finalDate = day + " " + monthName + " " + year;
    return finalDate;
  }

  useEffect(() => {
    checkbtn();
  }, [onlinePack, offlinePack, eventPack]);

  useEffect(() => {
    checkbtn();
  }, [isEvent, isOffline, isOnline]);

  // useEffect(() => {
  //   openMsg();
  // }, [isMsg, clickData])

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

  const onMsgClick = (e) => {
    // console.log("AAA")
    setInsData(e);
    if (isMsg) {
      setIsMsg(false);
    } else {
      setIsMsg(true);
    }
  };

  const onTodayClick = (e) => {
    setActiveBtn1("Today");
    console.log(todayData);
    setDaysData(todayData);
  };

  const on7DayClick = (e) => {
    setActiveBtn1("7Day");
    axios
      .get("/users/my-schedule", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          schedule_type: "7 days",
        },
      })
      .then((res) => {
        console.log(res.data);
        setDaysData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const on30DayClick = (e) => {
    console.log("30Day");
    setActiveBtn1("30Day");
    axios
      .get("/users/my-schedule", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          schedule_type: "30 days",
        },
      })
      .then((res) => {
        console.log(res.data);
        setDaysData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onCustomClick = (e) => {
    if (!toDate || !fromDate) {
      return;
    }
    console.log("Custom");
    setActiveBtn1("Custom");

    axios
      .get("/users/my-schedule", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          schedule_type: "Custom",
          start_date: fromDate,
          end_date: toDate,
        },
      })
      .then((res) => {
        console.log(res.data);
        setDaysData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const openMsg = (e, index) => {
    axios
      .get("/users/message-detail/" + e, {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        res.data["index"] = index;
        setClickData(res.data);
        setTimeout(2000);
        setisMsgOpen(true);

        let tp = "";
        if (activeBtn1 === "Received") {
          tp = "Received";
        } else if (activeBtn1 === "Sent") {
          tp = "Sent";
        } else {
          tp = "Unread";
        }

        axios
          .get("/users/message-list", {
            headers: {
              Authorization: "Token" + " " + cookies.get("token"),
            },
            params: {
              message_type: tp,
            },
          })
          .then((res) => {
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
              res.data[i]["index"] = i;
            }
            setMsgData(res.data);
            setFinal(res.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onCatBtnClick = (e) => {
    setActiveCatId(e);
    console.log(e);
    let package_type = "All";
    if (isOnline) {
      package_type = "Online Class";
    } else if (isOffline) {
      package_type = "Offline Class";
    } else if (isEvent) {
      package_type = "Event";
    }

    axios
      .get("/users/packages", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onApplyClick = (e) => {
    let tr = arrM;
    if (isOffline) {
      tr = offlinePack;
    }

    if (onlineFeatArray.includes("Freebies")) {
      tr = freeby;
    }

    var res = tr;
    if (onlineFArray.length > 0) {
      res = tr.filter((item) => onlineFArray.includes(item.package_type));
      setArrM(res);
    }
    if (onlineFArray.includes("All")) {
      res = tr;
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
        if (
          res[i].total_class >= timeArr[j].min &&
          res[i].total_class < timeArr[j].max
        ) {
          res1.push(res[i]);
        }
      }
    }

    console.log(res1);
    setIsFilterShow(false);
    console.log(onlineNumArray);
    if (onlineNumArray.length === 0) {
      console.log("PP");
      res1 = res;
    }
    setArrM(res1);
    console.log(res1);

    let res2 = [];
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
        if (
          res1[i].time_duration_in_days >= timeArr[j].min &&
          res1[i].time_duration_in_days < timeArr[j].max
        ) {
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
      res3 = res2.filter((item) => onlineCatArray.includes(item.category_name));
      setArrM(res3);
    } else {
      res3 = res2;
    }

    let res4 = [];

    if (onlineInsArray.length > 0) {
      res4 = res3.filter((item) =>
        onlineInsArray.includes(item.main_master_name)
      );
      setArrM(res4);
    } else {
      res4 = res3;
    }

    let res5 = [];

    if (onlineRatArray.length > 0) {
      res5 = res4.filter((item) => onlineRatArray.includes(item.rating));
      setArrM(res5);
    } else {
      res5 = res4;
    }

    // setOnlineNumArray([])
    // setOnlineFArray([]);
    // setOnlineCatArray([])
    // setOnlineDurArray([])
    // setOnlineInsArray([])
  };

  const onClassFilter = (e) => {
    console.log(e);
    let ta = onlineFArray;

    if (onlineFArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    } else {
      ta.push(e);
      console.log("1");
    }
    setOnlineFArray(ta);
    console.log(onlineFArray);
    return false;
  };

  const onFeatFilter = (e) => {
    console.log(e);
    let ta = onlineFeatArray;

    if (onlineFeatArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    } else {
      ta.push(e);
    }
    setOnlineFeatArray(ta);
    console.log(onlineFeatArray);
    return false;
  };

  const onRatFilter = (e) => {
    console.log(e);
    let ta = onlineRatArray;

    if (onlineRatArray.includes(e)) {
      if (e == 3) {
        ta.splice(ta.indexOf("3.5"), 1);
        ta.splice(ta.indexOf("2.5"), 1);
        ta.splice(ta.indexOf("2.0"), 1);
        ta.splice(ta.indexOf("1.5"), 1);
        ta.splice(ta.indexOf("1.0"), 1);
        ta.splice(ta.indexOf("0.5"), 1);
        ta.splice(ta.indexOf("0"), 1);
      }
      ta.splice(ta.indexOf(e), 1);
    } else {
      if (e == 3) {
        ta.push("3.5");
        ta.push("2.5");
        ta.push("2.0");
        ta.push("1.5");
        ta.push("1.0");
        ta.push("0.5");
        ta.push("0.0");
      }
      ta.push(e);
    }
    setOnlineRatArray(ta);
    console.log(onlineRatArray);
    return false;
  };

  const onCatFilter = (e) => {
    console.log(e);
    let ta = onlineCatArray;

    if (onlineCatArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    } else {
      ta.push(e);
    }
    setOnlineCatArray(ta);
    console.log(onlineCatArray);
    return false;
  };

  const onInsFilter = (e) => {
    console.log(e);
    let ta = onlineInsArray;

    if (onlineInsArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    } else {
      ta.push(e);
    }
    setOnlineInsArray(ta);
    console.log(onlineInsArray);
    return false;
  };

  const convertDate = (str) => {
    str = str.toString();
    let parts = str.split(" ");
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return parts[3] + "-" + months[parts[1]] + "-" + parts[2];
  };

  const onNumClassFilter = (e) => {
    console.log(e);
    let ta = onlineNumArray;

    if (onlineNumArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    } else {
      ta.push(e);
    }
    setOnlineNumArray(ta);
    console.log(onlineNumArray);

    return false;
  };

  const onDelClick = (e) => {
    axios
      .get("/users/message-delete/" + e, {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);

        let tp = "";
        if (activeBtn1 === "Received") {
          tp = "Received";
        } else if (activeBtn1 === "Sent") {
          tp = "Sent";
        } else {
          tp = "Unread";
        }

        axios
          .get("/users/message-list", {
            headers: {
              Authorization: "Token" + " " + cookies.get("token"),
            },
            params: {
              message_type: tp,
            },
          })
          .then((res) => {
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
              res.data[i]["index"] = i;
            }
            setMsgData(res.data);
            setFinal(res.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });

    return false;
  };

  const onDurClassFilter = (e) => {
    console.log(e);
    let ta = onlineDurArray;

    if (onlineDurArray.includes(e)) {
      ta.splice(ta.indexOf(e), 1);
    } else {
      ta.push(e);
    }
    setOnlineDurArray(ta);
    console.log(onlineDurArray);

    return false;
  };

  const elseLink = (e) => {
    console.log("None");
  };

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
      method: "post",
      url: `users/add-bookmark-package/${e.target.id}`,
      headers: {
        Authorization: "Token" + " " + cookies.get("token"),
      },
    })
      .then((res) => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        toast.success("added to Bookmark", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
        console.log(res.data, "added successfully");
      })
      .catch((err) => {
        toast.error("There is an error", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
        console.log(err, "There is an error");
      });
  };
  let liveIn;

  const checkTime = (st, et, date) => {
    const startTime = new Date(new Date().toDateString() + " " + st);
    const endTime = new Date(new Date().toDateString() + " " + et);
    const currentTime = new Date();
    let lDate = new Date().toLocaleDateString();
    let mon = "";
    if (lDate.split("/")[0].length === 1) {
      mon = "0" + lDate.split("/")[0];
    } else {
      mon = lDate.split("/")[0];
    }
    let currDate = lDate.split("/")[2] + "-" + mon + "-" + lDate.split("/")[1];

    console.log(date + "  " + currDate);

    if (
      currDate === date &&
      currentTime >= startTime &&
      currentTime <= endTime
    ) {
      // setIsLive(true)
      return true;
    } else if (date === currDate && currentTime < startTime) {
      let diff = (currentTime.getTime() - startTime.getTime()) / 1000;
      diff /= 60;
      liveIn = Math.abs(Math.round(diff));
    } else if (date > currDate) {
      liveIn = 1000;
    } else liveIn = "Finished";
  };

  const removeBookmark = (e) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: `users/remove-bookmark-package/${e.target.id}`,
      headers: {
        Authorization: "Token" + " " + cookies.get("token"),
      },
    })
      .then((res) => {
        console.log(res.data, "removed successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        toast.warning("Removed from Bookmarks", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
      })
      .catch((err) => {
        toast.error("There is an error", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
        console.log(err, "There is an error");
      });
    console.log("Clicked", e.target.id);
  };

  const openURL = (e, id) => {
    e.preventDefault();
    console.log(id);

    axios({
      method: "get",
      url: `users/zoom-room-url-fetch/${id}`,
      headers: {
        Authorization: "Token" + " " + cookies.get("token"),
      },
    })
      .then((res) => {
        console.log(res.data);
        window.open(res.data.join_url, "_blank").focus();
      })
      .catch((err) => {
        console.log(err, "There is an error");
      });
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
                    <button className="nbtn" style={{ color: "#03CBC9" }}>
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
                    <button className="nbtn" style={{ color: "#03CBC9" }}>
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

      <main className="my_schedule_main">
        {/* <div className="row noMargin noPadding top_menu_btn_sec_scss_class top_menu_activity">
          <div className="col-12 top_menu_sec noPadding noMargin">
            <Link to="/subscription">
              <button className="topmenu_btn">
                <img className="topMenu_icon" src="Images/subsA.svg" />{" "}
                Subscriptions{" "}
              </button>
            </Link>

            <Link to="/my-schedule">
              <button className="topmenu_btn active_menu">
                <img className="topMenu_icon" src="Images/mySchA.svg" /> My
                schedule{" "}
              </button>
            </Link>
            <Link to="/my-activity">
              <button className="topmenu_btn">
                <img className="topMenu_icon" src="Images/myActA.svg" /> My
                activity{" "}
              </button>
            </Link>
            <Link to="/messaging">
              <button className="topmenu_btn ">
                <img className="topMenu_icon" src="Images/msgA.svg" /> Alerts
                and Messages{" "}
              </button>
            </Link>
            <Link to="/my-profile">
              <button className="topmenu_btn">
                <img className="topMenu_icon" src="Images/myProA.svg" /> My
                Profile{" "}
              </button>
            </Link>
            <Link to="/forms">
              <button className="topmenu_btn">
                <img className="topMenu_icon" src="Images/myActA.svg" /> Forms &
                Surveys{" "}
              </button>
            </Link>
          </div>
        </div> */}

        {/* Button section */}
        <div className="top_btn_sec row noMargin">
          <div className="row noPadding noMargin btn_row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 noPadding noMargin text-left button_margin_top">
              <button
                onClick={() => onTodayClick()}
                className={
                  activeBtn1 === "Today"
                    ? "common_btn active_btn"
                    : "common_btn not_active_btn"
                }
              >
                Today
              </button>
              <button
                onClick={() => on7DayClick()}
                className={
                  activeBtn1 === "7Day"
                    ? "common_btn active_btn margin_left_btn"
                    : "common_btn not_active_btn margin_left_btn"
                }
              >
                Next 7 days
              </button>
              <button
                onClick={() => on30DayClick()}
                className={
                  activeBtn1 === "30Day"
                    ? "common_btn active_btn margin_left_btn"
                    : "common_btn not_active_btn margin_left_btn"
                }
              >
                Next 30 days
              </button>
              <button
                onClick={() => setActiveBtn1("Custom")}
                className={
                  activeBtn1 === "Custom"
                    ? "common_btn active_btn margin_left_btn"
                    : "common_btn not_active_btn margin_left_btn"
                }
              >
                Custom
              </button>
            </div>
            {activeBtn1 === "Custom" ? (
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 noPadding noMargin text-left button_margin_top">
                <span>
                  <span className="from_to_span" style={{ marginRight: "5px" }}>
                    From
                  </span>
                  <button
                    className={
                      activeBtn1 === "..."
                        ? "common_btn active_btn"
                        : "common_btn not_active_btn"
                    }
                  >
                    <input
                      style={{ width: "100%" }}
                      type="date"
                      placeholder=""
                      onChange={(e) => {
                        setFromDate(e.target.value);
                        onfilterDate();
                      }}
                    />
                  </button>
                  <span
                    className="margin_left_btn from_to_span"
                    style={{ marginRight: "5px" }}
                  >
                    To
                  </span>
                  <button
                    className={
                      activeBtn1 === "Cuswdwfwf"
                        ? "common_btn active_btn"
                        : "common_btn not_active_btn"
                    }
                  >
                    <input
                      style={{ width: "100%" }}
                      type="date"
                      onChange={(e) => {
                        //  console.log(e.target.value)
                        setToDate(e.target.value);
                        onfilterDate();
                      }}
                    />
                  </button>
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="cards_sec">
          <div className="row noMargin card_row">
            {daysData && daysData.length !== 0 ? (
              daysData.map((item) => (
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 card_main_div">
                  <div className="card library_cards">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={{
                        pathname: `/library/${item.id}`,
                        checkS: { activeBtn, displayTitle: item.package_type },
                        id: item.id,
                      }}
                    >
                      <div>
                        <div className="card_head">
                          <div className="card_header_sec">
                            {item.event_image !== null ? (
                              <img
                                className="card-img-top"
                                alt="img"
                                src={
                                  item.event_image
                                    ? item.event_image
                                    : item.image
                                }
                              />
                            ) : (
                              <img
                                className="card-img-top"
                                alt="img"
                                src="/Images/default-banner.png"
                              />
                            )}
                            {item.online ? (
                              <img
                                className="card_absolute_sec_img"
                                src="/Images/onlineIc.svg"
                                id={item.id}
                                onClick={removeBookmark}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className="card_absolute_sec_img"
                                src="/Images/offlineIc.svg"
                                id={item.id}
                                onClick={setBookmark}
                                alt="icon"
                              />
                            )}
                          </div>
                        </div>
                        <div className="card_body">
                          <h4 className="card-title">{item.title}</h4>

                          <div className="row noMargin noPadding">
                            <div className="col-9 noPadding">
                              <div className="row noMargin noPadding">
                                <div className="col-12 noPadding package_det">
                                  Package Details
                                </div>
                                <div className="col-12 module_description noPadding">
                                  {item.event_duration} Min |{" "}
                                  {getMonthName(item.date)}
                                </div>
                              </div>
                            </div>
                            <div className="col-3 noPadding align_self_center text-right">
                              <img
                                className="prem_img"
                                src="/Images/prem.svg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div
                      className="modal_footer row noMargin"
                      style={{ cursor: "default" }}
                    >
                      <div className="col-6 col-sm-9 noPadding text-left align_self_center">
                        {checkTime(item.start_time, item.end_time, item.date) &&
                        activeBtn1 === "Today" ? (
                          <p
                            style={{ marginTop: "0", color: "#03CBC9" }}
                            class="card_footer_span noMargin"
                          >
                            <img
                              className="card_footer_icons align_self_center"
                              style={{ paddingRight: "5px" }}
                              src="/Images/liveTow.svg"
                            />
                            <span className="align_self_center">Live now</span>
                          </p>
                        ) : true ? (
                          <>
                            {liveIn === "Finished" ? (
                              <p
                                style={{ marginTop: "0", color: "#f7314c" }}
                                class="card_footer_span noMargin align_self_center"
                              >
                                Event finished
                              </p>
                            ) : liveIn <= "120" ? (
                              <p
                                style={{ marginTop: "0", color: "#E5C000" }}
                                class="card_footer_span noMargin"
                              >
                                <img
                                  className="card_footer_icons align_self_center"
                                  style={{ paddingRight: "5px" }}
                                  src="/Images/startClock.svg"
                                />
                                <span className="align_self_center">
                                  Starts in {liveIn} mins
                                </span>
                              </p>
                            ) : (
                              <p
                                style={{ marginTop: "0", color: "#E5C000" }}
                                class="card_footer_span noMargin"
                              >
                                <img
                                  className="card_footer_icons align_self_center"
                                  style={{ paddingRight: "5px" }}
                                  src="/Images/startClock.svg"
                                />
                                <span className="align_self_center">
                                  Starts at {item.start_time.slice(0, 5)}
                                </span>
                              </p>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-6 col-sm-3 noPadding align_self_center text-right">
                        {liveIn && liveIn <= "120" ? (
                          <button className="noti_btn">Notify</button>
                        ) : liveIn ? (
                          <button className="noti_btn">Attend</button>
                        ) : (
                          <button
                            className="noti_btn"
                            onClick={(e) => openURL(e, item.id)}
                          >
                            Join
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
