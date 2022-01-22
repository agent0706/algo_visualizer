import {useEffect} from 'react';

const useSort = ({
    isSortRunning,
    intervalSpeed,
    dataSize,
    startSorting,
    clearSortInterval,
    stopSorting
}) => {
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
    }, [dataSize]);
};

export default useSort;