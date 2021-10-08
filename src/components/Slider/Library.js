
import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./item";
// import "./styleS.css";
import "./library.scss";

import { useState, useEffect } from "react";
import axios from '../../Axios';
import Cookies from 'universal-cookie';
import {withRouter} from 'react-router-dom'
import { Link, useHistory } from "react-router-dom";



const cookies = new Cookies();


export default function Library(props) {
  
  const title=props.title;
  const displayTitle=title.charAt(0).toUpperCase()+title.slice(1);


 
  let items=props.items;

  if(props.items.data){
    items=props.items.data;
  }
  let defArr=props.items;
  


  
  return (
    <div className="home_page_library_card_main">
      <div className="card card_custom">
        <div className="row noMargin noPadding top_head_sec">
          <div className="col-6 text-left noMargin noPadding">
            <div className="row noMargin card_title">{displayTitle}</div>
          </div>
          <div className="col-6 text-right noMargin noPadding" style={{display: "grid"}}>
            <div className="see_all_btn_div">
              <Link to={{
                pathname: '/library',
                checkS: { displayTitle }
              }}>
                <button className="see_all_btn">See All</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row noMargin custom_card_body">
          <div className="row noMargin noPadding body_scroll" style={{"overflow-y": "auto", "scrollbarWidth": "1px", display: "block"}}>
            {items.length > 0 ? items.map(items =>
            <Link style={{ textDecoration: "none" }} to={{
              pathname: `/library/${items.id}`,
              checkS: { activeBtn:displayTitle, "displayTitle": items.package_type },
              id: items.id,
            }}>
              <div class="row noMargin noPadding">
                {items.package_type === title ?
                  <>
                    <div class="row noMargin noPadding individual_row">
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding noMargin">
                        <div className="schedule_img_div" >
                          <img src={items.image_one} className="schedule_img" alt="" />
                          {/* <img src="https://stg-mybizmowellness.s3.amazonaws.com/media/package_image/Frame_39_zr4PFUF.png" className="schedule_img" alt="" /> */}
                          {/* Auido GIF  */}
                          {displayTitle === 'Audio' ?
                            <img className="music_gif" src='/Images/audio-g.svg' />

                            // Video GIF
                            : displayTitle === 'Video' ?
                              <img className="video_gif" src='/Images/video-waves 2.svg' />
                              : <div></div>}
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding noMargin">
                        <div className="each_event_right_main">
                          <div class="alignSelfCenter">
                            <div className="row noMargin text-left" style={{ "paddingRight": "0" }}>
                              <span className="event_title">{items.name}</span>
                            </div>
                            <div className="row noMargin text-left" style={{ "paddingRight": "0" }}>
                              {displayTitle === 'Quote' ?
                                <span className="event_info_span" style={{ "marginTop": "0", }}>
                                  Count :  {items.count}
                                </span>
                                : displayTitle === 'Audio' ?
                                  <span className="event_info_span" style={{ "marginTop": "0", }}>
                                    Count :  {items.count}
                                  </span>
                                  :
                                  <span className="event_info_span" style={{ "marginTop": "0", }}>
                                    Count :  {items.count}
                                  </span>

                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                  :
                  <div> </div>}
              </div>
              </Link>
            )
              :
              <div>
                {displayTitle === 'Audio' ?
                  <img src={defArr.empty_audio_package} className="empty_img"/>
                  :
                  <img src={defArr.empty_video_package} className="empty_img"/>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}


