
import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./item";
import "./card.scss";
import { useState, useEffect } from "react";
import axios from '../../Axios';
import Cookies from 'universal-cookie';
import item from "./item";

const cookies = new Cookies();

export default function EventCard(props) {
  let items=[]
  items=props.items;
  let count=props.count;
  let defImg = props.defImg;
  const title=props.title;
  const displayTitle=title.charAt(0).toUpperCase()+title.slice(1);
  let onCheck=0;
  
  return (
    <div className="home_page_card_main">
        <div className="card card_custom event_card">
            <div className="row noMargin card_title">{displayTitle}</div>
            <div className="row noMargin custom_card_body">
                <div className="row noMargin noPadding body_scroll" style={{"overflow-y": "auto", "scrollbarWidth": "1px", display: "block"}}>
                    {count !== 0 ? items.map(items =>
                        <div class="row noMargin noPadding">
                            <>  
                                <div class="row noMargin noPadding individual_row">
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding noMargin">
                                        <div className="schedule_img_div">
                                            <img src={items.image} class="schedule_img" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding noMargin">
                                        <div className="each_event_right_main">
                                            <div class="alignSelfCenter">
                                                <div className="row noMargin text-left" style={{"paddingRight": "0"}}>
                                                    <span className="event_title">{items.title}</span>
                                                </div>
                                                <div className="row noMargin text-left" style={{ "paddingRight": "0" }}>
                                                    <span className="event_info_span" style={{ color: "#03CBC9" }}>
                                                        Starts at: {items.start_time.slice(0, 5)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    )
                        :
                        <div>
                            <div className="empty_state_text" >No Events For Today</div>
                            <img src={defImg} className="empty_img" />
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  );
}


