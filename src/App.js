import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import LoginTest from './components/auth/LoginTest';
import SignUp from './components/auth/SignUp';
import Navbar from './components/Navbar/Navbar';
import Sidenav from './components/Sidenav/Sidenav';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import OtpPage from './components/ForgotPassword/OtpPage';
import ResetPassword from './components/ForgotPassword/ResetPassword';
import Home from './components/home/home';
import Cookies from 'universal-cookie';
import VerifyOtp from './components/auth/VerifyOtp';
import Classes from './components/Classes/Classes';
import SingleClass from './components/Classes/SingleClass';
import SingleLibrary from './components/Library/SingleLibrary';
import Library from './components/Library/Library';
import PackageClass from './components/Packages/PackageClass';
// import PackageLibrary from './components/Packages/PackageLibrary';
import TeamDetailsNew from './components/instructor/TeamDetailsNew';
import Main from './components/home/Main';
import Subscription from './components/MyZone/Subscription';
import Messaging from './components/MyZone/Messaging';
import MyActivity from './components/MyZone/MyActivity';
import MyProfile from './components/MyZone/MyProfile';
import MySchedule from './components/MyZone/MySchedule';
import LandingPage from './components/LandingPage/LandingPage'

import BizZoneMainPage from './components/BizZone/BizZoneMainPage';
import BuyPackage from './components/Packages/BuyPackage';
import Forms from './components/MyZone/Forms' ;
import ThankYou from './components/Packages/ThankYou';
import ReachUs from './components/LandingPage/ReachUs';
import AboutUs from './components/LandingPage/AboutUs';

import PersonalDetails from './components/MyZone/UploadDocs';

// New links
import Profile from './components/Profile/Profile';
import Connect from './components/Profile/Connect/Connect';
import Financials from './components/Profile/Financials/Financials';

const cookies = new Cookies()

function App() {
  return (
    <BrowserRouter>
      <div className="App"  style={{minHeight:window.innerHeight}}>
        <Route path="/login" exact component={Login}/>
        {/* <Route path="/login-test" exact component={LoginTest}/> */}
        <Route path="/sign-up" exact component={SignUp}/>
        <Route path="/enter-otp" exact component={OtpPage}/>
        <Route path="/verify-otp" exact component={VerifyOtp}/>
        <Route path="/classes" exact component={Classes}/>
        <Route path="/library" exact component={Library}/>
        <Route path="/packages" exact component={PackageClass}/>
        <Route path='/instructor' exact component={TeamDetailsNew} />
        <Route path='/subscription' exact component={Subscription} />
        <Route path='/my-activity' exact component={MyActivity} />
        <Route path='/messaging' exact component={Messaging} />
        <Route path='/my-profile' exact component={MyProfile} />
        <Route path='/my-schedule' exact component={MySchedule} />
        <Route path='/' exact component={LandingPage} />
        <Route path='/about-us' exact component={AboutUs} />
        
        
        <Route path='/biz-zone' exact component ={BizZoneMainPage} />
        <Route path='/buy-package' exact component ={BuyPackage} />
        <Route path='/payment-thankyou' exact component ={ThankYou} />
        <Route path='/forms' exact component={Forms} />
        <Route path='/reach-us' exact component={ReachUs} />

        {/* <Route path="/packages/Library" exact component={PackageLibrary}/> */}
        <Route path="/class/:id" exact component={SingleClass}/>
        <Route path="/library/:id" exact component={SingleLibrary}/>
        <Route path='/home1' exact component={Main} />
        <Route path="/reset-password" exact component={ResetPassword}/>
        {cookies.get('token')?
          <Route path="/home" exact component={Home}/>
          : 
          <Redirect to='/' />
        } 
        <Route path="/forgot-password-enter-email-page" exact component={ForgotPassword}/>
        <Route path="/my-bizzone-main-page" component={BizZoneMainPage}></Route>

        {/* New Routes */}
        <Route path="/profile" exact component={MyProfile} />
        <Route path="/schedules" exact component={MySchedule} />
        <Route path="/connect" exact component={Connect} />
        <Route path="/financials" exact component={Financials} />
      </div>
    </BrowserRouter>
  );
}

export default App;
