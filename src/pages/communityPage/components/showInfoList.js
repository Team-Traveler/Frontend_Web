import React, { useState,useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./showInfoList.css";
import { ReactComponent as Marker } from './Vector.svg';
import CountDay from "./countDay";
import { Checkbox } from 'antd';
import Modal from "../../../components/Modal/Modal";
import { API } from "../../../config";

function ShowInfoList({prop}) {
  const location = useLocation();
  const [travel,setTravel] = useState(null);
  const [showCheckList, setShowCheckList] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [checkList, setCheckList] = useState([]);
  // 임시
  const [flag1, setFlag1] = useState(true);
  const [flag2, setFlag2] = useState(true);

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

  // 체크리스트 조회
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
    if(flag1){
      fetchCheckList();
    }
    if(flag2){
      
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
          <div className="info-travel-content" >
            <Checkbox onClick={()=>{if(flag1) setShowCheckList(true)}} defaultChecked={true} disabled>체크리스트</Checkbox>
            <Checkbox onClick={()=>{if(flag2) setShowBook(true)}} defaultChecked={false} disabled>가계부</Checkbox>
          </div>
        </div>
      {showBook && (
        <Modal 
        closeModal={()=>{setShowBook(false)}}
        headerTitle={<h3>사야할 것들</h3>}>
          
        </Modal>
      )
      }
      </div>
    );
  }
}

export default ShowInfoList;
