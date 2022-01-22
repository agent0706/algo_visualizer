import {useEffect, useRef} from 'react';

const useSorting = ({
    isSortRunning,
    intervalSpeed,
    dataSize,
    stopSorting,
    performSortStep
}) => {
    const intervalId = useRef(null);

    const startSorting = () => {
        intervalId.current = setInterval(performSortStep, intervalSpeed);
    };

    const clearSortInterval = () => {
        clearInterval(intervalId.current);
    };

    useEffect(() => {
        if (isSortRunning) {
            clearSortInterval()
            startSorting();
        } else {
            clearSortInterval();
        }
        return clearSortInterval;
    }, [isSortRunning, intervalSpeed]);

    useEffect(() => {
        stopSorting();
        clearSortInterval();
    }, [dataSize]);
};

export default useSorting;