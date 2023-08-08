import { atom } from "recoil";

// 지역 데이터
const defaultContents = {
    result: [
        {
            id: 1,
            city: "속초시",
            country: "강원도",
        },
        {
            id: 2,
            city: "양양군",
            country: "강원도",
        },
        {
            id: 3,
            city: "고성군",
            country: "강원도",
        },
        {
            id: 4,
            city: "동해시",
            country: "강원도",
        },
        {
            id: 5,
            city: "수원시",
            country: "경기도",
        },
        {
            id: 6,
            city: "화성시",
            country: "경기도",
        },
        {
            id: 7,
            city: "성남시",
            country: "경기도",
        },
        {
            id: 8,
            city: "안양시",
            country: "경기도",
        },
        {
            id: 9,
            city: "평택시",
            country: "경기도",
        },
        {
            id: 10,
            city: "부천시",
            country: "경기도",
        },
        {
            id: 11,
            city: "안산시",
            country: "경기도",
        },
        {
            id: 12,
            city: "의정부시",
            country: "경기도",
        },
        {
            id: 13,
            city: "김포시",
            country: "경기도",
        },
    ],
};

export const regionState = atom({
    key: "regionState",
    default: defaultContents,
});
