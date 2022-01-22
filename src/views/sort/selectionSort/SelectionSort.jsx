import {useRef}  from 'react';
import useSorting from '../useSorting';
import {swap} from '../../../utils';
import {BarChart} from '../../../components';
import '../Sort.css';
import '../../../App.css';

const SelectionSort = (props) => {

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
        if (j >= dataSize) {
            swap(data, i, iterationCount.current);
            iterationCount.current += 1;
            position.current = {i: iterationCount.current, j: iterationCount.current + 1};
        } else {
            position.current = {i, j};
        }
    };

    const performSortStep = () => {
        if (shouldStopSorting()) {
            stopSorting();
            return;
        }
        const {i, j} = position.current;
        if (data[j] < data[i]) {
            updatePosition(j, j + 1);
        } else {
            updatePosition(i, j + 1);
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

export default SelectionSort;