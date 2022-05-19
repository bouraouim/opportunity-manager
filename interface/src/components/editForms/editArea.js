import Selec from "../addForms/select";
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import EditFormButtons from "./editButtonsForm";
import AuthContext from "../../store/auth-context";
import "../../index.css";
import { Map, Inboxes } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const EditArea = () => {
    const [budata, setBudata] = useState([]);  
    const nameRef = useRef();
    const buRef = useRef();
    var { id } = useParams();
    const [area, setArea] = useState([]);
    const authctx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/businessunit/read',{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
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
        axios.get('http://localhost:8000/api/areas/'+id,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setArea(response.data);
        })
    },[])
    const submithandler = (event) => {
        event.preventDefault();
        const area = nameRef.current.value;
        const buInput = buRef.current.value;
        var body = { }
        if(area.length !== 0){
            body["name"] = area;
        }        
        if(buInput.length !== 0){
            var bu = buInput.map(v=>{
            return "/api/businessunits/"+v 
            })
            body["businessunit"] = bu;
        }
        axios.patch('http://localhost:8000/api/areas/'+id,body,{headers: {
            'Content-Type': 'application/merge-patch+json', 
            Authorization: "Bearer "+authctx.token
          }})
        .then(response=> {
            NotificationManager.success('The Area has been successfully updated !');
            console.log(body);
        })
        .catch(function (error) {
            NotificationManager.error('The Area has not been updated !');
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
                            <label className="form-control-label">Area</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Map size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} className="form-control" placeholder={area.name}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-control-label">Business Unit</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Inboxes size={17}/></span>
                                </div>
                                <Selec multi={true} ref={buRef} data={budata} full={false} placeholder={area.businessunit}></Selec>
                            </div>
                        </div>
                    </div>
                </div>
                <EditFormButtons valid={true} cancel={"/administration/areas"}/>
            </form>
        </div>
    )
}
export default EditArea;