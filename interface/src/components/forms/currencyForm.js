
import useInput from "../../hooks/user-input"
import FormButtons from "./formbuttons";
const CurrencyForm=()=>{
  const {value:namedValue,isValid:nameIsValid ,hasError:nameHasError, valueChangeHandler:nameChangeHandler , inputBlurHandler:nameBlurHandler,submissionHandler:submissionHandler}=useInput(value=>value.trim() !== '');
  const namevalid=nameHasError?"form-control is-invalid":"form-control  "

  const {value:datedValue,isValid:dateIsValid ,hasError:dateHasError, valueChangeHandler:dateChangeHandler , inputBlurHandler:dateBlurHandler}=useInput(value=>value.trim() !== '');
  const datevalid=dateHasError?"form-control is-invalid":"form-control  "

  const {value:rateValue,isValid:rateIsValid ,hasError:rateHasError, valueChangeHandler:rateChangeHandler , inputBlurHandler:rateBlurHandler}=useInput(value=>value.trim() !== '');
  const ratevalid=rateHasError?"form-control is-invalid":"form-control  "
    return(
        <div className="card-body">
          <form className="needs-validation" onSubmit={submissionHandler}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Currency code <span className="text-danger ">*</span></label>
                <input type="text" onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} id="example3cols1Input" placeholder="name"/>
                {!nameIsValid && <div className="invalid-feedback">should not be empty</div>}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols2Input">Application date <span className="text-danger ">*</span></label>
                <input className={datevalid} onChange={dateChangeHandler} onBlur={dateBlurHandler}  type="date" value="2018-11-23" id="example-date-input"/>
                {!dateIsValid && <div className="invalid-feedback">should not be empty</div>}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols3Input">Euro conversion rate <span className="text-danger ">*</span></label>
                <input className={ratevalid}  onChange={rateChangeHandler} onBlur={rateBlurHandler}  type="number" value="23" id="example-number-input"/>
                {!rateIsValid && <div className="invalid-feedback">should not be empty</div>}
              </div>
            </div>
          </div>
          <FormButtons valid={nameIsValid && dateIsValid && rateIsValid}/>
          </form>
        </div>
    )
}
export default CurrencyForm;