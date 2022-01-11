import {useState, useEffect, useRef}  from 'react';
import {swap} from '../../../utils';
import {BarChart} from '../../../components';
import '../Sort.css';

const BubbleSort = (props) => {

    const [isSwapHappened, setIsSwapHappened] = useState(true);
    const [currentPosition, updateCurrentPosition] = useState({i: 0, j: 1});
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
        updateCurrentPosition({i: 0, j: 1});
        iterationCount.current = 0;
    };
    
    const updatePosition = (i, j) => {
        if (j === dataSize - 1) {
            if (shouldStopSorting()) {
                stopSorting();
                return;
            }
            updateCurrentPosition({i: 0, j: 1});
            setIsSwapHappened(false);
            iterationCount.current += 1;
            return;
        }
        updateCurrentPosition({i: i + 1, j: j + 1});
    };

    const performSortStep = () => {
        const {i, j} = currentPosition;
        if (data[i] > data[j]) {
            swap(data, i, j);
            setIsSwapHappened(true);
        }
        updateComparisonCount(comparisonCount => comparisonCount + 1);
        updatePosition(i, j);
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

export default BubbleSort;