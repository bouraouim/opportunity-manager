import axios from 'axios';
import { Link } from "react-router-dom";
import { DashLg, CheckLg } from 'react-bootstrap-icons';
import AuthContext from '../../store/auth-context';
import { useContext, useState, useEffect } from 'react';
import "../../index.css";
import { NotificationManager } from 'react-notifications';

const AreaItem = (props) => {   
    const statusclass = props.status?"badge badge-lg badge-success":"badge badge-lg badge-danger";
    const status = props.status?"ACTIVE":"PASSIVE";
    var statusStyle = props.status?"btn btn-danger btn-circle btn-sm opacity-5":"btn btn-success btn-circle btn-sm opacity-5";
    var statusIcon = props.status?<DashLg size={18}/>:<CheckLg size={18}/>;
    var fct = props.status?"inactivate":"activate";
    const authctx = useContext(AuthContext);
    var link = 'http://localhost:8000/api/areas/'+props.id+'/'+fct;
    const [disabledValue, setDisabledValue] = useState(false);
    var message = ""; 
    
    //Verfiy if Area is used
    useEffect (() => {
        axios.get('http://localhost:8000/area/isUsed', {params: {value: props.id}},{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            if(response.data){
                setDisabledValue(response.data);
            }
        }).catch(error=>{
            console.error(error);
        })
    },[]);
    if(disabledValue){
        message = "This Area is used you can't deactivate it.";
    }
    else{
        if(props.status)
            message = "Deactivate";
        else     
            message = "Activate";
    }
    //Change status
    const statusHandler = () => {
        axios.patch(link,{},{headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: "Bearer "+authctx.token
        }})
       .then(props.loading)
        props.status? NotificationManager.success('The Area has been successfully disabled !'): NotificationManager.success('The Area has been successfully enabled !');
    }
    const delvergule = (v) => {
        v[v.length - 1] = v[v.length - 1].slice(0, -1);
        return v;
    }

    return(
        <tr>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                {authctx.updateAreas && <h4 className="title"><Link to={`/administration/areas/edit/${props.id}`}>{props.name}</Link></h4>}
                {!authctx.updateAreas && <h4>{props.name}</h4>}
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{delvergule(props.buname)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <span className={statusclass}>{status}</span>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center">
                <button type="button" onClick={statusHandler} className={statusStyle} data-toggle="tooltip" title={message} disabled={disabledValue}>{statusIcon}</button>
            </td>
        </tr>
    )
}
export default AreaItem;