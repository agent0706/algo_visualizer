import {useState, useEffect, useRef} from 'react';
import {swap} from '../../../utils';
import {BarChart} from '../../../components';
import '../Sort.css';
import '../../../App.css';

const InsertionSort = (props) => {
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
        if (i >= 0 && j >= 0) {
            swap(data, i, j);
            updateCurrentPosition({i: i - 1, j: j - 1});
        } else {
            iterationCount.current += 1;
            updateCurrentPosition({i: iterationCount.current, j: iterationCount.current + 1});
        }
    };

    const performSortStep = () => {
        if (shouldStopSorting()) {
            stopSorting();
            return;
        }
        const {i, j} = currentPosition;
        if (data[j] < data[i]) {
            updatePosition(j - 1, j);
        }
        else {
            iterationCount.current += 1;
            updateCurrentPosition({i: iterationCount.current, j: iterationCount.current + 1});
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

export default InsertionSort;