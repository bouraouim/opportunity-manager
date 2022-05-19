import { useNavigate } from "react-router-dom";
import { Funnel } from "react-bootstrap-icons";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import "../../index.css";
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const TableLayout = (props) => { 
    const navigate = useNavigate();
    const authctx = useContext(AuthContext);
    const reset = () => {
        props.resetsearch() 
    }
    var addArea = props.name === "Area" & authctx.createAreas;
    var addBusinessUnit = props.name === "Business Unit" & authctx.createBusinessUnits;
    var addCurrency = props.name === "Currency" & authctx.createCurrencies;
    var addCustomer = props.name === "Customer" & authctx.createCustomers;
    var addDepartment = props.name === "Department - Pole" & authctx.createDepartments;
    var addPresales = props.name === "Presales Engineer" & authctx.createPresalesEngineers;
    var addProductLine = props.name === "Product Line" & authctx.createProductLines;
    var addBusinessLine = props.name === "Business Line" & authctx.createBusinessLines;
    var addGeography = props.name === "Geography" & authctx.createGeographies;
    var addUser = props.name === "User" & authctx.createUsers;

    return(
        <>
            <NotificationContainer/>
            <div className="card mt-5 mb-5 ml-5 mr-5 pl-4 pr-4">
                <div className="card-header d-flex justify-content-between">
                    <div>
                        {
                        (addArea || addBusinessUnit || addCurrency || addCustomer || addDepartment || addPresales || addProductLine || addBusinessLine || addGeography || addUser)
                            &&
                            <>    
                                <button onClick={()=>{navigate(props.link)}} className="rounded-pill btn btn-icon btn-success" type="button">
                                    <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                                    <span className="btn-inner--text">Add {props.name}</span>
                                </button>
                            </>
                        }
                    </div>
                    <div>
                        <div id="datatable-basic_filter" className="dataTables_filter d-flex justify-content-between">
                            <div className="input-group mb-3">
                                <input onChange={props.search} type="search" value={props.searchvalue} className="form-control" placeholder="Search keywords" aria-controls="datatable-basic"/>
                                <div className="input-group-append">
                                    <span className="input-group-text"><Funnel type="button" onClick={reset} size={17}/></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {props.table}
                    </div>
                </div>
            </div>
        </>
    )
}
export default TableLayout;