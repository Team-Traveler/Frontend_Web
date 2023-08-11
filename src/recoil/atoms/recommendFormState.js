import { atom } from "recoil";
// user 관련 atoms

export const recommendFormState = atom({
    // 여행 찾기 입력폼 데이터
    key: "recommendFormState",
    default: {
        startDate: "",
        finishDate: "",
        cityId: "",
        hard: "",
        what: "",
        with: "",
        people: 1,
    },
});
