import Selec from "../addForms/select";
import { useState,useRef,useEffect, useContext } from "react";
import axios from 'axios'
import AuthContext from "../../store/auth-context";
import useInput from "../../hooks/user-input";
import ReportListTable from "./reportListTable";
import { CSVLink } from "react-csv";
import Tablehook from "../../hooks/table-hook";
import Paginations from "../tables/pagination";


function Reportlist() {

    const {value:dateValue,isValid:dateIsValid ,hasError:dateHasError, valueChangeHandler:dateChangeHandler , inputBlurHandler:dateBlurHandler}=useInput(value=>value.trim() !== '');
  const datevalid=dateHasError?"form-control is-invalid":"form-control  "

    var buRef=useRef();
    var departmentRef=useRef();
    var blRef=useRef();
    var areaRef=useRef();
    var salesManagerRef=useRef();
    var ContinentRef=useRef();
    var countryRef=useRef();
    var dateRef=useRef();

    const [initBu,setInitBu]=useState(false) 
    const [initBl,setInitBl]=useState(false) 
    const [initArea,setInitArea]=useState(false) 
    const [initContinent,setInitContinent]=useState(false) 
    const [initDep,setInitDep]=useState(false) 
    const [initCancel , setInitCancel]=useState(false)

    const [bldata , setBldata]=useState([])
    const [departmentdata , setdepartmentdata]=useState([])
    const [salesManagerData , setsalesManagerData]=useState([])
    const [areadata , setareadata]=useState([])
  const [geographyData , setgeographydata]=useState([])
  const [budata , setBudata]=useState([])

  const [choiceBu,setchoiceBu]=useState(true)
  const [choiceBl,setchoiceBl]=useState(true)
  const [choiceContinent,setchoiceContinent]=useState(true)
  const [choiceArea,setchoiceArea]=useState(true)

  const [blvalue,setblvalue]=useState([])
  const [geographyvalue,setgeograohyvalue]=useState([])
  const [departmentvalue,setdepartmentvalue]=useState([])
  const [areavalue,setareavalue]=useState([])
  const [continentvalue,setContinentValue]=useState([])

  const authctx=useContext(AuthContext)
  const [linkBu,setLinkBu]=useState('')
  const [linkBl,setLinkBl]=useState('')
  const [linkArea,setLinkArea]=useState('')



  const continentData=[{id:"asia",name:"asia"},{id:"europe",name:"europe"},{id:"north america",name:"north america"},{id:"africa",name:"africa"},{id:"antartica",name:"antartica"},{id:"south africa",name:"south africa"},{id:"oceania",name:"oceania"}]
  const countryData=[]






  const changeBuInit=()=>{
    setInitBu(!initBu)
    setInitBl(!initBl)
    setInitArea(!initArea)
    setLinkBl("")
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
        setLinkBl(link)
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
      setLinkBl("")

    }
    setdepartmentdata([])
    setdepartmentvalue([])
    
  }
  const [continentLink,setContinentLink]=useState('')
  const [areaLink,setAreaLink]=useState('')

  useEffect(()=>{
    axios.get('http://localhost:8000/api/geographies?page=1&itemsPerPage=1&pagination=false'+continentLink+areaLink,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            const table=(response.data["hydra:member"].map(d=>{
                return{
                    id: d.id,
                    name:d.country,
                } 
            }))
            console.log(table)
            setgeographydata(table)
        }).catch(error=>{
          console.error(error);
        }) 
  },[continentLink,areaLink])

  const continentChoiceHandler= async (event,s)=>{
    if(((event.target.value).length>0) ){
        setchoiceContinent(false)
        let link=''
          link=link+'&continent='+event.target.value
setContinentLink(link)
        // link=link+linkBu
        console.log('http://localhost:8000/api/geographies?page=1&itemsPerPage=30&pagination=false'+link)


        const response=await axios.get('http://localhost:8000/api/geographies?page=1&itemsPerPage=1&pagination=false'+link,{headers: {Authorization: "Bearer "+authctx.token}})
        const table=(response.data["hydra:member"].map(d=>{
          return{
              id: d["area"].id,
              name:d["area"].name,
          } 
      }))
      console.log(table)
      setareadata(table)
        //geo
    }
    else {
      setchoiceContinent(true)
      setareadata([])
    }
    setgeographydata([])
    setgeograohyvalue([])
    
    setchoiceArea(true)
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
        // console.log(link)
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
        // axios.get('http://localhost:8000/api/areas?page=1&itemsPerPage=1&pagination=false'+link,{headers: {Authorization: "Bearer "+authctx.token}}) 
        // .then(response=>{
        //     const table=(response.data["hydra:member"].map(d=>{
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
    else {setchoiceBu(true)
      setLinkBu("")
      setBldata([])
    }
    console.log("aaaaaaaaaaaa")
    
    setblvalue([])
    setareavalue([])
    setchoiceBl(true)
    // setareadata([])
    // setchoiceArea(true)
    
  }

  
  
  const blvalueHandler=(v)=>{
    setblvalue(v)
  }
  const depvalueHandler=(v)=>{
    setdepartmentvalue(v)
    console.log()
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



const cancel=()=>{
  setInitArea(!initArea)
  setInitCancel(!initCancel)
  setInitBl(!initBl)
  setInitBu(!initBu)
  setshowdata(true)
}



 const  search= ()=>{
  const salesMnagerinput=salesManagerRef.current.value
  const depinput=departmentRef.current.value
  const geoinput=countryRef.current.value
  const dateinput=dateRef.current.value
  // const buinput=buRef.current.value
  // const blinput=blRef.current.value
  // const continentinput=buRef.current.value
  // const areainput=buRef.current.value
  let link='http://localhost:8000/api/opportunities?page=1&itemsPerPage=30&pagination=false'
  link=link+linkBu+linkBl
  console.log(salesMnagerinput)

    if(salesMnagerinput.length !== 0){ 
      // link=link+'&salesManager.id%5B%5D='+salesMnagerinput
      salesMnagerinput.forEach((v)=>{
        link=link+'&salesManager.id%5B%5D='+v
        })
    }
  if(depinput.length !== 0){
    console.log("depp",depinput)
    depinput.forEach((v)=>{
      link=link+'&department.id%5B%5D='+v
      })
      
    }
    
    if(geoinput.length !== 0){
      console.log("geo",geoinput)
      geoinput.forEach((v)=>{
        link=link+'&countries.id%5B%5D='+v
        })
    }
    if(Number.isInteger(dateinput)){
          link=link+'&creationDate%5Bafter%5D=01-01-'+dateinput
    }
    else{
      // link=link+'date=2022'
    }

  console.log(link)
  setGlobalLink(link)
  setshowdata(false)

}

const [showdata,setshowdata]=useState(true)

const [globalLink,setGlobalLink]=useState('')

const{data,
  loading,
  paginations,
  show,
  pagenumber,
  itemperpage,
  loadingchange,
  sortHandler,
  handleChange}=Tablehook("opportunity","",["id","creationDate","reason","reference","description","customer",'salesManager.firstname','countries','salesManager.lastname','successRate','businessunit.name','businessline.name','department.name','stage','awardDatePlanned',"awardDateAchieved","totalValue","revenueLocalPart","revenueHQPart"],"","",globalLink)

  const [csvdata,setcsvdata] =useState([])

  const undefinedHndler=(v)=>{
    
    if(v==undefined){
        return "undefined"
    }
    else{return v}
        }

  useEffect(() => {
    let csvtable=["Opportunity Reference,Creation Date,Description,Country,Sales Manager,Customer,Business Line,Business Unit,Departement,Success Rate,Stage,Award Date (Planned),Award Date (Achieved),Total,Total Year 2022,Total Year 2023,Total Year 2024,Total Year 2025 or Above"]
    let total=0;
    let total2022=0;
    let total2023=0;
    let total2024=0;
    let total2025=0;
   
    data.map(d=>{
        total=total+d.totalValue
        let unique2022=0;
        let unique2023=0;
        let unique2024=0;
        let unique2025=0;
    d.revenueLocalPart.map((y)=>{
        if(y.year==2022){
            return y.months.map(m=>{
                total2022=m.value+total2022
                unique2022=unique2022+m.value
                return 0
            })
        }
        if(y.year==2023){
            return  y.months.map(m=>{
                total2023=m.value+total2023
                unique2023=unique2023+m.value
                return 0
            })
        }
        if(y.year==2024){
            return  y.months.map(m=>{
                total2024=m.value+total2024
                unique2024=unique2024+m.value
                return 0
            })
        }
        if(y.year>2025){
            return  y.months.map(m=>{
                total2025=m.value+total2025
                unique2025=unique2025+m.value
                return 0
            })
        }
    })
    const ligne=d.reference+','+d.creationDate+','+d.description+','+d.customer.name+','+d.countries.country+','+d["salesManager.firstname"]+" "+d["salesManager.lastname"]+','+d['businessunit.name']+','+d['businessline.name']+','+d['department.name']+','+d.stage+','+d.successRate.toString()+','+undefinedHndler(d.awardDatePlanned)+','+undefinedHndler(d.awardDateAchieved)+','+d.totalValue.toString()+','+unique2022.toString()+','+unique2023.toString()+','+unique2024.toString()+','+unique2025.toString()
    csvtable.push(ligne)
  })
  setcsvdata(csvtable)

  }, [data]);
  
  const csvHandler=()=>{
    axios.get('http://localhost:8000/opportunity/csv', {params: {data: csvdata}},{headers: {Authorization: "Bearer "+authctx.token, }})
  }
  const xlsxHandler=()=>{
    axios.get('http://localhost:8000/opportunity/xlsx', {params: {data: csvdata}},{headers: {Authorization: "Bearer "+authctx.token, }})
  }
// const [data,setData]=useState([])
    return ( 
            <div class="card mt-5 mb-5 ml-5 mr-5 pl-4 pr-4">
            <div class="card-header">
          <h3 class="mb-0">list of opportunities</h3>
            </div>
        <div class="card-body">
        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <Selec selecType={"Sales Manager"} multi={true} ref={salesManagerRef} full={false} data={salesManagerData} placeholder={{name: "SalesMnager"}}></Selec>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <Selec selecType={"Business Unit"} multi={true} ref={buRef} choiceHandler={buChoiceHandler} name={"buuuuu"} init={initCancel} changeInit={changeBuInit}  full={false} data={budata} placeholder={{name: "Select Business Unit(s)"}}></Selec>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <Selec selecType={"Business Line"} multi={true} ref={blRef} full={false} choiceHandler={blChoiceHandler}  name={"blll"} changeInit={changeBlInit} init={initBu}  valueHandler={blvalueHandler} choice={choiceBu} data={bldata} placeholder={{name: "Select Business Line(s)"}}></Selec>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <Selec selecType={"Pole / Department"} multi={true} ref={departmentRef} valueHandler={depvalueHandler} name={"depppp"} init={initBl} full={false} choice={choiceBl} data={departmentdata} placeholder={{name: "Select Department(s)"}}></Selec>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <Selec selecType={ "Continent"} multi={false} valueHandler={areavalueHandler} ref={ContinentRef} choiceHandler={continentChoiceHandler} full={false} data={continentData} changeInit={changeContinentInit}  placeholder={{name: "Continent"}}></Selec>                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <Selec selecType={"Area"} multi={true} ref={areaRef} full={false} choiceHandler={areaChoiceHandler} changeInit={changeAreaInit}   valueHandler={areavalueHandler} init={initContinent} choice={choiceContinent} data={areadata} placeholder={{name: "Select Area(s)"}}></Selec>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <Selec selecType={"Country"} multi={true} choice={choiceArea}  ref={countryRef} full={false} init={initArea}  data={geographyData} valueHandler={geographyValueHandler} placeholder={{name: "select one or multiple countries"}}></Selec>                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <span class="form-control-span" for="example3cols1Input">Start Date </span>
                    <input type="text" ref={dateRef} type="number" onChange={dateChangeHandler} onBlur={dateBlurHandler} className={datevalid} placeholder="year of start "/>
                </div>
            </div>
        </div>
        <div id="datatable-basic_filter" className="dataTables_filter d-flex justify-content-end align-items-center   ">

        <button onClick={cancel} className=" rounded-pill d-flex justify-content-center align-items-center  btn  btn-primary" type="button">
                <span className="btn-inner--icon "><i className="ni ni-fat-remove"></i></span>
        </button>
        <button onClick={search} className=" rounded-pill d-flex justify-content-center align-items-center  btn  btn-primary" type="button">
                <span className="btn-inner--icon mr-2"><i className="ni ni-check-bold"></i></span>
                <span className="btn-inner--text">search</span>
                
        </button>
        </div>
        </div>
        {!showdata &&<hr className="mt-n3"></hr>}
        {!showdata && <div id="datatable-basic_filter" className="dataTables_filter d-flex justify-content-start align-items-center mb-2   ">
        
        <a  data-toggle="dropdown"  className="text-white nav-link rounded-pill d-flex justify-content-center align-items-center  btn  btn-success" type="button">
                <span className="btn-inner--icon "><i className="fas fa-download "></i></span>
        </a>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-primary_dropdown_1">
             <button  onClick={csvHandler} activeclassname="active" className="dropdown-item" >CSV format </button>
            <button onClick={xlsxHandler} activeclassname="active" className="dropdown-item" >Excel format</button>
        </div>
        </div>}
        
        { !showdata && <ReportListTable data={data}/>}
       { !showdata && <Paginations itemperpage={itemperpage} onchange={handleChange} page={pagenumber} search={""}  pagination={paginations}/>}

        </div>
        
     );
}

export default Reportlist;