import './comments.css';
import Nav from "../../../components/Nav/Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import { Link, useParams } from "react-router-dom";
import {BsPersonCircle} from 'react-icons/bs';

function CommentsPage(){
    const {pid} =useParams();
    const [comment,setComment] = useState("");
    const [commentList,setCommentList] = useState([]);
    
    // api 호출
    const commentApi = async() =>{
        await axios.get(`${API.HEADER}/post/${pid}/comment`)
        .then(response=>{
            if(response.data.isSuccess===true){
                setCommentList(response.data.result);
                console.log('댓글 목록',response.data.result);
            }
            else console.log('실패',response.data);
        })
        .catch(e=>console.log('error',e))
    }

    useEffect(()=>{
        commentApi();
    },[commentList[0]]);

    // 텍스트 입력 시
    const onChange = (e)=>{
        setComment(e.target.value);
    }
    // 등록 버튼 클릭 시
    const onSubmit = (e)=>{
        console.log(comment);
        alert('sumbit!');
    }

    return(
        <div>
            <Nav/>
            <div className='wrap-box'>
                <div className='comment-list-box'>
                    {commentList && commentList.map((v,index)=>(
                        <div className='comment-box'>
                            <div className='user-box'>
                                <BsPersonCircle style={{color:"gray", fontSize:"25px"}}/> 
                                <span>{v.uid}</span>
                            </div>
                            <div className='comment-content'>
                                {v.content}
                            </div>
                            <div className='comment-footer'>
                                <span>{v.createAt}</span>
                            </div>
                        </div>
                    ))
                    }
                </div>
                <div className='input-comment-box'>
                    <div className='user-box'>
                        <BsPersonCircle style={{color:"gray", fontSize:"25px"}}/> 
                        <span>userId</span>
                    </div>
                    <textarea type="text" placeholder='트레블러에게 따뜻한 말을 남겨 보아요.' className='comment' onChange={onChange}/>
                    <button className='comment-submit-btn' onClick={onSubmit}>등록</button>
                </div>
            </div>
        </div>
        
    )
}

export default CommentsPage; 