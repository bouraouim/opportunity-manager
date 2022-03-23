    import FormButtons from '../forms/formbuttons';
import  { useState,useEffect,useRef} from 'react'
import Selec from "../forms/select";
import axios from 'axios'
import { useNavigate ,useParams} from "react-router-dom";


const Modifygeography  = () => {
    const [areadata , setareadata]=useState([])

    const countryRef=useRef();
  const areaRef=useRef();
  const continentRef=useRef();
  const multiple=true
  var { id } = useParams();


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
  var body={
  }
  if (inputcountry.trim() !== ''){
    body["name"]=inputcountry
}
if(Number.isInteger(areainput)){
    body["area"]="/api/businessunits/"+areainput}


      if(continentinput.length!==0){
        body["continent"]=continentinput
      }

  axios.patch('http://localhost:8000/api/geographies/'+id,body)
  .then(function (response) {
  })
  .catch(function (error) {
    console.log(error);
  });
  navigate('/addgeography')  
}
const continentdata=[{id:"africa",name:"africa"},{id:"europe",name:"europe"}]
    return ( 
        <div className="card-body">
          <form className="needs-validation" onSubmit={submithandler}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Country </label>
                <input type="text" className="form-control" ref={countryRef} id="example3cols1Input" placeholder="name"/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols2Input">Area </label>
                <Selec multi={false} ref={areaRef} full={false}   data={areadata} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols3Input">Continent</label>
                <Selec multi={multiple} ref={continentRef}  full={false} data={continentdata} />
              </div>
            </div>
          </div>
          <FormButtons valid={true}/>
          </form>
        </div>
     );
}
 
export default Modifygeography ;