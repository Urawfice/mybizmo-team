import React, { useEffect, useState } from "react";
import axios from "../../Axios";
import Cookies from "universal-cookie";
import newsname from "./BizImages/newsname.png";
import newsdate from "./BizImages/newsdate.png";
import newstitle from "./BizImages/newstitle.png";
import _ from "lodash";
import "./News.css";

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
      {paginatedPosts.length > 0 ? (
        <div>
          <div className="row mt-5 ">
            <div className="col-xxl-12  mx-auto news-card-top-div-back p-2">
              {/* <nav aria-label="Page navigation example" >
  <ul className="pagination justify-content-end mb-0 "  >
    <li className="page-item" >
      <a className="page-link news-pagination-border" href="#" aria-label="Previous" style={{ background:"#d082ff",color:"white"}} >
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </a>
    </li>
    <li className="page-item "><a style={{color:"white",background:"#d082ff"}} className="page-link news-pagination-border"  href="#">1</a></li>
    <li className="page-item "><a style={{color:"white",background:"#d082ff"}} className="page-link news-pagination-border" href="#">2</a></li>
    <li className="page-item "><a style={{color:"white",background:"#d082ff"}} className="page-link news-pagination-border" href="#">3</a></li>
    <li className="page-item">
      <a className="page-link news-pagination-border" href="#" aria-label="Next" style={{ background:"#d082ff",color:"white"}}>
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav> */}

              <nav className="">
                <ul className="pagination pagination-md justify-content-end paginationStyling ">
                  {pages.map((page) => (
                    <li
                      className={
                        page === currentPage
                          ? "new-pagination-active "
                          : "page-item"
                      }
                    >
                      <p className="page-link" onClick={() => pagination(page)}>
                        {page}
                      </p>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="row">
            {paginatedPosts &&
              paginatedPosts.map((item) => (
                <div className="col-xl-12 mx-auto  new-card-background">
                  <div className="row">
                    <div className="col-xl-12 ">
                      <img
                        src={item.publisher_logo}
                        style={{
                          height: "150px",
                          width: "150px",
                          objectFit: "contain",
                        }}
                      ></img>
                    </div>
                    <div className="col-xl-12 ">
                      <p className="news-title-text">{item.title}</p>
                    </div>

                    <div className="col-xl-2 ">
                      <p className="news-date-text">
                        <span style={{ marginRight: "10px" }}>
                          <img src={newsdate}></img>
                        </span>{" "}
                        {item.created_at.slice(0, 10)}
                      </p>
                    </div>
                    <div className="col-xl-5 ">
                      <p className="news-date-text">
                        <span style={{ marginRight: "10px" }}>
                          <img src={newstitle}></img>
                        </span>
                        {item.publisher}
                      </p>
                    </div>
                    <div className="col-xl-12 mt-3">
                      <p className="new-data-text ">
                        {item.content.slice(0, 340)}...
                      </p>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                      <a href={item.news_link} target="_blank">
                        {" "}
                        <p className="news-readmore-btn p-1">Read More</p>
                      </a>{" "}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default News;
