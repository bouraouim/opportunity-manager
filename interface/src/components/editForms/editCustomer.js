import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../../hooks/user-input";
import AuthContext from "../../store/auth-context";
import Selec from "../addForms/select";
import { Person, People } from "react-bootstrap-icons";
import EditFormButtons from "./editButtonsForm";
import { NotificationManager } from 'react-notifications';
import Selecthook from "../../hooks/selec-input";

const EditCustomer = (props) => {
  const {buChoiceHandler, areaChoiceHandler, blChoiceHandler, changeAreaInit, changeBlInit, changeBuInit, choiceBu, choiceBl, choiceArea,
    bldata ,departmentdata, areadata, geographyData, budata, initBu, initBl, initArea, initDep} = Selecthook();
  // const [budata, setBudata] = useState([]);
  // const [bldata, setBldata] = useState([]);
  // const [areadata, setareadata] = useState([]);
  // const [departmentdata, setdepartmentdata] = useState([]);
  const [countrydata, setcountrydata] = useState([]);
  const [blByDeptData, setBlByDepatData] = useState([]);
  const [areaByCountData, setAreaByCountData] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [req, setreq] = useState(false);
  // const [choiceBl, setChoiceBl] = useState(true);
  // const [choiceArea, setChoiceArea] = useState(true);
  const [blValid, setBlValid] = useState(true);
  const [deptValid, setDeptValid] = useState(true);
  const [areaValid, setAreaValid] = useState(true);
  const [countValid, setCountValid] = useState(true);
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  var { id } = useParams();
  var nameRef = useRef();
  var sapRef = useRef();
  var buRef = useRef();
  var groupRef = useRef();
  var countryRef = useRef();
  var departmentRef = useRef();
  var blRef = useRef();
  var areaRef = useRef();
  // const operation = (list1, list2, isUnion = false) =>
  // list1.filter(a => isUnion === list2.some(b => a.id === b.id));
  // const inBoth = (list1, list2) => operation(list1, list2, true);
  //Get data from DB
  useEffect(() => {
    axios.get('http://localhost:8000/api/customers/'+id,{headers: {Authorization: "Bearer "+authctx.token}}) 
    .then(response=>{
      setCustomer(response.data);
    })
  },[])
  // const buChoiceHandler = (event, s) => {
  //   if((event.target.value).length > 0){
  //     setChoiceBuArea(false);
  //     setBlValid(false);
  //     setDeptValid(false);
  //     setAreaValid(false);
  //     setCountValid(false);
  //     event.target.value.map((v)=>{
  //       axios.get('http://localhost:8000/businessunit/blByBu',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
  //       .then(response=>{
  //         const table=(response.data.map(d=>{
  //           return{
  //             id: d.id,
  //             name: d.name,
  //           }
  //         }))
  //         if(event.target.value.length === 1){
  //           setBldata(inBoth(table, blByDeptData));
  //         }
  //         else{
  //           setBldata(inBoth(blByDeptData, Array.from(new Set((bldata.concat(table)).map(a => a.id)))
  //           .map(id => {
  //             return (bldata.concat(table)).find(a => a.id === id)
  //           })));
  //         }
  //       }).catch(error=>{
  //         console.error(error);
  //       })
  //       axios.get('http://localhost:8000/businessunit/areaByBu',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
  //       .then(response=>{
  //         const table = (response.data.map(d=>{
  //           return{
  //             id: d.id,
  //             name: d.name,
  //           } 
  //         }))
  //         if(event.target.value.length === 1){
  //           setareadata(table);
  //         }
  //         else{
  //           setareadata(inBoth(areaByCountData, Array.from(new Set((areadata.concat(table)).map(a => a.id)))
  //           .map(id => {
  //             return (areadata.concat(table)).find(a => a.id === id)
  //           })));
  //         }
  //       }).catch(error=>{
  //         console.error(error);
  //       })
  //     })
  //   }
  //   else {
  //     setChoiceBuArea(true);
  //     setBlValid(true);
  //     setDeptValid(true);
  //     setAreaValid(true);
  //     setCountValid(true);
  //     setChoiceBl(true);
  //   }
  // }
  // const blChoiceHandler = (event, s) => {
  //   if((event.target.value).length > 0){
  //     setChoiceBl(false);
  //     setBlValid(true);
  //     event.target.value.map((v)=>{
  //       axios.get('http://localhost:8000/businessline/deptByBl',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
  //       .then(response=>{
  //         const table=(response.data.map(d=>{
  //           return{
  //             id: d.id,
  //             name: d.name,
  //           }
  //         }))
  //         if(event.target.value.length === 1){
  //           setdepartmentdata(table);
  //         }
  //         else{
  //           setdepartmentdata(Array.from(new Set((departmentdata.concat(table)).map(a => a.id)))
  //           .map(id => {
  //             return (departmentdata.concat(table)).find(a => a.id === id)
  //           }));
  //         }
  //       }).catch(error=>{
  //         console.error(error);
  //       })
  //     })
  //   }
  //   else {
  //     setChoiceBl(true);
  //     setBlValid(false);
  //   }
  // }
  // const areaChoiceHandler = (event, s) => {
  //   if((event.target.value).length > 0){
  //     setChoiceArea(false);
  //     setAreaValid(true);
  //     event.target.value.map((v)=>{
  //       axios.get('http://localhost:8000/area/getGeoByArea',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
  //       .then(response=>{
  //         const table=(response.data.map(d=>{
  //           return{
  //             id: d.id,
  //             name: d.country,
  //           }
  //         }))
  //         if(event.target.value.length === 1){
  //           setcountrydata(table);
  //         }
  //         else{
  //           setcountrydata(Array.from(new Set((countrydata.concat(table)).map(a => a.id)))
  //           .map(id => {
  //             return (countrydata.concat(table)).find(a => a.id === id)
  //           }));
  //         }
  //       }).catch(error=>{
  //         console.error(error);
  //       })
  //     })
  //   }
  //   else {
  //     setChoiceArea(true);
  //     setAreaValid(false);
  //   }
  // }
  // const deptChoiceHandler = (event, s) => {
  //   if((event.target.value).length > 0)
  //     setDeptValid(true);
  //   else
  //     setDeptValid(false);
  // }
  // const countChoiceHandler = (event, s) => {
  //   if((event.target.value).length > 0)
  //     setCountValid(true);
  //   else
  //     setCountValid(false);
  // }
  //Edit Function
  const submithandler = (event) => {
    event.preventDefault();
    const inputname = nameRef.current.value;
    const inputsap = sapRef.current.value;
    const inputbl = blRef.current.value;
    const inputcountry = countryRef.current.value;
    const inputdepartment = departmentRef.current.value;
    const buinput = buRef.current.value;
    const areainput = areaRef.current.value;
    const grpinput = groupRef.current.value;
    var body = { }
    if(inputname.length !== 0){
      body["name"] = inputname;
    }
    if(grpinput.length !== 0){
      body["custGroup"] = grpinput;
    }
    if(inputsap.length !== 0){
      body["sapPartner"] = inputsap;
    }
    if(buinput.length !== 0){
      var bu = buinput.map(v=>{
        return "/api/businessunits/"+v 
      })
      body["businessunit"] = bu;
    }
    if(req){if(inputdepartment.length !== 0){
      var bu = inputdepartment.map(v=>{
        return "/api/departments/"+v 
      })
      
    }else{var bu=[]}
    body["department"] = bu;}

    if(req){if(inputbl.length !== 0){
      var bu = inputbl.map(v=>{
        return "/api/businesslines/"+v 
      })}else{var bu=[]}
      body["businessline"] = bu;
    }

    if(req){if(areainput.length !== 0){
      var bu = areainput.map(v=>{
        return "/api/areas/"+v 
      })}else{var bu=[]}
      body["areas"] = bu;
    }
    if(req){if(inputcountry.length !== 0){
      var bu = inputcountry.map(v=>{
        return "/api/geographies/"+v 
      })}else{var bu=[]}
      body["count"] = bu;
    }
    console.log(body)
    axios.patch('http://localhost:8000/api/customers/'+id,body,{headers: {
      'Content-Type': 'application/merge-patch+json', 
      Authorization: "Bearer "+authctx.token
    }})
    .then(response=> {
      console.log(body);
      NotificationManager.success('The Customer has been successfully updated !');
    })
    .catch(function (error) {
      NotificationManager.error('The Customer has not been updated !');
      console.log(error);
    });        
    navigate('/administration/customers')
  }
   const buchangehandler=()=>{
    setreq(true)
   }
   const blhandler = (v) => {
    setBlValid(v)
  }
   const areahandler = (v) => {
    setAreaValid(v)
  }
   const countryhandler = (v) => {
    setCountValid(v)
  }
  const dephandler = (v) => {
    setDeptValid(v)
  }

  return(
    <div className="card-body">
      <form className="needs-validation" onSubmit={submithandler}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Customer</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={nameRef} className="form-control edit" placeholder={customer.name}/>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">SAP Partner</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={sapRef} className="form-control edit" placeholder={customer.sapPartner}/>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <Selec multi={true} ref={buRef} onchange={buchangehandler} choiceHandler={buChoiceHandler} name={"buuuuu"} changeInit={changeBuInit} full={false} data={budata} placeholder={customer.businessunit} selecType={"Business Unit"} required={false}></Selec>
            {req &&<div className="edit">Other parametes that depend on Business Unit will be empty if you don't change them</div>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Selec multi={true} ref={blRef} full={false} choiceHandler={blChoiceHandler} name={"blll"} changeInit={changeBlInit} init={initBu} choice={choiceBu} data={bldata} onchange={blhandler} placeholder={customer.businessline} selecType={"Business Line"} required={false}></Selec>
          </div>
          <div className="col-md-4">
            <Selec multi={true} ref={departmentRef} name={"depppp"} init={initBl} full={false} choice={choiceBl} data={departmentdata} placeholder={customer.department} onchange={dephandler} selecType={"Pole / Department"} required={false}></Selec>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Customer Group</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><People size={17}/></span>
                </div>
                <input type="text" className="form-control edit" ref={groupRef} placeholder={customer.custGroup}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Selec multi={true} ref={areaRef} full={false} choiceHandler={areaChoiceHandler} changeInit={changeAreaInit} init={initBu} choice={choiceBu} data={areadata} onchange={areahandler} placeholder={customer.areas} selecType={"Area"} required={false}></Selec>
          </div>
          <div className="col-md-4">
            <Selec multi={true} choice={choiceArea} onchange={countryhandler} ref={countryRef} full={false} init={initArea} data={geographyData} placeholder={customer.count} selecType={"Country"} required={false}></Selec>
          </div>
        </div>
        <EditFormButtons valid={blValid && deptValid && areaValid && countValid} cancel={"/administration/customers"}/>
      </form>
    </div>
  )
}
export default EditCustomer;