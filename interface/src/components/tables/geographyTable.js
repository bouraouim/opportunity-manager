import React, { useState } from 'react';
import '../../index';
import Tablehook from '../../hooks/table-hook';
import Geographyitem from '../items/geographyitel';
import Paginations from './pagination';
import Modalinput from './modalInputs';
import { ArrowDownUp, Funnel } from 'react-bootstrap-icons';


const GeographyTable=(props)=> {

    const [searchh,setsearchh]=useState('')
    const [searchterm,setSearchterm]=useState('')
    const [showSearchInput, setShowSearchInput] = useState(false);

    const{data,
        loading,
        paginations,
        show,
        pagenumber,
        itemperpage,
        loadingchange,
        sortHandler,
        handleChange}=Tablehook("geographies",searchh,["id","country",'area.name',"continent","status"],searchterm,props.search)

const searchclick=(n)=>{
    setSearchterm(n)}

    const handleSearchInputs = () => {
        if(showSearchInput === true){
            setShowSearchInput(false);
            setsearchh('');
        }
        else{
            setShowSearchInput(true);
        }
    }



const  searchchange=(e)=>{
    setsearchh(e.target.value)
}       

const   statusHandler=()=>{
    setSearchterm("status")
    if(searchh=="false")
        {setsearchh("true")} 
    else 
    {setsearchh("false")} 
           }
        return(
            <>
            <div className="table-responsive">
                <table className="table align-items-center mb-2">
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center  text-xs font-weight-bold" scope="col" data-sort="name">Country <span onClick={()=>sortHandler("country")}><ArrowDownUp size={15}/></span> <i onClick={()=>{searchclick("country")
                        handleSearchInputs();}} type="button"><Funnel size={15}/></i>  </th>
                            <th className="text-center text-xs font-weight-bold" data-sort="name" >Area <span onClick={()=>sortHandler("area.name")}><ArrowDownUp size={15}/></span> <i onClick={()=>{searchclick("area.name")
                        handleSearchInputs();}} type="button"><Funnel size={15}/></i> </th>
                            <th className="text-center text-xs font-weight-bold" data-sort="name" >Continent <span onClick={()=>sortHandler("continent")}><ArrowDownUp size={15}/></span> <i onClick={()=>{searchclick("continent")
                        handleSearchInputs();}} type="button"><Funnel size={15}/></i> </th>
                            <th className="text-center text-xs font-weight-bold">Status</th>
                            <th className="text-center text-xs font-weight-bold">Actions</th>
                        </tr>
                        {showSearchInput && <tr>
                            {searchterm === "country" && <>
                                <th className="text-center text-xs font-weight-bold"><input onChange={searchchange} placeholder="Search keywords"/></th>
                                <th colspan="3" className="text-center text-xs font-weight-bold"></th>
                              
                            </>}
                            {searchterm === "area.name" && <>
                                <th className="text-center text-xs font-weight-bold"></th>
                                <th className="text-center text-xs font-weight-bold"><input onChange={searchchange} placeholder="Search keywords" type="text"/></th>
                                <th className="text-center text-xs font-weight-bold"></th>
                                <th className="text-center text-xs font-weight-bold"></th>
                            </>}
                            {searchterm === "continent" && <>
                                <th className="text-center text-xs font-weight-bold"></th>
                                <th className="text-center text-xs font-weight-bold"></th>
                                <th className="text-center text-xs font-weight-bold"><input onChange={searchchange} placeholder="Search keywords" type="text"/></th>
                                <th className="text-center text-xs font-weight-bold"></th>
                                
                            </>}
                            <th className="text-center text-xs font-weight-bold"></th>
                        </tr>}
                    </thead>
                    <tbody>
                    {!loading && data.map((d) => (
                        <Geographyitem key={d.id}
                        status={d.status}
                        loading={loadingchange}
                        country={d.country}
                        area={d["area.name"]}
                        continent={d.continent}
                        id={d.id}
                        />
                    ))}
                    </tbody>
                </table>
                    {loading && <h5 className="h3 my-2 text-center">Loading...</h5>}
            </div>
            {!loading && show && <Paginations itemperpage={itemperpage} onchange={handleChange} page={pagenumber} search={props.search}  pagination={paginations}/>}
            {!show && <h5 className="h3 my-2 text-center">no corresponding data</h5>}
            <Modalinput onchange={searchchange}/>
          </>
        );
}
 
export default GeographyTable;