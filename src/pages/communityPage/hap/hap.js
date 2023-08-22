import React, { useState } from "react";
import Nav from "../../../components/Nav/Nav";
import TravelList from "../components/travel2";
import StarRating from "../components/star";
import ImageUploadBox from "../components/image";
import "./hap.css";
import TravelCard from "../components/trip";

// 이 페이지에서 데이터 가져와서 보여주기
function Hap() {
    return (
        <div className="xcommunity-page">
            <Nav />
            <div className="xcontent-wrapper">
                <div className="xleft-content">
                    <div className="xleft-section">
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
                <div className="xright-section">
                    <TravelList />
                </div>
            </div>
        </div>
    );
}

export default Hap;
