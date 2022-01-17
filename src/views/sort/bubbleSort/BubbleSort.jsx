import {useState, useEffect, useRef}  from 'react';
import {swap} from '../../../utils';
import {BarChart} from '../../../components';
import '../Sort.css';

const BubbleSort = (props) => {

    const [isSwapHappened, setIsSwapHappened] = useState(true);
    const position = useRef({i: 0, j: 1});
    const [intervalId, updateIntervalId] = useState(null);
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
        return !isSwapHappened;
    };

    const stopSorting = () => {
        updateIsSortRunning(false);
        position.current = {i: 0, j: 1};
        iterationCount.current = 0;
    };
    
    const updatePosition = (i, j) => {
        if (j === dataSize - 1) {
            if (shouldStopSorting()) {
                stopSorting();
                return;
            }
            position.current = {i: 0, j: 1};
            setIsSwapHappened(false);
            iterationCount.current += 1;
            return;
        }
        position.current = {i: i + 1, j: j + 1};
    };

    const performSortStep = () => {
        const {i, j} = position.current;
        if (data[i] > data[j]) {
            swap(data, i, j);
            setIsSwapHappened(true);
        }
        updateComparisonCount(comparisonCount => comparisonCount + 1);
        updatePosition(i, j);
    };

    useEffect(() => {
        if (isSortRunning) {
            const currentIntervalId = setInterval(performSortStep, intervalSpeed);
            updateIntervalId(currentIntervalId);
            return () => clearInterval(currentIntervalId);
        } else {
            clearInterval(intervalId);
        }
    }, [isSortRunning, intervalSpeed]);

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