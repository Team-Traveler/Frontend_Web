import React, { useState } from "react";
import "./image.css"; // Import the CSS file for styling
import button from "./Group-250.png";

function ImageUploadBox() {
  const [imagesBox1, setImagesBox1] = useState([]);
  const [imagesBox2, setImagesBox2] = useState([]);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

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
    <div className="image-upload-box">
      <div className="image-slider-container">
        <div
          className="image-slider"
          style={{
            width: "234px",
            height: "294px",
            position: "relative",
            border: "1px solid #000",
          }}
        >
          <img
            src={imagesBox1[currentIndex1]}
            alt="Uploaded"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            className="slider-arrow left-arrow"
            onClick={() => handlePrevClick(1)}
          >
            &lt;
          </div>
          <div
            className="slider-arrow right-arrow"
            onClick={() => handleNextClick(1)}
          >
            &gt;
          </div>
        </div>
        <div
          className="image-slider"
          style={{
            width: "234px",
            height: "294px",
            position: "relative",
            border: "1px solid #000",
          }}
        >
          <img
            src={imagesBox2[currentIndex2]}
            alt="Uploaded"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            className="slider-arrow left-arrow"
            onClick={() => handlePrevClick(2)}
          >
            &lt;
          </div>
          <div
            className="slider-arrow right-arrow"
            onClick={() => handleNextClick(2)}
          >
            &gt;
          </div>
        </div>
      </div>
      <div className="upload-section">
        <label htmlFor="fileInput" className="upload-label">
          사진 선택
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
          className="file-input"
        />
      </div>
    </div>
  );
}

export default ImageUploadBox;

