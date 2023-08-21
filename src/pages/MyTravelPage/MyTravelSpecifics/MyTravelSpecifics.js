import React, { useState } from 'react';
import { useRecoilState } from "recoil";
import ReactDOM from 'react-dom';
import MyTravelMap from '../MyTravelMap/MyTravelMap';
import MyTravelCreate from '../MyTravelCreate/MyTravelCreate'; 
import MyTravelSpecificsLists from '../MyTravelSpecificsLists/MyTravelSpecificsLists';
import MyTravelCreateLists from '../MyTravelCreateLists/MyTravelCreateLists';
import { travelSpecificState,getCourseByDcIdSelector,setCourseByDcIdSelector } from '../../../recoil/atoms/travelSpecificState'; 
import { setPlaceStateSelector } from '../../../recoil/atoms/placeState'; 
import { selectedTIDState, setSelectedTIDSelector } from '../../../recoil/atoms/travelSpecificState'; 
import './styles.css';
import MapSection from '../MyTravelMap/Map';
import Map from '../MyTravelMap/api/Map';

function MyTravelSpecifics(props) {
    const [showCreateComponent, setShowCreateComponent] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [ isTravelCreate, setIsTravelCreate] = useState(false);
    const [selectedTID, setSelectedTID] = useRecoilState(selectedTIDState);
    const [Place, setPlace] = useState("");
    const [recoilPlaces, setRecoilPlaces] = useRecoilState(setPlaceStateSelector);

    const travels = {
        title : "여수 투어",
        start_date: "230814",
        end_date: "230816",
        courses : [
            {
                        "dcId": 1,
                        "spot1": '호텔',
                        "spot2": '롯폰기 힐스',
                        "spot3": "롯폰기 케야키자카",
                        "spot4": '공원',
                        "first": 30000,
                        "second": 1000,
                        "third": 500,
                        "spot1_lat": 37.715133,
                        "spot1_lon":  126.734086,
                        "spot2_lat": 38.715133,
                        "spot2_lon":  127.734086,
                        "spot3_lat": 39.715133,
                        "spot3_lon":  128.734086,
                        "numOfDay": 3,
                        "tid": 1
            },
            {
                "dcId": 1,
                "spot1": '호텔',
                "spot2": '롯폰기 힐스',
                "spot3": "롯폰기 케야키자카",
                "spot4": '공원',
                "first": 30000,
                "second": 1000,
                "third": 500,
                "spot1_lat": 37.715133,
                "spot1_lon":  126.734086,
                "spot2_lat": 38.715133,
                "spot2_lon":  127.734086,
                "spot3_lat": 39.715133,
                "spot3_lon":  128.734086,

                "numOfDay": 2,
                "tid": 1
            },
            {
                "dcId": 1,
                "spot1": '호텔',
                "spot2": '롯폰기 힐스',
                "spot3": "롯폰기 케야키자카",
                "spot4": '공원',
                "first": 30000,
                "second": 1000,
                "third": 500,
                "spot1_lat": 37.715133,
                "spot1_lon":  126.734086,
                "spot2_lat": 38.715133,
                "spot2_lon":  127.734086,
                "spot3_lat": 39.715133,
                "spot3_lon":  128.734086,
                "numOfDay": 1,
                "tid": 1
            },
    
        ],
    };



    return (
        <div>
            { isTravelCreate
            ? (
                <div className="group490">
                    <h1 className="detailTitle">여행 만들기</h1>
                    <p className="subText">여행 일정을 만들어보세요. 장소의 날짜를 직접 설정하고 일일 계획을 구성할 수 있습니다.</p>
                    <div className="rectangle"></div>
                </div>
            )
            : (
                
                <div className="group490">
                    <h1 className="detailTitle">여행 상세보기</h1>
                    <p className="subText-specific">여행 일정을 확인해보세요!</p>
                    <div className="rectangle"></div>
                </div>
            )
            }
            <div style={{ 
                        display: 'flex', 
                        flexDirection: 'row',
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        height: '62.6vh',
                        padding: '0 6vw',
                        marginTop: '35px'
                        }}>
                        { isTravelCreate == false &&(
                            <div style={{marginRight: '6vw'}}>
                                    {/* <MyTravelMap isTravelCreate={isTravelCreate}/> */}
                                    <Map searchPlace={Place} setRecoilPlaces={setRecoilPlaces}/>
                            </div>
                        )}

                        <div style={{ flexGrow: 1 }}>
                        { isTravelCreate
                            ? (
                                <MyTravelCreateLists
                                    showCreateComponent={showCreateComponent} 
                                    setShowCreateComponent={setShowCreateComponent}
                                    setIsTravelCreate={setIsTravelCreate}
                                    travels={travels}
                                    Places={Place}
                                />
                            )
                            : (
                                <>
                                
                                <MyTravelSpecificsLists 
                                    showCreateComponent={showCreateComponent} 
                                    setShowCreateComponent={setShowCreateComponent}
                                    setIsTravelCreate={setIsTravelCreate}
                                    travels={travels} selectedTID={selectedTID}
                                    />
                                </>
                                
                            )
                            }
                        
                        </div>
                    </div>

        </div>
    );
}

export default MyTravelSpecifics;