import '../../index';
import Paginations from './pagination';
import Tablehook from '../../hooks/table-hook';
import { ArrowDownUp, Funnel } from 'react-bootstrap-icons';
import CurrencyItem from '../items/currencyItem';
import { useState } from 'react';

const CurrencyTable = (props) => {
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
        handleChange,itemperpageHandler} = Tablehook("currencies",searchh,["id","code",'appDate','euroCnvrRate',"status"],searchterm,props.search);
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
                            <th className="text-center text-xs font-weight-bold">Currency code&nbsp;<span data-sort="name" onClick={()=>sortHandler("code")}><ArrowDownUp size={15}/></span>&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("code")}}><Funnel size={15}/></span></th>
                            <th className="text-center text-xs font-weight-bold">Application date&nbsp;<span data-sort="name" onClick={()=>sortHandler("appDate")}><ArrowDownUp size={15}/></span></th>
                            <th className="text-center text-xs font-weight-bold">Euro convertion rate (€)&nbsp;<span data-sort="name" onClick={()=>sortHandler("euroCnvrRate")}><ArrowDownUp size={15}/></span></th>
                            <th className="text-center text-xs font-weight-bold">Status&nbsp;<span onClick={()=>{handleSearchInputs(); searchClick("status")}}><Funnel size={15}/></span></th>
                            <th className="text-center text-xs font-weight-bold">Actions</th>
                        </tr>
                        {showSearchInput && <tr>
                            {searchterm === "code" && <>
                                <th className="text-center text-xs font-weight-bold"><input onChange={searchChange} placeholder="Search keywords"/></th>
                                <th className="text-center text-xs font-weight-bold"></th>
                                <th className="text-center text-xs font-weight-bold"></th>
                                <th className="text-center text-xs font-weight-bold"></th>
                            </>}
                            {searchterm === "status" && <>
                                <th className="text-center text-xs font-weight-bold"></th>
                                <th className="text-center text-xs font-weight-bold"></th>
                                <th className="text-center text-xs font-weight-bold"></th>
                                <th className="text-center text-xs font-weight-bold"><input onChange={searchStatus} placeholder="Search keywords"/></th>
                            </>}
                            <th className="text-center text-xs font-weight-bold"></th>
                        </tr>}
                    </thead>
                    <tbody>
                        {!loading && data.map((d) => (
                            <CurrencyItem key = {d.id}
                            status = {d.status}
                            loading = {loadingchange}
                            code = {d.code}
                            appDate = {d.appDate}
                            rate = {d.euroCnvrRate}
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
export default CurrencyTable;