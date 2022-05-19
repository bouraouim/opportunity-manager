import axios from 'axios';
import { Link } from "react-router-dom";
import { DashLg, CheckLg } from 'react-bootstrap-icons';
import AuthContext from '../../store/auth-context';
import { useContext, useState, useEffect } from 'react';
import "../../index.css";

const ProductLineItem = (props) => {   
    const statusclass = props.status?"badge badge-lg badge-success":"badge badge-lg badge-danger";
    const status = props.status?"ACTIVE":"PASSIVE";
    var statusStyle = props.status?"btn btn-danger btn-circle btn-sm opacity-5":"btn btn-success btn-circle btn-sm opacity-5";
    var statusIcon = props.status?<DashLg size={18}/>:<CheckLg size={18}/>;
    const authctx = useContext(AuthContext);
    var fct = props.status?"inactivate":"activate";
    var link = 'http://localhost:8000/api/productlines/'+props.id+'/'+fct;
    var message = ""; 
    const [disabledValue, setDisabledValue] = useState(false);

    // useEffect (() => {
    //     axios.get('http://localhost:8000/productline/isUsed', {params: {value: props.id}},{headers: {Authorization: "Bearer "+authctx.token}}) 
    //     .then(response=>{
    //         if(response.data){
    //             setDisabledValue(response.data);
    //         }
    //     }).catch(error=>{
    //         console.error(error);
    //     })
    // },[]);
    if(disabledValue){
        message = "This Product Line is used you can't deactivate it.";
    }
    else{
        if(props.status)
            message = "Deactivate";
        else     
            message = "Activate";
    }    
    const statusHandler = () => {
        axios.patch(link,{},{headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: "Bearer "+authctx.token
        }})
       .then(props.loading)
    }
    const delvergule = (v) => {
        v[v.length - 1] = v[v.length - 1].slice(0, -1);
        return v;
    }

    return(
        <tr>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                {authctx.updateProductLines && <h4 className="title"><Link to={`/administration/productLines/edit/${props.id}`}>{props.name}</Link></h4>}
                {!authctx.updateProductLines && <h4>{props.name}</h4>}
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{delvergule(props.buName)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{delvergule(props.blName)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{delvergule(props.deptName)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <span className={statusclass}>{status}</span>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center">
            <button type="button" onClick={statusHandler} className={statusStyle} data-toggle="tooltip" title={message}>{statusIcon}</button>
            </td>
        </tr>
    )
}
export default ProductLineItem;