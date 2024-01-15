import { atom } from "recoil";
import profileTest from "../../assets/images/profileTest.png";
// user 관련 atoms

export const userInfoState = atom({
    //유저 정보
    key: "userInfoState",
    default: {
        id: "",
        name: "라이언",
        email: "OOOOOOOOO@naver.com",
        nickname: "",
        profileImage: profileTest,
        isLogin: false,
        accessToken: "",
    },
});

