import {useRef}  from 'react';
import useSorting from '../useSorting';
import {swap} from '../../../utils';
import {BarChart} from '../../../components';
import '../Sort.css';

const BubbleSort = (props) => {

    const isSwapHappened = useRef(true);
    const position = useRef({i: 0, j: 1});
    const iterationCount = useRef(0);

    const {
        data,
        updateIsSortRunning,
        dataSize,
        updateComparisonCount,
        isSortRunning,
        intervalSpeed
    } = props;

    const shouldStopSorting = () => {
        return !isSwapHappened.current;
    };

    const stopSorting = () => {
        updateIsSortRunning(false);
        isSwapHappened.current = false;
        position.current = {i: 0, j: 1};
        iterationCount.current = 0;
    };
    
    const updatePosition = (i, j) => {
        if (j >= dataSize - 1 - iterationCount.current) {
            if (shouldStopSorting()) {
                stopSorting();
                return;
            }
            position.current = {i: 0, j: 1};
            isSwapHappened.current = false;
            iterationCount.current += 1;
            return;
        }
        position.current = {i: i + 1, j: j + 1};
    };

    const performSortStep = () => {
        const {i, j} = position.current;
        if (data[i] > data[j]) {
            swap(data, i, j);
            isSwapHappened.current = true;
        }
        updatePosition(i, j);
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

export default BubbleSort;