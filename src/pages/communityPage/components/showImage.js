import React, {useState} from "react";
import Slider from "react-slick";
import { useRecoilValue } from 'recoil';
import { travelsSelector } from '../../../recoil/atoms/travelsreviewStates';

function ShowImagePage(prop){
    const travels = useRecoilValue(travelsSelector);
    const travel = travels[prop.pId-1];
    const [images,setImages] = useState(travel.imgUrl);

    // 이미지 슬라이드
    const [currentSlide, setCurrentSlide] = useState(0);

    return(
        <Slider
            // 이미지을 0번째부터
            initialSlide={0}
            // 다음으로 넘기기 위해서 현재 slide를 state로 저장해야됨
            afterChange={(slide) => setCurrentSlide(slide)}
            // 무한으로 넘겨짐
            infinite
            // 화살표가 사라져서 마우스로 밀어야 넘겨짐
            arrows={false}
            // 한번에 하나씩만 보이게
            slidesToShow={1}
            // 한번에 하나씩만 넘겨지게
            slidesToScroll={1}
        >
            {images.map((value, index) => (
            <div>
                <img src={value} alt={value} style={{width:"400px", height:"400px"}} />
            </div>
            ))}
        </Slider>
    );
}

export default ShowImagePage;