import React, { useEffect, useState } from "react";
import "./Map.css";
import { useRecoilState } from 'recoil';
import { setPlaceStateSelector } from '../../../../recoil/atoms/placeState';


const Map = ({ searchPlace, setRecoilPlaces, isFromCreate }) => {
    const [Places, setPlaces] = useState([]);
    useEffect(() => {
        const { kakao } = window;

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
        

            function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds();

                for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                map.setBounds(bounds);
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

        function displayMarker(place) {
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
        });

        kakao.maps.event.addListener(marker, "click", function () {
            infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
                place.place_name +
                "</div>"
            );
            infowindow.open(map, marker);
        });
        }
    }, [searchPlace]);

    return (
        <div className="divStyle">
            <div
                id="myMap"
                style={{
                    width: '39vw',
                    height: '53vh',
                    marginTop: '11vh',
                    borderRadius: '15px',
                    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                    padding: '10px',
                    border: '2px solid #757575'
                }}
            ></div>
            
        </div>
    );
};

export default Map;