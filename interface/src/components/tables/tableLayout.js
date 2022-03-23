import BusinessLineTable from "./businessLineTable";
import BusinessUnitTable from "./businessUnitTable"
import CurrencyTable from "./currencyTable";
import CustomerTable from "./customerTable";
import GeographyTable from "./geographyTable";
import UserTable from "./userTable";
import AnonymizedTable from "./anonymizedTable";
import AreaTable from "./areaTable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const TableLayout=(props)=>{ 
    const navigate=useNavigate();

    
    return(
        <div className="card mt-5 mb-5 ml-5 mr-5 pl-4 pr-4">
        <div className="card-header d-flex justify-content-between">
            <div className="">
                <button onClick={()=>{ navigate(props.link)  }} className=" rounded-pill btn btn-icon btn-success" type="button">
                    <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                    <span className="btn-inner--text">Add {props.name }</span>
                </button>
            </div>
            <div className="">
                <div id="datatable-basic_filter" className="dataTables_filter d-flex justify-content-between">
                    <input onChange={props.search} type="search" className="form-control form-control-sm" placeholder="Search keywords" aria-controls="datatable-basic"/>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                 {props.table }
            </div>
        </div>
    </div>
    )
}

export default TableLayout