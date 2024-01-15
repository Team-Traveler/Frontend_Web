import { atom } from "recoil";

// 여행 만들기 - 여행지 선택에 임시 저장 상태값

export const createPlaceState = atom({
    key: "createPlaceState",
    default: {
        title: null,
        destination: null,
        start_date: null,
        end_date: null,
        created_at: null,
        time_status: null,
        writeStatus: null,
        noteStatus: null,
        nunOfCourse: 0,
        courses: [
            {
                dcId: -1,
                first: null,
                numOfDay: 1,
                second: null,
                third: null,
                spot1: {
                    latitude: null,
                    longitude: null,
                    sid: null,
                    title: null,
                },
                spot2: {
                    latitude: null,
                    longitude: null,
                    sid: null,
                    title: null,
                },
                spot3: {
                    latitude: null,
                    longitude: null,
                    sid: null,
                    title: null,
                },
                spot4: {
                    latitude: null,
                    longitude: null,
                    sid: null,
                    title: null,
                },
            },
        ],
        tid: null,
        uid: null,
    },
});
