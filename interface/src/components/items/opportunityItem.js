import axios from 'axios';
import { Link } from "react-router-dom";
import { DashLg, CheckLg } from 'react-bootstrap-icons';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
import "../../index.css";
import { NotificationManager } from 'react-notifications';

const OpportunityItem = (props) => {   
    const statusclass = props.status?"badge badge-lg badge-success":"badge badge-lg badge-danger";
    const status = props.status?"ACTIVE":"PASSIVE";
    var statusStyle = props.status?"btn btn-danger btn-circle btn-sm opacity-5":"btn btn-success btn-circle btn-sm opacity-5";
    var statusIcon = props.status?<DashLg size={18}/>:<CheckLg size={18}/>;
    var fct = props.status?"inactivate":"activate";
    const authctx = useContext(AuthContext);
    var link = 'http://localhost:8000/api/opportunities/'+props.id;
    var date = new Date(props.creationDate);
    var day = (date.getDate() <= 9 ? '0': '') + (date.getDate());
    var month = (date.getMonth() <= 9 ? '0': '') + (date.getMonth()+1);
    var creationDate = day + "/" + month + "/" + date.getFullYear();
    date = new Date(props.awardDatePlanned);
    day = (date.getDate() <= 9 ? '0': '') + (date.getDate());
    month = (date.getMonth() <= 9 ? '0': '') + (date.getMonth()+1);
    var awardDatePlanned = day + "/" + month + "/" + date.getFullYear();
    date = new Date(props.awardDateAchieved);
    day = (date.getDate() <= 9 ? '0': '') + (date.getDate());
    month = (date.getMonth() <= 9 ? '0': '') + (date.getMonth()+1);
    var awardDateAchieved = day + "/" + month + "/" + date.getFullYear();

    var stageClass;
    if(props.stage === "O0-Opportunity Identified")
        stageClass = "badge badge-lg badge-primary";
    if(props.stage === "O1-RFI")
        stageClass = "badge badge-lg badge-info";
    if(props.stage === "O2-RFQ Expected")
        stageClass = "badge badge-lg O2-RFQExpected";
    if(props.stage === "OX1-No Bid")
        stageClass = "badge badge-lg badge-secondary";
    if(props.stage === "OX3-Cancelled")
        stageClass = "badge badge-lg OX3-Cancelled";
    if(props.stage === "O3-Answer in Progress")
        stageClass = "badge badge-lg O3-AnswerInProgress";
    if(props.stage === "O4-Offer Submitted")
        stageClass = "badge badge-lg O4-OfferSubmitted";
    if(props.stage === "O5-Won Not Booked")
        stageClass = "badge badge-lg badge-warning";
    if(props.stage === "OX2-Lost")
        stageClass = "badge badge-lg badge-danger";
    if(props.stage === "O6-Booked")
        stageClass = "badge badge-lg badge-success";

    const statusHandler = () => {
        axios.patch(link,{status:!props.status},{headers: {
            'Content-Type': 'application/merge-patch+json' ,
            Authorization: "Bearer "+authctx.token
        }}).then(props.loading)
        props.status? NotificationManager.success('The User has been successfully disabled !'): NotificationManager.success('The User has been successfully enabled !');
    }
    
    return(
        <tr>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                {authctx.updateOpportunities && <h4 className="title"><Link to={`/opportunities/edit/${props.id}`}>{props.refe}</Link></h4>}
                {!authctx.updateOpportunities && <h4>{props.refe}</h4>}
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{creationDate}</h4>
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
                <h4 className={stageClass}>{props.stage}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.presalesname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{awardDatePlanned}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{awardDateAchieved}</h4>
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