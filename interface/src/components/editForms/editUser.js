import EditFormButtons from './editButtonsForm';
import Selec from '../addForms/select';
import { useState,useRef,useEffect, useContext } from "react";
import AuthContext from '../../store/auth-context';
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios';
import { Envelope, Person, PersonCircle, Inboxes, Inbox, Flag, Map } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const EditUser = () => {
  const emailRef=useRef();
  const buRef=useRef();
  const fnameRef=useRef();
  const loginRef=useRef();
  const lnameRef=useRef();
  const roleRef=useRef();
  const departmentRef=useRef();
  const blRef=useRef();
  const areaRef=useRef();
  const [roledata, setRoledata] = useState([]);
  const [userdata, setuserdata] = useState({});
  const [budata, setBudata] = useState([]);
  const [bldata, setBldata] = useState([]);
  const [areadata, setareadata] = useState([]);
  const [departmentdata, setdepartmentdata] = useState([]);
  const [blByDeptData, setBlByDepatData] = useState([]);
  const [areaByCountData, setAreaByCountData] = useState([]);
  const [choiceBuArea, setChoiceBuArea] = useState(true);
  const [blValid, setBlValid] = useState(true);
  const [deptValid, setDeptValid] = useState(true);
  const [areaValid, setAreaValid] = useState(true);
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  var { id } = useParams();

  const operation = (list1, list2, isUnion = false) =>
  list1.filter(a => isUnion === list2.some(b => a.id === b.id));
  const inBoth = (list1, list2) => operation(list1, list2, true);
  useEffect(() => {
    axios.get('http://localhost:8000/businessunit/buHavingBlAndArea',{headers: {Authorization: "Bearer "+authctx.token}}) 
    .then(response=>{
      const table = (response.data.map(d=>{
        return{
          id: d.id,
          name: d.name,
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
          name: d.name,
        }
      }))
      setBlByDepatData(table);
    }).catch(error=>{
      console.error(error);
    })
    axios.get('http://localhost:8000/api/users/'+id,{headers: {Authorization: "Bearer "+authctx.token}})
    .then(response=>{
      console.log(response.data)
      setuserdata(response.data)
    })
    axios.get('http://localhost:8000/role/read',{headers: {Authorization: "Bearer "+authctx.token}}) 
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
  //     setBlValid(false);
  //     setAreaValid(false);
  //     setDeptValid(false);
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
  //     setBlValid(true);
  //     setAreaValid(true);
  //     setDeptValid(true);
  //     setChoiceBl(true);
  //   }
  // }
  // const blChoiceHandler = (event, s) => {
  //   if((event.target.value).length > 0){
  //     setChoiceBl(false);
  //     setBlValid(true);
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
  //               return (departmentdata.concat(table)).find(a => a.id === id)
  //           }));
  //         }
  //       }).catch(error=>{
  //         console.error(error);
  //       })
  //     })
  //   }
  //   else {
  //     setChoiceBl(true);
  //     setBlValid(false);
  //   }
  // }
  // const areaChoiceHandler = (event, s) => {
  //   if((event.target.value).length > 0)
  //     setAreaValid(true);
  //   else
  //     setAreaValid(false);
  // }
  const deptChoiceHandler = (event, s) => {
    if((event.target.value).length > 0)
      setDeptValid(true);
    else
      setDeptValid(false);
  }
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
     
     var body={
    }
    if (inputemail.trim() !== ''){
        body["email"]=inputemail
    }
    if (inputlogin.trim() !== ''){
        body["login"]=inputlogin
    }
    if (inputfname.trim() !== ''){
        body["firstname"]=inputfname
    }
    if (inputlname.trim() !== ''){
        body["lastname"]=inputlname
    }
    if(buinput.length !== 0){
      var bu=buinput.map(v=>{
        return("/api/businessunits/"+v)
      })
      body["businessunit"]=bu
      console.log(buinput)
    }
    if(inputlrole.length !== 0){
      var bu=inputlrole.map(v=>{
        return("/api/roles/"+v)
      })
      body["role"]=bu
    }
    if(req){if(inputldepartment.length !== 0){
      var bu=inputldepartment.map(v=>{
        return("/api/departments/"+v)
      })}else{var bu=[]}
      body["department"]=bu
    }
    if(req){if(inputbl.length !== 0){
      var bu=inputbl.map(v=>{
        return("/api/businesslines/"+v)
      })}else{var bu=[]}
      body["businessline"]=bu
    }
    if(req){if(areainput.length !== 0){
      var area = areainput.map(v=>{
        return "/api/areas/"+v 
      })}else{var area=[]}
      body["areas"] = area;
    }
    console.log(body)
    axios.patch('http://localhost:8000/api/users/'+id,body,{headers: {
        'Content-Type': 'application/merge-patch+json' ,
        Authorization: "Bearer "+authctx.token
      }})
    .then(response=> {
      NotificationManager.success('The User has been successfully updated !');
      console.log(body);
    })
    .catch(function (error) {
      NotificationManager.error('The User has not been updated !');
      console.log(error);
    });
    navigate('/administration/users')  
  }

  const [choiceBu,setchoiceBu]=useState(true)
  const [choiceBl,setchoiceBl]=useState(true)
  const [choiceArea,setchoiceArea]=useState(true)

  const [initBu,setInitBu]=useState(false) 
  const [initBl,setInitBl]=useState(false) 
  const [initArea,setInitArea]=useState(false) 
  const [initDep,setInitDep]=useState(false) 

  const [linkBl,setLinkBl]=useState('')
  const [areaLink,setAreaLink]=useState('')

  const [linkBu,setLinkBu]=useState('')


  const buChoiceHandler=(event,s)=>{
    blRef.current.value=[]
    if((event.target.value).length>0){
      
      setchoiceBu(false)
      let link=''
      event.target.value.map((v)=>{
        link=link+'&businessunit.id%5B%5D='+v
        // console.log(link)
      })
      
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
      setBldata([])
    }
    console.log("aaaaaaaaaaaa")
    
    setchoiceBl(true)
    // setareadata([])
    // setchoiceArea(true)
    
  }

  const changeBuInit=()=>{
    setInitBu(!initBu)
    setInitBl(!initBl)
    setInitArea(!initArea)
  }
  const changeBlInit=()=>{
    setInitBl(!initBl)
  }
  const changeAreaInit=()=>{
    setInitArea(!initArea)
  }
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
    
  }

  const areaChoiceHandler=(event,s)=>{
    if(((event.target.value).length>0) ){
        setchoiceArea(false)
        let link=''
        event.target.value.map((v)=>{
          link=link+'&area.id%5B%5D='+v
        })
        setAreaLink(link)
        console.log(link)
        // link=link+linkBu
        //geo
        
    }
    else {setchoiceArea(true)
    }
  }
  const buchangehandler=()=>{
    setreq(true)
   }
   const [req, setreq] = useState(false);

  return ( 
    <div className="card-body">
      <form className="needs-validation" onSubmit={submithandler}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Email </label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Envelope size={17}/></span>
                </div>
                <input type="text" ref={emailRef} type="email" disabled className="form-control" placeholder={userdata.email}/>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Login </label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={loginRef} className="form-control" placeholder={userdata.password}/>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">First Name</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={fnameRef} className="form-control" placeholder={userdata.firstname}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Last Name</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><Person size={17}/></span>
                </div>
                <input type="text" ref={lnameRef} className="form-control" placeholder={userdata.lastname}/>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <Selec multi={true} ref={roleRef} full={false} placeholder={userdata.role} data={roledata} selecType={"Role(s)"} required={false}></Selec>
          </div>
          <div className="col-md-4">
            <Selec multi={true} onchange={buchangehandler} ref={buRef} full={false} data={budata} choiceHandler={buChoiceHandler} placeholder={userdata.businessunit} selecType={"Business Unit"} required={false}></Selec>
            {req &&<div >other parametes that depend on business unit will be empty if you don't change them</div>}          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Selec multi={true} ref={blRef} full={!choiceBuArea} data={bldata} choice={choiceBuArea} choiceHandler={blChoiceHandler} placeholder={userdata.businessline} selecType={"Business Line"} required={!choiceBuArea}></Selec>
          </div>
          <div className="col-md-4">
            <Selec multi={true} ref={departmentRef} full={!choiceBuArea} data={departmentdata} choice={choiceBl} choiceHandler={deptChoiceHandler} placeholder={userdata.department} selecType={"Pole / Department"} required={!choiceBuArea}></Selec>
          </div>
          <div className="col-md-4">
            <Selec multi={true} ref={areaRef} full={!choiceBuArea} data={areadata} choice={choiceBuArea} choiceHandler={areaChoiceHandler} placeholder={userdata.areas} selecType={"Area"} required={!choiceBuArea}></Selec>
          </div>
        </div>
        <EditFormButtons cancel={"/administration/users"} valid={blValid && deptValid && areaValid}/>
      </form>
    </div>
  )
}
export default EditUser;