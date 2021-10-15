import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';

import DatePicker from 'react-datepicker';


import axios from '../../../Axios';
import Cookies from 'universal-cookie';

import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import 'react-toastify/dist/ReactToastify.css';

// import '../Sidenav/sidenavStyle.css';
// import './subscription.css';
// import './Messaging.css'
import './form.scss'
// import './topMenu.scss';
import { Link, useHistory } from "react-router-dom";


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { toast } from "react-toastify";
import { Button, OverlayTrigger } from "react-bootstrap";
import { Popover, Tooltip } from "bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { Today } from "@material-ui/icons";






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
        // width: drawerWidth,
        flexShrink: 0,
        position: 'fixed',
        zIndex: "20"
    },
    drawerPaper: {
        width: drawerWidth,
        // height: "auto",
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


export default function Forms(props) {

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
    const [activeBtn1, setActiveBtn1] = useState('Sent');
    const [isFilterShow, setIsFilterShow] = useState(false);
    const [arrFinal, setArrFinal] = useState('');
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
    const [sub, setSub] = useState('');
    const [message, setMessage] = useState('');
    const [insData, setInsData] = useState();
    const [insAll, setInsAll] = useState('');
    const [actIns, setActiveIns] = useState('');
    const [toDate, setToDate] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [activeId, setactiveId] = useState([]);
    const [finalA, setFinal] = useState();
    const [quesData, setQuesData] = useState([]);
    const [fmIndex, setfmIndex] = useState(0);
    const [currFormId, setCurrFormId] = useState(0);
    const [selectedImagePreview, setSelectedImagePreview] = useState('/Images/pdfI.svg');
    const [currFile, setCurrFile] = useState();

    const [showDesc, setShowDesc] = useState(false);
    const [des, setDes] = useState('');

    const [docs, setDocs] = useState('');
    const [uploadId, setUploadId] = useState([]);


    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

    const [name, setName] = useState('');
    const [foundUsers, setFoundUsers] = useState();
    const modalRef = useOnClickOutsideRef(() => {
        setisMsgOpen(false);
        setIsMsg(false);

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

    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
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

    }, [windowWidth])


    const handleCheck = (e) => {
        console.log(e)
        let ta = activeId;
        console.log(e)
        if (activeId.includes(e)) {
            ta.splice(ta.indexOf(e), 1);
        }
        else {
            ta.push(e);
            console.log("A")
        }
        setactiveId(ta);
        console.log(activeId)
        return false;
    }









    const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);



    useEffect(() => {
        window.addEventListener("resize", handleResize);
        getImages();
    }, [])


    useEffect(() => {
        if (finalA) {
            console.log("Aa")
            setMsgData(finalA);
        }
        onfilterDate();
    }, [toDate, fromDate])


    const onSendMsg = () => {
        console.log('a')
        let id = actIns.user_id;
        console.log(cookies.get('id'));


        axios.post(`users/message-send`, {
            sender: cookies.get('id'),
            receiver: id,
            header: sub,
            message: message,
        }, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                toast.success("Successfully Sent", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            })
            .catch((err) => {
                console.log(err);
                toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }




    const onfilterDate = () => {
        let ta = finalA;
        console.log('date filter ' + toDate + " " + fromDate);
        if (toDate && fromDate && ta) {
            console.log('date filter1');
            var ar = ta.filter((item) => {
                console.log(item.created_at.slice(0, 10))
                return item.created_at.slice(0, 10) >= fromDate && item.created_at.slice(0, 10) <= toDate
            })
            console.log(ar)
            setMsgData(ar);

        }


    }



    const getImages = async () => {

        let totalArr = [];
        console.log(cookies.get('token'))


        await axios.get('/users/form-list', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
        })
            .then(res => {
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i]['index'] = i;
                }
                console.log(res.data);
                setMsgData(res.data)
                setFinal(res.data)
                console.log(finalA)
            })
            .catch(err => {
                console.log("err", err);
            })


        await axios.get('/users/package-list-by-content', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
            params: {
                package_type: "Classes"
            },
        })
            .then(res => {
                console.log(res.data);
                let arr = res.data;
                let tar = [];
                arr.map((item) => {
                    if (!tar.includes(item.main_master_name))
                        tar.push(item.main_master_name);
                })
                setInstruct(tar);



                setArrM(arr)

                setArrFinal(arr)
                setOnlinePack(arr)
            })
            .catch(err => {
                console.log("err", err);
            })


        await axios.get('/users/package-list-by-content', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
            params: {
                package_type: "Library"
            },
        })
            .then(res => {
                console.log(res.data);
                let arr = res.data;

                setOfflinePack(arr)
                setArrLibFinal(arr);
            })
            .catch(err => {
                console.log("err", err);
            })


        await axios.get('/users/all-team-list', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
        })
            .then(res => {
                console.log(res.data);
                setFoundUsers(res.data);
                setInsAll(res.data);
            })
            .catch(err => {
                console.log("err", err);
            })







        await axios.get('/users/categories', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
        })
            .then(res => {
                console.log(res.data);

                setCateg(res.data);
                console.log(categ);
            })
            .catch(err => {
                console.log("err", err);
            })


        await axios.get('/users/recommendation-package-list', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
        })
            .then(res => {
                console.log(res.data);


                setFreeby(res.data);
            })
            .catch(err => {
                console.log("err", err);
            })






    }

    function getMonthName(date) {
        const d = new Date();
        if (!date) {
            return;
        }
        let day = parseInt(date.split('-')[2]);
        let month = parseInt(date.split('-')[1]);
        let year = parseInt(date.split('-')[0]);

        d.setMonth(month - 1);
        let monthName = d.toLocaleString("default", { month: "long" });
        monthName = monthName.slice(0, 3);
        let finalDate = day + " " + monthName + " " + year;
        return finalDate;
    }

    useEffect(() => {
        checkbtn();
    }, [onlinePack, offlinePack, eventPack])

    useEffect(() => {
        checkbtn();
    }, [isEvent, isOffline, isOnline])

    const delDoc = (id) => {
        console.log("Delete function");
        // return ;
        axios.delete(`users/document-delete/` + id, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res)
                setDocs(res.data)
                if (res.data && res.data.length > 0)
                    setUploadId(res.data)
                console.log(uploadId)
                toast.error("Successfully deleted", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                // toast.warning("Some error occured", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
            });
    }

    const checkPdf = (name) => {
        if (!name)
            return;
        let nm = name.slice(name.length - 3, name.length);
        console.log(nm);
        if (nm === 'pdf') {
            name = '/Images/pdfI.svg'
        }
        return name;
    }

    const updateProfile = (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        let img = URL.createObjectURL(e.target.files[0]);
        if (e.target.files[0].type === 'application/pdf') {
            img = '/Images/pdfI.svg';
        }
        setSelectedImagePreview(img);
        console.log(img);
        setCurrFile(e.target.files[0]);

        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        for (var key of formData.entries()) {
            console.log(key[0] + ", " + key[1]);
        }

    }





    // useEffect(() => {
    //   openMsg();
    // }, [isMsg, clickData])






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

    const onMsgClick = (e) => {
        setTimeout(() => {
            setInsData(e);
            if (isMsg) {
                setIsMsg(false);
            }
            else {
                setIsMsg(true);
            }
        }, 1);

    }




    const onSentClick = (e) => {
        console.log('sent');
        setActiveBtn1('Sent')
        axios.get('/users/message-list', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
            params: {
                message_type: "Sent"
            },
        })
            .then(res => {
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i]['index'] = i;
                }
                setMsgData(res.data)
                setFinal(res.data)
            })
            .catch(err => {
                console.log("err", err);
            })
    }


    const onUserResponseClick = (e) => {
        setActiveBtn1('User')
        axios.get('/users/message-list', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
            params: {
                message_type: "Received"
            },
        })
            .then(res => {
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i]['index'] = i;
                }
                setMsgData(res.data)
                setFinal(res.data)
            })
            .catch(err => {
                console.log("err", err);
            })

    }

    const onCommentsClick = (e) => {
        setActiveBtn1('Comments')
        axios.get('/users/message-list', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
            params: {
                message_type: "Unread"
            },
        })
            .then(res => {
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i]['index'] = i;
                }
                setMsgData(res.data)
                setFinal(res.data)
            })
            .catch(err => {
                console.log("err", err);
            })
    }

    const onInboxClick = (e) => {
        console.log('sent');
        setActiveBtn1('Inbox')
        axios.get('/users/message-list', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
            params: {
                message_type: "Sent"
            },
        })
            .then(res => {
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i]['index'] = i;
                }
                setMsgData(res.data)
                setFinal(res.data)
            })
            .catch(err => {
                console.log("err", err);
            })
    }

    const onAssignFormClick = (e) => {
        setActiveBtn1('Assign')
        axios.get('/users/message-list', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
            params: {
                message_type: "Sent"
            },
        })
            .then(res => {
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i]['index'] = i;
                }
                setMsgData(res.data)
                setFinal(res.data)
            })
            .catch(err => {
                console.log("err", err);
            })
    }

    

    const openMsg = (e, index) => {

        console.log(currFormId)
        let idd = currFormId;
        if (e) {
            idd = e;
        }
        axios.get('/users/question-list/' + idd, {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
        })
            .then(res => {
                console.log(res.data);
                //   res.data['index']=index;

                //   for(let i=0;i<res.data[0].length)
                setClickData(res.data[0]['index'] = 0);
                console.log(res.data[0])
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i]['index'] = i;
                }
                setQuesData(res.data)
                console.log(res.data)
                //   console.log(res.data)



                setTimeout(() => {
                    setisMsgOpen(true);
                }, 1);



                let tp = '';
                if (activeBtn1 === 'Received') {
                    tp = 'Received';
                }
                else if (activeBtn1 === 'Sent') {
                    tp = 'Sent';
                }
                else {
                    tp = 'Unread';
                }


                axios.get('/users/form-list', {
                    headers: {
                        'Authorization': 'Token' + ' ' + cookies.get('token')
                    },
                })
                    .then(res => {
                        console.log(res.data);
                        for (let i = 0; i < res.data.length; i++) {
                            res.data[i]['index'] = i;
                        }
                        setMsgData(res.data)
                        setFinal(res.data)
                    })
                    .catch(err => {
                        console.log("err", err);
                    })






            })
            .catch(err => {
                console.log("err", err);
            })

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

        axios.get('/users/packages', {
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



    const onApplyClick = (e) => {

        let tr = arrM;
        if (isOffline) {
            tr = offlinePack;
        }

        if (onlineFeatArray.includes('Freebies')) {
            tr = freeby;
        }

        var res = tr;
        if (onlineFArray.length > 0) {
            res = tr.filter(item => onlineFArray.includes(item.package_type))
            setArrM(res)
        }
        if (onlineFArray.includes('All')) {
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
                if (res[i].total_class >= timeArr[j].min && res[i].total_class < timeArr[j].max) {
                    res1.push(res[i]);
                }
            }
        }

        console.log(res1);
        setIsFilterShow(false);
        console.log(onlineNumArray)
        if (onlineNumArray.length === 0) {
            console.log("PP")
            res1 = res;
        }
        setArrM(res1);
        console.log(res1)



        let res2 = []
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
                if (res1[i].time_duration_in_days >= timeArr[j].min && res1[i].time_duration_in_days < timeArr[j].max) {
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
            res3 = res2.filter(item => onlineCatArray.includes(item.category_name))
            setArrM(res3)
        }
        else {
            res3 = res2;
        }


        let res4 = [];

        if (onlineInsArray.length > 0) {
            res4 = res3.filter(item => onlineInsArray.includes(item.main_master_name))
            setArrM(res4)
        }
        else {
            res4 = res3;
        }


        let res5 = [];

        if (onlineRatArray.length > 0) {


            res5 = res4.filter(item => onlineRatArray.includes(item.rating))
            setArrM(res5)
        }
        else {
            res5 = res4;
        }





        // setOnlineNumArray([])
        // setOnlineFArray([]);
        // setOnlineCatArray([])
        // setOnlineDurArray([])
        // setOnlineInsArray([])

    }

    const onClassFilter = (e) => {
        console.log(e)
        let ta = onlineFArray;

        if (onlineFArray.includes(e)) {
            ta.splice(ta.indexOf(e), 1);
        }
        else {
            ta.push(e);
            console.log("1")
        }
        setOnlineFArray(ta);
        console.log(onlineFArray)
        return false;
    }


    const onFeatFilter = (e) => {
        console.log(e)
        let ta = onlineFeatArray;

        if (onlineFeatArray.includes(e)) {
            ta.splice(ta.indexOf(e), 1);
        }
        else {
            ta.push(e);
        }
        setOnlineFeatArray(ta);
        console.log(onlineFeatArray)
        return false;
    }

    const onRatFilter = (e) => {
        console.log(e)
        let ta = onlineRatArray;

        if (onlineRatArray.includes(e)) {
            if (e == 3) {
                ta.splice(ta.indexOf('3.5'), 1);
                ta.splice(ta.indexOf('2.5'), 1);
                ta.splice(ta.indexOf('2.0'), 1);
                ta.splice(ta.indexOf('1.5'), 1);
                ta.splice(ta.indexOf('1.0'), 1);
                ta.splice(ta.indexOf('0.5'), 1);
                ta.splice(ta.indexOf('0'), 1);
            }
            ta.splice(ta.indexOf(e), 1);
        }
        else {
            if (e == 3) {
                ta.push('3.5')
                ta.push('2.5')
                ta.push('2.0')
                ta.push('1.5')
                ta.push('1.0')
                ta.push('0.5')
                ta.push('0.0')
            }
            ta.push(e);


        }
        setOnlineRatArray(ta);
        console.log(onlineRatArray)
        return false;
    }



    const onCatFilter = (e) => {
        console.log(e);
        let ta = onlineCatArray;

        if (onlineCatArray.includes(e)) {
            ta.splice(ta.indexOf(e), 1);
        }
        else {
            ta.push(e);
        }
        setOnlineCatArray(ta);
        console.log(onlineCatArray)
        return false;

    }

    const onInsFilter = (e) => {
        console.log(e);
        let ta = onlineInsArray;

        if (onlineInsArray.includes(e)) {
            ta.splice(ta.indexOf(e), 1);
        }
        else {
            ta.push(e);
        }
        setOnlineInsArray(ta);
        console.log(onlineInsArray)
        return false;

    }

    const convertDate = str => {
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
            Dec: "12"
        };
        return parts[3] + "-" + months[parts[1]] + "-" + parts[2];
    };


    const onNumClassFilter = (e) => {
        console.log(e)
        let ta = onlineNumArray;

        if (onlineNumArray.includes(e)) {
            ta.splice(ta.indexOf(e), 1);
        }
        else {
            ta.push(e);
        }
        setOnlineNumArray(ta);
        console.log(onlineNumArray)


        return false;
    }



    const onDelClick = (e) => {
        axios.get('/users/message-delete/' + e, {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
        })
            .then(res => {
                console.log(res.data);

                let tp = '';
                if (activeBtn1 === 'Received') {
                    tp = 'Received';
                }
                else if (activeBtn1 === 'Sent') {
                    tp = 'Sent';
                }
                else {
                    tp = 'Unread';
                }


                axios.get('/users/message-list', {
                    headers: {
                        'Authorization': 'Token' + ' ' + cookies.get('token')
                    },
                    params: {
                        message_type: tp
                    },
                })
                    .then(res => {
                        console.log(res.data);
                        for (let i = 0; i < res.data.length; i++) {
                            res.data[i]['index'] = i;
                        }
                        setMsgData(res.data)
                        setFinal(res.data)
                    })
                    .catch(err => {
                        console.log("err", err);
                    })


            })
            .catch(err => {
                console.log("err", err);
            })





        return false;
    }


    const onDurClassFilter = (e) => {
        console.log(e)
        let ta = onlineDurArray;

        if (onlineDurArray.includes(e)) {
            ta.splice(ta.indexOf(e), 1);
        }
        else {
            ta.push(e);
        }
        setOnlineDurArray(ta);
        console.log(onlineDurArray)


        return false;
    }




    const elseLink = (e) => {
        console.log("None")
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
              
            <main className="my_forms_main mt-0 pt-0">
                
            <div className="row noMargin noPadding button_margin_top" >
                <span className="page_head noPadding "> Forms & Surveys </span>
            </div>

            <div className="row noMargin noPadding btn_row button_margin_top" >
                <button onClick={() => onSentClick()} className={activeBtn1 === 'Sent' ? "common_btn blue_active" : "common_btn not_active_btn"} >Sent</button>
                <button onClick={() => onUserResponseClick()} className={activeBtn1 === 'User' ? "common_btn blue_active margin_left_btn" : "common_btn not_active_btn margin_left_btn"}>User Responses </button>
                <button onClick={() => onCommentsClick()} className={activeBtn1 === 'Comments' ? "common_btn blue_active margin_left_btn" : "common_btn not_active_btn margin_left_btn"}>Comments</button>
                <button onClick={() => onInboxClick()} className={activeBtn1 === 'Inbox' ? "common_btn blue_active margin_left_btn" : "common_btn not_active_btn margin_left_btn"}>Inbox</button>
                <button onClick={() => onAssignFormClick()} className={activeBtn1 === 'Assign' ? "common_btn blue_active margin_left_btn" : "common_btn not_active_btn margin_left_btn"}>Assign Forms</button>
                <div className="text-right">
                    <button className="common_btn active_btn mr-2" style={{position:"relative",top:"-30px", width:"12vw"}} >
                        Create new - form
                    </button>
                </div>
            </div>

            {/* Table section */}
            <div className="row noMargin noPadding button_margin_top" style={{ width: "100%" }}>
                <table className="table noPadding">
                    <thead className="theading">
                        <tr>
                            <th>Sender</th>
                            <th>Form / Survey</th>
                            <th className="date_th"> Date</th>
                            <th className="action_sec"> &nbsp;&nbsp;&nbsp;&nbsp;  </th>
                        </tr>
                    </thead>
                    <tbody className="tableBody">
                        {msgData && msgData.length > 0 ? msgData.map(event =>

                            <tr style={{ cursor: "pointer" }} key={event.id}  >
                                <td className="td_font">{event.creator_name}</td>
                                <td onClick={() => {
                                    openMsg(event.id, event.index)
                                    setCurrFormId(event.id)
                                    setfmIndex(0);
                                }} className='td_font' >
                                    {activeBtn1 === 'Received' && event.read === false ?
                                        <button className='red_dot'>
                                        </button>
                                        : <></>
                                    }
                                    {event.name} </td>
                                <td onClick={() => {
                                    openMsg(event.id, event.index)
                                    setCurrFormId(event.id)
                                    setfmIndex(0);
                                }}
                                    className='td_font'>{event.created_at && getMonthName(event.created_at)}
                                </td>
                                <td className='td_font'>
                                    <img className="action_icons" style={{ marginRight: "10px" }} onClick={() => {
                                        openMsg(event.id, event.index)
                                        setCurrFormId(event.id)
                                        setfmIndex(0);
                                    }} src="/Images/eyeF.svg" />

                                    <img className="action_icons" style={{ marginRight: "10px" }} src="/Images/penF.svg" />
                                    <img className="action_icons" style={{ marginRight: "10px" }} src="/Images/msgF.svg" />

                                </td>
                            </tr>
                        )
                            :
                            <tr>
                                <td>  No</td>
                                <td>data </td>
                                <td>to</td>
                                <td> display</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

            {
                isMsgOpen ?
                    <div ref={modalRef} className='overlay_msg shadow-lg' >
                        <div className='popup_head'>
                            <div onClick={() => setisMsgOpen(false)} className='compose_msg' >
                                <img className="alignSelfCenter" src='/Images/lar.svg' />
                                <span className="alignSelfCenter">Back to the list </span>
                            </div>
                        </div>

                        <div className='popup_body'>
                            <div className="center_body">
                                <div className='question_div' style={{ fontWeight: "600" }} >
                                    {fmIndex + 1}. {quesData[fmIndex].question}
                                </div>
                                {
                                    quesData[fmIndex].question_type === 'TextField' ?
                                        <div>
                                            <textarea placeholder='Answer Here' className='text_area' rows={windowWidth < 768 && windowWidth > 575 ? "5" : windowWidth < 576 ? "3" : "7"} cols={windowWidth < 576 ? "50" : "70"} style={{ display: "block" }} type='textarea' />
                                        </div>
                                        : <></>
                                }
                                {
                                    quesData[fmIndex].question_type === 'BoolField' || quesData[fmIndex].question_type === "ChoiceField" ?
                                        <div className="radio_div">
                                            <form>
                                                <div className="col-12 noMargin noPadding">
                                                    <div class="form-inline">
                                                        {
                                                            quesData[fmIndex].options.split(',').map((option, index) => (
                                                                <>
                                                                    <div class="form-group noMargin radio_form">
                                                                        <input type="radio" id={"contactChoice" + index} name="contact" value="option" />
                                                                        <label for={"contactChoice" + index} className="radio_label text-left">{option}</label>
                                                                    </div>
                                                                    {index === quesData[fmIndex].options.split(',').length - 1 ?
                                                                        <></>
                                                                        :
                                                                        <div class="form-group noMargin radio_form">
                                                                            <hr className='between_line'></hr>
                                                                        </div>
                                                                    }
                                                                </>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        : <></>
                                }
                                {
                                    quesData[fmIndex].question_type === 'VideoField' ||
                                        quesData[fmIndex].question_type === 'FileField' ||
                                        quesData[fmIndex].question_type === 'ImageField'
                                        ?
                                        <>
                                            <div className='row noPadding noMargin' >
                                                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding noMargin' >
                                                    <div className='contain_docs' >
                                                        {currFile ?
                                                            <img onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                console.log("S")
                                                                setCurrFile('');
                                                                setSelectedImagePreview('/Images/pdfI.svg')
                                                                return false;
                                                            }} src='/Images/delLog.svg' />
                                                            : <></>
                                                        }
                                                        <img className="selected_img" src={selectedImagePreview} />
                                                    </div>
                                                    {/* <img className='m-auto text-center' src='/Images/pdfI.svg' style={{ height: "90%", maxWidth: "88%", width: "auto",display:"block" }} /> */}
                                                    <div className='btm_head text-center '>
                                                        <span className="current_file_name">{currFile && currFile.name}</span>
                                                        {/* <span className="current_file_name">heyyy</span> */}
                                                    </div>
                                                </div>
                                                <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding noMargin' style={{ position: "relative" }}>
                                                    <span class="upload_btn">
                                                        <div style={{ position: "relative" }}>
                                                            <span>Upload</span>
                                                            <input type="file" onChange={updateProfile} class="upload upload_input" />
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>

                                        </>
                                        : <></>
                                }
                            </div>
                            <div className='popup_tail row noMargin noPadding'>
                                {/* <div className='col-12 noPadding'> */}
                                <div className="col-6 text-left noPadding noMargin alignSelfCenter">
                                    {
                                        quesData[fmIndex].question_type === 'VideoField' ||
                                            quesData[fmIndex].question_type === 'FileField' ||
                                            quesData[fmIndex].question_type === 'ImageField'
                                            ?
                                            <>
                                                {currFile ?

                                                    <button className='select_submit' >Submit</button>
                                                    :
                                                    <button className='unselect_btn' >Submit</button>
                                                }
                                                <button onClick={() => {
                                                    if (fmIndex + 1 < quesData.length) {
                                                        console.log("A")
                                                        setCurrFile('');
                                                        setSelectedImagePreview('/Images/pdfI.svg');
                                                        let ind = fmIndex + 1;
                                                        setfmIndex(fmIndex + 1)
                                                        let id1 = quesData[ind].id;
                                                        openMsg();
                                                    }

                                                }} className='skip_btn' >Skip</button>
                                            </>
                                            :
                                            <>
                                                <button className='select_submit'>Submit</button>
                                                <button onClick={() => {
                                                    if (fmIndex + 1 < quesData.length) {
                                                        console.log("A")
                                                        setCurrFile('');
                                                        setSelectedImagePreview('/Images/pdfI.svg');
                                                        let ind = fmIndex + 1;
                                                        setfmIndex(fmIndex + 1)
                                                        let id1 = quesData[ind].id;
                                                        openMsg();
                                                    }

                                                }} className='skip_btn'>Skip</button>
                                            </>
                                    }
                                </div>
                                <div className="col-6 text-right alignSelfCenter noPadding">
                                    <div className='popup_pagination_sec'>
                                        <img className="left_paginate" src='/Images/lar.svg' onClick={() => {
                                            if (fmIndex > 0) {
                                                setCurrFile('');
                                                setSelectedImagePreview('/Images/pdfI.svg');
                                                setfmIndex(fmIndex - 1)
                                                openMsg();
                                            }

                                        }} />
                                        <span className="qstn_count_status">{fmIndex + 1} of {quesData && quesData.length}</span>
                                        <img className="right_paginate" src='/Images/rar.svg' onClick={() => {
                                            if (fmIndex + 1 < quesData.length) {
                                                setCurrFile('');
                                                setSelectedImagePreview('/Images/pdfI.svg');
                                                let ind = fmIndex + 1;
                                                setfmIndex(fmIndex + 1)
                                                let id1 = quesData[ind].id;
                                                openMsg();
                                            }

                                        }} />
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>

                    </div>
                    : <></>
            }


            {/* {
                    isMsg ?

                        <div ref={modalRef} className='overlay-msg shadow-lg bg-white rounded' >


                            <div className='ovr-head'>
                                <span className='compose-msg' >Compose a message</span>

                                <span className='mt-2 mr-2 ovr-cls' onClick={() => onMsgClick()} >
                                    <img className='ovr-cr' src='/Images/crosss.svg' />
                                    Close
                                </span>
                            </div>


                            <div className='ovr-con'>
                                <div>
                                    To : <input type='text' className='To-input mt-2' value={actIns && actIns.name} />

                                    <button style={{ marginLeft: "-7px" }} className='none-btn'>Search Contact

                                        <input id='inpCl' className='search-inp  mb-1 bg-white rounded' value={actIns ? actIns.name : name} onChange={filter} type='search'

                                        ></input>
                                        {actIns ?
                                            <img className='crs-ovr' onClick={() => {
                                                setActiveIns('')
                                                setName('')

                                                console.log("A")
                                            }} src='/Images/crosss.svg' />
                                            : <></>}
                                        <div className="user-list"  >

                                            {foundUsers && foundUsers.length > 0 ? (
                                                foundUsers.map((user) => (
                                                    <li onClick={() => {
                                                        setActiveIns(user)
                                                    }} key={user.id} className="user">
                                                        <span className="user-name">{user.name}</span>

                                                    </li>
                                                ))
                                            ) : (
                                                <p>No results found!</p>
                                            )}
                                        </div>
                                    </button  >


                                </div>
                                <hr style={{ marginLeft: "-5%", height: "0px" }}></hr>

                                <div>
                                    Subject of the message :<input type='text' className='Sub-input' placeholder='Enter Subject ' onChange={(e) => {
                                        setSub(e.target.value);
                                    }} />
                                </div>
                                <hr style={{ marginLeft: "-5%", height: "0px" }}></hr>

                                <div className='mt-4'>

                                    <textarea type='text1' className='' style={{ minHeight: "120px", minWidth: "100%", border: "none" }} placeholder='Enter Message Here' onChange={(e) => {


                                        if (e.target.value.length > 1000) {
                                            e.target.value = e.target.value.slice(0, 1000);
                                        }
                                        setMessage(e.target.value);
                                    }} />
                                    <hr style={{ marginLeft: "-5%", height: "0px" }}></hr>
                                </div>
                                {message.length >= 1000 ?
                                    <p style={{ color: "red" }}>word count should be less than 1000</p>
                                    : <p style={{ color: "black" }}>Word Count : {message.length} / 1000</p>}
                            </div>

                            <button style={{ marginTop: "-25px" }} onClick={() => onSendMsg()} className=' btn btn-send'>Send</button>
                        </div>
                        : <></>
                }
                <div className="calendarApp mt-5"></div> */}
        </main>

        </div >
    );
}
