import { atom, selector } from 'recoil';

export const placeState = atom({
    key: 'placeState',
    default: [],
});


export const setPlaceStateSelector = selector({
    key: 'setPlaceStateSelector',
    get: ({ get }) => {
        return get(placeState);
    },
    set: ({ set }, newValue) => {
        set(placeState, newValue);
    },
});