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
    const initialCourses = JSON.parse(window.localStorage.getItem("courses") || "[]")
    const [isModalOpen, toggleIsModalOpen] = useToggle();
    const [isTimeTaken, setIsTimeTaken] = useState();
    const [courses, setCourses] = useState(initialCourses);

    const handleAddButton = (e) =>
    {
        toggleIsModalOpen();
    }

    const handleAddNewCourse = (courseData) =>{
        let courseList = [];
        let timeTaken = false;

        const startTime =  courseData.startTime;
        const endTime = courseData.endTime;

        const {totalStartTime} = startTime;
        const {totalEndTime} = endTime;

        //TODO make responsive
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
                courseList.push({...courseData, dayNum: days(courseData.days[i].name)});
                toggleIsModalOpen();
            }
        });

        setCourses([...courses, ...courseList]);
    }

    const deleteCourse = (id) =>{

        setCourses(courses.filter(course => {
            const startTime =  course.startTime;
            const {startPeriod, startHour, startMinute} = startTime;
            if(course.id === id)
            {
                ReactDOM.unmountComponentAtNode(document.getElementById(`row${startPeriod === "AM" ? +startHour -7: +startHour+5}-${Math.floor(startMinute/15)+1}col${course.dayNum}`));
            } 
            return course.id !== id
        }));
    }

    useEffect(()=>{
        window.localStorage.setItem("courses", JSON.stringify(courses));

        courses.forEach((course,i) =>{
            const startTime =  course.startTime;
            const endTime = course.endTime;
    
            const {totalStartTime, startPeriod, startHour, startMinute} = startTime;
            const {totalEndTime, finishHour, finishMinute, endPeriod} = endTime;

            ReactDOM.render(<CourseBlock
                name={course.title}
                totalMinutes ={totalEndTime - totalStartTime}
                startHour={startPeriod === "AM" ? +startHour -7: +startHour+5}
                startMinutes={startMinute}
                trueStartHour = {startHour}
                startPeriod={startPeriod}
                endHour= {finishHour}
                endMinute= {finishMinute}
                endPeriod = {endPeriod}
                color= {course.color}
                id= {course.id}
                deleteCourse={deleteCourse}
            />, document.getElementById(`row${startPeriod === "AM" ? +startHour -7: +startHour+5}-${Math.floor(startMinute/15)+1}col${course.dayNum}`));
        });
    }, [courses]);

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
