import Selec from "../addForms/select";
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import EditFormButtons from "./editButtonsForm";
import AuthContext from "../../store/auth-context";
import "../../index.css";
import { Flag } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';
import Selecthook from "../../hooks/selec-input";

const EditDepartment = () => {
    const {buChoiceHandler, areaChoiceHandler, blChoiceHandler, changeAreaInit, changeBlInit, changeBuInit, choiceBu, choiceBl, choiceArea,
            bldata, departmentdata, areadata, geographyData, budata, initBu, initBl, initArea, initDep} = Selecthook();
    const [choice, setchoice] = useState(true);
    const [buValid, setBuValid] = useState(true);
    const [blValid, setBlValid] = useState(true);
    const [department, setDepartment] = useState([]);
    const [req, setreq] = useState(false);
    const nameRef = useRef();
    const buRef = useRef();
    const blRef = useRef();
    const navigate = useNavigate();
    var { id } = useParams();
    const authctx = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:8000/api/departments/'+id,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setDepartment(response.data);
        })
    },[])
    // const choiceHandler = (event, s) => {
    //     if((event.target.value).length > 0){
    //         setchoice(false);
    //         setBlValid(false);
    //         event.target.value.map((v)=>{
    //             axios.get('http://localhost:8000/businessunit/blByBu',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
    //             .then(response=>{
    //                 const table=(response.data.map(d=>{
    //                     return{
    //                         id: d.id,
    //                         name:d.name,
    //                     } 
    //                 }))
    //                 if(event.target.value.length === 1){
    //                     setBldata(table);
    //                 }
    //                 else{
    //                     setBldata(Array.from(new Set((bldata.concat(table)).map(a => a.id)))
    //                     .map(id => {
    //                         return (bldata.concat(table)).find(a => a.id === id)
    //                     }));
    //                 }
    //             }).catch(error=>{
    //               console.error(error);
    //             })
    //         })
    //     }
    //     else {
    //         setchoice(true);
    //         setBlValid(true);
    //     }
    // }
    const blhandler = (v) => {
        setBlValid(v)
    }
    //Edit Function
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
        if(req){if(bl.length !== 0){
            var businessline = bl.map(v=>{
                return "/api/businesslines/"+v 
            })}else{var businessline=[]}
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

    const buchangehandler=()=>{
        setreq(true)
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
                        <Selec multi={true} ref={buRef} onchange={buchangehandler} choiceHandler={buChoiceHandler} name={"buuuuu"} changeInit={changeBuInit} full={false} data={budata} placeholder={department.businessunit} selecType={"Business Unit"} required={false}></Selec>
                        {req &&<div >other parametes that depend on business unit will be empty if you don't change them</div>}
                    </div>
                    <div className="col-md-4">                        
                        <Selec multi={true} ref={blRef} onchange={blhandler} full={false} choiceHandler={blChoiceHandler} name={"blll"} changeInit={changeBlInit} init={initBu} choice={choiceBu} data={bldata} placeholder={department.businessline} selecType={"Business Line"} required={false}></Selec>
                    </div>
                </div>
                <EditFormButtons valid={true} cancel={"/administration/departments"}/>
            </form>
        </div>
    )
}
export default EditDepartment;