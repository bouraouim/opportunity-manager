import EditFormButtons from "./editButtonsForm";
import Selec from "../addForms/select";
import axios from 'axios';
import { useState,useEffect,useRef, useContext} from 'react';
import { useNavigate,useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { Inbox, Inboxes } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const EditBusinessLine = () => {
  const [budata, setBudata] = useState([]);
  const [bldata, setbldata] = useState({});
  const nameRef = useRef();
  const buRef = useRef();
  var { id } = useParams();
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:8000/api/businesslines/'+id,{headers: {Authorization: "Bearer "+authctx.token}})
    .then(response=>{
      console.log(response.data)
      setbldata(response.data)
    })
    axios.get('http://localhost:8000/businessunit/read',{headers: {Authorization: "Bearer "+authctx.token}}) 
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
  },[])
  const submithandler=(event)=>{
    event.preventDefault(); 
    const inputname = nameRef.current.value;
    const buInput = buRef.current.value;
    var body = {}
    if (inputname.trim() !== ''){
      body["name"]=inputname
    }
    if(buInput.length !== 0){
      var bu = buInput.map(v=>{
      return "/api/businessunits/"+v 
      })
      body["businessunit"] = bu;
    }
    console.log(body)
    axios.patch('http://localhost:8000/api/businesslines/'+id,body,{headers: {
      'Content-Type': 'application/merge-patch+json',
      Authorization: "Bearer "+authctx.token
    }})
    .then(function (response) {
      NotificationManager.success('The Business Line has been successfully updated !');
      console.log(response);
    })
    .catch(function (error) {
      NotificationManager.error('The Business Line has not been updated !');
      console.log(error);
    });
    navigate('/administration/businessLines');
  }

  return ( 
    <div className="card-body">
      <form className="needs-validation" onSubmit={submithandler}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols1Input">Business line </label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Inbox size={17}/></span>
                </div>
                <input type="text" ref={nameRef}  className="form-control" id="example3cols1Input"  placeholder={bldata.name}/>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols3Input">Business Unit</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Inboxes size={17}/></span>
                </div>
                <Selec multi={true} full={false} ref={buRef} placeholder={bldata.businessunit} data={budata} />
              </div>
            </div>
          </div>
        </div>
        <EditFormButtons valid={true} cancel={"/administration/businessLines"}/>
      </form>
    </div>
  );    
}
export default EditBusinessLine;