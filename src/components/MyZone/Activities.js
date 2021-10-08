
import React, { useState, useEffect } from "react";
import "./myActivity.scss";
import Cookies from 'universal-cookie';
import axios from '../../Axios';

const cookies = new Cookies();

export default function Activities(props) {
    const [items, setItems] = useState([]);
    const [liked, setLiked] = useState([]);
    const [bookmarked, setBookmarked] = useState([]);
    const [shared, setShared] = useState([]);


    useEffect(() => {

        let heading;

        if (props.title)
            heading = props.title;
        else
            heading = 'Classes';
        console.log(heading)


        axios.get('/users/my-activity', {
            headers: {
                'Authorization': 'Token' + ' ' + cookies.get('token')
            },
            params: {
                package_type: heading
            },
        })
            .then(res => {
                console.log(res);
                setLiked(res.data.like_package);
                setShared(res.data.share_package);
                setBookmarked(res.data.bookmark_package)
                //   setItems(res.data);

            })
            .catch(err => {
                console.log("err", err);
            })

    }, [])

    let liveIn;

    const checkTime = (st, et) => {
        const startTime = new Date(new Date().toDateString() + ' ' + st)
        const endTime = new Date(new Date().toDateString() + ' ' + et)
        const currentTime = new Date();
        if (currentTime >= startTime && currentTime <= endTime)
            return true
        else if (currentTime < startTime) {
            let diff = (currentTime.getTime() - startTime.getTime()) / 1000;
            diff /= 60;
            console.log(diff);
            liveIn = Math.abs(Math.round(diff));
        }
        else
            liveIn = "Finished"
    }

    return (
        <div className="activities_card_main">
            <div className='row noMargin noPadding'>

                {/* Liked By me CARD */}
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 individual_card_div'>
                    <div className="card card_custom">
                        <div className="row noMargin card_title">Liked by me</div>
                        <div className="row noMargin custom_card_body">
                            <div className="row noMargin noPadding body_scroll" style={{"overflow-y": "auto", "scrollbarWidth": "1px", display: "block"}}>
                                {true ? liked.map(items =>
                                    <div class="row noMargin noPadding">
                                        {true ?
                                            <>
                                                <div class="row noMargin noPadding individual_row">
                                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding noMargin">
                                                        <div className="schedule_img_div">
                                                            <img src={items.image_one} class="schedule_img" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding noMargin">
                                                        <div className="each_event_right_main">
                                                            <div class="alignSelfCenter">
                                                                <div className="row noMargin text-left" style={{"paddingRight": "0"}}>
                                                                    <span className="event_title">{items.name}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <div> </div>}
                                    </div>
                                )
                                    :
                                    <div>
                                        <div className="empty_state_text" >No  data </div>
                                        {/* <img src={defImg} height="210vh"  /> */}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shared By me CARD */}
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 individual_card_div'>
                    <div className="card card_custom">
                        <div className="row noMargin card_title">Shared by me</div>
                        <div className="row noMargin custom_card_body">
                            <div className="row noMargin noPadding body_scroll" style={{ "overflow-y": "auto", "scrollbarWidth": "1px", display: "block" }}>
                                {true ? shared.map(items =>
                                    <div class="row noMargin noPadding">
                                        {true ?
                                            <>  <div class="row noMargin noPadding individual_row">
                                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding noMargin">
                                                        <div className="schedule_img_div">
                                                            <img src={items.image_one} class="schedule_img" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding noMargin">
                                                        <div className="each_event_right_main">
                                                            <div class="alignSelfCenter">
                                                                <div className="row noMargin text-left" style={{"paddingRight": "0"}}>
                                                                    <span className="event_title">{items.name}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <div> </div>}
                                    </div>
                                )
                                    :
                                    <div>
                                        <div className="empty_state_text" >No Data</div>
                                        {/* <img src={defImg} height="210vh"  /> */}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>



                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 individual_card_div'>
                    <div className="card card_custom">
                        <div className="row noMargin card_title">Bookmarked by me</div>
                        <div className="row noMargin custom_card_body">
                            <div className="row noMargin noPadding body_scroll" style={{ "overflow-y": "auto", "scrollbarWidth": "1px", display: "block" }}>
                                {true ? bookmarked.map(items =>
                                    <div class="row noMargin noPadding">
                                        {true ?
                                            <>
                                                <div class="row noMargin noPadding individual_row">
                                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 noPadding noMargin">
                                                        <div className="schedule_img_div">
                                                            <img src={items.image_one} class="schedule_img" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 noPadding noMargin">
                                                        <div className="each_event_right_main">
                                                            <div class="alignSelfCenter">
                                                                <div className="row noMargin text-left" style={{ "paddingRight": "0" }}>
                                                                    <span className="event_title">{items.name}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <div> </div>}
                                    </div>
                                )
                                    :
                                    <div>
                                        <div className="empty_state_text" >No Data</div>
                                        {/* <img src={defImg} height="210vh"  /> */}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}


