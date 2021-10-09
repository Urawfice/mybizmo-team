import React, { useState } from 'react';
import WorkExperience from './professionalDetails/WorkExperience';
import Skills from './professionalDetails/Skills';
import Education from './professionalDetails/Education'

function ProfessionalDetails(props) {
    const [activeHead, setActiveHead] = useState('work-experience');

    return (
        <div>
            <div className="row noMargin noPadding btn_row" >
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noMargin noPadding text-left button_margin_top" >
                    {activeHead === 'work-experience' ?
                        <button onClick={() => setActiveHead('work-experience')} className="common_btn blue_active">Work Experience</button>
                        :
                        <button onClick={() => setActiveHead('work-experience')} className="common_btn not_active_btn">Work Experience</button>}

                    {activeHead === 'skills' ?
                        <button onClick={() => setActiveHead('skills')} className="common_btn blue_active margin_left_btn">Skills</button>
                        :
                        <button onClick={() => setActiveHead('skills')} className="common_btn not_active_btn margin_left_btn">Skills</button>}

                    {activeHead === 'education' ?
                        <button onClick={() => setActiveHead('education')} className="common_btn blue_active margin_left_btn">Education / Certification</button>
                        :
                        <button onClick={() => setActiveHead('education')} className="common_btn not_active_btn margin_left_btn">Education / Certification</button>}

                    {activeHead === 'upload' ?
                        <button onClick={() => setActiveHead('upload')} className="common_btn blue_active margin_left_btn">Upload Resume</button>
                        :
                        <button onClick={() => setActiveHead('upload')} className="common_btn not_active_btn margin_left_btn">Upload Resume</button>}
                </div>
            </div>
            {activeHead == "work-experience" ? <WorkExperience /> : <></>}
            {activeHead === 'skills' ? <Skills /> : <></>}
            {activeHead === 'education' ? <Education /> : <></>}

            {activeHead === 'upload' ?
                <div>
                    <div id="timeline-container">
                        <div className="row noMargin noPadding mt-0 " >
                            <div className="col-6 mb-3  ">
                                <span
                                    className="work_experience_head noPadding"
                                    style={{ color: "#03CBC9", fontWeight: "700" }}
                                >
                                    Resume
                                </span>

                            </div>
                            <div
                                className="col-6  text-right"
                                style={{ position: "relative" }}
                            >
                                <button style={{ backgroundColor: "rgb(3, 203, 201)" }} className="blue_active edit_common_btn">Upload</button>
                                <input
                                    type="file"
                                    // onChange={(e) => updateProfile(e, true)}
                                    class="upload doc_upload_input"
                                />
                            </div>

                            <div className='row  ml-3' >
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 each_doc_sec">
                        <div className="docs_container">
                            <div className="doc_img_div">
                                <img
                                    className="doc_image"
                                    src="/Images/pdfI.svg"
                                />
                            </div>
                            <img
                                className="del_btn"
                                //   onClick={() => delDoc(item.id)}
                                src="/Images/delLog.svg"
                            />
                        </div>
                        <div className="row noMargin noPadding">
                            <div className="docs_name_container text-center">
                                Doc name.pdf
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>
                   
                    
                    
                    
                </div>
                : <></>

            }




        </div>
    );
}

export default ProfessionalDetails;