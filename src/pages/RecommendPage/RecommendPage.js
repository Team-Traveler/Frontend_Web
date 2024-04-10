import "./RecommendPage.css";
import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import Modal from "../../components/Modal/Modal";
import { AiOutlinePlus } from "react-icons/ai";
import dayjs from "dayjs";
import LoadingModal from "../../components/Loading/Loading";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/atoms/userState";
import { recommendFormState } from "../../recoil/atoms/recommendFormState";
import { regionState } from "../../recoil/atoms/regionState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ko from 'dayjs/locale/ko'

const datePickerFormat = "YYYY-MM-DD";
const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
    // You can add other utils as needed, such as `isValid`, etc.
};

function RecommendPage() {
    const [showModal, setShowModal] = useState(false);
    const [startDate] = useState(null);
    const [finishDate] = useState(null);
    const [recommendForm, setRecommendForm] =
        useRecoilState(recommendFormState);
    const [userInfo] = useRecoilState(userInfoState);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [region, setRegion] = useRecoilState(regionState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        // recommendForm 상태 변화에 따라 isButtonDisabled 업데이트
        setIsButtonDisabled(
            recommendForm.startDate === "" ||
                recommendForm.finishDate === "" ||
                recommendForm.cityId === "" ||
                recommendForm.hard === "" ||
                recommendForm.what === "" ||
                recommendForm.with === "" ||
                recommendForm.people === ""
        );
    }, [recommendForm]); // recommendForm 상태 변화 감지

    // recommendFormState axios 전송(여행 찾기)
    const handleCompleteButtonClick = () => {
        setLoading(true); // loading 화면 띄우기

        const data = {
            startDate: recommendForm.startDate,
            finishDate: recommendForm.finishDate,
            cityId: parseInt(recommendForm.cityId),
            hard: parseInt(recommendForm.hard),
            what: parseInt(recommendForm.what),
            with: parseInt(recommendForm.with),
            people: parseInt(recommendForm.people),
        };

        //여행 찾기 버튼 클릭 시 recommendFormState axios 전송
        axios
            .post("http://15.164.232.95:9000/recommend", data, {
                headers: { Authorization: userInfo.accessToken },
            })
            .then((response) => {
                // console.log(response);

                const startTime = Date.now(); // 로딩화면 띄우기 시작 시간

                // 최소 3초동안 로딩화면 띄우기
                const remainingTime = (Math.max(
                    0,
                    3000 - (Date.now() - startTime)
                ));
                setTimeout(() => {
                    setLoading(false);
                    setCompleted(true);
                    navigate("/recommendCompleted");
                }, remainingTime);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const handleWithWhoButtonClick = (buttonId) => {
        setRecommendForm((prev) => ({
            ...prev,
            with: buttonId,
        }));
    };

    const handleHardButtonClick = (buttonId) => {
        setRecommendForm((prev) => ({
            ...prev,
            hard: buttonId,
        }));
    };

    const handleWhatButtonClick = (buttonId) => {
        setRecommendForm((prev) => ({
            ...prev,
            what: buttonId,
        }));
    };

    const leftListCountry = [
        { id: 1, name: "서울" },
        { id: 2, name: "인천" },
        { id: 3, name: "부산" },
        { id: 4, name: "대전" },
        { id: 5, name: "대구" },
        { id: 6, name: "울산" },
        { id: 7, name: "광주" },
        { id: 8, name: "경기도" },
        { id: 9, name: "충청도" },
        { id: 10, name: "강원도" },
        { id: 11, name: "전라도" },
        { id: 12, name: "경북" },
        { id: 13, name: "경남" },
        { id: 14, name: "제주도" },
    ];

    // region 데이터 axios로 불러와서 regionState에 저장
    useEffect(() => {
        const fetchRegionData = async () => {
            try {
                const response = await axios.get(
                    "http://15.164.232.95:9000/recommend/regieon",
                    {
                        headers: { Authorization: userInfo.accessToken },
                    }
                );
                setRegion(response.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        };
        fetchRegionData();
    }, [userInfo.accessToken, showModal, setRegion]);

    const rightListCountry = region.filter(
        (item) => item.country === selectedCountry
    );

    const startDateChange = (date) => {
        const formattedDate = dayjs(date).format(datePickerFormat);
        setRecommendForm((prev) => ({
            ...prev,
            startDate: formattedDate,
        }));
    };

    const finishDateChange = (date) => {
        const formattedDate = dayjs(date).format(datePickerFormat);
        setRecommendForm((prev) => ({
            ...prev,
            finishDate: formattedDate,
        }));
    };

    const handleDecreasePeopleCount = () => {
        if (recommendForm.people === 1) return;
        setRecommendForm((prev) => ({
            ...prev,
            people: Number(prev.people) - 1,
        }));
    };

    const handleIncreasePeopleCount = () => {
        setRecommendForm((prev) => ({
            ...prev,
            people: Number(prev.people) + 1,
        }));
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // useEffect(() => {
    //     console.log("여행 찾기 입력폼 데이터 :", recommendForm);
    // }, [recommendForm]);

    return (
        <div className="recommend-page">
            {/* 메뉴 */}
            <Nav className="recommend-nav"></Nav>
            <div className="recommend">
            <div className="recommend-thumbnail" >
            </div>
            {/* main content */}
                <div className="recommend-content">
                    {/* Display initial content */}
                    {!loading && !completed && (
                        <>
                            {" "}
                            <div className="recommend-section">
                                <div className="recommend-section-1">
                                    <div className="recommend-card">
                                        <div className="recommend-card-title">
                                            언제?
                                        </div>
                                        <div className="recommend-card-content">
                                            {/* 출발 row */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginTop: "5px",
                                                    marginBottom: "5px",
                                                    marginLeft: "10%",
                                                }}
                                            >
                                                <div style={{ marginRight: "5%" }}>
                                                    출발
                                                </div>

                                                <div className="when-button">
                                                    {" "}
                                                    <LocalizationProvider
                                                        dateAdapter={AdapterDayjs}
                                                        dateFormats={
                                                            datePickerUtils
                                                        }
                                                        locale={ko}
                                                    >
                                                        <DemoContainer
                                                            components={[
                                                                "DatePicker",
                                                            ]}
                                                        >
                                                            <DatePicker
                                                                label="출발 날짜 선택"
                                                                slotProps={{
                                                                    textField: {
                                                                        size: "small",
                                                                    },
                                                                }}
                                                                format="YYYY / MM / DD (dddd)"
                                                                value={startDate}
                                                                onChange={(
                                                                    newValue
                                                                ) => {
                                                                    startDateChange(
                                                                        newValue
                                                                    );
                                                                }}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                            {/* 도착 row */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginTop: "5px",
                                                    marginBottom: "5px",
                                                    marginLeft: "10%",
                                                }}
                                            >
                                                <div style={{ marginRight: "5%" }}>
                                                    도착
                                                </div>
                                                <div className="when-button">
                                                    {" "}
                                                    <LocalizationProvider
                                                        dateAdapter={AdapterDayjs}
                                                        dateFormats={
                                                            datePickerUtils
                                                        }
                                                    >
                                                        <DemoContainer
                                                            components={[
                                                                "DatePicker",
                                                            ]}
                                                        >
                                                            <DatePicker
                                                                label="도착 날짜를 선택해주세요"
                                                                slotProps={{
                                                                    textField: {
                                                                        size: "small",
                                                                    },
                                                                }}
                                                                format="YYYY / MM / DD"
                                                                value={finishDate}
                                                                onChange={(
                                                                    newValue
                                                                ) => {
                                                                    finishDateChange(
                                                                        newValue
                                                                    );
                                                                }}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="recommend-card">
                                        {" "}
                                        <div className="recommend-card-title">
                                            {" "}
                                            어디로?
                                        </div>
                                        <div className="where-button-wrap">
                                            <div
                                                className="where-button"
                                                onClick={openModal}
                                            >
                                                {recommendForm.cityId !== ""
                                                    ? region
                                                        .filter(
                                                            (item) =>
                                                                item.did ===
                                                                recommendForm.cityId
                                                        )
                                                        .map((item) => item.city)
                                                    : "여행지를 선택해주세요"}
                                                <div className="where-button-icon">
                                                    <AiOutlinePlus
                                                        style={{ fontSize: "20px" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="recommend-card">
                                        {" "}
                                        <div className="recommend-card-title">
                                            누구와?
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div className="people-count-container">
                                                <div
                                                    className="people-count-icon-minus people-count-icon
    "
                                                    onClick={
                                                        handleDecreasePeopleCount
                                                    }
                                                >
                                                    -
                                                </div>
                                                <div className="people-count">
                                                    {recommendForm.people}명
                                                </div>
                                                <div
                                                    className="people-count-icon-plus people-count-icon"
                                                    onClick={
                                                        handleIncreasePeopleCount
                                                    }
                                                >
                                                    +
                                                </div>
                                            </div>
                                            <div
                                            >
                                                <button
                                                    onClick={() =>
                                                        handleWithWhoButtonClick(1)
                                                    }
                                                    className={`recommend-card-button ${
                                                        recommendForm.with === 1
                                                            ? "recommend-card-button-selected"
                                                            : ""
                                                    }`}
                                                >
                                                    친구랑
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleWithWhoButtonClick(2)
                                                    }
                                                    className={`recommend-card-button ${
                                                        recommendForm.with === 2
                                                            ? "recommend-card-button-selected"
                                                            : ""
                                                    }`}
                                                >
                                                    가족과
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleWithWhoButtonClick(3)
                                                    }
                                                    className={`recommend-card-button ${
                                                        recommendForm.with === 3
                                                            ? "recommend-card-button-selected"
                                                            : ""
                                                    }`}
                                                >
                                                    연인과
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleWithWhoButtonClick(4)
                                                    }
                                                    className={`recommend-card-button ${
                                                        recommendForm.with === 4
                                                            ? "recommend-card-button-selected"
                                                            : ""
                                                    }`}
                                                >
                                                    혼자서
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="recommend-section-1">
                                    <div className="recommend-card">
                                        {" "}
                                        <div className="recommend-card-title">
                                            여행강도
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    handleHardButtonClick(1)
                                                }
                                                className={`recommend-card-button ${
                                                    recommendForm.hard === 1
                                                        ? "recommend-card-button-selected"
                                                        : ""
                                                }`}
                                            >
                                                여유롭게
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleHardButtonClick(2)
                                                }
                                                className={`recommend-card-button ${
                                                    recommendForm.hard === 2
                                                        ? "recommend-card-button-selected"
                                                        : ""
                                                }`}
                                            >
                                                보통
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleHardButtonClick(3)
                                                }
                                                className={`recommend-card-button ${
                                                    recommendForm.hard === 3
                                                        ? "recommend-card-button-selected"
                                                        : ""
                                                }`}
                                            >
                                                바쁘게
                                            </button>
                                        </div>
                                    </div>
                                    <div className="recommend-card">
                                        {" "}
                                        <div className="recommend-card-title">
                                            무엇을?
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    handleWhatButtonClick(1)
                                                }
                                                className={`recommend-card-button ${
                                                    recommendForm.what === 1
                                                        ? "recommend-card-button-selected"
                                                        : ""
                                                }`}
                                            >
                                                경치관람
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleWhatButtonClick(2)
                                                }
                                                className={`recommend-card-button ${
                                                    recommendForm.what === 2
                                                        ? "recommend-card-button-selected"
                                                        : ""
                                                }`}
                                            >
                                                먹방
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleWhatButtonClick(3)
                                                }
                                                className={`recommend-card-button ${
                                                    recommendForm.what === 3
                                                        ? "recommend-card-button-selected"
                                                        : ""
                                                }`}
                                            >
                                                액티비티
                                            </button>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    handleWhatButtonClick(4)
                                                }
                                                className={`recommend-card-button ${
                                                    recommendForm.what === 4
                                                        ? "recommend-card-button-selected"
                                                        : ""
                                                }`}
                                            >
                                                체험
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleWhatButtonClick(5)
                                                }
                                                className={`recommend-card-button ${
                                                    recommendForm.what === 5
                                                        ? "recommend-card-button-selected"
                                                        : ""
                                                }`}
                                            >
                                                카페
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 여행찾기 버튼 */}
                            <div
                                className={`recommend-button ${
                                    isButtonDisabled ? "disabled" : ""
                                }`}
                                onClick={
                                    isButtonDisabled
                                        ? null
                                        : handleCompleteButtonClick
                                }
                            >
                                여행찾기
                            </div>
                        </>
                    )}

                    {/* Display loading screen */}
                    {loading && (
                        <div className="loading-screen">
                            <div className="loading-text">
                                <p>취향에 맞게 여행계획을</p>
                                <p>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;구성중입니다
                                </p>
                            </div>
                            <div className="loading-spinner">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* 여행지 선택 모달 창 */}
            {showModal && (
                <Modal
                    closeModal={closeModal}
                    size="large"
                    headerTitle={<h3></h3>}
                >
                    {/* Custom content inside the modal */}
                    <div className="recommend-select-region">
                        <LeftListComponent
                            items={leftListCountry}
                            onItemClick={(city) => setSelectedCountry(city)}
                            selectedCountry={selectedCountry}
                        />
                        <RightListComponent
                            items={rightListCountry.filter(
                                (item) => item.country === selectedCountry
                            )}
                            setRecommendForm={setRecommendForm}
                            closeModal={closeModal}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}

function LeftListComponent({ items, onItemClick, selectedCountry }) {
    return (
        <div className="left-list">
            {items.map((item) => (
                <div
                    key={item.did}
                    className={`left-list-item ${
                        item.name === selectedCountry ? "selected" : ""
                    }`}
                    onClick={() => {
                        onItemClick(item.name);
                    }}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
}

function RightListComponent({ items, setRecommendForm, closeModal }) {
    return (
        <div className="right-list">
            {items.map((item) => (
                <div key={item.did}>
                    <div className="right-list-item">
                        {item.city}
                        <div
                            onClick={() => {
                                setRecommendForm((prev) => ({
                                    ...prev,
                                    cityId: item.did,
                                }));
                                closeModal();
                            }}
                            className="right-list-item-button"
                        >
                            선택하기
                        </div>
                    </div>
                    <hr style={{ width: "100%" }}></hr>
                </div>
            ))}
        </div>
    );
}

export default RecommendPage;
