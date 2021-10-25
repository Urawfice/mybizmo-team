import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
import Item from "./item";
import "./card.scss";
import axios from "../../Axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Card(props) {
  //   const [liveIn, setLiveIn] = useState('');
  let items = [];
  items = props.items;
  let count = props.count;
  let defImg = props.defImg;

  const title = props.title;
  const displayTitle = title.charAt(0).toUpperCase() + title.slice(1);
  let onCheck = 0;
  let liveIn;

  const checkTime = (st, et) => {
    const startTime = new Date(new Date().toDateString() + " " + st);
    const endTime = new Date(new Date().toDateString() + " " + et);
    const currentTime = new Date();
    if (currentTime >= startTime && currentTime <= endTime) return true;
    else if (currentTime < startTime) {
      let diff = (currentTime.getTime() - startTime.getTime()) / 1000;
      diff /= 60;
      console.log(diff);
      liveIn = Math.abs(Math.round(diff));
    } else liveIn = "Finished";
  };

  return (
    <div className="home_page_card_main">
      <div className="card card_custom">
        <div className="row noMargin card_title">{displayTitle}</div>
        <div className="row noMargin custom_card_body">
          <div
            className="row noMargin noPadding body_scroll"
            style={{
              "overflow-y": "auto",
              scrollbarWidth: "1px",
              display: "block",
            }}
          >
            {count !== 0 ? (
              items.map((items) => (
                <div class="row noMargin noPadding">
                  {items[title] === true ? (
                    <>
                      <div class="row noMargin noPadding individual_row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding noMargin">
                          <div className="schedule_img_div">
                            <img
                              src={items.event_image}
                              class="schedule_img"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding noMargin">
                          <div className="each_event_right_main">
                            <div class="alignSelfCenter">
                              <div
                                className="row noMargin text-left"
                                style={{ paddingRight: "0" }}
                              >
                                <span className="event_title">
                                  {items.title}
                                </span>
                              </div>
                              <div
                                className="row noMargin text-left"
                                style={{ paddingRight: "0" }}
                              >
                                {items.offline ? (
                                  <span
                                    className="event_info_span"
                                    style={{ marginTop: "0" }}
                                  >
                                    Duration <b>{items.event_duration} mins</b>
                                  </span>
                                ) : (
                                  <>
                                    {checkTime(
                                      items.start_time,
                                      items.end_time
                                    ) ? (
                                      <span
                                        className="event_info_span"
                                        style={{ color: "#03CBC9" }}
                                      >
                                        Live now
                                      </span>
                                    ) : (
                                      <>
                                        {liveIn === "Finished" ? (
                                          <span
                                            className="event_info_span"
                                            style={{ color: "#f7314c" }}
                                          >
                                            Event finished
                                          </span>
                                        ) : (
                                          <span
                                            className="event_info_span"
                                            style={{ color: "#E5C000" }}
                                          >
                                            Live in {liveIn} mins
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div> </div>
                  )}
                </div>
              ))
            ) : (
              <div>
                <div className="empty_state_text">
                  No {displayTitle} Classes Today
                </div>
                <img src={defImg} className="empty_img" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
