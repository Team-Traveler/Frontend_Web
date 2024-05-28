import React, { useState} from "react";
import { useRecoilState, useSetRecoilState } from "recoil"; 
import './trip.css';
import { useNavigate } from 'react-router-dom';
// 여행 스타일 선택
import { selectedTIDState } from "../../../recoil/atoms/travelSpecificState";

function TravelCard({setWhat,setHard,setWithwho,flag,what,withwho,hard,tid}) {
  const navigate = useNavigate();
  const whatArray = ['힐링','관광','액티비티','먹방','체험','카페'];
  const hardArray = ['','빡빡하게','보통','느긋하게'];
  //const withwhoArray = ['친구랑','가족과','연인과','혼자서'];

  
  if(flag){ // 이미 값이 설정돼있으면
    return(
    <div className="xinfo-box">
      <div className="xinfo-square">
        <div className="xinfo-square-content">
            {whatArray[what-1]}
        </div>
        <div className="xinfo-square-content">
            {hardArray[hard-1]}
        </div>
        <div className="xinfo-square-content">
            {withwho} 명
        </div>
      </div>
      <div className="course-detail-btn" onClick={()=>{navigate(`/story/course/${tid}`)}}>
        코스 보기
      </div>
    </div>
    )
  }
  else{
    return( // 사용자가 선택해야되면 
      <div className="xinfo-square">
        <select 
          className="xinfo-square-content"  
          onChange={(e)=>{setWhat(e.target.value);}}>
          <option value="여행 컨셉">컨셉</option>
          <option value={1}>힐링</option>
          <option value={2}>관광</option>
          <option value={3}>액티비티</option>
          <option value={4}>체험</option>
          <option value={5}>먹방</option>
          <option value={6}>카페</option>
        </select>
        <select className="xinfo-square-content" 
        onChange={(e)=>{setHard(e.target.value);}}>
          <option value="여행 강도">강도</option>
          <option value={2}>빡빡하게</option>
          <option value={3}>보통</option>
          <option value={4}>느긋하게</option>
        </select>
        <select className="xinfo-square-content" 
        onChange={(e)=>{setWithwho(e.target.value);}}>
          <option value="누구와">누구와</option>
          <option value={1}>1명</option>
          <option value={2}>2명</option>
          <option value={3}>3명</option>
          <option value={4}>4명</option>
          <option value={5}>5명</option>
          <option value={6}>6명</option>
          <option value={7}>7명</option>
          <option value={8}>8명</option>
          <option value={9}>9명</option>
          <option value={10}>10명이상</option>
        </select>
      </div>
    );
  }
}
export default TravelCard;
