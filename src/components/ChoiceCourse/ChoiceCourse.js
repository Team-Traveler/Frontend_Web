import './ChoiceCourse.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/atoms/userState";
import CountDay from '../../pages/communityPage/components/countDay';

function ChoiceCourse({setCourse,onCourse}){
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [courseList, setCourseList] = useState([]);

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

    useEffect(()=>{
        courseApi();
    },[])

    return(
        <div className='course-list-box' onClick={(e) => e.stopPropagation()}>
        {courseList && courseList.map((v,index)=>(
            <div className='course-list' key={index} onClick={()=>{onCourse(v)}}>
                <span className='course-title'>{v.title}</span>
                <CountDay start_date={v.start_date} end_date={v.end_date}/>
                <span className='course-date'>{v.start_date.substr(0,10)} ~ {v.end_date.substr(0,10)}</span>
            </div>
        ))
        }
        </div>
    )
}

export default ChoiceCourse;