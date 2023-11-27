import React, { useState } from "react";
import './trip.css';
// 여행 스타일 선택

function TravelCard({setWhat,setHard,setWithwho,flag,what,who,hard}) {
  const whatArray = ['경치관람','먹방','액티비티','체험','카페'];
  const hardArray = ['액티비티','여유롭게','보통','바쁘게'];
  const withwhoArray = ['친구랑','가족과','연인과','혼자서'];

  if(flag){ // 이미 값이 설정돼있으면
    return(
    <div className="xinfo-square">
      <div className="xinfo-square-content">
          {whatArray[what-1]}
      </div>
      <div className="xinfo-square-content">
          {hardArray[hard-1]}
      </div>
      <div className="xinfo-square-content">
          {withwhoArray[who-1]}
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
          <option value={1}>경치관람</option>
          <option value={2}>먹방</option>
          <option value={3}>엑티비티</option>
          <option value={4}>체험</option>
          <option value={5}>카페</option>
        </select>
        <select className="xinfo-square-content" 
        onChange={(e)=>{setHard(e.target.value);}}>
          <option value="여행 강도">강도</option>
          <option value={1}>엑티비티</option>
          <option value={2}>여유롭게</option>
          <option value={3}>보통</option>
          <option value={4}>바쁘게</option>
        </select>
        <select className="xinfo-square-content" 
        onChange={(e)=>{setWithwho(e.target.value);}}>
          <option value="누구와">누구와</option>
          <option value={1}>친구</option>
          <option value={2}>가족</option>
          <option value={3}>연인</option>
          <option value={4}>혼자</option>
        </select>
      </div>
    );
  }
}
export default TravelCard;
