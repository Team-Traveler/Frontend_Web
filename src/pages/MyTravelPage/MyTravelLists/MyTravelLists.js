import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './styles.css';
import { useRecoilState,useSetRecoilState } from 'recoil';
import { userInfoState } from "../../../recoil/atoms/userState";
import { myAllTravelsState,deleteTravelById } from '../../../recoil/atoms/myAllTravelsState'; 
import { setTravelSpecificStateSelector,selectedTIDState, setSelectedTIDSelector } from '../../../recoil/atoms/travelSpecificState'; 


function TravelCard({ tid, title, write_status, start_date, end_date, setView, isEditMode, setIsEditMode, onDelete,setSelectedTID,onDetails }) {

  console.log("Travel title : ",tid);

  const handleDetailClick = () => {
    console.log('Detail button clicked');
    console.log('Detail button clicked with tid:', tid);
    onDetails(tid);
    setSelectedTID(tid);
    setView('specifics');

  };

  const handleReviewClick = () => {
    console.log('Review button clicked');
    setView('review');
  };

  const handleShareClick = () => {
    console.log('Share button clicked');
    setView('share');
  };

  const handleEditClick = () => {
    console.log('Edit button clicked');
    setIsEditMode(false)
    setSelectedTID(tid);
    setView('edit');
  };

  const handleDeleteClick = () => {
    console.log('Delete button clicked');
    onDelete(tid);
  };

  function formatDate(input) {
    const date = new Date(input);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해주어야 합니다.
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${month}/${day}`;
  }

  function calculateDaysBetween(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
  
    // 시작 및 종료 날짜에서 시간, 분, 초, 밀리초를 제거
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
  
    // 두 날짜의 차이를 일로 계산
    const diffDays = (endDate - startDate) / (24 * 60 * 60 * 1000) + 1;
  
    // "x박 y일" 형식으로 반환
    return `${diffDays - 1}박 ${diffDays}일`;
  }

  return (
    <div>
        <div className="travel-card">
          <div style={{  display: 'flex', flexDirection: 'row', marginTop: '10px', marginBottom: '10px', marginLeft: '40px', alignItems: 'flex-end'}}>
            <div className="travel-card-name">{title}</div>
            <div className="travel-card-category">{(write_status==0)?"개인맞춤":"직접"}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', marginBottom: '10px', marginLeft: '40px'}}>
            <div className="travel-card-list-duration">{calculateDaysBetween(start_date,end_date)}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', marginBottom: '10px', marginLeft: '40px' }}>
            <div className="travel-card-text">{formatDate(start_date)}</div>
            <div className="travel-card-text">~</div>
            <div className="travel-card-text">{formatDate(end_date)}</div>
          </div>
          {isEditMode ? (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: '10px', marginBottom: '10px', marginLeft: '450px', marginRight: '40px' }}>
              <div className="travel-card-category" onClick={handleEditClick}>편집</div>
              <div className="travel-card-category" onClick={handleDeleteClick}>삭제</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginTop: '10px', marginBottom: '10px', marginLeft: '40px', marginRight:'40px'}}>
              <div className="travel-card-button" onClick={handleDetailClick}>상세보기</div>
              <div className="travel-card-button" onClick={handleReviewClick}>리뷰쓰기</div>
              <div className="travel-card-button" onClick={handleShareClick}>공유</div>
            </div>
        )}
        </div>
    </div>
    
  );
}

function MyTravelLists({ setSelectedTravel, setView, isEditMode,setIsEditMode }) {
  const TAG = "MyTravelLists";
  const [travelList, setTravelList] = useRecoilState(myAllTravelsState); 
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selectedTID, setSelectedTID] = useRecoilState(selectedTIDState);
  const [travelSpecificData,setTravelSpecificData] = useRecoilState(setTravelSpecificStateSelector);

  async function deleteTravelData(tid) {
    try {
      const url = `http://15.164.232.95:9000/travel/${tid}`;
      const response = await axios.delete(url,
        {
            headers: {
                Authorization: `${userInfo.accessToken}`,
            },
        }
      );

      if (response.status === 200) {
          console.log("여행 삭제 완료");
      }
    } catch (error) {
        console.error("Error fetching travel data:", error);
    }
  }
  
  async function fetchSpecificData(tid) {
    try {
        const response = await axios({
            method: 'GET',
            url: `http://15.164.232.95:9000/travel/${tid}`,
            headers: {
              Authorization: `${userInfo.accessToken}` 
          }
        });

        if (response.status === 200) {
            const travelData = response.data;
            setTravelSpecificData(travelData.result);
            console.log("fetched travel Specific data : ", travelSpecificData);

        }
    } catch (error) {
        console.log("SelectedTID :",tid);
        
        console.error("Error fetching travel Specific data:", error);
    }
  }

  useEffect(() => {
    console.log(TAG+"-상세여행조회 : ", travelSpecificData);
    console.log(TAG+"현재 저장된 값", travelList);
  }, [travelList,travelSpecificData]);

  const handleDelete = (tid) => {
    setTravelList(prevTravelList => prevTravelList.filter(travel => travel.tid !== tid));
    deleteTravelData(tid)
  };

  return (
    <div className="my-travel-lists">
      {!travelList ||travelList.length === 0 ? ( // 여행 리스트가 없는 경우
        <div>이 항목에는 여행 리스트 값이 없습니다.</div>
      ) : (
        travelList.map((travel, index) => {
          return (
            <TravelCard key={travel.tid || index} {...travel} 
                setSelectedTravel={setSelectedTravel} 
                setView={setView}
                isEditMode={isEditMode} 
                onDelete={handleDelete}
                onDetails={fetchSpecificData}
                title={travel.title}
                setIsEditMode={setIsEditMode} 
                tid = {travel.tid} 
                start_date={travel.start_date} 
                end_date={travel.end_date} 
                setSelectedTID={setSelectedTID}/>
          );
        })
      )}
    </div>
  );
}

export default MyTravelLists;
