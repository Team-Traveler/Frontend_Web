import React, { useState } from "react";
import "./community.css";
import axios from "axios";
import { Pagination } from "antd";
import Nav from "../../../components/Nav/Nav";
import {
  HeartOutlined,
  ShareAltOutlined,
  CommentOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import button1 from "../../../assets/images/Group 533.svg";
import button2 from "../../../assets/images/Ellipse 7.svg";
import search from "../../../assets/images/Search.png";
import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { travelsSelector } from '../../../recoil/atoms/travelsreviewStates';

function CommunityPage() {
  const travels = useRecoilValue(travelsSelector);
  const [starred, setStarred] = useState(new Array(travels.length).fill(false));

  const handleStarClick = async (pId, index) => {
    try {
      console.log('별 클릭 이벤트 발생');
      const response = await axios.post(`/post/${pId}/scrap`);
      if (response.status === 200) {
        const newStarred = [...starred];
        newStarred[index] = !newStarred[index];
        setStarred(newStarred);
        console.log('성공');
      }
    } catch (error) {
      console.error('Error while scraping:', error);
    }
  };

  return (
    <div className="community-page">
      <Nav />
      <div className="custom-button">
        <Link to="/search">
          <img src={button2} alt="button1" className="button2" />
        </Link>
        <Link to="/new">
          <img src={button1} alt="button2" className="button1" />
        </Link>
      </div>
      <div className="search-button">
        <Link to="/story/search">
          <img src={search} alt="search" className="search" />
        </Link>
      </div>

      <div id="body">
        <div id="product-list">
          {travels.map((travel, index) => (
            <div className="product-card" key={travel.pid}>
              <div className="product-img-container">
                <Link to={`/story/${travel.tid}`}>
            
                
                  <img
                    className="product-img"
                    src={travel.imageUrl}
                    alt={`Travel ${index}`}
                  />
                </Link>
                <div className="favorite-icon" onClick={() => handleStarClick(travel.tid, index)}>
                  {starred[index] ? <StarFilled /> : <StarOutlined />}
                </div>
                <div className="icons-bottom">
                  <CommentOutlined className="comment-icon" />
                  <ShareAltOutlined className="share-icon" />
                  <HeartOutlined className="heart-icon" />
                </div>
              </div>
              <div className="product-contents">
                <span className="product-oneline">
                  {travel.oneLineReview}
                </span>{" "}
                <span className="product-traveler">
                  {travel.title}
                </span>
                <span className="tag">#{travel.hashtags[0]} #{travel.hashtags[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        id="footer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
}

export default CommunityPage;


// import React, { useState } from "react";
// import "./community.css";
// import { Pagination } from "antd";
// import Nav from "../Nav/Nav";
// import {
//   HeartOutlined,
//   ShareAltOutlined,
//   CommentOutlined,
//   HeartFilled,

// } from "@ant-design/icons";
// import button1 from "./Group 533.svg";
// import button2 from "./Ellipse 7.svg";
// import search from "./Search.png";
// import { Link } from "react-router-dom";
// import image1 from "./images/1.jpg";
// import image2 from "./images/2.jpg";
// import image3 from "./images/3.jpg";
// import image4 from "./images/4.jpg";
// import image5 from "./images/5.jpg";
// import image6 from "./images/6.jpg";
// import image7 from "./images/7.jpg";
// import image8 from "./images/8.jpg";
// const travels = [
//   {
//     id: 1,
//     tag: "바다",
//     location: "강릉 시장",
//     good: "바다 색이 너무 이뻐요",
//     bad: "날이 더워요",
//     oneline: "행복한 여행이였다",
//     sharing: "응",
//     travel: "강릉 3박 4일",
//     when: "2023/05/08-2023/05/12",
//     imageUrl: image1,
//   },
//   {
//     id: 2,
//     tag: "힐링",
//     location: "강릉 시장",
//     good: "바다 색이 너무 이뻐요",
//     bad: "날이 더워요",
//     oneline: "친구들과 힐링여행",
//     sharing: "응",
//     travel: "양양 1박 2일",
//     when: "2023/05/08-2023/05/12",
//     imageUrl: image2,
//   },
//   {
//     id: 3,
//     tag: "봄",
//     location: "강릉 시장",
//     good: "바다 색이 너무 이뻐요",
//     bad: "날이 더워요",
//     oneline: "봄 여행은 행복해요",
//     sharing: "응",
//     travel: "부산 3박 4일",
//     when: "2023/05/08-2023/05/12",
//     imageUrl: image3,
//   },
//   {
//     id: 4,
//     tag: "단양",
//     location: "강릉 시장",
//     good: "바다 색이 너무 이뻐요",
//     bad: "날이 더워요",
//     oneline: "단양에서 다이빙",
//     sharing: "응",
//     travel: "단양 3박 4일",
//     when: "2023/05/08-2023/05/12",
//     imageUrl: image4,
//   },
//   {
//     id: 5,
//     tag: "사랑",
//     location: "강릉 시장",
//     good: "바다 색이 너무 이뻐요",
//     bad: "날이 더워요",
//     oneline: "남편과 오랜만에 떠난 여행",
//     sharing: "응",
//     travel: "용인 3박 4일",
//     when: "2023/05/08-2023/05/12",
//     imageUrl: image5,
//   },
//   {
//     id: 6,
//     tag: "푸른 바다",
//     location: "강릉 시장",
//     good: "바다 색이 너무 이뻐요",
//     bad: "날이 더워요",
//     oneline: "언제나 예쁜 여수",
//     sharing: "응",
//     travel: "여수 3박 4일",
//     when: "2023/05/08-2023/05/12",
//     imageUrl: image6,
//   },
//   {
//     id: 7,
//     tag: "우정",
//     location: "강릉 시장",
//     good: "바다 색이 너무 이뻐요",
//     bad: "날이 더워요",
//     oneline: "친구들과 우정여행",
//     sharing: "응",
//     travel: "여수 2박 3일",
//     when: "2023/05/08-2023/05/12",
//     imageUrl: image7,
//   },
//   {
//     id: 8,
//     tag: "부산",
//     location: "강릉 시장",
//     good: "바다 색이 너무 이뻐요",
//     bad: "날이 더워요",
//     oneline: "혼자 떠났던 여행",
//     sharing: "응",
//     travel: "부산 3박 4일",
//     when: "2023/05/08-2023/05/12",
//     imageUrl: image8,
//   },
// ];

// function MainPage() {
//   return (
//     <div className="community-page">
//       <Nav />
//       <div className="custom-button">
//         <Link to="/search">
//           <img src={button2} alt="button1" className="button2" />
//         </Link>
//         <Link to="/new">
//           <img src={button1} alt="button2" className="button1" />
//         </Link>
//       </div>
//       <div className="search-button">
//         <Link to="/search">
//           <img src={search} alt="search" className="search" />
//         </Link>
//       </div>
//       <div id="body">
//         <div id="product-list">
//           {travels.map((travel, index) => (
//             <Travelscard key={index} {...travel} />
//           ))}
//         </div>
//       </div>
//       <div
//         id="footer"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Pagination defaultCurrent={1} total={50} />
//       </div>
//     </div>
//   );
// }

// function Travelscard({
//   id,
//   tag,
//   location,
//   good,
//   bad,
//   oneline,
//   sharing,
//   travel,
//   when,
//   imageUrl,
// }) {
//   const [starred, setStarred] = useState(Array(travels.length).fill(false));

//   const handleStarClick = (index) => {
//     const newStarred = [...starred];
//     newStarred[index] = !newStarred[index];
//     setStarred(newStarred);
//   };

//   return (
//     <div className="product-card" key={id}>
//       <div className="product-img-container">
//         <Link to={`/${id}`}>
//           <img className="product-img" src={imageUrl} alt={`Product ${id}`} />
//         </Link>
//         <div
//           className={`favorite-icon ${starred[id - 1] ? "filled" : ""}`}
//           onClick={() => handleStarClick(id - 1)}
//         >
//           {starred[id - 1] ? <HeartFilled /> : <HeartOutlined />}
//         </div>
//         <div className="icons-bottom">
//           <CommentOutlined className="comment-icon" />
//           <ShareAltOutlined className="share-icon" />
//           <HeartOutlined className="heart-icon" />
//         </div>
//       </div>
//       <div className="product-contents">
//         <span className="product-oneline">{oneline}</span>{" "}
//         <span className="product-traveler">{travel}</span>
//         <span className="tag">#{tag}</span>
//       </div>
//     </div>
//   );
// }

// export default MainPage;

// {product.oneline}>>{travel.oneline}
// {product.destination}>>{travel.travel}
// {travel.tag}#해시태그
// import React, { useState } from "react";
// import "./community.css";
// import { Pagination } from "antd";
// import Nav from "../Nav/Nav";
// import {
//   HeartOutlined,
//   ShareAltOutlined,
//   CommentOutlined,
//   HeartFilled,
// } from "@ant-design/icons";
// import button1 from "./Group 533.svg";
// import button2 from "./Ellipse 7.svg";
// import search from "./Search.png";
// import { Link } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { travelsreviewState } from "../recoil/atoms/travelsreviewStates";

// function MainPage() {
//   const [travels, setTravels] = useRecoilState(travelsreviewState);
//   const [starred, setStarred] = useState(Array(travels.length).fill(false));

//   const handleStarClick = (index) => {
//     const newStarred = [...starred];
//     newStarred[index] = !newStarred[index];
//     setStarred(newStarred);
//   };

//   return (
//     <div className="community-page">
//       <Nav />
//       <div className="custom-button">
//         <Link to="/search">
//           <img src={button2} alt="button1" className="button2" />
//         </Link>
//         <Link to="/new">
//           <img src={button1} alt="button2" className="button1" />
//         </Link>
//       </div>
//       <div className="search-button">
//         <Link to="/search">
//           <img src={search} alt="search" className="search" />
//         </Link>
//       </div>
//       <div id="body">
//         <div id="product-list">
//           {travels.map((travel, index) => (
//             <Travelscard
//               key={index}
//               {...travel}
//               starred={starred[index]} // starred 상태 전달
//               onStarClick={() => handleStarClick(index)}
//             />
//           ))}
//         </div>
//       </div>
//       <div
//         id="footer"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Pagination defaultCurrent={1} total={50} />
//       </div>
//     </div>
//   );
// }

// function Travelscard({
//   id,
//   tag,
//   location,
//   good,
//   bad,
//   oneline,
//   sharing,
//   travel,
//   when,
//   imageUrl,
//   starred, // starred 상태 전달 받음
//   onStarClick,
// }) {
//   return (
//     <div className="product-card" key={id}>
//       <div className="product-img-container">
//         <Link to={`/${id}`}>
//           <img className="product-img" src={imageUrl} alt={`Product ${id}`} />
//         </Link>
//         <div
//           className={`favorite-icon ${starred ? "filled" : ""}`}
//           onClick={onStarClick}
//         >
//           {starred ? <HeartFilled /> : <HeartOutlined />}
//         </div>
//         <div className="icons-bottom">
//           <CommentOutlined className="comment-icon" />
//           <ShareAltOutlined className="share-icon" />
//           <HeartOutlined className="heart-icon" />
//         </div>
//       </div>
//       <div className="product-contents">
//         <span className="product-oneline">{oneline}</span>{" "}
//         <span className="product-traveler">{travel}</span>
//         <span className="tag">#{tag}</span>
//       </div>
//     </div>
//   );
// }

// export default MainPage;
