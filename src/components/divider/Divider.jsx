import "./Divider.css";

const Divider = (props) => {
    
    const {
        isVertical = false
    } = props;

    const dividerClassName = isVertical ? 'divider_vertical' : 'divider';

    return (
        <div className={dividerClassName} />
    )
};

export default Divider;