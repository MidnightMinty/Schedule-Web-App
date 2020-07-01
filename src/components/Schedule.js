import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

//importing the times
import {times} from "../Helpers/Times";

//components
import TimeBlock from "./TimeBlock";
import CourseBlock from "./CourseBlock";
import AddCourseForm from "./AddCourseForm";

//row(hour)(minute)

export default function Schedule() {
    useEffect(()=>{
         ReactDOM.render(<CourseBlock
            name="CS-325"
            totalMinutes ={60}
            startHour={10}
            startMinutes={"00"}
            startPeriod={"AM"}
         />, document.getElementById('row1-1col1'));
    },[])

    const TimeBlocks = times.map(time => 
    <TimeBlock
        hour={time.hour}
        period={time.period}
        row={time.row}
    />);

    return (
        <div className="Schedule">
            <AddCourseForm/>
            <div className="Schedule-Header">Schedule</div>
            <div className="Schedule-Main">
                <div className= "table-days">
                    <div className= "table-break"/>
                    <div className= "table-day">Monday</div>
                    <div className= "table-day">Tuesday</div>
                    <div className= "table-day">Thursday</div>
                    <div className= "table-day">Wenesday</div>
                    <div className= "table-day">Friday</div>
                </div>
                <div className= "table-times">
                    {TimeBlocks}
                </div>
            </div>
            <div className="Schedule-Footer"/>

            <div className= "Schedule-Button">Add New Course</div>
        </div>
    )
}
