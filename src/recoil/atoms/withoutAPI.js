import { atom, selector,selectorFamily, useRecoilState, useRecoilValue } from 'recoil';

// Atom: local에서만 동작
export const withoutApiState = atom({
    key: 'withoutApiState',
    default: true,
});

// Atom: 여행 전체 데이터 저장
export const withoutAllTravelsState = atom({
    key: 'withoutAllTravelsState',
    default: null,
});

// Atom: 여행 전체 데이터 저장
export const withoutProfileState = atom({
    key: 'withoutProfileState',
    default: {
        num : 0,
    },
});

// import { withoutAllTravelsState,
//     withoutApiState,
//     withoutProfileState,
//     }from "../../../recoil/atoms/withoutAPI";


// const [isWithoutApi,setIsWithoutApi] = useRecoilState(withoutApiState);
// const [withoutAllTravel,setWithoutAllTravel] = useRecoilState(withoutAllTravelsState);
// const [withoutProfile, setWithoutProfile] = useRecoilState(withoutProfileState);
