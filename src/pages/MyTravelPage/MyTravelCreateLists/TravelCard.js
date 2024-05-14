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
import { IoIosCloseCircleOutline,IoMdClose } from "react-icons/io";
import {ReactComponent as Line} from "./Line.svg";

function TravelCard({ selectedTID, Place, setPlace, setplaceSearchState, recoilPlaces,selectedCourse}) {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [createPlace, setCreatePlace] = useRecoilState(createPlaceState); // 여행 임시 저장 state
    const [travel, setTravel] = useState(selectedCourse);
    const [recentDay, setRecentDay] = useState(0); // 최근 선택된 날짜
    const [dayArray, setDayArray] = useState(Array(selectedCourse.courses.length).fill("none")); // 날짜별 검색된 Place 저장
    const [inputList, setInputList] = useState(Array(selectedCourse.courses.length).fill("")); // 날짜별 input
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

    // 코스 정보 불러오기
    const fetchCourse = async()=>{
        // post 요청 시 꼭 url, data, config(header) 순서로 적어야하며 data가 없을 경우 null로 표시해야함!!!
        await axios.get(`${API.HEADER}/travel/${selectedTID}`, { headers: {Authorization:userInfo.accessToken,}})
        .then(response=>{
            if(response.data.isSuccess){
                console.log(`tId : ${selectedTID} 상세 조회`,response.data.result);
                setTravel(response.data.result);
            }
            else console.log(`tId : ${selectedTID} 상세 조회 실패`,response.data.result);
        })
        .catch(e=>{console.log('error',e)})
    }

    // index 일차의 spot이 몇까지 저장돼있는지
    const spotNum = (index)=>{
        if(travel.courses[index]?.spot1===null){
            return 1;
        }   
        else if(travel.courses[index]?.spot2===null){
            return 2;
        }
        else if(travel.courses[index]?.spot3===null){
            return 3;
        } 
        else if(travel.courses[index]?.spot4===null){
            return 4;
        }
        else return 0;          
    }

    const addItem = async(index)=>{
        // post 요청 시 꼭 url, data, config(header) 순서로 적어야하며 data가 없을 경우 null로 표시해야함!!!
        await axios.post(`${API.HEADER}/travel/course/${selectedCourse.courses[index].dcId}/spot`,
        {
            title : dayArray[index].place_name,
            latitude : parseFloat(dayArray[index].y),
            longitude : parseFloat(dayArray[index].x)
        },
        { headers: {Authorization:userInfo.accessToken,}},
        )
        .then(response=>{
            if(response.data.isSuccess){
                console.log(`${index+1}일 코스 등록`,response.data.result);
                fetchCourse();
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
            return `${Math.floor(distance / 1000)}km`;
        }
        return `${Math.floor(distance)}m`;
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
        console.log('selectedCourse',selectedCourse);
        console.log('travel',travel);
        if(travel == null){
            fetchCourse();
        }
    },[Place])

    // 위도, 경도로 상세 주소 찾아오기 
    // const getAddress = async (longitude,latitude) => {
    //     try {
    //       const response = await axios.get(
    //         `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
    //         {
    //           headers: {
    //             Authorization: 'KakaoAK YOUR_KAKAO_API_KEY',
    //           },
    //         }
    //       );
    //       setAddress(response.data.documents[0].address.address_name);
    //     } catch (error) {
    //       console.error('Error fetching address:', error);
    //     }
    //   };

    // 코스 저장 시 번호별 보여주기 
    const SpotDisplay = ({ num, spot, distance }) => (
        <div>
            <div className={`spot-box ${distance > 0 && num!==1 ? '' : 'dist' }`}>
                <div className="spot-container">
                    <div id="num-circle">{num}</div>
                    <div className="travel-card-places">
                        <span>{spot.title}</span>
                        <span style={{fontSize:"15px",color:"#C7C7C7"}}>상세주소</span>
                    </div>
                    <IoIosCloseCircleOutline className="travel-card-delete" onClick={handleDeleteClick(num)}/>
                </div>
            </div>
            {/* 거리 보여주기 */}
            {distance>0&&(
                <div className="distance-wrap">
                    <Line style={{marginLeft:"29px"}}/>
                    <div className="distance-box">
                        <div className="distance">{convertDistance(distance)}</div>
                    </div>
                </div>
            )}
        </div>

    );

    return travel&&(
        <div className="travel-detail-body">
            {dayArray.map((item, index)=>( /* index 일차 */
            <div className="travel-card-box">
                <div className="travel-card-create-header">
                    <span className="numofDay">{index+1}일 차</span>
                    <span className="day">
                    {getDayOfWeek(selectedCourse.start_date, index)}
                    </span>
                </div>
                <div className="travel-create-card">
                    {travel.courses[index]?.spot1?.title && (
                        <SpotDisplay
                            num="1"
                            spot={travel.courses[index].spot1}
                            distance={travel.courses[index].first}
                        />
                    )}
                    {travel.courses[index]?.spot2?.title && (
                        <SpotDisplay
                            num="2"
                            spot={travel.courses[index].spot2}
                            distance={travel.courses[index].second}
                        />
                    )}
                    {travel.courses[index]?.spot3?.title && (
                        <SpotDisplay
                            num="3"
                            spot={travel.courses[index].spot3}
                            distance={travel.courses[index].third}
                        />
                    )}
                    {travel.courses[index]?.spot4?.title && (
                        <SpotDisplay
                            num="4"
                            spot={travel.courses[index].spot4}
                        />
                    )}
                    {spotNum(index)!==0&&(
                    <div className="inputFormContainer">
                        <form className="inputform" onSubmit={(event)=>{handleSearch(event,index)}}>
                            <div id="num-circle">
                            <div className="num">{spotNum(index)}</div>
                            </div>
                            <input
                                key={index}
                                className="place-input"
                                placeholder="장소를 검색해 보세요."
                                onChange={(event)=>{onChange(event,index)}}
                                value={inputList[index]}
                            />
                            {dayArray[index]!=="none" &&(
                            <IoAddCircleOutline 
                                className="add-button" 
                                style={{color:"#9CBBAC",fontSize:"25px", cursor:"pointer"}} 
                                type="button" 
                                onClick={()=>{addItemClick(index)}}
                            />
                            )}
                        </form>
                        <div className="result-Style" style={{display : modal && recentDay === index ? "block" : "none"}}>
                            <IoMdClose  className="close-result" onClick={()=>{setModal(false)}}/>
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
                        )}
                </div>
            </div>
            ))
            }
        </div>
    );
}

export default TravelCard;