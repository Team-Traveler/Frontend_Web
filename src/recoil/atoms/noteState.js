import { atom } from "recoil";

export const selectedNoteId = atom({
    key: "selectedNoteId",
    default: 0,
});

export const nextNoteId = atom({
    key: "nextNoteId",
    default: 6,
});

export const AccountBookMode = atom({
    key: "AccountBookMode",
    default: 0,
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
                    item: "비행기 티켓",
                    ischecked: false,
                },
                {
                    id: 2,
                    item: "호텔 예약",
                    ischecked: false,
                },
                {
                    id: 3,
                    item: "여권",
                    ischecked: false,
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
                    item: "여권",
                    ischecked: false,
                },
                {
                    id: 2,
                    item: "캐리어",
                    ischecked: false,
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
                    item: "비행기 티켓",
                    ischecked: false,
                },
                {
                    id: 2,
                    item: "호텔 예약",
                    ischecked: false,
                },
                {
                    id: 3,
                    item: "여권",
                    ischecked: false,
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
