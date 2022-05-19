import '../../index';
import Paginations from './pagination';
import Tablehook from '../../hooks/table-hook';
import { ArrowDownUp, Funnel } from 'react-bootstrap-icons';
import DepartmentItem from '../items/departmentItem';
import { useState } from 'react';

const DepartmentTable = (props) => {
    const [searchh, setsearchh] = useState('');
    const [searchterm, setSearchterm] = useState('');
    const [showSearchInput, setShowSearchInput] = useState(false);
    const{data,
        loading,
        paginations,
        show,
        pagenumber,itemperpage,
        loadingchange,
        sortHandler,
        handleChange,itemperpageHandler} = Tablehook("departments",searchh,["id","name","businessunit.name","businessline.name","status"],searchterm,props.search);
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
        <>
            <div className="table-responsive">
                <table className="table align-items-center mb-2">
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center text-xs font-weight-bold">Department - Pole&nbsp;<span data-sort="name" onClick={()=>sortHandler("name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("name")}}><Funnel size={15}/></span></th>
                            <th className="text-center text-xs font-weight-bold">Business Unit&nbsp;<span data-sort="name" onClick={()=>sortHandler("businessunit.name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("businessunit.name")}}><Funnel size={15}/></span></th>
                            <th className="text-center text-xs font-weight-bold">Business Line&nbsp;<span data-sort="name" onClick={()=>sortHandler("businessline.name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("businessline.name")}}><Funnel size={15}/></span></th>
                            <th className="text-center text-xs font-weight-bold">Status&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("status")}}><Funnel size={15}/></span></th>
                            <th className="text-center text-xs font-weight-bold">Actions</th>
                        </tr>
                        {showSearchInput && <tr>
                            {searchterm === "name" && <>
                                <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                <th colSpan="4" className="text-center text-xs font-weight-bold"></th>
                            </>}
                            {searchterm === "businessunit.name" && <>
                                <th className="text-center text-xs font-weight-bold"></th>
                                <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                <th colSpan="3" className="text-center text-xs font-weight-bold"></th>
                            </>}
                            {searchterm === "businessline.name" && <>
                                <th colSpan="2" className="text-center text-xs font-weight-bold"></th>
                                <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                <th colSpan="2" className="text-center text-xs font-weight-bold"></th>
                            </>}
                            {searchterm === "status" && <>
                                <th colSpan="3" className="text-center text-xs font-weight-bold"></th>                          
                                <th className="text-center text-xs font-weight-bold"><input onChange={searchStatus} placeholder="Search keywords"/></th>
                                <th className="text-center text-xs font-weight-bold"></th>
                            </>}
                        </tr>}
                    </thead>
                    <tbody>
                        {!loading && data.map((d) => (
                            <DepartmentItem key = {d.id}
                            status = {d.status}
                            loading = {loadingchange}
                            name = {d.name}
                            buname = {d["businessunit.name"]}
                            blname = {d["businessline.name"]}
                            id = {d.id}
                            />
                        ))}
                    </tbody>
                </table>
                {loading && <h5 className="h3 my-2 text-center">Loading...</h5>}
            </div>
            {!loading && show && <Paginations itemperpage={itemperpage} itemperpageHandler={itemperpageHandler} onchange={handleChange} page={pagenumber} search={props.search} pagination={paginations}/>}
            {!show && <h5 className="h3 my-2 text-center">No corresponding data</h5>}
        </>
    );
} 
export default DepartmentTable;