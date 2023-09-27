import React, { useState,useRef,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { travelsSelector } from '../../../recoil/atoms/travelsreviewStates';
import { BiSolidCommentDetail } from 'react-icons/bi';

function CommentBtnPage(props){
    const travels = useRecoilValue(travelsSelector);
    // 임시
    const data=travels[props.pId-1];
    
    const [count,setCount] = useState(data.comments.length);

    /* api 연결 시 사용 */
    // const counter = (data)=>{
    //     return data.length
    // }
    // try{
    //     response = axios.get(`/post/${props.pId}/comment`)
    //     console.log(response);
    //     if(response.status===200){
    //         data = response.result;
    //     }
    // }catch(e){
    //     console.log(e);
    // }

    return(
        <div>
            <Link to={`/story/${props.pId}/comments`} style={{ textDecoration: "none" }}>
                <BiSolidCommentDetail style={{color:"white", fontSize:`${props.size}px`, marginRight:"5px"}} />
            </Link>
            <span style={{color:"white", fontSize:`${props.size}px`,marginRight:"5px"}}>
                {count}
            </span>
        </div>
    )
}

export default CommentBtnPage;
