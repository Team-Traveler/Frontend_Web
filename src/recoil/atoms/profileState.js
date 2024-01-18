import { atom } from "recoil";
import profileTest from "../../assets/images/profileTest.png";

export const profileState = atom({
    key: "profileState",
    default: {
        imgSrc: profileTest,
        name: "라이언",
        numTravel: 8,
        numLiked: 20,
        date: "2023.08.23",
        email: "OOOOOOOOO@naver.com",
    },
});
