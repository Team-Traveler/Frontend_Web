import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import profileTest from "../../assets/images/profileTest.png";

// user 관련 atoms
const { persistAtom } = recoilPersist();

export const userInfoState = atom({
    //유저 정보
    key: "userInfoState",
    default: {
        id: "",
        name: "",
        email: "",
        nickname: "",
        profileImage: "",
        isLogin: false,
        accessToken: "",
    },
    effects_UNSTABLE: [persistAtom],
});

