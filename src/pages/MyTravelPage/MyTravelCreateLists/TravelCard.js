import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { setPlaceStateSelector } from "../../../recoil/atoms/placeState";
import {
    searchSubmitState,
    selectedTravelState,
    fromPlaceSearchState,
    placeSearchState,
} from "../../../recoil/atoms/placeSearchState";
import axios from "axios";
import './TravelCard.css';
import { createPlaceState } from "../../../recoil/atoms/createPlaceState";
import { IoAddCircleOutline } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { API } from "../../../config";
import { userInfoState } from "../../../recoil/atoms/userState";
import {ReactComponent as Vector} from "./Vector.svg";

function TravelCard({ index, selectedTID, Place, setPlace, setplaceSearchState, InputText, recoilPlaces, days,selectedCourse}) {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [createPlace, setCreatePlace] = useRecoilState(createPlaceState); // 여행 임시 저장 state
    const [recentDay, setRecentDay] = useState(0); // 최근 선택된 날짜
    const [dayArray, setDayArray] = useState(Array(days).fill("none")); // 
    const [inputList, setInputList] = useState(Array(days).fill("")); // 날짜별 input
    /* Input */
    const [search, setSearch] = useState("");
    const [isFromSearch, setIsFromSearch] = useRecoilState(fromPlaceSearchState);

    const changeInput = (index, text) => {
        const inputData = [...inputList];
        inputData[index] = text;
        setInputList(inputData);
    }

    const onChange = (e,index) => {
        changeInput(index,e.target.value);
    };
    const [modal, setModal] = useState(false);
    
    const handleSearch = (e,index) => {
        e.preventDefault();
        setPlace(inputList[index]);
        setModal(true);
        setRecentDay(index);
    };

    function handleItemClick(item) {
        console.log("Clicked item:", item);
        setplaceSearchState(item);
        setIsFromSearch(true);
        setModal(false);
        changeInput(recentDay,item.place_name);
        
        const newPlace = [...dayArray];
        newPlace[recentDay] = item;
        setDayArray(newPlace);
        console.log("total Course",dayArray);
    }

    const addItem = async(index)=>{
        await axios.post(`${API.HEADER}/travel/course/${index}/spot`,{ headers: {Authorization:userInfo.accessToken,}},
            {
                title : dayArray[index].place_name,
                latitude : dayArray[index].y,
                longitude : dayArray[index].x
            }
        )
        .then(response=>{
            if(response.data.isSuccess){
                console.log(`${index+1}일 코스 등록`,response.data.result);
            }
            else console.log(`${index+1}일 코스 등록 실패`,response.data.result);
        })
        .catch(e=>{console.log('error',e)})
    }

    // 날짜별 코스 등록 버튼 클릭
    const addItemClick = (index)=>{
        addItem(index);
    }

    const handleEditSpecificsClick = (course) => {};

    const handleDeleteClick = (spotNum) => {};

    const convertDistance = (distance) => {
        if (distance >= 1000) {
            return `${distance / 1000}km`;
        }
        return `${distance}m`;
    };

    function getDayOfWeek(input, index) {
        const date = new Date(input);
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const nextDayIndex = (date.getDay() + index) % 7;

        // 월과 일을 추출
        const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줌
        date.setDate(date.getDate()+index);
        const day = ('0' + date.getDate()).slice(-2);

        // 월.일 형태로 포맷팅
        const formattedDateString = `${month}.${day}`;
        return `${formattedDateString} (${days[nextDayIndex]})`;
    }

    useEffect(()=>{
        console.log('createPlace',createPlace);
        console.log('selectedCourse',selectedCourse);
    },[Place])

    useEffect(()=>{
        changeInput(recentDay,InputText);
    },[InputText])

    const SpotDisplay = ({ num, spot, distance }) => (
        <div className="spot-wrapper">
            <div className="spot-container">
                <div className="num-box">{`${num}`}</div>
                <div className="travel-card-places">{spot}</div>
                <div
                    className="travel-carrd-delete"
                    onClick={handleDeleteClick(num)}
                >
                    삭제
                </div>
            </div>
            {distance && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        marginTop: "10px",
                        marginBottom: "10px",
                        marginLeft: "10px",
                        marginRight: "40px",
                    }}
                >
                    <div className="div-size">|</div>
                    <div>{convertDistance(distance)}</div>
                </div>
            )}
        </div>
    );

    return (
        <div>
            {dayArray.map((item, index)=>( /* index 일차 */
            <div className="travel-card-box">
                <div className="travel-card-create-header">
                    <span className="numofDay">{index+1}일 차</span>
                    <span className="day">
                    {getDayOfWeek(selectedCourse.start_date, index)}
                    </span>
                </div>
                <div className="travel-create-card">
                    {createPlace.courses[index]?.spot1.title && (
                        <SpotDisplay
                            num="1"
                            spot={createPlace.courses[index].spot1}
                            distance={createPlace.courses[index].first}
                        />
                    )}
                    {createPlace.courses[index]?.spot2.title && (
                        <SpotDisplay
                            num="2"
                            spot={createPlace.courses[index].spot2}
                            distance={createPlace.courses[index].second}
                        />
                    )}
                    {createPlace.courses[index]?.spot3.title && (
                        <SpotDisplay
                            num="1"
                            spot={createPlace.courses[index].spot3}
                            distance={createPlace.courses[index].third}
                        />
                    )}
                    {createPlace.courses[index]?.spot4.title && (
                        <SpotDisplay
                            num="1"
                            spot={createPlace.courses[index].spot4}
                            distance={createPlace.courses[index].spot4}
                        />
                    )}
                    <div className="inputFormContainer">
                        <form className="inputform" onSubmit={(event)=>{handleSearch(event,index)}}>
                            <div id="num-circle">
                                {createPlace.courses.length === 1 ? (createPlace.courses[index]?.spot1.title ? 2 : 1) 
                                : createPlace.courses.length + 1}
                            </div>
                            <input
                                key={index}
                                className="place-input"
                                placeholder="장소를 검색해 보세요."
                                onChange={(event)=>{onChange(event,index)}}
                                value={inputList[index]}
                            />
                            <IoAddCircleOutline className="add-button" style={{color:"#9CBBAC",fontSize:"30px", cursor:"pointer"}} type="button" onClick={(index)=>{addItemClick(index)}}/>
                        </form>
                        <div className="result-Style" style={{display : modal && recentDay === index ? "block" : "none"}}>
                            <span style={{fontSize:"30px"}}>관련 여행지</span>
                            {recoilPlaces.map((item, i) => (
                                <div
                                    key={i}
                                    className="item-search-create-container"
                                    onClick={() => handleItemClick(item)}
                                >
                                    <div className="mark-box"><Vector/></div>
                                    <div>
                                        <span
                                            style={{
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {item.place_name}
                                        </span>
                                        {item.road_address_name ? (
                                            <div
                                                style={{
                                                    fontSize: "19px",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                <span>
                                                    {item.road_address_name}
                                                </span>
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    fontSize: "19px",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                <span>{item.address_name}</span>
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
            ))
            }
        </div>
    );
}

export default TravelCard;