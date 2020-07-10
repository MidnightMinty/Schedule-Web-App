import React from 'react';
import chroma from "chroma-js";

export default function CourseBlock(props) 
{
    //gets the size of course given minutes
    const {name, startHour, startMinutes,startPeriod,totalMinutes, trueStartHour, endHour, endMinute, endPeriod, color} = props;

    const style = 
    {
        height: `${totalMinutes * .134}%`,
        //hour + minute
        //transform: "translate(-0%,-100%)",
        top: `${((((startHour-1)*60) + (+startMinutes)) * .1332)}%`,
    }

    const getColor = (color) =>{
        let newColors = {first: "#32a852", second: chroma("#32a852").darken()};
        try
        {
            newColors = {first: color, second: chroma(color).darken()};
        }
        catch(e)
        {}

        return newColors;
    }

    const handleDelete = (e) =>{
        props.deleteCourse(props.id);
    }

    return (
        <div className="CourseBlock" style = {style}>
            <div className= "CourseBlock-header" style = {{backgroundColor: getColor(color).second}}>
                <div style={{marginLeft:"1.5rem"}}>{name}</div>
                <div className="header-delete" onClick = {handleDelete}>&times;</div>
            </div>
            <div className= "CourseBlock-body" style = {{backgroundColor: getColor(color).first}}>{`${trueStartHour}:${startMinutes}${startPeriod}- ${endHour}:${endMinute}${endPeriod}`}</div>
        </div>
    )
}
