import React, { useState,useEffect } from 'react';
import { useRecoilState,useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";
import ReactDOM from 'react-dom';
import './styles.css';
import circles from './circles.svg'; 
import MyTravelCreate from '../MyTravelCreate/MyTravelCreate';
import axios from 'axios';
import {  travelCourseState, setTravelSpecificStateSelector,selectedTIDState, travelSpecificState,getCourseByDcIdSelector,setCourseByDcIdSelector } from '../../../recoil/atoms/travelSpecificState';


function TravelEmptyCard({ start, end, setView, handleEditClick,setSelectedCourse,setIsTravelCreate,isEditClicked,...props }) {
  
  const handleEditSpecificsClick = () => {
    console.log('Edit Specifics Empty button clicked');
    console.log(setIsTravelCreate);
    setIsTravelCreate(true); 
  };

  //console.log("start데이는:",formatDate(start));

  function formatDate(input) {
    const date = new Date(input);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해주어야 합니다.
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}`;
  }

  function getDayOfWeek(input) {
    const date = new Date(input);
    const days = ['일','월','화','수','목','금','토'];
    return `(${days[date.getDay()]})`;
}

  return (
    <div>
      <div className="travel-card-header">
          <span className='numofDay'>{1}일차</span>
          <span className='day'>{formatDate(start)}{getDayOfWeek(start)}</span>
      </div>      
      <div className="travel-card" style={{marginTop:'20px',marginLeft:'20px', marginRight:'20px'}}>
        <span className='travel-card-empty'>항목을 추가하세요</span>
      {isEditClicked &&
        <button className="edit-specific-empty-button" 
        onClick={() => handleEditSpecificsClick({ setIsTravelCreate })}></button>
        
      }
      
      </div>
    </div>
  );
}



  function TravelCard({ index, spot1, spot2, spot3, spot4, first, second, third, start, end, setView,numOfDay, handleEditClick,setSelectedCourse,setIsTravelCreate,isEditClicked,...props }) {
  
    const handleEditSpecificsClick = (course) => {
      setIsTravelCreate(true); 
    };

    const convertDistance = (distance) => {
      if (distance >= 1000) {
        return `${distance / 1000}km`;
      }
      return `${distance}m`;
    };
    
    //console.log("start데이는:",start);

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
            <span className='day'>{formatDate(start)}{getDayOfWeek(start,index)}</span>
        </div>      
        <div className="travel-card">
        {isEditClicked &&
          <button className="edit-specific-extra-button" 
          onClick={() => handleEditSpecificsClick({ spot1, spot2, spot3, spot4, first, second, third, start, end, numOfDay,setIsTravelCreate })}></button>
          
        }
        
          { spot1==null?(
            <span className='travel-card-empty'>항목을 추가하세요</span>
          ):(
            <SpotDisplay num="1" spot={spot1} distance={first} />
          )}
          {spot2 && <SpotDisplay num="2" spot={spot2} distance={second} />}
          {spot3 && <SpotDisplay num="3" spot={spot3} distance={third} />}
          {spot4 && <SpotDisplay num="4" spot={spot4}  />}
        </div>
      </div>
    );
  }
  
  function MyTravelSpecificsLists({travels,setSelectedCourse,setIsTravelCreate, selectedTID,...props }) {
    
    const TAG = "MyTravelSpecificsLists";
    const[isEditClicked, setIsEditClicked] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [travelSpecificData,setTravelSpecificData] = useRecoilState(setTravelSpecificStateSelector);
    const [travelCourse,setTravelCourse]=useRecoilState(travelCourseState);

    useEffect(() => {
    const fetchSpecificData = async () => {
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
              setTravelSpecificData(travelData.result);
              console.log(TAG+"-상세여행조회 get : ", travelSpecificData);
  
          }
      } catch (error) {
          console.log("SelectedTID :",selectedTID);
          
          console.error("Error fetching travel Specific data:", error);
      }
  }

  fetchSpecificData();
  postCourse(1);
},[]);

console.log(TAG+"-mount : ", travelSpecificData);
console.log(TAG+"-mount : ", selectedTID);
  if((Object.values(travelSpecificData.courses).length != 0)||travelSpecificData.courses.length !=0){
    setTravelCourse(travelSpecificData.courses);
    console.log(TAG+"-travelCourse",travelCourse);
  }



  // useEffect(()=>{
  //   if((Object.values(travelSpecificData.courses).length != 0)||travelSpecificData.courses.length !=0){
  //     setTravelCourse(travelSpecificData.courses);
  //   }
  //   console.log("travelCourse는 ",travelSpecificData.courses);
  // },[travelSpecificData]);

  async function postCourse(numOfDay) {
    try {
        const response = await axios({
            method: 'POST',
            url: `http://15.164.232.95:9000/travel/${selectedTID}/course`,
            headers: {
              Authorization: `${userInfo.accessToken}` 
            },
            data:{
              "numOfDay" : numOfDay
            }
        });

        if (response.status === 200) {
            const travelData = response.data;
            console.log(TAG+"-날짜별 코스 생성 : ", travelData);

        }
    } catch (error) {
        console.log("SelectedTID :",selectedTID);
        console.error("Error postCourse :", error);
    }
}

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
      postCourse(travelCourse.length+1);
    };



    //console.log("travel.start_date데이는:", travelSpecificData.start_date);
    return (
        <div>
              <div className="image-container">
                <img src={circles} alt="Circles Decoration"  />
              </div>
              <div className="my-travel-specific-lists">
                {  (travelCourse.length == 1) && (travelCourse[0].spot1 ==null) ? (
                    <TravelEmptyCard start={travelSpecificData.start_date} end={travelSpecificData.end_date} 
                    handleEditClick={handleEditClick} setSelectedCourse={setSelectedCourse} setIsTravelCreate={setIsTravelCreate}
                    isEditClicked={isEditClicked}/>
                ) : (
                  travelCourse
                    .map((travel, index) => 
                        <TravelCard key={index} {...travel} 
                        index = {index}
                        start={travelSpecificData.start_date} end={travelSpecificData.end_date} 
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