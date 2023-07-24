import { atom } from "recoil";

export const noteState = atom({
    key: "noteState",
    default: [
        {
            id: 1,
            title: "도쿄 여행",
            istoggle: true,
        },
        {
            id: 2,
            title: "오사카 여행",
            istoggle: false,
        },
        {
            id: 3,
            title: "동유럽 여행",
            istoggle: false,
        },
        {
            id: 4,
            title: "캐나다 여행_2019",
            istoggle: false,
        },
        {
            id: 5,
            title: "방콕 여행_2022",
            istoggle: false,
        },
    ],
});
