import Selec from "../addForms/select";
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import EditFormButtons from "./editButtonsForm";
import AuthContext from "../../store/auth-context";
import "../../index.css";
import { Person, Inboxes, Inbox, Flag, Map } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const EditPresales = () => {
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
    var { id } = useParams();
    const authctx = useContext(AuthContext);
    const [presales, setPresales] = useState([]);
    
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
        axios.get('http://localhost:8000/api/presales/'+id,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setPresales(response.data);
        })
    },[])
    const submithandler = (event) => {
        event.preventDefault(); 
        const blInput = blRef.current.value;
        const nameInput = nameRef.current.value;
        const deptInput = deptRef.current.value;
        const buInput = buRef.current.value;
        const areaInput = areaRef.current.value;
        var body = { }
        if(nameInput.length !== 0){
            body["name"] = nameInput;
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
        axios.patch('http://localhost:8000/api/presales/'+id,body,{headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: "Bearer "+authctx.token
          }})
        .then(response=> {
          console.log(body);
          NotificationManager.success('The Presales Engineer has been successfully updated !');
        })
        .catch(function (error) {
            NotificationManager.error('The Presales Engineer has not been updated !');
          console.log(error);
        });        
        navigate('/administration/presales');
    }

    return(
        <div className="card-body">
            <form className="needs-validation" onSubmit={submithandler}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Presales Engineer</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Person size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} className="form-control edit" placeholder={presales.name}/>
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
                                <Selec multi={true} ref={buRef} full={false} data={budata} placeholder={presales.businessunit}></Selec>
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
                                <Selec multi={true} ref={blRef} full={false} data={bldata} placeholder={presales.businessline}></Selec>
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
                                <Selec multi={true} ref={deptRef} full={false} data={departmentdata} placeholder={presales.department}></Selec>
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
                                <Selec multi={true} ref={areaRef} full={false} data={areadata} placeholder={presales.areas}></Selec>
                            </div>
                        </div>
                    </div>
                </div>
                <EditFormButtons valid={true} cancel={"/administration/presales"}/>
            </form>
        </div>
    )
}
export default EditPresales;