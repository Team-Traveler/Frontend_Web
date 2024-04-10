import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { travelsSelector } from '../../../recoil/atoms/travelsreviewStates';
import { API } from "../../../config";
import { ReactComponent as Marker } from './Vector.svg';
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";

function PickBtnPage({pid,pick}){
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [active,setActive] = useState();

    // 찜 버튼 클릭 시
    const pickClickApi = async()=>{
        await axios.post(`${API.HEADER}/post/${pid}/scrap`,{},
        { headers: {Authorization:userInfo.accessToken,}})
        .then(response=>{
            if(response.data.isSuccess){
                if(response.data.result === '찜 성공!')
                    setActive(true);
                else if(response.data.result === '찜 취소 성공!')
                    setActive(false);
            }
            else{
                console.log('찜 실패',response.data);
            }
        })
        .catch(e=>{ console.log('error',e)})
    }

    useEffect(()=>{
        setActive(pick);
    },[pick])

    return(
        <div>
            <Marker 
            height={30}
            width={30}
            fill={active ? "#98B4A6" : "white"} 
            onClick={pickClickApi} />
        </div>
    )
}

export default PickBtnPage;
