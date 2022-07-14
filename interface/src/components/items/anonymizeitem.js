import { Link } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import "../../index.css";

const Anonymizeitem = (props) => {
    const authctx = useContext(AuthContext);
    var a = props.isCheck.includes(parseInt(props.id));
    const delvergule=(v)=>{
        if(v.length>0 && v[v.length - 1].slice(-1)==","){
            console.log("aaa");
            v[v.length - 1]=v[v.length - 1].slice(0, -1);
        }
        return v;
    }

    var date = new Date(props.lastconnectiondate);
    var day = (date.getDate() <= 9 ? '0': '') + (date.getDate());
    var month = (date.getMonth() <= 9 ? '0': '') + (date.getMonth()+1);
    var LastConnectionDate = day + "/" + month + "/" + date.getFullYear();
    date = new Date(props.creationdate);
    day = (date.getDate() <= 9 ? '0': '') + (date.getDate());
    month = (date.getMonth() <= 9 ? '0': '') + (date.getMonth()+1);
    var creatiolDate = day + "/" + month + "/" + date.getFullYear();
    
    return ( 
        <tr>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                {authctx.updateUsers && <h4 className="title"><Link to={`/administration/users/edit/${props.id}`}>{props.lname}</Link></h4>}
                {!authctx.updateUsers && <h4>{props.lname}</h4>}
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.fname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.login}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{props.email}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{delvergule(props.bline)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{LastConnectionDate}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4>{creatiolDate}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <input type="checkbox"key={props.id} id={props.id} onChange={props.handleClick} checked={a}/>  
            </td>
        </tr>
    );
}
export default Anonymizeitem;