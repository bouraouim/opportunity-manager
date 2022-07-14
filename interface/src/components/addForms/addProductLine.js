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
import Selecthook from "../../hooks/selec-input";

const AddProductLine = () => {
    const {value:nameValue, isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler} = useInput(value=>value.trim() !== '');
    const namevalid = nameHasError?"form-control is-invalid":"form-control";
    const nameIconValid = nameHasError?"input-group-text invalide":"input-group-text";
    var nameRef = useRef();
    var buRef = useRef();
    var blRef = useRef();
    var deptRef = useRef();  
    const [blByDeptData, setBlByDepatData] = useState([]);
    const [deptValid, setDeptValid] = useState(false);
    const [buValid, setBuValid] = useState(false);
    const [blValid, setBlValid] = useState(false);
    const navigate = useNavigate();
    const authctx = useContext(AuthContext);
    const {buChoiceHandler, areaChoiceHandler, blChoiceHandler, changeAreaInit, changeBlInit, changeBuInit, choiceBu, choiceBl, choiceArea,
        bldata, departmentdata, areadata, geographyData, budata, initBu, initBl, initArea, initDep} = Selecthook()

    const operation = (list1, list2, isUnion = false) =>
    list1.filter(a => isUnion === list2.some(b => a.id === b.id));
    const inBoth = (list1, list2) => operation(list1, list2, true);
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
    //     axios.get('http://localhost:8000/businessline/blHavingDept',{headers: {Authorization: "Bearer "+authctx.token}}) 
    //     .then(response=>{
    //         const table=(response.data.map(d=>{
    //             return{
    //                 id: d.id,
    //                 name:d.name,
    //             }
    //         }))
    //         setBlByDepatData(table);
    //     }).catch(error=>{
    //       console.error(error);
    //     })
    // },[])
    // const buChoiceHandler = (event, s) => {
    //     if((event.target.value).length > 0){
    //         setChoiceBu(false);
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
    //                     setBldata(inBoth(table, blByDeptData));
    //                 }
    //                 else{
    //                     setBldata(inBoth(blByDeptData, Array.from(new Set((bldata.concat(table)).map(a => a.id)))
    //                     .map(id => {
    //                         return (bldata.concat(table)).find(a => a.id === id)
    //                     })));
    //                 }
    //             }).catch(error=>{
    //               console.error(error);
    //             })
    //         })
    //     }
    //     else {
    //         setChoiceBu(true);
    //         setChoiceBl(true);
    //         setBuValid(false);
    //     }
    // }
    // const blChoiceHandler = (event, s) => {
    //     if((event.target.value).length > 0){
    //         setChoiceBl(false);
    //         setBlValid(true);
    //         event.target.value.map((v)=>{
    //             axios.get('http://localhost:8000/businessline/deptByBl',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
    //             .then(response=>{
    //                 const table=(response.data.map(d=>{
    //                     return{
    //                         id: d.id,
    //                         name:d.name,
    //                     }
    //                 }))
    //                 if(event.target.value.length === 1){
    //                     setdepartmentdata(table);
    //                 }
    //                 else{
    //                     setdepartmentdata(Array.from(new Set((departmentdata.concat(table)).map(a => a.id)))
    //                     .map(id => {
    //                         return (departmentdata.concat(table)).find(a => a.id === id)
    //                     }));
    //                 }
    //             }).catch(error=>{
    //               console.error(error);
    //             })
    //         })
    //     }
    //     else {
    //         setChoiceBl(true);
    //         setBlValid(false);
    //     }
    // }
    const deptChoiceHandler = (event, s) => {
        if((event.target.value).length > 0)
          setDeptValid(true);
        else
          setDeptValid(false);
    }
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
    const blhandler = (v) => {
        setBlValid(v)
    }
    const buhandler = (v) => {
        console.log("zzzzz")
        setBuValid(v)
        setBlValid(false)
        setDeptValid(false)

    }
    const dephandler = (v) => {   
        setDeptValid(v)
    }

    useEffect(() => {
        console.log("blValid",  blValid)
    }, [blValid]);
    return (
        <div className="card-body">
            <form className="needs-validation" onSubmit={submithandler}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Product Line<span className="text-danger">*</span></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className={nameIconValid}><Flag size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} placeholder="Name of Product Line"/>
                                {!nameIsValid && <div className="invalid-feedback">Name of Product Line should not be empty</div>}
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
                <div className="row">
                    <div className="col-md-4">
                        <Selec multi={true} ref={deptRef} onchange={dephandler} init={initBl} full={true} data={departmentdata} choiceHandler={deptChoiceHandler} choice={choiceBl} placeholder={{name: "Select Department(s)"}} selecType={"Pole / Department"} required={true}></Selec>
                    </div>
                </div>
                <AddFormButtons valid={nameIsValid && buValid && blValid && deptValid} cancel={"/administration/productLines"}/>
            </form>
        </div>
    )
}
export default AddProductLine;