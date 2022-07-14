import useInput from "../../hooks/user-input";
import Selec from './select';
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AddFormButtons from "./addFormButtons";
import AuthContext from "../../store/auth-context";
import { Person } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';
import Selecthook from "../../hooks/selec-input";

const AddPresales = () => {
    const {buChoiceHandler, areaChoiceHandler, blChoiceHandler, changeAreaInit, changeBlInit, changeBuInit, choiceBu, choiceBl, choiceArea,
            bldata, departmentdata, areadata, geographyData, budata, initBu, initBl, initArea, initDep} = Selecthook();
    const {isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler} = useInput(value=>value.trim() !== '');
    const namevalid = nameHasError?"form-control is-invalid":"form-control";
    const nameIconValid = nameHasError?"input-group-text invalide":"input-group-text";
    var nameRef = useRef();
    var buRef = useRef();
    var blRef = useRef();
    var areaRef = useRef();
    var deptRef = useRef();  
    const [blByDeptData, setBlByDepatData] = useState([]);
    const [choiceBuArea, setChoiceBuArea] = useState(true);
    const [blValid, setBlValid] = useState(false);
    const [deptValid, setDeptValid] = useState(false);
    const navigate = useNavigate();
    const authctx = useContext(AuthContext);

    // const operation = (list1, list2, isUnion = false) =>
    // list1.filter(a => isUnion === list2.some(b => a.id === b.id));
    // const inBoth = (list1, list2) => operation(list1, list2, true);
    // useEffect(() => {
    //     axios.get('http://localhost:8000/businessunit/buHavingBlAndArea',{headers: {Authorization: "Bearer "+authctx.token}}) 
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
    //         setChoiceBuArea(false);
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
    //             axios.get('http://localhost:8000/businessunit/areaByBu',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
    //             .then(response=>{
    //                 const table = (response.data.map(d=>{
    //                     return{
    //                         id: d.id,
    //                         name:d.name,
    //                     } 
    //                 }))
    //                 if(event.target.value.length === 1){
    //                     setareadata(table);
    //                 }
    //                 else{
    //                     setareadata(Array.from(new Set((areadata.concat(table)).map(a => a.id)))
    //                     .map(id => {
    //                         return (areadata.concat(table)).find(a => a.id === id)
    //                     }));
    //                 }
    //             }).catch(error=>{
    //                 console.error(error);
    //             })
    //         })
    //     }
    //     else {
    //         setChoiceBuArea(true);
    //     }
    // }
    // const blChoiceHandler = (event, s) => {
    //     if((event.target.value).length > 0){
    //         setChoiceBl(false);
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
    //     }
    // }
    //Add Function
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
                                    <span className={nameIconValid}><Person size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} placeholder="Name of Presales Engineer"/>
                                {!nameIsValid && <div className="invalid-feedback">Name of Presales Engineer should not be empty</div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Selec multi={true} ref={buRef} choiceHandler={buChoiceHandler} name={"buuuuu"} changeInit={changeBuInit} full={false} data={budata} placeholder={{name: "Select Business Unit(s)"}} selecType={"Business Unit"} required={false}></Selec>
                    </div>
                    <div className="col-md-4">
                        <Selec multi={true} ref={blRef} full={false} choiceHandler={blChoiceHandler} name={"blll"} changeInit={changeBlInit} init={initBu} choice={choiceBu} data={bldata} placeholder={{name: "Select Business Line(s)"}} selecType={"Business Line"} required={false}></Selec>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Selec multi={true} ref={deptRef} name={"depppp"} init={initBl} full={false} choice={choiceBl} data={departmentdata} placeholder={{name: "Select Department(s)"}} selecType={"Pole / Department"} required={false}></Selec>
                    </div>
                    <div className="col-md-4">
                        <Selec multi={true} ref={areaRef} full={false} choiceHandler={areaChoiceHandler} changeInit={changeAreaInit} init={initBu} choice={choiceBu} data={areadata} placeholder={{name: "Select Area(s)"}} selecType={"Area"} required={false}></Selec>
                    </div>
                </div>
                <AddFormButtons valid={nameIsValid} cancel={"/administration/presales"}/>
            </form>
        </div>
    )
}
export default AddPresales;