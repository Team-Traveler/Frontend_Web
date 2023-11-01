import React, { useState } from "react";
// 여행 스타일 선택

const choiceStyle = {
  backgroundColor: "rgb(156, 184, 148)",
  fontSize: "large",
  fontWeight : "500",
  color : "white",
  borderRadius: "20px",
  width: "90px",
  height : "35px",
  textAlign : "center",
  paddingTop: "5px",
  marginRight : "5px",
  border: "none"
}

const wrapStyle = {
  display: "flex",
  flexDirection: "row",
  justifyvalue: "space-between",
  alignItems: "center",
  width : "65%"
}

function TravelCard(props) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
    <div className="xtravel-card-info" style={{wrapStyle}}>
      <select className="travelConcept" id="select" style={choiceStyle} onChange={(e)=>{props.setWhat(e.target.value);}}>
          <option value="여행 컨셉">컨셉</option>
          <option value={1}>경치관람</option>
          <option value={2}>먹방</option>
          <option value={3}>엑티비티</option>
          <option value={4}>체험</option>
          <option value={5}>카페</option>
        </select>
        <select className="travelIntensity" id="select" style={choiceStyle} onChange={(e)=>{props.setHard(e.target.value);}}>
          <option value="여행 강도">강도</option>
          <option value={1}>엑티비티</option>
          <option value={2}>여유롭게</option>
          <option value={3}>보통</option>
          <option value={4}>바쁘게</option>
        </select>
        <select className="travelWith" id="select" style={choiceStyle} onChange={(e)=>{props.setWithwho(e.target.value);}}>
          <option value="누구와">누구와?</option>
          <option value={1}>친구랑</option>
          <option value={2}>가족과</option>
          <option value={3}>연인과</option>
          <option value={4}>혼자서</option>
        </select>
      </div>
    </div>
  );
}
export default TravelCard;
