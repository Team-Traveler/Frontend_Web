import { atom } from "recoil";
// user 관련 atoms

export const userInfoState = atom({
    // 유저 정보
    key: "userInfoState",
    default: {
        id: "tlsdmsgp33",
        name: "신은혜",
        email: "tlsdmsgp33@naver.com",
        nickname: "Elmo",
        profileImage: "",
        isLogin: true,
        accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNjg5Njk1NTE0fQ.mXTd2f1NwwTKygOxknRJTp-NnAinpE_w1IHAnGTDya-aWQuQDXT_E0a8i1NP4Qd8vRrkmdD9Nie41Mx4ruLb1w",
    },
});
