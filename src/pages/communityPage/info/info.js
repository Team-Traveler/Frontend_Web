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
import PickBtnPage from "../components/PickBtn";
import TravelCard from '../components/trip';
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";

// 이 페이지에서 데이터 가져와서 보여주기
function InfoPage() {
    const { pid } = useParams();
    const [travel,setTravel] = useState([]);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [scrapList,setScrapList] = useState([]);
    const [likeList,setLikeList] = useState([]);

    //api 호출(비동기를 처리하기 위해 useEffect 처리)
    const callApi = async() =>{
        await axios.get(`${API.HEADER}/post/${pid}/getOne`)
        .then(response => {
            if(response.data.isSuccess === true){   
                setTravel(response.data.result);
                console.log('글 상세보기 성공',response.data.result);
            }
            else console.log('글 상세보기 실패',response.data);
        })
        .catch(e=>console.log('error',e))
    }
    // 내 찜 목록 api
    const scrapListApi = async()=>{
        await axios.get(`${API.HEADER}/users/myScrap`,{ headers: {Authorization:userInfo.accessToken,}})
        .then(response=>{
            if(response.data.isSuccess){
                setScrapList(response.data.result);
                console.log('내 찜 목록',response.data.result);
            }
            else console.log('찜 목록 불러오기 실패',response.data.result);
        })
        .catch(e=>{console.log('error',e)})
    }

    // 좋아요 여행 리스트 API 호출
    const likeListApi = async()=>{
        await axios.get(`${API.HEADER}/users/myLike`,{ headers: {Authorization:userInfo.accessToken,}})
        .then(response=>{
            if(response.data.isSuccess){
                setLikeList(response.data.result);
                console.log('내 좋아요 목록',response.data.result);
            }
            else console.log('좋아요 목록 불러오기 실패',response.data.result);
        })
        .catch(e=>{console.log('error',e)})
    }

    useEffect(()=>{
        if(userInfo.isLogin){
            scrapListApi();
            likeListApi();
        }
        callApi();
    },[travel[0]]); // travel 자체는 주소이므로 무한 렌더링 발생. 배열 값을 넣어줘야함.
    
    if(travel){
    return (
        <div className="xcommunity-body">
            <Nav />
            <div className="xcommunity-page">
                <div className="xcontent-wrapper">
                    <div className="xleft-section">
                        <TravelCard hard={travel.hard} what={travel.what} withwho={travel.withwho} flag={true}/>
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
                            <HeartBtnPage size="30" pId={pid} count={travel.likes}
                            like={likeList.findIndex(i=>i.postResponse.pid === travel.pid) === -1 ? false : true}/>
                        </div>
                    </div>
                    <div className="pick-btn">
                        <PickBtnPage size="45" pid={pid} pick={scrapList.findIndex(i=>i.pid === travel.pid) === -1 ? false : true} />
                    </div>
                </div>
            </div>
        </div>
    );
    }
}

export default InfoPage;
