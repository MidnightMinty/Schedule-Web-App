import React from 'react'

export default function TimeRow(props) {
    const {hour, minute, period, row, parentRow} = props;

    return (
        <div className= "TimeRow">
            <div className="TimeRow-time">{`${hour}:${minute} ${period}`}</div>
            <div className = "TimeRow-Slot" id = {`row${parentRow}-${row}col1`}></div>
            <div className = "TimeRow-Slot" id = {`row${parentRow}-${row}col2`}></div>
            <div className = "TimeRow-Slot" id = {`row${parentRow}-${row}col3`}></div>
            <div className = "TimeRow-Slot" id = {`row${parentRow}-${row}col4`}></div>
            <div className = "TimeRow-Slot" id = {`row${parentRow}-${row}col5`}></div>
        </div>
    )
}
