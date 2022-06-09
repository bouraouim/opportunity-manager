import { useNavigate } from 'react-router-dom';

const AddFormButtons = (props) => {
    const navigate = useNavigate();
    return(
        <>
            <hr/>   
            <div className="d-flex justify-content-between">
                <button type="button" onClick={() => navigate(props.cancel)} className=" rounded-pill btn d-flex align-items-center btn-danger"><i className="ni fa-2x ni-fat-remove"></i>CANCEL</button>  
                <button className="d-flex align-items-center rounded-pill btn btn-success" disabled={!props.valid} type="submit"><i className="ni fa-2x ni-fat-add"></i>ADD</button>
            </div>
        </>
    )
}
export default AddFormButtons;