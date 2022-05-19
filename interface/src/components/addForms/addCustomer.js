import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/user-input";
import AuthContext from "../../store/auth-context";
import AddFormButtons from "./addFormButtons";
import Selec from "./select";
import { Person, People, Globe2, Inboxes, Inbox, Flag, Map } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const AddCustomer = (props) => {
  const {isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler, submissionHandler:submissionHandler} = useInput(value=>value.trim() !== '');
  const namevalid = nameHasError?"form-control is-invalid":"form-control";
  const {isValid:groupIsValid, hasError:groupHasError, valueChangeHandler:groupChangeHandler, inputBlurHandler:groupBlurHandler} = useInput(value=>value.trim() !== '');
  const groupvalid = groupHasError?"form-control is-invalid":"form-control";
  const [budata, setBudata] = useState([]);
  const [bldata, setBldata] = useState([]);
  const [areadata, setareadata] = useState([]);
  const [departmentdata, setdepartmentdata] = useState([]);
  const [countrydata, setcountrydata] = useState([]);
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  var nameRef = useRef();
  var sapRef = useRef();
  var buRef = useRef();
  var groupRef = useRef();
  var countryRef = useRef();
  var departmentRef = useRef();
  var blRef = useRef();
  var areaRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:8000/businessunit/read', {headers: {Authorization: "Bearer "+authctx.token}}) 
    .then(response=>{
      const table = (response.data.map(d=>{
        return{
          id: d.id,
          name:d.name,
        } 
      }))
      setBudata(table)
    }).catch(error=>{
      console.error(error);
    })
    axios.get('http://localhost:8000/businessline/read', {headers: {Authorization: "Bearer "+authctx.token}}) 
    .then(response=>{
      const table = (response.data.map(d=>{
        return{
          id: d.id,
          name:d.name,
        } 
      }))
      setBldata(table)
    }).catch(error=>{
      console.error(error);
    })
    axios.get('http://localhost:8000/department/read', {headers: {Authorization: "Bearer "+authctx.token}}) 
    .then(response=>{
      const table = (response.data.map(d=>{
        return{
            id: d.id,
            name:d.name,
        } 
      }))
      setdepartmentdata(table)
    }).catch(error=>{
      console.error(error);
    })
    axios.get('http://localhost:8000/area/read', {headers: {Authorization: "Bearer "+authctx.token}}) 
    .then(response=>{
      const table = (response.data.map(d=>{
        return{
            id: d.id,
            name:d.name,
        } 
      }))
      setareadata(table)
    }).catch(error=>{
      console.error(error);
    }) 
    axios.get('http://localhost:8000/geography/read', {headers: {Authorization: "Bearer "+authctx.token}}) 
    .then(response=>{
      const table = (response.data.map(d=>{
        return{
            id: d.id,
            name: d.country,
        } 
      }))
      setcountrydata(table)
    }).catch(error=>{
      console.error(error);
    }) 
  },[])
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
    var body = {
      "name": inputname,
      "custGroup":grpinput,
    }
    if(inputsap.length !== 0){
      body["sapPartner"] = inputsap;
    }
    if(sapRef.current.value.length !== 0){
    
      body["sapPartner"]=inputsap
    }else{
      body["sapPartner"]=""}
    if(buinput.length !== 0){
      var bu = buinput.map(v=>{
        return{"id":v}
      })
      body["businessunit"] = bu;
    }
    if(inputdepartment.length !== 0){
      var bu = inputdepartment.map(v=>{
        return{"id":v}
      })
      body["department"] = bu;
    }
    if(inputbl.length !== 0){
      var bu = inputbl.map(v=>{
        return{"id":v}
      })
      body["businessline"] = bu;
    }
    if(areainput.length !== 0){
      var bu = areainput.map(v=>{
        return{"id":v}
      })
      body["areas"] = bu;
    }
    if(inputcountry.length !== 0){
      var bu = inputcountry.map(v=>{
        return{"id":v}
      })
      body["count"] = bu;
    }
    if(inputcountry.length !== 0){
      body["country"]=inputcountry[0]
      }
    else{
       body["country"]=""}
    console.log(body)
    axios.post('http://localhost:8000/api/customers',body,{headers: {Authorization: "Bearer "+authctx.token}})
    .then(response=> {
      NotificationManager.success('The Customer has been successfully added !');
      console.log(body);
    })
    .catch(function (error) {
      NotificationManager.error('The Customer has not been added !');
      console.log(error);
    });
    // navigate('/administration/customers')  
  }

  return(
    <div className="card-body">
      <form className="needs-validation" onSubmit={submithandler}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Customer<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} placeholder="Name of Customer"/>
                {!nameIsValid && <div className="invalid-feedback">Should not be empty</div>}
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
                <input type="text" ref={sapRef} className="form-control" placeholder="SAP Partner"/>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Business Unit</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Inboxes size={17}/></span>
                </div>
                <Selec multi={true} ref={buRef} full={false} data={budata} placeholder={{name: "Select Business Unit(s)"}}></Selec>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Business Line</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Inbox size={17}/></span>
                </div>
                <Selec multi={true} ref={blRef} full={false} data={bldata} placeholder={{name: "Select Business Line(s)"}}></Selec>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Pole/Department</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Flag size={17}/></span>
                </div>
                <Selec multi={true} ref={departmentRef} full={false} data={departmentdata} placeholder={{name: "Select Department(s)"}}></Selec>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Customer Group<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><People size={17}/></span>
                </div>
                <input type="text" onChange={groupChangeHandler} onBlur={groupBlurHandler} className={groupvalid} ref={groupRef} placeholder="Name of Customer Group"/>
                {!groupIsValid && <div className="invalid-feedback">Should not be empty</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Country</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Globe2 size={17}/></span>
                </div>
                <Selec multi={true} ref={countryRef} data={countrydata} full={false}  placeholder={{name: "Select one or multiple Countries"}}></Selec>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Area</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Map size={17}/></span>
                </div>
                <Selec multi={true} ref={areaRef} full={false} data={areadata} placeholder={{name: "Select Areas(s)"}}></Selec>
              </div>
            </div>
          </div>
        </div>
        <AddFormButtons valid={nameIsValid&&groupIsValid} cancel={"/administration/customers"}/>
      </form>
    </div>
  )
}
export default AddCustomer;