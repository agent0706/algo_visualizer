import {useRef} from 'react';
import useSorting from '../useSorting';
import {swap} from '../../../utils';
import {BarChart} from '../../../components';
import '../Sort.css';
import '../../../App.css';

const InsertionSort = (props) => {
    const iterationCount = useRef(0);
    const position = useRef({i: 0, j: 1});

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
        position.current = {i: 0, j: 1};
        iterationCount.current = 0;
    };

    const updatePosition = (i, j) => {
        if (i >= 0 && j >= 0) {
            swap(data, i, j);
            position.current = {i: i - 1, j: j - 1};
        } else {
            iterationCount.current += 1;
            position.current = {i: iterationCount.current, j: iterationCount.current + 1};
        }
    };

    const performSortStep = () => {
        if (shouldStopSorting()) {
            stopSorting();
            return;
        }
        const {i, j} = position.current;
        if (data[j] < data[i]) {
            updatePosition(j - 1, j);
        }
        else {
            iterationCount.current += 1;
            position.current = {i: iterationCount.current, j: iterationCount.current + 1};
        }
        updateComparisonCount(comparisonCount => comparisonCount + 1);
    };

    useSorting({
        isSortRunning,
        intervalSpeed,
        dataSize,
        stopSorting,
        performSortStep
    });

    const getIndicesToHighlight = () => {
        if (isSortRunning) {
            const {i, j} = position.current;
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