import useInput from "../../hooks/user-input";
import React, { useState, useImperativeHandle, useEffect,useRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "../../index.css";

const Selec = React.forwardRef((props, ref) => {  
  const initialRender  = useRef(true)
  const {isValid:selecIsValid, hasError:selecHasError, valueChangeHandler:selecChangeHandler, inputBlurHandler:selecBlurHandler} = useInput(value=>{
    return value.length !== 0
  });
  var selecvalid = "form-control";
  if(props.full){
    var selecvalid = selecHasError?"form-control is-invalid":"form-control";
  }
  var disabled = false;
  try{
      disabled = props.choice;
    if(props.a){setSelected([])}
  }catch(error){}
  const [selected, setSelected] = useState([]);
  const [renderValue, setrenderValue] = useState({});

  try{
  useEffect(() => {
     setSelected([]);
     console.log(props.name)
    },[props.init])}catch(error){}

    
  useEffect(() => { 
    console.log("selecHasError1") 
    console.log(selecIsValid)
    // props.onchange(!selecHasError)
  
    if(initialRender.current){
      initialRender.current = false;
      console.log("ref change")
    }
    else {
      console.log("ref changedddddd")
    console.log(selecIsValid)
    try{
    props.onchange(!selecHasError)
    }catch(error){}
     }
  },[selecIsValid])

  const onChangeHandler = (event) => {

    // console.log(selecIsValid)
    setSelected(event.target.value);
    selecChangeHandler(event)
    try{
      // console.log(event.target.value)
    }catch(error){console.log("eeee")}
    try{
      props.choiceHandler(event)
    }catch(error){}
    try{
      props.changeInit()
      console.log(props.name)
    }catch(error){}
    try{
      props.valueHandler(event.target.value)
    }catch(error){}
  }
  useImperativeHandle(ref,() => {
    return{
      value: selected
    }
  })
  const render = (selected) => { 
    try{
      var placeholder = props.placeholder
      var s = ''
      if(Array.isArray(placeholder)){
        placeholder.map(d => {s = s+d.name+", "
          if(d.name === undefined) {s=d}
        })
        s = s.slice(0,-2);
      }
      else{
        s = placeholder.name}
    }catch(error){var s = ''}
    if (selected.length === 0) {
      return <em>{s}</em>;
    }
    try{
      return selected.join(', ');
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    if (selected.length === 0){
      setrenderValue({renderValue:render})
    }
    else{
      setrenderValue({})
    }
  },[selected,props.placeholder])
 

  return(
    <>
      <Select sx={{border:0 }} multiple={props.multi} disabled={disabled} className={selecvalid} onChange={onChangeHandler} onBlur={selecBlurHandler} displayEmpty value={selected} {...renderValue} label=' '>
      {props.data.map((d) => (
        <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
      ))}
      </Select>
      {selecHasError && <div className="invalid-feedback">Should not be empty</div>}
    </>
  )
})
export default Selec;