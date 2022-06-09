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
        if(req){if(deptInput.length !== 0){
            var dept = deptInput.map(v=>{
                return "/api/departments/"+v 
            })}else{var dept=[]}
            body["department"] = dept;
        }
        if(req){if(blInput.length !== 0){
            var bl = blInput.map(v=>{
                return "/api/businesslines/"+v 
            })}else{var bl=[]}
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

    const buchangehandler=()=>{
        setreq(true)
       }

    const {buChoiceHandler,areaChoiceHandler,blChoiceHandler,changeAreaInit,changeBlInit,changeBuInit,choiceBu,choiceBl,choiceArea,
        bldata,departmentdata,areadata,geographyData,budata,initBu,initBl,initArea,initDep}=Selecthook()
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
                        <Selec multi={true} ref={buRef} onchange={buchangehandler} choiceHandler={buChoiceHandler} name={"buuuuu"}  changeInit={changeBuInit}  full={false} data={budata} placeholder={productLine.businessunit} selecType={"Business Unit"} required={false}></Selec>
                        {req &&<div >other parametes that depend on business unit will be empty if you don't change them</div>}
                    </div>
                    <div className="col-md-4">
                        
                        <Selec multi={true} ref={blRef}  full={false} choiceHandler={blChoiceHandler}  name={"blll"} changeInit={changeBlInit} init={initBu}   choice={choiceBu} data={bldata} placeholder={productLine.businessline} selecType={"Business Line"} required={false}></Selec>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Selec multi={true} ref={deptRef}  full={false} data={departmentdata} choiceHandler={deptChoiceHandler} choice={choiceBl} placeholder={productLine.department} selecType={"Pole / Department"} required={false}></Selec>
                    </div>
                </div>
                <EditFormButtons valid={true} cancel={"/administration/productLines"}/>
            </form>
        </div>
    )
}
export default EditProductLine;