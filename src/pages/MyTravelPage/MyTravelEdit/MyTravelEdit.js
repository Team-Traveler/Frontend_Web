import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MyTravelInputWindows from '../MyTravelInputWindows/MyTravelInputWindows';
import './styles.css';


function MyTravelEdit(props) {
    const [travelInfo, setTravelInfo] = useState({
        name: "",
        placeName: "",
        latitude: "",
        longitude: "",
        startDate: "",
        endDate: ""
    });

    const onTravelInfoSubmit = (info) => {
        const [
          name,
          placeName,
          latitude,
          longitude,
          startDate,
          endDate
        ] = info;
    
        setTravelInfo({
          name,
          placeName,
          latitude,
          longitude,
          startDate,
          endDate
        });
    
        // 추가적으로 필요한 로직(정보전송)
    };
    
    console.log('Travel Edit result: ', travelInfo);

    return (
        <div>
            <div className="group490-edit">
                <h1 className="Title-edit">여행 편집</h1>
                <p className="subText-edit">
                    나의 여행 일정 이름과 날짜를 수정할 수 있습니다.
                </p>
                <div className="rectangle-edit"></div>
            </div>
            <div className="windows-edit">
                <MyTravelInputWindows onTravelInfoSubmit={onTravelInfoSubmit} isFromEdit = {true}/>
            </div>
            
        
        </div>
    );
}

export default MyTravelEdit;