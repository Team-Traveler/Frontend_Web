import {
    atom,
    selector,
    selectorFamily,
    useRecoilState,
    useRecoilValue,
} from "recoil";

// Atom: 여행 데이터를 저장할 atom
export const myAllTravelsState = atom({
    key: "myAllTravelsState",
    default: [],
});

export const addNewTravel = selector({
    key: "addNewTravel",
    get: ({ get }) => {
        return get(myAllTravelsState); // 기존의 여행 데이터를 반환
    },
    set: ({ set }, travelInfo) => {
        set(myAllTravelsState, (prevTravels) => [...prevTravels, travelInfo]);
    },
});

export const travelCoursesByTidSelector = selectorFamily({
    key: "travelCoursesByTidSelector",
    get:
        (tid) =>
        ({ get }) => {
            const travels = get(myAllTravelsState);
            const selectedTravel = travels.find((travel) => travel.tid === tid);
            return selectedTravel ? selectedTravel.courses : null;
        },
});

export const updateTravelById = selectorFamily({
    key: "updateTravelById",
    get:
        (tid) =>
        ({ get }) => {
            const travels = get(myAllTravelsState);
            return travels.find((travel) => travel.id === tid) || null;
        },
    set:
        (tid) =>
        ({ set, get }, newTravelInfo) => {
            set(myAllTravelsState, (prevTravels) => {
                return prevTravels.map((travel) => {
                    if (travel.id === tid) {
                        // Update the travel info
                        return { ...travel, ...newTravelInfo };
                    }
                    return travel;
                });
            });
        },
});

// Selector: 각각의 항목에 접근
export const travelTitleSelector = selector({
    key: "travelTitleSelector",
    get: ({ get }) => {
        const travelData = get(myAllTravelsState);
        return travelData?.title || null;
    },
});

export const travelDestinationSelector = selector({
    key: "travelDestinationSelector",
    get: ({ get }) => {
        const travelData = get(myAllTravelsState);
        return travelData?.destination || null;
    },
});

export const travelStartDateSelector = selector({
    key: "travelStartDateSelector",
    get: ({ get }) => {
        const travelData = get(myAllTravelsState);
        return travelData?.start_date || null;
    },
});

export const travelEndDateSelector = selector({
    key: "travelEndDateSelector",
    get: ({ get }) => {
        const travelData = get(myAllTravelsState);
        return travelData?.end_date || null;
    },
});

export const travelCreatedAtSelector = selector({
    key: "travelCreatedAtSelector",
    get: ({ get }) => {
        const travelData = get(myAllTravelsState);
        return travelData?.created_at || null;
    },
});

export const travelTimeStatusSelector = selector({
    key: "travelTimeStatusSelector",
    get: ({ get }) => {
        const travelData = get(myAllTravelsState);
        return travelData?.time_status || null;
    },
});

export const travelWriteStatusSelector = selector({
    key: "travelWriteStatusSelector",
    get: ({ get }) => {
        const travelData = get(myAllTravelsState);
        return travelData?.writeStatus || null;
    },
});

export const travelNoteStatusSelector = selector({
    key: "travelNoteStatusSelector",
    get: ({ get }) => {
        const travelData = get(myAllTravelsState);
        return travelData?.noteStatus || null;
    },
});

export const travelCoursesSelector = selector({
    key: "travelCoursesSelector",
    get: ({ get }) => {
        const travelData = get(myAllTravelsState);
        return travelData?.courses || null;
    },
});

export const travelTidSelector = selector({
    key: "travelTidSelector",
    get: ({ get }) => {
        const travelData = get(myAllTravelsState);
        return travelData?.tid || null;
    },
});

export const travelUidSelector = selector({
    key: "travelUidSelector",
    get: ({ get }) => {
        const travelData = get(myAllTravelsState);
        return travelData?.uid || null;
    },
});

export const deleteTravelById = selectorFamily({
    key: "deleteTravelById",
    get:
        (tid) =>
        ({ get }) => {
            const travelList = get(myAllTravelsState);
            return travelList.filter((travel) => travel.tid !== tid);
        },
    set:
        (tid) =>
        ({ set }) => {
            set(myAllTravelsState, (travelList) => {
                return travelList.filter((travel) => travel.tid !== tid);
            });
        },
});

export const isTravelDataCreatedState = atom({
    key: "isTravelDataCreatedState",
    default: false, // 기본값
});

export const toggleIsTravelDataCreated = selector({
    key: "toggleIsTravelDataCreated",
    get: ({ get }) => {
        const isCreated = get(isTravelDataCreatedState);
        return isCreated;
    },
    set: ({ set }) => {
        const isCreated = set(isTravelDataCreatedState, (prev) => !prev);
        return isCreated;
    },
});
