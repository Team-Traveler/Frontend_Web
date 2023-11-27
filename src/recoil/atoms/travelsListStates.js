import { atom} from 'recoil';

export const travelsState = atom({
  key : "travelsState",
  default : 
    {
        "title": "여수 투어",
        "destination": "여수",
        "start_date": "2023-08-18 09:00:00",
        "end_date": "2023-08-20 09:00:00",
        "created_at": "2023-08-17 01:07:27",
        "time_status": 1,
        "writeStatus": 0,
        "noteStatus": 0,
        "courses": [
            {
                "dcId": 41,
                "spot1": {
                    "title": "오동도 김밥",
                    "latitude": 38.35901,
                    "longitude": 37.9857,
                    "sid": 170
                },
                "spot2": null,
                "spot3": null,
                "spot4": null,
                "first": null,
                "second": null,
                "third": null,
                "numOfDay": 1
            }
        ],
        "tid": 1,
        "uid": 1,
        "isMy": false,
    }
});
