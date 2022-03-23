import useInput from "../../hooks/user-input"
import FormButtons from "./formbuttons";

const CustomerForm=(props)=>{
  const {value:namedValue,isValid:nameIsValid ,hasError:nameHasError, valueChangeHandler:nameChangeHandler , inputBlurHandler:nameBlurHandler,submissionHandler:submissionHandler}=useInput(value=>value.trim() !== '');
  const namevalid=nameHasError?"form-control is-invalid":"form-control  "
  const {value:groupdValue,isValid:groupIsValid ,hasError:groupHasError, valueChangeHandler:groupChangeHandler , inputBlurHandler:groupBlurHandler}=useInput(value=>value.trim() !== '');
  const groupvalid=groupHasError?"form-control is-invalid":"form-control  "

    return(
        <div className="card-body">
          <form className="needs-validation" onSubmit={submissionHandler}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Customer <span className="text-danger ">*</span></label>
               
               <input type="text" onChange={nameChangeHandler} onBlur={nameBlurHandler} className={namevalid} id="example3cols1Input" placeholder="name"/>
               {!nameIsValid && <div className="invalid-feedback">should not be empty</div>}
              </div>

            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols2Input">SAP Partner</label>
                <input type="text" className="form-control" id="example3cols2Input" placeholder="SAP Partner"/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols3Input">Business Unit</label>
                <select className="form-control" id="exampleFormControlSelect1">
                        <option value="" disabled defaultValue>Select business unit(s)</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Business Line</label>
                <select className="form-control" id="exampleFormControlSelect1">
                        <option value="" disabled defaultValue>Select business unit(s)</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols2Input">Pole/Department</label>
                <select className="form-control" id="exampleFormControlSelect1">
                        <option value="" disabled defaultValue>Select departments</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols3Input">Customer Group <span className="text-danger ">*</span></label>
                <input type="text" onChange={groupChangeHandler} onBlur={groupBlurHandler} className={groupvalid}  id="example3cols3Input" placeholder="Namee Customer Group"/>
                {!groupIsValid && <div className="invalid-feedback">should not be empty</div>}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols1Input">Country</label>
                <select className="form-control" id="exampleFormControlSelect1">
                        <option value="" disabled defaultValue>Select country</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-control-label" htmlFor="example3cols2Input">Area</label>
                <select className="form-control" id="exampleFormControlSelect1">
                        <option value="" disabled defaultValue>Select area</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                </select>
              </div>
            </div>
          </div>
          <FormButtons valid={nameIsValid&&groupIsValid}/>
          </form>
        </div>
    )
}
export default CustomerForm;