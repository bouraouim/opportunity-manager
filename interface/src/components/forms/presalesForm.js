import useInput from "../../hooks/user-input"
import FormButtons from "./formbuttons"; 
import Selec from './select'
import { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const PresalesForm=()=>{
  const {value:emailValue,isValid:emailIsValid ,hasError:emailHasError, valueChangeHandler:emailChangeHandler , inputBlurHandler:emailBlurHandler}=useInput(value=>value.trim() !== '');
  const emailvalid=emailHasError?"form-control is-invalid":"form-control  "
  const {value:loginValue,isValid:loginIsValid ,hasError:loginHasError, valueChangeHandler:loginChangeHandler , inputBlurHandler:loginBlurHandler}=useInput(value=>value.trim() !== '');
  const loginvalid=loginHasError?"form-control is-invalid":"form-control  "
  const {value:fnameValue,isValid:fnameIsValid ,hasError:fnameHasError, valueChangeHandler:fnameChangeHandler , inputBlurHandler:fnameBlurHandler}=useInput(value=>value.trim() !== '');
  const fnamevalid=fnameHasError?"form-control is-invalid":"form-control  "
  const {value:lnameValue,isValid:lnameIsValid ,hasError:lnameHasError, valueChangeHandler:lnameChangeHandler , inputBlurHandler:lnameBlurHandler,submissionHandler:submissionHandler}=useInput(value=>value.trim() !== '');
  const lnamevalid=lnameHasError?"form-control is-invalid":"form-control  "
  
  var emailRef=useRef();
  var buRef=useRef();
  var fnameRef=useRef();
  var loginRef=useRef();
  var lnameRef=useRef();
  var roleRef=useRef();
  var departmentRef=useRef();
  var blRef=useRef();
  var areaRef=useRef();
  var multiple=false
  
  const [budata , setBudata]=useState([])
  const [bldata , setBldata]=useState([])
  const [roledata , setRoledata]=useState([])
  const [areadata , setareadata]=useState([])
  const [departmentdata , setdepartmentdata]=useState([])
  const [choice,setchoice]=useState(true)
  const [blvalue,setblvalue]=useState([])
  const [departmentvalue,setdepartmentvalue]=useState([])
  const [areavalue,setareavalue]=useState([])
  


  const choiceHandler=(event,s)=>{
    if((event.target.value).length>0){

      blRef.current.value=[]
      setchoice(false)
      let link=''
      event.target.value.map((v)=>{
        link=link+'&businessunit.id%5B%5D='+v
      })
      console.log(link)
        //businessline
        axios.get('http://localhost:8000/api/businesslines?page=1&pagination=false'+link) 
        .then(response=>{
            const table=(response.data["hydra:member"].map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setBldata(table)
        }).catch(error=>{
          console.error(error);
        }) 
        // //department
        // axios.get('http://localhost:8000/api/department?page=1&pagination=false'+link) 
        // .then(response=>{
        //     const table=(response.data.map(d=>{
        //         return{
        //             id: d.id,
        //             name:d.name,
        //         } 
        //     }))
        //     setdepartmentdata(table)
        // }).catch(error=>{
        //   console.error(error);
        // }) 
  
        // //area
        // axios.get('http://localhost:8000/api/area?page=1&pagination=false'+link) 
        // .then(response=>{
        //     const table=(response.data.map(d=>{
        //         return{
        //             id: d.id,
        //             name:d.name,
        //         } 
        //     }))
        //     setareadata(table)
        // }).catch(error=>{
        //   console.error(error);
        // })
        
    }
    else {setchoice(true)
    }
    setBldata([])
    setdepartmentdata([])
    setdepartmentvalue([])
    setblvalue([])
    setareavalue([])
    setareadata([])
  }
  
  const valueHandler=(v)=>{
    setblvalue(v)
  }
  
  useEffect(()=>{

      //businessunit
      axios.get('http://localhost:8000/businessunit/read') 
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
  
      //Role
      axios.get('http://localhost:8000/role/read') 
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
      console.log(blvalue)
     var body={
      "email": inputemail,
      "login":inputlogin,
      "firstname":inputfname,
      "lastname":inputlname,
    }
    if(buinput.length !== 0){
      var bu=buinput.map(v=>{
        return{"id":v}
      })
      body["businessunit"]=bu
    }
    if(inputlrole.length !== 0){
      var bu=inputlrole.map(v=>{
        return{"id":v}
      })
      body["role"]=bu
    }
    if(departmentvalue.length !== 0){
      var bu=departmentvalue.map(v=>{
        return{"id":v}
      })
      body["department"]=bu
    }
    if(blvalue.length !== 0){
     
      var bu=blvalue.map(v=>{
        return{"id":v}
      })
      body["businessline"]=bu
    }
    if(areavalue.length !== 0){
      var bu=areavalue.map(v=>{
        return{"id":v}
      })
      body["area"]=bu
    }
    console.log(body)
    axios.post('http://localhost:8000/api/userrs',body)
    .then(response=> {
      console.log(body);
    })
    .catch(function (error) {
      console.log(error);
    });
    navigate('/user')  
  }
    return (
        <div className="card-body">
            <form className="needs-validation" onSubmit={submithandler}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols1Input">Presales Engineer <span className="text-danger">*</span></label>
                            <input type="text" ref={emailRef} type="email" onChange={emailChangeHandler} onBlur={emailBlurHandler} className={emailvalid} id="example3cols1Input" placeholder="Presales Engineer"/>
                            {!emailIsValid && <div className="invalid-feedback">Should not be empty</div>}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols2Input">Business Unit</label>
                            <Selec multi={true} ref={buRef} choiceHandler={choiceHandler} full={false}  data={budata} ></Selec>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols1Input">Business line</label>
                            <Selec multi={true} ref={blRef} full={false} valueHandler={valueHandler} choice={choice}  data={bldata} ></Selec>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols2Input">Pole / Department</label>
                            <Selec multi={true} ref={buRef} choiceHandler={choiceHandler} full={false}  data={budata} ></Selec>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="example3cols1Input">Business line</label>
                            <Selec multi={true} ref={blRef} full={false} valueHandler={valueHandler} choice={choice}  data={bldata} ></Selec>
                        </div>
                    </div>
                </div>
                <FormButtons valid={emailIsValid}/>
            </form>
        </div>
    )
}
export default PresalesForm;