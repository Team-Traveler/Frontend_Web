import React, { useEffect, useState } from "react";
import "./Map.css";
import { useRecoilState } from 'recoil';
import { setPlaceStateSelector } from '../../../../recoil/atoms/placeState';
import { fromPlaceSearchState, placeSearchState } from '../../../../recoil/atoms/placeSearchState';

const Map = ({ searchPlace, setRecoilPlaces, isFromCreate, initialData}) => {
    const [Places, setPlaces] = useState([]);
    const [placeSearch, setPlaceSearch] = useRecoilState(placeSearchState);
    const [isFromSearch, setIsFromSearch] = useRecoilState(fromPlaceSearchState);
    const [init,setInit] = useState(true);
    useEffect(() => {
        const { kakao } = window;
        console.log('map initalData',initialData);

        let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        const container = document.getElementById("myMap");
        const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        const ps = new kakao.maps.services.Places();

        if(isFromCreate == true){
            ps.keywordSearch(searchPlace, placesSearchCB);
        }

        function checkInitalData(initalData){
            let check = false;
            initialData.courses.forEach(course => {
                if(course.spot1?.title){
                    check=true;
                }
            })
            return check;
        }

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds();

                for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                if (!isFromSearch) {
                    map.setBounds(bounds);
                }

                displayPagination(pagination);

                setPlaces(data);
                setRecoilPlaces(data);
            }
        }

        function displayPagination(pagination) {
        let paginationEl = document.getElementById("pagination"),
            fragment = document.createDocumentFragment(),
            i;

        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
            let el = document.createElement("a");
            el.href = "#";
            el.innerHTML = i;

            if (i === pagination.current) {
            el.className = "on";
            } else {
            el.onclick = (function (i) {
                return function () {
                pagination.gotoPage(i);
                };
            })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
        }

        function displayMarkerSpot(spot){
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(spot.latitude, spot.longitude),
            });
                    
            kakao.maps.event.addListener(marker, "click", function () {
                createAndDisplaySpot(spot);
            });
        }

        function createAndDisplaySpot(spot) {
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(spot.latitude, spot.longitude),
            });
        
            infowindow.setContent(
                '<div style="padding:5px;font-size:12px; text-align:center;">' +
                    spot.title +
                    "</div>"
            );
            infowindow.open(map, marker);
        
            // 지도의 중심을 해당 마커의 위치로 변경
            map.setCenter(marker.getPosition());
        
            // 확대 레벨을 3으로 변경
            map.setLevel(5);
        }

        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
            });
        
            kakao.maps.event.addListener(marker, "click", function () {
                createAndDisplay(place);
                setIsFromSearch(false);
            });
        }

        if (isFromCreate && placeSearch && isFromSearch) {
            createAndDisplay(placeSearch);
            setIsFromSearch(false);
            //createAndDisplayMarker(placeSearch);
        }

        function createAndDisplay(place) {
            console.log("Place : ",place);
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
            });
        
            infowindow.setContent(
                '<div style="padding:5px;font-size:12px; text-align:center;">' +
                    place.place_name +
                    "</div>"
            );
            infowindow.open(map, marker);
        
            // 지도의 중심을 해당 마커의 위치로 변경
            map.setCenter(marker.getPosition());
        
            // 확대 레벨을 3으로 변경
            map.setLevel(3);
        }

        if (init&&initialData.courses&&initialData.courses.length > 0 && checkInitalData(initialData)) {
            let bounds = new kakao.maps.LatLngBounds();
            initialData.courses.forEach(course => {
                if(course.spot1?.title){
                    displayMarkerSpot(course.spot1);
                    bounds.extend(new kakao.maps.LatLng(course.spot1.latitude, course.spot1.longitude));

                }
                if(course.spot2?.title){
                    displayMarkerSpot(course.spot2);
                    bounds.extend(new kakao.maps.LatLng(course.spot2.latitude, course.spot2.longitude));
                }
                if(course.spot3?.title){
                    displayMarkerSpot(course.spot3);
                    bounds.extend(new kakao.maps.LatLng(course.spot3.latitude, course.spot3.longitude));
                }
                if(course.spot4?.title){
                    displayMarkerSpot(course.spot4);
                    bounds.extend(new kakao.maps.LatLng(course.spot4.latitude, course.spot4.longitude));
                }
                if (!isFromSearch) {
                    map.setBounds(bounds);
                }
            });

            map.setBounds(bounds);
            setInit(false);
        }

    }, [placeSearch,searchPlace]);

    return (
        <div className="divStyle">
            <div
                id="myMap"
                style={{
                    width: '25vw',
                    height: '53vh',
                    //marginTop: '11vh',
                    borderRadius: '15px',
                    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                    padding: '10px',
                    //border: '2px solid #757575'
                }}
            ></div>
            
        </div>
    );
};

export default Map;