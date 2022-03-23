import useInput from "../../hooks/user-input"
import FormButtons from "./formbuttons";

const BusinessUnitForm=()=>{
  const {value:namedValue,isValid:nameIsValid ,hasError:nameHasError, valueChangeHandler:nameChangeHandler , inputBlurHandler:nameBlurHandler,submissionHandler:submissionHandler}=useInput(value=>value.trim() !== '');
  const namevalid=nameHasError?"form-control is-invalid":"form-control  "

    return(
        <div className="card-body">
          <form className="needs-validation" onSubmit={submissionHandler}>
          <div className="row">
              <div className="form-group col">
                <label className="form-control-label" htmlFor="example3cols1Input">Business unit <span className="text-danger ">*</span></label>
                <input type="text" onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} id="example3cols1Input" placeholder="name"/>
                {!nameIsValid && <div className="invalid-feedback">should not be empty</div>}
              </div>
            </div>
            <FormButtons valid={nameIsValid}/>
            </form>
        </div>
    )
}

export default BusinessUnitForm