import { Routes, Route, Navigate, } from "react-router-dom";

import Login from "./components/login"
import Default from "./components/defaultpage"
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import CustomerForm from "./components/forms/customerForm";
import AddForm from './components/forms/addForm';
import BusinessLineForm from './components/forms/businessLineForm';
import BusinessUnitForm from './components/forms/businessUnitForm';
import GeographyForm from './components/forms/geographyForm';
import UserForm from './components/forms/userForm';
import TableLayout from './components/tables/tableLayout';
import Modify from './components/modify';
import NavBar from './components/navbar';
import Signup from './components/signup';
import axios from 'axios'
import BusinessLineTable from './components/tables/businessLineTable';
import { useState } from 'react';
import GeographyTable from './components/tables/geographyTable';
import UserTable from './components/tables/userTable';
import Modifybusinessline from './components/modifyforms/modifybusinessline';
import AnonymizedTable from "./components/tables/anonymizedTable";
import OrderBook from "./components/orderBook";
import Reporting from "./components/reporting";
import OpportunitiesTable from "./components/tables/opportunitiesTable";
import AreaTable from "./components/tables/areaTable";
import BusinessUnitTable from "./components/tables/businessUnitTable";
import CurrencyTable from "./components/tables/currencyTable";
import CustomerTable from "./components/tables/customerTable";
import DepartmentTable from "./components/tables/departmentTable";
import Permissions from "./components/permissions";
import PresalesEngineersTable from "./components/tables/presalesTable";
import ProductLineTable from "./components/tables/productLineTable";
import AreaForm from "./components/forms/areaForm";
import CurrencyForm from "./components/forms/currencyForm"
import DepartmentForm from "./components/forms/departmentForm";
import PresalesForm from "./components/forms/presalesForm";
import ProductLineForm from "./components/forms/productLineForm";

function App() {
  
  const authctx=useContext(AuthContext)
  const [search,setSearch]=useState("")
  const searchHandler=(event)=>{
    setSearch(event.target.value)
  }

  const resetsearch=()=>{
    setSearch("")
  }
  return (
    <>
{/* <Routes>
  <Route path="/*"  element={<Default/>}/>
<Route path="/login" element={<Login/> }/>
</Routes> */}

      
 <NavBar/>        
      <Routes> 
        
      
        {/* Modifications */}
        <Route path="/orderbook" element={<OrderBook/>}/>
        <Route path="/reporting" element={<Reporting/>}/>
        <Route path="/opportunities" element={<OpportunitiesTable/>}/>
        <Route path="/administration/areas" element={<TableLayout link="/administration/areas/new" table={<AreaTable/>} name="Area"/>}/>
        <Route path="/administration/areas/new" element={<AddForm formname={<AreaForm/>} name="Add New Area"/>}/>
        <Route path="/administration/businessUnits" element={<TableLayout link="/administration/businessUnits/new" table={<BusinessUnitTable/>} name="Business Unit"/>}/>
        <Route path="/administration/businessUnits/new" element={<AddForm formname={<BusinessUnitForm/>} name="Add New Business Unit"/>}/>
        <Route path="/administration/currencies" element={<TableLayout link="/administration/currencies/new" table={<CurrencyTable/>} name="Currency"/>}/>
        <Route path="/administration/currencies/new" element={<AddForm formname={<CurrencyForm/>} name="Add New Currency"/>}/>
        <Route path="/administration/customers" element={<TableLayout link="/administration/customers/new" table={<CustomerTable/>} name="Customer"/>}/>
        <Route path="/administration/customers/new" element={<AddForm formname={<CustomerForm/>} name="Add New Customer"/>}/>
        <Route path="/administration/departments" element={<TableLayout link="/administration/departments/new" table={<DepartmentTable/>} name="Department"/>}/>
        <Route path="/administration/departments/new" element={<AddForm formname={<DepartmentForm/>} name="Add New Department - Pole"/>}/>
        <Route path="/administration/permissions" element={<Permissions/>}/>

        <Route path="/administration/presales" element={<TableLayout link="/administration/presales/new" table={<PresalesEngineersTable/>} name="Presales Engineer"/>}/>
        <Route path="/administration/presales/new" element={<AddForm formname={<PresalesForm/>} name="Add New Presales Engineer"/>}/>
        <Route path="/administration/productLines" element={<TableLayout link="/administration/productLines/new" table={<ProductLineTable/>} name="Product Line"/>}/>
        <Route path="/administration/productLines/new" element={<AddForm formname={<ProductLineForm/>} name="Add New Product Line"/>}/>
        <Route path="/administration/businessLines" element={<TableLayout link={"/administration/businessLines/new"} table={<BusinessLineTable search={search}/>} name="Business Line" search={searchHandler}/>}/>
        <Route path="/administration/businessLines/new" element={<AddForm formname={<BusinessLineForm/>} name="Add new business line " />}/>
        <Route path="/administration/geography" element={<TableLayout link={"/administration/geography/new"} table={<GeographyTable search={search}/>} name={"Geography"} search={searchHandler} /> }/>
        <Route path="/administration/geography/new" element={<AddForm formname={<GeographyForm/>} name="Add new geography"/>}/>
        <Route path="/administration/users" element={<TableLayout link={"/administration/users/new"} table={<UserTable search={search}/>} name={"User"} search={searchHandler} /> }/>
        <Route path="/administration/users/new" element={<AddForm formname={<UserForm/>} name="Add New User " />}/>
        <Route path="/anonymization" element={<AnonymizedTable searchhandler={searchHandler} search={search}  /> }/>      

        <Route path='*' element={<Navigate to="/administration/users/new"/>}/>
        <Route path="/modify/*" element={<Modify/>}/>
      </Routes>
  {/* <Signup/> */}

     </>
  );
}

export default App;
