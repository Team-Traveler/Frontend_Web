import React, { useState,useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./showInfoList.css";
import { ReactComponent as Marker } from './Vector.svg';
import CountDay from "./countDay";
import { Checkbox } from 'antd';
import { ReactComponent as Check} from './Check.svg';
import Modal from "../../../components/Modal/Modal";
import AccountBook from "../../NotePage/AccountBook/AccountBook";
import { API } from "../../../config";

function ShowInfoList({prop}) {
  const location = useLocation();
  const [travel,setTravel] = useState(null);
  const [showCheckList, setShowCheckList] = useState(false);
  const [showBook, setShowBook] = useState(false);

  const check = [
    {
      "cid": 1,
      "title": "2023년 8월",
      "tid": 40,
      "items": [
        {
          "id": 1,
          "name": "아쿠아 슈즈",
          "isChecked": false,
        },
        {
          "id": 2,
          "name": "호텔 예약",
          "isChecked": false,
        },
      ],
    },
    {
      "cid": 2,
      "title": "2023년 9월",
      "tid": 40,
      "items": [
        {
          "id": 1,
          "name": "클렌징폼",
          "isChecked": false,
        },
        {
          "id": 2,
          "name": "우산",
          "isChecked": false,
        },
      ],
    },
    {
      "cid": 3,
      "title": "2023년 10월",
      "tid": 40,
      "items": [
        {
          "id": 1,
          "name": "운동화",
          "isChecked": false,
        },
        {
          "id": 2,
          "name": "수건",
          "isChecked": false,
        },
      ],
    },
  ];
  const [checkList, setCheckList] = useState(check);

  const infoSet = async ()=>{
    if(prop){ 
      await setTravel(prop);
    }
  } 

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('url 링크',text)
    } catch (err) {
      console.log(err);
    }
  }

  //체크리스트 조회
  const fetchCheckList = async () => {
    try {
        const response = await axios.get(`${API.HEADER}/checklist/travel/${travel.tid}`);
        console.log("체크리스트 조회 성공");
        console.log(
            "체크리스트 조회 response.data.result : ",
            response.data.result
        );
        setCheckList(response.data.result);
    } catch (error) {
        console.log("체크리스트 조회 실패");
        console.log(error);
    }
  };

  useEffect(()=>{
    infoSet();
    if(prop.noteStatus !== 0){
      fetchCheckList();
    }
  },[prop])

  if(travel && travel.title){
    return (
      <div className="info-list-box">
        <div className="info-user">
          <div className='profile-box'>
            <img src={travel.user.profile_image_url}/> 
          </div> 
          <span>{travel.user.nickname}</span>
        </div>
        <div className="info-title">
          <span id="info-title"> {travel.title} </span>
          <span> {travel.location} | 
          <CountDay start_date={travel.travel.start_date} end_date={travel.travel.end_date}/> </span>
          <span> {travel.travel.start_date.substr(0,10)} ~ {travel.travel.end_date.substr(0,10)} </span>
        </div>
        <div className="copy-btn" onClick={() => handleCopyClipBoard(`${location.pathname}`)}>
          <span>URL 복사</span>
        </div>
        <div className="info-travel">
          <div className="info-travel-title">
            <Marker height={15} width={15} fill="#9CBBAC"/><span> 추천 장소 </span>
          </div>
          <div className="info-travel-content" id="recommended">
            {travel.hashtags.map((value,index)=>(<span key={index}>#{value} </span>))}
          </div>
          <div className="info-travel-title">
            <Marker height={15} width={15} fill="#9CBBAC"/> <span> Good </span>
          </div>
          <div className="info-travel-content" id="good">
            {travel.goodPoints}
          </div>
          <div className="info-travel-title">
            <Marker height={15} width={15} fill="#9CBBAC"/> <span> Bad </span>
          </div>
          <div className="info-travel-content" id="bad">
            {travel.badPoints}
          </div>        
          <div className="info-travel-title">
            <Marker height={15} width={15} fill="#9CBBAC"/> <span> 한줄 평 </span>
          </div>
          <div className="info-travel-content" id="review">
            {travel.oneLineReview}
          </div>
          <div className="input-travel-title">
              <Marker height={15} width={20} fill=" #98B4A6"/> 
              <span> 나의 노트 공유 </span>
          </div>
          <div className="info-travel-content" id="checkbox" >
              <span className="checkbox-content" onClick={()=>{if(travel.noteStatus) setShowCheckList(true)}}>
                {travel.noteStatus===3 || travel.noteStatus===2 ? <Check /> : <Checkbox disabled/>} 체크리스트 
              </span>
              <span className="checkbox-content" onClick={()=>{if(travel.noteStatus) setShowBook(true)}}>
                {travel.noteStatus===3 || travel.noteStatus===1 ? <Check /> : <Checkbox disabled/> } 가계부
              </span>
          </div>
        </div>
      {showCheckList && (
        <Modal 
        closeModal={()=>{setShowCheckList(false)}}
        headerTitle={<h3>체크리스트</h3>}
        size={"large"}
        >
          <div className="info-check-list-box">
            {/* return을 안할 시 중괄호가 아닌 소괄호를 사용해야 출력됨 */}
            {checkList&&checkList.map((v,index)=>(
              <div
                  className="info-check-list"
                  key={index}
              >
                <span>{v.title}</span>
                <div className="info-check-list-content">
                  {v.items.map((c,index)=>(
                  <div className="info-check-list-name">
                    {c.name}
                  </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )
      }
      {showBook && (
        <Modal
        closeModal={()=>{setShowBook(false);}}
        headerTitle={<h3>가계부</h3>}
        size={"large"}
        >
          <AccountBook/>
        </Modal>
      )
      }
      </div>
    );
  }
}

export default ShowInfoList;
