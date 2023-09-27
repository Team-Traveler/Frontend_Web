import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { travelsSelector } from '../../../recoil/atoms/travelsreviewStates';
import {AiFillHeart} from "react-icons/ai";

function HeartBtnPage(props){
    const travels = useRecoilValue(travelsSelector);
    // 임시
    const data=travels[props.pId-1];
    const [active,setActive] = useState(false);
    const [count,setCount] = useState(data.heart);

    const onClick = (e)=>{
        active ? setActive(false) : setActive(true);
        active ? setCount(count-1) : setCount(count+1);
    }
    const style = {
        color: active ? "red": "white",
        fontSize:`${props.size}px`,
        marginRight : "5px"
    }
    return(
        <div>
            <AiFillHeart style={style} onClick={onClick} />
            <span style={{color:"white", fontSize:`${props.size}px`}}>
                {count}
            </span>
        </div>
    )
}

export default HeartBtnPage;
