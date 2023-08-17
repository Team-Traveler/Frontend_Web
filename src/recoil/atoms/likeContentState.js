import { atom } from "recoil";

// 찜한 여행 컨텐츠 데이터
const defaultLikeContents = {
    result: [
        {
            id: 5,
            title: "대구광역시 수성구 수성못",
            duration: "4박 5일",
            description: "요즘 날씨에 걷기 좋은 곳",
            image: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/5034f333-731f-48e8-a6f9-12ba608d1466",
        },
        {
            id: 6,
            title: "전라남도 여수시",
            duration: "3박 4일",
            description: "엑스포만 있는게 아니에요",
            image: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/31897bc5-1fcf-4874-919e-8cabe344aade",
        },
    ],
};

export const likeContentState = atom({
    key: "likeContentState",
    default: defaultLikeContents,
});
