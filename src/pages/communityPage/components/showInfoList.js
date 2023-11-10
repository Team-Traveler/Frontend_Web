import React, { useState,useEffect } from "react";
import "./showInfoList.css";
import {BsPersonCircle} from 'react-icons/bs';
import {GiPositionMarker} from 'react-icons/gi';
import { ReactComponent as Marker } from './Vector.svg';

function ShowInfoList({prop}) {
  const [travel,setTravel] = useState(null);
  
  const infoSet = async ()=>{
    if(prop) await setTravel(prop);
  }

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
          <span> {travel.location} | 3박4일 </span>
          <span> 2022.10.09 ~ 2022.10.12 </span>
        </div>
        <div className="info-travel">
          <div className="info-travel-title">
            <Marker height={15} width={15} fill="#9CBBAC"/><span> 추천 장소 </span>
          </div>
          <div className="info-travel-content" id="recommended">
            속초 중앙시장, 어쩌구바다, 어쩌구횟집
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
        </div>
        <div className="info-hashtag">
          {travel.hashtags.map((value,index)=>(<span key={index}>#{value} </span>))}
        </div>
      </div>
    );
  }
}

export default ShowInfoList;
