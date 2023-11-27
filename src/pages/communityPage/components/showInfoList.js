import React, { useState,useEffect } from "react";
import "./showInfoList.css";
import {BsPersonCircle} from 'react-icons/bs';
import {GiPositionMarker} from 'react-icons/gi';
import { ReactComponent as Marker } from './Vector.svg';
import CountDay from "./countDay";
import { Checkbox } from 'antd';

function ShowInfoList({prop}) {
  const [travel,setTravel] = useState(null);
  // 체크 박스
  const [checklist, setChecklist] = useState(false);
  const [book, setBook] = useState(false);

  const infoSet = async ()=>{
    if(prop) await setTravel(prop);
  }
  // 체크 박스 핸들러
  const onChangeCheckBox1 = (e) => {
    setChecklist(!checklist);
    console.log('체크리스트 공유 선택', checklist);
  };

  const onChangeCheckBox2 = (e) => {
      setBook(!book);
      console.log('가계부 공유 선택', book);
  };

  useEffect(()=>{
    infoSet();
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
          <span> 2022.10.09 ~ 2022.10.12 </span>
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
          <div className="input-travel-content" >
              <Checkbox onChange={onChangeCheckBox1}>체크리스트</Checkbox>
              <Checkbox  style={{marginLeft:"10px"}} onChange={onChangeCheckBox2}>가계부</Checkbox>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowInfoList;
