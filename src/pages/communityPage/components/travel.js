// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
// import "./travel.css";
// import sss from "./sss.png";
// import sss2 from "./sss2.png";
// import hhh from "./hhh.png";
// import ggg from "./ggg.png";
// import { useRecoilState } from "recoil"; // useRecoilState를 임포트합니다.
// import axios from "axios";
// import { travelsState } from "../../recoil/atoms/travelsListStates";
// // 공유 커뮤니티 글쓰기 컴포넌트
// import { checklistState  } from "../../recoil/atoms/ChecklistState";
// function TravelWrite() {
//   const [travels, setTravels] = useRecoilState(travelsState);
//   const [isChecked, setIsChecked] = useRecoilState(checklistState);

//   const [tag, setTag] = useState("");
//   const [location, setLocation] = useState("");
//   const [good, setGood] = useState("");
//   const [bad, setBad] = useState("");
//   const [oneline, setOneline] = useState("");

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   const handlePostSubmit = () => {
//     const newTravel = {
//       tag: tag,
//       location: location,
//       good: good,
//       bad: bad,
//       oneline: oneline,
//       sharing: isChecked ? "체크리스트" : "가계부",
//     };

//     setTravels([...travels, newTravel]);

//     // 입력값 초기화
//     setTag("");
//     setLocation("");
//     setGood("");
//     setBad("");
//     setOneline("");
//     setIsChecked(false);
//   };

//   return (
//     <div>
//     <div className="travel-card">
//       <div className="travel-card-info">
//         <div className="travel-card-name">
//           #해시태그
//           <img src={hhh} alt="hhh" className="hhh" />
//         </div>
//         <div className="travel-card-category">
//           <input
//             type="text"
//             value={tag}
//             onChange={(e) => setTag(e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
  
//     <div>
//       <div className="travel-card">
//         <div className="travel-card-info">
//           <div className="travel-card-name">
//             위치추가
//             <img src={sss} alt="sss" className="sss" />
//             <img src={sss2} alt="sss2" className="sss2" />
//           </div>
//           <div className="travel-card-category">
//             <input
//               type="text"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
  
//     <div>
//       <div className="travel-card">
//         <div className="travel-card-info">
//           <div className="travel-card-name">
//             good
//             <img src={ggg} alt="ggg" className="ggg1" />
//           </div>
//           <div className="travel-card-category">
//             <input
//               type="text"
//               value={good}
//               onChange={(e) => setGood(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
  
//     <div>
//       <div className="travel-card">
//         <div className="travel-card-info">
//           <div className="travel-card-name">
//             bad
//             <img src={ggg} alt="ggg" className="ggg2" />
//           </div>
//           <div className="travel-card-category">
//             <input
//               type="text"
//               value={bad}
//               onChange={(e) => setBad(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
  
//     <div>
//       <div className="travel-card">
//         <div className="travel-card-info">
//           <div className="travel-card-name">한줄 평 작성</div>
//           <div className="travel-card-category">
//             <input
//               type="text"
//               value={oneline}
//               onChange={(e) => setOneline(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>


//       <div>
//         <div className="travel-card">
//           <div className="travel-card-info">
//             <div className="travel-card-name">나의 노트 공유</div>
//             <div className="travel-card-category">
//             <label className="checkbox-label">
//           <input
//             type="checkbox"
//             checked={isChecked}
//             onChange={handleCheckboxChange}
//           />
//           체크리스트
//         </label>
//         <span className="checkbox-spacing" />
//         <label className="checkbox-label">
//           <input
//             type="checkbox"
//             checked={!isChecked}
//             onChange={handleCheckboxChange}
//           />
//           가계부
//         </label>
//             </div>
//           </div>
//         </div>
//       </div>
    
//   <div>
//     <button className="button" onClick={handlePostSubmit}>
//       글 작성 완료
//     </button>
//   </div>
//     </div>
//   );
// }

// export default TravelWrite;
