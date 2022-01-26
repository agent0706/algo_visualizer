import Divider from '../divider';
import './barChart.css';
import {getUpperLimit} from './utils';

const BarChart = (props) => {
    const {data = [], indicesToHighlight = []} = props;
    let upperLimit = props.upperLimit;

    if (!upperLimit) {
        upperLimit = getUpperLimit(data);
    }

    const renderBar = (num, index) => {
        const heightPercent = (num / upperLimit) * 100;
        const widthPercent = (90 / data.length);
        let barClassName = 'bar';
        if (indicesToHighlight.includes(index)) {
            barClassName = `${barClassName} highlighted_bar`
        }
        return (
            <div 
                className={barClassName}
                style={{
                    height: `${heightPercent}%`,
                    width: `${widthPercent}%`
                }}
                key={`${num}${heightPercent}${index}`}
            />
        );
    };
    
    return (
        <>
            <div className="chart_container">
                <Divider isVertical />
                <div className="bars_container">
                    {data.map((num, index) => renderBar(num, index))}
                </div>
            </div>
            <Divider />
        </>
    );
};

export default BarChart;