import React from 'react';
import './work-experience.scss';
import { Chrono } from "react-chrono";

function WorkExperience(props) {
    const items = [{
        title: "May 1940",
        cardTitle: "Dunkirk",
        cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
        cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    },];

    return (
        <div>
            <div id="timeline-container">
                <div className="row noMargin noPadding">
                    <div className="col-6 noPadding noMargin text-left">
                        <span
                        className="work_experience_head noPadding"
                        style={{ color: "#03CBC9", marginLeft:"5vw", fontWeight:"700" }}
                        >
                        Work Experience
                        </span>
                    </div>                
                    <div className="col-6 noPadding text-right">
                        <img
                            className="edit_img"
                            src="/Images/editP.svg"
                            // onClick={() => setIsPublicProfileEdit(true)}
                            style={{ cursor: "pointer", marginRight:"40px" }}
                        />
                    </div>
                    <div >
                        <Chrono
                        items={items}
                        mode="VERTICAL"
                        />
                    </div>
                    {/* <div className="timeline">
                        <div className="row col-sm-12 col-md-12 col-xl-12" style={{marginLeft:"4vw"}}>
                            <div className="col-sm-1 col-md-1">
                                <span className="timeline-data row">2019</span>
                                <span className="timeline-data row">Current</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default WorkExperience;