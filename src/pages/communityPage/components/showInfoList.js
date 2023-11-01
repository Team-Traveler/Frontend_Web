import React, { useState } from "react";
import {useParams } from "react-router-dom";
import "./showInfoList.css";
import {useRecoilValue } from "recoil";
import { travelsSelector } from "../../../recoil/atoms/travelsreviewStates";
import {BsPersonCircle} from 'react-icons/bs';
import {GiPositionMarker} from 'react-icons/gi';

function ShowInfoList() {
  const travels = useRecoilValue(travelsSelector);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const { tid } = useParams();

  // tid에 해당하는 데이터를 필터링합니다
  const travel = travels.find((travel) => travel.tid === parseInt(tid, 10));
  if (!travel) {
    return <div>Data not found for tid: {tid}</div>;
  }

  return (
    <div className="info-list-box">
      <div className="info-user">
        <BsPersonCircle style={{color:"gray", fontSize:"30px"}}/> 
        <span>userId</span>
      </div>
      <div className="info-title">
        <h1> {travel.title} </h1>
        <span> {travel.location} | {travel.period} </span>
        <span> {travel.stardate} ~ {travel.enddate} </span>
      </div>
      <div className="info-travel">
        <div className="info-travel-title">
          <GiPositionMarker style={{color:"rgb(156, 184, 148)",fontSize:"30px"}}/> <span> 추천 장소 </span>
        </div>
        <div className="info-travel-content" id="recommended">
          속초 중앙시장, 어쩌구바다, 어쩌구횟집
        </div>
        <div className="info-travel-title">
          <GiPositionMarker style={{color:"rgb(156, 184, 148)",fontSize:"30px"}}/> <span> Good </span>
        </div>
        <div className="info-travel-content" id="good">
          {travel.goodPoints}
        </div>
        <div className="info-travel-title">
          <GiPositionMarker style={{color:"rgb(156, 184, 148)",fontSize:"30px"}}/> <span> Bad </span>
        </div>
        <div className="info-travel-content" id="bad">
          {travel.badPoints}
        </div>        
        <div className="info-travel-title">
            <GiPositionMarker style={{color:"rgb(156, 184, 148)", fontSize:"30px"}}/> <span> 한줄 평 </span>
        </div>
        <div className="info-travel-content" id="review">
          {travel.oneLineReview}
        </div>
      </div>
      <div className="info-hashtag">
        {travel.hashtags.map((value)=>(<span>#{value} </span>))}
      </div>
    </div>
  );
}

export default ShowInfoList;
