import React, { Component } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {MdCheckBox, MdCheckBoxOutlineBlank, MdChevronRight, MdKeyboardArrowDown, MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import axios from 'axios';
import AuthContext from "../store/auth-context";
import '../index.css';

const nodes = [
  {
    value: "Dashboard",
    label: "Dashboard",
    children: [
      {
        value: "Access Dashboard",
        label: "Access Dashboard",
      }
    ]
  },
  {
    value: "Opportunities",
    label: "Opportunities",
    children: [
      {
        value: "List Opportunities",
        label: "List Opportunities"
      },
      {
        value: "Create Opportunities",
        label: "Create Opportunities"
      },
      {
        value: "Update Opportunities",
        label: "Update Opportunities"
      }
    ]
  },
  {
    value: "Areas",
    label: "Areas",
    children: [
      {
        value: "List Areas",
        label: "List Areas"
      },
      {
        value: "Create Areas",
        label: "Create Areas"
      },
      {
        value: "Update Areas",
        label: "Update Areas"
      }
    ]
  },
  {
    value: "Business Lines",
    label: "Business Lines",
    children: [
      {
        value: "List Business Lines",
        label: "List Business Lines"
      },
      {
        value: "Create Business Lines",
        label: "Create Business Lines"
      },
      {
        value: "Update Business Lines",
        label: "Update Business Lines"
      }
    ]
  },
  {
    value: "Business Units",
    label: "Business Units",
    children: [
      {
        value: "List Business Units",
        label: "List Business Units"
      },
      {
        value: "Create Business Units",
        label: "Create Business Units"
      },
      {
        value: "Update Business Units",
        label: "Update Business Units"
      }
    ]
  },
  {
    value: "Currencies",
    label: "Currencies",
    children: [
      {
        value: "List Currencies",
        label: "List Currencies"
      },
      {
        value: "Create Currencies",
        label: "Create Currencies"
      },
      {
        value: "Update Currencies",
        label: "Update Currencies"
      }
    ]
  },
  {
    value: "Customers",
    label: "Customers",
    children: [
      {
        value: "List Customers",
        label: "List Customers"
      },
      {
        value: "Create Customers",
        label: "Create Customers"
      },
      {
        value: "Update Customers",
        label: "Update Customers"
      }
    ]
  },
  {
    value: "Departments",
    label: "Departments",
    children: [
      {
        value: "List Departments",
        label: "List Departments"
      },
      {
        value: "Create Departments",
        label: "Create Departments"
      },
      {
        value: "Update Departments",
        label: "Update Departments"
      }
    ]
  },
  {
    value: "Geographies",
    label: "Geographies",
    children: [
      {
        value: "List Geographies",
        label: "List Geographies"
      },
      {
        value: "Create Geographies",
        label: "Create Geographies"
      },
      {
        value: "Update Geographies",
        label: "Update Geographies"
      }
    ]
  },
  {
    value: "Roles",
    label: "Roles",
    children: [
      {
        value: "List Roles",
        label: "List Roles"
      },
      {
        value: "Create Roles",
        label: "Create Roles"
      },
      {
        value: "Update Roles",
        label: "Update Roles"
      },
      {
        value: "Assign Roles Permissions",
        label: "Assign Roles Permissions"
      }
    ]
  },
  {
    value: "Presales Engineers",
    label: "Presales Engineers",
    children: [
      {
        value: "List Presales Engineers",
        label: "List Presales Engineers"
      },
      {
        value: "Create Presales Engineers",
        label: "Create Presales Engineers"
      },
      {
        value: "Update Presales Engineers",
        label: "Update Presales Engineers"
      }
    ]
  },
  {
    value: "Product Lines",
    label: "Product Lines",
    children: [
      {
        value: "List Product Lines",
        label: "List Product Lines"
      },
      {
        value: "Create Product Lines",
        label: "Create Product Lines"
      },
      {
        value: "Update Product Lines",
        label: "Update Product Lines"
      }
    ]
  }
];  

class Permissions extends React.Component {
  static authctx = AuthContext;
  constructor(props) {
    super(props);
  }
  state = {
    checked: [],
    expanded: [],
    roles: [],
    role: [], 
    id: 1,
    name: ' ',
    show: false
  };
  componentDidMount() {
    axios.get('http://localhost:8000/role/read')
    .then(response=>{
      this.setState({roles: response.data});
    })
  }
     
  updatePermissions(){
    let permissions = this.state.checked.join(",");
    if((permissions.includes("Create Areas") || permissions.includes("Update Areas")) && !permissions.includes("List Areas"))
      permissions.concat(", List Areas");
    if((permissions.includes("Create Opportunities") || permissions.includes("Update Opportunities")) && !permissions.includes("List Opportunities"))
      permissions = permissions+", List Opportunities";
    if((permissions.includes("Create Business Lines") || permissions.includes("Update Business Lines")) && !permissions.includes("List Business Lines"))
      permissions = permissions+", List Business Lines";
    if((permissions.includes("Create Business Units") || permissions.includes("Update Business Units")) && !permissions.includes("List Business Units"))
      permissions = permissions+", List Business Units";
    if((permissions.includes("Create Currencies") || permissions.includes("Update Currencies")) && !permissions.includes("List Currencies"))
      permissions = permissions+", List Currencies";
    if((permissions.includes("Create Customers") || permissions.includes("Update Customers")) && !permissions.includes("List Customers"))
      permissions = permissions+", List Customers";
    if((permissions.includes("Create Departments") || permissions.includes("Update Departments")) && !permissions.includes("List Departments"))
      permissions = permissions+", List Departments";
    if((permissions.includes("Create Geographies") || permissions.includes("Update Geographies")) && !permissions.includes("List Geographies"))
      permissions = permissions+", List Geographies";
    if((permissions.includes("Create Roles") || permissions.includes("Update Roles") || permissions.includes("Assign Roles Permissions")) && !permissions.includes("List Roles"))
      permissions = permissions+", List Roles";
    if((permissions.includes("Create Presales Engineers") || permissions.includes("Update Presales Engineers")) && !permissions.includes("List Presales Engineers"))
      permissions = permissions+", List Presales Engineers";
    if((permissions.includes("Create Product Lines") || permissions.includes("Update Product Lines")) && !permissions.includes("List Product Lines"))
      permissions = permissions+", List Product Lines";
    if((permissions.includes("Create Users") || permissions.includes("Update Users")) && !permissions.includes("List Users"))
      permissions = permissions+", List Users";
    this.setState({checked: permissions.split(",")});
    console.log("after"+this.state.checked)
    var body = { }
    if(this.state.checked.length !== 0){
      body["permissions"] = this.state.checked.join(",");
    }        
    axios.patch('http://localhost:8000/api/roles/'+this.state.id,body,{headers: {
      'Content-Type': 'application/merge-patch+json'
    }})
    .then(response=> {
      console.log(body);
    })
    .catch(function (error) {
      console.log(error);
    });
    axios.get('http://localhost:8000/role/read')
    .then(response=>{
      this.setState({roles: response.data});
    })
  }
    
  render() {
    const icons = {
      check: <MdCheckBox className="rct-icon rct-icon-check"/>,
      uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck"/>,
      halfCheck: (
        <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" />
      ),
      expandClose: (
        <MdChevronRight className="rct-icon rct-icon-expand-close"/>
      ),
      expandOpen: (
        <MdKeyboardArrowDown className="rct-icon rct-icon-expand-open" />
      ),
      expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
      collapseAll: (
        <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
      ),
    };
    // const authctx = useContext(AuthContext);
    console.log(this);
    // console.log(this.authctx.createArea)
    
    return (
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto shadow rounded">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white h92">
              <div className="btn-group-vertical">
                {this.state.roles.map((val) =>{
                  if(val.name !== "Super Administrator")
                    return <button key={val.id} className="text-center font-weight-bold btn btn-lg btn-block mt-3 mr-1 mb-1 role" onClick={() => this.setState({id: val.id, name: val.name, checked: val.permissions===' '?this.state.checked:val.permissions.split(","), show: true})}>{val.name}</button>
                  }
                )}
              </div>
            </div>
          </div>
          <div className="col py-3">
            {this.state.show === true &&
            <>
              <h3>{this.state.name}</h3>
              <CheckboxTree
                nodes={nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
                icons={icons}
                showExpandAll={true}
              />
              <button onClick={() => this.updatePermissions()}>submit</button>
            </>
            }
          </div>
        </div>
      </div>
    );
  }
}
export default Permissions;