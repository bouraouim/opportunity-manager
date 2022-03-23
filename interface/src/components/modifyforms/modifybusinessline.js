import FormButtons from "../forms/formbuttons";
import Selec from "../forms/select";
import axios from 'axios'
import  { useState,useEffect,useRef} from 'react'
import { useNavigate,useParams } from "react-router-dom";


const Modifybusinessline = () => {


    const [budata , setBudata]=useState([])
  
    const nameRef=useRef();
    const buRef=useRef();
    const multiple=false
  
    var { id } = useParams();

  console.log(id)
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
  
  const navigate=useNavigate();
  const submithandler=(event)=>{
    event.preventDefault(); 
      const inputname=nameRef.current.value
    const buinput=buRef.current.value

    var body={
    }
    
    if (inputname.trim() !== ''){
        body["name"]=inputname
    }
    if(Number.isInteger(buinput)){
        body["businessunit"]="/api/businessunits/"+buinput

    }
    console.log(body)
    axios.patch('http://localhost:8000/api/businesslines/'+id,body,{headers: {
      'Content-Type': 'application/merge-patch+json' 
    }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


    return ( 
        <div className="card-body">
          <form className="needs-validation" onSubmit={submithandler}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Business line </label>
                <input type="text" ref={nameRef}  className="form-control" id="example3cols1Input"  placeholder="name"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols3Input">Business Unit <span className="text-danger ">*</span></label>
                <Selec multi={multiple} full={false} ref={buRef}  data={budata} />
              </div>
            </div>
          </div>
          <FormButtons valid={true}  cancel={"/businessline"}/>
          </form>
        </div>
     );    
}
 
export default Modifybusinessline;