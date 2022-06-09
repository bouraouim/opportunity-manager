import { useEffect, useState } from "react";

const useInput = (validateValue) => {
  const [entredValue, setEntredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(entredValue);
  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = (event) => {
    setEntredValue(event.target.value)
  }
  const submissionHandler = (event) => {
    event.preventDefault(); 
  }
  const inputBlurHandler = () => {
    setIsTouched(true);
  }

  return{
    value:entredValue,
    isValid:valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    submissionHandler,
  }
}
export default useInput;