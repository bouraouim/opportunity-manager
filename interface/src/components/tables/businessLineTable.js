import React, { PureComponent, useEffect, useState } from 'react';
import '../../index';
import BusinessLineItem from './items/businesslineitem';
import Paginations from './pagination';
import Tablehook from '../../hooks/table-hook';
import Modalinput from './modalInputs';



const BusinessLineTable=(props)=>{

    const [searchh,setsearchh]=useState('')
    const [searchterm,setSearchterm]=useState('')

    
    
    const{data,
        loading,
        paginations,
        show,
        pagenumber,itemperpage,
        loadingchange,
        sortHandler,
        handleChange,itemperpageHandler}=Tablehook("businesslines",searchh,["id","name",'businessunit.name','businessunit.id',"status"],searchterm,props.search)

        

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
               console.log(data)
         return( <>
            <div className="table-responsive">
                <table className="table align-items-center mb-2">
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center  text-xs font-weight-bold" scope="col" data-sort="name" >Business Line <span onClick={()=>sortHandler("name")}>&#8645;</span> <i onClick={()=>{searchclick("name")}} data-toggle="modal" data-target="#exampleModal" type="button"  class="fas fa-filter" > </i> <span> <i className="bi bi-arrow-down-up"></i></span> </th>
                            <th className="text-center text-xs  font-weight-bold" data-sort="name" >Business Unit <span onClick={()=>sortHandler("businessunit.name")}>&#8645;</span> <i onClick={()=>{searchclick("businessunit.name")}} data-toggle="modal" data-target="#exampleModal" type="button"  class="fas fa-filter" > </i></th>
                            <th className="text-center text-xs font-weight-bold">Status</th>
                            <th className="text-center text-xs font-weight-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {!loading && data.map((d) => (
                        <BusinessLineItem key={d.name}
                        status={d.status}
                        loading={loadingchange}
                        name={d.name}
                        buname={d["businessunit.name"]}
                        buid={d["businessunit.id"]}
                        id={d.id}
                        />
                    ))}
                    </tbody>
                </table>
                    {loading && <h5 className="h3 my-2 text-center">Loading...</h5>}
            </div>
            {!loading && show && <Paginations itemperpage={itemperpage} itemperpageHandler={itemperpageHandler} onchange={handleChange} page={pagenumber} search={props.search}  pagination={paginations}/>}
            {!show && <h5 className="h3 my-2 text-center">No corresponding data</h5>}
            <Modalinput onchange={searchchange} />
          </>
        );
    

}

export default BusinessLineTable;