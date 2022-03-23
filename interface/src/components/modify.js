import React from 'react'
import { Routes, Route, Navigate,useRouteMatch  } from "react-router-dom";
import AddForm from "./forms/addForm"
import Modifybusinessline from './modifyforms/modifybusinessline';
import Modifygeography from './modifyforms/modifygeography';
import Modifyuser from './modifyforms/modifyuser';


 const Modify=()=> {

// const { path } = useRouteMatch();



  return (
      <>
    <Routes>
        <Route path="businessline/:id"  element={<AddForm formname={<Modifybusinessline/>} name="Modify businessline" />}  />
        <Route path="user/:id"  element={<AddForm formname={<Modifyuser/>} name="Modify businessline" />}  />
        <Route path="geography/:id"  element={<AddForm formname={<Modifygeography/>} name="Modify businessline" />}  />
    </Routes>
    
    </>
  
  )
}
export default Modify;
