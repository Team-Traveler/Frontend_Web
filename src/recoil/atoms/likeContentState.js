import { atom } from "recoil";

// 찜한 여행 컨텐츠 데이터
const defaultLikeContents = {
    result: [
        {
            id: 1,
            title: "괌 여행",
            duration: "3박 4일",
            description: "투몬해변과 두짓비치리조트", // 15자 이내
            daysAgo: 5,
            hashTag: ["hashTag1", "hashTag2", "hasTag3"],
            authorId: 1,
            authorName: "관리자",
        },
        {
            id: 7,
            title: "헝가리 여행",
            duration: "3박 4일",
            description: "아름다운 야경, 저렴한 물가",
            daysAgo: 5,
            hashTag: ["hashTag1", "hashTag2", "hasTag3"],
            authorId: 1,
            authorName: "관리자",
        },
    ],
};

export const likeContentState = atom({
    key: "likeContentState",
    default: defaultLikeContents,
});
