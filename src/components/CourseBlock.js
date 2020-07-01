import React from 'react'

export default function CourseBlock(props) 
{
    //gets the size of course given minutes
    const {name, startHour, startMinutes,startPeriod,totalMinutes} = props;

    const style = 
    {
        height: `${totalMinutes * .134}%`,
        //hour + minute
        //transform: "translate(-0%,-100%)",
        top: `${((((startHour-1)*60) + (+startMinutes)) * .1332)}%`,
    }

    return (
        <div className="CourseBlock" style = {style}>
            <div className= "CourseBlock-header">{name}</div>
            <div className= "CourseBlock-body">{`${startHour}:${startMinutes}${startPeriod}- 3:00PM`}</div>
        </div>
    )
}
