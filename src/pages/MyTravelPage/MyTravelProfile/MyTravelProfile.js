import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { useRecoilState, useRecoilValue } from "recoil";
import { withoutAllTravelsState,
    withoutApiState,
    withoutProfileState,
    }from "../../../recoil/atoms/withoutAPI";



function MyTravelProfile(props) {
    const [isWithoutApi,setIsWithoutApi] = useRecoilState(withoutApiState);
const [withoutAllTravel,setWithoutAllTravel] = useRecoilState(withoutAllTravelsState);
const [withoutProfile, setWithoutProfile] = useRecoilState(withoutProfileState);
//console.log(withoutProfile);
  return (
    <div className="border">
        <div className="profile-title">내 프로필</div>
        <img className = "profile-image" src={props.imgSrc} alt="Profile" />
        <div className="profile-name">{props.name}</div>
        <div className="profile-stats">
            <div className="profile-travels">나의 여행 {props.numTravel}</div>
            <div className="profile-likes">찜한 여행 {props.numLiked}</div>
        </div>
        <div className="profile-date">가입일 {props.date}</div>
    </div>
);
}

export default MyTravelProfile;