import { useState } from "react";

export default (initialVal, maxNumber) => {
    const [value, setValue] = useState(initialVal);
    const handleChange = e => {
        const newValue = +e.target.value;
        if(isNaN(newValue))
        {
            console.log("not number");
            setValue(value)
        }
        else if(newValue > maxNumber)
        {
            setValue(maxNumber);
        } 
        else
        {
            setValue(e.target.value);
        }
    };
    const reset = () => {
      setValue("");
    };
    return [value, handleChange, reset];
};