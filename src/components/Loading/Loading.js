import './Loading.css';
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from '../../recoil/atoms/userState';
import { Progress } from 'antd';
import { useNavigate } from "react-router-dom";

function LoadingModal(){
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const navigate = useNavigate();
    const [percent,setPercent] = useState(0);

    useEffect(()=>{
        const id = setInterval(()=>{
            setPercent((percent)=>percent+1);
        },4000/100)

        if(percent === 100)
            //navigate("/recommendCompleted");
            clearInterval(id);

    },[percent]);

    return(
        <div className="loading-modal">
            <div className='loading-box'>
                <div className="loading-text-box">
                    <div className='loading-text'>
                    <span style={{fontSize:"16px", fontWeight:"400"}}>{userInfo.nickname}님의 취향에 맞게</span>
                    </div>
                    <div className='loading-text'>
                        <span id='emphasis'>여행 계획</span>을
                    </div>
                    <div className='loading-text'>
                    <span>구성중입니다!</span>
                    </div>
                </div>
                <div className="loading-spinner">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <Progress 
                className="progress-bar" 
                percent={percent}
                strokeColor={"#98B4A6"}
                trailColor={"white"}
                size={[900,30]}
                />
            </div>
        </div>     
    )
}

export default LoadingModal;