import React, { useState } from "react";
import "./MapSection.css";
import Map from "./api/Map";

function MapSection(props) {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText("");
  };

  return (
    <>
      <div
        className="section"
      >
        <div className="container">
          <div className="mapContainer">
            <form className="inputForm" onSubmit={handleSubmit}>
              <input
                className="search"
                placeholder="검색어를 입력하세요"
                onChange={onChange}
                value={InputText}
              />
              <button className="searchBtn" type="submit">검색</button>
            </form>
            <Map searchPlace={Place} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MapSection;