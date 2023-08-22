import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useParams } from "react-router-dom";
import "./travel.css";
import sss from "./sss.png";
import sss2 from "./sss2.png";
import hhh from "./hhh.png";
import ggg from "./ggg.png";
import { RecoilRoot, useRecoilValue } from "recoil";
import { travelsSelector } from "../../../recoil/atoms/travelsreviewStates";

function TravelList() {
  const travels = useRecoilValue(travelsSelector);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const { tid } = useParams();

  // tid에 해당하는 데이터를 필터링합니다
  const selectedTravel = travels.find((travel) => travel.tid === parseInt(tid, 10));

  if (!selectedTravel) {
    return <div>Data not found for tid: {tid}</div>;
  }

  return (
    <div>
          <div className="travel-card">
            <div className="travel-card-info">
              <div className="travel-card-name">
                #해시태그
                <img src={hhh} alt="hhh" className="hhh" />
              </div>
              <div className="travel-card-category">
                {" "}
                #{selectedTravel.hashtags[0]} #{selectedTravel.hashtags[1]}
              </div>
            </div>
          </div>

          <div className="travel-card">
            <div className="travel-card-info">
              <div className="travel-card-name">
                위치추가
                <img src={sss} alt="sss" className="sss" />
                <img src={sss2} alt="sss2" className="sss2" />
              </div>
              <div className="travel-card-category">{selectedTravel.location}</div>
            </div>
          </div>

          <div className="travel-card">
            <div className="travel-card-info">
              <div className="travel-card-name">
                good
                <img src={ggg} alt="ggg" className="ggg1" />
              </div>
              <div className="travel-card-category">{selectedTravel.goodPoints}</div>
            </div>
          </div>

          <div className="travel-card">
            <div className="travel-card-info">
              <div className="travel-card-name">
                bad
                <img src={ggg} alt="ggg" className="ggg2" />
              </div>
              <div className="travel-card-category">{selectedTravel.badPoints}</div>
            </div>
          </div>

          <div className="travel-card">
            <div className="travel-card-info">
              <div className="travel-card-name">한줄 평 작성</div>
              <div className="travel-card-category">{selectedTravel.oneLineReview}</div>
            </div>
          </div>

          <div className="travel-card">
            <div className="travel-card-info">
              <div className="travel-card-name">나의 노트 공유</div>
              <div className="travel-card-category">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  체크리스트
                </label>
                <span className="checkbox-spacing" />
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={!isChecked}
                    onChange={handleCheckboxChange}
                  />
                  가계부
                </label>
              </div>
            </div>
          </div>

    
    </div>
  );
}

export default TravelList;
