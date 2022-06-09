import axios from 'axios';
import { useState, useRef, useContext, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import EditFormButtons from "./editButtonsForm";
import AuthContext from "../../store/auth-context";
import { CurrencyExchange, CurrencyEuro } from "react-bootstrap-icons";
import "../../index.css";
import Selec from "../addForms/select";
import currencies from "../addForms/currency";

const EditCurrency = () => {   
    const nameRef = useRef();
    const dateRef = useRef();
    const rateRef = useRef();
    const navigate = useNavigate();
    var { id } = useParams();
    const authctx = useContext(AuthContext);
    const [currency, setCurrency] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/currencies/'+id,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setCurrency(response.data);
        })
    },[])
    const submithandler = (event) => {
        event.preventDefault(); 
        const code = nameRef.current.value;
        const appDate = dateRef.current.value;
        const rate = rateRef.current.value;
        const body = { };
        if (code.trim() !== ''){
            body["code"] = code;
        }
        if (appDate.trim() !== ''){
            body["appDate"] = new Date (dateRef.current.value).toISOString();
        }
        if (rate.trim() !== ''){
            body["euroCnvrRate"] = parseFloat(rateRef.current.value);
        }
        axios.patch('http://localhost:8000/api/currencies/'+id,body,{headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: "Bearer "+authctx.token
        }})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        navigate('/administration/currencies');  
    }
    var applicationDate = new Date(currency.appDate);
    var month = applicationDate.getMonth() + 1;
    var date = applicationDate.getDate() + "/" + month + "/" + applicationDate.getFullYear();
    
    return(
        <div className="card-body">
            <form className="needs-validation" onSubmit={submithandler}>
                <div className="row">
                    <div className="col-md-4">
                        {/* <div className="form-group">
                            <label className="form-control-label">Currency code</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><CurrencyExchange size={17}/></span>
                                </div>
                                <input type="text" ref={nameRef} className="form-control edit" placeholder={currency.code}/>
                            </div>
                        </div> */}
                        <Selec multi={false} ref={nameRef} full={false} data={currencies} placeholder={currency.code} selecType={"Currency code"}/>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Application date</label>
                            <input ref={dateRef} className="form-control edit" type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} default="" placeholder={date}/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="form-control-label">Euro conversion rate(€)</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><CurrencyEuro size={17}/></span>
                                </div>
                                <input ref={rateRef} className="form-control edit" type="number" step="any" default="0" placeholder={currency.euroCnvrRate}/>
                            </div>
                        </div>
                    </div>
                </div>
                <EditFormButtons valid={true} cancel={"/administration/currencies"}/>
            </form>
        </div>
    )
}
export default EditCurrency;