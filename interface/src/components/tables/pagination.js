
import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

const Paginations=(props)=>{
        const [extra,setextra]=useState(0)
       const f=()=>{
          setextra(extra+1)
          console.log(extra)
        }

        var number=props.pagination.number 
        var n=(props.itemperpage*current)-((props.itemperpage-1))

        if(number>props.itemperpage){
        var current=parseInt(props.pagination.current.slice(-1))
        var extrapage=1
        n=Math.min(number,((props.itemperpage*current)-(props.itemperpage-1)))
      }
      else{var extrapage=0
        var current=1
          n=Math.min(number,((props.itemperpage*current)-(props.itemperpage-1)))
       }

  return (
    
    <div className="row d-flex flex-column flex-md-row justify-content-md-center mb-3 pr-6">
    <div className="  justify-content-center d-flex ">
        <div className="dataTables_info" id="datatable-basic_info" role="status" aria-live="polite">Showing {n} to {Math.min(current*props.itemperpage,number)} of {number} entries
           </div>
      </div>
      <div className="d-flex justify-content-center ml-3  ">
       <div className="dataTables_paginate paging_simple_numbers" id="datatable-basic_paginate">
       
            <Pagination count={Math.floor(number/props.itemperpage)+extrapage } sx={{'& button:focus': { outline: 'none',} }} variant="outlined"   onChange={props.onchange} color="primary" />
      
      </div>
      </div>
      <div className=' d-flex   justify-content-center'>
        <div>
      <select className="form-control" onChange={props.itemperpageHandler} id="exampleFormControlSelect1">
                      <option value={5} >5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                      <option value={25}>25</option>
                    </select>
                    </div>
      </div>
      </div>
  )
} 

export default Paginations