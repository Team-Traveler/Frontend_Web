import './write.css'
import React, { useState } from "react";
import {BsPersonCircle} from 'react-icons/bs';
import Nav from "../../../components/Nav/Nav";
import ImageUploadBox from '../components/imgUpload'
import StarRating from '../components/star';
import { Checkbox } from 'antd';
import {ReactComponent as Marker} from '../components/Vector.svg';
import Modal from "../../../components/Modal/Modal";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";

function WritePage() {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState({
        title : "",
        goodPoints : "",
        badPoints : "",
        oneLineReview : "",
        location : "",
        hashtags : [] 
       });
    // 체크 박스
    const [checklist, setChecklist] = useState(false);
    const [book, setBook] = useState(false);
    // 코스 선택 시 갖고 오는 값 
    const [what,setWhat] = useState(0);
    const [withwho,setWithwho] = useState(0);
    const [hard,setHard] = useState(0);
    const [location,setLocation] = useState("");
    // 별점
    const [ratings, setRatings] = useState([0, 0, 0]); // 0: 컨셉(what), 1: 강도(hard), 2: 총 별점(total)
    const [images,setImages] = useState([]);

    // 모달 관리
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // 체크 박스 핸들러
    const onChangeCheckBox1 = (e) => {
        setChecklist(!checklist);
        console.log('체크리스트 공유 선택', checklist);
    };

    const onChangeCheckBox2 = (e) => {
        setBook(!book);
        console.log('가계부 공유 선택', book);
    };

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
    
    const onCourse= (e) => {
        openModal();
    }

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
                    <div className="top-square">
                        <div className="info-square">
                            <div className="info-square-content">
                                {/* {whatArray[travel.what-1]} */}
                            </div>
                            <div className="info-square-content">
                                {/* {hardArray[travel.hard-1]} */}
                            </div>
                            <div className="info-square-content">
                                {/* {withwhoArray[travel.withwho-1]} */}
                            </div>
                        </div>
                        <button className="course-btn" onClick={onCourse}>코스 선택</button>
                    </div>
                    <ImageUploadBox setImages={setImages}/>
                    <div className="star-ratingbar">
                        <StarRating setRatings={setRatings}/>
                    </div>
                </div>
                <div className="right-section">
                    <div className = "input-info-box">
                        <div className="input-user">
                            <div className='profile-box'>
                                <img src={userInfo.profileImage}/>
                            </div>
                            <span>{userInfo.nickname}</span>
                        </div>
                        <div className="input-title">
                            <input className="input-box" id="title" maxLength={28} placeholder="제목을 입력하세요" name="title" onChange={onChangeHandler} />
                            <div className='input-travel-date'>
                                출발 날짜 | 도착 날짜
                            </div>
                        </div>
                        <div className="input-travel">
                            <div className="input-travel-title">
                                <Marker height={30} width={30} fill=" #98B4A6"/> 
                                <span> 추천 장소 </span>
                            </div>
                            <div className="input-travel-content">
                                <input id="recommended" placeholder="추천 장소를 입력하세요."/>
                            </div>
                            <div className="input-travel-title">
                                <Marker height={15} width={20} fill=" #98B4A6"/> 
                                <span> Good </span>
                            </div>
                            <div className="input-travel-content" >
                                <input id="good" placeholder="좋았던 점을 입력하세요." name="goodPoints" onChange={onChangeHandler} />
                            </div>
                            <div className="input-travel-title">
                                <Marker height={15} width={20} fill=" #98B4A6"/> 
                                <span> Bad </span>
                            </div>
                            <div className="input-travel-content" >
                                <input id="bad" placeholder="안 좋았던 점을 입력하세요" name="badPoints" onChange={onChangeHandler} />
                            </div>        
                            <div className="input-travel-title">
                                <Marker height={15} width={20} fill=" #98B4A6"/> 
                                <span> 한줄 평 </span>
                            </div>
                            <div className="input-travel-content" >
                                <input id="review" placeholder="여행을 한 줄로 평가해주세요" name="oneLineReview" onChange={onChangeHandler} />
                            </div>
                            <div className="input-travel-title">
                                <Marker height={15} width={20} fill=" #98B4A6"/> 
                                <span> 나의 노트 공유 </span>
                            </div>
                            <div className="input-travel-content" >
                                <Checkbox onChange={onChangeCheckBox1}>체크리스트</Checkbox>
                                <Checkbox onChange={onChangeCheckBox2}>가계부</Checkbox>
                            </div>
                        </div>
                        <div className="input-travel-content">
                            <input id="hashtag" placeholder="#를 누르고 해시태그를 입력하세요(최대 15개)" name="hashtags" onChange={onChangeHandler}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button className="submit-btn" type='submit' onClick={onSubmit}> 게시하기 </button>
            </div>
            {showModal && (
                <Modal
                    closeModal={closeModal}
                    headerTitle={<h3>코스 선택</h3>}
                    size = "large"
                >
                </Modal>
            )}
        </div>
    );
}

export default WritePage;
