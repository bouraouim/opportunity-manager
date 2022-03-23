import { useState } from 'react'


const AddForm=( props  )=>{

    const[formValid,setFormValid]=useState(false)
    return(
        <>
        <div className="d-flex align-items-center justify-content-center">
            <div className="container mt-6">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h3 className="mb-0">{props.name}</h3>
                        <div className="gap-3 d-flex justify-content-between">
                            <h3 className="mx-2 mb-0">Status     </h3>
                            <span className="badge badge-lg badge-success">Active</span>
                        </div>
                    </div>
                    <div className="card-body">
                        {props.formname}           
                    </div>
                </div>
            </div>
        </div>
    </>
);
};
export default AddForm;