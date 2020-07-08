import React, {useRef} from 'react';
import useInputState from "../Hooks/useInputState";
import useCheckBoxState from "../Hooks/useCheckBoxState";
import useTimeState from "../Hooks/useTimeState";
import { v4 as uuidv4 } from 'uuid';

export default function AddCourseForm(props) {
    const [title, handleTitleChange, resetTitle] = useInputState("");
    const [color, handleColorChange] = useInputState("#e6766e");
    const [monday, handleMondayChange] = useCheckBoxState(false);
    const [tuesday, handleTuesdayChange] = useCheckBoxState(false);
    const [wenesday, handleWenesdayChange] = useCheckBoxState(false);
    const [thursday, handleThursdayChange] = useCheckBoxState(false);
    const [friday, handleFridayChange] = useCheckBoxState(false);

    const [startHour, handleStartHourChange, resetStartHour] = useTimeState("", 12); 
    const [startMinute, handleStartMinuteChange, resetStartMinute] = useTimeState("", 59); 
    const [startPeriod, handleStartPeriodChange] = useInputState("AM");

    const [finishHour, handleFinishHourChange, resetFinishHour] = useTimeState("", 12); 
    const [finishMinute, handleFinishMinuteChange, resetFinishMinute] = useTimeState("", 59); 
    const [endPeriod, handleEndPeriodChange] = useInputState("AM");

    const warningText = useRef(null);
    const modal = useRef(null);
    const overlay = useRef(null);

    if(props.isModalOpen)
    {
        modal.current.classList.add("active");
        overlay.current.classList.add("active");
    }

    if(!props.isModalOpen)
    {
        if(modal.current !== null){
            modal.current.classList.remove("active");
            overlay.current.classList.remove("active");
        }
    }

    if(props.isTimeTaken)
    {
        warningText.current.innerText = "Time entered is already taken!";
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        let days = [{name: "monday", selected: monday}, {name: "tuesday", selected: tuesday}, {name: "wenesday", selected: wenesday}
        , {name: "thursday", selected: thursday}, {name: "friday", selected: friday}];

        days = days.filter(day => day.selected === true);   
        
        let testStartHour = startHour;
        let testEndHour = finishHour;

        if(startPeriod === "PM")
        {
            testStartHour = +testStartHour + 12;
        }

        if(endPeriod === "PM")
        {
            testEndHour = +testEndHour +12;
        }

        const totalStartTime = (testStartHour * 60) + +startMinute;
        const totalEndTime = (testEndHour* 60) + +finishMinute;


        const startTime = {startHour, startMinute, startPeriod, totalStartTime};
        const endTime = {finishHour, finishMinute, endPeriod, totalEndTime};

        if(days.length === 0)
        {
            warningText.current.innerText = "Please Select A Day!";
            return;
        }

        if(title === "")
        {
            warningText.current.innerText = "Please enter a title!";
            return;
        }
        
        if(color === "")
        {
            warningText.current.innerText = "Please enter a color!";
            return;
        }

        if(startHour ==="" || startMinute === "" || finishHour === "" || finishMinute === "")
        {
            warningText.current.innerText = "Please enter a time!";
            return;
        }

        if(totalStartTime >= totalEndTime)
        {
            warningText.current.innerText = "End time must be after start time!";
            return; 
        }

        if(totalEndTime - totalStartTime  < 30)
        {
            warningText.current.innerText = "The Course should be atleast 30 minutes long";
            return;
        }

        if(totalStartTime < 480 || totalEndTime > 1185)
        {
            warningText.current.innerText = "time must be between 8am and 7:45pm!";
            return;
        }

        const courseData = {days, startTime, endTime, title, color, id: uuidv4()}

        //TODO add verification for start and end time

        resetTitle();
        resetStartHour();
        resetStartMinute();
        resetFinishHour();
        resetFinishMinute();
        props.toggleIsTimeTaken();
        warningText.current.innerText = "";

        props.addCourse(courseData);
        //console.log(courseData);
    }

    const handleExit = (e) =>{
        props.closeModal();
    }

    const hours = [];
    const minutes = []
    for(let i = 1; i < 13; i++)
    {
        hours.push(<option value = {i}>{i}</option>)
    }
    for(let i = 0; i < 60; i++)
    {
        minutes.push(<option value = {i}>{i}</option>)
    }

    return (
        <div className="AddCourseForm" id="modal">
            <div className = "modal" ref={modal}>
                <div className="Header">
                    <div className= "Header-title">Add New Course!</div>
                    <div className="exit-btn" onClick = {handleExit}>&times;</div>
                </div>

                <form className = "CourseForm" onSubmit={handleSubmit}>
                    <label htmlFor="title">Course Name</label><br/>
                    <input type="text" className="input-text" name="title" placeholder="CS-325" 
                        value={title}
                        onChange={handleTitleChange}   
                    />
                    <br/>
                    <label htmlFor="color">Color</label><br/>
                    <input type="text" className="input-text" name="color" placeholder="#4287f5"
                        value={color}
                        onChange={handleColorChange}   
                    />
                    <br/>

                    <h1 className = "checkbox-title">Days</h1>
                    <div className = "CourseForm-checkbox">
                        <div className = "checkbox">
                            <input type="checkbox" name="monday" value={monday} onClick={handleMondayChange}/>
                            <label htmlFor="monday"> Monday</label>
                        </div>
                        <div className = "checkbox">
                            <input type="checkbox" name="tuesday" value={tuesday} onClick={handleTuesdayChange}/>
                            <label htmlFor="tuesday"> Tuesday</label>
                        </div>
                        <div className = "checkbox">
                            <input type="checkbox" name="wenesday" value={wenesday} onClick={handleWenesdayChange}/>
                            <label htmlFor="wenesday"> Wenesday</label>
                        </div>
                        <div className = "checkbox">
                            <input type="checkbox" name="thursday" value={thursday} onClick={handleThursdayChange}/>
                            <label htmlFor="thursday"> Thurday</label>
                        </div>
                        <div className = "checkbox">
                            <input type="checkbox" name="friday" value={friday} onClick={handleFridayChange}/>
                            <label htmlFor="friday"> Friday</label>
                        </div>
                    </div>

                    
                    <p className= "checkbox-title">Start Time</p>
                    <div className = "CourseForm-timeForm">
                        <input type="text" className="input-text time" name="title" placeholder="12"
                            value={startHour}
                            onChange={handleStartHourChange}
                        />
                        <p>:</p>
                        <input type="text" className="input-text time" name="title" placeholder="00"
                            value={startMinute}
                            onChange={handleStartMinuteChange}
                        />
                        <select className= "period-select"
                            value={startPeriod}
                            onChange={handleStartPeriodChange}
                        >
                            <option value= "AM">AM</option>
                            <option value= "PM">PM</option>
                        </select>
                    </div>

                    <p className= "checkbox-title">End Time</p>
                    <div className = "CourseForm-timeForm">
                        <input type="text" className="input-text time" name="title" placeholder="12"
                            value={finishHour}
                            onChange={handleFinishHourChange}
                        />
                        <p>:</p>
                        <input type="text" className="input-text time" name="title" placeholder="00"
                            value={finishMinute}
                            onChange={handleFinishMinuteChange}
                        />
                        <select className= "period-select"
                            value={endPeriod}
                            onChange={handleEndPeriodChange}
                        >
                            <option value= "AM">AM</option>
                            <option value= "PM">PM</option>
                        </select>
                    </div>

                    <button className= "Schedule-Button form-button">Submit</button>

                </form>
                <div className = "warning" ref={warningText}/>   
            </div>
            <div id = "overlay" ref={overlay}></div>
        </div>
    )
}
