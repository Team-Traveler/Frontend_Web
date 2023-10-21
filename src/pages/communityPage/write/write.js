import './write.css'
import React, { useState } from "react";
import {BsPersonCircle} from 'react-icons/bs';
import Nav from "../../../components/Nav/Nav";
import TravelCard from '../components/trip';
import {GiPositionMarker} from 'react-icons/gi';
import ImageUploadBox from '../components/imgUpload'
import StarRating from '../components/star';
// 이 페이지에서 데이터 가져와서 보여주기

function WritePage() {
    const [value, setValue] = useState({
        title : "",
        goodPoints : "",
        badPoints : "",
        oneLineReview : "",
        hashtags : [] 
       });
    const [what,setWhat] = useState(0);
    const [withwho,setWithwho] = useState(0);
    const [hard,setHard] = useState(0);
    const [ratings, setRatings] = useState([0, 0, 0]); // 0: 컨셉(what), 1: 강도(hard), 2: 총 별점(total)
    const [images,setImages] = useState([]);

    const onChangeHandler = (e) => {
        //hashtags를 #단위로 나눠서 배열에 저장
        if(e.target.name === 'hashtags'){
            const noBlank = e.target.value.split(' ').join(''); // 공백제거
            const hashtagArray = noBlank.split("#");
            setValue((prevState) => {
                return { ...prevState, [e.target.name]: hashtagArray };
            });
        }
        else{
            setValue((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        }
    };
    
    const onSubmit = (e)=>{
        const formData = new FormData();
        formData.append("imageFile",images);
        const CircularJSON = require('circular-json'); // 순환참조로 인한 json 변환 에러를 해결
        const rating = {
            'whatrating':ratings[0],
            'hardrating':ratings[1],
            'totalrating':ratings[2],
        }
        const info = {
            'what' : what,
            'withwho' : withwho,
            'hard' : hard,
        }
        const jsonMerge = {...value,...rating,...info};
        console.log(jsonMerge);
        alert('submit!');
    }

    return (
        <div className="xcommunity-page">
            <Nav />
                <div className="xcontent-wrapper">
                    <div className="left-section">
                        <TravelCard setWhat={setWhat} setHard={setHard} setWithwho={setWithwho} />
                        <ImageUploadBox setImages={setImages}/>
                        <div className="star-ratingbar">
                            <StarRating setRatings={setRatings}/>
                        </div>
                    </div>
                    <div className="right-section">
                        <div className = "input-info-box">
                            <div className="input-user">
                                <BsPersonCircle style={{color:"gray", fontSize:"30px"}}/> 
                                <span>userId</span>
                            </div>
                            <div className="input-title">
                                <input className="input-box" id="title" maxLength={28} placeholder="제목 작성" name="title" onChange={onChangeHandler} />
                                <div className="input-travel-info">
                                </div>
                                <div className='input-travel-date'>
                                </div>
                            </div>
                            <div className="input-travel">
                                <div className="input-travel-title">
                                    <GiPositionMarker style={{color:"rgb(156, 184, 148)",fontSize:"30px"}}/> 
                                    <span> 추천 장소 </span>
                                </div>
                                <div className="input-travel-content">
                                    <input id="recommended" placeholder="추천 장소 추가"/>
                                </div>
                                <div className="input-travel-title">
                                    <GiPositionMarker style={{color:"rgb(156, 184, 148)",fontSize:"30px"}}/> 
                                    <span> Good </span>
                                </div>
                                <div className="input-travel-content" >
                                    <input id="good" placeholder="장점 작성" name="goodPoints" onChange={onChangeHandler} />
                                </div>
                                <div className="input-travel-title">
                                    <GiPositionMarker style={{color:"rgb(156, 184, 148)",fontSize:"30px"}}/> 
                                    <span> Bad </span>
                                </div>
                                <div className="input-travel-content" >
                                    <input id="bad" placeholder="단점 작성" name="badPoints" onChange={onChangeHandler} />
                                </div>        
                                <div className="input-travel-title">
                                    <GiPositionMarker style={{color:"rgb(156, 184, 148)", fontSize:"30px"}}/> 
                                    <span> 한줄 평 </span>
                                </div>
                                <div className="input-travel-content" >
                                    <input id="review" placeholder="한줄 평 작성" name="oneLineReview" onChange={onChangeHandler} />
                                </div>
                            </div>
                            <div className="input-travel-content">
                                <input id="hashtag" placeholder="해시태그 작성" name="hashtags" onChange={onChangeHandler}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button className="submit-btn" type='submit' onClick={onSubmit}> 게시하기 </button>
                </div>
        </div>
    );
}

export default WritePage;
