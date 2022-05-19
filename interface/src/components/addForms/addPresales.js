import useInput from "../../hooks/user-input";
import Selec from './select';
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AddFormButtons from "./addFormButtons";
import AuthContext from "../../store/auth-context";
import { Person, Inboxes, Inbox, Flag, Map } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const AddPresales = () => {
    const {isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler} = useInput(value=>value.trim() !== '');
    const namevalid = nameHasError?"form-control is-invalid":"form-control";
    var nameRef = useRef();
    var buRef = useRef();
    var blRef = useRef();
    var areaRef = useRef();
    var deptRef = useRef();  
    const [budata, setBudata] = useState([]);
    const [bldata, setBldata] = useState([]);
    const [areadata, setareadata] = useState([]);
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
        axios.get('http://localhost:8000/area/read',{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            const table = (response.data.map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setareadata(table);
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
        const areaInput = areaRef.current.value;
        var body = {
            "name": nameInput,
        }
        if(buInput.length !== 0){
            var bu = buInput.map(v=>{
                return "/api/businessunits/"+v 
            })
            body["businessunit"] = bu;
        }
        if(deptInput.length !== 0){
            var dept = deptInput.map(v=>{
                return "/api/departments/"+v 
            })
            body["department"] = dept;
        }
        if(blInput.length !== 0){
            var bl = blInput.map(v=>{
                return "/api/businesslines/"+v 
            })
            body["businessline"] = bl;
        }
        if(areaInput.length !== 0){
            var area = areaInput.map(v=>{
                return "/api/areas/"+v 
            })
            body["areas"] = area;
        }
        console.log(body)
        axios.post('http://localhost:8000/api/presales',body,{headers: {Authorization: "Bearer "+authctx.token}})
        .then(response=> {
            console.log(body);
            NotificationManager.success('The Presales Engineer has been successfully added !');
        })
        .catch(function (error) {
            NotificationManager.error('The Presales Engineer has not been added !');
            console.log(error);
        });
        navigate('/administration/presales');
    }

    return (
        <div className="card-body">
            <form className="needs-validation" onSubmit={submithandler}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Presales Engineer<span className="text-danger">*</span></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Person size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} placeholder="Name of Presales Engineer"/>
                                {!nameIsValid && <div className="invalid-feedback">Should not be empty</div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Business Unit</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Inboxes size={17}/></span>
                                </div>
                                <Selec multi={true} ref={buRef} full={false} data={budata} placeholder={{name: "Select Business Unit(s)"}}></Selec>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Business line</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Inbox size={17}/></span>
                                </div>
                                <Selec multi={true} ref={blRef} full={false} data={bldata} placeholder={{name: "Select Business Line(s)"}}></Selec>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Pole / Department</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Flag size={17}/></span>
                                </div>
                                <Selec multi={true} ref={deptRef} full={false} data={departmentdata} placeholder={{name: "Select Department(s)"}}></Selec>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Area</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Map size={17}/></span>
                                </div>
                                <Selec multi={true} ref={areaRef} full={false} data={areadata} placeholder={{name: "Select Area(s)"}}></Selec>
                            </div>
                        </div>
                    </div>
                </div>
                <AddFormButtons valid={nameIsValid} cancel={"/administration/presales"}/>
            </form>
        </div>
    )
}
export default AddPresales;