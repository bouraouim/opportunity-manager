import Selec from '../addForms/select';
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import EditFormButtons from "./editButtonsForm";
import AuthContext from "../../store/auth-context";
import "../../index.css";
import { Flag } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';
import Selecthook from '../../hooks/selec-input';

const EditProductLine = () => {
    var nameRef = useRef();
    var buRef = useRef();
    var blRef = useRef();
    var deptRef = useRef();  
    const [blByDeptData, setBlByDepatData] = useState([]);
    const [deptValid, setDeptValid] = useState(true);
    const [blValid, setBlValid] = useState(true);
    const navigate = useNavigate();
    var { id } = useParams();
    const authctx = useContext(AuthContext);
    const [productLine, setProductLine] = useState([]);
    const [req, setreq] = useState(false);

    const operation = (list1, list2, isUnion = false) =>
    list1.filter(a => isUnion === list2.some(b => a.id === b.id));
    const inBoth = (list1, list2) => operation(list1, list2, true);
    useEffect(() => {
        axios.get('http://localhost:8000/api/productlines/'+id,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setProductLine(response.data);
        })
    },[])
    
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
        console.log(body)
        axios.patch('http://localhost:8000/api/productlines/'+id,body,{headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: "Bearer "+authctx.token
          }})
        .then(response=> {
          console.log(body);
          NotificationManager.success('The Product Line has been successfully updated !');
        })
        .catch(function (error) {
          console.log(error);
          NotificationManager.error('The Product Line has not been updated !');
        });
        navigate('/administration/productLines');
    }

    // const buchangehandler=()=>{
    //     setBlValid(false)
    //     setDeptValid(false)
    //     setreq(true)
    //    }
    const blhandler = (v) => {
        setBlValid(v);
    }
    const depthandler = (v) => {
        setDeptValid(v);
    }

    const notfirstrender = useRef(true);
    const [buvalue, setbuvalue] = useState([]);
    const valueHandler = (v) => {
        setbuvalue(v);
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
                setDeptValid(true); 
            }
            else{
                setreq(true);
                setBlValid(false);
                setDeptValid(false);
            }
        }
    console.log(req);
    }, [buvalue]);
    const {buChoiceHandler, areaChoiceHandler, blChoiceHandler, changeAreaInit, changeBlInit, changeBuInit, choiceBu , choiceBl, choiceArea,
        bldata, departmentdata, areadata, geographyData, budata, initBu, initBl, initArea, initDep} = Selecthook();

    return (
        <div className="card-body">
            <form className="needs-validation" onSubmit={submithandler}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Product Line</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Flag size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} className="form-control edit" placeholder={productLine.name}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Selec multi={true} ref={buRef} valueHandler={valueHandler} choiceHandler={buChoiceHandler} name={"buuuuu"} changeInit={changeBuInit} full={false} data={budata} placeholder={productLine.businessunit} selecType={"Business Unit"} required={false}></Selec>
                        {req &&<div className="edit">Other parametes that depend on Business Unit will be empty if you don't change them</div>}
                    </div>
                    <div className="col-md-4">   
                        <Selec multi={true} ref={blRef} full={req} onchange={blhandler} choiceHandler={blChoiceHandler}  name={"blll"} changeInit={changeBlInit} init={initBu} choice={choiceBu} data={bldata} placeholder={productLine.businessline} selecType={"Business Line"} required={req}></Selec>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Selec multi={true} ref={deptRef} init={initBl} onchange={depthandler} full={req} data={departmentdata} choiceHandler={deptChoiceHandler} choice={choiceBl} placeholder={productLine.department} selecType={"Pole / Department"} required={req}></Selec>
                    </div>
                </div>
                <EditFormButtons valid={blValid && deptValid} cancel={"/administration/productLines"}/>
            </form>
        </div>
    )
}
export default EditProductLine;