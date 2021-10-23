import "./Skills.scss";
import { Chrono } from "react-chrono";
import React, { useState, useEffect, useRef } from "react";
import axios from "../../../Axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();
toast.configure();

function Skills(props) {
  const [workExpEdit, setWorkExpEdit] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const [projectEdit, setProjectEdit] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1)
  const [skillData, setSkillData] = useState({})

  useEffect(() => {
    axios
      .get(`masters/strength-list`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
          setData(res.data);        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const handleChange = (e) => {
    setSkillData({...skillData, [e.target.name]: e.target.value})
  }

  const handleUpdate = (e) => {
    for(let i=0; i<data.length; i++) {
      if(data[i]['id']==e.target.id){
        data[i][e.target.name]=e.target.value;
      }
    }
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(skillData);
      let skills = []
      for(let i=0; i<count; i++) {
        let obj={};
        obj["master"]=cookies.get("id");
        obj["name"]=skillData[`skill${i}`];
        if(skillData[`rating${i}`]=='undefined' || !skillData[`rating${i}`])
            obj["rating"]='0';
        else
            obj["rating"]=skillData[`rating${i}`];
        skills.push(obj);
      }
      for(let i=0; i<data.length; i++) {
        skills.push(data[i]);
      }
      console.log(skills);
      // axios.put(
      //   `masters/strength-update`,
      //   {
      //     "skills":skills
      //   },
      //   {
      //     headers: {
      //       Authorization: "Token " + cookies.get("token"),
      //     },
      //   }
      // )
      // .then((res) => {
      //   console.log(res);
      //   toast.success("Skills updated successfully", {
      //     position: toast.POSITION.TOP_CENTER,
      //     setTimeout: 2000,
      //   });
      // })
      // .catch((err) => {
      //   console.log(err);
      //   toast.warning("Some error occured", {
      //     position: toast.POSITION.TOP_CENTER,
      //     setTimeout: 2000,
      //   });
      // });
        
  }

  return (
    <div>
      {!projectEdit ? (
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
              {data.map(item => 
                <div className="col-12 col-sm-6 mt-3">
                    <div className="jb-ps-pr">{item.name}</div>
                    <input
                    type="range"
                    value={item.rating*10}
                    readOnly
                    style={{
                        borderRadius: "20px",
                        height: "20px",
                        marginTop: "10px",
                        width: "80%",
                    }}
                    />
                </div>
              )}
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
                  Edit Skills / Strengths
                </span>
              </div>
              <div className="row  ml-3">
                {data.map((item,i) => 
                <>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">{i+1}. Skill / Strength Name</div>
                  <input 
                    name="name"
                    type="text"
                    onChange={handleUpdate}
                    id={item.id}
                    value={item.name}
                    placeholder="Enter your skill / strength here..."
                    style={{ width: "80%" }} 
                />
                </div>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">
                    Skill / Strength Level
                    <span style={{ fontWeight: "500" }}> (Out of 10) </span>
                  </div>
                  <input
                    type="number"
                    value={item.rating}
                    id={item.id}
                    onChange={handleUpdate}
                    min="1"
                    name="rating"
                    max="10"
                    step="0.5"
                    style={{ width: "80%" }}
                  />
                </div>
                </>
                )}
              </div>
              <div className="row  ml-3">
                {Array.from({ length: count }, (_, i) =>                   
                <>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">{data.length+i+1}. Skill / Strength Name</div>
                  <input 
                    name={`skill${i}`}
                    type="text"
                    onChange={handleChange}
                    placeholder="Enter your skill / strength here..."
                    style={{ width: "80%" }} 
                />
                </div>
                <div className="col-12 col-sm-6 mt-3">
                  <div className="jb-ps-pr">
                    Skill / Strength Level
                    <span style={{ fontWeight: "500" }}> (Out of 10) </span>
                  </div>
                  <input
                    type="number"
                    defaultValue="0"
                    onChange={handleChange}
                    min="1"
                    name={`rating${i}`}
                    max="10"
                    step="0.5"
                    style={{ width: "80%" }}
                  />
                </div>
                </>
                )}

                <div className="col-11  mt-3">
                  <button className="btn-up-prd" onClick={handleSubmit}>Update</button>
                  <button
                    className="btn-cn-prd"
                    onClick={() => setProjectEdit(false)}
                  >
                    Cancel
                  </button>
                  <span style={{ float: "right" }}>
                    <button className="btn-ad-an-prd" onClick={(e)=>setCount(count+1)}>
                      Add Another
                      <img
                        src="/Images/wh-blue.svg"
                        style={{ height: "2vh", marginLeft: "10px" }}
                      />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Skills;
