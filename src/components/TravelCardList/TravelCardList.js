import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../.././recoil/atoms/userState";
import './TravelCardList.css';
import CommentBtnPage from "../../../src/pages/communityPage/components/commentBtn";
import HeartBtnPage from "../../../src/pages/communityPage/components/heartBtn";
import PickBtnPage from "../../../src/pages/communityPage/components/PickBtn";
import axios from "axios";
import { API } from "../../config";

function TravelCardList(){
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [scrapList,setScrapList] = useState([]);
    const [likeList,setLikeList] = useState([]);

    // 찜한 여행 리스트 API 호출
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
    },[]); // 꼭 []안에 넣어주기 안그러면 무한 렌더링됨.

    return(
    <div className="like-travel-list">
        {scrapList.map((travel,index)=>(
        <div className="product-card" key={travel.postResponse.pid}>
            <div className="product-img-container">
                <Link to={`/story/${travel.postResponse.pid}`} key={travel.postResponse.pid}>
                <img
                    className="product-img"
                    src={require("../../../src/assets/images/sea.jpg")}
                    alt={`Travel ${index}`}
                />
                </Link>
                <div className="favorite-icon">
                <PickBtnPage size="40" pid={travel.postResponse.pid} pick={true}/>
                </div>
            </div>
            <div className="product-contents">
                <div className="icons-btn">
                    <CommentBtnPage pId={travel.postResponse.pid} size="20"/>
                    <HeartBtnPage pId={travel.postResponse.pid} count={0} size="20"
                    like={likeList.findIndex(i=>i.postResponse.pid === travel.postResponse.pid) === -1 ? false : true}/>
                </div>
                <span className="product-title">
                {travel.postResponse.title}
                </span>{" "}
                <span style={{color:"white"}}>{travel?.location} | {'2박3일'}</span>
            </div>
        </div>
        ))
        }
    </div>
    );
}

export default TravelCardList;