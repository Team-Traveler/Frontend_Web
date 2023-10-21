import './info.css'
import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../config";
import Nav from "../../../components/Nav/Nav";
import ShowInfoList from "../components/showInfoList";
import ShowRatingbarPage from "../components/showRatingBar";
import ShowImagePage from "../components/showImage";
import CommentBtnPage from "../components/commentBtn";
import HeartBtnPage from "../components/heartBtn";
import PickBtnPage from "../components/scrapBtn";

// 이 페이지에서 데이터 가져와서 보여주기
function InfoPage() {
    const { pid } = useParams();
    const [travel,setTravel] = useState([]);
    const whatArray = ['경치관람','먹방','액티비티','체험','카페'];
    const hardArray = ['액티비티','여유롭게','보통','바쁘게'];
    const withwhoArray = ['친구랑','가족과','연인과','혼자서'];

    //api 호출(비동기를 처리하기 위해 useEffect 처리)

    const callApi = async() =>{
        await axios.get(`${API.HEADER}/post/${pid}/getOne`)
        .then(response => {
            if(response.data.isSuccess === true){   
                setTravel(response.data.result);
                console.log('성공',travel);
            }
            else console.log('실패',response.data);
        })
        .catch(e=>console.log('error',e))
    }
    useEffect(()=>{
        callApi();
    },[travel[0]]); // travel 자체는 주소이므로 무한 렌더링 발생. 배열 값을 넣어줘야함.
    
    return (
        <div className="xcommunity-page">
            <Nav />
            <div className="xcontent-wrapper">
                <div className="xleft-section">
                    <div className="info-square">
                        <div className="info-square-concept">{whatArray[travel.what-1]}</div>
                        <div className="info-square-intensity">{hardArray[travel.hard-1]}</div>
                        <div className="info-square-who">{withwhoArray[travel.withwho-1]}</div>
                    </div>
                    <div className="img-box">
                        {travel.image_url&&<ShowImagePage img={travel.image_url}/>} 
                    </div>
                    <div className="star-ratingbar">
                        <ShowRatingbarPage 
                            intensity={travel.hardrating} 
                            concept={travel.whatrating} 
                            totalStar={travel.totalrating}
                        />
                    </div>
                </div>
                <div className="xright-section">
                    {travel&&<ShowInfoList prop={travel} />}
                </div>
            </div>
            <div id="footer">
                <div className="icon-btn">
                    <div className="comment-btn">
                        <CommentBtnPage size="30" pId={pid}/>
                    </div>
                    <div className="heart-btn">
                        <HeartBtnPage size="30" pId={pid}/>
                    </div>
                </div>
                <div className="pick-btn">
                    <PickBtnPage size="45" pId={pid}/>
                </div>
            </div>
        </div>
    );
}

export default InfoPage;
