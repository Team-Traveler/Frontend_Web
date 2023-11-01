import React, { useState,useRef,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../../config";
import { BiSolidCommentDetail } from 'react-icons/bi';

function CommentBtnPage(props){
    const [count,setCount] = useState(0);

    useEffect(()=>{
        axios.get(`${API.HEADER}/post/${props.pId}/comment`).then(response=>{
            if(response.data.isSuccess===true){
                setCount(response.data.result.length);
                console.log(count);
            }
        }).catch(e=>console.log(e))
    },[count]);

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
