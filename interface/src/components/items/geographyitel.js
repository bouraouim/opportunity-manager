import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import AuthContext from '../../store/auth-context';
import { DashLg, CheckLg } from 'react-bootstrap-icons';
import "../../index.css";

const Geographyitem = (props) => {
    const statusclass=props.status?"badge badge-lg badge-success":"badge badge-lg badge-danger"
    const statusbtnclass=props.status?"btn btn-danger btn-circle btn-sm opacity-5":"btn btn-success btn-circle btn-sm opacity-5"
    var statusIcon = props.status?<DashLg size={18}/>:<CheckLg size={18}/>;
    const status=props.status?"ACTIVE":"PASSIVE";
    const authctx=useContext(AuthContext)
    const link='http://localhost:8000/api/geographies/'+props.id;
    var message = "";
    const [disabledValue, setDisabledValue] = useState(false);
    
    useEffect (() => {
        axios.get('http://localhost:8000/geography/isUsed', {params: {value: props.id}},{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            if(response.data){
                setDisabledValue(response.data);
            }
        }).catch(error=>{
            console.error(error);
        })
    },[]);
    if(disabledValue){
        message = "This Geography is used you can't deactivate it.";
    }
    else{
        if(props.status)
            message = "Deactivate";
        else     
            message = "Activate";
    }
    const  deleteHandler=()=>{
        const v=(!props.status)
        console.log(v)
        axios.patch(link,{"status":v},{headers: {
            'Content-Type': 'application/merge-patch+json' ,
            Authorization: "Bearer "+authctx.token
        }}) 
       .then(props.loading) 
    }
    const delvergule=(v)=>{
        if(v.length>0 && v[v.length - 1].slice(-1)===",")
        {console.log("aaa")
        v[v.length - 1]=v[v.length - 1].slice(0, -1)}
        return v
    }
 
    return (
        <tr>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                {authctx.updateGeographies && <h4 className="title"><Link to={`/administration/geography/edit/${props.id}`}>{props.country}</Link></h4>}
                {!authctx.updateGeographies && <h4>{props.country}</h4>}
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.area}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{  delvergule(props.continent)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <span className={statusclass}>{status}</span>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center">
            <button type="button" onClick={deleteHandler} className={statusbtnclass} data-toggle="tooltip" title={message} disabled={disabledValue}>{statusIcon}</button>
            </td>
        </tr>
    );
};

export default Geographyitem;