import { atom, selector } from "recoil";

// 여행 목록 상태를 정의합니다.
export const travelsreviewState = atom({
  key: "travelsreviwState",
  default: [
    {
      "tid": 1,
      "title": "강릉 3박4일",
      "hashtags": ["tag1", "tag2"],
      "oneLineReview": "A review",
      "location": "Some location",
      "what": 1,
      "hard": 2,
      "withwho": 3,
      "whatrating": 4.5,
      "hardrating": 3.0,
      "totalrating": 3.8,
      "goodPoints": "Good points",
      "badPoints": "Bad points",
      "imgUrl": require("../../assets/images/sea.jpg") //public이 아닌 src에 이미지를 저장한 경우 require을 사용해야함
    },
    {
      "tid": 2,
      "title": "강릉 2박3일",
      "hashtags": ["tag1", "tag2"],
      "oneLineReview": "A review",
      "location": "Some location",
      "what": 1,
      "hard": 2,
      "withwho": 3,
      "whatrating": 4.5,
      "hardrating": 3.0,
      "totalrating": 2.8,
      "goodPoints": "Good points",
      "badPoints": "Bad points",
      "imgUrl": require("../../assets/images/sea.jpg") 
    },
  
    {
      "tid": 3,
      "title": "강릉 1박2일",
      "hashtags": ["tag1", "tag2"],
      "oneLineReview": "A review",
      "location": "Some location",
      "what": 1,
      "hard": 2,
      "withwho": 3,
      "whatrating": 4.5,
      "hardrating": 3.0,
      "totalrating": 1.8,
      "goodPoints": "Good points",
      "badPoints": "Bad points",
      "imgUrl": require("../../assets/images/sea.jpg") 
    },
    {
      "tid": 4,
      "title": "부산 3박4일",
      "hashtags": ["tag1", "tag2"],
      "oneLineReview": "A review",
      "location": "Some location",
      "what": 1,
      "hard": 2,
      "withwho": 3,
      "whatrating": 4.5,
      "hardrating": 3.0,
      "totalrating": 0.8,
      "goodPoints": "Good points",
      "badPoints": "Bad points",
      "imgUrl": require("../../assets/images/sea.jpg") 
  },  
  ],
});

export const travelsSelector = selector({
  key: "travelsSelector",
  get: ({ get }) => {
    return get(travelsreviewState);
  },
  set: ({ set }, newTravel) => {
    set(travelsreviewState, (oldTravels) => [...oldTravels, newTravel]);
  },
});

export const travelByIdSelector = (travelId) =>
  selector({
    key: `travelByIdSelector_${travelId}`,
    get: ({ get }) => {
      const travels = get(travelsreviewState);
      return travels.find((travel) => travel.id === travelId) || null;
    },
  });


