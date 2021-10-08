import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./item";
import "./scrollable.scss";
import "./styleS.css";
import { useState, useEffect } from "react";
import axios from '../../Axios';
import Cookies from 'universal-cookie';
import item from "./item";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapContainer from '../../Map'
import { GoogleApiWrapper } from "google-maps-react";
import { Link, useHistory } from "react-router-dom";
import { Button, Modal, OverlayTrigger, Popover } from 'react-bootstrap';


const cookies = new Cookies();
toast.configure();

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 320, itemsToShow:2 },
  { width: 576, itemsToShow: 3 },
  { width: 768, itemsToShow: 4 },
  { width: 1240, itemsToShow: 4 },
  // { width: 1560, itemsToShow: 5 }
];

export default function Scrollable(props) {
  const [items, setItems] = useState(['']);
  const [isHover,setHover] = useState(false);
  const [isHoverD,setHoverD] = useState(false);
  const [isMapDisplay,setMapDisplay] = useState(false);
  const [showDesc,setShowDesc] = useState(false);
  const [des,setDes] = useState('');

  const url=props.url;
  const title=props.title;
  const [shareShow, setShareShow] = useState(false)
  const [currUrl,setCurrUrl] =useState('');
  const [shareMsg, setShareMsg] = useState('')
  const [isCopy,setIsCopy] = useState('');
  const [toEmails, setToEmails] = useState('');
  const shareHandleShow = (pack) => {
    setShareShow(true);
    let id =pack.id
    console.log(window.location.href)
    
    let loginUrll = window.location.origin
    let curU=window.location.href+"/"+id;
    setCurrUrl(curU);
    
    let msg = `Enter your message here \nGood Day! \nPlease find this package ${curU} ${pack.name} ${pack.category_name} mode \nHope you find interesting and please join us here ${loginUrll} `;
    console.log(msg);
    setShareMsg(msg);

  }
  const shareHandleClose = () => {
    setShareShow(false);
    setIsCopy(false);
  }
  const onShareClick = (pack) => {

  
    let id= currUrl.slice(currUrl.length-1,currUrl.length);
    console.log(id);
    axios.post('/users/share-package',{
        mail_to:toEmails,
        message:shareMsg,
        package_url:currUrl,
        user:cookies.get("id"),
        package:id,

    }, {
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
  
  
  const packages=props.package;
  const displayTitle=title.charAt(0).toUpperCase()+title.slice(1);
  useEffect(() => {
    // getImages(); 
    console.log(props.items);
    let tarr=props.items;
    
    if(tarr.length>0 && tarr.length<5){
      while(tarr.length<5){
        tarr.push('A');
      }
    }
    
    setItems(tarr);

    console.log(items);
  }, [])

 


  // const onDClick = (e) =>{
  //   console.log(e.target.className)
  //   setDes(e.target.className)
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log("Dlcick")
  //   if(!showDesc)
  //     setShowDesc(true);
  //   else
  //     setShowDesc(false);

  //   return false;
  // }

  const onHover = (e) =>{
    setMapDisplay(false)
    setHover(true);
    setHoverD(true)
    console.log(isHover)
  }
  const offHover =(e) =>{
    setHover(false);
    setHoverD(false);
  }

  const locClick =(e)=>{
      setMapDisplay(true);
  }

  // const setFav = (e) =>{
  //   e.preventDefault();
  //   console.log(e.target.id);
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



  const bookmark = (e, url, mthd) =>{
    e.preventDefault();
    console.log(e.target.id,url,mthd);
    axios({
      method: mthd,
      url: `${url}/${e.target.id}`,
      headers: {
        'Authorization': 'Token'+' '+cookies.get('token')
      },
    }).then(res => {      
      // setTimeout(() => {
      //   window.location.reload()
      // }, 2000);
      toast.success("added to Bookmark", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
      console.log(res.data, "added successfully");
    })
    .catch(err => {
      toast.error("There is an error", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000});
      console.log(err, "There is an error");
    })
  }


  const setBookmark = (e) =>{
    e.preventDefault();
    console.log(e.target.id);
    axios({
      method: 'post',
      url: `users/add-bookmark-package/${e.target.id}`,
      headers: {
        'Authorization': 'Token'+' '+cookies.get('token')
      },
    }).then(res => {      
      // setTimeout(() => {
      //   window.location.reload()
      // }, 2000);
      toast.success("added to Bookmark", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
      console.log(res.data, "added successfully");
    })
    .catch(err => {
      toast.error("There is an error", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000});
      console.log(err, "There is an error");
    })
  }

  const removeBookmark = (e) => {
    e.preventDefault();
    axios({
      method: 'delete',
      url: `users/remove-bookmark-package/${e.target.id}`,
      headers: {
        'Authorization': 'Token'+' '+cookies.get('token')
      },
    }).then(res => {
      console.log(res.data, "removed successfully");    
      // setTimeout(() => {
      //   window.location.reload()
      // }, 2000);
      toast.warning("Removed from Bookmarks", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
    })
    .catch(err => {
      toast.error("There is an error", {position: toast.POSITION.TOP_CENTER, setTimeout: 2000})
      console.log(err, "There is an error");
    })
    console.log("Clicked", e.target.id)
  }

  return (
    <div className="scrollable_main">
      {items.length > 0 ?
          <div className="row noMargin noPadding">
            <div className="row noMargin noPadding top_head_sec">
              <div className="col-6 text-left noMargin noPadding">
                {displayTitle === 'Online' ?
                  <div className="row noMargin card_title">{displayTitle}</div>
                : displayTitle === 'Offline' ?
                  <div className="row noMargin card_title">{displayTitle}</div>
                :
                  <div className="row noMargin card_title">{displayTitle}</div>
                }
              </div>
              <div className="col-6 text-right noMargin noPadding" style={{display: "grid"}}>
                <div className="see_all_btn_div">
                  <Link to={{
                    pathname: '/classes',
                    checkS: { displayTitle }
                  }}>
                    {
                      displayTitle === 'Events' || displayTitle == 'Offline' ?
                        <button className="see_all_btn">See All</button>
                        :
                        <button className="see_all_btn">See All</button>
                    }


                  </Link>
                </div>
              </div>
            </div>
            <div className="row noMargin noPadding">
              <Carousel breakPoints={breakPoints}>

                {items.length !== 0 ? items.map((item) => (
                  item.image_one !== undefined ?
                    <Link style={{ textDecoration: "none" }} to={{
                      pathname: `/class/${item.id}`,
                      checkS: { activeBtn:displayTitle,"displayTitle": item.package_type.split(' ')[0] },
                      id: item.id,
                    }}>
                    <div className="card library_cards" >
                      <div className="card_head">
                        <div className="card_header_sec">
                          {item.image_one !== null ?
                            <img className="card-img-top" alt="img" src={item.image_one}/>
                            :
                            <img className="card-img-top"alt="img" src='/Images/default-banner.png'/>
                          }
                          
                          
                          <img onMouseOver={onHover} onMouseOut={offHover} className="card_absolute_first_img faI" src={item.category_icon} alt="icon" />
                          <div className="hover_category_name">
                            <span className="cat_name_hover"> {item.category_name}</span>
                          </div>
                          <img className="card_absolute_sec_img" src="/Images/bookmark.svg" id={item.id}
                            onClick={item.is_bookmark ? (e) => bookmark(e, 'users/remove-bookmark-package', "delete")
                              : (e) => bookmark(e, 'users/add-bookmark-package', "post")}
                            alt="icon" />
                        </div>
                      </div>
                      <div className="card_body text-left">
                        <h4 className="card-title">{item.name}</h4>
                        <div className="module_description">
                          <OverlayTrigger trigger="hover" placement="bottom" overlay={
                            <Popover id="popover-basic">
                              <Popover.Title as="h3">Description</Popover.Title>
                              <Popover.Content>
                                {item.description}
                              </Popover.Content>
                            </Popover>
                          }>
                            <a>{item.description && item.description.length > 50 ? (item.description + "").slice(0, 50) + "...  " : item.description}</a>
                          </OverlayTrigger>
                        </div>
                      </div>
                      <div className="modal_footer row noMargin">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 noPadding text-left">
                          <img className="card_footer_icons" src="/Images/Vector (2).png" alt="icon" /> 
                          <span className="card_footer_span">
                            {item.total_class !== null ?
                              <> {item.total_class} classes </>
                            :
                              <> {item.time_duration_in_days} days</>
                            }
                          </span>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-3 noPadding text-center">
                          <img className="card_footer_icons" src="/Images/heart.svg" alt="icon" id={item.id} /> 
                          <span className="card_footer_span"> {item.like_count}</span>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-3 noPadding text-right">
                          <img onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            shareHandleShow(item);
                            return false;
                          } } className="card_footer_icons" src="/Images/Vector (4).png" alt="icon" /> 
                          <span className="card_footer_span"> {item.share_count}</span>
                        </div>

                      </div>
                    </div>
                    </Link>
                    : <div></div>
                ))
                  : <></>
                }

                {/* {showDesc ?
                  <div className="overlay-des overlay-desHm" style={{ backgroundColor: "white" }}>

                    <div className="packDet">
                      Description
                    </div>
                    <div className="packCl">
                      <button className="cls-Btn" onClick={onDClick}  >Close</button>
                    </div>
                    <hr></hr>
                    <div className="oDesc"> {des}</div>
                  </div>
                  : <></>
                } */}


              </Carousel>
            </div>

              {/* share model */}
         <Modal show={shareShow}
          onHide={shareHandleClose}
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
          centered>
          <Modal.Header className="single_cls_header_sec_desc" closeButton>
            <Modal.Title className="single_cls_popup_desc">Share This Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="single_cls_scss_inst_sec">
              <div className="row noMargin noPadding">
                <div className="row noMargin noPadding">
                  <div className="col-xl-10 col-lg-10 col-md-11 col-sm-10 col-10 noPadding">
                    <span className="single_class_pro_tail_heads noPadding">Share wellness package with your contacts</span>
                    <div className="row noMargin noPadding mail_sec">
                      <div className="col-xl-2 col-lg-2 col-md-1 col-sm-2 col-2 text-right" style={{ display: "grid" }}>
                        <span className="align_self_center">To</span>
                      </div>
                      <div className="col-xl-10 col-lg-10 col-md-11 col-sm-10 col-10 noPadding text-left">
                        <input type="text" className="form-control enter_mail_id" placeholder="Enter  ','  separated email Ids here" onChange={(e)=>{setToEmails(e.target.value)}} />
                      </div>
                      <div className="col-xl-10 offset-xl-2 col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-10 offset-sm-2 col-10 offset-2 noPadding text-left">
                        <textarea rows="5" className="form-control enter_text" placeholder="Enter your message here" value={shareMsg} onChange={(e)=>setShareMsg(e.target.value)} ></textarea>
                      </div>
                      <div className="col-xl-10 offset-xl-2 col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-10 offset-sm-2 col-10 offset-2 noPadding text-left">
                        <button onClick={onShareClick} className="mail_share_btn">Share</button>
                      </div>
                      <div className="col-xl-10 offset-xl-2 col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-10 offset-sm-2 col-10 offset-2 noPadding text-left">
                        <div className="row noMargin noPadding mail_sec">
                          <div className="col-xl-3 col-lg-2 col-md-3 col-sm-3 col-3 text-left noPadding" style={{ display: "grid" }}>
                            <span className="align_self_center">Or Copy Link</span>
                          </div>
                          <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 noPadding text-left">
                            <div class="input-group copy_link_grp">
                              <input type="text" className="form-control copy_link" value={currUrl} aria-describedby="basic-addon2" />
                              <div class="input-group-append">
                                <span style={{cursor:"pointer"}}  class="input-group-text copy_img_span" id="basic-addon2">
                                  
                                  {!isCopy ?
                                  <img onClick={() => {
                                    navigator.clipboard.writeText(currUrl)
                                    setIsCopy(true);
                                    }} className="copy_link_img" src="/Images/copy-link.svg" />
                                    :
                                    <span style={{color:"#03cbc9",fontSize:"1.8vh"}}>Link Copied !</span>
                                  }

                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-1 col-sm-2 col-2 noPadding text-center">
                    <div className="mail_img_div">
                      {/* <img className="share_mail_img align_self_center" src="/Images/share_mail_img.png" style={{ display: "block" }}></img> */}
                     <button style={{background:"none",borderRadius:"50px",borderColor:"#03cbc9",height:"55px",width:"55px"}}> <img style={{height:"20px"}} className="share_mail_img align_self_center" src="/Images/mailE.svg"></img> </button>
                     <p style={{paddingLeft:"6px",color:"#03cbc9"}}>Email</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

          </div>

        : <div></div>
      }



    </div>
  );
}


