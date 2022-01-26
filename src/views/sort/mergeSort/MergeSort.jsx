import {useRef, useEffect, useReducer} from 'react';
import useSorting from '../useSorting';
import {Stack} from '../../../utils';
import {BarChart} from '../../../components';
import '../Sort.css';
import '../../../App.css';

const MergeSort = (props) => {
    const position = useRef(null);
    const stackFrame = useRef(null);
    const subArraysStack = useRef(null);
    const mergeStack = useRef(null);
    const isMergePhase = useRef(false);
    const isComparisonPhase = useRef(false);
    const auxArray = useRef(null);
    const [, triggerRender] = useReducer(x => x + 1, 0);

    const {
        data,
        updateIsSortRunning,
        dataSize,
        updateComparisonCount,
        isSortRunning,
        intervalSpeed
    } = props;

    const getMiddleIndex = (start, end) => {
        return Math.floor((start + end) / 2);
    };

    const pushStackFrames = (start, end) => {
        if (start < end) {
            const mid = getMiddleIndex(start, end);
            subArraysStack.current.push([mid + 1, end]);
            mergeStack.current.push([start, end]);
            stackFrame.current = [start, mid];
            position.current = {i: start, j: mid};
            triggerRender();
        }
    };

    useEffect(() => {
        if (!subArraysStack.current && !mergeStack.current) {
            subArraysStack.current = new Stack();
            mergeStack.current = new Stack();
            // position.current = {i: 0, j: dataSize - 1};
            pushStackFrames(0, dataSize - 1);
        }
    }, [dataSize, isSortRunning]);

    const stopSorting = () => {
        updateIsSortRunning(false);
        position.current = {i: 0, j: dataSize - 1};
        subArraysStack.current = null;
        mergeStack.current = null;
        isMergePhase.current = false;
        isComparisonPhase.current = false;
        stackFrame.current = null;
        auxArray.current = [];
    };

    const performMergeStep = () => {
        const [start, end] = stackFrame.current;
        const mid = getMiddleIndex(start, end);
        const [leftArrayStart, leftArrayEnd] = [start, mid];
        const [, rightArrayEnd] = [mid + 1, end];
        const {i, j} = position.current;
        if (isMergePhase.current) {
            if (i <= rightArrayEnd) {
                data[i] = auxArray.current[i - leftArrayStart];
                position.current = {i: i + 1, j: i + 1};
                triggerRender();
            } else {
                isMergePhase.current = false;
                isComparisonPhase.current = false;
                auxArray.current = [];
                stackFrame.current = null;
            }
        } else {
            if (i <= leftArrayEnd && j <= rightArrayEnd) {
                if (data[i] < data[j]) {
                    auxArray.current.push(data[i]);
                    position.current = {i: i + 1, j};
                } else {
                    auxArray.current.push(data[j]);
                    position.current = {i, j: j + 1};
                }
                updateComparisonCount(comparisonCount => comparisonCount + 1);
            } else if (j <= rightArrayEnd && i >= leftArrayEnd) {
                auxArray.current.push(data[j]);
                position.current = {i, j: j + 1};
                triggerRender();
            } else if (i <= leftArrayEnd && j >= rightArrayEnd) {
                auxArray.current.push(data[i]);
                position.current = {i: i + 1, j};
                triggerRender();
            } else {
                isMergePhase.current = true;
                position.current = {i: leftArrayStart, j: leftArrayStart};
                triggerRender();
            }
        }
    };

    const prepareForMergePhase = () => {
        auxArray.current = [];
        const [start, end] = mergeStack.current.pop();
        const mid = getMiddleIndex(start, end);
        stackFrame.current = [start, end];
        position.current = {i: start, j: mid + 1};
        isComparisonPhase.current = true;
    };

    const performSortStep = () => {
        if (isComparisonPhase.current) {
            performMergeStep();
        } else {
            if (!subArraysStack.current.peek() && !mergeStack.current.peek()) {
                stopSorting();
                return;
            }
            const [start, end] = stackFrame.current || [];
            if (stackFrame.current && end <= dataSize && start < end) {
                pushStackFrames(start, end);
            } else {
                if (subArraysStack.current.peek()) {
                    const [start, end] = subArraysStack.current.pop();
                    if (start !== end) {
                        pushStackFrames(start, end);
                    } else if (mergeStack.current.peek()) {
                        prepareForMergePhase();
                        performMergeStep();
                    }
                } else if (mergeStack.current.peek()) {
                    prepareForMergePhase();
                    performMergeStep();
                }
            }
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
            const {i, j} = position.current || [];
            const indices = [i, j];
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

export default MergeSort;