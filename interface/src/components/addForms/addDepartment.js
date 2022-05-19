import useInput from "../../hooks/user-input";
import Selec from "./select";
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AddFormButtons from "./addFormButtons";
import AuthContext from "../../store/auth-context";
import { Flag, Inboxes, Inbox } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const AddDeprtment = () => {    
    const {isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler} = useInput(value=>value.trim() !== '');
    const namevalid = nameHasError?"form-control is-invalid":"form-control";
    const [budata, setBudata] = useState([]);  
    const [bldata, setBldata] = useState([]);  
    const nameRef = useRef();
    const buRef = useRef();
    const blRef = useRef();
    const navigate = useNavigate();
    const authctx = useContext(AuthContext);

    useEffect(async () => {
        await axios.get('http://localhost:8000/businessunit/read',{headers: {Authorization: "Bearer "+authctx.token}})
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
        // axios.get('http://localhost:8000/businessunit/blByBu',{params: {id: buRef.current.value}},{headers: {Authorization: "Bearer "+authctx.token}})
        // .then(response=>{
        //     const table = (response.data.map(d=>{
        //         return{
        //             id: d.id,
        //             name:d.name,
        //         } 
        //     }))
        //     setBldata(table);
        // }).catch(error=>{
        //     console.error(error);
        // }) 
    },[buRef])
    // console.log(buRef.current.value)
    useEffect(async() => {
        // axios.get('http://localhost:8000/businessunit/read',{headers: {Authorization: "Bearer "+authctx.token}})
        // .then(response=>{
        //     const table = (response.data.map(d=>{
        //         return{
        //             id: d.id,
        //             name:d.name,
        // })
        await buRef.current.value.map(v => {
            axios.get('http://localhost:8000/businessunit/blByBu',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}})
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

        })
    },[bldata])
    const submithandler = (event) => {
        event.preventDefault(); 
        const name = nameRef.current.value;
        const bu = buRef.current.value;
        const bl = blRef.current.value;
        var businessunit = bu.map(v=>{
            return "/api/businessunits/"+v 
        })
        var businessline = bl.map(v=>{
            return "/api/businesslines/"+v 
        })
        const body = {
            "name": name,
            "businessunit": businessunit,
            "businessline": businessline
        }
        console.log(body);
        axios.post('http://localhost:8000/api/departments',body,{headers: {Authorization: "Bearer "+authctx.token}})
        .then(function (response) {
            console.log(response);
            NotificationManager.success('The Department has been successfully added !');
        })
        .catch(function (error) {
            console.log(error);
            NotificationManager.error('The Department has not been added !');
        });
        navigate('/administration/departments');  
    }

    return(
        <div className="card-body">
            <form className="needs-validation" onSubmit={submithandler}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Department - Pole<span className="text-danger">*</span></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Flag size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} placeholder="Name of department - pole"/>
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
                                <Selec multi={true} ref={buRef} data={budata} full={true} placeholder={{name: "Select Business Unit(s)"}}/>
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
                                <Selec multi={true} ref={blRef} data={bldata} full={true} placeholder={{name: "Select Business Line(s)"}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <AddFormButtons valid={nameIsValid} cancel={"/administration/departments"}/>
            </form>
        </div>
    )
}
export default AddDeprtment;