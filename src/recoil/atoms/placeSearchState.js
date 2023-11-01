import { atom } from 'recoil';

export const placeSearchState = atom({
    key: 'placeSearchState',
    default: null,  // 초기값은 null
});

export const searchSubmitState = atom({
    key: 'placeSearchState',
    default: null,  // 초기값은 null
});

export const fromPlaceSearchState = atom({
    key: 'fromPlaceSearchState',
    default: false,  // 초기값은 false
});

export const selectedTravelState = atom({
    key: 'selectedTravelState',
    default: false,  // 초기값은 false
});