import React, { useEffect } from "react";
import "./styles.css";
import { useRecoilState } from "recoil";
import { updateState } from "../../../recoil/atoms/myAllTravelsState.js";
import { profileState } from "../../../recoil/atoms/profileState.js";
function MyTravelProfile({ setView, ...props }) {
    const TAG = "MyTravelProfile";
    const [update, setUpdate] = useRecoilState(updateState);
    const [profileData, setProfileData] = useRecoilState(profileState);

    const handleRoundButtonClick = () => {
        props.setView("profile");
    };

    useEffect(() => {
        console.log(TAG, profileData);
    }, [update]);

    return (
        <div className="border">
            <img
                className="profile-image"
                src={profileData.imgSrc}
                alt="Profile"
            />
            <div className="name">
                <div className="id">
                    <div className="profile-name">{profileData.name}</div>
                    <button
                        className="round-button"
                        onClick={handleRoundButtonClick}
                    ></button>
                </div>
                <div className="profile-stats">
                    <div className="profile-travels">나의 여행</div>
                    <div className="profile-nums">{profileData.numTravel}</div>
                    <div className="profile-likes">찜한 여행</div>
                    <div className="profile-nums">{profileData.numLiked}</div>
                </div>
            </div>
        </div>
    );
}

export default MyTravelProfile;
