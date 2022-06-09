import useInput from "../../hooks/user-input";
import React, { useState, useImperativeHandle, useEffect, useRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "../../index.css";
import { Inboxes, Inbox, Flag, Map, Bullseye, Globe2, PersonCircle, PersonBadge, Cash } from "react-bootstrap-icons";

const Selec = React.forwardRef((props, ref) => {  
  const initialRender  = useRef(true)
  const {isValid:selecIsValid, hasError:selecHasError, valueChangeHandler:selecChangeHandler, inputBlurHandler:selecBlurHandler} = useInput(value=>{
    return value.length !== 0
  });
  var selecvalid = "form-control";
  var iconValid = "input-group-text";
  var icon;
  if(props.full){
    var selecvalid = selecHasError?"form-control is-invalid":"form-control";
    var iconValid = selecHasError?"input-group-text invalide":"input-group-text";
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
  },[props.init])}catch(error){}    
  useEffect(() => { 
    // console.log("selecHasError1") 
    // console.log(selecIsValid)
    // props.onchange(!selecHasError)
    if(initialRender.current){
      initialRender.current = false;
      console.log("ref change")
    }
    else {
      // console.log("ref changedddddd")
      console.log(selecHasError)
      try{
        props.onchange(!selecHasError)
      }catch(error){console.log("errrrrrr")}
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
  if(props.selecType === "Business Unit")
    icon = <Inboxes size={17}/>;
  if(props.selecType === "Business Line")
    icon = <Inbox size={17}/>;
  if(props.selecType === "Pole / Department")
    icon = <Flag size={17}/>;
  if(props.selecType === "Area")
    icon = <Map size={17}/>;
  if(props.selecType === "Country")
    icon = <Bullseye size={17}/>;
  if(props.selecType === "Continent")
    icon = <Globe2 size={17}/>;
  if(props.selecType === "Role(s)")
    icon = <PersonCircle size={17}/>;
  if(props.selecType === "user")
    icon = <PersonBadge size={17}/>;
  if(props.selecType === "Sales Manager")
    icon = <PersonBadge size={17}/>;
  if(props.selecType === "Currency code")
    icon = <Cash size={17}/>;
 
  return(
    <>
      <div className="">
        <label className="form-control-label">{props.selecType}{props.required && <span className="text-danger">*</span>}</label>
        <div className="input-group mb-0">
          <div className="input-group-prepend">
            <span className={iconValid}>{icon}</span>
          </div>
          <Select   sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={props.multi} disabled={disabled} className={selecvalid} onChange={onChangeHandler} onBlur={selecBlurHandler} displayEmpty value={selected} {...renderValue}>
            {props.data.map((d) => (
              <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
            ))}
          </Select>
          {selecHasError && <div className="invalid-feedback">{props.selecType} should not be empty</div>}
        </div>
      </div>
    </>
  )
})
export default Selec;
