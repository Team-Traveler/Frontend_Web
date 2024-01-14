import React from "react";
import "./styles.css";

function MyTravelProfile(props) {
    const handleRoundButtonClick = () => {
        props.setView("profile");
    };

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
