import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./item";
// import "./scrollStyle.css";
// import "./styleS.css";
import "./recommended_freebies.scss";

import { useState, useEffect } from "react";
import axios from '../../Axios';
import Cookies from 'universal-cookie';
import { Modal } from "react-bootstrap";


const cookies = new Cookies();
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 320, itemsToShow:2 },
  { width: 576, itemsToShow: 3 },
  { width: 768, itemsToShow: 4 },
  { width: 1240, itemsToShow: 4 }
];

export default function Recommended(props) {
  const [items, setItems] = useState([]);
  const [isHover,setHover] = useState(false);
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

  

  const url=props.url;
  const title=props.title;
  const displayTitle=title.charAt(0).toUpperCase()+title.slice(1);
  useEffect(() => {
    getImages();
  }, [])

  const onHover = (e) =>{
    setHover(true);
    console.log(isHover)
  }
  const offHover =(e) =>{
    setHover(false);
  }

  

 const getImages = async()=>{
        console.log(cookies.get('token'))
	await axios.get(url,{
            headers: {
                'Authorization': 'Token'+' '+cookies.get('token')    
              }
        })
    .then(res => {
      console.log(res.data);
      var arr=res.data;
      if(arr.length>0){
      while(arr.length <5){
        arr.push("X");
      }
    }
      let finArr=[];
      console.log(arr[0].online_classes);
      for(let i=0;i<arr[0].online_classes.length;i++){
        finArr.push(arr[0].online_classes[i]);
      }
      for(let i=0;i<arr[1].offline_classes.length;i++){
        finArr.push(arr[1].offline_classes[i]);
      }
      for(let i=0;i<arr[2].event.length;i++){
        finArr.push(arr[2].event[i]);
      }
      for(let i=0;i<arr[3].audio.length;i++){
        finArr.push(arr[3].audio[i]);
      }
      for(let i=0;i<arr[4].video.length;i++){
        finArr.push(arr[4].video[i]);
      }
      console.log(finArr);
      if(finArr.length>0){
        while(finArr.length <5){
          finArr.push("X");
        }
      }
      setItems(finArr)
      console.log(finArr)

      
      
    })
    .catch(err => {
      console.log("err", err);
    })
  } 

  return (
    <div className="recommended_main" id="freebies_main">
      {items.length > 0 ?
        <div className="row noMargin noPadding">
          <div className="row noMargin noPadding top_head_sec">
            <div className="row noMargin card_title">{displayTitle}</div>
          </div>
          <Carousel breakPoints={breakPoints}>
            {items.map((item) => (
              item !== 'X' ?
                <div className="card library_cards">
                  <div className="card_head">
                    <div className="card_header_sec">
                      {item.event_image ?
                        <img className="card-img-top" alt="img" src={item.event_image}/>
                        : item.master_image !== undefined && item.master_image !== null ?
                          <img className="card-img-top" alt="img" src={item.master_image}/>
                          : item.background_image !== undefined && item.background_image !== null ?
                            <img className="card-img-top" alt="img" src={item.background_image}/>
                            : <div></div>
                      }
                    </div>
                  </div>

                  <div className="modal_footer row noMargin">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 noPadding text-left">
                      <img className="card_footer_icons" src="/Images/Vector (2).png" alt="icon" />
                      <span className="card_footer_span"> 25 classes </span>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-3 noPadding text-center">
                      <img className="card_footer_icons" src="/Images/Vector (3).png" alt="icon" />
                      <span className="card_footer_span"> 125 </span>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-3 noPadding text-right">
                      <img onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            shareHandleShow(item);
                            return false;
                          } } className="card_footer_icons" src="/Images/Vector (4).png" alt="icon" />
                      <span className="card_footer_span"> 35 </span>
                    </div>
                  </div>
                </div>
              : <div></div>
            ))}

          </Carousel>
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
        : <></>
      }
    </div>
  );
}


