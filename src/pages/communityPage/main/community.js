import React, { useState,useEffect } from "react";
import "./community.css";
import axios from "axios";
import { Pagination } from "antd";
import Nav from "../../../components/Nav/Nav";
import write from "../../../assets/images/write.svg";
import searchLogo from "../../../assets/images/돋보기.svg";
import { Link } from "react-router-dom";
import { API } from "../../../config";
import CommentBtnPage from "../components/commentBtn";
import HeartBtnPage from "../components/heartBtn";
import PickBtnPage from "../components/PickBtn";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";

function CommunityPage() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [scrapList,setScrapList] = useState([]);
  const [likeList,setLikeList] = useState([]);
  const [travels,setTravels] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // 내 찜 목록 api
  const scrapListApi = async()=>{
      await axios.get(`${API.HEADER}/users/myScrap`,{ headers: {Authorization:userInfo.accessToken,}})
      .then(response=>{
          if(response.data.isSuccess){
              setScrapList(response.data.result);
              console.log('내 찜 목록',response.data.result);
          }
          else console.log('찜 목록 불러오기 실패',response.data.result);
      })
      .catch(e=>{console.log('error',e)})
  }

  // 좋아요 여행 리스트 API 호출
  const likeListApi = async()=>{
    await axios.get(`${API.HEADER}/users/myLike`,{ headers: {Authorization:userInfo.accessToken,}})
    .then(response=>{
        if(response.data.isSuccess){
            setLikeList(response.data.result);
            console.log('내 좋아요 목록',response.data.result);
        }
        else console.log('좋아요 목록 불러오기 실패',response.data.result);
    })
    .catch(e=>{console.log('error',e)})
}

  //api 호출(비동기를 처리하기 위해 useEffect 처리)
  useEffect(()=>{
    axios.get(API.COMMUNITY)
    .then(response => {
        if(response.data.isSuccess === true){   
            setTravels(response.data.result);
            console.log(travels);
        }
        else console.log(response.data);
    })
    .catch(e=>console.log('error',e))

    if(userInfo.isLogin){
          scrapListApi();
          likeListApi();
    }
  },[]);

  //페이징 구현
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTravels = travels.slice(startIndex, endIndex);

  // 검색 기능 구현(필터링된 데이터)
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value)
  };

  const onClick = (e)=>{
    console.log(search);
    axios.get(API.COMMUNITY, {params: {keyword: search}})
    .then(response => {
        if(response.data.isSuccess === true){   
            setTravels(response.data.result);
            console.log(travels);
        }
        else console.log(response.data);
    })
    .catch(e=>console.log('error',e))
  }

  
  // 인기순, 최신순 정렬 버튼
  const sortOptions = [
    { title: "인기순", property: "popular" },
    { title: "최신순", property: "late" },
  ];
  const [sortType, setSortType] = useState(sortOptions[0]);

  const changeSortType = (e) => {
    const selectedType = sortOptions.find(
      (type) => type.title === e.target.value
    );
    setSortType(selectedType);
  };

  useEffect(() => {
    const newTravles=(sortType==="인기순")?([...travels].sort((a,b)=>a.likes-b.likes))
                                          :([...travels].sort((a,b)=>a.created_at-b.created_at));
    setTravels(newTravles);
  }, [sortType]);

  return (
    <div className="community-page">
      <Nav /> 
      <Link to="/story/write">
        <img src={write} alt="writeButton" id="writeBtn"/>
      </Link>
      <div id="body">
        <div className="search-bar">
          <input type="text" placeholder="어떤 여행이 궁금하신가요?" className="search-bar-input" onChange={onChange}/>
          <img src={searchLogo} onClick={onClick}/>
        </div>

        <div className="sort-btn">
          <select onChange={changeSortType} style={{width:"80px"}}>
            {sortOptions.map(({ title }, index) => {
              return <option key={index}>{title}</option>;
            })}
          </select>
        </div>
        <div id="product-list">
          {displayedTravels&&displayedTravels.map((travel, index) => (
            <div className="xproduct-card" key={travel.pid}>
              <div className="xproduct-img-container">
                <Link to={`/story/${travel.pid}`} key={travel.pid}>
                  <img
                    className="xproduct-img"
                    src={travels.imgUrl ? travels.imgUrl : require("../../../assets/images/sea.jpg")}
                    alt={`Travel ${index}`}
                  />
                </Link>
                <div className="xfavorite-icon">
                  <PickBtnPage size="40" pid={travel.pid} 
                  pick={scrapList.findIndex(i=>i.postResponse.pid === travel.pid) === -1 ? false : true} />
                </div>
              </div>
              <div className="xproduct-contents">
                <div className="xicons-btn">
                    <CommentBtnPage pId={travel.pid} size="20"/>
                    <HeartBtnPage pId={travel.pid} count={travel.likes} size="20"
                    like={likeList.findIndex(i=>i.postResponse.pid === travel.pid) === -1 ? false : true}/>
                </div>
                <span className="xproduct-title">
                  {travel?.title}
                </span>{" "}
                <span style={{color:"white"}}>{travel?.location} | {'2박3일'}</span>
            </div>
          </div>
          ))}
        </div>
        <Pagination
          className="page-box"
          defaultPageSize={itemsPerPage}
          defaultCurrent={1}
          total={travels.length}
          onChange={handleChangePage}
        />
      </div>
    </div>

  );
}

export default CommunityPage;
