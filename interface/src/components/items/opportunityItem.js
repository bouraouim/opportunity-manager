import axios from 'axios';
import { Link } from "react-router-dom";
import { DashLg, CheckLg } from 'react-bootstrap-icons';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
import "../../index.css";

const OpportunityItem = (props) => {   
    const statusclass = props.status?"badge badge-lg badge-success":"badge badge-lg badge-danger";
    const status = props.status?"ACTIVE":"PASSIVE";
    var statusStyle = props.status?"btn btn-danger btn-circle btn-sm opacity-5":"btn btn-success btn-circle btn-sm opacity-5";
    var statusIcon = props.status?<DashLg size={18}/>:<CheckLg size={18}/>;
    var fct = props.status?"inactivate":"activate";
    const authctx = useContext(AuthContext);
    var link = 'http://localhost:8000/api/opportunities/'+props.id+'/'+fct;
    const statusHandler = () => {
        axios.patch(link,{},{headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: "Bearer "+authctx.token
        }})
       .then(props.loading)
    }


    return(
        <tr>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                {authctx.updateOpportunities && <h4 className="title"><Link to={`/administration/opportunities/edit/${props.id}`}>{props.refe}</Link></h4>}
                {!authctx.updateOpportunities && <h4>{props.refe}</h4>}
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.creationDate}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.deptname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.salesManagerName}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.country}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.custname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.descrip}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.totalValue}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.successRate}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.stage}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.presalesname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.awardDatePlanned}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.awardDateAchieved}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.blname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.buname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <span className={statusclass}>{status}</span>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center">
                <button type="button" onClick={statusHandler} className={statusStyle}>{statusIcon}</button>
            </td>
        </tr>
    )
}
export default OpportunityItem;