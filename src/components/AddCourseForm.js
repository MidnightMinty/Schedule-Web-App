import React from 'react';
import useInputState from "../Hooks/useInputState";

export default function AddCourseForm() {
    const [title, handleTitleChange, resetTitle] = useInputState("");
    const [color, handleColorChange, resetColor] = useInputState("");

    return (
        <div className="AddCourseForm" id="modal">
            <div className = "modal">
                <div className="Header">
                    <div className= "Header-title">Add New Course!</div>
                    <div className="exit-btn">&times;</div>
                </div>

                <form className = "CourseForm">
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
                            <input type="checkbox" name="monday" value=""/>
                            <label htmlFor="monday"> Monday</label>
                        </div>
                        <div className = "checkbox">
                            <input type="checkbox" name="tuesday" value=""/>
                            <label htmlFor="tuesday"> Tuesday</label>
                        </div>
                        <div className = "checkbox">
                            <input type="checkbox" name="wenesday" value=""/>
                            <label htmlFor="wenesday"> Wenesday</label>
                        </div>
                        <div className = "checkbox">
                            <input type="checkbox" name="thursday" value=""/>
                            <label htmlFor="thursday"> Thurday</label>
                        </div>
                        <div className = "checkbox">
                            <input type="checkbox" name="friday" value=""/>
                            <label htmlFor="friday"> Friday</label>
                        </div>
                    </div>

                </form>
            </div>
            <div id = "overlay"></div>
        </div>
    )
}
