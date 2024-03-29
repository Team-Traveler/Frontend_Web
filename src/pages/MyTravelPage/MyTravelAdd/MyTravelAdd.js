import React, { useState } from "react";
import ReactDOM from "react-dom";
import MyTravelInputWindows from "../MyTravelInputWindows/MyTravelInputWindows";
import "./styles.css";

function MyTravelAdd({ setView, ...props }) {
    const [travelInfo, setTravelInfo] = useState({
        name: "",
        placeName: "",
        category: "",
        startDate: "",
        endDate: "",
    });

    const onTravelInfoSubmit = (info) => {
        const [name, placeName, category, startDate, endDate] = info;

        setTravelInfo({
            name,
            placeName,
            category,
            startDate,
            endDate,
        });
    };
    //console.log('Travel Add result: ', travelInfo);

    return (
        <div>
            <div className="group490">
                <h1 className="Title">여행 만들기</h1>
                <p className="subText">
                    나의 여행 일정을 만들어보세요. 장소와 날짜를 직접 설정하고
                    일일 계획을 구성할 수 있습니다.
                </p>
                <div className="rectangle"></div>
            </div>
            <div className="windows">
                <MyTravelInputWindows isFromEdit={false} setView={setView} />
            </div>
        </div>
    );
}

export default MyTravelAdd;
