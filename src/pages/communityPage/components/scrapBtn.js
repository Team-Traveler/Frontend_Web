import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { travelsSelector } from '../../../recoil/atoms/travelsreviewStates';
import { ReactComponent as Marker } from './Vector.svg';
function PickBtnPage(props){
    const travels = useRecoilValue(travelsSelector);
    // 임시
    const data=travels[props.pId-1];
    const [active,setActive] = useState(false);

    const onClick = (e)=>{
        active ? setActive(false) : setActive(true);
    }
    // const handlePickClick = async (pId, index) => {
    //     /* API 연결 시 사용
    //     try {
    //       console.log('찜 클릭 이벤트 발생');
    //       const response = await axios.post(`/post/${pId}/scrap`);
    //       if (response.status === 200) {
    //         const newPick = [...pick];
    //         newPick[index] = !newPick[index];
    //         setPick(newPick);
    //         console.log('성공');
    //       }
    //     } catch (error) {
    //       console.error('Error while scraping:', error);
    //     }
    //     */
    //   };
    return(
        <div>
            <Marker 
            height={30}
            width={30}
            fill={active ? "#98B4A6" : "white"} 
            onClick={onClick} />
        </div>
    )
}

export default PickBtnPage;
