import axios from 'axios';
import { useRef, useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import EditFormButtons from "./editButtonsForm";
import AuthContext from "../../store/auth-context";
import "../../index.css";
import { Inboxes } from 'react-bootstrap-icons';
import { NotificationManager } from 'react-notifications';

const EditBusinessUnit = () => {
    const nameRef = useRef();
    const navigate = useNavigate();
    var { id } = useParams();
    const authctx = useContext(AuthContext);
    const [businessunit, setBusinessunit] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/businessunits/'+id,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setBusinessunit(response.data);
        })
    },[])
    const submithandler = (event) => {
        event.preventDefault(); 
        const name = nameRef.current.value;
        const body = { };
        if (name.trim() !== ''){
            body["name"] = name;
        }
        axios.patch('http://localhost:8000/api/businessunits/'+id,body,{headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: "Bearer "+authctx.token
        }})
        .then(function (response) {
            console.log(response);
            NotificationManager.success('The Business Unit has been successfully updated !');
        })
        .catch(function (error) {
            NotificationManager.error('The Business Unit has not been updated !');
            console.log(error);
        });
        navigate('/administration/businessUnits');
    }

    return(
        <div className="card-body">
            <form className="needs-validation" onSubmit={submithandler}>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label className="form-control-label">Business Unit</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Inboxes size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} className="form-control edit" placeholder={businessunit.name}/>
                            </div>
                        </div>
                    </div>
                </div>
                <EditFormButtons valid={true} cancel={"/administration/businessUnits"}/>
            </form>
        </div>
    )
}
export default EditBusinessUnit;