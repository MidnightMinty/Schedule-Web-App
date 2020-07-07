import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

//importing the times
import {times, days} from "../Helpers/Times";

//components
import TimeBlock from "./TimeBlock";
import CourseBlock from "./CourseBlock";
import AddCourseForm from "./AddCourseForm";

//row(hour)(minute)
import useToggle from '../Hooks/useToggleState';

export default function Schedule() {
    const [isModalOpen, toggleIsModalOpen] = useToggle();

    const handleAddButton = (e) =>
    {
        toggleIsModalOpen();
    }

    const handleAddNewCourse = (courseData) =>{
        console.log(courseData);
        //TODO MAKE SURE THAT THEY DO NOT OVERLAP AND ADD LOCAL STORAGE
        courseData.days.forEach((day, i) => {
            ReactDOM.render(<CourseBlock
                name={courseData.title}
                totalMinutes ={courseData.endTime.totalEndTime - courseData.startTime.totalStartTime}
                startHour={ courseData.startTime.startPeriod === "AM" ? +courseData.startTime.startHour -7: +courseData.startTime.startHour+5}
                startMinutes={courseData.startTime.startMinute}
                trueStartHour = {courseData.startTime.startHour}
                startPeriod={courseData.startTime.startPeriod}
                endHour= {courseData.endTime.finishHour}
                endMinute= {courseData.endTime.finishMinute}
                endPeriod = {courseData.endTime.endPeriod}
                color= {courseData.color}
             />, document.getElementById(`row1-1col${days(courseData.days[i].name)}`));
        });

        toggleIsModalOpen();
    }

    useEffect(()=>{
        //  ReactDOM.render(<CourseBlock
        //     name="CS-325"
        //     totalMinutes ={60}
        //     startHour={12-7}
        //     startMinutes={"00"}
        //     startPeriod={"AM"}
        //     trueStartHour={12}
        //  />, document.getElementById('row1-1col1'));
    },[])

    const TimeBlocks = times.map(time => 
    <TimeBlock
        hour={time.hour}
        period={time.period}
        row={time.row}
        key = {time.hour + time.period}
    />);

    return (
        <div className="Schedule">
            <AddCourseForm  isModalOpen = {isModalOpen} closeModal = {toggleIsModalOpen} addCourse = {handleAddNewCourse}/>
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

            <div className= "Schedule-Button" onClick = {handleAddButton}>Add New Course</div>
        </div>
    )
}
