import Selec from "../addForms/select";
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import EditFormButtons from "./editButtonsForm";
import AuthContext from "../../store/auth-context";
import "../../index.css";
import { Flag, Inboxes, Inbox } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const EditDepartment = () => {
    const [budata, setBudata] = useState([]);  
    const [bldata, setBldata] = useState([]);  
    const nameRef = useRef();
    const buRef = useRef();
    const blRef = useRef();
    const navigate = useNavigate();
    var { id } = useParams();
    const authctx = useContext(AuthContext);
    const [department, setDepartment] = useState([]);
    
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
        axios.get('http://localhost:8000/api/departments/'+id,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setDepartment(response.data);
        })
    },[])
    const submithandler = (event) => {
        event.preventDefault(); 
        const name = nameRef.current.value;
        const bu = buRef.current.value;
        const bl = blRef.current.value;
        const body = { };
        if (name.trim() !== ''){
            body["name"] = name;
        }
        if(bu.length !== 0){
            var businessunit = bu.map(v=>{
                return "/api/businessunits/"+v 
            })
            body["businessunit"] = businessunit;
        }
        if(bl.length !== 0){
            var businessline = bl.map(v=>{
                return "/api/businesslines/"+v 
            })
            body["businessline"] = businessline;
        }
        axios.patch('http://localhost:8000/api/departments/'+id,body,{headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: "Bearer "+authctx.token
        }})
        .then(function (response) {
            NotificationManager.success('The Department has been successfully updated !');
            console.log(response);
        })
        .catch(function (error) {
            NotificationManager.error('The Department has not been updated !');
            console.log(error);
        });
        navigate('/administration/departments');
    }

    return(
        <div className="card-body">
            <form className="needs-validation" onSubmit={submithandler}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Department - Pole</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Flag size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} className="form-control edit" placeholder={department.name}/>
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
                                <Selec multi={true} ref={buRef} data={budata} full={false} placeholder={department.businessunit}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Business Line</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Inbox size={17}/></span>
                                </div>
                                <Selec multi={true} ref={blRef} data={bldata} full={false} placeholder={department.businessline}/>
                            </div>
                        </div>
                    </div>
                </div>
                <EditFormButtons valid={true} cancel={"/administration/departments"}/>
            </form>
        </div>
    )
}
export default EditDepartment;