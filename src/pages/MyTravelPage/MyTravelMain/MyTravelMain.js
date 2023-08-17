import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './MyTravelMain.css';
import MyTravelProfile from '../MyTravelProfile/MyTravelProfile';
import MyTravelSpecifics from '../MyTravelSpecifics/MyTravelSpecifics';
import BtnMyTravelMenu from '../BtnMyTravelMenu/BtnMyTravelMenu';
import MyTravelLists from '../MyTravelLists/MyTravelLists';
import MyTravelAdd from '../MyTravelAdd/MyTravelAdd';
import profileTest from './profileTest.png'
import MyTravelEdit from '../MyTravelEdit/MyTravelEdit'
import MyTravelProfileEdit from '../MyTravelProfileEdit/MyTravelProfileEdit';
import Nav from '../../../components/Nav/Nav'

function MyTravelMain() {
  const [view, setView] = useState('list'); 
  const [selectedTravel, setSelectedTravel] = useState(null); //상세보기 활성화 여부
  const [isEditMode, setIsEditMode] = useState(false); // 목록 편집 활성화 여부
  const profileRef = React.useRef();
  const handleDetailClick = (travel) => {
    setSelectedTravel(travel);
    setView('specifics');
  };

  const profileData = {
    imgSrc: profileTest,
    name: '라이언',
    numTravel: 8,
    numLiked: 20,
    date: '2023.07.03'
  };

  return (
    <div className='myTravelMain'>
      <Nav/> 
      <div style={{ display: 'flex', justifyContent:'center', }}>
        <button 
          className="edit-done-button" 
          onClick={() => setIsEditMode(false)}
          style={{
            opacity: isEditMode ? 1 : 0,
            pointerEvents: isEditMode ? 'auto' : 'none'
          }}
        >
          편집 완료
        </button>

        {view === 'list' && (
          <div className='my-travel-main-container'>
            <div className='my-travel-profile' ref={profileRef}>
              <MyTravelProfile imgSrc={profileData.imgSrc} 
  name={profileData.name} 
  numTravel={profileData.numTravel} 
  numLiked={profileData.numLiked} 
  date={profileData.date}  />
            </div>
            <div style={{ 
              flexGrow: 1,
              marginLeft: '4.2vw', 
              height: profileRef.current ? profileRef.current.clientHeight : 'auto' 
              }}>
              <MyTravelLists setView={setView} 
              isEditMode={isEditMode} setIsEditMode={setIsEditMode}
              view={view} />
            </div>
          </div>
        )}

        {/* 여행 만들기 */}
        {view === 'add' && (
          <div>
            <MyTravelAdd setView={setView}/>
          </div>
        )}


        {/* 여행 코스 편집 */}
        {view === 'edit' && (
          <div style={{ display: 'flex', flexDirection: 'row',justifyContent:'center', height: '62.6vh' }}>
            <MyTravelEdit />
          </div>
        )}

        {/* 프로필 편집 */}
        {view === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'row',justifyContent:'center', height: '62.6vh' }}>
            <MyTravelProfileEdit imgSrc={'./profile.svg'}/>
          </div>
        )}


        {/* 상세보기 */}
        {view === 'specifics' && (
          <div style={{ flexGrow: 1}}>
            <MyTravelSpecifics travel={selectedTravel} />
          </div>
        )}


        {/* 찜한 여행 */}
        {view === 'like' && (
          <div style={{ display: 'flex', flexDirection: 'row',justifyContent:'center', height: '62.6vh' }}>
          찜한여행
          </div>
        )}

        {/* 후기 작성 */}
        {view === 'review' && (
          <div style={{ display: 'flex', flexDirection: 'row',justifyContent:'center', height: '62.6vh' }}>
          후기작성
          </div>
        )}



        {/* 공유 */}
        {view === 'share' && (
          <div style={{ display: 'flex', flexDirection: 'row',justifyContent:'center', height: '62.6vh' }}>
          공유하기
          </div>
        )}


        
        <div style={{ position: 'absolute', left: '2.2vw', bottom: '3.1vh', zIndex: 1000 }}>
          <BtnMyTravelMenu 
          toggleEditMode={() => setIsEditMode(!isEditMode)}
          view={view} setView={setView}

          />
        </div>
      </div>
    </div>
  );
}

export default MyTravelMain;
