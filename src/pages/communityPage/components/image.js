import React, { useState } from "react";
import "./image.css"; // Import the CSS file for styling
import button from "./Group-250.png";
import image1 from "../images/1.jpg";
import image2 from "../images/3.jpg";
function ImageUploadBox() {
  const [imagesBox1, setImagesBox1] = useState([]);
  const [imagesBox2, setImagesBox2] = useState([]);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain", // 이미지를 비율 유지하며 박스에 맞춥니다.
  };
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImagesBox1([...newImages]);
    setImagesBox2([...newImages]);
    setCurrentIndex1(0); // Reset index for both boxes
    setCurrentIndex2(0);
  };

  const handlePrevClick = (sliderIndex) => {
    if (sliderIndex === 1) {
      setCurrentIndex1((prevIndex) =>
        prevIndex === 0 ? imagesBox1.length - 1 : prevIndex - 1
      );
    } else if (sliderIndex === 2) {
      setCurrentIndex2((prevIndex) =>
        prevIndex === 0 ? imagesBox2.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextClick = (sliderIndex) => {
    if (sliderIndex === 1) {
      setCurrentIndex1((prevIndex) =>
        prevIndex === imagesBox1.length - 1 ? 0 : prevIndex + 1
      );
    } else if (sliderIndex === 2) {
      setCurrentIndex2((prevIndex) =>
        prevIndex === imagesBox2.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="ximage-upload-box">
      <div className="ximage-slider-container">
        <div
          className="ximage-slider"
          style={{
            width: "234px",
            height: "294px",
            position: "relative",
            border: "1px solid #000",
            overflow: "hidden",
          }}
        >
          <img
            src={image1}
            alt="Uploaded"
            style={{ width: "100%", height: "100%",  objectFit: "cover"}}            
          />
          <div
            className="xslider-arrow left-arrow"
            onClick={() => handlePrevClick(1)}
          >
            &lt;
          </div>
          <div
            className="xslider-arrow right-arrow"
            onClick={() => handleNextClick(1)}
          >
            &gt;
          </div>
        </div>
        <div
          className="ximage-slider"
          style={{
            width: "234px",
            height: "294px",
            position: "relative",
            border: "1px solid #000",
            overflow: "hidden",
          }}
        >
          <img
            src={image2}
            alt="Uploaded"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            className="xslider-arrow left-arrow"
            onClick={() => handlePrevClick(2)}
          >
            &lt;
          </div>
          <div
            className="xslider-arrow right-arrow"
            onClick={() => handleNextClick(2)}
          >
            &gt;
          </div>
        </div>
      </div>
      <div className="xupload-section">
        <label htmlFor="fileInput" className="upload-label">
          
        </label>
        {/* <label htmlFor="fileInput" className="icon-label">
          <img src={button} alt="Upload Icon" className="UploadIcon" />
        </label> */}
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={handleImageUpload}
          multiple
          className="xfile-input"
        />
      </div>
    </div>
  );
}

export default ImageUploadBox;

