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
            tid: 12345,
            budget: 1500.0,
            transactions: [
                {
                    description: "식사",
                    amount: 200.0,
                },
                {
                    description: "교통",
                    amount: 50.0,
                },
            ],
        },
    ],
});

export const checkListState = atom({
    key: "checkListState",
    default: [
        // {
        //     cid: 1,
        //     title: "2023년 8월",
        //     tid: 40,
        //     items: [
        //         {
        //             iid: 1,
        //             name: "아쿠아 슈즈",
        //             isChecked: false,
        //         },
        //         {
        //             iid: 2,
        //             name: "호텔 예약",
        //             isChecked: false,
        //         },
        //         {
        //             iid: 3,
        //             name: "보조배터리",
        //             isChecked: false,
        //         },
        //     ],
        // },
        // {
        //     cid: 2,
        //     title: "2023년 9월",
        //     tid: 40,
        //     items: [
        //         {
        //             iid: 1,
        //             name: "클렌징폼",
        //             isChecked: false,
        //         },
        //         {
        //             iid: 2,
        //             name: "우산",
        //             isChecked: false,
        //         },
        //     ],
        // },
        // {
        //     cid: 3,
        //     title: "2023년 7월",
        //     tid: 40,
        //     items: [
        //         {
        //             iid: 1,
        //             name: "한복 대여",
        //             isChecked: false,
        //         },
        //         {
        //             iid: 2,
        //             name: "충전기",
        //             isChecked: false,
        //         },
        //         {
        //             iid: 3,
        //             name: "카메라",
        //             isChecked: false,
        //         },
        //     ],
        // },
    ],
});

export const noteState = atom({
    key: "noteState",
    default: [
        {
            tid: 1,
            title: "제주도 제주시",
        },
        {
            tid: 2,
            title: "전라북도 전주시",
        },
    ],
});
