
import axios from 'axios'
import { Link } from "react-router-dom";

function Useritem(props) {

    const link='http://localhost:8000/api/userrs/'+props.id
    const  deleteHandler=()=>{
       axios.delete(link) 
       .then(props.loading) 
   }

   const anonymizeHandler=()=>{
      const body= {
        "anonymized":true
       }
       axios.patch(link,body,{headers: {
        'Content-Type': 'application/merge-patch+json' 
      }})
      props.userHandler(props.email)
   }

   const statusclass=props.status?"badge badge-sm badge-success":"badge badge-sm badge-danger"
   const status=props.status?"ACTIVE":"PASSIVE"
   const delvergule=(v)=>{
       if(v.length!==0)
    {v[v.length - 1]=v[v.length - 1].slice(0, -1)}
    return v
   }


  return (<>
  <tr >
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                <h4 ><Link to={`/modify/user/${props.id}`}>{props.email}</Link></h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.lname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.fname}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.role)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.bunit)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.bline)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.department)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.area)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.lcd}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <span className={statusclass}>{status}</span>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center d-flex align-items-center justify-content-center">
          <i  className='ni ni-single-02 mr-2 fa-lg pe-auto '  />
            <button type="button" onClick={deleteHandler} className="btn btn-danger btn-circle btn-sm opacity-5">-</button>
            </td>
        </tr>
        
  </>
  )
}

export default Useritem
