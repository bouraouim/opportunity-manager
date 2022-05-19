import Selec from "../addForms/select";
import { useState,useRef,useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import AuthContext from "../../store/auth-context";
import useInput from "../../hooks/user-input";



function Reportlist() {

    const {value:dateValue,isValid:dateIsValid ,hasError:dateHasError, valueChangeHandler:dateChangeHandler , inputBlurHandler:dateBlurHandler}=useInput(value=>value.trim() !== '');
  const datevalid=dateHasError?"form-control is-invalid":"form-control  "

    var buRef=useRef();
    var departmentRef=useRef();
    var blRef=useRef();
    var areaRef=useRef();
    var dateRef=useRef();
    var salesManagerRef=useRef();
    var ContinentRef=useRef();
    var countryRef=useRef();

    const [initBu,setInitBu]=useState(false) 
    const [initBl,setInitBl]=useState(false) 
    const [initArea,setInitArea]=useState(false) 
    const [initContinent,setInitContinent]=useState(false) 
    const [initDep,setInitDep]=useState(false) 
    const [budata , setBudata]=useState([])
    const [salesManagerData , setsalesManagerData]=useState([])
  const [bldata , setBldata]=useState([])
  const [areadata , setareadata]=useState([])
  const [departmentdata , setdepartmentdata]=useState([])
  const [geographyData , setgeographydata]=useState([])
  const [choiceContinent,setchoiceContinent]=useState(true)
  const [choiceBu,setchoiceBu]=useState(true)
  const [choiceBl,setchoiceBl]=useState(true)
  const [choiceArea,setchoiceArea]=useState(true)
  const [blvalue,setblvalue]=useState([])
  const [geographyvalue,setgeograohyvalue]=useState([])
  const [departmentvalue,setdepartmentvalue]=useState([])
  const [areavalue,setareavalue]=useState([])
  const [continentvalue,setContinentValue]=useState([])
  const authctx=useContext(AuthContext)
  const [linkBu,setLinkBu]=useState('')
  const [linkArea,setLinkArea]=useState('')

  const continentData=[{id:"asia",name:"asia"},{id:"europe",name:"europe"},{id:"north america",name:"north america"},{id:"africa",name:"africa"},{id:"antartica",name:"antartica"},{id:"south africa",name:"south africa"},{id:"oceania",name:"oceania"}]
  const countryData=[]


  const changeBuInit=()=>{
    setInitBu(!initBu)
  }
  const changeBlInit=()=>{
    setInitBl(!initBl)
  }
  const changeAreaInit=()=>{
    setInitArea(!initArea)
  }
  const changeContinentInit=()=>{
    setInitContinent(!initArea)
  }


  useEffect(()=>{
    setInitDep(!initDep)
  },[initBu,initBl])

  const blChoiceHandler=(event,s)=>{
    if((event.target.value).length>0){
        departmentRef.current.value=[]
        setchoiceBl(false)
        let link=''
        event.target.value.map((v)=>{
          link=link+'&businessline.id%5B%5D='+v
        })
        link=link+linkBu
        console.log('http://localhost:8000/api/departments?page=1&itemsPerPage=1&pagination=false'+link)
        //department
        axios.get('http://localhost:8000/api/departments?page=1&itemsPerPage=1&pagination=false'+link,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            const table=(response.data["hydra:member"].map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setdepartmentdata(table)
        }).catch(error=>{
          console.error(error);
        }) 
    }
    else {setchoiceBl(true)
    }
    setdepartmentdata([])
    setdepartmentvalue([])
  }

  const [continentLink,setContinentLink]=useState('')
  const [areaLink,setAreaLink]=useState('')

  useEffect(()=>{
    console.log(choiceArea && choiceContinent)
    axios.get('http://localhost:8000/api/geographies?page=1&itemsPerPage=1&pagination=false'+continentLink+areaLink,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            const table=(response.data["hydra:member"].map(d=>{
                return{
                    id: d.id,
                    name:d.country,
                } 
            }))
            setgeographydata(table)
        }).catch(error=>{
          console.error(error);
        }) 
  },[continentLink,areaLink])

  const continentChoiceHandler=(event,s)=>{
    if(((event.target.value).length>0) ){
        setchoiceContinent(false)
        let link=''
          link=link+'&continent='+event.target.value
setContinentLink(link)
        // link=link+linkBu
        console.log('http://localhost:8000/api/geographies?page=1&itemsPerPage=30&pagination=false'+link)
        //geo
    }
    else {setchoiceContinent(true)
    }
    setgeographydata([])
    setgeograohyvalue([])
  }
  const areaChoiceHandler=(event,s)=>{
    if(((event.target.value).length>0) ){
      countryRef.current.value=[]
        setchoiceArea(false)
        let link=''
        event.target.value.map((v)=>{
          link=link+'&area.id%5B%5D='+v
        })
        setAreaLink(link)
        console.log(link)
        // link=link+linkBu
        console.log('http://localhost:8000/api/geographies?page=1&itemsPerPage=30&pagination=false'+link)
        //geo
        
    }
    else {setchoiceArea(true)
    }
    setgeographydata([])
    setgeograohyvalue([])
  }

  const buChoiceHandler=(event,s)=>{
    blRef.current.value=[]
    if((event.target.value).length>0){
      
      setchoiceBu(false)
      let link=''
      event.target.value.map((v)=>{
        link=link+'&businessunit.id%5B%5D='+v
      })
      setLinkBu(link)
            //businessline
        axios.get('http://localhost:8000/api/businesslines?page=1&pagination=false'+link,{headers: {Authorization: "Bearer "+authctx.token}}) 
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
       
  
        //area
        axios.get('http://localhost:8000/api/areas?page=1&itemsPerPage=1&pagination=false'+link,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            const table=(response.data["hydra:member"].map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setareadata(table)
        }).catch(error=>{
          console.error(error);
        })
        
    }
    else {setchoiceBu(true)
    }
    setBldata([])
    setblvalue([])
    setareavalue([])
    setareadata([])
  }

  const blvalueHandler=(v)=>{
    setblvalue(v)
  }
  const depvalueHandler=(v)=>{
    setdepartmentvalue(v)
  }
  const areavalueHandler=(v)=>{
    setareavalue(v)
  }
  const continentvalueHandler=(v)=>{
    setContinentValue(v)
  }
  const geographyValueHandler=(v)=>{
    setgeograohyvalue(v)
  }

  const search=(event)=>{
    const buinput=buRef.current.value
    let link=''
    if(buinput.length !== 0){
        buinput.map(v=>{
            link=link+'&businessunit.id%5B%5D='+v
        })
      }
    if(departmentvalue.length !== 0){
       departmentvalue.map(v=>{
        link=link+'&department.id%5B%5D='+v
        })
      }
      if(blvalue.length !== 0){
        blvalue.map(v=>{
            link=link+'&department.id%5B%5D='+v
        })
      }
      if(areavalue.length !== 0){
        areavalue.map(v=>{
            link=link+'&department.id%5B%5D='+v
        })
      }
      console.log(link)
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
    axios.get('http://localhost:8000/api/users?page=1&itemsPerPage=30&pagination=false&anonymized=false&status=true&role.name%5B%5D=Sales%20Manager') 
    .then(response=>{
        console.log(response.data["hydra:member"])
        const table=(response.data["hydra:member"].map(d=>{
            return{
                id: d.id,
                name:d.firstname+' '+d.lastname,
            } 
        }))
        setsalesManagerData(table)
    }).catch(error=>{
      console.error(error);
    }) 
},[])
    return ( 
            <div class="card mt-5 mb-5 ml-5 mr-5 pl-4 pr-4">
            <div class="card-header">
          <h3 class="mb-0">list of opportunities</h3>
            </div>
        <div class="card-body">
        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <label class="form-control-label" for="example3cols1Input">Sales manager</label>
                    <Selec multi={false} ref={salesManagerRef} full={false} data={salesManagerData} placeholder={{name: "SalesMnager"}}></Selec>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label class="form-control-label" for="example3cols1Input">Business unit</label>
                    <Selec multi={true} ref={buRef} choiceHandler={buChoiceHandler} name={"buuuuu"} changeInit={changeBuInit}  full={false} data={budata} placeholder={{name: "Select Business Unit(s)"}}></Selec>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label class="form-control-label" for="example3cols1Input">Business line</label>
                    <Selec multi={true} ref={blRef} full={false} choiceHandler={blChoiceHandler} name={"blll"} changeInit={changeBlInit} init={initBu}  valueHandler={blvalueHandler} choice={choiceBu} data={bldata} placeholder={{name: "Select Business Line(s)"}}></Selec>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label class="form-control-label" for="example3cols1Input">Department</label>
                    <Selec multi={true} ref={departmentRef} valueHandler={depvalueHandler} name={"depppp"} init={initDep} full={false} choice={choiceBl} data={departmentdata} placeholder={{name: "Select Department(s)"}}></Selec>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <label class="form-control-label" for="example3cols1Input">Contienent</label>
                    <Selec multi={false} valueHandler={areavalueHandler} ref={ContinentRef} choiceHandler={continentChoiceHandler} full={false} data={continentData} changeInit={changeContinentInit}  placeholder={{name: "Continent"}}></Selec>                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label class="form-control-label" for="example3cols1Input">Area</label>
                    <Selec multi={true} ref={areaRef} full={false} choiceHandler={areaChoiceHandler} changeInit={changeAreaInit}   valueHandler={areavalueHandler} init={initBu} choice={choiceBu} data={areadata} placeholder={{name: "Select Area(s)"}}></Selec>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label class="form-control-label" for="example3cols1Input">Country</label>
                    <Selec multi={false} choice={choiceArea || choiceContinent}  ref={countryRef} full={false} init={initArea}  data={geographyData} valueHandler={geographyValueHandler} placeholder={{name: "select one or multiple countries"}}></Selec>                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label class="form-control-label" for="example3cols1Input">Start Date</label>
                    <input type="text" ref={dateRef} type="number" onChange={dateChangeHandler} onBlur={dateBlurHandler} className={datevalid} placeholder="year of start "/>
                    {!dateIsValid && <div className="invalid-feedback">Should not be empty</div>}
                </div>
            </div>
        </div>
        </div>
        </div>
     );
}

export default Reportlist;