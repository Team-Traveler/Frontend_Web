import React, { useState } from "react";
// 여행 스타일 선택
import { useRecoilState, useRecoilValue } from "recoil";
import {
  travelsSelector,
  travelByIdSelector,
}  from "../../../recoil/atoms/travelsreviewStates";
const travels = [
  {
    tag: "초당 옥수수",
    location: "강릉 시장",
    good: "바다 색이 너무 이뻐요",
    bad: "날이 더워요",
    oneline: "7/4",
    sharing: "yes",
    travel: "부산 여행 1박 2일",
    when: "2023/05/08-2023/05/12",
  },
];
function TravelCard() {
  const [isChecked, setIsChecked] = useState(false);


  function TravelCard({
    tag,
    location,
    good,
    bad,
    oneline,
    sharing,
    travel,
    when,
  }) {
    return (
      <div>
      <div className="travel-card-info" style={{ marginLeft: 30 }}>
        <div
          className="travel-card-travel"
          style={{
            fontFamily: "Pretendard",
            fontSize: "28px",

            fontWeight: 200,
            lineHeight: "33px",
            letterSpacing: "0em",
            textAlign: "left",
            /* 추가적인 스타일을 여기에 정의할 수 있습니다 */
          }}
        >
          {" "}
          {travel}
        </div>
        <div className="travel-card-when"> {when}</div>
        <br></br>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <select
            name="travelConcept"
            id="concept"
            style={{
              marginRight: "10px",
              background: "#95D88A",
              textAlign: "center",
              fontFamily: "Pretendard",
              fontSize: "16px",
              fontWeight: 200,
              lineHeight: "19px",
              letterSpacing: "0em",
              borderRadius: "10px", // 둥글게 설정
              padding: "5px 10px",
              color: "white",
              border: "none",
            }}
          >
            <option value="여행 컨셉">먹방</option>
            <option value="경치관람">경치관람</option>
            <option value="먹방">먹방</option>
            <option value="엑티비티">엑티비티</option>
            <option value="체험">체험</option>
            <option value="카페">카페</option>
          </select>
          <select
            name="travelIntensity"
            id="intensity"
            style={{
              marginRight: "10px",
              background: "#95D88A",
              textAlign: "center",
              fontFamily: "Pretendard",
              fontSize: "16px",
              fontWeight: 200,
              lineHeight: "19px",
              letterSpacing: "0em",
              borderRadius: "10px", // 둥글게 설정
              padding: "5px 10px",
              color: "white",
              border: "none",
            }}
          >
            <option value="여행 강도">엑티비티</option>
            <option value="엑티비티">엑티비티</option>
            <option value="여유롭게">여유롭게</option>
            <option value="보통">보통</option>
            <option value="바쁘게">바쁘게</option>
          </select>
          <select
            name="travelIntensity"
            id="intensity"
            style={{
              marginRight: "10px",
              background: "#95D88A",
              textAlign: "center",
              fontFamily: "Pretendard",
              fontSize: "16px",
              fontWeight: 200,
              lineHeight: "19px",
              letterSpacing: "0em",
              borderRadius: "10px", // 둥글게 설정
              padding: "5px 10px",
              color: "white",
              border: "none",
            }}
          >
            <option value="누구와">친구랑</option>
            <option value="친구랑">친구랑</option>
            <option value="가족과">가족과</option>
            <option value="연인과">연인과</option>
            <option value="혼자서">혼자서</option>
          </select>
          {/* <input type="submit" value="Submit" style={{ marginLeft: "10px" }} /> */}
        </div>
        </div>
        {/* <Link to="/일정보기"> */}
        <h5
          style={{
           top:"30px",
    position: "absolute",
    width: "52px",
    height: "px",
    top: "100px",
    left: "486px",
    borderBottom: "1px solid black",
    whiteSpace: "nowrap",
  }}
        >
        
  일정보기
          </h5>
          {/* </Link>  */}
        </div>
    );
  }
  return (
    <div>
      {travels.map((travel, index) => (
        <TravelCard key={index} {...travel} />
      ))}
    </div>
  );
}
export default TravelCard;
