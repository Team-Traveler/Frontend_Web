import React, { useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import "./star.css"; // Import the CSS file

function StarRating() {
  const [ratings, setRatings] = useState([2, 4, 3]); // Initialize with specific ratings for each section

  const handleStarClick = (selectedRating, index) => {
    const newRatings = [...ratings];
    newRatings[index] = selectedRating;
    setRatings(newRatings);
  };

  return (
    <div className="xstar-rating-card">
      <div className="xstar-section">
        <h2>여행 컨셉</h2>
        <div className="xstar-container">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => handleStarClick(num, 0)}
              className="xstar"
            >
              {num <= ratings[0] ? (
                <StarFilled style={{ color: "yellow" }} />
              ) : (
                <StarOutlined />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="xstar-section">
        <h2>여행 강도</h2>
        <div className="xstar-container">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => handleStarClick(num, 1)}
              className="xstar"
            >
              {num <= ratings[1] ? (
                <StarFilled style={{ color: "yellow" }} />
              ) : (
                <StarOutlined />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="xstar-section">
        <h2>총 별점</h2>
        <div className="xstar-container">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => handleStarClick(num, 2)}
              className="xstar"
            >
              {num <= ratings[2] ? (
                <StarFilled style={{ color: "yellow" }} />
              ) : (
                <StarOutlined />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StarRating;
