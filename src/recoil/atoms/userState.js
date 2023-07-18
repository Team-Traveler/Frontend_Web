import { atom } from "recoil";
// user 관련 atoms

export const userInfoState = atom({
    // 유저 정보
    key: "userInfoState",
    default: {
        id: "",
        name: "",
        email: "",
        profileImage: "",
        isLogin: false,
    },
});
