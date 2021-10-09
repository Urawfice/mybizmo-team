import "./work-experience.scss";
import React, { useState, useEffect } from "react";
import axios from "../../../Axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();
toast.configure();

function WorkExperience(props) {
  const [workExpEdit, setWorkExpEdit] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const [projectEdit, setProjectEdit] = useState(false);
  const [projectAdd, setProjectAdd] = useState(false);
  const [workExperience, setWorkExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [jobPosition, setJobPosition] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  useEffect(() => {
    axios.get("masters/work-experiences", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        setWorkExperience(res.data);
      })
      .catch((err) => {
        console.log("some error");
      });
    
      axios.get("masters/project-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log("some error");
      });

  }, []);
  const items = [
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
  ];

  const saveWorkExperience = () => {
    let is_current = false;
    let end_year = endYear;
    if (jobStatus == "ongoing") is_current = true;
    if (is_current) end_year = "";
    const data = {
      master: cookies.get("id"),
      start_year: startYear,
      end_year: end_year,
      company_name: companyName,
      job_position: jobPosition,
      country: country,
      city: city,
      detail: responsibilities,
      is_current: is_current,
    };
    axios
      .post("masters/work-experiences", data, {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("added", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
      })
      .catch((err) => {
        toast.error("server error", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
      });
  };
  return (
    <div>
      {!workExpEdit && !addAnother ? (
        <div id="timeline-container">
          <div className="row noMargin noPadding">
            <div className="col-6 noPadding noMargin text-left">
              <span
                className="work_experience_head noPadding"
                style={{
                  color: "#03CBC9",
                  marginLeft: "5vw",
                  fontWeight: "700",
                }}
              >
                Work Experience
              </span>
            </div>
            <div className="col-6 noPadding text-right">
              <button
                onClick={() => setAddAnother(true)}
                className="btn-ad-an-prd"
                style={{ cursor: "pointer", marginRight: "40px" }}
              >
                {workExperience.length>0 ? 
                <>
                Add Another
                </>
                :
                <>
                Add Work Experience
                </>
                }

                <img
                  src="/Images/wh-blue.svg"
                  style={{ height: "2vh", marginLeft: "10px" }}
                />
              </button>
            </div>

            <div className="timeline">
                {workExperience.length>0 && workExperience.map(item => 
                <div style={{marginBottom:"30px"}}>
                <div className="row" style={{ marginLeft: "4vw" }}>
                    <div className="col-2 col-sm-1">
                    <span className="timeline-data row">{item.start_year}</span>
                    <span className="timeline-data row">{item.is_current ? "Current": item.end_year}</span>
                    </div>
                    <div className="col-2 col-sm-1" style={{ marginTop: "0" }}>
                    <div>
                        <img
                        src="/Images/Ellipse 26.svg"
                        style={{ height: "2.5vh" }}
                        />
                    </div>
                    </div>
                    <div className="col-12 col-sm-10">
                    <div className="hd-pr">
                        {item.job_position}
                        <span style={{ float: "right" }}>
                        <img
                            className="edit_img"
                            src="/Images/editP.svg"
                            onClick={() => setWorkExpEdit(true)}
                            style={{ cursor: "pointer", marginRight: "40px" }}
                        />
                        </span>
                    </div>
                    <div className="sub-hd-pr mt-2">
                        {item.company_name} -
                        <span style={{ fontWeight: "500" }}>{item.city}, {item.country}</span>
                    </div>
                    <div className="list-itm-prd mt-3">
                        {item.detail}
                    </div>
                    </div>
                </div>
                </div>
                )}         
            </div>
          </div>
        </div>
      ) : workExpEdit ? (
        <div>
          <div id="timeline-container">
            <div className="row noMargin noPadding mt-0 ">
              <div className="col-12 mb-3 ml-4 ">
                <span
                  className="work_experience_head noPadding"
                  style={{ color: "#03CBC9", fontWeight: "700" }}
                >
                  Edit Work Experience
                </span>
              </div>

              <div className="row  ml-3">
                <div className="col-12 col-sm-6 mt-2">
                  <div className="jb-ps-pr">Job Position</div>
                  <input type="text" style={{ width: "80%" }} />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Company Name</div>
                  <input type="text" style={{ width: "80%" }} />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">City</div>
                  <input type="text" style={{ width: "80%" }} />
                </div>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Country</div>
                  <input type="text" style={{ width: "80%" }} />
                </div>
                <div className="col-12  mt-3">
                  <div className="mb-2 jb-ps-pr">Job Status</div>

                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                    style={{ marginRight: "15px" }}
                  />
                  <label for="html">Completed</label>
                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                    style={{ marginRight: "15px", marginLeft: "20px" }}
                  />
                  <label for="html">On-going</label>
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Job Start Year</div>
                  <input
                    type="number"
                    defaultValue="2020"
                    min="1900"
                    max="2099"
                    step="1"
                    style={{ width: "80%" }}
                  />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Job End Year</div>
                  <input
                    type="number"
                    defaultValue="2020"
                    min="1900"
                    max="2099"
                    step="1"
                    style={{ width: "80%" }}
                  />
                </div>

                <div className="col-12 mt-3">
                  <div className="jb-ps-pr">Job Responsibilities</div>
                  <textarea
                    type="textarea"
                    style={{ width: "91%", minHeight: "100px" }}
                  />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <button className="btn-up-prd">Update</button>

                  <button
                    className="btn-cn-prd"
                    onClick={() => setWorkExpEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div id="timeline-container">
            <div className="row noMargin noPadding mt-0 ">
              <div className="col-12 mb-3 ml-4 ">
                <span
                  className="work_experience_head noPadding"
                  style={{ color: "#03CBC9", fontWeight: "700" }}
                >
                  Add Work Experience
                </span>
              </div>

              <div className="row  ml-3">
                <div className="col-12 col-sm-6 mt-2">
                  <div className="jb-ps-pr">Job Position</div>
                  <input
                    className="inpt-add-expr"
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    placeholder="Enter your job role / position"
                    type="text"
                    style={{ width: "80%" }}
                  />
                </div>

                <div className="col-12 col-sm-6 mt-2">
                  <div className="jb-ps-pr">Company Name</div>
                  <input
                    className="inpt-add-expr"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter the name of your company of work"
                    type="text"
                    style={{ width: "80%" }}
                  />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">City</div>
                  <input
                    className="inpt-add-expr"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your work city"
                    type="text"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Country</div>
                  <input
                    className="inpt-add-expr"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Please select your work country"
                    type="text"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="col-12  mt-3">
                  <div className="mb-2 jb-ps-pr">Job Status</div>
                  <input
                    className="inpt-add-expr"
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="completed"
                    onChange={(e) => setJobStatus(e.target.value)}
                    style={{ marginRight: "15px" }}
                  />
                  <label for="html">Completed</label>
                  <input
                    className="inpt-add-expr"
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="ongoing"
                    onChange={(e) => setJobStatus(e.target.value)}
                    style={{ marginRight: "15px", marginLeft: "20px" }}
                  />
                  <label for="html">On-going</label>
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Job Start Year</div>
                  <input
                    className="inpt-add-expr"
                    type="number"
                    defaultValue=""
                    min="1900"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    max="2099"
                    step="1"
                    style={{ width: "80%" }}
                  />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Job End Year</div>
                  {jobStatus !== "ongoing" ? (
                    <input
                      className="inpt-add-expr"
                      type="number"
                      defaultValue=""
                      min="1900"
                      value={endYear}
                      onChange={(e) => setEndYear(e.target.value)}
                      max="2099"
                      step="1"
                      style={{ width: "80%" }}
                    />
                  ) : (
                    <input
                      className="inpt-add-expr"
                      type="text"
                      value="current"
                      disabled
                      style={{ width: "80%" }}
                    />
                  )}
                </div>

                <div className="col-12 mt-3">
                  <div className="jb-ps-pr">Job Responsibilities</div>
                  <textarea
                    type="textarea"
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    placeholder="Please enter your job responsibilities"
                    style={{ width: "91%", minHeight: "100px" }}
                  />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <button className="btn-up-prd" onClick={saveWorkExperience}>
                    Save
                  </button>
                  <button
                    className="btn-cn-prd"
                    onClick={() => setAddAnother(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!projectEdit && !projectAdd ? (
        <div id="timeline-container">
          <div className="row noMargin noPadding">
            <div className="col-6 noPadding noMargin text-left">
              <span
                className="work_experience_head noPadding"
                style={{
                  color: "#03CBC9",
                  marginLeft: "5vw",
                  fontWeight: "700",
                }}
              >
                Projects & Activities
              </span>
            </div>
            <div className="col-6 noPadding text-right">
              <button
                onClick={() => setProjectAdd(true)}
                className="btn-ad-an-prd"
                style={{ cursor: "pointer", marginRight: "40px" }}
              >
                {projects.length>0 ? 
                <>
                Add Another
                </>
                :
                <>
                Add Projects / Activities
                </>
                }
                <img
                  src="/Images/wh-blue.svg"
                  style={{ height: "2vh", marginLeft: "10px" }}
                />
              </button>
            </div>
            
            {projects.length>0 && projects.map(item => 
            <div className="row mt-3" style={{ marginLeft: "4vw", paddingTop: "40px" }}>
              <div className="col-2 col-sm-1">
                <span className="timeline-data row">{item.year}</span>
              </div>
              <div className="col-2 col-sm-1" style={{ marginTop: "0" }}>
                <div>
                  <img
                    src="/Images/Ellipse 26.svg"
                    style={{ height: "2.5vh" }}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-10">
                <div className="hd-pr">
                    {item.title}                                    
                    <span style={{ float: "right" }}>
                        <img
                            className="edit_img"
                            src="/Images/editP.svg"
                            onClick={() => setProjectEdit(true)}
                            style={{ cursor: "pointer", marginRight: "80px" }}
                        />
                    </span>
                </div>
                <div className="sub-hd-pr mt-2">
                  <a href={item.link} target="_blank">
                    <u>{item.link}</u>
                  </a>
                </div>
              </div>
            </div>
            )}     
          </div>
        </div>
      ) : projectAdd ? (
        <div>
          <div id="timeline-container">
            <div className="row noMargin noPadding mt-0 ">
              <div className="col-12 mb-3 ml-4 ">
                <span
                  className="work_experience_head noPadding"
                  style={{ color: "#03CBC9", fontWeight: "700" }}
                >
                  Add Project & Activities
                </span>                
              </div>

              <div className="row  ml-3">
                <div className="col-12 col-sm-6 mt-2">
                  <div className="jb-ps-pr">First Project / Activity Table</div>
                  <input type="text" style={{ width: "80%" }} />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Year Created / Performed</div>
                  <input
                    type="number"
                    defaultValue="2020"
                    min="1900"
                    max="2099"
                    step="1"
                    style={{ width: "80%" }}
                  />
                </div>

                <div className="col-12  mt-3">
                  <div className="jb-ps-pr">Project / Activity URL </div>
                  <input type="text" style={{ width: "39%" }} />
                </div>
                <div className="col-12 col-sm-6 mt-3">
                  <button className="btn-up-prd">Add</button>

                  <button
                    className="btn-cn-prd"
                    onClick={() => setProjectAdd(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div id="timeline-container">
            <div className="row noMargin noPadding mt-0 ">
              <div className="col-12 mb-3 ml-4 ">
                <span
                  className="work_experience_head noPadding"
                  style={{ color: "#03CBC9", fontWeight: "700" }}
                >
                  Edit Project & Activities
                </span>                
              </div>

              <div className="row  ml-3">
                <div className="col-12 col-sm-6 mt-2">
                  <div className="jb-ps-pr">First Project / Activity Table</div>
                  <input type="text" style={{ width: "80%" }} />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Year Created / Performed</div>
                  <input
                    type="number"
                    defaultValue="2020"
                    min="1900"
                    max="2099"
                    step="1"
                    style={{ width: "80%" }}
                  />
                </div>

                <div className="col-12  mt-3">
                  <div className="jb-ps-pr">Project / Activity URL </div>
                  <input type="text" style={{ width: "39%" }} />
                </div>
                <div className="col-12 col-sm-6 mt-3">
                  <button className="btn-up-prd">Update</button>

                  <button
                    className="btn-cn-prd"
                    onClick={() => setProjectEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkExperience;
