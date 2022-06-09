import axios from 'axios';
import React, { useRef, useState,useContext, useEffect } from 'react';
import Tablehook from '../../hooks/table-hook';
import AuthContext from '../../store/auth-context';
import Selec from '../addForms/select';
import 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2'
import { CSVLink } from 'react-csv';
function Salesperfomance(props) {

    var salesManagerRef=useRef();
    var ContinentRef=useRef();
    var areaRef=useRef();
    var countryRef=useRef();
    var datebeforeRef=useRef();
    var dateafterRef=useRef();

    const [initArea,setInitArea]=useState(false) 
    const [initContinent,setInitContinent]=useState(false) 
    const [initCancel , setInitCancel]=useState(false)

    const [areadata , setareadata]=useState([])
    const [salesManagerData , setsalesManagerData]=useState([])
    const [geographyData , setgeographydata]=useState([])

  const [choiceContinent,setchoiceContinent]=useState(true)
  const [choiceArea,setchoiceArea]=useState(true)

  const [showdata,setshowdata]=useState(true)

  const [continentLink,setContinentLink]=useState('')
  const [areaLink,setAreaLink]=useState('')

  const [csvdata,setcsvdata]=useState([])

  const [globalLink,setGlobalLink]=useState('')

  const authctx=useContext(AuthContext)

  const continentData=[{id:"asia",name:"asia"},{id:"europe",name:"europe"},{id:"north america",name:"north america"},{id:"africa",name:"africa"},{id:"antartica",name:"antartica"},{id:"south africa",name:"south africa"},{id:"oceania",name:"oceania"}]

  const changeAreaInit=()=>{
    setInitArea(!initArea)
  }

  const changeContinentInit=()=>{
    setInitContinent(!initArea)
  }

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
  }

  const cancel=()=>{
    setInitArea(!initArea)
    setInitCancel(!initCancel)
    setshowdata(false)
  }

  useEffect(()=>{
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

  const  search= ()=>{
    const salesMnagerinput=salesManagerRef.current.value
    const geoinput=countryRef.current.value
    const datebeforeinput=datebeforeRef.current.value
    const dateafterinput=dateafterRef.current.value
    console.log(salesMnagerinput)

    let link='http://localhost:8000/api/opportunities?page=1&itemsPerPage=30&pagination=false'
    if(salesMnagerinput.length !== 0){
      // link=link+'&salesManager.id%5B%5D='+salesMnagerinput

      salesMnagerinput.forEach((v)=>{
          link=link+'&salesManager.id%5B%5D='+v
        })
      }
      if(geoinput.length !== 0){
        console.log("geo",geoinput)
        geoinput.forEach((v)=>{
          link=link+'&countries.id%5B%5D='+v
          })
      }

      if(datebeforeinput.length !== 0){
        link=link+'&creationDate%5Bafter%5D='+datebeforeinput
  }
      if(dateafterinput.length !== 0){
        link=link+'&creationDate%5Bbefore%5D='+dateafterinput
  }
  console.log(link)
  setGlobalLink(link)
  setshowdata(false)
  
      }
  const{data,
    loading,
    paginations,
    show,
    pagenumber,
    itemperpage,
    loadingchange,
    sortHandler,
    handleChange}=Tablehook("opportunity","",["reference","creationDate","description","customer",'salesManager.firstname','countries','salesManager.lastname','businessunit.name','businessline.name','department.name','successRate','reason','bidReviewDateAchieved','submissionDatePlanned','revenueStartPlanned','contractDuration','total','stage'],"","",globalLink)
  
useEffect(() => {

  let nobidd=0
  let bidd=0
  
  data.map(d=>{
    if(d.stage=="OX1-No Bid") nobidd++
    if(d.stage=="O5-Won Not Booked") bidd++
    setnobid(nobidd)
    setbid(bidd)
  })
setnochart( bidd==0 && nobidd==0 )  
}, [data]);
 const[nochart,setnochart]=useState(false)
 const[bid,setbid]=useState(false)
 const[nobid,setnobid]=useState(false)


  const undefinedHndler=(v)=>{
    
    if(v==undefined){
        return "undefined"
    }
    else{return v}
        }

        useEffect(() => {
          let csvtable=["reference,creationDate,description,customer,countries,salesManager.firstname,,salesManager.lastname,businessunit.name,businessline.name,department.name,successRate,reason,bidReviewDateAchieved,submissionDatePlanned,revenueStartPlanned,contractDuration,totalValue,stage"]
          
         
          data.map(d=>{             
          const ligne=d.reference+','+d.creationDate+','+d.description+','+d.customer.name+','+d.countries.country+','+d["salesManager.firstname"]+" "+d["salesManager.lastname"]+','+d['businessunit.name']+','+d['businessline.name']+','+d['department.name']+','+d.stage+','+d.successRate.toString()+','+undefinedHndler(d.reason)+','+undefinedHndler(d.bidReviewDateAchieved)+','+undefinedHndler(d.submissionDatePlanned)+','+undefinedHndler(d.revenueStartPlanned)+','+d.contractDuration+','+undefinedHndler(d.totalValue).toString()+','+d.stage
          csvtable.push(ligne)
        })
        setcsvdata(csvtable)
      
        }, [data]);
        

const csvHandler=()=>{
  axios.get('http://localhost:8000/opportunity/csvsales', {params: {data: csvdata}},{headers: {Authorization: "Bearer "+authctx.token, "Access-Control-Allow-Origin": "*"}})
}
const xlsxHandler=()=>{
  axios.get('http://localhost:8000/opportunity/xlsxsales', {params: {data: csvdata}},{headers: {Authorization: "Bearer "+authctx.token, "Access-Control-Allow-Origin": "*"}})
}
const chartData={
    labels: ['no bid', 'bid'],
    datasets: [
        {
          label: '# of Votes',
          data: [bid, nobid],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
}
    return (
        <div>
            <div class="card mt-5 mb-5 ml-5 mr-5 pl-4 pr-4">
            <div class="card-header">
            <h3 class="mb-0">Sales performance</h3>
            </div>
            <div class="card-body">
            <div class="row">
            <div class="col-lg-6">
            <div class="row input-daterange datepicker align-items-center">
                    <div class="col">
                      <div class="">
                        <label class="form-control-label">Start date</label>
                        <input class="form-control" ref={datebeforeRef} type="date"  id="example-date-input"/>     
                        </div>
                    </div>
                    <div class="col">
                      <div class="">
                        <label class="form-control-label">End date</label>
                        <input class="form-control" ref={dateafterRef} type="date" id="example-date-input"/>
                        </div>
                    </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <Selec selecType={"Sales Manager"} multi={true} ref={salesManagerRef} full={false} data={salesManagerData} placeholder={{name: "SalesMnager"}}></Selec>
                </div>
            </div>
            <div class="row">
                <div class=" col-12">
                    <Selec selecType={ "Continent"}  multi={false}  ref={ContinentRef} choiceHandler={continentChoiceHandler} full={false} data={continentData} changeInit={changeContinentInit}  placeholder={{name: "Continent"}}></Selec>           
                </div>
            </div>
            <div class="row">
                <div class="    col-12">
                    <Selec  selecType={"Area"} multi={true} ref={areaRef} full={false} choiceHandler={areaChoiceHandler} changeInit={changeAreaInit}    init={initContinent} choice={choiceContinent} data={areadata} placeholder={{name: "Select Area(s)"}}></Selec>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-12">
                    <Selec selecType={"Country"}  multi={true} choice={choiceArea}  ref={countryRef} full={false} init={initArea}  data={geographyData}  placeholder={{name: "select one or multiple countries"}}></Selec>              
                </div>
            </div>
            </div>
                <div className="col-4">
                    {nochart && !showdata && <h1>bid and no bid equal 0</h1>}
                   {  !showdata &&  <Doughnut height={20} width={20} data={chartData} /> }                 </div>
            </div>
                <div className="col-2"></div>
            <div className='d-flex justify-content-between align-items-center mt-3'>
                { !showdata && <div id="datatable-basic_filter" className="dataTables_filter d-flex justify-content-start align-items-center mb-2   ">
                
                <a  data-toggle="dropdown"  className="text-white nav-link rounded-pill d-flex justify-content-center align-items-center  btn  btn-success" type="button">
                        <span className="btn-inner--icon "><i className="fas fa-download "></i></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-primary_dropdown_1">
                    <button  onClick={csvHandler} activeclassname="active" className="dropdown-item" >CSV format </button>
            <button onClick={xlsxHandler} activeclassname="active" className="dropdown-item" >Excel format</button>
                </div>
                </div>}
                    <div id="datatable-basic_filter" className="dataTables_filter d-flex justify-content-end align-items-center    ">

                <button onClick={cancel} className=" rounded-pill d-flex justify-content-center align-items-center  btn  btn-primary" type="button">
                        <span className="btn-inner--icon "><i className="ni ni-fat-remove"></i></span>
                </button>
                <button onClick={search} className=" rounded-pill d-flex justify-content-center align-items-center  btn  btn-primary" type="button">
                        <span className="btn-inner--icon mr-2"><i className="ni ni-check-bold"></i></span>
                        <span className="btn-inner--text">search</span>
                        
                </button>
                </div>
            </div>
            </div>
            
            </div>
            </div>
    );
}

export default Salesperfomance;