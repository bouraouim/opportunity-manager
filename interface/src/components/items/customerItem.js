import axios from 'axios';
import { Link } from "react-router-dom";
import { DashLg, CheckLg } from 'react-bootstrap-icons';
import AuthContext from '../../store/auth-context';
import "../../index.css";
import { useContext, useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';

const CustomerItem = (props) => {   
    const statusclass = props.status?"badge badge-lg badge-success":"badge badge-lg badge-danger";
    const status = props.status?"ACTIVE":"PASSIVE";
    var statusStyle = props.status?"btn btn-danger btn-circle btn-sm opacity-5":"btn btn-success btn-circle btn-sm opacity-5";
    var statusIcon = props.status?<DashLg size={18}/>:<CheckLg size={18}/>;
    var fct = props.status?"inactivate":"activate";
    const authctx = useContext(AuthContext);
    var link = 'http://localhost:8000/api/customers/'+props.id+'/'+fct;
    var message = ""; 
    const [disabledValue, setDisabledValue] = useState(false);
    
    //Verfiy if Customer is used
    useEffect (() => {
        axios.get('http://localhost:8000/customer/isUsed', {params: {value: props.id}},{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            if(response.data){
                setDisabledValue(response.data);
            }
        }).catch(error=>{
            console.error(error);
        })
    },[]);
    if(disabledValue){
        message = "This Customer is used you can't deactivate it.";
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
        props.status? NotificationManager.success('The Customer has been successfully disabled !'): NotificationManager.success('The Customer has been successfully enabled !');
    }
    const delvergule = (v) => {
        if(v.length>0 && v[v.length - 1].slice(-1)===","){
            v[v.length - 1] = v[v.length - 1].slice(0, -1);
        }
        return v;
    }

    return(
        <tr>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                {authctx.updateCustomers && <h4 className="title"><Link to={`/administration/customers/edit/${props.id}`}>{props.name}</Link></h4>}
                {!authctx.updateCustomers && <h4>{props.name}</h4>}
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                <h4>{props.sap}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{delvergule(props.bunit)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{delvergule(props.bline)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{delvergule(props.department)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                <h4>{props.group}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{delvergule(props.area)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                <h4>{delvergule(props.country)}</h4>
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
export default CustomerItem;