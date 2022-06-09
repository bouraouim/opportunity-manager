import axios from 'axios'
import { useContext, useState, useEffect } from 'react';
import { DashLg, CheckLg } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import AuthContext from '../../store/auth-context';
import "../../index.css";

function Useritem(props) {

    const link='http://localhost:8000/api/users/'+props.id
    const  deleteHandler=()=>{
       axios.patch(link,{status:!props.status},{headers: {
        'Content-Type': 'application/merge-patch+json' ,
        Authorization: "Bearer "+authctx.token
    }}).then(props.loading) 
   }
   var message = ""; 
   const [disabledValue, setDisabledValue] = useState(false);
   useEffect (() => {
        axios.get('http://localhost:8000/user/isUsed', {params: {value: props.id}},{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            if(response.data){
                setDisabledValue(response.data);
            }
        }).catch(error=>{
            console.error(error);
        })
    },[]);
    if(disabledValue){
        message = "This User is used you can't deactivate it.";
    }
    else{
        if(props.status)
            message = "Deactivate";
        else     
            message = "Activate";
    }

   const authctx=useContext(AuthContext)
  

   const statusclass=props.status?"badge badge-lg badge-success":"badge badge-lg badge-danger"
   const statusbtnclass=props.status?"btn btn-danger btn-circle btn-sm opacity-5":"btn btn-success btn-circle btn-sm opacity-5"
   var statusIcon = props.status?<DashLg size={18}/>:<CheckLg size={18}/>;

   const s=props.status?"-":"+"

   const status=props.status?"ACTIVE":"PASSIVE";
   const delvergule=(v)=>{
       if(v.length>0 && v[v.length - 1].slice(-1)==",")
    {
    v[v.length - 1]=v[v.length - 1].slice(0, -1)}
    return v
   }


   const switchuser=()=>{
    authctx.setemail(props.email)
    authctx.loggedasHandler()
    authctx.loggedas=true

   }
  return (<>
  <tr >
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                {authctx.updateUsers && <h4 className="title"><Link to={`/administration/users/edit/${props.id}`}>{props.email}</Link></h4>}
                {!authctx.updateUsers && <h4>{props.email}</h4>}
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.lname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.fname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.role)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.bunit)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.bline)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.department)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.area)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.lcd}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <span className={statusclass}>{status}</span>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center d-flex align-items-center justify-content-center">
          <i type='button'onClick={switchuser} className='ni ni-single-02 mr-2 fa-lg pe-auto' data-toggle="tooltip" title="Connect as"/>
            <button type="button" onClick={deleteHandler} className={statusbtnclass} data-toggle="tooltip" title={message} disabled={disabledValue}>{statusIcon}</button>
            </td>
        </tr>
        
  </>
  )
}
export default Useritem