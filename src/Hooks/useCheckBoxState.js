import { useState } from "react";
export default initialVal => {
  const [value, setValue] = useState(initialVal);
  const handleChange = e => {
    setValue(!value);
  };

  return [value, handleChange];
};
