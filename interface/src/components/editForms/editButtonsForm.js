import { useNavigate } from 'react-router-dom';
import { Pencil } from 'react-bootstrap-icons';

const EditFormButtons = (props) => {
    const navigate = useNavigate();
    return(
        <>
            <hr/>   
            <div className="d-flex justify-content-between">
                <button type="button" onClick={() => navigate(props.cancel)} className="rounded-pill btn d-flex align-items-center btn-danger"><i className="ni fa-2x ni-fat-remove"></i>&nbsp;CANCEL</button>  
                <button className="d-flex align-items-center rounded-pill btn btn-success" disabled={!props.valid} type="submit"><Pencil size={18}/>&nbsp;EDIT</button>
            </div>
        </>
    )
}
export default EditFormButtons;