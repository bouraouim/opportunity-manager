import { useState, useContext } from 'react';
import { ArrowDownUp, Funnel, FileEarmarkArrowDown } from 'react-bootstrap-icons';
import '../../index';
import Paginations from './pagination';
import Tablehook from '../../hooks/table-hook';
import OpportunityItem from '../items/opportunityItem';
import { NavLink} from "react-router-dom";
import AuthContext from "../../store/auth-context";

const OpportunitiesTable = (props) => { 
    const [searchh, setsearchh] = useState('');
    const [searchterm, setSearchterm] = useState('');
    const [showSearchInput, setShowSearchInput] = useState(false);
    const authctx = useContext(AuthContext);
    const{data,
        loading,
        paginations,
        show,
        pagenumber,itemperpage,
        loadingchange,
        sortHandler,
        handleChange,itemperpageHandler} = Tablehook("opportunities",searchh,["id","creationDate","successRate","stage","status", 'salesManager.username','businessunit.name','countries.country',"description","reference","revenueStartPlanned","revenueStartAchieved"],searchterm,props.search);

    const searchClick = (n) => {
        setSearchterm(n);
    }            
    const searchChange = (e) => {
        setsearchh(e.target.value);
    }
    const handleSearchInputs = () => {
        if(showSearchInput === true){
            setShowSearchInput(false);
            setsearchh('');
        }
        else{
            setShowSearchInput(true);
        }
    }
    const searchStatus = (e) => {
        if(e.target.value.toUpperCase() === "Passive".toUpperCase()){
            setsearchh("false");
        }
        else{
            setsearchh("true");
        }
    }

    return(
        <div className="card mt-5 mb-5 ml-5 mr-5 pl-4 pr-4">
            <div className="card-header d-flex justify-content-between"> 
                <div className="">
                    {authctx.createOpportunities &&
                    <NavLink to="/opportunities/new">
                        <button className="rounded-pill btn btn-icon btn-success" type="button">
                            <span className="btn-inner--icon"><i className="ni ni-fat-add"></i></span>
                            <span className="btn-inner--text">Add Opportunity</span>
                        </button>
                    </NavLink>}
                </div>
                <div id="datatable-basic_filter" className="dataTables_filter d-flex justify-content-center align-items-center">
                    <button className=" rounded-pill d-flex justify-content-center align-items-center btn btn-success" type="button">
                        <FileEarmarkArrowDown size={20}/>
                    </button>
                    &nbsp;
                    <input type="search" className="form-control form-control-sm" placeholder="Search keywords" aria-controls="datatable-basic"/>
                </div>
            </div>
            <div className="row">
                <div className="col w-auto">
                    <div className="mb-2 table-responsive">
                        <table className="table align-items-center">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center text-xs font-weight-bold">Opportunity Reference&nbsp;<span data-sort="name" onClick={()=>sortHandler("reference")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("reference")}}><Funnel size={15}/></span></th>
                                    <th className="text-center text-xs font-weight-bold">Creation Date&nbsp;<span data-sort="name" onClick={()=>sortHandler("creationDate")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("creationDate")}}><Funnel size={15}/></span></th>
                                    {/* <th className="text-center text-xs font-weight-bold">Department&nbsp;<span data-sort="name" onClick={()=>sortHandler("department.name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("department.name")}}><Funnel size={15}/></span></th> */}
                                    <th className="text-center text-xs font-weight-bold">Sales Manager&nbsp;<span data-sort="name" onClick={()=>sortHandler("salesManager.username")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("salesManager.name")}}><Funnel size={15}/></span></th>
                                    <th className="text-center text-xs font-weight-bold">Country&nbsp;<span data-sort="name" onClick={()=>sortHandler("country")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("country")}}><Funnel size={15}/></span></th>
                                    {/* <th className="text-center text-xs font-weight-bold">Customer&nbsp;<span data-sort="name" onClick={()=>sortHandler("customer.name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("customer.name")}}><Funnel size={15}/></span></th> */}
                                    <th className="text-center text-xs font-weight-bold">Description&nbsp;<span data-sort="name" onClick={()=>sortHandler("description")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("description")}}><Funnel size={15}/></span></th>
                                    {/* <th className="text-center text-xs font-weight-bold">Total Value&nbsp;<span data-sort="name" onClick={()=>sortHandler("totalValue")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("totalValue")}}><Funnel size={15}/></span></th> */}
                                    <th className="text-center text-xs font-weight-bold">Success Rate&nbsp;<span data-sort="name" onClick={()=>sortHandler("successRate")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("successRate")}}><Funnel size={15}/></span></th>
                                    <th className="text-center text-xs font-weight-bold">Stage&nbsp;<span data-sort="name" onClick={()=>sortHandler("stage")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("stage")}}><Funnel size={15}/></span></th>
                                    {/* <th className="text-center text-xs font-weight-bold">Presales Engineer&nbsp;<span data-sort="name" onClick={()=>sortHandler("presales.name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("presales.name")}}><Funnel size={15}/></span></th> */}
                                    <th className="text-center text-xs font-weight-bold">Award Date (Planned)&nbsp;<span data-sort="name" onClick={()=>sortHandler("awardDatePlanned")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("awardDatePlanned")}}><Funnel size={15}/></span></th>
                                    <th className="text-center text-xs font-weight-bold">Award Date (Achieved)&nbsp;<span data-sort="name" onClick={()=>sortHandler("awardDateAchieved")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("awardDateAchieved")}}><Funnel size={15}/></span></th>
                                    {/* <th className="text-center text-xs font-weight-bold">Business Line<span data-sort="name" onClick={()=>sortHandler("businessLine.name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("businessLine.name")}}><Funnel size={15}/></span></th> */}
                                    <th className="text-center text-xs font-weight-bold">Business Unit&nbsp;<span data-sort="name" onClick={()=>sortHandler("businessUnit.name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("businessUnit.name")}}><Funnel size={15}/></span></th>
                                    <th className="text-center text-xs font-weight-bold">Satuts&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("status")}}><Funnel size={15}/></span></th>
                                    <th className="text-center text-xs font-weight-bold">Actions</th>
                                </tr>
                                {showSearchInput && <tr>
                                    {searchterm === "reference" && <>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="16" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "creationDate" && <>
                                        <th className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="15" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "department.name" && <>
                                        <th colSpan="2" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="14" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "salesManager.name" && <>
                                        <th colSpan="3" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="13" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "country" && <>
                                        <th colSpan="4" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="12" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "customer.name" && <>
                                        <th colSpan="5" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="11" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "description" && <>
                                        <th colSpan="6" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="10" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "totalValue" && <>
                                        <th colSpan="7" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="9" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "successRate" && <>
                                        <th colSpan="8" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="8" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "stage" && <>
                                        <th colSpan="9" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="7" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "presales.name" && <>
                                        <th colSpan="10" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="6" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "awardDatePlanned" && <>
                                        <th colSpan="11" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="5" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "awardDateAchieved" && <>
                                        <th colSpan="12" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="4" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "businessLine.name" && <>
                                        <th colSpan="13" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="3" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "businessUnit.name" && <>
                                        <th colSpan="14" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                        <th colSpan="2" className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                    {searchterm === "status" && <>
                                        <th colSpan="15" className="text-center text-xs font-weight-bold"></th>
                                        <th className="text-center text-xs font-weight-bold"><input onChange={searchStatus} placeholder="Search keywords"/></th>
                                        <th className="text-center text-xs font-weight-bold"></th>
                                    </>}
                                </tr>}
                            </thead>
                            <tbody>
                                {!loading && data.map((d) => (
                                    <OpportunityItem key = {d.id}
                                    status = {d.status}
                                    loading = {loadingchange}
                                    id = {d.id}
                                    refe = {d.reference}
                                    creationDate = {d.creationDate}
                                    // deptname = {d["department.name"]}
                                    salesManagerName = {d["salesManager.username"]}
                                    country = {d["countries.country"]}
                                    // custname = {d["customer.name"]}
                                    descrip = {d.description}
                                    // totalValue = {d.totalValue}
                                    successRate = {d.successRate} 
                                    stage = {d.stage}
                                    // presalesname = {d["presales.name"]}
                                    awardDatePlanned = {d.revenueStartPlanned}
                                    awardDateAchieved = {d.revenueStartAchieved}
                                    // blname = {d["businessline.name"]}
                                    buname = {d["businessunit.name"]}
                                    />
                                ))}
                            </tbody>
                        </table>
                        {loading && <h5 className="h3 my-2 text-center">Loading...</h5>}
                    </div>
                    {!loading && show && <Paginations itemperpage={itemperpage} itemperpageHandler={itemperpageHandler} onchange={handleChange} page={pagenumber} search={props.search} pagination={paginations}/>}
                    {!show && <h5 className="h3 my-2 text-center">No corresponding data</h5>}
                </div>
            </div>
        </div>
    );
}
export default OpportunitiesTable;