import {useState, useEffect, useRef}  from 'react';
import {swap} from '../../../utils';
import {BarChart} from '../../../components';
import '../Sort.css';
import '../../../App.css';

const SelectionSort = (props) => {

    const iterationCount = useRef(0);
    const [currentPosition, updateCurrentPosition] = useState({i: 0, j: 1});

    const {
        data,
        updateIsSortRunning,
        dataSize,
        updateComparisonCount,
        isSortRunning,
        intervalSpeed
    } = props;

    const shouldStopSorting = () => {
        return iterationCount.current >= dataSize;
    };

    const stopSorting = () => {
        updateIsSortRunning(false);
        updateCurrentPosition({i: 0, j: 1});
        iterationCount.current = 0;
    };

    const updatePosition = (i, j) => {
        if (j >= dataSize) {
            swap(data, i, iterationCount.current);
            iterationCount.current += 1;
            updateCurrentPosition({i: iterationCount.current, j: iterationCount.current + 1});
        } else {
            updateCurrentPosition({i, j});
        }
    };

    const performSortStep = () => {
        if (shouldStopSorting()) {
            stopSorting();
            return;
        }
        const {i, j} = currentPosition;
        if (data[j] < data[i]) {
            updatePosition(j, j + 1);
        } else {
            updatePosition(i, j + 1);
        }
        updateComparisonCount(comparisonCount => comparisonCount + 1);
    };

    useEffect(() => {
        if (isSortRunning) {
            setTimeout(performSortStep, intervalSpeed);
        }
    }, [currentPosition, isSortRunning]);

    const getIndicesToHighlight = () => {
        if (isSortRunning) {
            const {i, j} = currentPosition;
            return [i, j];
        }
        return [];
    };

    return (
        <div className="bar_chart">
            <BarChart data={data} indicesToHighlight={getIndicesToHighlight()}/>
        </div>
    );
};

export default SelectionSort;