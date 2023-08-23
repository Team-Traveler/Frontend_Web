import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MyTravelMap from '../MyTravelMap/MyTravelMap';
import circles from './circles.svg'; 
import './styles.css';
import { useRecoilState } from 'recoil';
import { setPlaceStateSelector } from '../../../recoil/atoms/placeState';
import { searchSubmitState,selectedTravelState,fromPlaceSearchState, placeSearchState } from '../../../recoil/atoms/placeSearchState';
import { userInfoState } from "../../../recoil/atoms/userState";
import {  travelCourseIndex,travelCourseState, setTravelSpecificStateSelector,selectedTIDState, travelSpecificState,getCourseByDcIdSelector,setCourseByDcIdSelector, travelCourseDcid } from '../../../recoil/atoms/travelSpecificState';

import Map from '../MyTravelMap/api/Map';
import axios from 'axios';

function TravelCard({  index,travelSpecificData,...props }) {
    // console.log("카드내부-",{travelSpecificData});
    // console.log("카드내부-",travelSpecificData.courses);
    // console.log("카드내부-",{index});

    const handleEditSpecificsClick = (course) => {
        //console.log('Edit Specifics button clicked');
        //setIsTravelCreate(true); 
    };

    const handleDeleteClick = (spotNum) => {
        //console.log('Delete button clicked');
        
        //setIsTravelCreate(true); 
    };

    const convertDistance = (distance) => {
      if (distance >= 1000) {
        return `${distance / 1000}km`;
      }
      return `${distance}m`;
    };
    

    function convertToDate(inputString) {
      if (!inputString) return null;
      const year = `20${inputString.substring(0, 2)}`;
      const month = inputString.substring(2, 4);
      const day = inputString.substring(4, 6);
    
      return new Date(`${year}-${month}-${day}`);
    }
    

    function getDayOfWeek(input,index) {
        const date = new Date(input);
        const days = ['일','월','화','수','목','금','토'];
        const nextDayIndex = (date.getDay() + index) % 7;
        return `(${days[nextDayIndex]})`;
    }
    
    function formatDate(input) {
        const date = new Date(input);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해주어야 합니다.
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}/${day}`;
    }

    const SpotDisplay = ({ num, spot, distance }) => (
    <div className='spot-wrapper'>
        <div className='spot-container'>
            <div className="num-box">{`${num}`}</div>
            <div className="travel-card-places">{spot}</div>
            <div className='travel-carrd-delete' onClick={handleDeleteClick(num)}>삭제</div>
        </div>
        {distance && 
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '40px' }}>
            <div className="div-size" >|</div>
            <div >{convertDistance(distance)}</div>
            </div>
        }
    </div>
    );

    return (
        <div>
            <div style={{  display: 'flex', flexDirection: 'row', marginTop: '40px', marginBottom: '10px', marginLeft: '40px', alignItems: 'flex-end'}}>
                <div className="travel-card-name">{travelSpecificData.title}</div>
                <div className="travel-card-duration">{travelSpecificData.courses.length-1}박 {travelSpecificData.courses.length}일</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0px', marginLeft: '40px' }}>
                <div className="travel-create-text">{formatDate(travelSpecificData.start_date)}</div>
                <div className="travel-create-text">~</div>
                <div className="travel-create-text">{formatDate(travelSpecificData.end_date)}</div>
            </div>
            <div className="travel-card-create-header">
                <span className='numofDay'>{index+1}일차</span> 
                <span className='day'>{getDayOfWeek(travelSpecificData.start_date,index)}</span> 
            </div>
            <div className="travel-create-card">
                    { travelSpecificData.courses[index].spot1==null?(
                    <span className='travel-card-empty'>항목을 추가하세요</span>
                ):(
                <SpotDisplay num="1" spot={travelSpecificData.courses[index].spot1} distance={travelSpecificData.courses[index].first} /> 
                )}
                {travelSpecificData.courses[index].spot2 && <SpotDisplay num="2" spot={travelSpecificData.courses[index].spot2} distance={travelSpecificData.courses[index].second} />} 
                {travelSpecificData.courses[index].spot3 && <SpotDisplay num="3" spot={travelSpecificData.courses[index].spot3} distance={travelSpecificData.courses[index].third} />} 
                {travelSpecificData.courses[index].spot4 && <SpotDisplay num="4" spot={travelSpecificData.courses[index].spot4}  />} 
            </div>
            <button className="edit-create-button" ></button>
            <button className="calender-create-button"></button>
        </div>
    );
}

function MyTravelCreateLists({setView, setIsTravelCreate}) {

    const TAG = "MyTravelCreateLists";
    const [search, setSearch] = useState("");
    const [Place, setPlace] = useState("");
    const [recoilPlaces, setRecoilPlaces] = useRecoilState(setPlaceStateSelector);
    const [InputText, setInputText] = useState("");
    const [hide,setHide] = useState(true);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [searchState,setplaceSearchState] = useRecoilState(placeSearchState);
    const [searchSubmit,setSearchSubmit] = useRecoilState(searchSubmitState);
    const [isFromSearch, setIsFromSearch] = useRecoilState(fromPlaceSearchState);
    const [selectTravel, setSelectTravel] = useRecoilState(selectedTravelState);
    const [travelSpecificData,setTravelSpecificData] = useRecoilState(setTravelSpecificStateSelector);
    const [travelCourse,setTravelCourse]=useRecoilState(travelCourseState);
    const [travelIndex,setTraveIndex]=useRecoilState(travelCourseIndex);

    const onChange = (e) => {
        setInputText(e.target.value);
    };
    
    const handleSearch=(e) => {

        e.preventDefault();
        setPlace(InputText);
        setInputText("");
    };

    function handleItemClick(item) {
        
        setplaceSearchState(item);
        setIsFromSearch(true);
        //console.log("Clicked item:", item);
    }

    useEffect(() => {
        console.log(TAG+"-",{travelSpecificData});
        console.log(TAG+"-",{travelCourse});
        console.log(TAG+"-",travelIndex.index);
        console.log(TAG+"-",searchState);

    }, []);
    
    // 여행 상세 추가 api 호출
    async function postTravelData(title,lat,lng,dcid) {
        try {
            const response = await axios({
                method: 'POST',
                url: `http://15.164.232.95:9000/travel/course/${dcid}/spot`,
                headers: {
                    Authorization: `${userInfo.accessToken}` 
                },
                data: {
                    title: title,
                    latitude: lat,
                    longitude: lng
                }
            });
    
            console.log(response.data); // 받아온 응답 데이터를 콘솔에 출력
    
        } catch (error) {
            console.error("Error posting travel specific data:", error);
        }
    }

    //자 ,,,, 이제 api연결해보자
    const handleSubmit = () => {
        const courseindex =  +travelIndex.index;
        if (!searchState) {
            alert("장소 입력을 완료해주세요.");
            return;
        };

        
        console.log(travelCourse[courseindex]);
        if(travelCourse[courseindex].dcId){
            console.log(travelCourse[courseindex].dcId);
        }
        console.log(typeof(searchState.place_name));
        console.log(typeof(searchState.y));
        console.log(typeof(searchState.x));
        postTravelData( searchState.place_name,parseFloat(searchState.y),parseFloat(searchState.x),travelCourse[courseindex].dcId);

        setSearchSubmit(searchState);
        setplaceSearchState(null);
        setIsTravelCreate(false);

    }

    useEffect(()=>{
        console.log("여행 진짜 상세 추가: ",searchSubmit);
    },[searchSubmit]);

    return (
        <div>
        <div style={{ 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'space-between', 
            alignItems: 'center',
            height: '62.6vh',
            padding: '0 6vw',
            marginTop: '50px'
            }}>
            <div style={{marginRight: '6vw'}}>
                {/* <MyTravelMap isTravelCreate={isTravelCreate}/> */}
                <Map isFromCreate={true} searchPlace={Place} setRecoilPlaces={setRecoilPlaces}/>
            </div>
            <div>
                <div className="image-create-container">
                    <img src={circles} alt="Circles Decoration"  />
                </div>
                <div className="my-travel-create-lists">
                
                    <div>
                        <TravelCard 
                            index = {travelIndex.index}
                            travelSpecificData = {travelSpecificData}
                        />
                    </div>
                    
                    
                    <div className='inputFormContainer'>
                        <form className="inputform" onSubmit={handleSearch}>
                            <button className="search-Btn" type="submit"></button>
                            <input
                                className="search-"
                                placeholder={searchSubmit ? searchSubmit.place_name : "검색어를 입력하세요"}
                                onChange={onChange}
                                value={InputText}
                            />
                        </form>
                    </div>
                    
                    <div className="result-Style" style={{ visibility: (InputText||Place) ? 'visible' : 'hidden' }}>
                        {recoilPlaces.map((item, i) => (
                            <div key={i} className="item-search-create-container" onClick={() => handleItemClick(item)}>
                                <div>
                                    <span style={{fontSize: '23px', fontWeight:'bold'}}>{item.place_name}</span>
                                    {item.road_address_name ? (
                                        <div style={{fontSize: '19px', marginTop:'10px'}}>
                                        <span >{item.road_address_name}</span>
                                        </div>
                                    ) : (
                                        <div style={{fontSize: '19px', marginTop:'10px'}}>
                                            <span >{item.address_name}</span>
                                        </div>
                                        
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="pagi-nation" id="pagination"></div>
                    </div>
                


                </div>
            </div>
        </div>

            <div className="button-create-container">
                <button className="button" onClick={() => handleSubmit()}>
                    {"추가 하기"}
                </button>
            </div>


        
    
        </div>
        
    );
}

export default MyTravelCreateLists;