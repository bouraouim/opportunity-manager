

import { BrowserRouter as Router, Route, Link , NavLink} from "react-router-dom";


const NavBar=()=>{

    return(
      <nav className="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-default sticky-top ">
      <div className="container">
        <NavLink activeclassname="active" className="navbar-brand mr-0 mr-md-2" to="/" aria-label="Bootstrap">
          <img src="../../assets-old/img/brand/white.png" className=" " alt="..."/>    
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-primary" aria-controls="navbar-primary" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-primary">
          <div className="navbar-collapse-header">
            <div className="row">
              <div className="col-6 collapse-brand">
                <NavLink activeclassname="active" to="/">
                  <img src="../../assets-old/img/brand/blue.png"/>
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
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link " to="opportunities">Opportunity Management</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="reporting">Reporting</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#" id="navbar-primary_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Administration</a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-primary_dropdown_1">
                <NavLink activeclassname="active" className="dropdown-item" to="administration/areas">Areas</NavLink>
                <NavLink activeclassname="active" className="dropdown-item" to="administration/businessLines">Business Lines</NavLink>
                <NavLink activeclassname="active" className="dropdown-item" to="administration/businessUnits">Business Units</NavLink>
                <NavLink activeclassname="active" className="dropdown-item" to="administration/currencies">Currencies</NavLink>
                <NavLink activeclassname="active" className="dropdown-item" to="administration/customers">Customers</NavLink>
                <NavLink activeclassname="active" className="dropdown-item" to="administration/departments">Departments</NavLink>
                <NavLink activeclassname="active" className="dropdown-item" to="administration/geography">Geography</NavLink>
                <NavLink activeclassname="active" className="dropdown-item" to="administration/permissions">Permissions</NavLink>
                <NavLink activeclassname="active" className="dropdown-item" to="administration/presales">Presales Engineers</NavLink>
                <NavLink activeclassname="active" className="dropdown-item" to="administration/productLines">Product Lines</NavLink>
                <NavLink activeclassname="active" className="dropdown-item" to="administration/users">Users</NavLink>
              </div>
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="anonymization">Anonymization</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="orderbook">Order Book</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav align-items-center ml-auto ml-md-0">
            <li className="nav-item dropdown">
              <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="media align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img alt="" src="../../assets-old/img/theme/team-4.jpg"/>
                  </span>
                  <div className="media-body ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm  font-weight-bold">John Snow</span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Signed as </h6>
                </div>
                <div className="dropdown-divider"></div>
                <NavLink activeclassname="active" to="user/:id" className="dropdown-item">
                  <i className="ni ni-single-02"></i>
                  <span>Profile</span>
                </NavLink>
                <NavLink activeclassname="active" to="settings" className="dropdown-item">
                  <i className="ni ni-settings-gear-65"></i>
                  <span>Settings</span>
                </NavLink>
                <div className="dropdown-divider"></div>
                <NavLink activeclassname="active" to="#!" className="dropdown-item">
                  <i className="ni ni-user-run"></i>
                  <span>Signout</span>
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
}
export default NavBar;