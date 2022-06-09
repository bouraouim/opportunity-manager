import useInput from "../../hooks/user-input";
import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import AddFormButtons from "./addFormButtons";
import { Inboxes } from "react-bootstrap-icons";
import { NotificationManager } from 'react-notifications';

const AddBusinessUnit = () => {
  const {isValid:nameIsValid, hasError:nameHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler:nameBlurHandler} = useInput(value=>value.trim() !== '');
  const namevalid = nameHasError?"form-control is-invalid":"form-control";
  const nameIconValid = nameHasError?"input-group-text invalide":"input-group-text";
  const nameRef = useRef();
  const navigate = useNavigate();

  //Add Function
  const submithandler = (event) => {
    event.preventDefault(); 
    const name = nameRef.current.value;
    const body = {
      "name": name
    }
    axios.post('http://localhost:8000/api/businessunits',body)
    .then(function (response) {
      console.log(response);
      NotificationManager.success('The Business Unit has been successfully added !');
    })
    .catch(function (error) {
      NotificationManager.error('The Business Unit has not been added !');
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
              <label className="form-control-label">Business Unit<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className={nameIconValid}><Inboxes size={17}/></span>
                </div>
                <input type="text" ref={nameRef} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} placeholder="Name of Business Unit"/>
                {!nameIsValid && <div className="invalid-feedback">Name of Business Unit should not be empty</div>}
              </div>
            </div>
          </div>
        </div>
        <AddFormButtons valid={nameIsValid} cancel={"/administration/businessUnits"}/>
      </form>
    </div>
  )
}
export default AddBusinessUnit;