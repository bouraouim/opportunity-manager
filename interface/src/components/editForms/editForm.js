import { useState } from 'react';

const EditForm = (props) => {
    const[formValid, setFormValid] = useState(false);
    return(
        <div className="card mt-5 mb-5 ml-5 mr-5 pl-4 pr-4">
            <div className="card-header d-flex justify-content-between">
                <h3 className="mb-0">{props.name}</h3>
            </div>
            <div className="card-body">
                {props.formname}           
            </div>
        </div>
    );
};
export default EditForm;