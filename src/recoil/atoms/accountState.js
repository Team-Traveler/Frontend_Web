import { atom } from "recoil";

export const accountState = atom({
    // 가계부 정보
    key: "accountState",
    default: [
        { // list
            "transactionDetail": null,
            "expense": 33333.0,
            "accountId": 21,
            "budget": 100000.0,
            "transactions": [],
            "date": "2023-12-21",
            "dateStr": "2023-12-21",
            "tid": 9
        },
        { // list
            "transactionDetail": null,
            "expense": 34133.0,
            "accountId": 2,
            "budget": 100000.0,
            "transactions": [ //e
                {
                    "transactionId": 3,
                    "expenseCategory": "식사",
                    "expenseDetail": "저녁",
                    "amount": 8000.0
                },
                {
                    "transactionId": 37,
                    "expenseCategory": "관광비",
                    "expenseDetail": "유4",
                    "amount": 33333.0
                }
            ],
            "date": "2023-12-22",
            "dateStr": "2023-12-22",
            "tid": 9
        },
        {
            "transactionDetail": null,
            "expense": 33333.0,
            "accountId": 22,
            "budget": 100000.0,
            "transactions": [
                {
                    "transactionId": 38,
                    "expenseCategory": "관광비",
                    "expenseDetail": "유4",
                    "amount": 33333.0
                }
            ],
            "date": "2023-12-23",
            "dateStr": "2023-12-23",
            "tid": 9
        },
        {
            "transactionDetail": null,
            "expense": 33333.0,
            "accountId": 23,
            "budget": 100000.0,
            "transactions": [
                {
                    "transactionId": 39,
                    "expenseCategory": "관광비",
                    "expenseDetail": "유4",
                    "amount": 33333.0
                }
            ],
            "date": "2023-12-24",
            "dateStr": "2023-12-24",
            "tid": 9
        },
        {
            "transactionDetail": null,
            "expense": 0.0,
            "accountId": null,
            "budget": 0.0,
            "transactions": null,
            "date": "2023-12-24T20:37:10.101+00:00",
            "dateStr": "2023-12-25",
            "tid": null
        },
        {
            "transactionDetail": null,
            "expense": 0.0,
            "accountId": null,
            "budget": 0.0,
            "transactions": null,
            "date": "2023-12-25T20:37:10.101+00:00",
            "dateStr": "2023-12-26",
            "tid": null
        }
    ],
});
