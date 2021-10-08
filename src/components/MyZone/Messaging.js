import React, { useState, useEffect, useRef } from "react";
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
import "./messaging.scss";
import "./topMenu.scss";
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

export default function Messaging(props) {
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
  const [activeBtn1, setActiveBtn1] = useState("Received");
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

  const [showDesc, setShowDesc] = useState(false);
  const [des, setDes] = useState("");

  const [windowWidth, setWindowWidth] = useState(
    document.documentElement.clientWidth
  );

  const [name, setName] = useState("");
  const [foundUsers, setFoundUsers] = useState();
  const modalRef = useOnClickOutsideRef(() => {
    setisMsgOpen(false);
    setIsMsg(false);
  });

  function useOnClickOutsideRef(callback, initialValue = null) {
    const elementRef = useRef(initialValue);
    useEffect(() => {
      function handler(event) {
        if (!elementRef.current?.contains(event.target)) {
          callback();
        }
      }
      window.addEventListener("click", handler);
      return () => window.removeEventListener("click", handler);
    }, [callback]);
    return elementRef;
  }

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
    let ta = finalA;
    console.log("date filter " + toDate + " " + fromDate);
    if (toDate && fromDate && ta) {
      console.log("date filter1");
      var ar = ta.filter((item) => {
        console.log(item.created_at.slice(0, 10));
        return (
          item.created_at.slice(0, 10) >= fromDate &&
          item.created_at.slice(0, 10) <= toDate
        );
      });
      console.log(ar);
      setMsgData(ar);
    }
  };

  const getImages = async () => {
    let totalArr = [];
    console.log(cookies.get("token"));

    await axios
      .get("/users/message-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          message_type: "Received",
        },
      })
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          res.data[i]["index"] = i;
        }
        console.log(res.data);
        setMsgData(res.data);
        setFinal(res.data);
        console.log(finalA);
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
    setTimeout(() => {
      setInsData(e);
      if (isMsg) {
        setIsMsg(false);
      } else {
        setIsMsg(true);
      }
    }, 1);
  };

  const onAllClick = (e) => {
    setActiveBtn1("Received");
    axios
      .get("/users/message-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          message_type: "Received",
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
  };

  const onUnreadClick = (e) => {
    setActiveBtn1("Unread");
    axios
      .get("/users/message-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          message_type: "Unread",
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
  };

  const onSentClick = (e) => {
    console.log("sent");
    setActiveBtn1("Sent");
    axios
      .get("/users/message-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
        params: {
          message_type: "Sent",
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

        setTimeout(() => {
          setisMsgOpen(true);
        }, 1);

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
                  <Link to="/classes">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
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
                  <Link to="">
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
                  <Link to="/messaging">
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
                  <Link to="/classes">
                    <button className="nbtn">
                      <ListItem className="test">
                        <ListItemIcon style={{ minWidth: "2.27vw" }}>
                          <img
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
                  <Link to="/messaging">
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
            <Toolbar />
          </Drawer>
        )
      ) : (
        <div></div>
      )}
      <main className="messaging_main">
        {/* <div className="row noMargin noPadding top_menu_btn_sec_scss_class">
          <div className="col-12 top_menu_sec noPadding noMargin">
            <Link to="/subscription">
              <button className="topmenu_btn ">
                <img className="topMenu_icon " src="Images/subsA.svg" />{" "}
                Subscriptions{" "}
              </button>
            </Link>
            <Link to="/my-schedule">
              <button className="topmenu_btn">
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
            <button className="topmenu_btn active_menu">
              <img className="topMenu_icon" src="Images/msgA.svg" /> Alerts and
              Messages{" "}
            </button>

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
        </div>
         */}
        <div className="row noMargin noPadding button_margin_top">
          <span className="page_head noPadding">Messaging</span>
        </div>

        <div className="row noMargin noPadding btn_row">
          <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 noPadding noMargin text-left button_margin_top">
            <button
              onClick={() => onAllClick()}
              className={
                activeBtn1 === "Received"
                  ? "common_btn blue_active margin_right_btn"
                  : "common_btn not_active_btn margin_right_btn"
              }
            >
              All
            </button>
            <button
              onClick={() => onUnreadClick()}
              className={
                activeBtn1 === "Unread"
                  ? "common_btn blue_active margin_right_btn"
                  : "common_btn not_active_btn margin_right_btn"
              }
            >
              Unread
            </button>
            <button
              onClick={() => onSentClick()}
              className={
                activeBtn1 === "Sent"
                  ? "common_btn blue_active "
                  : "common_btn not_active_btn"
              }
            >
              Sent
            </button>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 noPadding noMargin button_margin_top">
            <div className="row noMargin noPadding">
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-9 noPadding noMargin text-left">
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
                      activeBtn1 === "..."
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
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-3 noPadding noMargin text-right">
                <button
                  onClick={() => onMsgClick()}
                  className="common_btn active_btn"
                >
                  <img className="filter_icon" src="/Images/penC.svg" />
                  Compose
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="row noMargin noPadding button_margin_top"
          style={{ width: "100%" }}
        >
          <table className="table noPadding noMargin message_table">
            <thead className="theading">
              <tr>
                <th>Sender</th>
                <th>Message</th>
                <th className="date_th">Date</th>
                <th className="last_th"></th>
              </tr>
            </thead>
            <tbody>
              {msgData && msgData.length > 0 ? (
                msgData.map((event) => (
                  <tr style={{ cursor: "pointer" }} key={event.id}>
                    <td>
                      <div className="row noPadding noMargin">
                        {true ? (
                          <div className="col-sm-1 col-2 noPadding">
                            <img
                              id={event.id}
                              src="/Images/uncheck.svg"
                              label="true"
                              onClick={() => {
                                handleCheck(event.id);
                                console.log("checked");
                                if (
                                  document
                                    .getElementById(event.id)
                                    .src.split("/")[4] === "checked.svg"
                                ) {
                                  document.getElementById(event.id).src =
                                    "/Images/uncheck.svg";
                                } else {
                                  document.getElementById(event.id).src =
                                    "/Images/checked.svg";
                                }
                              }}
                              className="check_svg"
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="col noPadding">{event.sender_name}</div>
                      </div>
                    </td>
                    <td
                      onClick={() => {
                        openMsg(event.id, event.index);
                      }}
                    >
                      {activeBtn1 === "Received" && event.read === false ? (
                        <button className="red_dot"></button>
                      ) : (
                        <></>
                      )}
                      {event.message && event.message.slice(0, 15)}{" "}
                    </td>
                    <td
                      onClick={() => {
                        openMsg(event.id, event.index);
                      }}
                    >
                      {event.created_at && getMonthName(event.created_at)}
                    </td>
                    <td className="text-center">
                      <img
                        onClick={() => onDelClick(event.id)}
                        className="del_btn"
                        src="/Images/del.svg"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td> No</td>
                  <td>data </td>
                  <td>to</td>
                  <td> display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isMsgOpen ? (
          <div
            ref={modalRef}
            className="overlay-msg shadow-lg bg-white rounded"
          >
            <div className="ovr-head">
              <span onClick={() => setisMsgOpen(false)} className="compose-msg">
                {" "}
                <img src="/Images/lar.svg" /> Back to the list{" "}
              </span>

              <span
                className="mt-2 mr-2 ovr-cls"
                onClick={() => onDelClick(clickData.id)}
              >
                <img className="ovr-cr" src="/Images/delB.svg" />
                Delete
              </span>
            </div>

            <div>
              <img src="/Images/profilepic.png" className="profile-msg" />

              <span className="name-msg">{clickData.sender_name}</span>
              <span className="to-msg"> To</span>
              <span className="date-msg">
                {getMonthName(clickData.created_at)}, 8:45 PM
              </span>
            </div>
            <div className="msg-box">{clickData.message}</div>

            <span className="mt-5 btn-del btn-del1  ">
              <img
                src="/Images/lar.svg"
                style={{ marginRight: "10px" }}
                onClick={() => {
                  if (clickData.index > 0) {
                    console.log(clickData.index + 1 + " " + msgData.length);
                    let ind = clickData.index - 1;
                    let id1 = msgData[ind].id;
                    openMsg(id1, ind);
                  }
                }}
              />
              {clickData && clickData.index + 1} of {msgData && msgData.length}
              <img
                src="/Images/rar.svg"
                onClick={() => {
                  if (clickData.index + 1 < msgData.length) {
                    console.log(clickData.index + 1 + " " + msgData.length);
                    let ind = clickData.index + 1;
                    let id1 = msgData[ind].id;
                    openMsg(id1, ind);
                  }
                }}
                style={{ marginLeft: "10px" }}
              />
            </span>
            <button
              className="mt-5 ml-3 btn btn-send"
              style={{ float: "left" }}
            >
              Reply
            </button>
          </div>
        ) : (
          <></>
        )}

        {isMsg ? (
          <div ref={modalRef} className="overlay_message shadow-lg">
            <div className="small_scr">
              <div className="row noMargin message_pop_head">
                <div className="col-8 noPadding noMargin text-left">
                  <span className="pop_head">Compose a message</span>
                </div>
                <div className="col-4 noPadding noMargin text-right">
                  <span className="close_text" onClick={() => onMsgClick()}>
                    Close
                  </span>
                </div>
              </div>

              <div className="row noPaddding noMargin">
                <div className="row noPaddding noMargin to_sec to_sec_div">
                  <div className="col-4 noPadding noMargin text-left">
                    <span className="normal_font">To: </span>
                    <input
                      type="text"
                      className="normal_font repient_name_input"
                      value={actIns && actIns.name}
                      placeholder="Enter Recipient Name"
                    />
                  </div>
                  <div className="col-8 noPadding noMargin text-right small_screen_left">
                    <span className="normal_font">Search Contact</span>
                    <input
                      className="search_input bg-white rounded"
                      value={actIns ? actIns.name : name}
                      onChange={filter}
                      type="search"
                    ></input>
                    {actIns ? (
                      <img
                        className="close_search"
                        onClick={() => {
                          setActiveIns("");
                          setName("");
                        }}
                        src="/Images/crosss.svg"
                      />
                    ) : (
                      <></>
                    )}
                    <div className="user_list">
                      {foundUsers && foundUsers.length > 0 ? (
                        foundUsers.map((user) => (
                          <li
                            onClick={() => {
                              setActiveIns(user);
                            }}
                            key={user.id}
                            className="user_li normal_font"
                          >
                            <span>{user.name}</span>
                          </li>
                        ))
                      ) : (
                        <p className="user_li normal_font">No results found!</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row noPadding noMargin to_sec">
                  <div className="col-12 noPadding noMargin subj_span">
                    <span className="normal_font noPadding">
                      Subject of the message:{" "}
                    </span>
                    <input
                      type="text"
                      className="normal_font repient_name_input"
                      placeholder="Enter Subject "
                      onChange={(e) => {
                        setSub(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="row noPadding noMargin to_sec">
                  <textarea
                    type="text1"
                    className="enter_msg_area"
                    style={{
                      minHeight: "120px",
                      minWidth: "100%",
                      border: "none",
                    }}
                    placeholder="Enter Message Here"
                    onChange={(e) => {
                      if (e.target.value.length > 1000) {
                        e.target.value = e.target.value.slice(0, 1000);
                      }
                      setMessage(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="row noPadding noMargin to_sec"
                  style={{ boxShadow: "none" }}
                >
                  <div className="col-8 noPadding noMargin">
                    {message.length >= 1000 ? (
                      <span
                        className="word_count_text noPadding noMargin normal_font"
                        style={{ color: "red" }}
                      >
                        word count should be less than 1000
                      </span>
                    ) : (
                      <span
                        className="word_count_text noPadding noMargin normal_font"
                        style={{ color: "black" }}
                      >
                        Word Count : {message.length} / 1000
                      </span>
                    )}
                  </div>
                  <div className="col-4 noPadding noMargin text-right">
                    <button
                      onClick={() => onSendMsg()}
                      className="common_btn blue_active"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="calendarApp mt-5"></div>
      </main>
    </div>
  );
}
