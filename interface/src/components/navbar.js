import AuthContext from "../store/auth-context";
import { useContext } from 'react';
import { useNavigate, NavLink} from "react-router-dom";
import { Briefcase, GraphUp, Person, ShieldLock, BarChart, Map, Inbox, Inboxes, CurrencyExchange, People, Flag, Bullseye, Lock, FileEarmarkPlus, PersonCircle, GearFill } from 'react-bootstrap-icons';

const NavBar=()=>{
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  const email = authctx.email;
  const logout =()=>{
    authctx.logout() 
    navigate('/login') 
  }
  const switchuser=()=>{
    authctx.setemail(authctx.firstemail)
    authctx.loggedasHandler()
  }

  return(
    <nav className="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-default sticky-top ">
      <div className="container">
        <div className="navbar-brand mr-0 mr-md-2"aria-label="Bootstrap">
          <img src="../../assets-old/img/brand/white.png" className=" " alt="..."/>    
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-primary" aria-controls="navbar-primary" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-primary">
          <div className="navbar-collapse-header">
            <div className="row">
              <div className="col-6 collapse-brand">
                <NavLink activeclassname="active" to="/">
                  <img src="../../assets-old/img/brand/blue.png" alt="Logo"/>
                </NavLink>
              </div>
              <div className="col-6 collapse-close">
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-primary" aria-controls="navbar-primary" aria-expanded="false" aria-label="Toggle navigation">
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <ul className="navbar-nav ml-lg-auto">
            <li className="nav-item dropdown">
              {(authctx.listOpportunities || authctx.createOpportunities)
              &&
              <a className="nav-link" href="#" id="navbar-primary_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><Briefcase size={17}/>&nbsp;&nbsp;Opportunity</a>}
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-primary_dropdown_1">
                {authctx.createOpportunities && <NavLink activeclassname="active" className="dropdown-item" to="/opportunities/new"><FileEarmarkPlus size={17}/>New Opportunity</NavLink>}
                {authctx.listOpportunities && <NavLink activeclassname="active" className="dropdown-item" to="/opportunities/manage"><Inboxes size={17}/>Manage Opportunities</NavLink>}
              </div>
            </li>
            <li className="nav-item dropdown">
              {(authctx.listOpportunities || authctx.createOpportunities)
              &&
              <a className="nav-link" href="#" id="navbar-primary_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><Briefcase size={17}/>&nbsp;&nbsp;Reporting</a>}
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-primary_dropdown_1">
                {authctx.createOpportunities && <NavLink activeclassname="active" className="dropdown-item" to="/report/list"><FileEarmarkPlus size={17}/>List of opportunities</NavLink>}
                {authctx.listOpportunities && <NavLink activeclassname="active" className="dropdown-item" to="/report/sales-perfomance"><Inboxes size={17}/>Sales perfomance</NavLink>}
              </div>
            </li>
            <li className="nav-item dropdown">
              {(authctx.listAreas || authctx.listBusinessLines || authctx.listBusinessUnits || authctx.listCurrencies || authctx.listCustomers || authctx.listDepartments || authctx.listGeographies || authctx.listRoles || authctx.listPresalesEngineers || authctx.listProductLines || authctx.listUsers) 
              &&
              <a className="nav-link" href="#" id="navbar-primary_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><Person size={17}/>&nbsp;&nbsp;Administration</a>}
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-primary_dropdown_1">
                {authctx.listAreas && <NavLink activeclassname="active" className="dropdown-item" to="administration/areas"><Map size={17}/>Areas</NavLink>}
                {authctx.listBusinessLines && <NavLink activeclassname="active" className="dropdown-item" to="administration/businessLines"><Inbox size={17}/>Business Lines</NavLink>}
                {authctx.listBusinessUnits && <NavLink activeclassname="active" className="dropdown-item" to="administration/businessUnits"><Inboxes size={17}/>Business Units</NavLink>}
                {authctx.listCurrencies && <NavLink activeclassname="active" className="dropdown-item" to="administration/currencies"><CurrencyExchange size={17}/>Currencies</NavLink>}
                {authctx.listCustomers && <NavLink activeclassname="active" className="dropdown-item" to="administration/customers"><People size={17}/>Customers</NavLink>}
                {authctx.listDepartments && <NavLink activeclassname="active" className="dropdown-item" to="administration/departments"><Flag size={17}/>Departments</NavLink>}
                {authctx.listGeographies && <NavLink activeclassname="active" className="dropdown-item" to="administration/geography"><Bullseye size={17}/>Geography</NavLink>}
                {authctx.listRoles && <NavLink activeclassname="active" className="dropdown-item" to="administration/permissions"><Lock size={17}/>Permissions</NavLink>}
                {authctx.listPresalesEngineers && <NavLink activeclassname="active" className="dropdown-item" to="administration/presales"><People size={17}/>Presales Engineers</NavLink>}
                {authctx.listProductLines && <NavLink activeclassname="active" className="dropdown-item" to="administration/productLines"><Flag size={17}/>Product Lines</NavLink>}
                {authctx.listUsers && <NavLink activeclassname="active" className="dropdown-item" to="administration/users"><Person size={17}/>Users</NavLink>}
              </div>
            </li>
            <li className="nav-item">
              {authctx.listUsers && <NavLink activeclassname="active" className="nav-link" to="anonymization"><ShieldLock size={17}/>&nbsp;&nbsp;Anonymization</NavLink>}
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="orderbook"><BarChart size={17}/>&nbsp;&nbsp;Order Book</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav align-items-center ml-auto ml-md-0">
            <li className="nav-item dropdown">
              <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="media align-items-center">
                  <PersonCircle size={26}/>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Signed as {email}</h6>
                </div>
                <div className="dropdown-divider"></div>
                <NavLink activeclassname="active" to="user/:id" className="dropdown-item">
                  <PersonCircle size={17}/>Profile
                </NavLink>
                <NavLink activeclassname="active" to="settings" className="dropdown-item">
                  <GearFill size={17}/>Settings
                </NavLink>
                {authctx.loggedas && <div type='button' onClick={switchuser} className="dropdown-item">
                  <i className="ni ni-user-run"></i>Quit
                </div>}
                <div type='button' onClick={logout} className="dropdown-item">
                  <i className="ni ni-user-run"></i>Signout
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default NavBar;