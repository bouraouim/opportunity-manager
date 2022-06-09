import useInput from "../../hooks/user-input";
import Selec from "./select";
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AddFormButtons from "./addFormButtons";
import AuthContext from "../../store/auth-context";
import { Map } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const AddArea = () => {
    const {isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler} = useInput(value=>value.trim() !== '');
    const namevalid = nameHasError?"form-control is-invalid":"form-control";
    const nameIconValid = nameHasError?"input-group-text invalide":"input-group-text";
    const [budata, setBudata] = useState([]);
    const [buValid, setBuValid] = useState(false);
    const nameRef = useRef();
    const buRef = useRef();
    const navigate = useNavigate();
    const authctx = useContext(AuthContext);
    
    useEffect(() => {
        axios.get('http://localhost:8000/businessunit/read',{headers: {Authorization: "Bearer "+authctx.token}})
        .then(response=>{
            const table = (response.data.map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setBudata(table);
        }).catch(error=>{
            console.error(error);
        }) 
    },[])
    const buhandler = (event, s) => {
        if((event.target.value).length > 0)
          setBuValid(true);
        else
          setBuValid(false);
    }
    const submithandler = (event) => {
        event.preventDefault(); 
        const name = nameRef.current.value;
        const buInput = buRef.current.value;
        var bu = buInput.map(v=>{
            return "/api/businessunits/"+v 
        })
        const body = {
            "name": name,
            "businessunit": bu
        }
        axios.post('http://localhost:8000/api/areas',body,{headers: {Authorization: "Bearer "+authctx.token}})
        .then(function (response) {
            NotificationManager.success('The Area has been successfully added !');
            console.log(response);
        })
        .catch(function (error) {
            NotificationManager.error('The Area has not been added !');
            console.log(error);
        });
        navigate('/administration/areas');  
    }
  
    return(
        <div className="card-body">
            <form className="needs-validation" onSubmit={submithandler}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-control-label">Area<span className="text-danger">*</span></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className={nameIconValid}><Map size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} placeholder="Name of Area"/>
                                {!nameIsValid && <div className="invalid-feedback">Name of Area should not be empty</div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Selec multi={true} ref={buRef} choiceHandler={buhandler} data={budata} full={true} placeholder={{name: "Select Business Unit(s)"}} selecType={"Business Unit"} required={true}/>
                    </div>
                </div>
                <AddFormButtons valid={nameIsValid && buValid} cancel={"/administration/areas"}/>
            </form>
        </div>
    )
}
export default AddArea;