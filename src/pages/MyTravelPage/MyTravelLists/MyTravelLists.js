import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { useRecoilState } from 'recoil';
import { travelsState } from '../../../recoil/atoms/travelsListStates'; 


function TravelCard({ name, write_status, duration, start, end, setView, isEditMode, setIsEditMode, onDelete }) {

  const handleDetailClick = () => {
    console.log('Detail button clicked');
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
    setView('edit');
  };

  const handleDeleteClick = () => {
    console.log('Delete button clicked');
    onDelete(name);
  };

  return (
    <div>
        <div className="travel-card">
          <div style={{  display: 'flex', flexDirection: 'row', marginTop: '10px', marginBottom: '10px', marginLeft: '40px', alignItems: 'flex-end'}}>
            <div className="travel-card-name">{name}</div>
            <div className="travel-card-category">{(write_status==0)?"개인맞춤":"직접"}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', marginBottom: '10px', marginLeft: '40px'}}>
            <div className="travel-card-duration">{duration}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', marginBottom: '10px', marginLeft: '40px' }}>
            <div className="travel-card-text">{start}</div>
            <div className="travel-card-text">~</div>
            <div className="travel-card-text">{end}</div>
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

  const [travelList, setTravelList] = useRecoilState(travelsState); 
  const handleDelete = (name) => {
    const updatedList = travelList.filter(travel => travel.name !== name);
    setTravelList(updatedList);
  };

  return (
    <div className="my-travel-lists">
      
      {travelList.map((travel, index) => {
          console.log("travel길이 : ",travelList.length);
          // tid가 null인 경우의 처리
          if (travelList.length <= 1) {
              return <div key={index} >이 항목에는 tid 값이 없습니다.</div>;
          }
          // tid가 null이 아닌 경우의 처리
          if(travel.id === 1) {
            return ;
          }

          return (
              <TravelCard key={index} {...travel} setSelectedTravel={setSelectedTravel} 
                  setView={setView} isEditMode={isEditMode} onDelete={handleDelete}
                  setIsEditMode={setIsEditMode}/>
          );
      })}

    </div>
  );
}

export default MyTravelLists;

