
import './Skills.scss';
import { Chrono } from "react-chrono";
import React, { useState, useEffect, useRef } from "react";

function Skills(props) {

    const [workExpEdit, setWorkExpEdit] = useState(false);
    const [addAnother, setAddAnother] = useState(false);
    const [projectEdit, setProjectEdit] = useState(false);
    console.log("AADD")

    const items = [{
        title: "May 1940",
        cardTitle: "Dunkirk",
        cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to..",
        cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    },];

    return (
        <div>







            {!projectEdit ?
                <div id="timeline-container">
                    <div className="row noMargin noPadding">
                        <div className="col-6 noPadding noMargin text-left">
                            <span
                                className="work_experience_head noPadding"
                                style={{ color: "#03CBC9", marginLeft: "5vw", fontWeight: "700" }}
                            >
                                Skills / Strengths
                            </span>
                        </div>
                        <div className="col-6 noPadding text-right">
                            <img
                                className="edit_img"
                                src="/Images/editP.svg"
                                onClick={() => setProjectEdit(true)}
                                style={{ cursor: "pointer", marginRight: "72px" }}
                            />
                        </div>



                        <div className="row mt-3" style={{ marginLeft: "4vw" }}>
                            <div className='col-12 col-sm-6 mt-3'>
                                <div className='jb-ps-pr' >Form Expertise</div>
                                <input type='range' value='50' readOnly style={{ borderRadius: "20px", height: "20px", marginTop: '10px', width: "80%" }} />
                            </div>

                            <div className='col-12 col-sm-6 mt-3'>
                                <div className='jb-ps-pr' >Breathing Techniques</div>
                                <input type='range' value='80' readOnly style={{ borderRadius: "20px", height: "20px", marginTop: '10px', width: "80%" }} />
                            </div>

                            <div className='col-12 col-sm-6 mt-3'>
                                <div className='jb-ps-pr' >CPR, First Aid</div>
                                <input type='range' value='35' readOnly style={{ borderRadius: "20px", height: "20px", marginTop: '10px', width: "80%" }} />
                            </div>

                            <div className='col-12 col-sm-6 mt-3'>
                                <div className='jb-ps-pr' >Program Department</div>
                                <input type='range' value='90' readOnly style={{ borderRadius: "20px", height: "20px", marginTop: '10px', width: "80%" }} />
                            </div>

                        </div>


                    </div>
                </div>
                :
                <div>
                    <div id="timeline-container">
                        <div className="row noMargin noPadding mt-0 " >
                            <div className="col-12 mb-3 ml-4 ">
                                <span
                                    className="work_experience_head noPadding"
                                    style={{ color: "#03CBC9", fontWeight: "700" }}
                                >
                                    Edit Skills / Strengths
                                </span>
                            </div>


                            <div className='row  ml-3' >


                                <div className='col-12 col-sm-6 mt-3'>
                                    <div className='jb-ps-pr'>1. Skill / Strength Name</div>
                                    <input type='text' style={{ width: "80%" }} />
                                </div>
                                <div className='col-12 col-sm-6 mt-3'>
                                    <div className='jb-ps-pr'>Skill / Strength Level
                                        <span style={{ fontWeight: '500' }} >  (Out of 10) </span>
                                    </div>
                                    <input type="number" defaultValue='5' min="1" max="10" step="0.5" style={{ width: "80%" }} />
                                </div>

                                
                                <div className='col-12 col-sm-6 mt-3'>
                                    <div className='jb-ps-pr'>2. Skill / Strength Name</div>
                                    <input type='text' style={{ width: "80%" }} />
                                </div>
                                <div className='col-12 col-sm-6 mt-3'>
                                    <div className='jb-ps-pr'>Skill / Strength Level
                                        <span style={{ fontWeight: '500' }} >  (Out of 10) </span>
                                    </div>
                                    <input type="number" defaultValue='5' min="1" max="10" step="0.5" style={{ width: "80%" }} />
                                    
                                </div>

                               



                                <div className='col-11  mt-3' >
                                    <button className='btn-up-prd' >
                                        Update
                                    </button>
                                    <button className='btn-cn-prd' onClick={() => setProjectEdit(false)} >
                                        Cancel
                                    </button>
                                    <span style={{float:"right"}} >
                                    <button  className='btn-ad-an-prd'>Add Another
                                    <img src='/Images/wh-blue.svg' style={{ height: "2vh", marginLeft: "10px" }} />
                                    </button>
                                </span>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>

            }
        </div>
    );
}

export default Skills;