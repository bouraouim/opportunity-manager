import React, { useState } from 'react';
import '../../index';
import Tablehook from '../../hooks/table-hook';
import Geographyitem from './items/geographyitel';
import Paginations from './pagination';
import Modalinput from './modalInputs';




const GeographyTable=(props)=> {

    const [searchh,setsearchh]=useState('')
    const [searchterm,setSearchterm]=useState('')
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
                            <th className="text-center  text-xs font-weight-bold" scope="col" data-sort="name" onClick={()=>sortHandler("country")} >Country <span> <i className="bi bi-arrow-down-up"></i></span> </th>
                            <th className="text-center text-xs  font-weight-bold" data-sort="name" onClick={()=>sortHandler("area.name")}>Area</th>
                            <th className="text-center text-xs  font-weight-bold" data-sort="name" onClick={()=>sortHandler("continent")}>Continent</th>
                            <th className="text-center text-xs font-weight-bold">Status</th>
                            <th className="text-center text-xs font-weight-bold">Actions</th>
                        </tr>
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
          </>
        );
}
 
export default GeographyTable;