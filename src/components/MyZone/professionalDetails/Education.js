import React, { useState, useEffect } from "react";
import "./work-experience.scss";
import "./Education.scss";
import axios from "../../../Axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();
toast.configure();

function Education(props) {
  const [workExpEdit, setWorkExpEdit] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const [projectEdit, setProjectEdit] = useState(false);
  const [data, setData] = useState([]);
  const [imgName, setImgName] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [updateCert, setUpdateCert] = useState(null);
  const [certName, setCertName] = useState('');
  const [education, setEducation] = React.useState({
    master: cookies.get("id"),
    title: "",
    institution: "",
    city: "",
    country: "",
    start_year: "",
    end_year: "",
    certificate: null,
    certificate_link: "",
    is_certificate: "",
    status:"",
    mode:""
  });
  const [updateEducation, setUpdateEducation] = React.useState({
    master: cookies.get("id"),
    title: "",
    institution: "",
    city: "",
    country: "",
    start_year: "",
    end_year: "",
    certificate_preview: null,
    certificate_link: "",
    is_certificate: "",
    status:"",
    mode:""
  });

  useEffect(() => {
    axios
      .get("masters/education-list", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("some error",err);
      });
  }, []);

    const UploadCertificate = (e) => {
        e.preventDefault();
        console.log(e.target.files[0].name);
        setEducation({...education, certificate:e.target.files[0]})
        setImgName(e.target.files[0].name)
        setImgPreview(URL.createObjectURL(e.target.files[0]))
    }

    const UpdateCertificate = (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        setUpdateEducation({...updateEducation, certificate:e.target.files[0]})
        setUpdateCert(e.target.files[0])
        setCertName(e.target.files[0].name)
        // setUpdateEducation({...updateEducation, certificate_name:e.target.files[0].name})
        setUpdateEducation({...updateEducation, certificate_preview:URL.createObjectURL(e.target.files[0])})
    }

  const AddEducation = (e) => {
    e.preventDefault();
    console.log(education);
    const formData = new FormData();
    formData.append("master", cookies.get('id'));
    formData.append("title", education.title);
    formData.append("institution", education.institution);
    formData.append("city", education.city);
    formData.append("country", education.country);
    formData.append("start_year", education.start_year);
    formData.append("end_year", education.end_year);
    formData.append("certificate", education.certificate);
    formData.append("certificate_link", education.certificate_link);
    formData.append("is_certificate",true);
    formData.append("end_year", education.end_year);
    axios
      .post(`masters/education-create`, formData, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Education added successfully", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occured", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
    });
  }

  const fetchUpdateData = (e,id) => {
    e.preventDefault();
    setWorkExpEdit(true)    
    axios.get(`masters/education-detail/${id}`, {
      headers: {
        Authorization: "Token" + " " + cookies.get("token"),
      },
    })
    .then((res) => {
      setUpdateEducation({
        id: res.data.id,
        title: res.data.title,
        institution: res.data.institution,
        city: res.data.city,
        country: res.data.country,
        start_year: res.data.start_year,
        end_year: res.data.end_year,
        certificate: null,
        certificate_preview: res.data.certificate,
        certificate_link: res.data.certificate_link,
      })
      setCertName(res.data.certificate.split("/")[res.data.certificate.split("/").length-1])
    })
    .catch((err) => {
      console.log("some error");
    });
  }

  const UpdateEducation = () => {
    
    const formData = new FormData();
    formData.append("master", cookies.get('id'));
    formData.append("title", updateEducation.title);
    formData.append("institution", updateEducation.institution);
    formData.append("city", updateEducation.city);
    formData.append("country", updateEducation.country);
    formData.append("start_year", updateEducation.start_year);
    formData.append("end_year", updateEducation.end_year);
    // if(updateEducation.certificate!=null)
    formData.append("certificate", updateCert);
    formData.append("certificate_link", updateEducation.certificate_link);
    formData.append("is_certificate",true);
    formData.append("end_year", updateEducation.end_year);

    axios
      .put(`masters/education-update/${updateEducation.id}`, formData, {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Education Updated successfully", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });        
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error("server error", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
      });
  }

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
                Education
              </span>
            </div>
            <div className="col-6 noPadding text-right">
              <button
                onClick={() => setAddAnother(true)}
                className="btn-ad-an-prd"
                style={{ cursor: "pointer", marginRight: "40px" }}
              >
                Add Another
                <img
                  src="/Images/wh-blue.svg"
                  style={{ height: "2vh", marginLeft: "10px" }}
                />
              </button>
            </div>

            <div className="timeline">
              {data.length > 0 &&
                data.map((item) => (
                  <div className="row" style={{ marginLeft: "4vw", marginBottom:"3rem" }}>
                    <div className="col-2 col-sm-1">
                      <span className="timeline-data row">{item.start_year}</span>
                      <span className="timeline-data row">{item.end_year}</span>
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
                            onClick={(e) => fetchUpdateData(e, item.id)}
                            style={{ cursor: "pointer", marginRight: "40px" }}
                          />
                        </span>
                      </div>
                      <div className="sub-hd-pr mt-2">
                        {item.institution} -
                        <span style={{ fontWeight: "500" }}>
                          {item.city}, {item.country}
                        </span>
                      </div>
                      <div className="list-itm-prd mt-3">
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 each_doc_sec">
                          <div className="docs_container">
                            <a href={item.certificate} target="_blank">
                            <div className="doc_img_div">
                              <img
                                className="doc_image"
                                src="/Images/pdfI.svg"
                              />
                            </div>
                            </a>
                            {/* <img
                                                    className="del_btn"
                                                    // onClick={() => delDoc(item.id)}
                                                    src="/Images/delLog.svg"
                                                /> */}
                          </div>
                          <div className="row noMargin noPadding">
                            <div className="docs_name_container text-center">
                              {item.certificate.length>0 ? item.certificate.split('/')[item.certificate.split('/').length-1]: ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                  Edit Education
                </span>
              </div>

              <div className="row  ml-3">
                <div className="col-12 col-sm-6 mt-2">
                  <div className="jb-ps-pr">Your Degree / Course Name</div>
                  <input
                    value={updateEducation.title}
                    onChange={(e) => setUpdateEducation({...updateEducation, title: e.target.value})}
                    className="inpt-add-expr"
                    placeholder="Enter your degree / course name"
                    type="text"
                    style={{ width: "80%" }}
                  />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">
                    University / College / School Name
                  </div>
                  <input
                    value={updateEducation.institution}
                    onChange={(e) => setUpdateEducation({...updateEducation, institution: e.target.value})}
                    placeholder="Enter your university / school / college name"
                    className="inpt-add-expr"
                    type="text"
                    style={{ width: "80%" }}
                  />
                </div>

                <div className="col-12 mt-3">
                  <div className="mb-2 jb-ps-pr">Education Status</div>
                  <input
                    onChange={(e) => setUpdateEducation({...updateEducation, status: e.target.value})}
                    className="inpt-add-expr"
                    type="radio"
                    value="completed"
                    name="fav_language" 
                    style={{ marginRight: "15px" }}
                  />
                  <label for="updateEducation_status">Completed</label>
                  <input
                    onChange={(e) => setUpdateEducation({...updateEducation, status: e.target.value})}
                    className="inpt-add-expr"
                    type="radio"
                    value="ongoing"
                    name="fav_language" 
                    style={{ marginRight: "15px", marginLeft: "20px" }}
                  />
                  <label for="updateEducation_status">On-going</label>
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Education Start Year</div>
                  <input
                    value={updateEducation.start_year}
                    onChange={(e) => setUpdateEducation({...updateEducation, start_year: e.target.value})}
                    className="inpt-add-expr"
                    type="number"   
                    placeholder="Education start year"
                    min="1950"
                    max="2099"
                    step="1"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="col-12 col-sm-6 mt-3">
                {updateEducation.status==="completed" ? 
                    <>
                    <div className="jb-ps-pr">Completion / Graduation Year</div>
                    <input
                        value={updateEducation.end_year}
                        onChange={(e) => setUpdateEducation({...updateEducation, end_year: e.target.value})}
                        className="inpt-add-expr"
                        type="number"
                        placeholder="Education end year"
                        min="1950"
                        max="2099"
                        step="1"
                        style={{ width: "80%" }}
                    />
                    </>
                    :
                    <>
                    <div className="jb-ps-pr">Tentative Completion Year</div>
                    <input
                        value={updateEducation.end_year}
                        onChange={(e) => setUpdateEducation({...updateEducation, end_year: e.target.value})}
                        className="inpt-add-expr"
                        type="number"
                        placeholder="Education end year"
                        min="1950"
                        max="2099"
                        step="1"
                        style={{ width: "80%" }}
                    />
                    </>
                }
                </div>
                <div className="col-12 mt-3">
                  <div className="mb-2 jb-ps-pr">Education Mode</div>
                  <input
                    onChange={(e) => setUpdateEducation({...updateEducation, mode: e.target.value})}
                    className="inpt-add-expr"
                    type="radio"
                    value="online" 
                    name="updateEducation-mode"
                    style={{ marginRight: "15px" }}
                  />
                  <label for="Education-mode">Online</label>
                  <input
                    onChange={(e) => setUpdateEducation({...updateEducation, mode: e.target.value})}
                    className="inpt-add-expr"
                    type="radio"
                    value="offline" 
                    name="updateEducation-mode"
                    style={{ marginRight: "15px", marginLeft: "20px" }}
                  />
                  <label for="updateEducation-mode">Offline</label>
                </div>
                {updateEducation.mode==="offline" ? 
                <>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">
                    University / School / College City
                  </div>
                  <input
                    value={updateEducation.city}
                    onChange={(e) => setUpdateEducation({...updateEducation, city: e.target.value})}
                    className="inpt-add-expr"
                    placeholder="Enter your university / school / college city"
                    type="text"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">
                    University / School / College Country
                  </div>
                  <select style={{width:"80%"}} value={updateEducation.country} className="inpt-add-expr-drop" onChange={(e) => setUpdateEducation({...updateEducation, country: e.target.value})}>
                      <option value="">Select a country</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="Other">Other</option>
                  </select>
                </div>
                </>
                :
                <></>
                }

                <div className="col-12 col-sm-6 mt-4">
                  <div className="jb-ps-pr">
                    Upload Certificate Document
                    <button className="re-upload-btn">Re-Upload</button>
                    <input
                      className="inpt-add-expr"
                      type="file"
                      onChange={UpdateCertificate}
                      class="upload doc_upload_input"
                    />
                  </div>
                  <div className="each_doc_sec" style={{ width: "240px" }}>
                    <div className="docs_container">
                    <a href={updateEducation.certificate_preview} target="_blank">
                      <div className="doc_img_div">
                        <img className="doc_image" src="/Images/pdfI.svg" />
                      </div>
                    </a>
                      {/* <img
                        className="del_btn"
                        // onClick={() => delDoc(item.id)}
                        src="/Images/delLog.svg"
                    /> */}
                    </div>
                    <div className="row noMargin noPadding">
                      <div className="docs_name_container text-center">
                        {certName}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Certificate URL</div>
                  <input 
                    value={updateEducation.certificate_link}
                    onChange={(e) => setUpdateEducation({...updateEducation, certificate_link: e.target.value})}
                    className="inpt-add-expr" 
                    placeholder="Enter your certificate url here..."
                    type="text" 
                    style={{ width: "80%" }} />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <button className="btn-up-prd" onClick={UpdateEducation}>Update</button>
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
                  Add Education
                </span>
              </div>

              <div className="row  ml-3">
                <div className="col-12 col-sm-6 mt-2">
                  <div className="jb-ps-pr">Your Degree / Course Name</div>
                  <input
                    value={education.title}
                    onChange={(e) => setEducation({...education, title: e.target.value})}
                    className="inpt-add-expr"
                    placeholder="Enter your degree / course name"
                    type="text"
                    style={{ width: "80%" }}
                  />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">
                    University / College / School Name
                  </div>
                  <input
                    value={education.institution}
                    onChange={(e) => setEducation({...education, institution: e.target.value})}
                    placeholder="Enter your university / school / college name"
                    className="inpt-add-expr"
                    type="text"
                    style={{ width: "80%" }}
                  />
                </div>

                <div className="col-12 mt-3">
                  <div className="mb-2 jb-ps-pr">Education Status</div>
                  <input
                    onChange={(e) => setEducation({...education, status: e.target.value})}
                    className="inpt-add-expr"
                    type="radio"
                    value="completed"
                    name="fav_language" 
                    style={{ marginRight: "15px" }}
                  />
                  <label for="education_status">Completed</label>
                  <input
                    onChange={(e) => setEducation({...education, status: e.target.value})}
                    className="inpt-add-expr"
                    type="radio"
                    value="ongoing"
                    name="fav_language" 
                    style={{ marginRight: "15px", marginLeft: "20px" }}
                  />
                  <label for="education_status">On-going</label>
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Education Start Year</div>
                  <input
                    value={education.start_year}
                    onChange={(e) => setEducation({...education, start_year: e.target.value})}
                    className="inpt-add-expr"
                    type="number"   
                    placeholder="Education start year"
                    min="1950"
                    max="2099"
                    step="1"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="col-12 col-sm-6 mt-3">
                {education.status==="completed" ? 
                    <>
                    <div className="jb-ps-pr">Completion / Graduation Year</div>
                    <input
                        value={education.end_year}
                        onChange={(e) => setEducation({...education, end_year: e.target.value})}
                        className="inpt-add-expr"
                        type="number"
                        placeholder="Education end year"
                        min="1950"
                        max="2099"
                        step="1"
                        style={{ width: "80%" }}
                    />
                    </>
                    :
                    <>
                    <div className="jb-ps-pr">Tentative Completion Year</div>
                    <input
                        value={education.end_year}
                        onChange={(e) => setEducation({...education, end_year: e.target.value})}
                        className="inpt-add-expr"
                        type="number"
                        placeholder="Education end year"
                        min="1950"
                        max="2099"
                        step="1"
                        style={{ width: "80%" }}
                    />
                    </>
                }
                </div>
                <div className="col-12 mt-3">
                  <div className="mb-2 jb-ps-pr">Education Mode</div>
                  <input
                    onChange={(e) => setEducation({...education, mode: e.target.value})}
                    className="inpt-add-expr"
                    type="radio"
                    value="online" 
                    name="education-mode"
                    style={{ marginRight: "15px" }}
                  />
                  <label for="education-mode">Online</label>
                  <input
                    onChange={(e) => setEducation({...education, mode: e.target.value})}
                    className="inpt-add-expr"
                    type="radio"
                    value="offline" 
                    name="education-mode"
                    style={{ marginRight: "15px", marginLeft: "20px" }}
                  />
                  <label for="education-mode">Offline</label>
                </div>
                {education.mode==="offline" ? 
                <>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">
                    University / School / College City
                  </div>
                  <input
                    value={education.city}
                    onChange={(e) => setEducation({...education, city: e.target.value})}
                    className="inpt-add-expr"
                    placeholder="Enter your university / school / college city"
                    type="text"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">
                    University / School / College Country
                  </div>
                  <select style={{width:"80%"}} className="inpt-add-expr-drop" onChange={(e) => setEducation({...education, country: e.target.value})}>
                      <option value="">Select a country</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="Other">Other</option>
                  </select>
                </div>
                </>
                :
                <></>
                }

                <div className="col-12 col-sm-6 mt-4">
                  <div className="jb-ps-pr">
                    Upload Certificate Document
                    <button className="re-upload-btn">Upload</button>
                    <input
                      className="inpt-add-expr"
                      type="file"
                      onChange={UploadCertificate}
                      class="upload doc_upload_input"
                    />
                  </div>
                  <div className="each_doc_sec" style={{ width: "240px" }}>
                    <div className="docs_container">
                    <a href={imgPreview} target="_blank">
                      <div className="doc_img_div">
                        <img className="doc_image" src="/Images/pdfI.svg" />
                      </div>
                    </a>
                      {/* <img
                        className="del_btn"
                        // onClick={() => delDoc(item.id)}
                        src="/Images/delLog.svg"
                    /> */}
                    </div>
                    <div className="row noMargin noPadding">
                      <div className="docs_name_container text-center">
                        {imgName}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">Certificate URL</div>
                  <input 
                    value={education.certificate_link}
                    onChange={(e) => setEducation({...education, certificate_link: e.target.value})}
                    className="inpt-add-expr" 
                    placeholder="Enter your certificate url here..."
                    type="text" 
                    style={{ width: "80%" }} />
                </div>

                <div className="col-12 col-sm-6 mt-3">
                  <button className="btn-up-prd" onClick={AddEducation}>Save</button>
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
    </div>
  );
}

export default Education;
