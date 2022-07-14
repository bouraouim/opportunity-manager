import useInput from "../../hooks/user-input"
import AddFormButtons from "./addFormButtons"; 
import Selec from './select'
import { useState,useRef,useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import AuthContext from "../../store/auth-context";
import { Envelope, Person, PersonCircle, Inboxes, Inbox, Flag, Map } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const AddUser = () => {
  const {value:emailValue, isValid:emailIsValid, hasError:emailHasError, valueChangeHandler:emailChangeHandler, inputBlurHandler:emailBlurHandler} = useInput(value=>value.trim() !== '');
  const emailvalid = emailHasError?"form-control is-invalid":"form-control";
  const {value:loginValue,isValid:loginIsValid, hasError:loginHasError, valueChangeHandler:loginChangeHandler , inputBlurHandler:loginBlurHandler} = useInput(value=>value.trim() !== '');
  const loginvalid = loginHasError?"form-control is-invalid":"form-control";
  const {value:fnameValue,isValid:fnameIsValid, hasError:fnameHasError, valueChangeHandler:fnameChangeHandler, inputBlurHandler:fnameBlurHandler} = useInput(value=>value.trim() !== '');
  const fnamevalid = fnameHasError?"form-control is-invalid":"form-control";
  const {value:lnameValue,isValid:lnameIsValid, hasError:lnameHasError, valueChangeHandler:lnameChangeHandler, inputBlurHandler:lnameBlurHandler, submissionHandler:submissionHandler} = useInput(value=>value.trim() !== '');
  const lnamevalid = lnameHasError?"form-control is-invalid":"form-control";
  var emailRef = useRef();
  var buRef = useRef();
  var fnameRef = useRef();
  var loginRef = useRef();
  var lnameRef = useRef();
  var roleRef = useRef();
  var buRef = useRef();
  var blRef = useRef();
  var areaRef = useRef();
  var deptRef = useRef(); 
  var multiple = false;
  const [budata, setBudata] = useState([]);
  const [bldata, setBldata] = useState([]);
  const [areadata, setareadata] = useState([]);
  const [departmentdata, setdepartmentdata] = useState([]);
  const [blByDeptData, setBlByDepatData] = useState([]);
  const [choiceBuArea, setChoiceBuArea] = useState(true);
  const [blValid, setBlValid] = useState(false);
  const [deptValid, setDeptValid] = useState(false);
  const [roledata, setRoledata]=useState([])
  const authctx = useContext(AuthContext);
  const operation = (list1, list2, isUnion = false) =>
  list1.filter(a => isUnion === list2.some(b => a.id === b.id));
  const inBoth = (list1, list2) => operation(list1, list2, true);
  useEffect(() => {
    axios.get('http://localhost:8000/businessunit/buHavingBlAndArea',{headers: {Authorization: "Bearer "+authctx.token}}) 
    .then(response=>{
      const table = (response.data.map(d=>{
        return{
          id: d.id,
          name:d.name,
        } 
      }))
      setBudata(table);
    }).catch(error=>{
      console.error(error);
    })
    axios.get('http://localhost:8000/businessline/blHavingDept',{headers: {Authorization: "Bearer "+authctx.token}}) 
    .then(response=>{
      const table=(response.data.map(d=>{
        return{
          id: d.id,
          name:d.name,
        }
      }))
      setBlByDepatData(table);
    }).catch(error=>{
      console.error(error);
    })
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
  // const buChoiceHandler = (event, s) => {
  //   if((event.target.value).length > 0){
  //     setChoiceBuArea(false);
  //     event.target.value.map((v)=>{
  //       axios.get('http://localhost:8000/businessunit/blByBu',{params: {id: v}},{headers: {Authorization: "Bearer "+authctx.token}}) 
  //       .then(response=>{
  //         const table=(response.data.map(d=>{
  //           return{
  //             id: d.id,
  //             name:d.name,
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
  //             name:d.name,
  //           } 
  //         }))
  //         if(event.target.value.length === 1){
  //           setareadata(table);
  //         }
  //         else{
  //           setareadata(Array.from(new Set((areadata.concat(table)).map(a => a.id)))
  //           .map(id => {
  //             return (areadata.concat(table)).find(a => a.id === id)
  //           }));
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
  //             name:d.name,
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
  useEffect( () => {
    //businessunit
    axios.get('http://localhost:8000/businessunit/read') 
    .then(response=>{
      const table = (response.data.map( d=> {
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
      const table = (response.data.map(d=>{
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
  const navigate = useNavigate();
  const submithandler = (event) => {
    event.preventDefault();
    const inputemail = emailRef.current.value;
    const inputbl = blRef.current.value;
    const inputfname = fnameRef.current.value;
    const inputlname = lnameRef.current.value;
    const inputlrole = roleRef.current.value;
    const inputlogin = loginRef.current.value;
    const buinput = buRef.current.value;
    const areainput = areaRef.current.value;
    const depinput = deptRef.current.value;
    var body = {
      "email": inputemail,
      "password":inputlogin,
      "firstname":inputfname,
      "lastname":inputlname,
    }
    if(buinput.length !== 0){
      var bu = buinput.map(v=>{
        return "/api/businessunits/"+v 
      })
      body["businessunit"] = bu;
    }
    if(inputlrole.length !== 0){
      var bu=inputlrole.map(v=>{
        return{"id":v}
      })
      body["role"]=bu
    }
    if(depinput.length !== 0){
      var dept = depinput.map(v=>{
        return "/api/departments/"+v 
      })
      body["department"] = dept;
    }
    if(inputbl.length !== 0){
      var bl = inputbl.map(v=>{
        return "/api/businesslines/"+v 
      })
      body["businessline"] = bl;
    }
    if(areainput.length !== 0){
      var area = areainput.map(v=>{
        return "/api/areas/"+v 
      })
      body["areas"] = area;
    }
    axios.post('http://localhost:8000/api/users',body,{headers: {Authorization: "Bearer "+authctx.token}})
    .then(response=> {
      console.log(body);
      NotificationManager.success('The User has been successfully added !');
    })
    .catch(function (error) {
      console.log(error);
      NotificationManager.error('The User has not been added !');
    });
    navigate('/administration/users')
  }

  const [choiceBu, setchoiceBu] = useState(true);
  const [choiceBl, setchoiceBl] = useState(true);
  const [choiceArea, setchoiceArea] = useState(true);
  const [initBu, setInitBu] = useState(false); 
  const [initBl, setInitBl] = useState(false); 
  const [initArea, setInitArea] = useState(false); 
  const [initDep, setInitDep] = useState(false); 
  const [linkBl, setLinkBl] = useState('');
  const [areaLink, setAreaLink] = useState('');
  const [linkBu, setLinkBu] = useState('');

  const buChoiceHandler = (event,s) => {
    if((event.target.value).length>0){
      setchoiceBu(false);
      let link = '';
      event.target.value.map((v)=>{
        link=link+'&businessunit.id%5B%5D='+v
        // console.log(link)
      })
      //businessline
      axios.get('http://localhost:8000/api/businesslines?page=1&pagination=false'+link,{headers: {Authorization: "Bearer "+authctx.token}}) 
      .then(response=>{
        const table = (response.data["hydra:member"].map(d=>{
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
      setBldata([]);
    }
    console.log("aaaaaaaaaaaa")
    setchoiceBl(true);
    // setareadata([])
    // setchoiceArea(true)
  }
  const changeBuInit = () => {
    setInitBu(!initBu);
    setInitBl(!initBl);
    setInitArea(!initArea);
  }
  const changeBlInit = () => {
    setInitBl(!initBl);
  }
  const changeAreaInit = () => {
    setInitArea(!initArea);
  }
  const blChoiceHandler = (event,s) => {
    if((event.target.value).length>0){
      setchoiceBl(false);
      let link = '';
      event.target.value.map((v)=>{
        link = link+'&businessline.id%5B%5D='+v;
      })
      setLinkBl(link);
      link = link+linkBu;
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
    else {
      setchoiceBl(true);
      setLinkBl("");
    }
    setdepartmentdata([]);
  }
  const areaChoiceHandler = (event,s) => {
    if(((event.target.value).length>0)){
      setchoiceArea(false);
      let link = '';
      event.target.value.map((v)=>{
        link = link+'&area.id%5B%5D='+v;
      })
      setAreaLink(link);
      console.log(link);
      // link=link+linkBu
      //geo
    }
    else {
      setchoiceArea(true);
    }
  }

  return (
    <div className="card-body">
      <form className="needs-validation" onSubmit={submithandler}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Email<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Envelope size={17}/></span>
                </div>
                <input type="text" ref={emailRef} type="email" onChange={emailChangeHandler} onBlur={emailBlurHandler} className={emailvalid} placeholder="Email"/>
                {!emailIsValid && <div className="invalid-feedback">Email should not be empty</div>}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
               <label className="form-control-label">Login<span className="text-danger">*</span></label>
               <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={loginRef} onChange={loginChangeHandler} onBlur={loginBlurHandler} className={loginvalid} placeholder="Login"/>
                {!loginIsValid && <div className="invalid-feedback">Login should not be empty</div>}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">First Name<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={fnameRef} onChange={fnameChangeHandler} onBlur={fnameBlurHandler} className={fnamevalid} placeholder="First Name"/>
                {!fnameIsValid && <div className="invalid-feedback">First Name should not be empty</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Last Name<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={lnameRef} onChange={lnameChangeHandler} onBlur={lnameBlurHandler} className={lnamevalid} placeholder="Last Name"/>
                {!lnameIsValid && <div className="invalid-feedback">Last Name should not be empty</div>}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <Selec multi={true} ref={roleRef} full={false} data={roledata} placeholder={{name: "Select Role(s)"}} selecType={"Role(s)"} required={false}></Selec>
          </div>
          <div className="col-md-4">
            <Selec multi={true} ref={buRef} selecType={"Business Unit"} choiceHandler={buChoiceHandler} name={"buuuuu"} changeInit={changeBuInit} full={false} data={budata} placeholder={{name: "Select Business Unit(s)"}}></Selec>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Selec multi={true} selecType={"Business Line"} ref={blRef} full={false} choiceHandler={blChoiceHandler} name={"blll"} changeInit={changeBlInit} init={initBu} choice={choiceBu} data={bldata} placeholder={{name: "Select Business Line(s)"}}></Selec>
          </div>
          <div className="col-md-4">
            <Selec multi={true} ref={deptRef} selecType={"Pole / Department"} name={"depppp"} init={initBl} full={false} choice={choiceBl} data={departmentdata} placeholder={{name: "Select Department(s)"}}></Selec>
          </div>
          <div className="col-md-4">
            <Selec multi={true} ref={areaRef} full={false} selecType={"Area"} choiceHandler={areaChoiceHandler} init={initBu} choice={choiceBu} data={areadata} placeholder={{name: "Select Area(s)"}}></Selec>
          </div>
        </div>
        <AddFormButtons valid={emailIsValid && loginIsValid && lnameIsValid && fnameIsValid} cancel={"/administration/users"}/>
      </form>
    </div>
  )
}
export default AddUser;