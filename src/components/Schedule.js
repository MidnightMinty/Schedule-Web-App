import React, { useEffect, useState} from 'react';
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
    const [isTimeTaken, setIsTimeTaken] = useState();
    const [courses, setCourses] = useState([]);

    const handleAddButton = (e) =>
    {
        toggleIsModalOpen();
    }

    const handleAddNewCourse = (courseData) =>{
        let courseList = [];
        let timeTaken = false;

        const startTime =  courseData.startTime;
        const endTime = courseData.endTime;

        const {totalStartTime, startPeriod, startHour, startMinute} = startTime;
        const {totalEndTime, finishHour, finishMinute, endPeriod} = endTime;

        //TODO ADD LOCAL STORAGE and make responsive, fix the fact that when rerender happens the blocks are still there
        courseData.days.forEach((day, i) => {

            //Check if time slot of course is already occupied
            courses.forEach(course =>{
                //if break than add = after each <>
                if(((totalEndTime >= course.startTime.totalStartTime 
                && totalEndTime <= course.endTime.totalEndTime)
                || (totalStartTime <= course.endTime.totalEndTime
                && totalStartTime >= course.startTime.totalStartTime)
                || (course.startTime.totalStartTime <= totalEndTime 
                && course.startTime.totalStartTime >= totalStartTime))
                && days(courseData.days[i].name) === course.dayNum)
                {
                    setIsTimeTaken(true);
                    timeTaken = true;
                }
            });

            if(!timeTaken){
                ReactDOM.render(<CourseBlock
                    name={courseData.title}
                    totalMinutes ={totalEndTime - totalStartTime}
                    startHour={startPeriod === "AM" ? +startHour -7: +startHour+5}
                    startMinutes={startMinute}
                    trueStartHour = {startHour}
                    startPeriod={startPeriod}
                    endHour= {finishHour}
                    endMinute= {finishMinute}
                    endPeriod = {endPeriod}
                    color= {courseData.color}
                    id= {courseData.id}
                    deleteCourse={deleteCourse}
                />, document.getElementById(`row${startPeriod === "AM" ? +startHour -7: +startHour+5}-${Math.floor(startMinute/15)+1}col${days(courseData.days[i].name)}`));
                
                courseList.push({...courseData, dayNum: days(courseData.days[i].name)});
                toggleIsModalOpen();
            }
        });

        setCourses([...courses, ...courseList]);
    }

    const deleteCourse = (id) =>{
        setCourses(courses.filter(course => course.id !== id));
    }

    useEffect(()=>{
        //  ReactDOM.render(<CourseBlock
        //     name="CS-325"
        //     totalMinutes ={60}
        //     startHour={12-7}
        //     startMinutes={"00"}
        //     startPeriod={"AM"}
        //     trueStartHour={12}
        //     color="#32a852"
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
            <AddCourseForm  
            isModalOpen = {isModalOpen} 
            closeModal = {toggleIsModalOpen} 
            addCourse = {handleAddNewCourse}
            isTimeTaken={isTimeTaken}
            toggleIsTimeTaken={() => setIsTimeTaken(false)}
            />
            <div className="Schedule-Header">Schedule</div>
            <div className="Schedule-Main">
                <div className= "table-days">
                    <div className= "table-break"/>
                    <div className= "table-day" id = "col1">Monday</div>
                    <div className= "table-day" id = "col2">Tuesday</div>
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
