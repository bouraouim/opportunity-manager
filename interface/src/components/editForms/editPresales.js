import Selec from "../addForms/select";
import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import EditFormButtons from "./editButtonsForm";
import AuthContext from "../../store/auth-context";
import "../../index.css";
import { Person } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';
import Selecthook from "../../hooks/selec-input";

const EditPresales = () => {
    const {buChoiceHandler, areaChoiceHandler, blChoiceHandler, changeAreaInit, changeBlInit, changeBuInit, choiceBu, choiceBl, choiceArea,
            bldata, departmentdata, areadata, geographyData, budata, initBu, initBl, initArea, initDep} = Selecthook();
    var nameRef = useRef();
    var buRef = useRef();
    var blRef = useRef();
    var areaRef = useRef();
    var deptRef = useRef();  
    const [blByDeptData, setBlByDepatData] = useState([]);
    const [presales, setPresales] = useState([]);
    const [choiceBuArea, setChoiceBuArea] = useState(true);
    const [blValid, setBlValid] = useState(true);
    const [areaValid, setAreaValid] = useState(true);
    const [deptValid, setDeptValid] = useState(true);
    const [req, setreq] = useState(false);
    const navigate = useNavigate();
    var { id } = useParams();
    const authctx = useContext(AuthContext);
    
    const operation = (list1, list2, isUnion = false) =>
    list1.filter(a => isUnion === list2.some(b => a.id === b.id));
    const inBoth = (list1, list2) => operation(list1, list2, true);
    useEffect(() => {
        axios.get('http://localhost:8000/api/presales/'+id,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setPresales(response.data);
        })
    },[])
    const buchangehandler=()=>{
        setreq(true)
       }
   
    const deptChoiceHandler = (event, s) => {
        if((event.target.value).length > 0)
          setDeptValid(true);
        else
          setDeptValid(false);
    }
    //Edit Function
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
        if(req){if(areaInput.length !== 0){
            var area = areaInput.map(v=>{
                return "/api/areas/"+v 
            })}else{var bl=[]}
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
                        <Selec multi={true} ref={buRef} onchange={buchangehandler} choiceHandler={buChoiceHandler} name={"buuuuu"} changeInit={changeBuInit} full={false} data={budata} placeholder={presales.businessunit}selecType={"Business Unit"} required={false}></Selec>
                        {req &&<div >other parametes that depend on business unit will be empty if you don't change them</div>}                    </div>
                    <div className="col-md-4">
                        <Selec multi={true} ref={blRef} full={false} choiceHandler={blChoiceHandler} name={"blll"} changeInit={changeBlInit} init={initBu} choice={choiceBu} data={bldata} placeholder={presales.businessline} selecType={"Business Line"} required={false}></Selec>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Selec multi={true} ref={deptRef} name={"depppp"} init={initBl} full={false} choice={choiceBl} data={departmentdata} placeholder={presales.department} selecType={"Pole / Department"} required={false}></Selec>
                    </div>
                    <div className="col-md-4">
                        <Selec multi={true} ref={areaRef} full={false} choiceHandler={areaChoiceHandler} changeInit={changeAreaInit} init={initBu} choice={choiceBu} data={areadata} placeholder={presales.areas}  selecType={"Area"} required={false}></Selec>
                    </div>
                </div>
                <EditFormButtons valid={true} cancel={"/administration/presales"}/>
            </form>
        </div>
    )
}
export default EditPresales;