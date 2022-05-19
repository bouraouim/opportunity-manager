import useInput from "../../hooks/user-input";
import Selec from "./select";
import axios from 'axios';
import { useState, useEffect, useRef, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import AddFormButtons from "./addFormButtons";
import { Inbox, Inboxes } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const AddBusinessLine=()=>{
  const {isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler} = useInput(value=>value.trim() !== '');
  const namevalid = nameHasError?"form-control is-invalid":"form-control";
  const [budata, setBudata] = useState([]);
  const[buvalid, setbuvalid] = useState(false);
  const authctx = useContext(AuthContext);
  const nameRef = useRef();
  const buRef = useRef();
  const navigate = useNavigate();

  const buhandler = (v) => {
    setbuvalid(v)
    console.log(buvalid )
  }
  useEffect(() => {    
    console.log("zzzz")
    console.log(buvalid)
},[buvalid])
  useEffect(()=>{
    axios.get('http://localhost:8000/businessunit/read') 
    .then(response=>{
      console.log(response)
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
},[])
  const submithandler = (event) => {
    event.preventDefault(); 
    const inputname = nameRef.current.value;
    const buInput = buRef.current.value;
    var bu = buInput.map(v=>{
      return "/api/businessunits/"+v 
    })
    const body = {
      "name": inputname,
      "businessunit": bu
    }
    axios.post('http://localhost:8000/api/businesslines',body,{headers: {Authorization: "Bearer "+authctx.token}})
    .then(function (response) {
      console.log(response);
      NotificationManager.success('The Business Line has been successfully added !');
    })
    .catch(function (error) {
      NotificationManager.error('The Business Line has not been added !');
      console.log(error);
    });
    navigate('/administration/businessLines')  
  }

  return(
    <div className="card-body">
      <form className="needs-validation" onSubmit={submithandler}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols1Input">Business line<span className="text-danger "  >*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Inbox size={17}/></span>
                </div>
                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} id="example3cols1Input"  placeholder="Name of Business Line"/>
                {!nameIsValid && <div className="invalid-feedback">Should not be empty</div>}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-control-label" htmlFor="example3cols3Input">Business Unit<span className="text-danger ">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Inboxes size={17}/></span>
                </div>
                <Selec multi={true} ref={buRef} full={true} onchange={buhandler} data={budata} placeholder={{name: "Select a Business Unit"}} selectedValue=""/>
              </div>
            </div>
          </div>
        </div>
        <AddFormButtons valid={nameIsValid && buvalid} cancel={"/administration/businessLines"}/>
      </form>
    </div>
  )
}
export default AddBusinessLine;