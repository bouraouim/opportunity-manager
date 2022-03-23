import CustomerForm from "./forms/customerForm";
import AddForm from './forms/addForm';
import BusinessLineForm from './forms/businessLineForm';
import BusinessUnitForm from './forms/businessUnitForm';
import CurrencyForm from './forms/currencyForm';
import GeographyForm from './forms/geographyForm';
import UserForm from './forms/userForm';
import TableLayout from './tables/tableLayout';
import Modify from './modify';
import NavBar from './navbar';
import { Routes, Route, Navigate, } from "react-router-dom";
import BusinessLineTable from './tables/businessLineTable';
import { useState } from 'react';
import GeographyTable from './tables/geographyTable';
import UserTable from './tables/userTable';
import AnonymizedTable from "./tables/anonymizedTable";

const Default = () => {

    const [search,setSearch]=useState("")
  const searchHandler=(event)=>{
    setSearch(event.target.value)
  }

  const resetsearch=()=>{
    setSearch("")
  }

    return ( 
        <>
        <NavBar/>
    <Routes>
    <Route path='*' element={<Navigate to="/adduser"/>}/>
      <Route path="/modify/*" element={<Modify/>}/>
      <Route path="/addcustomer" element={<AddForm formname={<CustomerForm/>} name="Add new customer " />}/>
      <Route path="/addbusinessline/*" element={<AddForm formname={<BusinessLineForm/>} name="Add new business line " />}/>
      <Route path="/addbusinessunit" element={<AddForm formname={<BusinessUnitForm/>} name="Add new business unit " />}/>
      <Route path="/addcurrency" element={<AddForm formname={<CurrencyForm/>} name="Add new currency " />}/>
      <Route path="/addgeography" element={<AddForm formname={<GeographyForm/>} name="Add new geography " />}/>
      <Route path="/adduser" element={<AddForm formname={<UserForm/>} name="Add new user " />}/>
      <Route path="/businessline" element={<TableLayout resetsearch={resetsearch} link={"/addbusinessline"} table={<BusinessLineTable search={search}/>} name={"business line"} search={searchHandler} /> }/>
      <Route path="/geography" element={<TableLayout resetsearch={resetsearch} link={"/addgeography"} table={<GeographyTable search={search}/>} name={"geography"} search={searchHandler} /> }/>
      <Route path="/anonymize" element={<AnonymizedTable searchhandler={searchHandler} search={search}  /> }/>
      <Route path="/user" element={<TableLayout resetsearch={resetsearch} link={"/adduser"} table={<UserTable search={search}/>} name={"user"} search={searchHandler} /> }/>
        
    </Routes>
    </>
     );
}
 
export default Default;