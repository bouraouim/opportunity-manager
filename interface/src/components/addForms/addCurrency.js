import useInput from "../../hooks/user-input";
import axios from 'axios';
import { useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AddFormButtons from "./addFormButtons";
import AuthContext from '../../store/auth-context';
import { CurrencyEuro, CurrencyExchange } from "react-bootstrap-icons";
import "../../index.css";

const AddCurrency = () => {
  const {isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler} = useInput(value=>value.trim() !== '');
  const namevalid = nameHasError?"form-control is-invalid":"form-control";
  const {isValid:dateIsValid, hasError:dateHasError, valueChangeHandler:dateChangeHandler, inputBlurHandler:dateBlurHandler} = useInput(value=>value.trim() !== '');
  const datevalid = dateHasError?"form-control is-invalid":"form-control";
  const {isValid:rateIsValid, hasError:rateHasError, valueChangeHandler:rateChangeHandler, inputBlurHandler:rateBlurHandler} = useInput(value=>value.trim() !== '');
  const ratevalid = rateHasError?"form-control is-invalid":"form-control";
  const nameRef = useRef();
  const dateRef = useRef();
  const rateRef = useRef();
  const navigate = useNavigate();
  const authctx = useContext(AuthContext);
  const submithandler = (event) => {
    event.preventDefault(); 
    const code = nameRef.current.value;
    const appDate = new Date (dateRef.current.value).toISOString();
    const rate = parseFloat(rateRef.current.value);
    const body = {
      "code": code,
      "appDate": appDate,
      "euroCnvrRate": rate
    }
    axios.post('http://localhost:8000/api/currencies',body,{headers: {Authorization: "Bearer "+authctx.token
    }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    navigate('/administration/currencies');  
  }

  return(
    <div className="card-body">
      <form className="needs-validation" onSubmit={submithandler}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Currency code<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><CurrencyExchange size={17}/></span>
                </div>
                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} placeholder="Currency in international standard"/>
                {!nameIsValid && <div className="invalid-feedback">Should not be empty</div>}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Application date<span className="text-danger ">*</span></label>
              <input ref={dateRef} className={datevalid} onChange={dateChangeHandler} onBlur={dateBlurHandler} type="date" required/>
              {!dateIsValid && <div className="invalid-feedback">Should not be empty</div>}
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-control-label">Euro conversion rate(€)<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><CurrencyEuro size={17}/></span>
                </div>
                <input ref={rateRef} className={ratevalid} onChange={rateChangeHandler} onBlur={rateBlurHandler} type="number" step="any"/>
                {!rateIsValid && <div className="invalid-feedback">Should not be empty</div>}
              </div>
            </div>
          </div>
        </div>
        <AddFormButtons valid={nameIsValid && dateIsValid && rateIsValid} cancel={"/administration/currencies"}/>
      </form>
    </div>
  )
}
export default AddCurrency;