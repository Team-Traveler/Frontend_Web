import React, { useState } from 'react';
import MyTravelMap from '../MyTravelMap/MyTravelMap';
import MyTravelCreateLists from '../MyTravelCreateLists/MyTravelCreateLists';
import './styles.css';

function MyTravelCreate(props) {
    const [TravelPlanList, setTravelPlanList] = useState([]);

    const addPlan = (plan) => {
        const id = (TravelPlanList.length + 1).toString();  // 기존 리스트 길이 + 1로 id 할당
        const newPlan = { ...plan, id };
        setTravelPlanList(prev => [...prev, newPlan]);
    };

    const handleClick = () => {
        console.log("Add clicked");
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh'
        }}>
                <div style={{ flexGrow: 1 }}>
                    <MyTravelCreateLists addPlan={addPlan} />
                </div>
            <button className="addButton" onClick={handleClick}>추가하기</button>
        </div>
    );
}

export default MyTravelCreate;