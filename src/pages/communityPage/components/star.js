import React, { useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import "./star.css"; // Import the CSS file

function StarRating(props) {
  const [ratings, setRatings] = useState([0, 0, 0]); // Initialize with 0 ratings for each section

  const handleStarClick = (selectedRating, index) => {
    const newRatings = [...ratings];
    newRatings[index] = selectedRating;
    setRatings(newRatings);
    props.setRatings(newRatings); // 부모 컴포넌트에 별점값 전달
  };
  const style = { color:"rgb(156, 184, 148)", fontSize:"25px", 
  marginRight:"5px"};

  return (
    <div className="xstar-rating-card">
      <div className="xstar-section">
        <span>여행 컨셉</span>
        <div className="xstar-container">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => handleStarClick(num, 0)}
              className="xstar"
            >
              {num <= ratings[0] ? (
                <StarFilled style={style} />
              ) : (
                <StarOutlined style={style}/>
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="xstar-section">
        <span>여행 강도</span>
        <div className="xstar-container">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => handleStarClick(num, 1)}
              className="xstar"
            >
              {num <= ratings[1] ? (
                <StarFilled style={style} />
              ) : (
                <StarOutlined style={style}/>
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="xstar-section">
        <span>총 별점</span>
        <div className="xstar-container">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => handleStarClick(num, 2)}
              className="xstar"
            >
              {num <= ratings[2] ? (
                <StarFilled style={style} />
              ) : (
                <StarOutlined style={style} />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StarRating;
