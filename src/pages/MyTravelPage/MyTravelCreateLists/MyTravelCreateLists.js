import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MyTravelMap from '../MyTravelMap/MyTravelMap';
import circles from './circles.svg'; 
import './styles.css';

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
            "numOfDay": 3,
            "tid": 1
        },
    ]
}

function TravelCard({  travel, handleEditClick,setSelectedCourse,setIsTravelCreate,...props }) {
  
    const handleEditSpecificsClick = (course) => {
        console.log('Edit Specifics button clicked', travel.courses[0].numOfDay);
        setIsTravelCreate(true); 
    };

    const handleDeleteClick = (course) => {
        console.log('Edit Specifics button clicked', travel.courses[0].numOfDay);
        setIsTravelCreate(true); 
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
          <div className='travel-carrd-delete' onClick={handleDeleteClick}>삭제</div>
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

function MyTravelCreateLists({ addPlan }) {
    const [search, setSearch] = useState("");
    // TODO: 장소 검색 API 통신을 위한 로직
    // 검색 결과가 있다면 addPlan을 사용하여 TravelPlanList에 추가
    
    const handleSearch = () => {
        // 여기에서 검색 API를 호출하고 결과를 받아온다면:
        const result = {
            latitude: "37.5665",  // 예시: 서울의 위도
            longitude: "126.9780", // 예시: 서울의 경도
            placeName: "서울"
        };
        addPlan(result);
    };

    return (

        <div>
              <div className="image-container">
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
                <div>
                    <input 
                        type="text" 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="장소 검색..."
                    />
                    <button onClick={handleSearch}>검색</button>
                    {/* 검색 결과 및 기타 UI 추가 */}
                    
                </div>
            </div>
        </div>

    );
}

export default MyTravelCreateLists;