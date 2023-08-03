import { atom } from "recoil";

// 여행 컨텐츠 데이터
const defaultContents = {
    result: [
        {
            id: 1,
            title: "도쿄 여행",
            duration: "2박 3일",
            description: "도쿄 디즈니 랜드 정복기", // 15자 이내
        },
        {
            id: 2,
            title: "대만 여행",
            duration: "3박 4일",
            description: "나의 첫 가오슝 자유여행",
        },
        {
            id: 3,
            title: "싱가폴 여행",
            duration: "4박 5일",
            description: "그레이트 세일에 득템하기",
        },
        {
            id: 4,
            title: "태국 여행",
            duration: "3박 4일",
            description: "러이끄라통 등불 축제에 가다",
        },
        {
            id: 5,
            title: "스페인 여행",
            duration: "4박 5일",
            description: "토마토 축제의 로망",
        },
        {
            id: 6,
            title: "영국 여행",
            duration: "3박 4일",
            description: "흐린날씨도 영국의 매력",
        },
        {
            id: 7,
            title: "헝가리 여행",
            duration: "3박 4일",
            description: "아름다운 야경, 저렴한 물가",
        },
    ],
};

export const contentState = atom({
    key: "contentState",
    default: defaultContents,
});
