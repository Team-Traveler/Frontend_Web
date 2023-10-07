import React, { useState,useRef,useEffect } from "react";
import "./community.css";
import axios from "axios";
import { Pagination } from "antd";
import Nav from "../../../components/Nav/Nav";
import write from "../../../assets/images/write.svg";
import searchLogo from "../../../assets/images/돋보기.svg";
import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { travelsSelector } from '../../../recoil/atoms/travelsreviewStates';
import CommentBtnPage from "../components/commentBtn";
import HeartBtnPage from "../components/heartBtn";
import PickBtnPage from "../components/scrapBtn";

function CommunityPage() {
  const travels = useRecoilValue(travelsSelector);
 
  // 검색 기능 구현(필터링된 데이터)
  
  const [search, setSearch] = useState("");
  const onChange = (e) => {
          setSearch(e.target.value)
  };
  const filterTravel = travels.filter((p) => {
    return p.title.replace(" ","").toLocaleLowerCase().includes(search.toLocaleLowerCase().replace(" ",""))
  });
 
  // 인기순, 최신순 정렬 버튼
  const sortOptions = [
    { title: "인기순", property: "popular" },
    { title: "최신순", property: "late" },
  ];

  const [sortType, setSortType] = useState(sortOptions[0]);

  useEffect(() => {
    const newTravles=(sortType==="인기순")?([...filterTravel].sort((a,b)=>a.heart-b.heart))
                                          :([...filterTravel].sort((a,b)=>a.createdAt-b.createdAt));
    //setFilteredTravel(newTravles);
  }, [sortType]);

  const changeSortType = (e) => {
    const selectedType = sortOptions.find(
      (type) => type.title === e.target.value
    );
    //console.log(`Picked sort type is ${e.target.value}`)
    setSortType(selectedType);
  };

  return (
    <div className="community-page">
      <Nav /> 
      <Link to="/story/write">
        <img src={write} alt="writeButton" id="writeBtn"/>
      </Link>
      <div id="body">

        <div className="search-bar">
          <img src={searchLogo}/>
          <input type="text" placeholder="어떤 여행이 궁금하신가요?" className="search-bar-input" onChange={onChange}/>
        </div>

        <div className="sort-btn">
          <select onChange={changeSortType} style={{width:"80px"}}>
            {sortOptions.map(({ title }, index) => {
              return <option key={index}>{title}</option>;
            })}
          </select>
        </div>
  
        <div id="product-list">
          {filterTravel.map((travel, index) => (
            <div className="xproduct-card" key={travel.pid}>
              <div className="xproduct-img-container">
                <Link to={`/story/${travel.pid}`}>
                  <img
                    className="xproduct-img"
                    src={travel.imgUrl[0]} 
                    alt={`Travel ${index}`}
                  />
                </Link>
                <div className="xfavorite-icon">
                  <PickBtnPage size="40" pId={travel.pid}/>
                </div>
              </div>
              <div className="xproduct-contents">
                <div className="xicons-btn">
                    <CommentBtnPage pId={travel.pid} size="20"/>
                    <HeartBtnPage pId={travel.pid} size="20"/>
                </div>
                <span className="xproduct-title">
                  {travel.title}
                </span>{" "}
                <span style={{color:"white"}}>{travel.location} | {travel.period}</span>
            </div>
          </div>
          ))}
        </div>
      </div>
      <div
        id="footer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
         <Pagination defaultPageSize={8} defaultCurrent={1} total={travels.length} /> 
      </div>
    </div>
  );
}

export default CommunityPage;
