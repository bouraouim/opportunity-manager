import { Routes, Route, Navigate, } from "react-router-dom";
import { useState, useContext } from 'react';
import NavBar from './components/navbar';
import OrderBook from './components/orderBook';
import Reporting from "./components/reporting";
import AddForm from './components/addForms/addForm';
import EditForm from './components/editForms/editForm';
import TableLayout from './components/tables/tableLayout';
import AreaTable from "./components/tables/areaTable";
import AddArea from './components/addForms/addArea';
import EditArea from './components/editForms/editArea';
import BusinessLineTable from './components/tables/businessLineTable';
import AddBusinessLine from './components/addForms/addBusinessLine';
import EditBusinessLine from './components/editForms/editBusinessLine';
import BusinessUnitTable from "./components/tables/businessUnitTable";
import AddBusinessUnit from './components/addForms/addBusinessUnit';
import EditBusinessUnit from './components/editForms/editBusinessUnit';
import CurrencyTable from "./components/tables/currencyTable";
import AddCurrency from './components/addForms/addCurrency';
import EditCurrency from './components/editForms/editCurrency';
import CustomerTable from "./components/tables/customerTable";
import AddCustomer from './components/addForms/addCustomer';
import EditCustomer from './components/editForms/editCustomer';
import DepartmentTable from "./components/tables/departmentTable";
import AddDeprtment from './components/addForms/addDepartment';
import EditDepartment from './components/editForms/editDepartment';
import GeographyTable from './components/tables/geographyTable';
import AddGeography from './components/addForms/addGeography';
import EditGeography from './components/editForms/editGeography';
import Permissions from "./components/permissions";
import PresalesEngineersTable from "./components/tables/presalesTable";
import AddPresales from './components/addForms/addPresales';
import EditPresales from './components/editForms/editPresales';
import ProductLineTable from "./components/tables/productLineTable";
import AddProductLine from './components/addForms/addProductLine';
import EditProductLine from './components/editForms/editProductLine';
import UserTable from './components/tables/userTable';
import AddUser from './components/addForms/addUser';
import EditUser from './components/editForms/editUser';
import AnonymizedTable from "./components/tables/anonymizedTable";
import Login from './components/login';
import AuthContext from "./store/auth-context";
import OpportunitiesTable from "./components/tables/opportunitiesTable";
import AddOpportunity from "./components/addForms/addOpportunity";
import Reportlist from "./components/report/list";

function App() {
  const [loginpage, setloginpage] = useState(true);
  const authctx = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const searchHandler = (event) => {
    setSearch(event.target.value)
  }
  const resetsearch = () => {
    setSearch("")
  }

  return (
    <>      
      {authctx.loggedin && <NavBar/>}   
      <Routes> 
        <Route path="/login" element={<Login/>}/>      
        {authctx.loggedin && <Route path="/orderbook" element={<OrderBook/>}/>}
        {authctx.loggedin && <Route path="/reporting" element={<Reporting/>}/>}
        {authctx.loggedin && <Route path="/opportunities/manage" element={<OpportunitiesTable search={search}/>}/>}
        {authctx.loggedin && <Route path="/opportunities/new" element={<AddOpportunity/>}/>}
        {authctx.loggedin && <Route path="/report/list" element={<Reportlist/>}/>}
        {authctx.loggedin && <Route path="/report/sales-perfomance" element={<AddOpportunity/>}/>}
        {authctx.loggedin && <Route path="/administration/areas" element={<TableLayout link="/administration/areas/new" table={<AreaTable search={search}/>} name="Area" search={searchHandler} resetsearch={resetsearch} searchvalue={search}/>}/>}
        {authctx.loggedin && <Route path="/administration/areas/new" element={<AddForm formname={<AddArea/>} name="Add New Area"/>}/>}
        {authctx.loggedin && <Route path="/administration/areas/edit/:id" element={<EditForm formname={<EditArea/>} name="Edit Area"/>}/>}
        {authctx.loggedin && <Route path="/administration/businessUnits" element={<TableLayout link="/administration/businessUnits/new" table={<BusinessUnitTable search={search}/>} name="Business Unit" search={searchHandler} resetsearch={resetsearch} searchvalue={search}/>}/>}
        {authctx.loggedin && <Route path="/administration/businessUnits/new" element={<AddForm formname={<AddBusinessUnit/>} name="Add New Business Unit"/>}/>}
        {authctx.loggedin && <Route path="/administration/businessUnits/edit/:id" element={<EditForm formname={<EditBusinessUnit/>} name="Edit Business Unit"/>}/>}
        {authctx.loggedin && <Route path="/administration/currencies" element={<TableLayout link="/administration/currencies/new" table={<CurrencyTable search={search}/>} name="Currency" search={searchHandler} resetsearch={resetsearch} searchvalue={search}/>}/>}
        {authctx.loggedin && <Route path="/administration/currencies/new" element={<AddForm formname={<AddCurrency/>} name="Add New Currency"/>}/>}
        {authctx.loggedin && <Route path="/administration/currencies/edit/:id" element={<EditForm formname={<EditCurrency/>} name="Edit Currency"/>}/>}
        {authctx.loggedin && <Route path="/administration/customers" element={<TableLayout link="/administration/customers/new" table={<CustomerTable search={search}/>} name="Customer" search={searchHandler} resetsearch={resetsearch} searchvalue={search}/>}/>}
        {authctx.loggedin && <Route path="/administration/customers/new" element={<AddForm formname={<AddCustomer/>} name="Add New Customer"/>}/>}
        {authctx.loggedin && <Route path="/administration/customers/edit/:id" element={<EditForm formname={<EditCustomer/>} name="Edit Customer"/>}/>}
        {authctx.loggedin && <Route path="/administration/departments" element={<TableLayout link="/administration/departments/new" table={<DepartmentTable search={search}/>} name="Department - Pole" search={searchHandler} resetsearch={resetsearch} searchvalue={search}/>}/>}
        {authctx.loggedin && <Route path="/administration/departments/new" element={<AddForm formname={<AddDeprtment/>} name="Add New Department - Pole"/>}/>}
        {authctx.loggedin && <Route path="/administration/departments/edit/:id" element={<EditForm formname={<EditDepartment/>} name="Edit Department - Pole"/>}/>}
        {authctx.loggedin && <Route path="/administration/permissions" element={<Permissions/>}/>}
        {authctx.loggedin && <Route path="/administration/presales" element={<TableLayout link="/administration/presales/new" table={<PresalesEngineersTable search={search}/>} name="Presales Engineer" search={searchHandler} resetsearch={resetsearch} searchvalue={search}/>}/>}
        {authctx.loggedin && <Route path="/administration/presales/new" element={<AddForm formname={<AddPresales/>} name="Add New Presales Engineer"/>}/>}
        {authctx.loggedin && <Route path="/administration/presales/edit/:id" element={<EditForm formname={<EditPresales/>} name="Edit Presales Engineer"/>}/>}
        {authctx.loggedin && <Route path="/administration/productLines" element={<TableLayout link="/administration/productLines/new" table={<ProductLineTable search={search}/>} name="Product Line" search={searchHandler} resetsearch={resetsearch} searchvalue={search}/>}/>}
        {authctx.loggedin && <Route path="/administration/productLines/new" element={<AddForm formname={<AddProductLine/>} name="Add New Product Line"/>}/>}
        {authctx.loggedin && <Route path="/administration/productLines/edit/:id" element={<EditForm formname={<EditProductLine/>} name="Edit Product Line"/>}/>}
        {authctx.loggedin && <Route path="/administration/businessLines" element={<TableLayout link={"/administration/businessLines/new"} table={<BusinessLineTable search={search}/>} name={"Business Line"} search={searchHandler} resetsearch={resetsearch} searchvalue={search}/>}/>}
        {authctx.loggedin && <Route path="/administration/businessLines/new" element={<AddForm formname={<AddBusinessLine/>} name="Add New Business Line"/>}/>}
        {authctx.loggedin && <Route path="/administration/businessLines/edit/:id" element={<EditForm formname={<EditBusinessLine/>} name="Edit Business Line"/>}/>}
        {authctx.loggedin && <Route path="/administration/geography" element={<TableLayout link={"/administration/geography/new"} table={<GeographyTable search={search}/>} name={"Geography"} search={searchHandler} resetsearch={resetsearch} searchvalue={search}/>}/>}
        {authctx.loggedin && <Route path="/administration/geography/new" element={<AddForm formname={<AddGeography/>} name="Add New Geography"/>}/>}
        {authctx.loggedin && <Route path="/administration/geography/edit/:id" element={<EditForm formname={<EditGeography/>} name="Edit Geography"/>}/>}
        {authctx.loggedin && <Route path="/administration/users" element={<TableLayout link={"/administration/users/new"} table={<UserTable search={search}/>} name={"User"} search={searchHandler} resetsearch={resetsearch} searchvalue={search}/>}/>}
        {authctx.loggedin && <Route path="/administration/users/new" element={<AddForm formname={<AddUser/>} name="Add New User"/>}/>}
        {authctx.loggedin && <Route path="/administration/users/edit/:id" element={<EditForm formname={<EditUser/>} name="Edit User"/>}/>}
        {authctx.loggedin && <Route path="/anonymization" element={<AnonymizedTable searchhandler={searchHandler} search={search}/>}/>}
        {/* {authctx.loggedin && <Route path='*' element={<Navigate to="/administration/businessLines/new"/>}/>          } */}
        {authctx.loggedin && <Route path='*' element={<Navigate to="/report/list"/>}/>          }
        {!authctx.loggedin&& <Route path='*' element={<Navigate to="login"/>}/>}
      </Routes>
    </>
  );
}
export default App;