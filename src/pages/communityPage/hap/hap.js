import React, { useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import Nav from "../../../components/Nav/Nav";
import TravelList from "../components/travel2";
import StarRating from "../components/star";
import ImageUploadBox from "../components/image";
import "./hap.css";
import TravelCard from "../components/trip"

// 이 페이지에서 데이터 가져와서 보여주기
function Hap() {
  return (    
    <div className="community-page" >
      <Nav />
      <div className="content-wrapper">
        <div className="left-content">
          <div className="left-section">
            <div>
              <TravelCard />
            </div>
            <div>
              <ImageUploadBox />
            </div>
            <div>
              <StarRating />
            </div> 
          </div>
        </div>
        <div className="right-section">
          <TravelList />
        </div>
      </div>
    </div>
  );
}

export default Hap;