import useInput from "../../hooks/user-input";
import Selec from './select';
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AddFormButtons from "./addFormButtons";
import AuthContext from "../../store/auth-context";
import "../../index.css";
import { Flag, Inboxes, Inbox } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const AddProductLine = () => {
    const {value:nameValue, isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler} = useInput(value=>value.trim() !== '');
    const namevalid = nameHasError?"form-control is-invalid":"form-control";
    var nameRef = useRef();
    var buRef = useRef();
    var blRef = useRef();
    var deptRef = useRef();  
    const [budata, setBudata] = useState([]);
    const [bldata, setBldata] = useState([]);
    const [departmentdata, setdepartmentdata] = useState([]);
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
        axios.get('http://localhost:8000/businessline/read',{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            const table = (response.data.map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setBldata(table);
        }).catch(error=>{
            console.error(error);
        }) 
        axios.get('http://localhost:8000/department/read',{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            const table = (response.data.map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setdepartmentdata(table);
        }).catch(error=>{
            console.error(error);
        }) 
    },[])
    const submithandler = (event) => {
        event.preventDefault(); 
        const blInput = blRef.current.value;
        const nameInput = nameRef.current.value;
        const deptInput = deptRef.current.value;
        const buInput = buRef.current.value;
        var businessunit = buInput.map(v=>{
            return "/api/businessunits/"+v 
        })
        var businessline = blInput.map(v=>{
            return "/api/businesslines/"+v 
        })
        var department = deptInput.map(v=>{
            return "/api/departments/"+v 
        })
        var body = {
            "name": nameInput,
            "businessunit": businessunit,
            "businessline": businessline,
            "department": department
        }
        console.log(body)
        axios.post('http://localhost:8000/api/productlines',body,{headers: {Authorization: "Bearer "+authctx.token}})
        .then(response=> {
            NotificationManager.success('The Product Line has been successfully added !');
            console.log(body);
        })
        .catch(function (error) {
            NotificationManager.error('The Product Line has not been added !');
            console.log(error);
        });
        navigate('/administration/productLines');
    }

    return (
        <div className="card-body">
            <form className="needs-validation" onSubmit={submithandler}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Product Line<span className="text-danger">*</span></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Flag size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} placeholder="Name of Product Line"/>
                                {!nameIsValid && <div className="invalid-feedback">Should not be empty</div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Business Unit<span className="text-danger">*</span></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Inboxes size={17}/></span>
                                </div>
                                <Selec multi={true} ref={buRef} full={true} data={budata} placeholder={{name: "Select Business Unit(s)"}}></Selec>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Business Line<span className="text-danger">*</span></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Inbox size={17}/></span>
                                </div>
                                <Selec multi={true} ref={blRef} full={true} data={bldata} placeholder={{name: "Select Business Line(s)"}}></Selec>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Pole / Department<span className="text-danger">*</span></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Flag size={17}/></span>
                                </div>
                                <Selec multi={true} ref={deptRef} full={true} data={departmentdata} placeholder={{name: "Select Department(s)"}}></Selec>
                            </div>
                        </div>
                    </div>
                </div>
                <AddFormButtons valid={nameIsValid} cancel={"/administration/productLines"}/>
            </form>
        </div>
    )
}
export default AddProductLine;