import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import {AiFillHeart} from "react-icons/ai";

function HeartBtnPage(props){
    const [active,setActive] = useState(false);
    const [count,setCount] = useState(0);

    useEffect(()=>{
        axios.get(`${API.HEADER}/post/${props.pId}/getOne`)
        .then(response=>{
            if(response.data.isSuccess===true){
                setCount(response.data.result.likes)
            }
        }).catch(e=>console.log(e))    
    },[count]);

    const onClick = (e)=>{
        active ? setActive(false) : setActive(true);
        active ? setCount(count-1) : setCount(count+1);
        //axios.get(`${API.HEADER}/post/${props.pId}/like`).then(rep=>console.log(rep.reuslt));
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
