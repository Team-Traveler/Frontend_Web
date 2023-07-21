import { atom } from "recoil";

// 여행 컨텐츠 데이터
const defaultContents = [
    {
        id: 1,
        title: "Sample Content 1",
        duration: "3 days 2 nights",
        description: "This is the description of Sample Content 1.",
    },
    {
        id: 2,
        title: "Sample Content 2",
        duration: "2 days 1 night",
        description: "This is the description of Sample Content 2.",
    },
    {
        id: 3,
        title: "Sample Content 3",
        duration: "4 days 3 nights",
        description: "This is the description of Sample Content 3.",
    },
    {
        id: 4,
        title: "Sample Content 4",
        duration: "5 days 4 nights",
        description: "This is the description of Sample Content 4.",
    },
    {
        id: 5,
        title: "Sample Content 5",
        duration: "2 days 1 night",
        description: "This is the description of Sample Content 5.",
    },
    {
        id: 6,
        title: "Sample Content 6",
        duration: "3 days 2 nights",
        description: "This is the description of Sample Content 6.",
    },
    {
        id: 7,
        title: "Sample Content 7",
        duration: "6 days 5 nights",
        description: "This is the description of Sample Content 7.",
    },
    {
        id: 8,
        title: "Sample Content 8",
        duration: "4 days 3 nights",
        description: "This is the description of Sample Content 8.",
    },
    {
        id: 9,
        title: "Sample Content 9",
        duration: "3 days 2 nights",
        description: "This is the description of Sample Content 9.",
    },
    {
        id: 10,
        title: "Sample Content 10",
        duration: "2 days 1 night",
        description: "This is the description of Sample Content 10.",
    },
];

export const contentState = atom({
    key: "contentState",
    default: defaultContents,
});
