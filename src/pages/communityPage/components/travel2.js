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
          <div className="xtravel-card">
            <div className="xtravel-card-info">
              <div className="xtravel-card-name">
                #해시태그
                <img src={hhh} alt="hhh" className="hhh" />
              </div>
              <div className="xtravel-card-category">
                {" "}
                #{selectedTravel.hashtags[0]} #{selectedTravel.hashtags[1]}
              </div>
            </div>
          </div>

          <div className="xtravel-card">
            <div className="xtravel-card-info">
              <div className="xtravel-card-name">
                위치추가
                <img src={sss} alt="sss" className="sss" />
                <img src={sss2} alt="sss2" className="sss2" />
              </div>
              <div className="xtravel-card-category">{selectedTravel.location}</div>
            </div>
          </div>

          <div className="xtravel-card">
            <div className="xtravel-card-info">
              <div className="xtravel-card-name">
                good
                <img src={ggg} alt="ggg" className="ggg1" />
              </div>
              <div className="xtravel-card-category">{selectedTravel.goodPoints}</div>
            </div>
          </div>

          <div className="xtravel-card">
            <div className="xtravel-card-info">
              <div className="xtravel-card-name">
                bad
                <img src={ggg} alt="ggg" className="ggg2" />
              </div>
              <div className="xtravel-card-category">{selectedTravel.badPoints}</div>
            </div>
          </div>

          <div className="xtravel-card">
            <div className="xtravel-card-info">
              <div className="xtravel-card-name">한줄 평 작성</div>
              <div className="xtravel-card-category">{selectedTravel.oneLineReview}</div>
            </div>
          </div>

          <div className="xtravel-card">
            <div className="xtravel-card-info">
              <div className="xtravel-card-name">나의 노트 공유</div>
              <div className="xtravel-card-category">
                <label className="xcheckbox-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  체크리스트
                </label>
                <span className="xcheckbox-spacing" />
                <label className="xcheckbox-label">
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
