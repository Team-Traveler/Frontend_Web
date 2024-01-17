import React, { useEffect } from "react";
import "./styles.css";
import { useRecoilState } from "recoil";
import { updateState } from "../../../recoil/atoms/myAllTravelsState.js";
function MyTravelProfile(props) {
    const [update, setUpdate] = useRecoilState(updateState);

    const handleRoundButtonClick = () => {
        props.setView("profile");
    };

    useEffect(() => {
        console.log("여기여기");
    }, [update]);

    return (
        <div className="border">
            <img className="profile-image" src={props.imgSrc} alt="Profile" />
            <div className="name">
                <div className="id">
                    <div className="profile-name">{props.name}</div>
                    <button
                        className="round-button"
                        onClick={handleRoundButtonClick}
                    ></button>
                </div>
                <div className="profile-stats">
                    <div className="profile-travels">나의 여행</div>
                    <div className="profile-nums">{props.numTravel}</div>
                    <div className="profile-likes">찜한 여행</div>
                    <div className="profile-nums">{props.numLiked}</div>
                </div>
            </div>
        </div>
    );
}

export default MyTravelProfile;
