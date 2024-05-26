import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useLocation,useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import axios from "axios";
import "./infoDetail.css";
import Map from "../../MyTravelPage/MyTravelMap/api/Map";
import { setPlaceStateSelector } from "../../../recoil/atoms/placeState";
import { userInfoState } from "../../../recoil/atoms/userState";
import { API } from "../../../config";
import {ReactComponent as Line} from './Line.svg';
import Nav from "../../../components/Nav/Nav";

function InfoDetail(){
    const { tid } = useParams();
    const [Place, setPlace] = useState("");
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [travel, setTravel] = useState();
    const [recoilPlaces, setRecoilPlaces] = useRecoilState(setPlaceStateSelector);
    const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const [courseLength,setCourseLength] = useState(0);
    const [dayArray, setDayArray] = useState(Array(100).fill("none")); // 날짜별 검색된 Place 저장
    const [addressList, setAddressList] = useState(Array(100).fill(
        {
            "spot1" : "",
            "spot2" : "",
            "spot3" : "",
            "spot4" : ""
        }
    ))

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

    const fetchAddress = (index,num,longitude,latitude) => {
        axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${longitude}&y=${latitude}`,
          {
            headers: {
              Authorization: `KakaoAK ${API_KEY}`,  
            },
          }
        ).then(response=>{
            console.log('setAddress',response);
            const result = response.data.documents[0].address.address_name;
          if(result){
            var newAddress = [...addressList];
            if (num === 1) {
                newAddress[index].spot1 = result;
              } else if (num === 2) {
                newAddress[index].spot2 = result;
              } else if (num === 3) {
                newAddress[index].spot3 = result;
              } else{
                newAddress[index].spot4 = result;
              }
              setAddressList(newAddress);
          }
          }).catch(error=>{
            console.error('Error fetching address:', error);
            
          })
    };

    const convertDistance = (distance) => {
        if (distance >= 1000) {
            return `${Math.floor(distance / 1000)}km`;
        }
        return `${Math.floor(distance)}m`;
    };

    function getAddressInfo(index, num){
        if (num === '1') {
            return `${addressList[index].spot1}`;
          } else if (num === '2') {
            return `${addressList[index].spot2}`;
          } else if (num === '3') {
            return `${addressList[index].spot3}`;
          } else{
            return `${addressList[index].spot4}`;
          } 
    }

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

    // 코스 번호별 보여주기 
    const SpotDisplay = ({ num, index, spot, distance }) => (
        <div>
            <div className={`spot-box ${distance > 0 && num!==1 ? '' : 'dist' }`}>
                <div className="spot-container">
                    <div id="num-circle">{num}</div>
                    <div className="travel-card-places">
                        <span>{spot.title}</span>
                        <span style={{fontSize:"15px",color:"#C7C7C7"}}>
                            {getAddressInfo(index,num)}
                        </span>
                    </div>
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

    // 코스 정보 불러오기
    const fetchCourse = async()=>{
        // post 요청 시 꼭 url, data, config(header) 순서로 적어야하며 data가 없을 경우 null로 표시해야함!!!
        await axios.get(`${API.HEADER}/travel/${tid}`, { headers: {Authorization:userInfo.accessToken,}})
        .then(response=>{
            if(response.data.isSuccess){
                const result = response.data.result;
                console.log(`tId : ${tid} 상세 조회`,result);
                setTravel(result);
                setCourseLength(response.data.result.courses.length);
                for(var i=0; i<response.data.result.courses.length; i++){
                    if(response.data.result.courses[i].spot1?.title){
                        fetchAddress(i,1,response.data.result.courses[i].spot1.longitude,response.data.result.courses[i].spot1.latitude);
                    }
                    if(response.data.result.courses[i].spot2?.title){
                        fetchAddress(i,2,response.data.result.courses[i].spot2.longitude,response.data.result.courses[i].spot2.latitude);
                    }
                    if(response.data.result.courses[i].spot3?.title){
                        fetchAddress(i,3,response.data.result.courses[i].spot3.longitude,response.data.result.courses[i].spot3.latitude);
                    }
                    if(response.data.result.courses[i].spot4?.title){
                        fetchAddress(i,4,response.data.result.courses[i].spot4.longitude,response.data.result.courses[i].spot4.latitude);
                    }
                }
            }
            else console.log(`tId : ${tid} 상세 조회 실패`,response.data.result);
        })
        .catch(e=>{console.log('error',e)})
    }

    useEffect(()=>{
        fetchCourse();
    },[])

    return(
    <div>
        <Nav />
        <div className="info-detail-body">
            <div className="group490">
                <h1 className="detailTitle">여행 코스 보기</h1>
                <p className="subText-specific">여행 일정을 확인해보세요!</p>
                <div className="rectangle"></div>
            </div>
            <div className="info-specific-box">
                <div className="map-box">
                    <Map isFromCreate={true} searchPlace={Place} setRecoilPlaces={setRecoilPlaces}/>
                </div>
                <div className="travel-detail-body">
                {dayArray.map((item, index)=>( /* index 일차 */
                index < courseLength && (
                <div className="travel-card-box">
                    <div className="travel-card-create-header">
                        <span className="numofDay">{index+1}일 차</span>
                        <span className="day">
                        {getDayOfWeek(travel.start_date, index)}
                        </span>
                    </div>
                    <div className="travel-create-card">
                        {travel.courses[index]?.spot1?.title && (
                            <SpotDisplay
                                index={index}
                                num="1"
                                spot={travel.courses[index].spot1}
                                distance={travel.courses[index].first}
                            />
                        )}
                        {travel.courses[index]?.spot2?.title && (
                            <SpotDisplay
                                index={index}
                                num="2"
                                spot={travel.courses[index].spot2}
                                distance={travel.courses[index].second}
                            />
                        )}
                        {travel.courses[index]?.spot3?.title && (
                            <SpotDisplay
                                index={index}
                                num="3"
                                spot={travel.courses[index].spot3}
                                distance={travel.courses[index].third}
                            />
                        )}
                        {travel.courses[index]?.spot4?.title && (
                            <SpotDisplay
                                index={index}
                                num="4"
                                spot={travel.courses[index].spot4}
                            />
                        )}
                    </div>
                </div>
                )
                ))
                }
            </div>
            </div>
        </div>
    </div>
    )
}

export default InfoDetail;