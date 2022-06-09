import useInput from "../../hooks/user-input"
import AddFormButtons from "./addFormButtons"; 
import  { useState,useEffect,useRef, useContext} from 'react'
import Selec from "./select";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { NotificationManager } from 'react-notifications';

const AddGeography=()=>{
  const {value:countryValue, isValid:countryIsValid, hasError:countryHasError, valueChangeHandler:countryChangeHandler, inputBlurHandler:countryBlurHandler, submissionHandler:submissionHandler} = useInput(value=>value.trim() !== '');
  const countryvalid = countryHasError?"form-control is-invalid":"form-control";
  const [areadata, setareadata] = useState([]);
  const [areavalid, setareavalid] = useState(false);
  const [continentvalid, setcontinentvalid] = useState(false);
  const authctx = useContext(AuthContext);
  const countryRef = useRef();
  const areaRef = useRef();
  const continentRef = useRef();
  const navigate = useNavigate();
  const continentdata=[{id:"asia",name:"asia"},{id:"europe",name:"europe"},{id:"north america",name:"north america"},{id:"africa",name:"africa"},{id:"antartica",name:"antartica"},{id:"south america",name:"south america"},{id:"oceania",name:"oceania"}]

  const areahandler = (v) => {
    setareavalid(v)
  }
  const continenthandler=(v)=>{
    setcontinentvalid(v)
  }
  useEffect(()=>{
    axios.get('http://localhost:8000/area/read') 
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
  const submithandler = (event) => {
    event.preventDefault(); 
    const inputcountry=countryRef.current.value
    const areainput=areaRef.current.value
    const continentinput=continentRef.current.value
    console.log(continentinput)
    const body={
      "country": inputcountry,
      "area": {
        "id": areainput
      },
      "continent": [continentinput] 
        
    }
    axios.post('http://localhost:8000/api/geographies',body,{headers: {Authorization: "Bearer "+authctx.token}})
    .then(function (response) {
      NotificationManager.success('The Geography has been successfully added !');
    })
    .catch(function (error) {
      NotificationManager.error('The Geography has not been added !');
      console.log(error);
    });
    navigate('/administration/geography')  
  }
  return(
    <div className="card-body">
      <form className="needs-validation" onSubmit={submithandler}>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label className="form-control-label">Country <span className="text-danger ">*</span></label>
            <input onChange={countryChangeHandler} onBlur={countryBlurHandler} type="text" className={countryvalid} ref={countryRef} placeholder="Country"/>
            {!countryIsValid && <div className="invalid-feedback">Country should not be empty</div>}
          </div>
        </div>
        <div className="col-md-4">
          <Selec multi={false} ref={areaRef} full={true} onchange={areahandler} data={areadata} placeholder={{name: "Select an Area"}} selecType={"Area"} required={true}/>
        </div>
        <div className="col-md-4">
          <Selec multi={false} ref={continentRef} full={true} onchange={continenthandler} data={continentdata} placeholder={{name: "Select Continent(s)"}} selecType={"Continent"} required={true}/>
        </div>
      </div>
      <AddFormButtons valid={countryIsValid && continentvalid && areavalid} cancel={"/administration/geography"}/>
      </form>
    </div>
  )
}
export default AddGeography;