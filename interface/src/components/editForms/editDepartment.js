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

    //Get Data from DB
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

    // const buchangehandler=()=>{
    //     console.log(buRef.current.value.length !== 0)
    //     if(buRef.current.value.length !== 0){
    //         console.log(buRef.current.value.length !== 0)

    //         setreq(false)
    //         setBlValid(true) 
    //     }else{
    //     setreq(true)
    //     setBlValid(false)
    // }
    //    }
    const notfirstrender = useRef(true);
    const [buvalue,setbuvalue]=useState([])
    const valueHandler=(v)=>{
        setbuvalue(v)
    }
    useEffect(() => {
        console.log(buvalue)
        if(notfirstrender.current){
            notfirstrender.current = false;
        } 
        else{
            if(buvalue.length == 0){
                setreq(false);
                setBlValid(true);
            }
            else{
                setreq(true);
                setBlValid(false);
            }
        }
        console.log(req)
    }, [buvalue]);

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
                        <Selec multi={true} ref={buRef} valueHandler={valueHandler} choiceHandler={buChoiceHandler} name={"buuuuu"} changeInit={changeBuInit} full={false} data={budata} placeholder={department.businessunit} selecType={"Business Unit"} required={false}></Selec>
                        {req &&<div className="edit">Other parametes that depend on Buusiness Unit will be empty if you don't change them</div>}
                    </div>
                    <div className="col-md-4">                        
                        <Selec multi={true} ref={blRef} onchange={blhandler} full={req} choiceHandler={blChoiceHandler} name={"blll"} changeInit={changeBlInit} init={initBu} choice={choiceBu} data={bldata} placeholder={department.businessline} selecType={"Business Line"} required={req}></Selec>
                    </div>
                </div>
                <EditFormButtons valid={blValid} cancel={"/administration/departments"}/>
            </form>
        </div>
    )
}
export default EditDepartment;