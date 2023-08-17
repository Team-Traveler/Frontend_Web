import { atom } from "recoil";

export const selectedNoteId = atom({
    key: "selectedNoteId",
    default: 0,
});

export const AccountBookMode = atom({
    key: "AccountBookMode",
    default: 0,
});

export const accountListState = atom({
    key: "accountListState",
    default: [
        {
            accountName: "새로운 가계부 이름",
            tId: 12345,
            budget: 1500.0,
            transactions: [
                {
                    description: "식사",
                    amount: 200.0,
                },
                {
                    description: "교통비",
                    amount: 50.0,
                },
            ],
        },
    ],
});

export const checkListState = atom({
    key: "checkListState",
    default: [
        {
            id: 1,
            title: "2023년 5월",
            travelId: 1,
            item: [
                {
                    id: 1,
                    name: "비행기 티켓",
                    isChecked: false,
                },
                {
                    id: 2,
                    name: "호텔 예약",
                    isChecked: false,
                },
                {
                    id: 3,
                    name: "여권",
                    isChecked: false,
                },
            ],
        },
        {
            id: 2,
            title: "2023년 6월",
            travelId: 1,
            item: [
                {
                    id: 1,
                    name: "여권",
                    isChecked: false,
                },
                {
                    id: 2,
                    name: "캐리어",
                    isChecked: false,
                },
            ],
        },
        {
            id: 3,
            title: "2023년 7월",
            travelId: 2,
            item: [
                {
                    id: 1,
                    name: "비행기 티켓",
                    isChecked: false,
                },
                {
                    id: 2,
                    name: "호텔 예약",
                    isChecked: false,
                },
                {
                    id: 3,
                    name: "여권",
                    isChecked: false,
                },
            ],
        },
    ],
});

export const noteState = atom({
    key: "noteState",
    default: [
        {
            id: 1,
            title: "도쿄 여행",
        },
        {
            id: 2,
            title: "오사카 여행",
        },
        {
            id: 3,
            title: "동유럽 여행",
        },
        {
            id: 4,
            title: "캐나다 여행_2019",
        },
        {
            id: 5,
            title: "방콕 여행_2022",
        },
    ],
});
