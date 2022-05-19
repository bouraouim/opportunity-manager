import { useState } from 'react';

const AddForm = (props) => {
    const[formValid, setFormValid] = useState(false);

    return(
        <div className="card mt-5 mb-5 ml-5 mr-5 pl-4 pr-4">
            <div className="card-header d-flex justify-content-between">
                <h3 className="mb-0">{props.name}</h3>
                <div className="gap-3 d-flex justify-content-between">
                    <h3 className="mx-2 mb-0">Status</h3>
                    <span className="badge badge-lg badge-success">Active</span>
                </div>
            </div>
            <div className="card-body">
                {props.formname}           
            </div>
        </div>
    );
};
export default AddForm;