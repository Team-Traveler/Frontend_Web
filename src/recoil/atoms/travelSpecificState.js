import { atom, selector } from 'recoil';

export const travelSpecificState = atom({
    key: 'travelSpecificState',
    default: null,
});


export const setTravelSpecificStateSelector = selector({
    key: 'setTravelSpecificStateSelector',
    get: ({ get }) => {
        return get(travelSpecificState);
    },
    set: ({ set }, newValue) => {
        set(travelSpecificState, newValue);
    },
});


// 1) courses 배열의 dcId로 검색하여 해당하는 인덱스의 요소들을 얻는 selector
export const getCourseByDcIdSelector = selector({
    key: 'getCourseByDcIdSelector',
    get: ({ get }) => {
        const travelData = get(travelSpecificState);
        return (dcId) => {
            return travelData?.courses.find(course => course.dcId === dcId) || null;
        };
    },
});

// 2) courses 배열의 dcId로 검색하여 해당하는 인덱스의 요소들을 수정하는 selector
export const setCourseByDcIdSelector = selector({
    key: 'setCourseByDcIdSelector',
    get: ({ get }) => {
        const travelData = get(travelSpecificState);
        return travelData; // Just return the current travelData in the get function
    },
    set: ({ set }, newValue) => {
        const { dcId, updatedCourse } = newValue; // newValue should have dcId and updatedCourse

        set(travelSpecificState, (prevState) => {
            const courses = prevState.courses.map(course => {
                if (course.dcId === dcId) {
                    return updatedCourse; // Return updated course when dcId matches
                }
                return course;
            });

            return {
                ...prevState,
                courses,
            };
        });
    },
});

// selectedTID를 저장하는 atom
export const selectedTIDState = atom({
    key: 'selectedTIDState',
    default: null,
});

// selectedTID 값을 가져오는 selector
export const getSelectedTIDSelector = selector({
    key: 'getSelectedTIDSelector',
    get: ({ get }) => {
        return get(selectedTIDState);
    },
});

// selectedTID 값을 설정하는 selector
export const setSelectedTIDSelector = selector({
    key: 'setSelectedTIDSelector',
    get: ({ get }) => {
        return get(selectedTIDState);  // 현재의 selectedTID 값을 반환합니다.
    },
    set: ({ set }, newValue) => {
        set(selectedTIDState, newValue); // 전달된 newValue로 selectedTIDState 값을 갱신합니다.
    },
});