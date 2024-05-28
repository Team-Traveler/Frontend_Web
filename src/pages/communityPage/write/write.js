import './write.css'
import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../config";
import Nav from "../../../components/Nav/Nav";
import ImageUploadBox from '../components/imgUpload'
import StarRating from '../components/star';
import { Checkbox } from 'antd';
import {ReactComponent as Marker} from '../components/Vector.svg';
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";
import TravelCard from '../components/trip';
import MyTravelLists from '../../MyTravelPage/MyTravelLists/MyTravelLists';
import { myAllTravelsState } from '../../../recoil/atoms/myAllTravelsState';

function WritePage() {
    /* 코스 선택 임시 */
    const [isEditMode, setIsEditMode] = useState(false); // 목록 편집 활성화 여부
    const [travelData, setTravelData] = useRecoilState(myAllTravelsState);
    const [selectedTravelId, setSelectedTravelId] = useState(-1);
    const [view, setView] = useState("list");
    const [course, setCourse] = useState([]);
    const [flag,setFlag] = useState(false);
    /* 리뷰 작성 */
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState({
        title : "",
        goodPoints : "",
        badPoints : "",
        oneLineReview : "",
        location : "",
        hashtags : [] ,
        tid : null,
       });
    const [start_date, setStart_date] = useState("");
    const [end_date,setEnd_date] = useState("");
    // 체크 박스
    const [checklist, setChecklist] = useState(false);
    const [book, setBook] = useState(false);
    // 체크박스 활성화
    const [activeC, setActiveC] = useState(false); // 체크리스트
    const [activeB, setActiveB] = useState(false); // 가계부
    // 코스 선택 시 갖고 오는 값 
    const [what,setWhat] = useState(1);
    const [withwho,setWithwho] = useState(1);
    const [hard,setHard] = useState(1);
    // 별점
    const [ratings, setRatings] = useState([0, 0, 0]); // 0: 컨셉(what), 1: 강도(hard), 2: 총 별점(total)
    const [images,setImages] = useState([]);

    const navigate = useNavigate();

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
    };

    const onChangeCheckBox2 = (e) => {
        setBook(!book);
    };

    // 코스 정보에 따른 set
    const setCourseInfo = (result)=>{
        if(result.code){
            setFlag(true);
            const len = result.code.len
            const str = String(result.code)
            // countryID, what, hard, with, period(최대 3박 4일)
            setWhat(str[len-4]);
            setHard(str[len-3]);
            setWithwho(str[len-2]+1);
        }
        else if(result.code === 0)
            setFlag(false);

        setStart_date(result.start_date);
        setEnd_date(result.end_date);
        
        if(result.noteStatus === 0){ // 노트 정보가 없으면 비활성화
            setActiveC(true);
            setActiveB(true);
        }
        else if(result.noteStatus === 1){ // 가계부 정보만 있으면
            setActiveC(true);
            setActiveB(false);
        }
        else if(result.noteStatus === 2){ // 체크리스트만 있으면
            setActiveC(false);
            setActiveB(true);
        }
        else if(result.noteStatus === 3){ // 둘 다 있으면
            setActiveC(false);
            setActiveB(false);
        }

        setValue((prevState) => { // tid 설정
            return { ...prevState, ["tid"]: result.tid };
        });
        setValue((prevState) => { // location 설정
            return { ...prevState, ["location"]: result.destination };
        });
        console.log('value',value);
        closeModal();
        console.log("checklist : ",checklist);
        console.log("book:",book);
    }

    const onChangeHandler = (e) => {
        //hashtags를 #단위로 나눠서 배열에 저장
        if(e.target.name === 'hashtags'){
            const noBlank = e.target.value.split(' ').join(''); // 공백제거
            const hashtagArray = noBlank.split("#").slice(1);
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
        /* 입력된 정보 formData로 변환*/
        e.preventDefault();
        // imageFile
        const formData = new FormData();
        for(var i=0; i<images.length; i++){
            formData.append("imageFile",images[i]);
            console.log(images[i])
        }

        const rating = {
            whatrating:ratings[0],
            hardrating:ratings[1],
            totalrating:ratings[2],
        }
        
        let noteStatus = 0;
        if(checklist && book)
            noteStatus = 3;
        else if(checklist)
            noteStatus = 2;
        else if(book)
            noteStatus = 1;

        const info = {
            what : what,
            withwho : withwho,
            hard : hard,
            noteStatus : noteStatus
        }

        const jsonMerge = {...value,...rating,...info};
        console.log("글 제출 result",jsonMerge);
        // content
        // multipart와 json을 같이 보내기 위해서 Blob 사용해야함
        const blob = new Blob([JSON.stringify(jsonMerge)], {type:"application/json"});
        formData.append("content", blob);
        /* 서버 전송*/
        axios.post(`${API.WRITE}`,formData,
        { headers: 
            {Authorization : userInfo.accessToken,}})
        .then(response=>{
            if(response.data.isSuccess){
                console.log('글작성 성공',response.data.result);
                /* 리뷰 보기 화면으로 전환*/
                navigate(`/story/${response.data.result.pid}`);
            }
            else console.log('글작성 실패',response)
        })
        .catch(e=>{
            console.log('error',e);
        })      
    }

    /* 코스 상세 정보 가져오기 */
    const fetchCourseInfo = async ()=>{
        await axios.get(`${API.HEADER}/travel/${selectedTravelId}`)
        .then(response=>{
            if(response.data.isSuccess){
                const result = response.data.result;
                setCourseInfo(result);
                setCourse(result);
                console.log('CourseInfo',result);
            }
            else{console.log('CourseInfo Error',response.data);}
        })
        .catch(err=>{console.log('error',err);})
    }

    /* 여행 목록 가져오기 */
    useEffect(()=>{
    async function fetchTravelData() {
        try {
            const response = await axios({
                method: "GET",
                url: `${API.HEADER}/users/my_travels`,
                headers: {
                    Authorization: `${userInfo.accessToken}`,
                },
            });

            if (response.status === 200) {
                setTravelData(response.data.result);
            }
        } catch (error) {
            console.log("/users/my_travels error", error);
        }
    }
    fetchTravelData();
    },[])
    
    // 코스 선택 시 실행
    useEffect(()=>{
        console.log('selectedTravelId',selectedTravelId);
        if(selectedTravelId!==-1){ // 코스가 선택됐으면
            fetchCourseInfo();
        }
    },[selectedTravelId])

    return (
        <div className="write-page">
            <Nav/>
            <div className="write-box">
                <div className="left-section">
                    <div className="top-square">
                        { flag ? 
                        // 추천으로 만들어진 코스이면 자동으로 가져옴 
                        <TravelCard what={what} hard={hard} withwho={withwho} flag={flag}/> :
                        <TravelCard setHard={setHard} setWhat={setWhat} setWithwho={setWithwho} flag={flag}/> 
                        }
                        <button className="course-btn" onClick={openModal}>코스 선택</button> 
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
                            {start_date !== "" ?
                                (<span>{start_date.substr(0,10)} | {end_date.substr(0,10)}</span>)
                                :(<span>출발날짜 | 도착날짜</span>)
                            }
                            </div>
                        </div>
                        <div className="input-travel">
                            <div className="input-travel-title">
                                <Marker height={15} width={20} fill=" #98B4A6"/> 
                                <span> 추천 장소 </span>
                            </div>
                            <div className="input-travel-content" id="hashtag">
                                <textarea placeholder="#를 누르고 추천장소를 해시태그로 입력하세요(최대 15개)" name="hashtags" onChange={onChangeHandler}/>
                            </div>
                            <div className="input-travel-title">
                                <Marker height={15} width={20} fill=" #98B4A6"/> 
                                <span> Good </span>
                            </div>
                            <div className="input-travel-content" id="good">
                                <textarea  placeholder="좋았던 점을 입력하세요." name="goodPoints" onChange={onChangeHandler} />
                            </div>
                            <div className="input-travel-title">
                                <Marker height={15} width={20} fill=" #98B4A6"/> 
                                <span> Bad </span>
                            </div>
                            <div className="input-travel-content" id="bad">
                                <textarea  placeholder="안 좋았던 점을 입력하세요" name="badPoints" onChange={onChangeHandler} />
                            </div>        
                            <div className="input-travel-title">
                                <Marker height={15} width={20} fill=" #98B4A6"/> 
                                <span> 한줄 평 </span>
                            </div>
                            <div className="input-travel-content" id="review">
                                <input placeholder="여행을 한 줄로 평가해주세요" name="oneLineReview" onChange={onChangeHandler} />
                            </div>
                            <div className="input-travel-title">
                                <Marker height={15} width={20} fill=" #98B4A6"/> 
                                <span> 나의 노트 공유 </span>
                            </div>
                            <div className="input-travel-content" >
                                <Checkbox onChange={onChangeCheckBox1} disabled={activeC}>체크리스트</Checkbox>
                                <Checkbox style={{marginLeft:"10px"}} onChange={onChangeCheckBox2} disabled={activeB}>가계부</Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="submit-btn" type='submit' onClick={onSubmit}
            disabled={!value.title || !value.location || !value.tid || !course}> 제출 </button>
            {showModal && (
                <div className='course-modal' onClick={closeModal}>
                    {/* <ChoiceCourse onCourse={onCourse}/> */}
                    <MyTravelLists
                        setView={setView}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                        view={view}
                        travelData={travelData}
                        setSelectedTravelId={setSelectedTravelId}
                        fromWritePage = {"write"}
                    />
                </div>
            )}
        </div>
    );
}

export default WritePage;
