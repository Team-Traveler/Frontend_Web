import React,{useState} from 'react';
import axios from 'axios';
import { useRecoilState,useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/atoms/userState";
import './styles.css';
import profileTest from './profile.svg';

function MyTravelProfileEdit({profileData, setProfileData,...props}) {

    const [showPopup, setShowPopup] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [userNick, setUserNick] = useState(profileData.name);
    const [saveState, setSaveState] = useState(false);
    const [formData, setFormData] = useState(null);

    const handleNickChange = (event) => {
        setUserNick(event.target.value);
    };

    async function deleteUserData() {
        try {
            const response = await axios({
                method: 'GET',
                url: "http://15.164.232.95:9000/users/profile",
                headers: {
                    Authorization: `${userInfo.accessToken}` 
                }
            });
        
            if (response.status === 200) {
                console.log("회원탈퇴 완료");
        
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }

    async function changeUserProfile(userNick) {
        try {
            const response = await axios({
                method: 'PATCH',
                url: "http://15.164.232.95:9000/users/nickname",
                headers: {
                    Authorization: `${userInfo.accessToken}` ,
                    
                },
                data: {
                    nickname : userNick,
                },
            });
        
            if (response.status === 200) {
                console.log("닉네임수정 완료");
        
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }

    async function changeUserPick() {
        try {
            const response = await axios.patch(
                "http://15.164.232.95:9000/users/profile_image",
                formData, // 이전에 설정한 formData
                {
                    headers: {
                        Authorization: `${userInfo.accessToken}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );
            
            if (response.status === 200) {
                console.log("프사 수정 완료");
            }
        } catch (error) {
            console.error("Error fetching profile_img data:", error);
            console.log(formData);
        }
    }
    
    const handleDelete = () => {
        setSaveState(false);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
        deleteUserData();
    };

    const handleSubmit = () =>{
        
        setProfileData(prevData => ({
                    ...prevData,
                    name: userNick,
                }));

        setUserInfo(
            (prevData => ({
                ...prevData,
                nickname: userNick,
            }))
        );
        changeUserPick();
        changeUserProfile(userNick);
        console.log("변경된 닉네임: ",profileData);
        setSaveState(true);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    const handleEditButtonClick = () => {
        // 버튼 클릭시 수행할 작업을 여기에 작성
        console.log('Image edit button clicked!');
        const fileInput = document.getElementById('imageFileInput');
        fileInput.click();
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            // form-data 형식으로 파일 데이터 설정
            const newFormData = new FormData();
            newFormData.append('imageFile', file);
            let extension;
            switch (file.type) {
                case 'image/jpeg':
                    extension = '.jpg';
                    break;
                case 'image/png':
                    extension = '.png';
                    break;
                case 'image/png':
                    extension = '.jpeg';
                    break;
                default:
                    extension = '.unknown';
                    break;
            }
            console.log(`newFormData extension: ${extension}`);
            setFormData(newFormData);
            // 선택한 이미지의 미리보기 URL 생성
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;

                setProfileData(prevData => ({
                    ...prevData,
                    imgSrc: imageUrl,
                }));
            };

            reader.readAsDataURL(file);

            // formData를 서버로 전송하는 로직을 여기에 추가...
        }
    };


    return (
    <div className="profile-edit-container">
        <h1 className="profile-title">내 프로필</h1>
        

        <div className='profileEdit-image-container'>
            <img className = "profileEdit-image" src={profileData.imgSrc} alt="Profile" />
            <button className="edit-button" onClick={handleEditButtonClick}></button>
            <input 
                    type="file" 
                    id="imageFileInput" 
                    accept=".jpg, .jpeg, .png" 
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
        </div>
        
        <h2 className="profile-subtitle">닉네임</h2>
        
        <input 
            type="text"
            className="nickname-input" 
            placeholder={profileData.name} 
            value={userNick}
            onChange={handleNickChange} 
            />

        <div className="buttons-container">
            <button className="save-button" onClick={handleSubmit}>저장하기</button>
            <button className="delete-button" onClick={handleDelete}>삭제하기</button>
        </div>
        {showPopup && (
            <div className="popup-overlay">
            <div className="popup-content">
                {saveState? (
                    <span className="popup-text">저장이 완료되었습니다.</span>
                ):(
                    <>
                        <div className="popup-icon"></div>
                        <span className="popup-text">탈퇴가 완료되었습니다. 감사합니다.</span>
                    </>
                )}
                
            </div>
            </div>
        )}
    </div>
    );
}

export default MyTravelProfileEdit;