import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../../hooks/user-input";
import AuthContext from "../../store/auth-context";
import Selec from "../addForms/select";
import { Person, People, Globe2, Inboxes, Inbox, Flag, Map } from "react-bootstrap-icons";
import EditFormButtons from "./editButtonsForm";
import { NotificationManager } from 'react-notifications';

const EditCustomer = (props) => {
  const [budata, setBudata] = useState([]);
  const [bldata, setBldata] = useState([]);
  const [areadata, setareadata] = useState([]);
  const [departmentdata, setdepartmentdata] = useState([]);
  const [countrydata, setcountrydata] = useState([]);
  const [customer, setCustomer] = useState([]);
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
    axios.get('http://localhost:8000/api/customers/'+id,{headers: {Authorization: "Bearer "+authctx.token}}) 
    .then(response=>{
      setCustomer(response.data);
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
    if(inputdepartment.length !== 0){
      var bu = inputdepartment.map(v=>{
        return "/api/departments/"+v 
      })
      body["department"] = bu;
    }
    if(inputbl.length !== 0){
      var bu = inputbl.map(v=>{
        return "/api/businesslines/"+v 
      })
      body["businessline"] = bu;
    }
    if(areainput.length !== 0){
      var bu = areainput.map(v=>{
        return "/api/areas/"+v 
      })
      body["areas"] = bu;
    }
    if(inputcountry.length !== 0){
      var bu = inputcountry.map(v=>{
        return "/api/geographies/"+v 
      })
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
            <div className="form-group">
              <label className="form-control-label">Business Unit</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Inboxes size={17}/></span>
                </div>
                <Selec multi={true} ref={buRef} full={false} data={budata} placeholder={customer.businessunit}></Selec>
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
                <Selec multi={true} ref={blRef} full={false} data={bldata} placeholder={customer.businessline}></Selec>
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
                <Selec multi={true} ref={departmentRef} full={false} data={departmentdata} placeholder={customer.department}></Selec>
              </div>
            </div>
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
            <div className="form-group">
              <label className="form-control-label">Country</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Globe2 size={17}/></span>
                </div>
                <Selec multi={true} ref={countryRef} data={countrydata} full={false} placeholder={customer.count}></Selec>
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
                <Selec multi={true} ref={areaRef} full={false} data={areadata} placeholder={customer.areas}></Selec>
              </div>
            </div>
          </div>
        </div>
        <EditFormButtons valid={true} cancel={"/administration/customers"}/>
      </form>
    </div>
  )
}
export default EditCustomer;