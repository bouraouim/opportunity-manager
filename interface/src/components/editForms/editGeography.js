import EditFormButtons from './editButtonsForm';
import  { useState,useEffect,useRef, useContext} from 'react'
import Selec from '../addForms/select';
import AuthContext from '../../store/auth-context';
import axios from 'axios'
import { useNavigate ,useParams} from "react-router-dom";
import { Map, Globe2 } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const EditGeography = () => {
    const [areadata , setareadata]=useState([])

    const countryRef=useRef();
  const areaRef=useRef();
  const continentRef=useRef();
  const multiple=true
  var { id } = useParams();
  const authctx=useContext(AuthContext)
  const [geodata,setgeodata]=useState({})


  useEffect(()=>{
    axios.get('http://localhost:8000/api/geographies/'+id,{headers: {Authorization: "Bearer "+authctx.token}})
    .then(response=>{
      console.log(response.data)
     setgeodata(response.data)
    })

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

const navigate=useNavigate();
const submithandler=(event)=>{
  event.preventDefault(); 
  const inputcountry=countryRef.current.value
  const areainput=areaRef.current.value
  const continentinput=continentRef.current.value
  var body={
  }
  if (inputcountry.trim() !== ''){
    body["country"]=inputcountry
}
if(Number.isInteger(areainput)){
    body["area"]="/api/areas/"+areainput}


      if(continentinput.length!==0){
        body["continent"]=continentinput
      }
console.log(body)
  axios.patch('http://localhost:8000/api/geographies/'+id,body,{headers: {
    'Content-Type': 'application/merge-patch+json' ,
    Authorization: "Bearer "+authctx.token
  }})
  .then(function (response) {
    NotificationManager.success('The Geography has been successfully updated !');
  })
  .catch((error)=> {
    NotificationManager.error('The Geography has not been updated !');
    console.log(error);
  });
  navigate('/administration/geography')  
}
const continentdata=[{id:"asia",name:"asia"},{id:"europe",name:"europe"},{id:"north america",name:"north america"},{id:"africa",name:"africa"},{id:"antartica",name:"antartica"},{id:"south america",name:"south america"},{id:"oceania",name:"oceania"}]
    return ( 
        <div className="card-body">
          <form className="needs-validation" onSubmit={submithandler}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Country </label>
                <input type="text" className="form-control" ref={countryRef} id="example3cols1Input" placeholder={geodata.country}/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols2Input">Area </label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><Map size={17}/></span>
                  </div>
                  <Selec multi={false} ref={areaRef} full={false}  placeholder={geodata.area} data={areadata} />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols3Input">Continent</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><Globe2 size={17}/></span>
                  </div>
                  <Selec multi={multiple} ref={continentRef} placeholder={geodata.continent}  full={false} data={continentdata} />
                </div>
              </div>
            </div>
          </div>
          <EditFormButtons valid={true} cancel={"/administration/geography"}/>
          </form>
        </div>
     );
}
 
export default EditGeography ;
