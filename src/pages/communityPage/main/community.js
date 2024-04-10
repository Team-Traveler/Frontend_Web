import React, { useState,useEffect,useRef } from "react";
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
import { ReactComponent as Marker } from '../components/Vector.svg';

function CommunityPage() {
  const api_url = '/complete/search';
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [scrapList,setScrapList] = useState([]);
  const [likeList,setLikeList] = useState([]);
  const [travels,setTravels] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const outSection = useRef();
  const itemsPerPage = 8;

  // 연관검색어
  const [relatedSearch,setRelatedSearch] = useState(false); // 연관검색어 
  const [relatedList,setRelatedList] = useState([]);
  const myElementRef = useRef();
  const [topPosition,setTopPosition] = useState(0);

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

  //페이징 구현
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTravels = travels.slice(startIndex, endIndex);

  //연관검색어 구글 API 호출
  const searchKeywordApi = async(keyword)=>{
    await axios.get(api_url,
    {
      params: {
        client: 'firefox',
        q: keyword+'',
        hl:'ko', 
      }
    })
    .then(response=>{
      setRelatedList(response.data[1]);
    })
    .catch(err=>{
      console.log('err',err);
    })
  }

  //연관 검색어 클릭
  const onClickKeyword = (v)=>{
    setSearch(v);
    axios.get(API.COMMUNITY, {params: {keyword: v}})
    .then(response => {
        if(response.data.isSuccess === true){   
            setTravels(response.data.result);
        }
        else console.log(response.data);
    })
    .catch(e=>console.log('error',e))
    setRelatedSearch(false);
  }

  // 검색 기능 구현(필터링된 데이터)
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value)
  };

  // 검색버튼 클릭 시 
  const onClick = ()=>{
    axios.get(API.COMMUNITY, {params: {keyword: search}})
    .then(response => {
        if(response.data.isSuccess === true){   
            setTravels(response.data.result);
        }
        else console.log(response.data);
    })
    .catch(e=>console.log('error',e))
    setRelatedSearch(false);
  }
  
  // 인기순, 최신순 정렬 버튼
  const sortOptions = ["인기순", "최신순"];
  const [sortType, setSortType] = useState(sortOptions[0]); // 기본 인기순

  const changeSortType = (e) => {
    // const selectedType = sortOptions.find(
    //   (type) => type.title === e.target.value
    // );
    setSortType(e.target.value);
  };

  //api 호출(비동기를 처리하기 위해 useEffect 처리)
  useEffect(()=>{
    if (myElementRef.current) {
      // ref를 통해 DOM 요소에 접근합니다.
      const topPosition = myElementRef.current.getBoundingClientRect().top;
      setTopPosition(topPosition);
    }

    axios.get(API.COMMUNITY)
    .then(response => {
        if(response.data.isSuccess === true){   
            setTravels(response.data.result);
            console.log('커뮤니티 여행 리스트',response.data.result);
        }
        else console.log(response.data);
    })
    .catch(e=>console.log('error',e))

    if(userInfo.isLogin){
      scrapListApi();
      likeListApi();
    }

  },[]);

  useEffect(()=>{
    if(search !== ''){
      setRelatedSearch(true);
    }
    else
      setRelatedSearch(false);

    const debounce = setTimeout(() => {
      if(search !== ''){
        searchKeywordApi(search);
      }
    }, 200);

    return () => {
      clearTimeout(debounce);
    };

  },[search])

  useEffect(()=>{
    const newTravels=(sortType==="인기순")?([...travels].sort((a,b)=>Number(b.likes) - Number(a.likes)))
                                          :([...travels].sort((a,b)=>new Date(b.created_at) - new Date(a.created_at)));
    setTravels(newTravels);
  },[sortType,travels[0]])

  return (
    <div 
    className="community-page" 
    ref={outSection} 
    onClick={(e)=>{
      if(outSection.current === e.target) {
          setRelatedSearch(false);
      }}}>
      <Nav /> 
      <Link to="/story/write">
        <img src={write} alt="writeButton" id="writeBtn"/>
      </Link>
      <div id="body">
        {/* 검색바 */}
        <div className="search-bar" id="searchBar" ref={myElementRef}>
          <img style={{cursor:"pointer"}} src={searchLogo} onClick={onClick}/>
          <input type="text" placeholder="어떤 여행이 궁금하신가요?" className="search-bar-input" onChange={onChange}/>
        </div>
        {/* 연관검색어 */}
        {relatedSearch&&(
          <div className="related-search-box" style={{top:{topPosition}}}>
            {relatedList
            &&
            relatedList.map((v,index)=>(
              <div 
              className="related-search-list" 
              onClick={(v)=>{onClick(v)}}
              >
                <div className="mark-icon">
                  <Marker id="marker" height={17} width={15} fill="#FFFFFF"/>
                </div>
                <div className="related-keyword">
                  {v}
                </div>
              </div>
            ))
            }
          </div>
          )
        }
        {/* 정렬 버튼 */}
        <div className="sort-btn">
          <select 
          onChange={changeSortType} 
          style={{width:"80px",fontSize:"15px", fontWeight:"550"}}>
            {sortOptions.map((v, index) => {
              return <option key={index} className="sort-type">{v}</option>;
            })}
          </select>
        </div>
        {/* 여행카드 리스트 */}
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
                  pick={scrapList.findIndex(i=>i.pid === travel.pid) === -1 ? false : true} />
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
        {/* 페이징 */}
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
