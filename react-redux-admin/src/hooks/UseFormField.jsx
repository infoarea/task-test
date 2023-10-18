import { useState } from "react";

const UseFormField = (initialInput) => {
  const [input, setInput] = useState(initialInput);

  //Handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setInput(initialInput);
  };
  return { input, handleInputChange, resetForm, setInput };
};

export default UseFormField;
