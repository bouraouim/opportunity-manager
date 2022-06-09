import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../store/auth-context';
import { DashLg, CheckLg } from 'react-bootstrap-icons';
import "../../index.css";
import { NotificationManager } from 'react-notifications';

const BusinessLineItem = (props) => {
    const authctx = useContext(AuthContext);    
    const link = 'http://localhost:8000/api/businesslines/'+props.id;
    const statusclass = props.status?"badge badge-lg badge-success":"badge badge-lg badge-danger";
    const statusbtnclass = props.status?"btn btn-danger btn-circle btn-sm opacity-5":"btn btn-success btn-circle btn-sm opacity-5";
    var statusIcon = props.status?<DashLg size={18}/>:<CheckLg size={18}/>;
    const status=props.status?"ACTIVE":"PASSIVE";
    var message = "";
    const [disabledValue, setDisabledValue] = useState(false);

    useEffect (() => {
        axios.get('http://localhost:8000/businessline/isUsed', {params: {value: props.id}},{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            if(response.data){
                setDisabledValue(response.data);
            }
        }).catch(error=>{
            console.error(error);
        })
    },[]);
    if(disabledValue){
        message = "This Business Line is used you can't deactivate it.";
    }
    else{
        if(props.status)
            message = "Deactivate";
        else     
            message = "Activate";
    }
    const statusHandler=()=>{
        axios.patch(link,{status:!props.status},{headers: {
            'Content-Type': 'application/merge-patch+json' ,
            Authorization: "Bearer "+authctx.token
        }}) 
       .then(props.loading)
       props.status? NotificationManager.success('The Business Line has been successfully disabled !'): NotificationManager.success('The Business Line has been successfully enabled !');
    }
    const delvergule = (v) => {
        if(v.length>0 && v[v.length - 1].slice(-1)==","){
            v[v.length - 1]=v[v.length - 1].slice(0, -1)
        }
        return v;
    }

    return(
        <tr>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                {authctx.updateBusinessLines && <h4 className="title"><Link to={`/administration/businessLines/edit/${props.id}`}>{props.name}</Link></h4>}
                {!authctx.updateBusinessLines && <h4>{props.name}</h4>}
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.buname)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <span className={statusclass}>{status}</span>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center">
                <button type="button" onClick={statusHandler} className={statusbtnclass} data-toggle="tooltip" title={message} disabled={disabledValue}>{statusIcon}</button>
            </td>
        </tr>
    )
}
export default BusinessLineItem;