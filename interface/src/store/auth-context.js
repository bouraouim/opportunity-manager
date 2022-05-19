import axios from "axios";
import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext=React.createContext({
    login:(token)=>{},
    logout:()=>{},
    email:"",
    loggedas:false
});

export const AuthContextProvider=(props)=>{
    const [user,setuser]=useState({})
    const [token,settoken]=useState(null)
    const [email,setemail]=useState('')
    const [firstemail,setfirstemail]=useState("")
    const [loggedas,setloggedas]=useState(false)
    const [roles, setRoles] = useState([]);
    var permissions = "";
    var accessDashboard = false;
    var listOpportunities = false;
    var createOpportunities = false;
    var updateOpportunities = false;
    var listAreas = false;
    var createAreas = false;
    var updateAreas = false;
    var listBusinessLines = false;
    var createBusinessLines = false;
    var updateBusinessLines = false;
    var listBusinessUnits = false;
    var createBusinessUnits = false;
    var updateBusinessUnits = false;
    var listCurrencies = false;
    var createCurrencies = false;
    var updateCurrencies = false;
    var listCustomers = false;
    var createCustomers = false;
    var updateCustomers = false;
    var listDepartments = false;
    var createDepartments = false;
    var updateDepartments = false;
    var listGeographies = false;
    var createGeographies = false;
    var updateGeographies = false;
    var listRoles = false;
    var createRoles = false;
    var updateRoles = false;
    var assignRolesPermissions = false;
    var listPresalesEngineers = false;
    var createPresalesEngineers = false;
    var updatePresalesEngineers = false;
    var listProductLines = false;
    var createProductLines = false;
    var updateProductLines = false;
    var listUsers = false;
    var createUsers = false;
    var updateUsers = false;

    const loggedasHandler=()=>{
        setloggedas(!loggedas)
    }
    const loggedin=!!token
    const login=(token,emailinput)=>{ 
        settoken(token)
        setemail(emailinput)
        setfirstemail(emailinput)
        console.log(loggedin)
    }
   const logout=()=>{
       settoken('')
       setuser({})
    //    navigate('/login')  

   }
   useEffect(async ( )=>{
    const r= await axios.get('http://localhost:8000/api/users?pagination=false&email='+email,{headers: {Authorization: "Bearer "+token}})
    await setuser(r.data["hydra:member"][0])
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    await axios.patch('http://localhost:8000/api/users/'+r.data["hydra:member"][0].id,{lastconnectiondate:today},{headers: {
        'Content-Type': 'application/merge-patch+json' ,
        Authorization: "Bearer "+token
      }})
   },[token,email])
   try{
        var role;
        role = user.role;
        if(role !== undefined){
            for(let i = 0; i < role.length; i++){
                if(permissions !== ""){
                    permissions = permissions+","+role[i].permissions;
                }
                else{
                    permissions = role[i].permissions;
                }
            }
            if(permissions.includes("Access Dashboard")) accessDashboard = true;
            if(permissions.includes("List Areas")) listAreas = true;
            if(permissions.includes("Create Areas")) createAreas = true;
            if(permissions.includes("Update Areas")) updateAreas = true;            
            if(permissions.includes("List Opportunities")) listOpportunities = true;
            if(permissions.includes("Create Opportunities")) createOpportunities = true;
            if(permissions.includes("Update Opportunities")) updateOpportunities = true;
            if(permissions.includes("List Business Lines")) listBusinessLines = true;
            if(permissions.includes("Create Business Lines")) createBusinessLines = true;
            if(permissions.includes("Update Business Lines")) updateBusinessLines = true;
            if(permissions.includes("List Business Units")) listBusinessUnits = true;
            if(permissions.includes("Create Business Units")) createBusinessUnits = true;
            if(permissions.includes("Update Business Units")) updateBusinessUnits = true;
            if(permissions.includes("List Currencies")) listCurrencies = true;
            if(permissions.includes("Create Currencies")) createCurrencies = true;
            if(permissions.includes("Update Currencies")) updateCurrencies = true;
            if(permissions.includes("List Customers")) listCustomers = true;
            if(permissions.includes("Create Customers")) createCustomers = true;
            if(permissions.includes("Update Customers")) updateCustomers = true;
            if(permissions.includes("List Departments")) listDepartments = true;
            if(permissions.includes("Create Departments")) createDepartments = true;
            if(permissions.includes("Update Departments")) updateDepartments = true;
            if(permissions.includes("List Geographies")) listGeographies = true;
            if(permissions.includes("Create Geographies")) createGeographies = true;
            if(permissions.includes("Update Geographies")) updateGeographies = true;
            if(permissions.includes("List Roles")) listRoles = true;
            if(permissions.includes("Create Roles")) createRoles = true;
            if(permissions.includes("Update Roles")) updateRoles = true;
            if(permissions.includes("Assign Roles Permissions")) assignRolesPermissions = true;
            if(permissions.includes("List Presales Engineers")) listPresalesEngineers = true;
            if(permissions.includes("Create Presales Engineers")) createPresalesEngineers = true;
            if(permissions.includes("Update Presales Engineers")) updatePresalesEngineers = true;
            if(permissions.includes("List Product Lines")) listProductLines = true;
            if(permissions.includes("Create Product Lines")) createProductLines = true;
            if(permissions.includes("Update Product Lines")) updateProductLines = true;
            if(permissions.includes("List Users")) listUsers = true;
            if(permissions.includes("Create Users")) createUsers = true;
            if(permissions.includes("Update Users")) updateUsers = true;
        }
    }catch(error){
        console.log(error)
    }
    const contextValue={
        token:token, 
        email,
        loggedin,
        loggedas,
        firstemail,
        user,
        loggedasHandler,
        login,
        logout,
        setemail,
        accessDashboard,
        listOpportunities,
        createOpportunities,
        updateOpportunities,
        listAreas,
        createAreas,
        updateAreas,
        listBusinessLines,
        createBusinessLines,
        updateBusinessLines,
        listBusinessUnits,
        createBusinessUnits,
        updateBusinessUnits,
        listCurrencies,
        createCurrencies,
        updateCurrencies,
        listCustomers,
        createCustomers,
        updateCustomers,
        listDepartments,
        createDepartments,
        updateDepartments,
        listGeographies,
        createGeographies,
        updateGeographies,
        listRoles,
        createRoles,
        updateRoles,
        assignRolesPermissions,
        listPresalesEngineers,
        createPresalesEngineers,
        updatePresalesEngineers,
        listProductLines,
        createProductLines,
        updateProductLines,
        listUsers,
        createUsers,
        updateUsers
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext;