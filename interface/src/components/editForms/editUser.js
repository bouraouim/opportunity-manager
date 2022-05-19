import EditFormButtons from './editButtonsForm';
import Selec from '../addForms/select';
import { useState,useRef,useEffect, useContext } from "react";
import AuthContext from '../../store/auth-context';
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios';
import { Envelope, Person, PersonCircle, Inboxes, Inbox, Flag, Map } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const EditUser = () => {

    const emailRef=useRef();
  const buRef=useRef();
  const fnameRef=useRef();
  const loginRef=useRef();
  const lnameRef=useRef();
  const roleRef=useRef();
  const departmentRef=useRef();
  const blRef=useRef();
  const areaRef=useRef();
  
  const [budata , setBudata]=useState([])
  const [bldata , setBldata]=useState([])
  const [roledata , setRoledata]=useState([])
  const [areadata , setareadata]=useState([])
  const [departmentdata , setdepartmentdata]=useState([])
  const [userdata,setuserdata]=useState({})
  var { id } = useParams();
  const authctx=useContext(AuthContext)
  
  useEffect(()=>{
    axios.get('http://localhost:8000/api/users/'+id,{headers: {Authorization: "Bearer "+authctx.token}})
     .then(response=>{
      console.log(response.data)
      setuserdata(response.data)
     })


      //businessunit
      axios.get('http://localhost:8000/businessunit/read',{headers: {Authorization: "Bearer "+authctx.token}}) 
      .then(response=>{
          const table=(response.data.map(d=>{
              return{
                  id: d.id,
                  name:d.name,
              } 
          }))
          setBudata(table)
      }).catch(error=>{
        console.error(error);
      }) 

      //businessline
      axios.get('http://localhost:8000/businessline/read',{headers: {Authorization: "Bearer "+authctx.token}}) 
      .then(response=>{
          const table=(response.data.map(d=>{
              return{
                  id: d.id,
                  name:d.name,
              } 
          }))
          setBldata(table)
      }).catch(error=>{
        console.error(error);
      }) 

      //Role
      axios.get('http://localhost:8000/role/read',{headers: {Authorization: "Bearer "+authctx.token}}) 
      .then(response=>{
          const table=(response.data.map(d=>{
              return{
                  id: d.id,
                  name:d.name,
              } 
          }))
          setRoledata(table)
      }).catch(error=>{
        console.error(error);
      }) 

      //department
      axios.get('http://localhost:8000/department/read',{headers: {Authorization: "Bearer "+authctx.token}}) 
      .then(response=>{
          const table=(response.data.map(d=>{
              return{
                  id: d.id,
                  name:d.name,
              } 
          }))
          setdepartmentdata(table)
      }).catch(error=>{
        console.error(error);
      }) 

      //area
      axios.get('http://localhost:8000/area/read',{headers: {Authorization: "Bearer "+authctx.token}}) 
      .then(response=>{
          const table=(response.data.map(d=>{
              return{
                  id: d.id,
                  name:d.name,
              } 
          }))
          setareadata(table)
      }).catch(error=>{
        console.error(error);
      }) 
  },[])




  // submit handler
  const navigate=useNavigate();
  const submithandler=(event)=>{
    event.preventDefault(); 
      const inputemail=emailRef.current.value
      const inputbl=blRef.current.value
      const inputfname=fnameRef.current.value
      const inputlname=lnameRef.current.value
      const inputldepartment=departmentRef.current.value
      const inputlrole=roleRef.current.value
      const inputlogin=loginRef.current.value
      const buinput=buRef.current.value
      const areainput=areaRef.current.value
     
     var body={
    }
    if (inputemail.trim() !== ''){
        body["email"]=inputemail
    }
    if (inputlogin.trim() !== ''){
        body["login"]=inputlogin
    }
    if (inputfname.trim() !== ''){
        body["firstname"]=inputfname
    }
    if (inputlname.trim() !== ''){
        body["lastname"]=inputlname
    }
    if(buinput.length !== 0){
      var bu=buinput.map(v=>{
        return("/api/businessunits/"+v)
      })
      body["businessunit"]=bu
      console.log(buinput)
    }
    if(inputlrole.length !== 0){
      var bu=inputlrole.map(v=>{
        return("/api/roles/"+v)
      })
      body["role"]=bu
    }
    if(inputldepartment.length !== 0){
      var bu=inputldepartment.map(v=>{
        return{"id":v}
      })
      body["department"]=bu
    }
    if(inputbl.length !== 0){
      var bu=inputbl.map(v=>{
        return("/api/businesslines/"+v)
      })
      body["businessline"]=bu
    }
    if(areainput.length !== 0){
      var bu=areainput.map(v=>{
        return("/api/areas/"+v)
      })
      body["area"]=bu
    }
    console.log(body)
    axios.patch('http://localhost:8000/api/users/'+id,body,{headers: {
        'Content-Type': 'application/merge-patch+json' ,
        Authorization: "Bearer "+authctx.token
      }})
    .then(response=> {
      NotificationManager.success('The User has been successfully updated !');
      console.log(body);
    })
    .catch(function (error) {
      NotificationManager.error('The User has not been updated !');
      console.log(error);
    });
    navigate('/administration/users')  
  }

  return ( 
    <div className="card-body">
      <form className="needs-validation" onSubmit={submithandler}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols1Input">Email </label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Envelope size={17}/></span>
                </div>
                <input type="text" ref={emailRef} type="email" disabled  className="form-control"  id="example3cols1Input"  placeholder={userdata.email}/>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols1Input">Login </label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={loginRef}  className="form-control"  id="example3cols1Input"  placeholder={userdata.password}/>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols1Input">first name </label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={fnameRef} className="form-control" id="example3cols1Input"  placeholder={userdata.firstname}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols1Input">Last name </label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={lnameRef} className="form-control" id="example3cols1Input"  placeholder={userdata.lastname}/>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label" >Roles</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><PersonCircle size={17}/></span>
                </div>
                <Selec multi={true} ref={roleRef} full={false} placeholder={userdata.role}  data={roledata} ></Selec>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols2Input">Business Unit</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Inboxes size={17}/></span>
                </div>
                <Selec multi={true} ref={buRef} full={false} placeholder={userdata.businessunit}  data={budata} ></Selec>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols1Input">Business line</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Inbox size={17}/></span>
                </div>
                <Selec multi={true} ref={blRef} full={false} placeholder={userdata.businessline} data={bldata} ></Selec>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols2Input">Pole/Department</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Flag size={17}/></span>
                </div>
                <Selec multi={true} ref={departmentRef} full={false} placeholder={userdata.department} data={departmentdata} ></Selec>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols2Input">Area</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Map size={17}/></span>
                </div>
                <Selec multi={true} ref={areaRef} full={false} placeholder={userdata.area} data={areadata} ></Selec>
              </div>
            </div>
          </div>
        </div>
        <EditFormButtons cancel={"/administration/users"} valid={true} />
      </form>
    </div>
  )
}
 
export default EditUser;