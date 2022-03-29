import useInput from "../../hooks/user-input"
import FormButtons from "./formbuttons"; 
import  { useState,useEffect,useRef, useContext} from 'react'
import Selec from "./select";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";


const GeographyForm=()=>{
  const {value:countryValue,isValid:countryIsValid ,hasError:countryHasError, valueChangeHandler:countryChangeHandler , inputBlurHandler:countryBlurHandler, submissionHandler:submissionHandler}=useInput(value=>value.trim() !== '');
  const countryvalid=countryHasError?"form-control is-invalid":"form-control  "
  const [areadata , setareadata]=useState([])
  const[areavalid,setareavalid]=useState(false)

const authctx=useContext(AuthContext)

   const areahandler=(v)=>{
        setareavalid(v)
    }
    const[continentvalid,setcontinentvalid]=useState(false)

   const continenthandler=(v)=>{
    setcontinentvalid(v)
    }

  const countryRef=useRef();
  const areaRef=useRef();
  const continentRef=useRef();
  const multiple=true

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

const navigate=useNavigate();
const submithandler=(event)=>{
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
    "continent": continentinput 
      
  }
  axios.post('http://localhost:8000/api/geographies',body,{headers: {Authorization: "Bearer "+authctx.token}})
  .then(function (response) {
  })
  .catch(function (error) {
    console.log(error);
  });
  navigate('/administration/geography')  
}
const continentdata=[{id:"africa",name:"africa"},{id:"europe",name:"europe"}]

    return(
      

        <div className="card-body">
          <form className="needs-validation" onSubmit={submithandler}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Country <span className="text-danger ">*</span></label>
                <input onChange={countryChangeHandler} onBlur={countryBlurHandler} type="text" className={countryvalid} ref={countryRef} id="example3cols1Input" placeholder="name"/>
                {!countryIsValid && <div className="invalid-feedback">should not be empty</div>}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols2Input">Area <span className="text-danger ">*</span></label>
                <Selec multi={false} ref={areaRef} validHandler={areahandler}   data={areadata} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols3Input">Continent  <span className="text-danger ">*</span></label>
                <Selec multi={multiple} ref={continentRef} validHandler={continenthandler} data={continentdata} />
              </div>
            </div>
          </div>
          <FormButtons valid={countryIsValid &&continentvalid&&areavalid} cancel={"/administration/geography"}/>
          </form>
        </div>
    )
}
export default GeographyForm