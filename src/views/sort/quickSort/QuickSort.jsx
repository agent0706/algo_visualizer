import {useEffect, useRef}  from 'react';
import useSorting from '../useSorting';
import {swap, Stack} from '../../../utils';
import {BarChart} from '../../../components';
import '../Sort.css';
import '../../../App.css';

const QuickSort = (props) => {
    const position = useRef({i: 0, j: 0});
    const stackFrame = useRef(null);
    const recusrionStack = useRef(null);

    const {
        data,
        updateIsSortRunning,
        dataSize,
        updateComparisonCount,
        isSortRunning,
        intervalSpeed
    } = props;

    const pushRecusrionStackFrame = (start, end) => {
        recusrionStack.current.push({
            pivotIndex: end,
            arrayBounds: [start, end]
        });
    };

    //initialising the recursion stack and resetting it when there is a change in datasize
    useEffect(() => {
        if (!recusrionStack.current?.peek()) {
            recusrionStack.current = new Stack();
            pushRecusrionStackFrame(0, dataSize - 1);
            stackFrame.current = recusrionStack.current.pop();
        }
    }, [dataSize, isSortRunning]);

    const stopSorting = () => {
        updateIsSortRunning(false);
        position.current = {i: 0, j: 0};
        recusrionStack.current = null;
        stackFrame.current = null;
    };

    const getCurrentArrayBounds = () => {
        return stackFrame.current?.arrayBounds || [0, 0];
    };

    const performPartitionStep = (start, end) => {
        let {i, j} = position.current;
        const pivot = stackFrame.current.pivotIndex;
        if (data[j] < data[pivot]) {
            swap(data, i, j);
            i++;j++;
        } else {
            j++;
        }
        position.current = {i, j};
        if (j >= pivot) {
            swap(data, i, pivot);
            // push the left partion to recusrion stack
            pushRecusrionStackFrame(start, i - 1);
            // push the right partition to recursion stack
            pushRecusrionStackFrame(i + 1, end);
            return true;
        }
        return false;
    };

    const sortNextPartition = () => {
        stackFrame.current = recusrionStack.current.pop();
        if (stackFrame.current) {
            position.current = {i: getCurrentArrayBounds()[0], j: getCurrentArrayBounds()[0]};
        }
    };

    const performSortStep = () => {
        const [start, end] = getCurrentArrayBounds();
        if (stackFrame.current && end <= dataSize - 1 && start <= end) {
            const isPartitionSorted = performPartitionStep(start, end);
            if (isPartitionSorted) {
                sortNextPartition();
            }
            updateComparisonCount(comparisonCount => comparisonCount + 1);
        } else {
            recusrionStack.current.peek() ? sortNextPartition() : stopSorting();
        }
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
            const indices = [i, j];
            const {pivotIndex = dataSize - 1} = stackFrame.current || {};
            if (pivotIndex) {
                indices.push(pivotIndex);
            }
            return indices;
        }
        return [];
    };

    return (
        <div className="bar_chart">
            <BarChart data={data} indicesToHighlight={getIndicesToHighlight()}/>
        </div>
    );
};

export default QuickSort;