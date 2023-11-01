import { atom, selector } from "recoil";

// 여행 목록 상태를 정의합니다.
export const travelsreviewState = atom({
  key: "travelsreviwState",
  default: [
    {
      "tid": 1,
      "hashtags": ["tag1", "tag2"],
      "created_at":"2023-09-21",
      "title": "속초 찐 주민이 추천하는 감성 충만 여행 코스",
      "oneLineReview" : "너무 재밌어요.",
      "location": "속초",
      "period" : "4박 5일",
      "stardate" : "2023-08-23",
      "enddate" : "2023-08-28",
      "what": "먹방",
      "hard": "보통",
      "withwho": "친구",
      "hardrating": 4,
      "whatrating": 4,
      "totalrating": 4,
      "goodPoints" : "건물과 풍경이 예쁘고 공기가 너무 좋아요",
      "badPoints" : "교통이 좀 불편해요 ㅠㅠ",
      "likes":5,
       //public이 아닌 src에 이미지를 저장한 경우 require을 사용해야함
      "imgUrl": [require("../../assets/images/sea.jpg")],
      "comments":[
        {
          "userId": "tlsdmsgp33",
          "comment":"너무 좋아요"
        },
        {
          "userId":"syh7110",
          "comment":"별로에요"
        }
      ],
      "user": {
        "id": 2,
        "name": null,
        "email": "pos06058@naver.com",
        "nickname": "",
        "kakao": 2885231465,
        "profile_image_url": "https://umc-traveler.s3.ap-northeast-2.amazonaws.com/da3b3fdf-35e1-48f5-909d-a3688f617db9_%ED%8C%9D%EC%95%84%ED%8A%B8.png"
    }
    },
    {
      "tid": 2,
      "hashtags": ["tag1", "tag2"],
      "created_at":"2023-09-20",
      "title": "속초 찐 주민이 추천하는 감성 충만 여행 코스",
      "oneLineReview" : "너무 재밌어요.",
      "location": "속초",
      "period" : "3박 4일",
      "stardate" : "2023-08-23",
      "enddate" : "2023-08-28",
      "what": "체험",
      "hard": "바쁘게",
      "withwho": "가족",
      "hardrating": 4,
      "whatrating": 4,
      "totalrating": 4,
      "goodPoints" : "건물과 풍경이 예쁘고 공기가 너무 좋아요",
      "badPoints" : "교통이 좀 불편해요 ㅠㅠ",
      "likes":4,
      "imgUrl": [require("../../assets/images/sea.jpg")],
      "comments":[
        {
          "userId": "tlsdmsgp33",
          "comment":"너무 좋아요"
        },
        {
          "userId":"syh7110",
          "comment":"별로에요"
        }
      ],
      "user": {
        "id": 2,
        "name": null,
        "email": "pos06058@naver.com",
        "nickname": "",
        "kakao": 2885231465,
        "profile_image_url": "https://umc-traveler.s3.ap-northeast-2.amazonaws.com/da3b3fdf-35e1-48f5-909d-a3688f617db9_%ED%8C%9D%EC%95%84%ED%8A%B8.png"
    }
    },
  
    {
      "tid": 3,
      "hashtags": ["tag1", "tag2"],
      "created_at":"2023-09-19",
      "title": "속초 찐 주민이 추천하는 감성 충만 여행 코스",
      "oneLineReview" : "너무 재밌어요.",
      "location": "속초",
      "period" : "2박 3일",
      "stardate" : "2023-08-23",
      "enddate" : "2023-08-28",
      "what": "먹방",
      "hard": "보통",
      "withwho": "친구",
      "hardrating": 4,
      "whatrating": 4,
      "totalrating": 4,
      "goodPoints" : "건물과 풍경이 예쁘고 공기가 너무 좋아요",
      "badPoints" : "교통이 좀 불편해요 ㅠㅠ",
      "likes":3,
      "imgUrl": [require("../../assets/images/sea.jpg")],
      "comments":[
        {
          "userId": "tlsdmsgp33",
          "comment":"너무 좋아요"
        },
        {
          "userId":"syh7110",
          "comment":"별로에요"
        }
      ],
      "user": {
        "id": 2,
        "name": null,
        "email": "pos06058@naver.com",
        "nickname": "",
        "kakao": 2885231465,
        "profile_image_url": "https://umc-traveler.s3.ap-northeast-2.amazonaws.com/da3b3fdf-35e1-48f5-909d-a3688f617db9_%ED%8C%9D%EC%95%84%ED%8A%B8.png"
    }
    },
    {
      "tid": 4,
      "hashtags": ["tag1", "tag2"],
      "created_at":"2023-09-18",
      "title": "해운대 앞바다 신나는 여행",
      "oneLineReview" : "너무 재밌어요.",
      "location": "부산",
      "period" : "1박 2일",
      "stardate" : "2023-08-23",
      "enddate" : "2023-08-28",
      "what": "먹방",
      "hard": "보통",
      "withwho": "친구",
      "hardrating": 4,
      "whatrating": 4,
      "totalrating": 4,
      "goodPoints" : "건물과 풍경이 예쁘고 공기가 너무 좋아요",
      "badPoints" : "교통이 좀 불편해요 ㅠㅠ",
      "likes":2,
      "imgUrl": [require("../../assets/images/sea.jpg")],
      "comments":[
        {
          "userId": "tlsdmsgp33",
          "comment":"너무 좋아요"
        },
        {
          "userId":"syh7110",
          "comment":"별로에요"
        }
      ],
      "user": {
        "id": 2,
        "name": null,
        "email": "pos06058@naver.com",
        "nickname": "",
        "kakao": 2885231465,
        "profile_image_url": "https://umc-traveler.s3.ap-northeast-2.amazonaws.com/da3b3fdf-35e1-48f5-909d-a3688f617db9_%ED%8C%9D%EC%95%84%ED%8A%B8.png"
    }
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


