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
  justifyContent: "space-between",
  alignItems: "center",
  width : "65%"
}

function TravelCard() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div>
    <div className="xtravel-card-info" style={{wrapStyle}}>
      <select className="travelConcept" id="select" style={choiceStyle}>
          <option value="여행 컨셉">컨셉</option>
          <option value="경치관람">경치관람</option>
          <option value="먹방">먹방</option>
          <option value="엑티비티">엑티비티</option>
          <option value="체험">체험</option>
          <option value="카페">카페</option>
        </select>
        <select className="travelIntensity" id="select" style={choiceStyle}>
          <option value="여행 강도">강도</option>
          <option value="엑티비티">엑티비티</option>
          <option value="여유롭게">여유롭게</option>
          <option value="보통">보통</option>
          <option value="바쁘게">바쁘게</option>
        </select>
        <select className="travelWith" id="select" style={choiceStyle}>
          <option value="누구와">누구와?</option>
          <option value="친구랑">친구랑</option>
          <option value="가족과">가족과</option>
          <option value="연인과">연인과</option>
          <option value="혼자서">혼자서</option>
        </select>
      </div>
    </div>
  );
}
export default TravelCard;
