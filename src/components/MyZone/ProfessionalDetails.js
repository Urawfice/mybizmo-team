import React, {useState} from 'react';
import WorkExperience from './professionalDetails/WorkExperience';

function ProfessionalDetails(props) {
    const [activeHead,setActiveHead] = useState('work-experience');

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
            {activeHead=="work-experience" ? <WorkExperience /> : <></>}
        </div>
    );
}

export default ProfessionalDetails;