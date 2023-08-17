import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';


function MyTravelMap() {

    // Kakao Map API 초기화
    useEffect(() =>{
        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
          };
        const map = new window.kakao.maps.Map(container, options);
    }, [])
      return (
        <div id="map" className='map'></div>
      );
}

export default MyTravelMap;