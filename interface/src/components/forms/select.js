import useInput from "../../hooks/user-input"
import  React,{ useState,useRef,useImperativeHandle } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



const Selec=React.forwardRef((props,ref)=>{


  
  const {value:selecValue,isValid:selecIsValid ,hasError:selecHasError, valueChangeHandler:selecChangeHandler , inputBlurHandler:selecBlurHandler}=useInput(value=>value.length !==0);
  var selecvalid="form-control"
  if(props.full){
    var selecvalid=selecHasError?"form-control is-invalid":"form-control"}


    var disabled=false
    try{
       disabled=props.choice
       if(props.a){setSelected([])}
    }catch(error){}


  const [selected ,setSelected]=useState([])


   const onChangeHandler=(event)=>{
    setSelected(event.target.value); selecChangeHandler(event)
    try{
    props.choiceHandler(event)
  }catch(error){}
  try{
    props.valueHandler(event.target.value)
  }catch(error){}
  try{props.validHandler(selecvalid)}catch(error){}
   

  }

  useImperativeHandle(ref,()=>{
    return{
      value: selected
    }
  })
  

  return(<>
      <Select  sx={{border:0 }}  multiple={props.multi}  disabled={disabled} className={selecvalid} onChange={onChangeHandler} onBlur={selecBlurHandler}  value={selected}  >
      {props.data.map((d) => (
                        <MenuItem value={d.id}
                        key={d.name}
                        > {d.name}</MenuItem>
                    ))}
      </Select>
      {selecHasError && <div className="invalid-feedback">should not be empty</div>}
      </>
  )
})
export default Selec;