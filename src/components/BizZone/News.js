import React, { useEffect, useState } from "react";
import axios from "../../Axios";
import Cookies from "universal-cookie";
import newsname from "./BizImages/newsname.png";
import newsdate from "./BizImages/newsdate.png";
import newstitle from "./BizImages/newstitle.png";
import _ from "lodash";
import "./news.scss";

const cookies = new Cookies();

const News = () => {
  const [pagesNo, setPages] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurretPage] = useState(1);
  const [paginatedPosts, setPaginatedPosts] = useState([]);

  const pageSize = 6;

  useEffect(() => {
    axios
      .get("/users/news-list?page=1", {
        headers: {
          Authorization: "Token" + " " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setPaginatedPosts(res.data.results);
        setPages(res.data.count);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const pageCount = pagesNo <= pageSize ? 0 : Math.ceil(pagesNo / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (page) => {
    // e.preventDefault();

    console.log(page);
    setCurretPage(page);
    console.log(page);

    axios
      .get(`/users/news-list?page=${page}`, {
        headers: {
          Authorization: "Token " + cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setPaginatedPosts(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="news_main">
        {paginatedPosts.length > 0 ? (
          <div className="row noPadding news_sec_div">
            <div className="row noPadding noMargin">
              <div className="col-12 sectionPinkHead">

                <nav className="">
                  <ul className="pagination justify-content-end noMargin noPadding">
                    {pages.map((page) => (
                      <li className={page === currentPage ? "new-pagination-active alignSelfCenter" : "page-item alignSelfCenter"}>
                        <span className="page_link" onClick={() => pagination(page)}>
                          {page}
                        </span>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="col-12 noMargin sectionBody">
                {paginatedPosts &&
                  paginatedPosts.map((item) => (
                    <div className="col-12 noMargin noPadding">
                      <div className="row noMargin each_news_row">
                        <div className="news_img_div noMargin noPadding">
                          <img src={item.publisher_logo}></img>
                        </div>
                        <div className="col-12 noMargin noPadding head_sec">
                          <span className="sectionBodyHead">{item.title}</span>
                        </div>

                        <div className="row noMargin noPadding date_news_div">
                          <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-5 noPadding">
                            <span className="news_date_span"><img className="news_date_img" src={newsdate}></img></span>
                            <span className="created_date">{item.created_at.slice(0, 10)}</span>
                          </div>
                          <div className="col-xl-11 col-lg-11 col-md-10 col-sm-10 col-7 noPadding">
                            <span className="news_date_span news_title_span"><img className="news_date_img" src={newstitle}></img></span>
                            <span className="created_date">{item.publisher}</span>
                          </div>
                        </div>
                        <div className="col-12 noMargin noPadding news_content">
                          <span className="sectionBodyText">{item.content.slice(0, 340)}...</span>
                        </div>
                        <div className="col-12 noPadding news_content">
                          <a href={item.news_link} target="_blank">
                            <button className="common_btn blue_active">Read More</button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default News;
