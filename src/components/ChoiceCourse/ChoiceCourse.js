import './ChoiceCourse.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/atoms/userState";
import {travelsState} from "../../recoil/atoms/travelsListStates";

function ChoiceCourse(props){
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [courseList, setCourseList] = useState(travelsState.result);

    const courseApi = async ()=>{
        await axios.get(`${API.HEADER}/users/my_travels`,{ headers: {Authorization:userInfo.accessToken,}})
        .then(response=>{
            if(response.data.isSuccess){
                setCourseList(response.data.result);
                console.log('코스 리스트 조회',courseList);
            }
            else{console.log('코스 리스트 조회 실패',response.data);}
        })
        .catch(err=>{console.log('error',err);})
    }
    
    const onClick = (e)=>{
        console.log(e.target);
    }

    useEffect(()=>{
        //courseApi();
    },[])

    return(
        <div className='courselist-box'>
            {courseList && courseList.map((v,index)=>(
                <div className='courselist' onClick={onClick}>
                    {v.title}
                </div>
            ))
            }
        </div>
    )
}

export default ChoiceCourse;