
import './work-experience.scss';
import { Chrono } from "react-chrono";
import React, { useState, useEffect, useRef } from "react";

function WorkExperience(props) {

    const [workExpEdit, setWorkExpEdit] = useState(false);
    const [addAnother, setAddAnother] = useState(false);
    const [projectEdit, setProjectEdit] = useState(false);

    const items = [{
        title: "May 1940",
        cardTitle: "Dunkirk",
        cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to..",
        cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    },];

    return (
        <div>
            {!workExpEdit && !addAnother ?
                <div id="timeline-container">
                    <div className="row noMargin noPadding">
                        <div className="col-6 noPadding noMargin text-left">
                            <span
                                className="work_experience_head noPadding"
                                style={{ color: "#03CBC9", marginLeft: "5vw", fontWeight: "700" }}
                            >
                                Work Experience
                            </span>
                        </div>
                        <div className="col-6 noPadding text-right">
                            <button onClick={() => setAddAnother(true)} className='btn-ad-an-prd' style={{ cursor: "pointer", marginRight: "40px" }}>

                                Add Another
                                <img src='/Images/wh-blue.svg' style={{ height: "2vh", marginLeft: "10px" }} />
                            </button>
                        </div>

                        <div className="timeline">
                            <div className="row " style={{ marginLeft: "4vw" }}>
                                <div className="col-2 col-sm-1">
                                    <span className="timeline-data row">2019</span>
                                    <span className="timeline-data row">Current</span>
                                </div>
                                <div className='col-2 col-sm-1' style={{ marginTop: "0" }} >
                                    <div>
                                        <img src='/Images/Ellipse 26.svg' style={{ height: "2.5vh" }} />
                                    </div>
                                </div>
                                <div className='col-12 col-sm-10'>
                                    <div className='hd-pr'>
                                        YOGA INSTRUCTOR
                                        <span style={{ float: "right" }}>
                                            <img
                                                className="edit_img"
                                                src="/Images/editP.svg"
                                                onClick={() => setWorkExpEdit(true)}
                                                style={{ cursor: "pointer", marginRight: "40px" }}
                                            />
                                        </span>
                                    </div>
                                    <div className='sub-hd-pr mt-2'>
                                        Yoga Unidos Studio -
                                        <span style={{ fontWeight: "500" }}>
                                            Banglore, India
                                        </span>

                                    </div>
                                    <div className='list-itm-prd mt-3'>
                                        <ul>
                                            <li>
                                                Explain dwndw djwnjdnw djabsxdh dwhbdhwdh dhbasbdwd wdbjwbdjw.
                                            </li>
                                            <li>
                                                Explain dwndw djwnjdnw djabsxdh dwhbdhwdh dhbasbdwd wdbjwbdjw.
                                            </li>
                                            <li>
                                                Explain dwndw djwnjdnw djabsxdh dwhbdhwdh dhbasbdwd wdbjwbdjw.
                                            </li>
                                        </ul>
                                    </div>

                                </div>





                            </div>


                            <div className="row " style={{ marginLeft: "4vw" }}>
                                <div className="col-2 col-sm-1">
                                    <span className="timeline-data row">2019</span>
                                    <span className="timeline-data row">Current</span>
                                </div>
                                <div className='col-2 col-sm-1' style={{ marginTop: "0" }} >
                                    <div>
                                        <img src='/Images/Ellipse 26.svg' style={{ height: "2.5vh" }} />
                                    </div>
                                </div>
                                <div className='col-12 col-sm-10'>
                                    <div className='hd-pr'>
                                        YOGA INSTRUCTOR
                                        <span style={{ float: "right" }}>
                                            <img
                                                className="edit_img"
                                                src="/Images/editP.svg"
                                                onClick={() => setWorkExpEdit(true)}
                                                style={{ cursor: "pointer", marginRight: "40px" }}
                                            />
                                        </span>
                                    </div>
                                    <div className='sub-hd-pr mt-2'>
                                        Yoga Unidos Studio -
                                        <span style={{ fontWeight: "500" }}>
                                            Banglore, India
                                        </span>

                                    </div>
                                    <div className='list-itm-prd mt-3'>
                                        <ul>
                                            <li>
                                                Explain dwndw djwnjdnw djabsxdh dwhbdhwdh dhbasbdwd wdbjwbdjw.
                                            </li>
                                            <li>
                                                Explain dwndw djwnjdnw djabsxdh dwhbdhwdh dhbasbdwd wdbjwbdjw.
                                            </li>
                                            <li>
                                                Explain dwndw djwnjdnw djabsxdh dwhbdhwdh dhbasbdwd wdbjwbdjw.
                                            </li>
                                        </ul>
                                    </div>

                                </div>





                            </div>

                        </div>





                    </div>
                </div>
                : workExpEdit ?
                    <div>
                        <div id="timeline-container">
                            <div className="row noMargin noPadding mt-0 " >
                                <div className="col-12 mb-3 ml-4 ">
                                    <span
                                        className="work_experience_head noPadding"
                                        style={{ color: "#03CBC9", fontWeight: "700" }}
                                    >
                                        Edit Work Experience
                                    </span>
                                </div>

                                <div className='row  ml-3' >

                                    <div className='col-12 col-sm-6 mt-2'>
                                        <div className='jb-ps-pr'>Job Position</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Company Name</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>


                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>City</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>
                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Country</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>
                                    <div className='col-12  mt-3'>
                                        <div className='mb-2 jb-ps-pr' >Job Status</div>

                                        <input type="radio" id="html" name="fav_language" value="HTML" style={{ marginRight: "15px" }} />
                                        <label for="html">Completed</label>
                                        <input type="radio" id="html" name="fav_language" value="HTML" style={{ marginRight: "15px", marginLeft: "20px" }} />
                                        <label for="html">On-going</label>

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Job Start Year</div>
                                        <input type="number" defaultValue='2020' min="1900" max="2099" step="1" style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Job End Year</div>
                                        <input type="number" defaultValue='2020' min="1900" max="2099" step="1" style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 mt-3'>
                                        <div className='jb-ps-pr'>Job Responsibilities</div>
                                        <textarea type="textarea" style={{ width: "91%", minHeight: "100px" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3' >
                                        <button className='btn-up-prd' >
                                            Update
                                        </button>

                                        <button className='btn-cn-prd' onClick={() => setWorkExpEdit(false)} >
                                            Cancel
                                        </button>

                                    </div>
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
                                        Add Work Experience
                                    </span>
                                </div>

                                <div className='row  ml-3' >

                                    <div className='col-12 col-sm-6 mt-2'>
                                        <div className='jb-ps-pr'>Job Position</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Company Name</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>


                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>City</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>
                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Country</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>
                                    <div className='col-12  mt-3'>
                                        <div className='mb-2 jb-ps-pr' >Job Status</div>

                                        <input type="radio" id="html" name="fav_language" value="HTML" style={{ marginRight: "15px" }} />
                                        <label for="html">Completed</label>
                                        <input type="radio" id="html" name="fav_language" value="HTML" style={{ marginRight: "15px", marginLeft: "20px" }} />
                                        <label for="html">On-going</label>

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Job Start Year</div>
                                        <input type="number" defaultValue='2020' min="1900" max="2099" step="1" style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Job End Year</div>
                                        <input type="number" defaultValue='2020' min="1900" max="2099" step="1" style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 mt-3'>
                                        <div className='jb-ps-pr'>Job Responsibilities</div>
                                        <textarea type="textarea" style={{ width: "91%", minHeight: "100px" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3' >
                                        <button className='btn-up-prd' >
                                            Save 
                                        </button>

                                        <button className='btn-cn-prd' onClick={() => setAddAnother(false)} >
                                            Cancel
                                        </button>

                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>

            }






            {!projectEdit ?
                <div id="timeline-container">
                    <div className="row noMargin noPadding">
                        <div className="col-6 noPadding noMargin text-left">
                            <span
                                className="work_experience_head noPadding"
                                style={{ color: "#03CBC9", marginLeft: "5vw", fontWeight: "700" }}
                            >
                                Projects & Activities
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
                            <div className="col-2 col-sm-1">
                                <span className="timeline-data row">2019</span>
                                {/* <span className="timeline-data row">Current</span> */}
                            </div>
                            <div className='col-2 col-sm-1' style={{ marginTop: "0" }} >
                                <div>
                                    <img src='/Images/Ellipse 26.svg' style={{ height: "2.5vh" }} />
                                </div>
                            </div>
                            <div className='col-12 col-sm-10'>
                                <div className='hd-pr'>
                                    Performed a Tedx talk at IIT Banglore = The Science of Yogic Breathing
                                    <span style={{ float: "right" }}>

                                    </span>
                                </div>
                                <div className='sub-hd-pr mt-2'>
                                    <a href='https://www.youtube.com/watch?v=aIfwbEvXtwo' >
                                        <u>
                                            https://www.youtube.com/watch?v=aIfwbEvXtwo
                                        </u>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4" style={{ marginLeft: "4vw" }}>
                            <div className="col-2 col-sm-1">
                                <span className="timeline-data row">2019</span>
                                {/* <span className="timeline-data row">Current</span> */}
                            </div>
                            <div className='col-2 col-sm-1' style={{ marginTop: "0" }} >
                                <div>
                                    <img src='/Images/Ellipse 26.svg' style={{ height: "2.5vh" }} />
                                </div>
                            </div>
                            <div className='col-12 col-sm-10'>
                                <div className='hd-pr'>
                                    Performed a Tedx talk at IIT Banglore = The Science of Yogic Breathing
                                    <span style={{ float: "right" }}>

                                    </span>
                                </div>
                                <div className='sub-hd-pr mt-2'>
                                    <a href='https://www.youtube.com/watch?v=aIfwbEvXtwo' >
                                        <u>
                                            https://www.youtube.com/watch?v=aIfwbEvXtwo
                                        </u>
                                    </a>
                                </div>
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
                                Edit Project & Activities
                            </span>
                        </div>

                        <div className='row  ml-3' >

                            <div className='col-12 col-sm-6 mt-2'>
                                <div className='jb-ps-pr'>First Project / Activity Table</div>
                                <input type='text' style={{ width: "80%" }} />

                            </div>

                            <div className='col-12 col-sm-6 mt-3'>
                                <div className='jb-ps-pr'>Year Created / Performed</div>
                                <input type="number" defaultValue='2020' min="1900" max="2099" step="1" style={{ width: "80%" }} />

                            </div>


                            <div className='col-12  mt-3'>
                                <div className='jb-ps-pr'>Project / Activity URL </div>
                                <input type='text' style={{ width: "39%" }} />
                            </div>
                            <div className='col-12 col-sm-6 mt-3' >
                                <button className='btn-up-prd' >
                                    Update
                                </button>

                                <button className='btn-cn-prd' onClick={() => setProjectEdit(false)} >
                                    Cancel
                                </button>
                            </div>
                        </div>




                    </div>
                </div>
            </div>

                }
        </div>
    );
}

export default WorkExperience;