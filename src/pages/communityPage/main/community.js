import React, { useState,useRef,useEffect } from "react";
import "./community.css";
import axios from "axios";
import { Pagination } from "antd";
import Nav from "../../../components/Nav/Nav";
import {
  HeartOutlined,
  ShareAltOutlined,
  CommentOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import write from "../../../assets/images/write.svg";
import searchLogo from "../../../assets/images/돋보기.svg";
import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { travelsSelector } from '../../../recoil/atoms/travelsreviewStates';

function CommunityPage() {
  const travels = useRecoilValue(travelsSelector);
  const [starred, setStarred] = useState(new Array(travels.length).fill(false));

  const [search, setSearch] = useState("");
  const onChange = (e) => {
          setSearch(e.target.value)
  };
  const handleStarClick = async (pId, index) => {
    try {
      console.log('별 클릭 이벤트 발생');
      const response = await axios.post(`/post/${pId}/scrap`);
      if (response.status === 200) {
        const newStarred = [...starred];
        newStarred[index] = !newStarred[index];
        setStarred(newStarred);
        console.log('성공');
      }
    } catch (error) {
      console.error('Error while scraping:', error);
    }
  };
  // 검색 기능 구현(필터링된 데이터)
  const filterTravel = travels.filter((p) => {
    return p.title.replace(" ","").toLocaleLowerCase().includes(search.toLocaleLowerCase().replace(" ",""))
  })
  // 인기순, 최신순 정렬 버튼
  const sortOptions = [
    { title: "인기순", property: "popular" },
    { title: "최신순", property: "late" },
  ];
  const [sortType, setSortType] = useState(sortOptions[0]);
  const [filteredTravel, setFilteredTravel] = useState(filterTravel);

  useEffect(() => {
    const newTravles=(sortType==="인기순")?([...filteredTravel].sort((a,b)=>a.totalrating-b.totalrating))
                                          :([...filteredTravel].sort((a,b)=>a.title-b.title));
    setFilteredTravel(newTravles);
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
      <Link to="/new">
        <img src={write} alt="writeButton" id="writeBtn"/>
      </Link>
      <div id="body">
        <div className="search-bar">
          <img src={searchLogo}/>
          <input type="text" placeholder="어떤 여행이 궁금하신가요?" className="search-bar-input" onChange={onChange}/>
        </div>

        <select onChange={changeSortType} className="sort-btn">
          {sortOptions.map(({ title }, index) => {
            return <option key={index}>{title}</option>;
          })}
        </select>
        
        <div id="product-list">
          {filteredTravel.map((travel, index) => (
            <div className="xproduct-card" key={travel.pid}>
              <div className="xproduct-img-container">
                <Link to={`/story/${travel.tid}`}>
                  <img
                    className="xproduct-img"
                    src={travel.imgUrl} 
                    alt={`Travel ${index}`}
                  />
                </Link>
                <div className="xfavorite-icon" onClick={() => handleStarClick(travel.tid, index)}>
                  {starred[index] ? <StarFilled /> : <StarOutlined />}
                </div>
                <div className="xicons-bottom">
                  <CommentOutlined className="comment-icon" />
                  <ShareAltOutlined className="share-icon" />
                  <HeartOutlined className="heart-icon" />
                </div>
              </div>
              <div className="xproduct-contents">
                <span className="xproduct-oneline">
                  {travel.oneLineReview}
                </span>{" "}
                <span className="xproduct-traveler">
                  {travel.title}
                </span>
                <span className="xtag">#{travel.hashtags[0]} #{travel.hashtags[1]}</span>
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
