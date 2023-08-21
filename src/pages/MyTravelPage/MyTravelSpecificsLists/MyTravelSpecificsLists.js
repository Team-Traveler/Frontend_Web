import React, { useState,useEffect } from 'react';
import { useRecoilState,useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";
import ReactDOM from 'react-dom';
import './styles.css';
import circles from './circles.svg'; 
import MyTravelCreate from '../MyTravelCreate/MyTravelCreate';
import axios from 'axios';
import {  setTravelSpecificStateSelector,selectedTIDState, travelSpecificState,getCourseByDcIdSelector,setCourseByDcIdSelector } from '../../../recoil/atoms/travelSpecificState';



  function TravelCard({  spot1, spot2, spot3, spot4, first, second, third, start, end, setView,numOfDay, handleEditClick,setSelectedCourse,setIsTravelCreate,isEditClicked,...props }) {
  
    const handleEditSpecificsClick = (course) => {
      console.log('Edit Specifics button clicked',numOfDay);
      console.log(setIsTravelCreate);
      setIsTravelCreate(true); 
    };

    const convertDistance = (distance) => {
      if (distance >= 1000) {
        return `${distance / 1000}km`;
      }
      return `${distance}m`;
    };
    
    console.log("start데이는:",start);

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
        <div className="travel-card-header">
            <span className='numofDay'>{numOfDay}일차</span>
            <span className='day'>{formatDate(addDays(convertToDate(start), numOfDay - 1))}</span>
        </div>      
        <div className="travel-card">
        {isEditClicked &&
          <button className="edit-specific-extra-button" 
          onClick={() => handleEditSpecificsClick({ spot1, spot2, spot3, spot4, first, second, third, start, end, numOfDay,setIsTravelCreate })}></button>
          
        }
        
          <SpotDisplay num="1" spot={spot1} distance={first} />
          {spot2 && <SpotDisplay num="2" spot={spot2} distance={second} />}
          {spot3 && <SpotDisplay num="3" spot={spot3} distance={third} />}
          {spot4 && <SpotDisplay num="4" spot={spot4}  />}
        </div>
      </div>
    );
  }
  
  function MyTravelSpecificsLists({ travels,setSelectedCourse,setIsTravelCreate, selectedTID,...props }) {
    
    const TAG = "MyTravelSpecificsLists";
    const[isEditClicked, setIsEditClicked] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [travelSpecificData,setTravelSpecificData] = useRecoilState(setTravelSpecificStateSelector);

    async function fetchSpecificData() {
      try {
          const response = await axios({
              method: 'GET',
              url: `http://15.164.232.95:9000/travel/${selectedTID}`,
              headers: {
                Authorization: `${userInfo.accessToken}` 
            }
          });
  
          if (response.status === 200) {
              const travelData = response.data;
              setTravelSpecificData(travelData);
              console.log(TAG+"-상세여행조회 : ", travelData);
  
          }
      } catch (error) {
          console.log("SelectedTID :",selectedTID);
          
          console.error("Error fetching travel Specific data:", error);
      }
  }

  useEffect(() => {
    fetchSpecificData();
}, []);

    const handleEditClick = (course) => {
      console.log('Edit button clicked');
      //setSelectedCourse(course);
      if(isEditClicked){
        setIsEditClicked(false);
      }
      else{
        setIsEditClicked(true);
      }
        
    };

    const handlePlusClick = (course) => {
      console.log('Edit button clicked');
      //setSelectedCourse(course);

        
    };



    console.log("travel.start_date데이는:", travels.start_date);
    return (
        <div>
              <div className="image-container">
                <img src={circles} alt="Circles Decoration"  />
              </div>
              <div className="my-travel-specific-lists">
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
                  travels.courses
                    .sort((a, b) => a.numOfDay - b.numOfDay)  // 오름차순으로 정렬
                    .map((travel, index) => 
                        <TravelCard key={index} {...travel} start={travels.start_date} end={travel.end_date} 
                        handleEditClick={handleEditClick} setSelectedCourse={setSelectedCourse} setIsTravelCreate={setIsTravelCreate}
                        isEditClicked={isEditClicked} />
                    )
                    
                )}
                {isEditClicked?(
                  <>
                    <button className="edit-specific-plus-button" onClick={handlePlusClick}></button>
                    <button className="edit-specific-minus-button" onClick={handleEditClick}></button>
                  </>
                ):(
                    <button className="edit-specific-button" onClick={handleEditClick}></button>)}
                

                

              </div>
        </div>
    );
  }
  
  export default MyTravelSpecificsLists;
  