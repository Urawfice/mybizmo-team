import React, {useState, useEffect} from "react";
import Cookies from "universal-cookie";
import axios from "../../../Axios";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

const cookies = new Cookies();
toast.configure();

function PublicProfile(props) {
    const [data, setData] = useState({
        bio:'',
        content:'',
        category:'',
        subcategory:'',
        languages:'',
    })

    useEffect(() => {
        axios.get("/masters/skill", {
            headers: {
                Authorization: "Token" + " " + cookies.get("token"),
            },
        })
        .then(res => {
            setData({
                bio:res.data.bio,
                category:res.data.associated_category,
                subcategory:res.data.associated_subcategory,
                languages:res.data.languages,
                content:res.data.content,
            });
        })
        .catch(err => {
            console.log("Some server error");
        })
    }, [])

    return (
        <div>
        <div className="row noMargin noPadding card profile_card">
            <div className="row noMargin noPadding">
            <div className="col-6 noPadding noMargin text-left">
                <span
                className="select_interest_head noPadding"
                style={{
                    color: "#03CBC9",
                    fontSize: "1.4vw",
                    marginLeft: "0.6vw",
                }}
                >
                Public Profile
                </span>
            </div>

            <div className="col-6 noPadding text-right">
                <img
                className="edit_img"
                src="/Images/editP.svg"
                //   onClick={() => setIsPublicProfileEdit(true)}
                style={{ cursor: "pointer" }}
                />
            </div>
            </div>
            <div>
            <br></br>
            <div>
                <span className="public-profile-head">Bio: </span>
                <span className="public-profile-content">
                {data.bio}
                </span>
            </div>
            <br></br>
            <div>
                <span className="public-profile-head">Qualifications: </span>
                <span className="public-profile-content">
                {data.content}
                </span>
            </div>
            <br></br>
            <div>
                <span className="public-profile-head">Wellness Categories: </span>
                <span className="public-profile-content">
                {data.category}
                </span>
            </div>
            <br></br>
            <div>
                <span className="public-profile-head">
                Wellness Sub-categories:{" "}
                </span>
                <span className="public-profile-content">
                {data.subcategory}
                </span>
            </div>
            <br></br>
            <div>
                <span className="public-profile-head">Languages: </span>
                <span className="public-profile-content">
                {data.languages}
                </span>
            </div>
            </div>
        </div>
        </div>
    );
}

export default PublicProfile;
