import React from 'react';
import TimeRow from "./TimeRow";

export default function TimeBlock(props) {

    const {hour, period, row} = props;

    return (
        <div className= "TimeBlock">
            <TimeRow hour= {hour} minute= "00" period= {period} parentRow= {row} row={1}/>
            <TimeRow hour= {hour} minute= "15" period= {period} parentRow= {row} row={2}/>
            <TimeRow hour= {hour} minute= "30" period= {period} parentRow= {row} row={3}/>
            <TimeRow hour= {hour} minute= "45" period= {period} parentRow= {row} row={4}/>
        </div>
    )
}
