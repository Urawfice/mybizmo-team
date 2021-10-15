import React, { useState, useEffect } from "react";
import "../Slider/styleS.css";
import "./myProfile.scss";
import Cookies from "universal-cookie";
import axios from "../../Axios";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

const cookies = new Cookies();

export default function PersonalDetails(props) {
  const [uploadId, setUploadId] = useState([]);

  useEffect(() => {
    axios
      .get(`masters/document-list`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data && res.data.length > 0) setUploadId(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const delDoc = (id) => {
    axios
      .delete(`masters/document-delete/${id}`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data && res.data.length > 0) setUploadId(res.data);
        toast.error("Successfully deleted", {
          position: toast.POSITION.TOP_CENTER,
          setTimeout: 2000,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Some error occurred", { position: toast.POSITION.TOP_CENTER, setTimeout: 2000 })
      });
  };

  const checkPdf = (name) => {
    if (!name) return;
    let nm = name.slice(name.length - 3, name.length);
    console.log(nm);
    if (nm === "pdf") {
      name = "/Images/pdfI.svg";
    }
    return name;
  };

  const updateProfile = (e, isId) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    let img = URL.createObjectURL(e.target.files[0]);
    // setSelectedImagePreview(img);
    let tr = uploadId;
    tr.push(img);
    // if(tr)
    // setUploadId(tr);

    const formData = new FormData();
    console.log(e.target.files[0]);
    formData.append("master", cookies.get('id'));
    formData.append("document", e.target.files[0]);
    formData.append("document_name", e.target.files[0].name);
    formData.append("saved_id", isId);
    axios
      .post(`masters/document-create`, formData, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Document added successfully", {
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
  };

  return (
    <div>
      <div className="row noMargin noPadding card doc_card">
        <div className="row noMargin header_sec">
          <div className="col-6 noPadding noMargin text-left">
            <span
              className="select_interest_head noPadding"
              style={{ color: "#03CBC9" }}
            >
              My Saved IDs
            </span>
          </div>
          <div
            className="col-6 noPadding noMargin text-right"
            style={{ position: "relative" }}
          >
            <button className="blue_active edit_common_btn">Upload</button>
            <input
              type="file"
              onChange={(e) => updateProfile(e, true)}
              class="upload doc_upload_input"
            />
          </div>
        </div>
        <div className="row noMargin body_sec">
          {uploadId &&
            uploadId.map((item) =>
              item.saved_id ? (
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 each_doc_sec">
                  <div className="docs_container">
                    <a href={item.document} target="_blank">
                    <div className="doc_img_div">
                      <img
                        className="doc_image"
                        src={checkPdf(item.document)}
                      />
                    </div>
                    </a>
                    <img
                      className="del_btn"
                      onClick={() => delDoc(item.id)}
                      src="/Images/delLog.svg"
                    />
                  </div>
                  <div className="row noMargin noPadding">
                    <div className="docs_name_container text-center">
                      {item.document_name && item.document_name.slice(0, 29)}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
        </div>
      </div>

      <div className="row noMargin noPadding card doc_card">
        <div className="row noMargin header_sec">
          <div className="col-6 noPadding noMargin text-left">
            <span
              className="select_interest_head noPadding"
              style={{ color: "#03CBC9" }}
            >
              Other Documents
            </span>
          </div>
          <div
            className="col-6 noPadding noMargin text-right"
            style={{ position: "relative" }}
          >
            <button className="blue_active edit_common_btn">Upload</button>
            <input
              type="file"
              onChange={(e) => updateProfile(e, false)}
              class="upload doc_upload_input"
            />
          </div>
        </div>
        <div className="row noMargin body_sec">
          {uploadId &&
            uploadId.map((item) =>
              !item.saved_id ? (
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 each_doc_sec">
                  <div className="docs_container">
                    <a href={item.document} target="_blank">
                    <div className="doc_img_div">
                      <img
                        className="doc_image"
                        src={checkPdf(item.document)}
                      />
                    </div>
                    </a>
                    <img
                      className="del_btn"
                      onClick={() => delDoc(item.id)}
                      src="/Images/delLog.svg"
                    />
                  </div>
                  <div className="row noMargin noPadding">
                    <div className="docs_name_container text-center">
                      {item.document_name && item.document_name.slice(0, 29)}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
        </div>
      </div>
    </div>
  );
}
