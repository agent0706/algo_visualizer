import {useState, useRef, useEffect, useReducer} from 'react';
import {getRandomArray} from '../../utils';
import './Sort.css';
import '../../App.css';
import BubbleSort from './bubbleSort';
import SelectionSort from './selectionSort';
import SelectAlgorithm from '../selectAlgorithm';

const Sort = (props => {
    const {
        sortingAlgo
    } = props;

    const [dataSize, updateDataSize] = useState(50);
    const [intervalSpeed, updateIntervalSpeed] = useState(20);
    const [isSortRunning, updateIsSortRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [comparisonCount, updateComparisonCount] = useState(0);
    const data = useRef([]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        data.current = getRandomArray(dataSize);
        setIntervalId(null);
        updateIsSortRunning(false);
        updateComparisonCount(0);
        forceUpdate();
    }, [sortingAlgo, dataSize]);

    const getCommonProps = () => {
        return {
            data: data.current,
            updateComparisonCount,
            intervalId,
            setIntervalId,
            updateIsSortRunning,
            dataSize,
            isSortRunning,
            intervalSpeed
        };
    }

    const getAlgoView = () => {
        switch(sortingAlgo) {
            case 'bubbleSort':
                return <BubbleSort {...getCommonProps()} />
            case 'selectionSort': 
                return <SelectionSort {...getCommonProps()} />
            default:
                return <SelectAlgorithm />
        }
    };

    const handleStartClick = () => {
        updateIsSortRunning(prevState => !prevState);
    };

    const handleDataSizeChange = (event) => {
        updateDataSize(event.target.value)
    };

    const handleIntervalChange = (event) => {
        let value = event.target.value;
        if (value > 10) {
            value = ((value % 10) + 1) * 10;
        }
        updateIntervalSpeed(value * 100);
    };

    const getIntervalValue = () => {
        let value = intervalSpeed;
        value /= 100;
        if (value > 10) {
            value -= 10;
        }
        return value;
    }

    return (
        <>
            {getAlgoView()}
            <div style={{marginLeft: '40px'}}>{`${comparisonCount} comparisons`}</div>
            <div className="controls_container">
                <div>
                    <div>want to increase array size?</div>
                    <div className="array_size_container">
                        <input type="range" min={10} max={100} value={dataSize} onChange={handleDataSizeChange} />
                        <div style={{marginLeft: '10px'}}>{dataSize}</div>
                    </div>
                </div>
                <button className="button button_height" onClick={handleStartClick}>{isSortRunning ? 'Pause' : 'Start'}</button>
                <div>
                    <div>want to decrease speed?</div>
                    <input type="range" min={0} max={3} value={getIntervalValue()} onChange={handleIntervalChange} />
                </div>
            </div>
        </>
    )
});

export default Sort;