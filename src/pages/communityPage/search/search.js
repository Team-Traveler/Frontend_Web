import React, { useState, } from "react";
import Nav from "../../../components/Nav/Nav";
import "./search.css"; // 스타일링 파일을 import
import searchIcon from "../../../assets/images/Search.png";
import v from "../../../assets/images/v.png";
import { Link } from "react-router-dom";


function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      if (!recentSearches.includes(searchTerm)) {
        setRecentSearches([...recentSearches, searchTerm]);
      }
      setSearchResults([...searchResults, searchTerm]);
      setSearchTerm(""); // 검색 후 검색어를 초기화합니다.
    }
  };

  const handleHashtagClick = (hashtag) => {
    setSearchTerm(hashtag);
    handleSearch();
  };

  return (
    <div>
      <div className="back">
        <Nav />
        <Link to="/">
        {/* <button onClick={handleSearch} className="vector"> */}
          <img className="vector " src={v} alt="버튼" />
          {/* </button> */}
          </Link>
        <div className="search-container">
          <input
            type="text"
            className="iptSearch"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch} className="search-button">
            <img className="searchh" src={searchIcon} alt="검색" />{" "}
          </button>
        </div>
        <div className="hashtags">
          <button
            onClick={() => handleHashtagClick("테스트1")}
            className="hashtag-button"
          >
            #테스트1
          </button>
          <button
            onClick={() => handleHashtagClick("테스트2")}
            className="hashtag-button"
          >
            #테스트2
          </button>
          <button
            onClick={() => handleHashtagClick("테스트3")}
            className="hashtag-button"
          >
            #테스트3
          </button>
          <button
            onClick={() => handleHashtagClick("테스트4")}
            className="hashtag-button"
          >
            #테스트4
          </button>
          <button
            onClick={() => handleHashtagClick("테스트5")}
            className="hashtag-button"
          >
            #테스트5
          </button>
        </div>
        <div className="line"></div>
        <div className="recent-searches">
          <h2>최근 검색어</h2>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index} onClick={() => handleHashtagClick(search)}>
                {search}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Search;
