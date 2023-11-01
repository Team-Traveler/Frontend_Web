import { atom } from "recoil";
// user 관련 atoms

export const userInfoState = atom({
    // 유저 정보
    key: "userInfoState",
    default: {
        id: "",
        name: "",
        email: "bangtan77147@naver.com",
        nickname: "닉네임",
        profileImage: "http://k.kakaocdn.net/dn/b52xWg/btsrdj8ei3L/jceyTdV8KjorKufktSxTFk/img_640x640.jpg",
        isLogin: true,
        accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNjg5Njk1NTE0fQ.mXTd2f1NwwTKygOxknRJTp-NnAinpE_w1IHAnGTDya-aWQuQDXT_E0a8i1NP4Qd8vRrkmdD9Nie41Mx4ruLb1w",
    },
});
