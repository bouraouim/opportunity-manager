import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/user-input";
import AuthContext from "../../store/auth-context";
import AddFormButtons from "./addFormButtons";
import Selec from "./select";
import { Person, People } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';
import Selecthook from "../../hooks/selec-input";

const AddCustomer = (props) => {
  const {isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler, submissionHandler:submissionHandler} = useInput(value=>value.trim() !== '');
  const namevalid = nameHasError?"form-control is-invalid":"form-control";
  const {isValid:groupIsValid, hasError:groupHasError, valueChangeHandler:groupChangeHandler, inputBlurHandler:groupBlurHandler} = useInput(value=>value.trim() !== '');
  const groupvalid = groupHasError?"form-control is-invalid":"form-control";
  const nameIconValid = nameHasError?"input-group-text invalide":"input-group-text";
  const groupIconValid = groupHasError?"input-group-text invalide":"input-group-text";
  // const [budata, setBudata] = useState([]);
  // const [bldata, setBldata] = useState([]);
  // const [areadata, setareadata] = useState([]);
  // const [departmentdata, setdepartmentdata] = useState([]);
  const [countrydata, setcountrydata] = useState([]);
  const [blByDeptData, setBlByDepatData] = useState([]);
  const [areaByCountData, setAreaByCountData] = useState([]);
  const [choiceBuArea, setChoiceBuArea] = useState(true);
  // const [choiceBl, setChoiceBl] = useState(true);
  // const [choiceArea, setChoiceArea] = useState(true);
  const [blValid, setBlValid] = useState(false);
  const [deptValid, setDeptValid] = useState(false);
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  var nameRef = useRef();
  var sapRef = useRef();
  var buRef = useRef();
  var groupRef = useRef();
  var countryRef = useRef();
  var departmentRef = useRef();
  var blRef = useRef();
  var areaRef = useRef();
 
const {buChoiceHandler,areaChoiceHandler,blChoiceHandler,changeAreaInit,changeBlInit,changeBuInit,choiceBu,choiceBl,choiceArea,
  bldata,departmentdata,areadata,geographyData,budata,initBu,initBl,initArea,initDep}=Selecthook()

  const operation = (list1, list2, isUnion = false) =>
  list1.filter(a => isUnion === list2.some(b => a.id === b.id));
  const inBoth = (list1, list2) => operation(list1, list2, true);
  // useEffect(() => {
  //   axios.get('http://localhost:8000/businessunit/buHavingBlAndArea',{headers: {Authorization: "Bearer "+authctx.token}}) 
  //   .then(response=>{
  //       const table = (response.data.map(d=>{
  //           return{
  //               id: d.id,
  //               name: d.name,
  //           } 
  //       }))
  //       setBudata(table);
  //   }).catch(error=>{
  //       console.error(error);
  //   })
  //   axios.get('http://localhost:8000/businessline/blHavingDept',{headers: {Authorization: "Bearer "+authctx.token}}) 
  //   .then(response=>{
  //       const table=(response.data.map(d=>{
  //           return{
  //               id: d.id,
  //               name: d.name,
  //           }
  //       }))
  //       setBlByDepatData(table);
  //   }).catch(error=>{
  //     console.error(error);
  //   })
  //   axios.get('http://localhost:8000/area/areaHavingGeo',{headers: {Authorization: "Bearer "+authctx.token}}) 
  //   .then(response=>{
  //       const table=(response.data.map(d=>{
  //           return{
  //               id: d.id,
  //               name: d.name,
  //           }
  //       }))
  //       setAreaByCountData(table);
  //   }).catch(error=>{
  //     console.error(error);
  //   })
  // },[])
  // const buChoiceHandler = (event, s) => {
  //   if((event.target.value).length > 0){
  //     setChoiceBuArea(false);
  //     event.target.value.map((v)=>{
  //       axios.get('http://localhost:8000/businessunit/blByBu',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
  //       .then(response=>{
  //         const table=(response.data.map(d=>{
  //           return{
  //             id: d.id,
  //             name: d.name,
  //           }
  //         }))
  //         if(event.target.value.length === 1){
  //           setBldata(inBoth(table, blByDeptData));
  //         }
  //         else{
  //           setBldata(inBoth(blByDeptData, Array.from(new Set((bldata.concat(table)).map(a => a.id)))
  //           .map(id => {
  //             return (bldata.concat(table)).find(a => a.id === id)
  //           })));
  //         }
  //       }).catch(error=>{
  //         console.error(error);
  //       })
  //       axios.get('http://localhost:8000/businessunit/areaByBu',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
  //       .then(response=>{
  //         const table = (response.data.map(d=>{
  //           return{
  //             id: d.id,
  //             name: d.name,
  //           } 
  //         }))
  //         if(event.target.value.length === 1){
  //           setareadata(table);
  //         }
  //         else{
  //           setareadata(inBoth(areaByCountData, Array.from(new Set((areadata.concat(table)).map(a => a.id)))
  //           .map(id => {
  //             return (areadata.concat(table)).find(a => a.id === id)
  //           })));
  //         }
  //       }).catch(error=>{
  //         console.error(error);
  //       })
  //     })
  //   }
  //   else {
  //     setChoiceBuArea(true);
  //   }
  // }
  // const blChoiceHandler = (event, s) => {
  //   if((event.target.value).length > 0){
  //     setChoiceBl(false);
  //     event.target.value.map((v)=>{
  //       axios.get('http://localhost:8000/businessline/deptByBl',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
  //       .then(response=>{
  //         const table=(response.data.map(d=>{
  //           return{
  //             id: d.id,
  //             name: d.name,
  //           }
  //         }))
  //         if(event.target.value.length === 1){
  //           setdepartmentdata(table);
  //         }
  //         else{
  //           setdepartmentdata(Array.from(new Set((departmentdata.concat(table)).map(a => a.id)))
  //           .map(id => {
  //             return (departmentdata.concat(table)).find(a => a.id === id)
  //           }));
  //         }
  //       }).catch(error=>{
  //         console.error(error);
  //       })
  //     })
  //   }
  //   else {
  //     setChoiceBl(true);
  //   }
  // }
  // const areaChoiceHandler = (event, s) => {
  //   if((event.target.value).length > 0){
  //     setChoiceArea(false);
  //     event.target.value.map((v)=>{
  //       axios.get('http://localhost:8000/area/getGeoByArea',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
  //       .then(response=>{
  //         const table=(response.data.map(d=>{
  //           return{
  //             id: d.id,
  //             name: d.country,
  //           }
  //         }))
  //         if(event.target.value.length === 1){
  //           setcountrydata(table);
  //         }
  //         else{
  //           setcountrydata(Array.from(new Set((countrydata.concat(table)).map(a => a.id)))
  //           .map(id => {
  //             return (countrydata.concat(table)).find(a => a.id === id)
  //           }));
  //         }
  //       }).catch(error=>{
  //         console.error(error);
  //       })
  //     })
  //   }
  //   else {
  //     setChoiceArea(true);
  //   }
  // }
  const submithandler = (event) => {
    event.preventDefault();
    const inputname = nameRef.current.value;
    const inputsap = sapRef.current.value;
    const inputbl = blRef.current.value;
    const inputcountry = countryRef.current.value;
    const inputdepartment = departmentRef.current.value;
    const buinput = buRef.current.value;
    const areainput = areaRef.current.value;
    const grpinput = groupRef.current.value;
    var body = {
      "name": inputname,
      "custGroup":grpinput,
    }
    if(inputsap.length !== 0){
      body["sapPartner"] = inputsap;
    }
    if(sapRef.current.value.length !== 0){
    
      body["sapPartner"]=inputsap
    }else{
      body["sapPartner"]=""}
    if(buinput.length !== 0){
      var bu = buinput.map(v=>{
        return{"id":v}
      })
      body["businessunit"] = bu;
    }
    if(inputdepartment.length !== 0){
      var bu = inputdepartment.map(v=>{
        return{"id":v}
      })
      body["department"] = bu;
    }
    if(inputbl.length !== 0){
      var bu = inputbl.map(v=>{
        return{"id":v}
      })
      body["businessline"] = bu;
    }
    if(areainput.length !== 0){
      var bu = areainput.map(v=>{
        return{"id":v}
      })
      body["areas"] = bu;
    }
    if(inputcountry.length !== 0){
      var bu = inputcountry.map(v=>{
        return{"id":v}
      })
      body["count"] = bu;
    }
    if(inputcountry.length !== 0){
      body["country"]=inputcountry[0]
      }
    else{
       body["country"]=""}
    console.log(body)
    axios.post('http://localhost:8000/api/customers',body,{headers: {Authorization: "Bearer "+authctx.token}})
    .then(response=> {
      NotificationManager.success('The Customer has been successfully added !');
      console.log(body);
    })
    .catch(function (error) {
      NotificationManager.error('The Customer has not been added !');
      console.log(error);
    });
    navigate('/administration/customers')  
  }
  
  return(
    <div className="card-body">
      <form className="needs-validation" onSubmit={submithandler}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Customer<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className={nameIconValid}><Person size={17}/></span>
                </div>
                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} placeholder="Name of Customer"/>
                {!nameIsValid && <div className="invalid-feedback">Name of Customer should not be empty</div>}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">SAP Partner</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={sapRef} className="form-control" placeholder="SAP Partner"/>
              </div>
            </div>
          </div>
          <div className="col-md-4">
          <Selec multi={true} ref={buRef} choiceHandler={buChoiceHandler} name={"buuuuu"}  changeInit={changeBuInit}  full={false} data={budata} placeholder={{name: "Select Business Unit(s)"}} selecType={"Business Unit"} required={false}></Selec>
            
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
          <Selec multi={true} ref={blRef} full={false} choiceHandler={blChoiceHandler}  name={"blll"} changeInit={changeBlInit} init={initBu}   choice={choiceBu} data={bldata} placeholder={{name: "Select Business Line(s)"}} selecType={"Business Line"} required={false}></Selec>
            
          </div>
          <div className="col-md-4">
          <Selec multi={true} ref={departmentRef}  name={"depppp"} init={initBl} full={false} choice={choiceBl} data={departmentdata} placeholder={{name: "Select Department(s)"}} selecType={"Pole / Department"} required={false}></Selec>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Customer Group<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className={groupIconValid}><People size={17}/></span>
                </div>
                <input type="text" onChange={groupChangeHandler} onBlur={groupBlurHandler} className={groupvalid} ref={groupRef} placeholder="Name of Customer Group"/>
                {!groupIsValid && <div className="invalid-feedback">Name of Customer Group should not be empty</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
          <Selec multi={true} ref={areaRef} full={false} choiceHandler={areaChoiceHandler} changeInit={changeAreaInit}   init={initBu} choice={choiceBu} data={areadata} placeholder={{name: "Select Area(s)"}} selecType={"Area"} required={false}></Selec>
          </div>
          <div className="col-md-4">
          <Selec multi={true} choice={choiceArea}  ref={countryRef} full={false} init={initArea}  data={geographyData} placeholder={{name: "select one or multiple countries"}}  selecType={"Country"} required={false}></Selec>       
          </div>
        </div>
        <AddFormButtons valid={nameIsValid && groupIsValid} cancel={"/administration/customers"}/>
      </form>
    </div>
  )
}
export default AddCustomer;