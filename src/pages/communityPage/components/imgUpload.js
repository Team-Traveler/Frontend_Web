import React, { useState } from "react";
import "./imgUpload.css"; // Import the CSS file for styling
import {TiDelete} from 'react-icons/ti';
import Slider from "react-slick";

function ImageUploadBox({setImages}) {
  const [showImages, setShowImages] = useState([]);
  const [imageList, setImageList] = useState([]);

  const handleAddImages = (event) => {
    const image = event.target.files; // 서버 전송용 이미지
    let showImageList = [...showImages]; // 미리보기용 이미지
    let postImageList = [...imageList];

    for(let i=0; i<image.length; i++){
      showImageList.push(URL.createObjectURL(image[i]));
      postImageList.push(image[i]);
    }

    if (showImageList.length > 10) {
      showImageList = showImageList.slice(0, 10);
      postImageList = postImageList.slice(0,10);
    }
    setShowImages(showImageList);
    setImageList(postImageList);
    setImages(postImageList); // imageList를 넣어주면 setState가 바로 업데이트 되지 않는 문제 생김 
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };
  // 슬라이드 형식으로 이미지 렌더링
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  return (
    <div className='img-upload-box'>
      <form>
        <label htmlFor="img-upload" />
        <input type="file" accept="image/*" multiple onChange={handleAddImages}/>
      </form>
      <Slider {...settings} className="slider">
        {showImages.map((image, id) => (
          <div className='img-container' key={id}>
            <img src={image} alt={`${image}-${id}`} />
            <TiDelete onClick={() => handleDeleteImage(id)} className="delete-btn"/>
          </div>
        ))}
      </Slider>
  </div>
  );
}

export default ImageUploadBox;

