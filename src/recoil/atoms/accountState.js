import { atom } from "recoil";

export const accountState = atom({
    // 가계부 정보
    key: "accountState",
    default: [
        {
            tId: 7902,
            daily: [
                {
                    dateId: 1,
                    date: "31 화",
                    content: [
                        {
                            id: 1,
                            category: "교통비",
                            title: "지하철",
                            price: 2300,
                        },
                        {
                            id: 2,
                            category: "식비",
                            title: "저녁",
                            price: 7000,
                        },
                        {
                            id: 3,
                            category: "관광",
                            title: "맛사지",
                            price: 10000,
                        },
                        {
                            id: 4,
                            category: "식비",
                            title: "점심",
                            price: 9000,
                        },
                    ],
                },
                {
                    dateId: 2,
                    date: "30 월",
                    content: [
                        {
                            id: 1,
                            category: "식비",
                            title: "점심",
                            price: 9500,
                        },
                        {
                            id: 2,
                            category: "쇼핑",
                            title: "기념품",
                            price: 20000,
                        },
                        {
                            id: 3,
                            category: "기타",
                            title: "운세보기",
                            price: 5000,
                        },
                    ],
                },
                {
                    dateId: 3,
                    date: "29 일",
                    content: [
                        {
                            id: 1,
                            category: "식비",
                            title: "저녁",
                            price: 12000,
                        },
                    ],
                },
            ],
        },
        {
            tId: 2,
            daily: [
                {
                    dateId: 1,
                    date: "31 화",
                    content: [
                        {
                            id: 1,
                            category: "교통비",
                            title: "지하철",
                            price: 1000,
                        },
                    ],
                },
            ],
        },
    ],
});
