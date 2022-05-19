import React, { useState } from 'react';
import Tablehook from '../../hooks/table-hook';
import '../../index';
import { ArrowDownUp, Funnel } from 'react-bootstrap-icons';
import CustomerItem from '../items/customerItem';
import Paginations from './pagination';

const CustomerTable = (props) => {
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
        handleChange,itemperpageHandler} = Tablehook("customers",searchh,["id","name","sapPartner","businessunit.name",'businessline.name','department.name','custGroup',"areas.name","count.country","status"],searchterm,props.search);
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

    return (
        <div className="table-responsive">
            <table className="table align-items-center">
                <thead className="table-dark">
                    <tr>
                        <th className="text-center text-xs font-weight-bold">Customer&nbsp;<span onClick={()=>sortHandler("name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("name")}} type="button"><Funnel size={15}/></span></th>
                        <th className="text-center text-xs font-weight-bold">SPA partner&nbsp;<span onClick={()=>sortHandler("sapPartner")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("sapPartner")}} type="button"><Funnel size={15}/></span></th>
                        <th className="text-center text-xs font-weight-bold">Business Unit&nbsp;<span onClick={()=>sortHandler("businessunit.name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("businessunit.name")}} type="button"><Funnel size={15}/></span></th>
                        <th className="text-center text-xs font-weight-bold">Business Line&nbsp;<span onClick={()=>sortHandler("businessline.name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("businessline.name")}} type="button"><Funnel size={15}/></span></th>
                        <th className="text-center text-xs font-weight-bold">Pole / Departement&nbsp;<span onClick={()=>sortHandler("department.name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("department.name")}} type="button"><Funnel size={15}/></span></th>
                        <th className="text-center text-xs font-weight-bold">Customer Group&nbsp;<span onClick={()=>sortHandler("custGroup")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("custGroup")}} type="button"><Funnel size={15}/></span></th>
                        <th className="text-center text-xs font-weight-bold">Area&nbsp;<span onClick={()=>sortHandler("areas.name")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("areas.name")}} type="button"><Funnel size={15}/></span></th>
                        <th className="text-center text-xs font-weight-bold">Country&nbsp;<span onClick={()=>sortHandler("count.country")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("count.country")}} type="button"><Funnel size={15}/></span></th>
                        <th className="text-center text-xs font-weight-bold">Status&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("status")}}><Funnel size={15}/></span></th>
                        <th className="text-center text-xs font-weight-bold">Actions</th>
                    </tr>
                    {showSearchInput && <tr>
                        {searchterm === "name" && <>
                            <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                            <th colSpan="9" className="text-center text-xs font-weight-bold"></th>
                        </>}
                        {searchterm === "sapPartner" && <>
                            <th className="text-center text-xs font-weight-bold"></th>
                            <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords" type="text"/></th>
                            <th colSpan="8" className="text-center text-xs font-weight-bold"></th>
                        </>}
                        {searchterm === "businessunit.name" && <>
                            <th colSpan="2" className="text-center text-xs font-weight-bold"></th>
                            <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                            <th colSpan="7" className="text-center text-xs font-weight-bold"></th>
                        </>}
                        {searchterm === "businessline.name" && <>
                            <th colSpan="3" className="text-center text-xs font-weight-bold"></th>
                            <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                            <th colSpan="6" className="text-center text-xs font-weight-bold"></th>
                        </>}
                        {searchterm === "department.name" && <>
                            <th colSpan="4" className="text-center text-xs font-weight-bold"></th>
                            <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                            <th colSpan="5" className="text-center text-xs font-weight-bold"></th>
                        </>}
                        {searchterm === "custGroup" && <>
                            <th colSpan="5" className="text-center text-xs font-weight-bold"></th>
                            <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                            <th colSpan="4" className="text-center text-xs font-weight-bold"></th>
                        </>}
                        {searchterm === "areas.name" && <>
                            <th colSpan="6" className="text-center text-xs font-weight-bold"></th>
                            <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                            <th colSpan="3" className="text-center text-xs font-weight-bold"></th>
                        </>}
                        {searchterm === "count.country" && <>
                            <th colSpan="7" className="text-center text-xs font-weight-bold"></th>
                            <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                            <th colSpan="2" className="text-center text-xs font-weight-bold"></th>
                        </>}
                        {searchterm === "status" && <>
                            <th colSpan="8" className="text-center text-xs font-weight-bold"></th>
                            <th className="text-center text-xs font-weight-bold"><input onChange={searchStatus} placeholder="Search keywords"/></th>
                            <th className="text-center text-xs font-weight-bold"></th>
                        </>}
                    </tr>}
                </thead>
                <tbody>
                    {!loading && data.map((d) => (
                        <CustomerItem key={d.id}
                        status={d.status}
                        name={d.name}
                        loading={loadingchange}
                        bunit={d["businessunit.name"]}
                        bline={d["businessline.name"]}
                        group={d.custGroup}
                        sap={d.sapPartner}
                        department={d["department.name"]}
                        area={d["areas.name"]}
                        country={d["count.country"]}
                        id={d.id}                                
                        />
                    ))}
                </tbody>
            </table>
            {loading && <h5 className="h3 my-2 text-center">Loading...</h5>}
            {!loading && show && <Paginations itemperpage={itemperpage} itemperpageHandler={itemperpageHandler} onchange={handleChange} page={pagenumber} search={props.search} pagination={paginations}/>}
            {!show && <h5 className="h3 my-2 text-center">No corresponding data</h5>}
        </div>
    );
}
export default CustomerTable;