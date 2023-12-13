import { atom } from "recoil";

// 찜한 여행 컨텐츠 데이터 (초기값)
// const defaultLikeContents = [
//     {
//         hid: 5,
//         post: {
//             pid: 4, // 커뮤니티 글 고유 id
//             title: "대구광역시 수성구 수성못",
//             description: "요즘 날씨에 걷기 좋은 곳",
//             image: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/5034f333-731f-48e8-a6f9-12ba608d1466",
//         },
//         uid: 1,
//     },
//     {
//         hid: 6,
//         post: {
//             pid: 5,
//             title: "전라남도 여수시",
//             description: "엑스포만 있는게 아니에요",
//             image: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/31897bc5-1fcf-4874-919e-8cabe344aade",
//         },
//         uid: 3,
//     },
// ];

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
