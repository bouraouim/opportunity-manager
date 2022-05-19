import axios from "axios";
import { Link } from "react-router-dom";
import { DashLg, CheckLg } from "react-bootstrap-icons";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import "../../index.css";

const CurrencyItem = (props) => {
  const statusclass = props.status?"badge badge-lg badge-success":"badge badge-lg badge-danger";
  const status = props.status?"ACTIVE":"PASSIVE";
  var statusStyle = props.status?"btn btn-danger btn-circle btn-sm opacity-5":"btn btn-success btn-circle btn-sm opacity-5";
  var statusIcon = props.status?<DashLg size={18}/>:<CheckLg size={18}/>;
  var fct = props.status ? "inactivate" : "activate";
  const authctx = useContext(AuthContext);
  var link = "http://localhost:8000/api/currencies/" + props.id + "/" + fct;
  const statusHandler = () => {
    axios.patch(link,{},{headers: {
      "Content-Type": "application/merge-patch+json",
      Authorization: "Bearer " + authctx.token,
    }})
    .then(props.loading);
  };
  var applicationDate = new Date(props.appDate);
  var month = applicationDate.getMonth() + 1;
  var date = applicationDate.getDate() + "/" + month + "/" + applicationDate.getFullYear();

  return (
    <tr>
      <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
        {authctx.updateCurrencies && <h4 className="title"><Link to={`/administration/currencies/edit/${props.id}`}>{props.code}</Link></h4>}
        {!authctx.updateCurrencies && <h4>{props.code}</h4>}
      </td>
      <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
        <h4>{date}</h4>
      </td>
      <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
        <h4>{props.rate}</h4>
      </td>
      <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
        <span className={statusclass}>{status}</span>
      </td>
      <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center">
        <button type="button" onClick={statusHandler} className={statusStyle}>{statusIcon}</button>
      </td>
    </tr>
  );
};
export default CurrencyItem;
