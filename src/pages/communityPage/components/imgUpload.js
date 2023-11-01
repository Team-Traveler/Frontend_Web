import React, { useState } from "react";
import "./imgUpload.css"; // Import the CSS file for styling
import {FcPlus} from 'react-icons/fc';
import {TiDelete} from 'react-icons/ti';
import Slider from "react-slick";

function ImageUploadBox(props) {
  const [showImages, setShowImages] = useState([]);

  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
    props.setImages(imageUrlLists);
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
      <label htmlFor="input-file" className='add-btn' onChange={handleAddImages}>
          <input type="file" id="input-file" multiple onChange={props.setFile}/>
      </label>
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

