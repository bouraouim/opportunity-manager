import React, { useContext } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import AuthContext from '../../../store/auth-context';

const Geographyitem = (props) => {
    const statusclass=props.status?"badge badge-sm badge-success":"badge badge-sm badge-danger"
   const status=props.status?"ACTIVE":"iNACTIVE"

   const authctx=useContext(AuthContext)

    const link='http://localhost:8000/api/geographies/'+props.id
    const  deleteHandler=()=>{
       axios.delete(link,{headers: {
        Authorization: "Bearer "+authctx.token
    }}) 
       .then(props.loading) 
   }
   const delvergule=(v)=>{
    v[v.length - 1]=v[v.length - 1].slice(0, -1)
    return v
   }
 
    return (
        <tr >
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                <h4 ><Link to={`/modify/geography/${props.id}`}>{props.country}</Link></h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 ><Link to={`/area/${props.id}`}>{props.area}</Link></h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{  delvergule(props.continent)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <span className={statusclass}>{status}</span>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center">
            <button type="button" onClick={deleteHandler} className="btn btn-danger btn-circle btn-sm opacity-5">-</button>
            </td>
        </tr>
    );
};

export default Geographyitem;