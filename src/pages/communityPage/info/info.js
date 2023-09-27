import './info.css'
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { travelsSelector } from '../../../recoil/atoms/travelsreviewStates';
import Nav from "../../../components/Nav/Nav";
import ShowInfoList from "../components/showInfoList";
import ShowRatingbarPage from "../components/showRatingBar";
import ShowImagePage from "../components/showImage";
import CommentBtnPage from "../components/commentBtn";
import HeartBtnPage from "../components/heartBtn";
import PickBtnPage from "../components/pickBtn";

// 이 페이지에서 데이터 가져와서 보여주기
function InfoPage() {
    const { tid } = useParams();
    const travels = useRecoilValue(travelsSelector);
    // :tid에 해당하는 여행정보 가져오기
    const travel = travels[tid-1]

    return (
        <div className="xcommunity-page">
            <Nav />
            <div className="xcontent-wrapper">
                <div className="xleft-section">
                    <div className="info-square">
                        <div className="info-square-concept">{travel.concept}</div>
                        <div className="info-square-intensity">{travel.intensity}</div>
                        <div className="info-square-who">{travel.who}</div>
                    </div>
                    <div className="img-box">
                        <ShowImagePage pId={tid}/>
                    </div>
                    <div className="star-ratingbar">
                        <ShowRatingbarPage 
                            intensity={travel.intensityRating} 
                            concept={travel.conceptRating} 
                            totalStar={travel.totalRating}
                        />
                    </div>
                </div>
                <div className="xright-section">
                    <ShowInfoList />
                </div>
            </div>
            <div id="footer">
                <div className="icon-btn">
                    <div className="comment-btn">
                        <CommentBtnPage size="30" pId={tid}/>
                    </div>
                    <div className="heart-btn">
                        <HeartBtnPage size="30" pId={tid}/>
                    </div>
                </div>
                <div className="pick-btn">
                    <PickBtnPage size="45" pId={tid}/>
                </div>
            </div>
        </div>
    );
}

export default InfoPage;
