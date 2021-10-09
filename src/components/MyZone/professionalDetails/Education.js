
import './work-experience.scss';
import './Education.scss';
import { Chrono } from "react-chrono";
import React, { useState, useEffect, useRef } from "react";

function Education(props) {

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
                                Education
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
                                        BACHELOR OF SCIENCE
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
                                        University of Minnessota -
                                        <span style={{ fontWeight: "500" }}>
                                            Twin Cities, USA
                                        </span>

                                    </div>
                                    <div className='list-itm-prd mt-3'>
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 each_doc_sec">
                                            <div className="docs_container"  >
                                                <div className="doc_img_div">
                                                    <img
                                                        className="doc_image"
                                                        src="/Images/pdfI.svg"
                                                    />
                                                </div>
                                                {/* <img
                                                    className="del_btn"
                                                    // onClick={() => delDoc(item.id)}
                                                    src="/Images/delLog.svg"
                                                /> */}
                                            </div>
                                            <div className="row noMargin noPadding">
                                                <div className="docs_name_container text-center">
                                                    Doc Name.pdf
                                                </div>
                                            </div>
                                        </div>
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
                                        Edit Education
                                    </span>
                                </div>

                                <div className='row  ml-3' >

                                    <div className='col-12 col-sm-6 mt-2'>
                                        <div className='jb-ps-pr'>Your Degree / Course Name</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>University / College / School Name</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12  mt-3'>
                                        <div className='mb-2 jb-ps-pr' >Education Status</div>

                                        <input type="radio" id="education_status" name="fav_language" value="Completed" style={{ marginRight: "15px" }} />
                                        <label for="education_status">Completed</label>
                                        <input type="radio" id="education_status" name="fav_language" value="On-going" style={{ marginRight: "15px", marginLeft: "20px" }} />
                                        <label for="education_status">On-going</label>

                                    </div>


                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Education Start Year</div>
                                        <input type="number" defaultValue='2020' min="1950" max="2099" step="1" style={{ width: "80%" }} />

                                    </div>
                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Completion / Graduaion Year</div>
                                        <input type="number" defaultValue='2020' min="1950" max="2099" step="1" style={{ width: "80%" }} />

                                    </div>
                                    <div className='col-12  mt-3'>
                                        <div className='mb-2 jb-ps-pr' >Education Mode</div>

                                        <input type="radio" id="education-mode" name="education-mode" value="Online" style={{ marginRight: "15px" }} />
                                        <label for="education-mode">Online</label>
                                        <input type="radio" id="education-mode" name="education-mode" value="Offline" style={{ marginRight: "15px", marginLeft: "20px" }} />
                                        <label for="education-mode">Offline</label>

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>University / School / College City</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>University / School / College Country</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-4'>
                                        <div className='jb-ps-pr'>Upload Certificate Document
                                            <button className='re-upload-btn'>Re-Upload</button>
                                            <input
                                                type="file"
                                                // onChange={(e) => updateProfile(e, false)}
                                                class="upload doc_upload_input"
                                            />
                                        </div>
                                        <div className="each_doc_sec" style={{ width: "240px" }} >
                                            <div className="docs_container"  >
                                                <div className="doc_img_div">
                                                    <img
                                                        className="doc_image"
                                                        src="/Images/pdfI.svg"
                                                    />
                                                </div>
                                                {/* <img
                                                    className="del_btn"
                                                    // onClick={() => delDoc(item.id)}
                                                    src="/Images/delLog.svg"
                                                /> */}
                                            </div>
                                            <div className="row noMargin noPadding">
                                                <div className="docs_name_container text-center">
                                                    Doc Name.pdf
                                                </div>
                                            </div>
                                        </div>











                                    </div>
                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Certificate URL</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>




                                    <div className='col-12 col-sm-6 mt-4' >
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
                                        Add Education
                                    </span>
                                </div>

                                <div className='row  ml-3' >

                                    <div className='col-12 col-sm-6 mt-2'>
                                        <div className='jb-ps-pr'>Your Degree / Course Name</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>University / College / School Name</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12  mt-3'>
                                        <div className='mb-2 jb-ps-pr' >Education Status</div>

                                        <input type="radio" id="education_status" name="fav_language" value="Completed" style={{ marginRight: "15px" }} />
                                        <label for="education_status">Completed</label>
                                        <input type="radio" id="education_status" name="fav_language" value="On-going" style={{ marginRight: "15px", marginLeft: "20px" }} />
                                        <label for="education_status">On-going</label>

                                    </div>


                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Education Start Year</div>
                                        <input type="number" defaultValue='2020' min="1950" max="2099" step="1" style={{ width: "80%" }} />

                                    </div>
                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Completion / Graduaion Year</div>
                                        <input type="number" defaultValue='2020' min="1950" max="2099" step="1" style={{ width: "80%" }} />

                                    </div>
                                    <div className='col-12  mt-3'>
                                        <div className='mb-2 jb-ps-pr' >Education Mode</div>

                                        <input type="radio" id="education-mode" name="education-mode" value="Online" style={{ marginRight: "15px" }} />
                                        <label for="education-mode">Online</label>
                                        <input type="radio" id="education-mode" name="education-mode" value="Offline" style={{ marginRight: "15px", marginLeft: "20px" }} />
                                        <label for="education-mode">Offline</label>

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>University / School / College City</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>University / School / College Country</div>
                                        <input type='text' style={{ width: "80%" }} />

                                    </div>

                                    <div className='col-12 col-sm-6 mt-4'>
                                        <div className='jb-ps-pr'>Upload Certificate Document
                                            <button className='re-upload-btn'>Re-Upload</button>
                                            <input
                                                type="file"
                                                // onChange={(e) => updateProfile(e, false)}
                                                class="upload doc_upload_input"
                                            />
                                        </div>
                                        <div className="each_doc_sec" style={{ width: "240px" }} >
                                            <div className="docs_container"  >
                                                <div className="doc_img_div">
                                                    <img
                                                        className="doc_image"
                                                        src="/Images/pdfI.svg"
                                                    />
                                                </div>
                                                {/* <img
                                                    className="del_btn"
                                                    // onClick={() => delDoc(item.id)}
                                                    src="/Images/delLog.svg"
                                                /> */}
                                            </div>
                                            <div className="row noMargin noPadding">
                                                <div className="docs_name_container text-center">
                                                    Doc Name.pdf
                                                </div>
                                            </div>
                                        </div>











                                    </div>
                                    <div className='col-12 col-sm-6 mt-3'>
                                        <div className='jb-ps-pr'>Certificate URL</div>
                                        <input type='text' style={{ width: "80%" }} />

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









        </div>
    );
}

export default Education;