import React, {useState, useEffect} from "react";
import Cookies from "universal-cookie";
import axios from "../../../Axios";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import './publicProfile.scss'
import Multiselect from 'multiselect-react-dropdown';

const cookies = new Cookies();
toast.configure();

function PublicProfile(props) {
    const [edit, setEdit] = useState(false)
    const categories = [
                    {name: 'Yoga', id: 1},
                    {name: 'Mind & Body', id: 2},
                    {name: 'Therapy', id: 3},
                    {name: 'Doctor', id: 4},
                ]
    const languages = [
        {name: 'English', id: 1},
        {name: 'Hindi', id: 2},
        {name: 'Bengali', id: 3},
        {name: 'Marathi', id: 4},
    ]
    const subCategories = [
        {name: 'Yoga', id: 1},
        {name: 'Mind & Body', id: 2},
        {name: 'Therapy', id: 3},
        {name: 'Doctor', id: 4},
    ]
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
    const onSelectCategories = (selectedList, selectedItem) => {
        let cat = ''
        selectedList.forEach(function (arrayItem) {
            cat += arrayItem.name+',';
            console.log(cat);
        });
        setData({...data, category: cat});
    }
    
    const onRemoveCategories = (selectedList, removedItem) => {        
        let cat = ''
        selectedList.forEach(function (arrayItem) {
            cat += arrayItem.name+',';
            console.log(cat);
        });
        setData({...data, category: cat});
    }
    const onSelectSubCategories = (selectedList, selectedItem) => {
        let subcat = ''
        selectedList.forEach(function (arrayItem) {
            subcat += arrayItem.name+',';
            console.log(subcat);
        });
        setData({...data, subcategory: subcat});
    }
    
    const onRemoveSubCategories = (selectedList, removedItem) => {
        let subcat = ''
        selectedList.forEach(function (arrayItem) {
            subcat += arrayItem.name+',';
            console.log(subcat);
        });
        setData({...data, subcategory: subcat});
    }
    const onSelectLanguage = (selectedList, selectedItem) => {
        let lang = ''
        selectedList.forEach(function (arrayItem) {
            lang += arrayItem.name+',';
            console.log(lang);
        });
        setData({...data, languages: lang});
    }
    
    const onRemoveLanguage = (selectedList, removedItem) => {
        let lang = ''
        selectedList.forEach(function (arrayItem) {
            lang += arrayItem.name+',';
            console.log(lang);
        });
        setData({...data, languages: lang});
    }
    const updateProfile = (e) => {
        e.preventDefault();
        console.log(data);
        
        const formData = new FormData();
        formData.append("content",data.content);
        formData.append("bio",data.bio);
        formData.append("category",data.category);
        formData.append("subcategory",data.subcategory);
        formData.append("languages",data.languages);
        axios.put(`masters/skill/${cookies.get('id')}/edit`, formData, {
            headers: {
              Authorization: "Token " + cookies.get("token"),
            },
        })
        .then((res) => {
            console.log(res);
            toast.success("Profile updated successfully", {
              position: toast.POSITION.TOP_CENTER,
              setTimeout: 2000,
            });            
            setTimeout(() => {
                window.location.reload();
              }, 1000);
        })
        .catch((err) => {
            console.log(err);
            toast.warning("Some error occured", {
              position: toast.POSITION.TOP_CENTER,
              setTimeout: 2000,
            });
        });
    };
    return (
        <div>
            {data && !edit ?
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
                    onClick={() => setEdit(true)}
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
            :
            <></>
        }
        {data && edit ? 
            <div className="row noMargin noPadding card profile_card">
                <div className="row noMargin noPadding">
                    <span
                    className="edit_profile_head noPadding"
                    style={{ color: "#03CBC9" }}
                    >
                    Edit Public Profile
                    </span>
                </div>
                <div className="row noMargin noPadding">
                    <div className="edit_sec">
                        <div className="row noMargin noPadding">
                            <div className="col-sm-12 col-12 noPadding each_input">
                            <span className="profile_gr">Bio</span>
                            <textarea
                                className="border profile_input form-control"
                                style={{ width: "80%" }}
                                value={data.bio}
                                onChange={(e) => setData({...data, bio: e.target.value})}
                            ></textarea>
                            </div>
                        </div> 
                        <div className="row noMargin noPadding">
                            <div className="col-sm-12 col-12 noPadding each_input">
                            <span className="profile_gr">Qualifications</span>
                            <textarea
                                className="border profile_input form-control"
                                style={{ width: "80%" }}
                                value={data.content}
                                onChange={(e) => setData({...data, content: e.target.value})}
                            ></textarea>
                            </div>
                        </div> 
                        <div className="row noMargin noPadding">
                            <div className="col-sm-4 col-12 noMargin noPadding each_input">                            
                                <Multiselect
                                    placeholder="Choose categories"
                                    options={categories}
                                    // selectedValues={}/
                                    onSelect={onSelectCategories}
                                    onRemove={onRemoveCategories}
                                    displayValue="name"
                                    showCheckbox={true}
                                />
                            </div>
                        </div> 
                        <div className="row noMargin noPadding">
                            <div className="col-sm-4 col-12 noMargin noPadding each_input">                            
                                <Multiselect
                                    placeholder="Choose subcategories"
                                    options={subCategories}
                                    // selectedValues={}/
                                    onSelect={onSelectSubCategories}
                                    onRemove={onRemoveSubCategories}
                                    displayValue="name"
                                    showCheckbox={true}
                                />
                            </div>
                        </div> 
                        <div className="row noMargin noPadding">
                            <div className="col-sm-4 col-12 noMargin noPadding each_input">                            
                                <Multiselect
                                    placeholder="Choose languages"
                                    options={languages}
                                    // selectedValues={}/
                                    onSelect={onSelectLanguage}
                                    onRemove={onRemoveLanguage}
                                    displayValue="name"
                                    showCheckbox={true}
                                />
                            </div>
                        </div>                 

                        <div className="row noMargin noPadding">
                            <div className="col-12 noMargin noPadding each_input">
                            <button
                                className="blue_active edit_common_btn"
                                onClick={updateProfile}
                            >
                                Update
                            </button>
                            <button
                                className="edit_cancel_btn edit_common_btn margin_left_btn"
                                onClick={() => setEdit(false)}
                            >
                                Cancel{" "}
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <></>
        }
        </div>
    );
}

export default PublicProfile;
