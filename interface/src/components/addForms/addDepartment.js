import useInput from "../../hooks/user-input";
import Selec from "./select";
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AddFormButtons from "./addFormButtons";
import AuthContext from "../../store/auth-context";
import { Flag } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';
import Selecthook from "../../hooks/selec-input";

const AddDeprtment = () => {    
    const {isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler} = useInput(value=>value.trim() !== '');
    const {buChoiceHandler, areaChoiceHandler, blChoiceHandler, changeAreaInit, changeBlInit, changeBuInit, choiceBu, choiceBl, choiceArea,bldata, departmentdata, areadata, geographyData, budata, initBu, initBl, initArea, initDep} = Selecthook();
    const namevalid = nameHasError?"form-control is-invalid":"form-control";
    const nameIconValid = nameHasError?"input-group-text invalide":"input-group-text";
    const [choice, setchoice] = useState(true);
    const [buValid, setBuValid] = useState(false);
    const [blValid, setBlValid] = useState(false);
    const nameRef = useRef();
    const buRef = useRef();
    const blRef = useRef();
    const navigate = useNavigate();
    const authctx = useContext(AuthContext);
    // useEffect(() => {
    //     axios.get('http://localhost:8000/businessunit/buHavingBl',{headers: {Authorization: "Bearer "+authctx.token}})
    //     .then(response=>{
    //         const table = (response.data.map(d=>{
    //             return{
    //                 id: d.id,
    //                 name:d.name,
    //             } 
    //         }))
    //         setBudata(table);
    //     }).catch(error=>{
    //         console.error(error);
    //     })
    // },[])
    // const choiceHandler = (event, s) => {
    //     if((event.target.value).length > 0){
    //         setchoice(false);
    //         setBuValid(true);
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
    //         setBuValid(false);
    //     }
    // }
    // const blChoiceHandler = (event, s) => {
    //     if((event.target.value).length > 0)
    //       setBlValid(true);
    //     else
    //       setBlValid(false);
    // }
    useEffect(() => {
        console.log(buValid)
    }, [buValid]);
    const blhandler = (v) => {
        setBlValid(v)
    }
    const buhandler = (v) => {
        setBuValid(v)
    }
    //Add Function
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
                                    <span className={nameIconValid}><Flag size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} placeholder="Name of department - pole"/>
                                {!nameIsValid && <div className="invalid-feedback">Name of Department should not be empty</div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Selec multi={true} ref={buRef} onchange={buhandler} choiceHandler={buChoiceHandler} name={"buuuuu"} changeInit={changeBuInit} full={true} data={budata} placeholder={{name: "Select Business Unit(s)"}} selecType={"Business Unit"} required={true}></Selec>
                    </div>
                    <div className="col-md-4">
                        <Selec multi={true} ref={blRef} onchange={blhandler} full={true} choiceHandler={blChoiceHandler} name={"blll"} changeInit={changeBlInit} init={initBu} choice={choiceBu} data={bldata} placeholder={{name: "Select Business Line(s)"}} selecType={"Business Line"} required={true}></Selec>
                    </div>
                </div>
                <AddFormButtons valid={nameIsValid && buValid && blValid} cancel={"/administration/departments"}/>
            </form>
        </div>
    )
}
export default AddDeprtment;