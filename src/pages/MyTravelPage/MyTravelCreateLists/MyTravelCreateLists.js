import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MyTravelMap from '../MyTravelMap/MyTravelMap';
import circles from './circles.svg'; 
import './styles.css';
import { useRecoilState } from 'recoil';
import { setPlaceStateSelector } from '../../../recoil/atoms/placeState';
import { selectedTravelState,fromPlaceSearchState, placeSearchState } from '../../../recoil/atoms/placeSearchState';
import { userInfoState } from "../../../recoil/atoms/userState";
import {  travelCourseState, setTravelSpecificStateSelector,selectedTIDState, travelSpecificState,getCourseByDcIdSelector,setCourseByDcIdSelector } from '../../../recoil/atoms/travelSpecificState';

import Map from '../MyTravelMap/api/Map';
import axios from 'axios';

const travels = {
    title : "여수 투어",
    start_date: "230814",
    end_date: "230816",
    courses : [
        {
            "dcId": 1,
            "spot1": '호텔',
            "spot2": '롯폰기 힐스',
            "spot3": "롯폰기 케야키자카",
            "spot4": '공원',
            "first": 30000,
            "second": 1000,
            "third": 500,
            "spot1_lat": 37.715133,
            "spot1_lon":  126.734086,
            "spot2_lat": 38.715133,
            "spot2_lon":  127.734086,
            "spot3_lat": 39.715133,
            "spot3_lon":  128.734086,
            "spot4_lat": null,
            "spot4_lon":  null,
            "numOfDay": 3,
            "tid": 1
        },
    ]
}

function TravelCard({  travel, handleEditClick,setSelectedCourse,setIsTravelCreate,...props }) {
  
    const handleEditSpecificsClick = (course) => {
        console.log('Edit Specifics button clicked', travel.courses[0].numOfDay);
        //setIsTravelCreate(true); 
    };

    const handleDeleteClick = (spotNum) => {
        console.log('Edit Specifics button clicked', travel.courses[0].numOfDay);
        
        //setIsTravelCreate(true); 
    };

    const convertDistance = (distance) => {
      if (distance >= 1000) {
        return `${distance / 1000}km`;
      }
      return `${distance}m`;
    };
    
    console.log("start데이는:",travel.start_date);

    function convertToDate(inputString) {
      if (!inputString) return null;
      const year = `20${inputString.substring(0, 2)}`;
      const month = inputString.substring(2, 4);
      const day = inputString.substring(4, 6);
    
      return new Date(`${year}-${month}-${day}`);
    }
    
    function formatDate(inputDate) {
      if (!inputDate) return null;
      const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
      const month = inputDate.getMonth() + 1;
      const day = inputDate.getDate();
      const weekday = weekdays[inputDate.getDay()];
    
      return `${month}/${day}(${weekday})`;
    }

    function addDays(date, days) {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
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
                <div className="travel-card-name">{travel.title}</div>
                <div className="travel-card-duration">{travel.courses[0].numOfDay-1}박 {travel.courses[0].numOfDay}일</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0px', marginLeft: '40px' }}>
                <div className="travel-create-text">{travel.start_date}</div>
                <div className="travel-create-text">~</div>
                <div className="travel-create-text">{travel.end_date}</div>
            </div>
            <div className="travel-card-create-header">
                <span className='numofDay'>{travel.courses[0].numOfDay}일차</span> 
                <span className='day'>{formatDate(addDays(convertToDate(travel.start_date), travel.courses[0].numOfDay - 1))}</span> 
            </div>
            <div className="travel-create-card">
                <SpotDisplay num="1" spot={travel.courses[0].spot1} distance={travel.courses[0].first} /> 
                {travel.courses[0].spot2 && <SpotDisplay num="2" spot={travel.courses[0].spot2} distance={travel.courses[0].second} />} 
                {travel.courses[0].spot3 && <SpotDisplay num="3" spot={travel.courses[0].spot3} distance={travel.courses[0].third} />} 
                {travel.courses[0].spot4 && <SpotDisplay num="4" spot={travel.courses[0].spot4}  />} 
            </div>
            <button className="edit-create-button" onClick={handleEditClick}></button>
            <button className="calender-create-button" onClick={handleEditClick}></button>
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
    const [isFromSearch, setIsFromSearch] = useRecoilState(fromPlaceSearchState);
    const [selectTravel, setSelectTravel] = useRecoilState(selectedTravelState);
    const [travelSpecificData,setTravelSpecificData] = useRecoilState(setTravelSpecificStateSelector);
    const [travelCourse,setTravelCourse]=useRecoilState(travelCourseState);

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
        console.log("Clicked item:", item);
    }

    useEffect(() => {
        console.log(TAG+"-",{travelSpecificData});
        console.log(TAG+"-",{travelCourse});
    }, []);
    
    // 여행 상세 추가 api 호출
    async function postTravelData(travelInfo,selectedTID) {
        const dcId = 1;
        try {
            const response = await axios({
                method: 'POST',
                url: `http://15.164.232.95:9000/travel/course/${dcId}/spot`,
                headers: {
                    Authorization: `${userInfo.accessToken}` 
                },
                data: {
                }
            });
    
            console.log(response.data); // 받아온 응답 데이터를 콘솔에 출력
    
        } catch (error) {
            console.error("Error posting travel specific data:", error);
        }
    }

    const handleSubmit = () => {
        console.log("여행 상세 추가: ",searchState);
        // const newTid = travels.length + 1;
        // const travelInfo = {
        //     id: newTid, 
        //     name: name,
        //     category: category,
        //     start: formatPostDate(startDate),
        //     end: formatPostDate(endDate),
        //     write_status: 1,
        // };
        // if(isFromEdit){ // 여행 편집

        //     patchTravelData(travelInfo,selectedTID);


        // }else{  // 여행 생성
        //         //axios 통신
        //         postTravelData(travelInfo);

        //         setTravels((prevTravels) => [...prevTravels, travelInfo]); // 새 여행 정보 추가

        //};

        //setSelectTravel(false);
        setplaceSearchState(null);


    }

    const handleBack = () => {
        console.log("여행 상세 추가: ",searchState);
        // const newTid = travels.length + 1;
        // const travelInfo = {
        //     id: newTid, 
        //     name: name,
        //     category: category,
        //     start: formatPostDate(startDate),
        //     end: formatPostDate(endDate),
        //     write_status: 1,
        // };
        // if(isFromEdit){ // 여행 편집

        //     patchTravelData(travelInfo,selectedTID);


        // }else{  // 여행 생성
        //         //axios 통신
        //         postTravelData(travelInfo);

        //         setTravels((prevTravels) => [...prevTravels, travelInfo]); // 새 여행 정보 추가

        //};

        //setSelectTravel(false);
        setplaceSearchState(null);
        setIsTravelCreate(false);

    }

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
                    {travels.length === 0 ? (
                        <div className='container'>
                            <div className="date">안녕</div>
                            <div className='travel-card'>
                                <div className='travel-card-empty'>
                                항목을 추가하세요
                                </div>
                            </div>
                        </div>
                    ) : (    
                        <div>
                            <TravelCard travel={travels} />
                        </div>
                    )
                    }
                    <div className='inputFormContainer'>
                        <form className="inputform" onSubmit={handleSearch}>
                            <button className="search-Btn" type="submit"></button>
                            <input
                                className="search-"
                                placeholder="검색어를 입력하세요"
                                onChange={onChange}
                                value={InputText}
                            />
                        </form>
                    </div>

                    <div className="result-Style">
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

        <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center',
            width: '100%',
            marginLeft: '300px'
            }}>
            <div className="button-create-container">
                <button className="button" onClick={() => handleSubmit()}>
                    {"추가 하기"}
                </button>
            </div>

            <div className="button-create-container">
                <button className="button" onClick={() => handleBack()}>
                    {"뒤로 가기"}
                </button>
            </div>
        </div>
        
    
        </div>
        
    );
}

export default MyTravelCreateLists;