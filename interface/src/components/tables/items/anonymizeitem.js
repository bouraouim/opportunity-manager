import { Link } from "react-router-dom";

const Anonymizeitem = (props) => {
var a=props.isCheck.includes(parseInt(props.id))
    const delvergule=(v)=>{
        if(v.length!==0)
     {v[v.length - 1]=v[v.length - 1].slice(0, -1)}
     return v
    }
    return ( 
        <tr >
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                <h4 ><Link to={`/modify/user/${props.id}`}>{props.lname}</Link></h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.fname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.login}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.email}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.bline)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.lastconnectiondate}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.creationdate}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                    
         
  <input type="checkbox"key={props.id}  id={props.id} onChange={props.handleClick} checked={a}/>

                  
            </td>
           
        </tr>
     );
}
 
export default Anonymizeitem;