import './write.css'
import React, { useState } from "react";
import {BsPersonCircle} from 'react-icons/bs';
import Nav from "../../../components/Nav/Nav";
import TravelCard from '../components/trip';
import {GiPositionMarker} from 'react-icons/gi';
import {AiOutlineCamera} from 'react-icons/ai';
import StarRating from '../components/star';
// 이 페이지에서 데이터 가져와서 보여주기
const onClick = (e)=>{
    // API 연결 시 사용

}
function WritePage() {
return (
    <div className="xcommunity-page">
        <Nav />
        <div className="xcontent-wrapper">
            <div className="left-section">
                <TravelCard />
                <div className="img-upload">
                    <AiOutlineCamera style={{fontSize:"100px", color:"gray"}}/>
                </div>
                <div className="star-ratingbar">
                    <StarRating/>
                </div>
            </div>
            <div className="right-section">
                <div className = "input-info-box">
                    <div className="input-user">
                        <BsPersonCircle style={{color:"gray", fontSize:"30px"}}/> 
                        <span>userId</span>
                    </div>
                    <div className="input-title">
                        <input className="input-box" id="title" placeholder="제목 작성"/>
                        <div className="input-travel-info">
                        </div>
                        <div className='input-travel-date'>
                        </div>
                    </div>
                    <div className="input-travel">
                        <div className="input-travel-title">
                            <GiPositionMarker style={{color:"rgb(156, 184, 148)",fontSize:"30px"}}/> 
                            <span> 추천 장소 </span>
                        </div>
                        <div className="input-travel-content">
                            <input id="recommended" placeholder="추천 장소 추가"/>
                        </div>
                        <div className="input-travel-title">
                            <GiPositionMarker style={{color:"rgb(156, 184, 148)",fontSize:"30px"}}/> 
                            <span> Good </span>
                        </div>
                        <div className="input-travel-content" >
                            <input id="good" placeholder="장점 작성"/>
                        </div>
                        <div className="input-travel-title">
                            <GiPositionMarker style={{color:"rgb(156, 184, 148)",fontSize:"30px"}}/> 
                            <span> Bad </span>
                        </div>
                        <div className="input-travel-content" >
                            <input id="bad" placeholder="단점 작성"/>
                        </div>        
                        <div className="input-travel-title">
                            <GiPositionMarker style={{color:"rgb(156, 184, 148)", fontSize:"30px"}}/> 
                            <span> 한줄 평 </span>
                        </div>
                        <div className="input-travel-content" >
                            <input id="review" placeholder="한줄 평 작성"/>
                        </div>
                    </div>
                    <div className="input-travel-content">
                        <input id="hashtag" placeholder="해시태그 작성"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer">
            <button className="submit-btn" onClick={onClick}> 게시하기 </button>
        </div>
    </div>
);
}

export default WritePage;
