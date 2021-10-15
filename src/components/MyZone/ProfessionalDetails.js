import React, { useState, useEffect } from "react";
import WorkExperience from "./professionalDetails/WorkExperience";
import Skills from "./professionalDetails/Skills";
import Education from "./professionalDetails/Education";
import axios from "../../Axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();
toast.configure();

function ProfessionalDetails(props) {
  const [activeHead, setActiveHead] = useState("work-experience");
  const [imgPreview, setImgPreview] = useState(null);
  const [imgName, setImgName] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`masters/resume-detail`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        if (res.data && res.data.length > 0) 
        {  
          setData(res.data);
          setImgPreview(res.data[0].resume)
          setImgName(res.data[0].resume.split("/")[res.data[0].resume.split("/").length-1])
        }
          
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateProfile = (e) => {
    e.preventDefault();
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setImgName(e.target.files[0].name);

    const formData = new FormData();
    formData.append("master", cookies.get("id"));
    formData.append("resume", e.target.files[0]);
    console.log(data)
    if(imgPreview===null) {
        axios.post(`masters/resume-create`, formData, {
            headers: {
            Authorization: "Token " + cookies.get("token"),
            },
        })
        .then((res) => {
            console.log(res);
            toast.success("Resume added successfully", {
            position: toast.POSITION.TOP_CENTER,
            setTimeout: 2000,
            });
            // window.location.reload();
        })
        .catch((err) => {
            console.log(err);
            toast.error("Some error occured", {
            position: toast.POSITION.TOP_CENTER,
            setTimeout: 2000,
            });
        });
    }
    else{ 
      axios.put(`masters/resume-update`, formData, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Resume Updated successfully", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
      });
    }
  };

  const delDoc = (id) => {
    axios
      .delete(`masters/resume-delete`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        setImgPreview(null);
        setImgName("");
        setData([])
        toast.error("Successfully deleted", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Some error occurred", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
      });
  };

  return (
    <div>
      <div className="row noMargin noPadding btn_row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noMargin noPadding text-left button_margin_top">
          {activeHead === "work-experience" ? (
            <button
              onClick={() => setActiveHead("work-experience")}
              className="common_btn blue_active"
            >
              Work Experience
            </button>
          ) : (
            <button
              onClick={() => setActiveHead("work-experience")}
              className="common_btn not_active_btn"
            >
              Work Experience
            </button>
          )}

          {activeHead === "skills" ? (
            <button
              onClick={() => setActiveHead("skills")}
              className="common_btn blue_active margin_left_btn"
            >
              Skills
            </button>
          ) : (
            <button
              onClick={() => setActiveHead("skills")}
              className="common_btn not_active_btn margin_left_btn"
            >
              Skills
            </button>
          )}

          {activeHead === "education" ? (
            <button
              onClick={() => setActiveHead("education")}
              className="common_btn blue_active margin_left_btn"
            >
              Education / Certification
            </button>
          ) : (
            <button
              onClick={() => setActiveHead("education")}
              className="common_btn not_active_btn margin_left_btn"
            >
              Education / Certification
            </button>
          )}

          {activeHead === "upload" ? (
            <button
              onClick={() => setActiveHead("upload")}
              className="common_btn blue_active margin_left_btn"
            >
              Upload Resume
            </button>
          ) : (
            <button
              onClick={() => setActiveHead("upload")}
              className="common_btn not_active_btn margin_left_btn"
            >
              Upload Resume
            </button>
          )}
        </div>
      </div>
      {activeHead == "work-experience" ? <WorkExperience /> : <></>}
      {activeHead === "skills" ? <Skills /> : <></>}
      {activeHead === "education" ? <Education /> : <></>}

      {activeHead === "upload" ? (
        <div>
          <div id="timeline-container">
            <div className="row noMargin noPadding mt-0 ">
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
                <button
                  style={{ backgroundColor: "rgb(3, 203, 201)" }}
                  className="blue_active edit_common_btn"
                >
                  Upload
                </button>
                <input
                  type="file"
                  onChange={(e) => updateProfile(e)}
                  class="upload doc_upload_input"
                />
              </div>
              <div className="row ml-3"></div>
              {imgPreview!==null ? 
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 each_doc_sec">
                    <div className="docs_container">
                    <a href={imgPreview} target="_blank">
                        <div className="doc_img_div">
                        <img className="doc_image" src="/Images/pdfI.svg" />
                        </div>
                    </a>
                    <img
                        className="del_btn"
                        onClick={delDoc}
                        src="/Images/delLog.svg"
                    />
                    </div>
                    <div className="row noMargin noPadding">
                    <div className="docs_name_container text-center">
                        {imgName}
                    </div>
                    </div>
                </div>
                :
                <></>
                }
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfessionalDetails;
