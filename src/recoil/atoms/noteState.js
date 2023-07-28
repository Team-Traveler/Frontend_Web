import { atom } from "recoil";

export const selectedNoteId = atom({
    key: "selectedNoteId",
    default: 1,
});

export const nextNoteId = atom({
    key: "nextNoteId",
    default: 6,
});

export const noteState = atom({
    key: "noteState",
    default: [
        {
            id: 1,
            title: "도쿄 여행",
            istoggle: false,
            nextCheckListId: 3,
            checkcontent: [
                {
                    id: 1,
                    title: "도쿄 여행 체크리스트1",
                    content: [
                        {
                            id: 1,
                            item: "비행기 티켓",
                            ischecked: false,
                            isedit: false,
                        },
                        {
                            id: 2,
                            item: "호텔 예약",
                            ischecked: false,
                            isedit: false,
                        },
                    ],
                    nextid: 3,
                    isedit: false,
                },
                {
                    id: 2,
                    title: "도쿄 여행 체크리스트2",
                    content: [
                        {
                            id: 1,
                            item: "비행기 티켓",
                            ischecked: false,
                            isedit: false,
                        },
                        {
                            id: 2,
                            item: "호텔 예약",
                            ischecked: false,
                            isedit: false,
                        },
                    ],
                    nextid: 3,
                    isedit: false,
                },
            ],
            accountcontent: "도쿄 여행 가계부",
        },
        {
            id: 2,
            title: "오사카 여행",
            istoggle: false,
            nextCheckListId: 3,
            checkcontent: [
                {
                    id: 1,
                    title: "오사카 여행 체크리스트1",
                    content: [
                        {
                            id: 1,
                            item: "캐리어",
                            ischecked: false,
                            isedit: false,
                        },
                        {
                            id: 2,
                            item: "여권",
                            ischecked: false,
                            isedit: false,
                        },
                    ],
                    nextid: 3,
                    isedit: false,
                },
            ],
            accountcontent: "오사카 여행 가계부",
        },
        {
            id: 3,
            title: "동유럽 여행",
            istoggle: false,
            nextCheckListId: 2,
            checkcontent: [
                {
                    id: 1,
                    title: "동유럽 여행 체크리스트1",
                    content: [
                        {
                            id: 1,
                            item: "와이파이 도시락",
                            ischecked: false,
                            isedit: false,
                        },
                    ],
                    nextid: 2,
                    isedit: false,
                },
            ],
            accountcontent: "동유럽 여행 가계부",
        },
        {
            id: 4,
            title: "캐나다 여행_2019",
            istoggle: false,
            nextCheckListId: 1,
            checkcontent: [
                {
                    id: 1,
                    title: "캐나다 여행 체크리스트1",
                    content: [],
                    nextid: 1,
                    isedit: false,
                },
            ],

            accountcontent: "캐나다 여행 가계부",
        },
        {
            id: 5,
            title: "방콕 여행_2022",
            istoggle: false,
            nextCheckListId: 1,
            checkcontent: [
                {
                    id: 1,
                    title: "방콕 여행 체크리스트1",
                    content: [],
                    nextid: 1,
                    isedit: false,
                },
            ],
            accountcontent: "방콕 여행 가계부",
        },
    ],
});
