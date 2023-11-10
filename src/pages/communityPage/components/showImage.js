import React, {useState,useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./showImage.css";
function ShowImagePage({img}){
    const [images,setImages] = useState(null);
    const testArray = [require("./defaultCamera.png"),require("./defaultCamera.png")]; // 임시 이미지

    const imgApi = async()=>{
        if (img.length>0)
            await setImages(img);
        else
            await setImages(testArray);
    }
    useEffect(()=>{
        imgApi()
    },[img]);

    // 이미지 슬라이드
    const settings = {
        initialSlide : 0,
        dots : true,
        infinite : true,
        speed : 500,
        slidesToShow : 1,
        slidesToScroll : 1,
        arrows : false,
    }
    if(images){
        return(
            <Slider {...settings} className="slider">
                {images.map((value, index) => (
                <div key={index}>
                    <img src={value} alt={value}/>
                </div>
                ))}
            </Slider>
        );
    }
}

export default ShowImagePage;