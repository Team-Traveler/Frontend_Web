import { atom, selector } from "recoil";
import image1 from "../../pages/communityPage/images/1.jpg";
import image2 from "../../pages/communityPage/images/2.jpg";
import image3 from "../../pages/communityPage/images/3.jpg";
import image4 from "../../pages/communityPage/images/4.jpg";


export const travelsreviewState = atom({
  key: "travelsreviwState",
  default: [
    {
      "tid": 1,
      "title": "부산 여행 1박 2일",
      "hashtags": ["부산", "바다"],
      "oneLineReview": "부산에서 시원한 바다를 즐겼어요!",
      "location": "부산",
      "what": 3,
      "hard": 3,
      "withwho": 2,
      "whatrating": 4,
      "hardrating": 3,
      "totalrating": 3,
      "goodPoints": "바다 물놀이, 해산물 먹거리",
      "badPoints": "교통 혼잡",
      "imgurl":"./images/1.jpg"
    },
      {
        "tid": 2,
        "title": "서울 여행 2박3일",
        "hashtags": ["서울", "여행"],
        "oneLineReview": "서울에서 즐거운 여행을 했어요!",
        "location": "서울",
        "what": 4,
        "hard": 2,
        "withwho": 3,
        "whatrating": 4,
        "hardrating": 3,
        "totalrating": 4,
        "goodPoints": "맛집 다양함, 쇼핑하기 좋은 장소",
        "badPoints": "교통 혼잡",
        "imgurl": "./images/2.jpg"
      },
      {
        "tid": 3,
        "title": "제주도 휴가 5일",
        "hashtags": ["제주도", "휴가"],
        "oneLineReview": "제주도에서 여유로운 휴식을 즐겼어요!",
        "location": "제주도",
        "what": 5,
        "hard": 1,
        "withwho": 4,
        "whatrating": 4,
        "hardrating": 2,
        "totalrating": 4,
        "goodPoints": "자연 경치 아름다움, 조용한 분위기",
        "badPoints": "놀이시설 부족",
        "imgurl": "./images/3.jpg"
      },

      {
        "tid": 4,
        "title": "경주 역사 탐방 2박",
        "hashtags": ["경주", "역사"],
        "oneLineReview": "경주에서 고대 유적을 탐방했어요!",
        "location": "경주",
        "what": 2,
        "hard": 4,
        "withwho": 1,
        "whatrating": 4.0,
        "hardrating": 4.2,
        "totalrating": 4.1,
        "goodPoints": "유적 관광, 전통 문화 체험",
        "badPoints": "식당 가격 비쌈",
        "imgurl": "./images/4.jpg"
      }
    
    
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


