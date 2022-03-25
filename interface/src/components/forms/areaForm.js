import useInput from "../../hooks/user-input"
import FormButtons from "./formbuttons";
import Selec from "./select";
import axios from 'axios'
import  { useState,useEffect,useRef} from 'react'
import { useNavigate } from "react-router-dom";


const AreaForm=()=>{
    const {value:namedValue,isValid:nameIsValid ,hasError:nameHasError, valueChangeHandler:nameChangeHandler , inputBlurHandler:nameBlurHandler,submissionHandler:submissionHandler}=useInput(value=>value.trim() !== '');
    const namevalid=nameHasError?"form-control is-invalid":"form-control  "
    const [budata , setBudata]=useState([])  
    const nameRef=useRef();
    const buRef=useRef();
    const multiple=false
    useEffect(()=>{
        axios.get('http://localhost:8000/businessunit/read') 
        .then(response=>{
        console.log(response)
            const table=(response.data.map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setBudata(table)
        }).catch(error=>{
        console.error(error);
        }) 
    },[])
    const navigate=useNavigate();
    const submithandler=(event)=>{
    event.preventDefault(); 
    console.log(buRef.current.value)
        const inputname=nameRef.current.value
    const buinput=buRef.current.value
    const body={
        "name": inputname,
        "businessunit": {
        "id": buinput
        }
    }
    axios.post('http://localhost:8000/api/businesslines',body)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    navigate('/businessline')  
    }
  
    return(
        <div className="card-body">
          <form className="needs-validation" onSubmit={submithandler}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Area <span className="text-danger">*</span></label>
                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} id="example3cols1Input" placeholder="Name of area"/>
                {!nameIsValid && <div className="invalid-feedback">Should not be empty</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols3Input">Business Unit<span className="text-danger">*</span></label>
                <Selec multi={multiple} ref={buRef} data={budata}/>
              </div>
            </div>
          </div>
          <FormButtons valid={nameIsValid} cancel={"/administration/areas"}/>
          </form>
        </div>

    )
}
export default AreaForm;