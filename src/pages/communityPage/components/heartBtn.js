import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import {AiFillHeart} from "react-icons/ai";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";

function HeartBtnPage({pId,like,count,size}){
    // prop값을 useState 초기화할 때 바로 사용하면 안됨.
    // 부모에서 값이 변경돼도 반영이 안됨. (useState는 처음 한번만 적용됨)
    const [active,setActive] = useState(); 
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [likeCount,setlikeCount] = useState();
    

     // 좋아요 버튼 클릭 시
     const likeClickApi = async()=>{
        await axios.post(`${API.HEADER}/post/${pId}/like`,{},
        { headers: {Authorization:userInfo.accessToken,}})
        .then(response=>{
            if(response.data.isSuccess){
                if(response.data.result === '좋아요 성공!'){
                    setActive(true);
                    setlikeCount(likeCount+1);
                }
                else if(response.data.result === '좋아요 취소 성공!'){
                    setActive(false);
                    setlikeCount(likeCount-1);
                }
            }
            else console.log('좋아요 실패', response.data);
        }).catch(e=>{console.log('error',e)})
    }

    const style = {
        color: active ? "red": "white",
        fontSize:`${size}px`,
        marginRight : "5px"
    }

    useEffect(()=>{ 
        setlikeCount(count);
        setActive(like);
    },[like,count]);

    return(
        <div>
            <AiFillHeart style={style} onClick={likeClickApi} />
            <span style={{color:"white", fontSize:`${size}px`}}>
                {likeCount}
            </span>
        </div>
    )
}

export default HeartBtnPage;
