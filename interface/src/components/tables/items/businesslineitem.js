
import axios from 'axios'
import { useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../../store/auth-context';
const BusinessLineItem=(props)=>{
   
const authctx=useContext(AuthContext)
    
    const link='http://localhost:8000/api/businesslines/'+props.id
    const  deleteHandler=()=>{
       axios.delete(link,{headers: {Authorization: "Bearer "+authctx.token}}) 
       .then(props.loading) 
   }

   const statusclass=props.status?"badge badge-sm badge-success":"badge badge-sm badge-danger"
   const status=props.status?"ACTIVE":"iNACTIVE"

    return(
        <>
        <tr >
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                <h4 ><Link to={`/modify/businessline/${props.id}`}>{props.name}</Link></h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.buname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <span className={statusclass}>{status}</span>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center">
            <button type="button" onClick={deleteHandler} className="btn btn-danger btn-circle btn-sm opacity-5">-</button>
            </td>
        </tr>
        {/* <tr>
            <th scope="row">
            <div class="media align-items-center">
                <div class="media-body">
                <span class="name mb-0 text-sm">{props.name}</span>
                </div>
            </div>
            </th>
            <td class="budget">
            {props.buname}
            </td>
            <td>
            <span class="badge badge-dot mr-4">
                <span class="status">Active</span>
            </span>
            </td>
            <td key={props.id} className="align-item-center">
            <button type="button" className="btn btn-danger btn-circle btn-sm opacity-5">-</button>
            </td>
        </tr> */}
            </>
    )
}
export default BusinessLineItem