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

    return (
        <div className="CourseBlock" style = {style}>
            <div className= "CourseBlock-header" style = {{backgroundColor: chroma(color).darken()}}>{name}</div>
            <div className= "CourseBlock-body" style = {{backgroundColor: color}}>{`${trueStartHour}:${startMinutes}${startPeriod}- ${endHour}:${endMinute}${endPeriod}`}</div>
        </div>
    )
}
