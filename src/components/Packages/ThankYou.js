import React, { useEffect, useState } from 'react'
import axios from '../../Axios';
import Cookies from 'universal-cookie';
import './BuyPackage.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import { Link, useHistory } from "react-router-dom";
import Navbar from '../Navbar/Navbar';

const drawerWidth = 160;

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


const cookies = new Cookies();


const ThankYou = (props) => {
    const [newsList, setNewsList] = useState([])
    const [checkedCon, setChechedCon] = useState('');
    const [paymentSummary, setPaymentSummary] = useState(null);
    const [isInstallmentDetail, setIsInstallmentDetail] = useState(false)
    const [isInstallmentSchedule, setIsInstallmentSchedule] = useState(false)
    const [id, setId] = useState(0);
    const [termsDown, setTermsDown] = useState(false);
    const [check, setCheck] = useState(2);
    const classes = useStyles();
    



    useEffect(() => {

        console.log(props.location);
        setId(props.location.id);
        axios.get('/users/order-summary', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
            params: {
                package: props.location.id,
                coupon_code: props.location.coupon,
            },
        })
            .then(res => {
                console.log(res.data);
                console.log(res.data, res.data.hasOwnProperty("installment_detail"))
                setIsInstallmentDetail(res.data.hasOwnProperty("installment_detail"))
                setIsInstallmentSchedule(res.data.hasOwnProperty('installment_schedule'))
                setPaymentSummary(res.data)
            })
            .catch(err => {
                console.log("err", err);
            })
    }, [])

    const handleParentData = (value) => {
        setCheck(value)
    }


    const proceedPay = (e) => {
        console.log(checkedCon)
        if (!checkedCon) {
            return;
        }
        axios.post('/users/transactions', {
            package: id,
        }, {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },

        })
            .then(res => {
                console.log(res.data)
                if (isInstallmentDetail) {
                    window.open(
                        res.data.authLink,
                        '_blank'
                    );
                }
                else {
                    window.open(
                        res.data.paymentLink,
                        '_blank'
                    )
                }
            })
            .catch(err => {
                console.log("err", err);
            })
    }

    return (
        <div className='con-ful' style={{ backgroundColor: "white", minHeight: window.innerHeight }}>
            <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Navbar value={check} handleData={handleParentData} />
      </AppBar>

      {check === 1 ?
        
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
                        <ListItemIcon style={{ minWidth: '2.27vw' }} ><img onMouseOut={e => (e.currentTarget.src = 'Images/home.svg')} onMouseOver={e => (e.currentTarget.src = 'Images/home.svg')} id="icon" style={{ "height": "2.77vh" }} src='Images/home.svg' alt="classes" /></ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem" >
                  <Link to="/classes">
                    <button className="nbtn"  >
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/classes.svg' alt="classes" /> </ListItemIcon>
                        <ListItemText primary="Classes" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">

                  <Link to="/library">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/library.svg' alt="library" /></ListItemIcon>
                        <ListItemText primary="Library" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="/packages">
                    <button className="nbtn" style={{ "color": "#03CBC9" }}>
                      <ListItem className="test1" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/PackageB.svg' alt="packages" /></ListItemIcon>
                        <ListItemText primary="Packages" />
                      </ListItem  >
                    </button>
                  </Link>
                </div>

                <div id="menuItem">
                  <Link to="instructor">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/smeet.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="Influencers" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                <Link to="/subscription">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/myZone.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="My Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
                <div id="menuItem">
                  <Link to="instructor">
                    <button className="nbtn">
                      <ListItem className="test" >
                        <ListItemIcon style={{ minWidth: '2.27vw' }}><img style={{ "height": "2.77vh" }} src='Images/smeet.svg' alt="zone" /></ListItemIcon>
                        <ListItemText primary="Biz Zone" />
                      </ListItem>
                    </button>
                  </Link>
                </div>
              </List>



            </div>
          </Drawer>:<></>
          }

          </div>







            <div className='row mt-5 pt-5'>
                <div className='col-12 col-lg-8 offset-lg-2 ' >

                    <div className='ord-sum shadow-sm' >

                        Your Payment is successful
                    </div>

                    <div className='row mt-4' style={{ backgroundColor: "#f1eeee", width: "100%", margin: "auto" }}>

                        <div className='col-12 py-2 '  >
                            Thank you for your payment. An automated payment receipt will be sent to your registered email.
                        </div>

                    </div>
                    <div className='row mt-5' style={{ width: "100%", margin: "auto" }}>

                        <div className='col-12 pl-0'  >
                            <Link to='/home' >
                                <button className='back-home-th' >
                                    Back to Home
                                </button>
                            </Link>
                            <button className='view-ord-th'>
                                View Order
                            </button>
                        </div>

                    </div>







                </div>
            </div>


        </div>
    )
}

export default ThankYou;
