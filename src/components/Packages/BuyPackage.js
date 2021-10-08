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


const BuyPackage = (props) => {
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
                coupon_code:props.location.coupon,
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
        <div className='con-ful' style={{ backgroundColor: "white" }}>
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
                </Drawer>
                : <></>}





            {paymentSummary ?
                <>
                    <div className='row mt-5'>
                        <div className='col-12 col-lg-8 offset-lg-1 ' >
                            <span className='bk-icon' style={{ cursor: "pointer" }} onClick={() => window.history.go(-1)} >
                                <img style={{ height: "2vh" }} src='/Images/back-icon.svg' />
                            </span>
                            <div className='ord-sum shadow-sm' >

                                Order Summary
                            </div>
                            <div className='mt-3' style={{ backgroundColor: "#fff", borderRadius: "4px" }}>
                                <div className='row'  >
                                    <div className='col-4 pack-head1'>
                                        Package Name
                                    </div>
                                    <div className='col-4 pack-mid1'>
                                        {paymentSummary.package_name}
                                    </div>
                                </div>

                                <div className='row'  >
                                    <div className='col-4 pack-head1'>
                                        Package Plan
                                    </div>
                                    <div className='col-4 pack-mid1'>
                                        Subscription {paymentSummary.payment_plan}
                                    </div>
                                </div>

                                <div className='row'  >
                                    <div className='col-4 pack-head1'>
                                        Package Total
                                    </div>
                                    <div className='col-4 pack-mid1'>
                                        {paymentSummary.package_total}
                                    </div>
                                    <div className='col-4 pack-mid1 gr-dis'>
                                        renewed {paymentSummary.payment_plan}
                                    </div>
                                </div>

                                <div className='row'  >
                                    <div className='col-4 pack-head1'>
                                        Discount
                                        {paymentSummary.coupon_code_off.length > 0 ?
                                            <div className='gr-dis'>
                                                (Coupon Code -10% off)
                                            </div>
                                            :
                                            <></>
                                        }
                                    </div>
                                    <div className='col-4 pack-mid1'>
                                        - {paymentSummary.discount_amount}
                                    </div>
                                    {/* <hr style={{ width: "94%", height: "0", margin: "auto" }}></hr> */}
                                </div>


                                <div className='row'  >
                                    <div className='col-4 pack-head1'>
                                        Total Taxable Amount
                                    </div>
                                    <div className='col-4 pack-mid1'>
                                        {paymentSummary.taxable_amount}
                                    </div>
                                </div>

                                <div className='row'  >
                                    <div className='col-4 pack-head1'>
                                        Taxes <span className='gr-dis'>( @ {paymentSummary.tax_in_percent}% GST )</span>
                                    </div>
                                    <div className='col-4 pack-mid1'>
                                        {paymentSummary.taxes}
                                    </div>
                                    <hr style={{ width: "94%", height: "0", margin: "auto" }}></hr>
                                </div>

                                <div className='row'  >
                                    <div className='col-4 pack-head1'>
                                        Net Payable Amount
                                    </div>
                                    <div className='col-4 pack-mid1'>
                                        {paymentSummary.net_payable_amount}
                                    </div>
                                </div>
                                {/* <div className='row m-auto' style={{ backgroundColor: "#9929FD", width: "100%", borderRadius: "4px" }} >
                                    <div className='col-12' >
                                        <input type='text' style={{ backgroundColor: "inherit", borderRadius: "4px", width: "65%", color: "white" }} className='border m-2' >
                                        </input>
                                        <button className='btn-app-cp'>Apply Coupon</button>

                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {isInstallmentDetail ?
                        <div className='row mt-5'>
                            <div className='col-12 col-lg-8 offset-lg-1 ' >
                                <div className='ord-sum shadow-sm ' >
                                    Installments Details
                                </div>
                                <div className='mt-4' style={{ backgroundColor: "#fff", borderRadius: "4px" }}>
                                    <div className='row'  >
                                        <div className='col-4 pack-head1'>
                                            Installments Period
                                        </div>
                                        <div className='col-4 pack-mid1'>
                                            {paymentSummary.payment_plan}
                                        </div>
                                    </div>
                                    <div className='row'  >
                                        <div className='col-4 pack-head1'>
                                            Number of Installments
                                        </div>
                                        <div className='col-4 pack-mid1'>
                                            {paymentSummary.installment_detail.number_of_installments}
                                        </div>
                                    </div>
                                    <div className='row'  >
                                        <div className='col-4 pack-head1'>
                                            First Payment Date
                                        </div>
                                        <div className='col-4 pack-mid1'>
                                            {paymentSummary.installment_detail.first_payment_date}
                                        </div>
                                    </div>
                                    <div className='row'  >
                                        <div className='col-4 pack-head1'>
                                            Payment Schedule
                                        </div>
                                        <div className='col-4 pack-mid1'>
                                            20th of every month
                                        </div>
                                    </div>
                                    <div className='row'  >
                                        <div className='col-4 pack-head1'>
                                            Last Payment Date
                                        </div>
                                        <div className='col-4 pack-mid1'>
                                            {paymentSummary.installment_detail.last_payment_date}
                                        </div>
                                    </div>
                                    <div className='row'  >
                                        <div className='col-4 pack-head1'>
                                            Amount per Installments
                                        </div>
                                        <div className='col-4 pack-mid1'>
                                            {paymentSummary.installment_detail.amount_per_installment}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <></>
                    }

                    {isInstallmentSchedule && paymentSummary.installment_schedule.length > 0 ?
                        <div className='row mt-5'>
                            <div className='col-12 col-lg-8 offset-lg-1 ' >
                                <div className='ord-sum shadow-sm ' >
                                    Installment Schedule
                                </div>

                                <div className="tableCon tableCon1 container-fluid3 mt-3 " style={{ width: "100%", borderTopRightRadius: "5px" }}>
                                    <table className="table " style={{ fontSize: "2.077vh" }}>
                                        <thead className="theading">
                                            <tr>
                                                <th> &nbsp;&nbsp;&nbsp;  </th>
                                                <th>Installment</th>
                                                <th>Date</th>
                                                <th>Amount</th>

                                            </tr>
                                        </thead>
                                        <tbody className="tableBody" style={{ fontSize: "2.077vh" }}>
                                            {paymentSummary.installment_schedule.map((item) =>
                                            
                                            <>
                                             {/* <span className=' span-bord-ver'> &nbsp; </span>
                                             <span className=' span-bord-ver-dn'> &nbsp; </span> */}
                                                <tr style={{ fontWeight: "500" }}>
                                                   
                                                    {item.installment==='Installment 1' ?
                                                    <td style={{ textAlign: "center" }} > <img src='/Images/checked.svg' style={{ height: "20px", borderRadius: "20px", margin: "auto", marginRight: "-10px",border:"solid 1px #03CBC9" }} /> </td>
                                                    :
                                                    <td style={{ textAlign: "center" }} > <img src='/Images/uncheck.svg' style={{ height: "20px", borderRadius: "20px", margin: "auto", marginRight: "-10px",border:"solid 1px #03CBC9" }} /> </td>
                                                        }
                                                    <td>{item.installment}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.amount}</td>
                                                </tr>
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }


                    <div className='row mt-5 '>
                        <div className='col-12 col-lg-8 offset-lg-1 ' >
                            <div className='ord-sum shadow-sm ' style={{ backgroundColor: "#f1eeee", borderRadius: "4px" }} >
                                Terms and Conditions
                                {termsDown ?
                                    <span onClick={() => setTermsDown(false)} style={{ float: "right", cursor: "pointer" }}><img src='/Images/back-icon.svg' /> </span>
                                    :
                                    <span onClick={() => setTermsDown(true)} style={{ float: "right", cursor: "pointer" }}><img src='/Images/downarr.svg' /> </span>}
                            </div>
                            {termsDown ?
                                <div className='m-3 '>
                                    All Terms and Conditions
                                </div>
                                : <></>
                            }
                            <div className='mt-2 mb-4' style={{ fontSize: "2.2vh" }}>
                                {checkedCon ?
                                    <img className='mr-2' onClick={() => setChechedCon(false)} src='/Images/checked.svg' style={{ height: "2.5vh" }} />
                                    :
                                    <img className='mr-2' onClick={() => setChechedCon(true)} src='/Images/uncheck.svg' style={{ height: "2.5vh" }} />}

                                I've read the following terms & conditions and consent to renew subscription automaticaly every month
                            </div>

                            <div className='prcd-con' >
                                {!checkedCon ?
                                <div className='tnc-warn'>
                                    Please accept the terms and conditions . 
                                </div>
                                :<></>}

                                <button onClick={proceedPay} className='prcd-pay mt-3 mb-5'>
                                    Proceed to Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </>
                :
                <></>
            }
        </div>
    )
}

export default BuyPackage;
