import "./RecommendPage.css";
import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import Modal from "../../components/Modal/Modal";
import { AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";
import ReactDatePicker from "react-datepicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { recommendFormState } from "../../recoil/atoms/recommendFormState";
import { regionState } from "../../recoil/atoms/regionState";

const datePickerFormat = "YYYY-MM-DD";
const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
    // You can add other utils as needed, such as `isValid`, etc.
};

function RecommendPage() {
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [finishDate, setFinishDate] = useState(null);
    const [recommendForm, setRecommendForm] =
        useRecoilState(recommendFormState);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [region, setRegion] = useRecoilState(regionState);

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
        { id: 1, name: "서울특별시" },
        { id: 2, name: "인천광역시" },
        { id: 3, name: "부산광역시" },
        { id: 4, name: "대전광역시" },
        { id: 5, name: "대구광역시" },
        { id: 6, name: "울산광역시" },
        { id: 7, name: "광주광역시" },
        { id: 8, name: "경기도" },
        { id: 9, name: "충청남북도" },
        { id: 10, name: "강원도" },
        { id: 11, name: "전라남북도" },
        { id: 12, name: "경상남북도" },
        { id: 13, name: "제주도" },
    ];

    const rightListCountry = region.result.filter(
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

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        console.log(recommendForm);
    }, [recommendForm]);

    return (
        <div className="recommend-page">
            {/* 메뉴 */}
            <Nav className="recommend-nav"></Nav>
            {/* main content */}
            <div className="recommend-content">
                <div className="recommend-section">
                    <div className="recommend-section-1">
                        <div className="recommend-card">
                            <div className="recommend-card-title">언제?</div>
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
                                            dateFormats={datePickerUtils}
                                        >
                                            <DemoContainer
                                                components={["DatePicker"]}
                                            >
                                                <DatePicker
                                                    label="출발 날짜를 선택해주세요"
                                                    slotProps={{
                                                        textField: {
                                                            size: "small",
                                                        },
                                                    }}
                                                    format="YYYY / MM / DD"
                                                    value={startDate}
                                                    onChange={(newValue) => {
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
                                            dateFormats={datePickerUtils}
                                        >
                                            <DemoContainer
                                                components={["DatePicker"]}
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
                                                    onChange={(newValue) => {
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
                            <div className="recommend-card-title"> 어디로?</div>
                            <div className="where-button-wrap">
                                <div
                                    className="where-button"
                                    onClick={openModal}
                                >
                                    {recommendForm.cityId !== ""
                                        ? region.result
                                              .filter(
                                                  (item) =>
                                                      item.id ===
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
                            <div className="recommend-card-title">누구와?</div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <button
                                    onClick={() => handleWithWhoButtonClick(1)}
                                    className={`recommend-card-button ${
                                        recommendForm.with === 1
                                            ? "recommend-card-button-selected"
                                            : ""
                                    }`}
                                >
                                    친구랑
                                </button>
                                <button
                                    onClick={() => handleWithWhoButtonClick(2)}
                                    className={`recommend-card-button ${
                                        recommendForm.with === 2
                                            ? "recommend-card-button-selected"
                                            : ""
                                    }`}
                                >
                                    가족과
                                </button>
                                <button
                                    onClick={() => handleWithWhoButtonClick(3)}
                                    className={`recommend-card-button ${
                                        recommendForm.with === 3
                                            ? "recommend-card-button-selected"
                                            : ""
                                    }`}
                                >
                                    연인과
                                </button>
                                <button
                                    onClick={() => handleWithWhoButtonClick(4)}
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
                    <div className="recommend-section-1">
                        <div className="recommend-card">
                            {" "}
                            <div className="recommend-card-title">여행강도</div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <button
                                    onClick={() => handleHardButtonClick(1)}
                                    className={`recommend-card-button ${
                                        recommendForm.hard === 1
                                            ? "recommend-card-button-selected"
                                            : ""
                                    }`}
                                >
                                    여유롭게
                                </button>
                                <button
                                    onClick={() => handleHardButtonClick(2)}
                                    className={`recommend-card-button ${
                                        recommendForm.hard === 2
                                            ? "recommend-card-button-selected"
                                            : ""
                                    }`}
                                >
                                    보통
                                </button>
                                <button
                                    onClick={() => handleHardButtonClick(3)}
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
                                <span style={{ fontWeight: "normal" }}>
                                    {" "}
                                    최대 3개 선택 가능
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <button
                                    onClick={() => handleWhatButtonClick(1)}
                                    className={`recommend-card-button ${
                                        recommendForm.what === 1
                                            ? "recommend-card-button-selected"
                                            : ""
                                    }`}
                                >
                                    경치관람
                                </button>
                                <button
                                    onClick={() => handleWhatButtonClick(2)}
                                    className={`recommend-card-button ${
                                        recommendForm.what === 2
                                            ? "recommend-card-button-selected"
                                            : ""
                                    }`}
                                >
                                    먹방
                                </button>
                                <button
                                    onClick={() => handleWhatButtonClick(3)}
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
                                    onClick={() => handleWhatButtonClick(4)}
                                    className={`recommend-card-button ${
                                        recommendForm.what === 4
                                            ? "recommend-card-button-selected"
                                            : ""
                                    }`}
                                >
                                    체험
                                </button>
                                <button
                                    onClick={() => handleWhatButtonClick(5)}
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
                <div className="recommend-button">여행찾기</div>
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
                    key={item.id}
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
                <div key={item.id}>
                    <div key={item.id} className="right-list-item">
                        {item.city}
                        <div
                            onClick={() => {
                                setRecommendForm((prev) => ({
                                    ...prev,
                                    cityId: item.id,
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
