import { atom } from "recoil";

const defaultLikeContents = {
    isSuccess: true,
    code: 1000,
    message: "요청에 성공하였습니다.",
    result: [
        {
            postResponse: {
                title: "제주도 제주시",
                oneLineReview: "종강 후 떠났던 제주도",
                url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/890f4b9d-6081-4ea1-8ff7-9e6d2848644a",
                pid: 1,
                uid: 1,
            },
            hid: 1,
            uid: 1,
        },
        {
            postResponse: {
                title: "충남 보령시 대천해수욕장",
                oneLineReview: "바다노을은 서해안이지",
                url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/90dbf1af-a024-4cc5-87a1-7d5d44d50c86",
                pid: 2,
                uid: 2,
            },
            hid: 2,
            uid: 1,
        },
    ],
};

export const likeContentState = atom({
    key: "likeContentState",
    default: defaultLikeContents,
});
