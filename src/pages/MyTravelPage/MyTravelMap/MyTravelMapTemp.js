import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
const { kakao } = window

function MyTravelMapTemp({isTravelCreate, ...props}) {


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
                    "spot4_lat": 40.715133,
                    "spot4_lon":  129.734086,

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
            "spot4_lat": null,
            "spot4_lon":  null,
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
            "spot4_lat": 40.715133,
            "spot4_lon":  129.734086,
            "numOfDay": 1,
            "tid": 1
        },

    ],
  };


    // Kakao Map API 초기화
    useEffect(() =>{
        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
          };
        const map = new window.kakao.maps.Map(container, options);

        const spots = [
          { title: travels.courses[0].spot1, lat: travels.courses[0].spot1_lat, lon: travels.courses[0].spot1_lon },
          { title: travels.courses[0].spot2, lat: travels.courses[0].spot2_lat, lon: travels.courses[0].spot2_lon },
          { title: travels.courses[0].spot3, lat: travels.courses[0].spot3_lat, lon: travels.courses[0].spot3_lon },
          { title: travels.courses[0].spot4, lat: travels.courses[0].spot4_lat, lon: travels.courses[0].spot4_lon }
      ];
      
      const markers = spots
          .filter(spot => spot.title !== null)
          .map(spot => ({
              title: spot.title,
              latlng: new window.kakao.maps.LatLng(spot.lat, spot.lon)
          }));

      const latLonArray = spots
          .filter(spot => spot.title !== null)
          .map(spot => ({
              lat: spot.lat,
              lon: spot.lon
          }));    
        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        const bounds = new window.kakao.maps.LatLngBounds(); 
        latLonArray.forEach(latLonArray => {
          bounds.extend(new window.kakao.maps.LatLng(latLonArray.lat, latLonArray.lng))
        });

        

        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
            
        for (var i = 0; i < markers.length; i ++) {

            if(markers[i].title == null){
              continue;
            }
            
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new window.kakao.maps.Size(24, 35); 
            
            // 마커 이미지를 생성합니다    
            var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); 
            
            // 마커를 생성합니다
            var marker = new window.kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: markers[i].latlng, // 마커를 표시할 위치
                title : markers[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지 
            });
            
            
            //map.setBounds(bounds);
        }

        
    }, [])
      return (
        <div id="map" className='map'>
          
        </div>
      );
}

export default MyTravelMapTemp;