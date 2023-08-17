import { atom, selector } from 'recoil';

export const travelsState = atom({
  key: 'travelsState',
  default: [
    {
        id: 1,
        name: "null",
        category: "null",
        duration: "null",
        start: "null",
        end: "null",
        write_status : 0,

        dcId: 1,
        spot1: '호텔',
        spot2: '롯폰기 힐스',
        spot3: "롯폰기 케야키자카",
        spot4: '공원',
        first: 30000,
        second: 1000,
        third: 500,
        spot1_lat: 37.715133,
        spot1_lon:  126.734086,
        spot2_lat: 38.715133,
        spot2_lon:  127.734086,
        spot3_lat: 39.715133,
        spot3_lon:  128.734086,
        numOfDay: 3,
        tid: 1,

      }
  ],
});

export const modifyTravels = selector({
  key: 'modifyTravels',
  get: ({ get }) => {
    return get(travelsState);
  },
  set: ({ set }, action) => {
    const currentList = set(travelsState);
    switch (action.type) {
      case 'ADD':
        return [...currentList, action.payload];
      case 'DELETE':
        return currentList.filter(travel => travel.tid !== action.payload.tid);
      default:
        return currentList;
    }
  },
});

export const findTravelById = selector({
    key: 'findTravelById',
    get: ({ get }) => (id) => {
      const travelList = get(travelsState);
      return travelList.find(travel => travel.id === id);
    },
  });