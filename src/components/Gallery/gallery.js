import React, { useState, useEffect } from "react";
// import "../Slider/styleS.css";
import './gallery.scss'
import Cookies from 'universal-cookie';
import axios from '../../Axios';
import { toast } from "react-toastify";
import DatePicker from 'react-datepicker';
import { Button, Modal, Popover } from "react-bootstrap";

const cookies = new Cookies();

export default function GalleryMain(props) {
    const [items, setItems] = useState([]);
    const [profile, setProfile] = useState();
    const [docs, setDocs] = useState('');
    const [gallery, setGallery] = useState('');
    const [galleryImageClick,setGalleryImageClick] = useState();
    const [galleryVideoClick,setGalleryVideoClick] = useState();

    const [galleryImgShow, setGalleryImgShow] = useState(false)
    const [galleryVideoShow, setGalleryVideoShow] = useState(false)

    const galleryFullImgClose = () => setGalleryImgShow(false);
    const galleryFullImgShow = () => setGalleryImgShow(true);
    const galleryFullVideoClose = () => setGalleryVideoShow(false);
    const galleryFullVideoShow = () => setGalleryVideoShow(true);

    useEffect(() => {
        axios.get(`admins/gallery-list`, {
            headers: {
                Authorization: "Token " + cookies.get("token"),
            }
        },
        )
            .then((res) => {
                console.log(res.data)
                setDocs(res.data)
                if (res.data && res.data.length > 0)
                    setGallery(res.data)
                console.log(gallery)

            })
            .catch((err) => {
                console.log(err);
            });





    }, [])

    return (
        <div className="gallery_card_main">
            {gallery ?
                <>
                    <div className="row noMargin noPadding gallery_row">
                        {/* Section 1 START */}
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noMargin noPadding">
                            {gallery.map((item) => (
                                <div className="row noMargin noPadding each_row">
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin onyBy3SectionDiv gallery_margin_top gallery_margin_bottom">
                                        <div className="row noMargin noPadding each_row">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noMargin noPadding gallery_margin_bottom">
                                                {item[0] ?
                                                    <>
                                                        {item[0].file_type == 'Image' ?
                                                            <div className="each_img_div vertical_one_by_two" onClick={() => {
                                                                galleryFullImgShow()
                                                                setGalleryImageClick(item[0].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[0].file}></img>
                                                            </div>
                                                            :
                                                            <div className="each_img_div vertical_one_by_two video_img_div" onClick={() => {
                                                                galleryFullVideoShow()
                                                                setGalleryVideoClick(item[0].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[0].file}></img>
                                                                <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                            </div>
                                                        }
                                                    </>
                                                    : <></>
                                                }
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noMargin onyBy2SectionDiv oneByTwoLeft gallery_margin_top">
                                                {item[1] ?
                                                    <>
                                                        {item[1].file_type == 'Image' ?
                                                            <div className="each_img_div vertical_one_by_two" onClick={() => {
                                                                galleryFullImgShow()
                                                                setGalleryImageClick(item[1].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[1].file}></img>
                                                            </div>
                                                            :
                                                            <div className="each_img_div vertical_one_by_two video_img_div" onClick={() => {
                                                                galleryFullVideoShow()
                                                                setGalleryVideoClick(item[1].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[1].file}></img>
                                                                <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                            </div>
                                                        }
                                                    </>
                                                    : <></>
                                                }
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noMargin onyBy2SectionDiv oneByTwoRight gallery_margin_top">
                                                {item[2] ?
                                                    <>
                                                        {item[2].file_type == 'Image' ?
                                                            <div className="each_img_div vertical_one_by_two" onClick={() => {
                                                                galleryFullImgShow()
                                                                setGalleryImageClick(item[2].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[2].file}></img>
                                                            </div>
                                                            :
                                                            <div className="each_img_div vertical_one_by_two video_img_div" onClick={() => {
                                                                galleryFullVideoShow()
                                                                setGalleryVideoClick(item[2].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[2].file}></img>
                                                                <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                            </div>
                                                        }
                                                    </>
                                                    : <></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin onyBy3SectionDiv gallery_margin_top gallery_margin_bottom">
                                        {item[3] ?
                                            <>
                                                {item[3].file_type == 'Image' ?
                                                    <div className="each_img_div vertical_full" onClick={() => {
                                                        galleryFullImgShow()
                                                        setGalleryImageClick(item[3].file);
                                                    }}>
                                                        <img className="img_common_class vertical_full" src={item[3].file}></img>
                                                    </div>
                                                    :
                                                    <div className="each_img_div vertical_full video_img_div" onClick={() => {
                                                        galleryFullVideoShow()
                                                        setGalleryVideoClick(item[3].file);
                                                    }}>
                                                        <img className="img_common_class vertical_full" src={item[3].file}></img>
                                                        <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                    </div>
                                                }
                                            </>
                                            : <></>
                                        }
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin onyBy3SectionDiv gallery_margin_top gallery_margin_bottom">
                                        <div className="row noMargin noPadding each_row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noMargin onyBy2SectionDiv oneByTwoLeft">
                                                {item[4] ?
                                                    <>
                                                        {item[4].file_type == 'Image' ?
                                                            <div className="each_img_div vertical_one_by_two" onClick={() => {
                                                                galleryFullImgShow()
                                                                setGalleryImageClick(item[4].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[4].file}></img>
                                                            </div>
                                                            :
                                                            <div className="each_img_div vertical_one_by_two video_img_div" onClick={() => {
                                                                galleryFullVideoShow()
                                                                setGalleryVideoClick(item[4].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[4].file}></img>
                                                                <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                            </div>
                                                        }
                                                    </>
                                                    : <></>
                                                }
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noMargin onyBy2SectionDiv oneByTwoRight gallery_margin_bottom">
                                                {item[5] ?
                                                    <>
                                                        {item[5].file_type == 'Image' ?
                                                            <div className="each_img_div vertical_one_by_two" onClick={() => {
                                                                galleryFullImgShow()
                                                                setGalleryImageClick(item[5].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[5].file}></img>
                                                            </div>
                                                            :
                                                            <div className="each_img_div vertical_one_by_two video_img_div" onClick={() => {
                                                                galleryFullVideoShow()
                                                                setGalleryVideoClick(item[5].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[5].file}></img>
                                                                <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                            </div>
                                                        }
                                                    </>
                                                    : <></>
                                                }
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noMargin noPadding gallery_margin_top">
                                                {item[6] ?
                                                    <>
                                                        {item[6].file_type == 'Image' ?
                                                            <div className="each_img_div vertical_one_by_two" onClick={() => {
                                                                galleryFullImgShow()
                                                                setGalleryImageClick(item[6].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[6].file}></img>
                                                            </div>
                                                            :
                                                            <div className="each_img_div vertical_one_by_two video_img_div" onClick={() => {
                                                                galleryFullVideoShow()
                                                                setGalleryVideoClick(item[6].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[6].file}></img>
                                                                <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                            </div>
                                                        }
                                                    </>
                                                    : <></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {/* Section 1 END */}

                                    {/* Section 2 START */}
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin onyBy3SectionDiv gallery_margin_top">
                                        {item[7] ?
                                            <>
                                                {item[7].file_type == 'Image' ?
                                                    <div className="each_img_div vertical_full" onClick={() => {
                                                        galleryFullImgShow()
                                                        setGalleryImageClick(item[7].file);
                                                    }}>
                                                        <img className="img_common_class vertical_full" src={item[7].file}></img>
                                                    </div>
                                                    :
                                                    <div className="each_img_div vertical_full video_img_div" onClick={() => {
                                                        galleryFullVideoShow()
                                                        setGalleryVideoClick(item[7].file);
                                                    }}>
                                                        <img className="img_common_class vertical_full" src={item[7].file}></img>
                                                        <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                    </div>
                                                }
                                            </>
                                            : <></>
                                        }
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin onyBy3SectionDiv gallery_margin_top">
                                        <div className="row noMargin noPadding each_row">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 noMargin noPadding gallery_margin_bottom">
                                                {item[8] ?
                                                    <>
                                                        {item[8].file_type == 'Image' ?
                                                            <div className="each_img_div vertical_one_by_two" onClick={() => {
                                                                galleryFullImgShow()
                                                                setGalleryImageClick(item[8].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[8].file}></img>
                                                            </div>
                                                            :
                                                            <div className="each_img_div vertical_one_by_two video_img_div" onClick={() => {
                                                                galleryFullVideoShow()
                                                                setGalleryVideoClick(item[8].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[8].file}></img>
                                                                <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                            </div>
                                                        }
                                                    </>
                                                    : <></>
                                                }
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noMargin onyBy2SectionDiv oneByTwoLeft gallery_margin_top">
                                                {item[9] ?
                                                    <>
                                                        {item[9].file_type == 'Image' ?
                                                            <div className="each_img_div vertical_one_by_two" onClick={() => {
                                                                galleryFullImgShow()
                                                                setGalleryImageClick(item[9].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[9].file}></img>
                                                            </div>
                                                            :
                                                            <div className="each_img_div vertical_one_by_two video_img_div" onClick={() => {
                                                                galleryFullVideoShow()
                                                                setGalleryVideoClick(item[9].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[9].file}></img>
                                                                <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                            </div>
                                                        }
                                                    </>
                                                    : <></>
                                                }
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 noMargin onyBy2SectionDiv oneByTwoRight gallery_margin_top">
                                                {item[10] ?
                                                    <>
                                                        {item[10].file_type == 'Image' ?
                                                            <div className="each_img_div vertical_one_by_two" onClick={() => {
                                                                galleryFullImgShow()
                                                                setGalleryImageClick(item[10].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[10].file}></img>
                                                            </div>
                                                            :
                                                            <div className="each_img_div vertical_one_by_two video_img_div" onClick={() => {
                                                                galleryFullVideoShow()
                                                                setGalleryVideoClick(item[10].file);
                                                            }}>
                                                                <img className="img_common_class vertical_one_by_two" src={item[10].file}></img>
                                                                <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                            </div>
                                                        }
                                                    </>
                                                    : <></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 noMargin onyBy3SectionDiv gallery_margin_top">
                                        {item[11] ?
                                            <>
                                                {item[11].file_type == 'Image' ?
                                                    <div className="each_img_div vertical_full" onClick={() => {
                                                        galleryFullImgShow()
                                                        setGalleryImageClick(item[11].file);
                                                    }}>
                                                        <img className="img_common_class vertical_full" src={item[11].file}></img>
                                                    </div>
                                                    :
                                                    <div className="each_img_div vertical_full video_img_div" onClick={() => {
                                                        galleryFullVideoShow()
                                                        setGalleryVideoClick(item[11].file);
                                                    }}>
                                                        <img className="img_common_class vertical_full" src={item[11].file}></img>
                                                        <img className="play_btn" src="/Images/gallery_play.png"></img>
                                                    </div>
                                                }
                                            </>
                                            : <></>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Section 2 END */}
                    </div>
                </>
                : 
                <>
                    <div className="row noMargin noPadding gallery_row text-center">
                        <span className="gallery_empty_text">Please Upload some Image to Gallery</span>
                    </div>
                </>
            }
            {/* Player Modal for Image*/}
            <Modal show={galleryImgShow && galleryImageClick}
            onHide={galleryFullImgClose}
            aria-labelledby="contained-modal-title-vcenter"
            className="gallery_img_modal_dialogue"
            size="lg"
            centered>
                <Modal.Header className="pop_head_div" closeButton>
                    <Modal.Title class="popupHead">Image View</Modal.Title>
                </Modal.Header>
                <Modal.Body className="noPadding">
                <div className="row noMargin noPadding full_img_main_row">
                    <div className="full_img_div">
                        <img className="full_img" src={galleryImageClick}></img>
                    </div>
                </div>
                    {/* <span>{galleryImageClick}</span> */}
                </Modal.Body>
            </Modal>

            {/* Player Modal for Video*/}
            <Modal show={galleryVideoShow && galleryVideoClick}
            onHide={galleryFullVideoClose}
            aria-labelledby="contained-modal-title-vcenter"
            className="gallery_img_modal_dialogue"
            size="md"
            centered>
                <Modal.Header className="pop_head_div" closeButton>
                    <Modal.Title class="popupHead">Video Player</Modal.Title>
                </Modal.Header>
                <Modal.Body className="noPadding">
                <div className="row noMargin noPadding full_img_main_row">
                    <div className="full_img_div">
                        <video controls src={galleryVideoClick} className="full_video full_img" />
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}