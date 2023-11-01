import { atom } from "recoil";

// 여행 컨텐츠 데이터
const defaultContents = [
    {
        pid: 1,
        title: "경상북도 영덕군",
        description: "한 여름 조용한 스노쿨링", // 15자 이내
        url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/94a4a0a2-589b-4416-9f2e-ef1063c44d98",
    },
    {
        pid: 2,
        title: "경기도 수원시 행궁동",
        description: "아직도 나는 거기에 앉아있어",
        url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/838978e9-2bcf-43ec-a46a-36c140250f81",
    },
    {
        pid: 3,
        title: "제주도 제주시",
        description: "종강후 떠났던 제주도",
        url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/890f4b9d-6081-4ea1-8ff7-9e6d2848644a",
    },
    {
        pid: 4,
        title: "충남 보령시 대천해수욕장",
        description: "바다노을은 서해안이지",
        url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/90dbf1af-a024-4cc5-87a1-7d5d44d50c86",
    },
    {
        pid: 5,
        title: "대구광역시 수성구 수성못",
        oneLineReview: "요즘 날씨에 걷기 좋은 곳",
        url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/5034f333-731f-48e8-a6f9-12ba608d1466",
    },
    {
        id: 6,
        title: "전라남도 여수시",
        description: "엑스포만 있는게 아니에요",
        url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/31897bc5-1fcf-4874-919e-8cabe344aade",
    },
    {
        pid: 7,
        title: "제주도 제주시",
        description: "Siempre sale el sol.",
        url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/08a8c89d-e5f4-46e1-b285-7cd58aaade52",
    },
    {
        pid: 8,
        title: "전라북도 전주시",
        description: "볼거리 먹거리 많은곳",
        url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/e25940be-55e7-4b78-becc-215ae5f96036",
    },
    {
        pid: 9,
        title: "경상북도 포항시",
        description: "크리스마스 이브의 호미곶",
        url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/c58e45e0-05c3-4c0d-9fac-8b55a758d623",
    },
    {
        pid: 10,
        title: "서울특별시",
        description: "생각이 많을땐 노들섬으로",
        url: "https://github.com/Team-Traveler/Frontend_Web/assets/71630722/38f7c316-f9bf-47bb-87b9-1f4407ea32f1",
    },
];

export const contentState = atom({
    key: "contentState",
    default: defaultContents,
});
