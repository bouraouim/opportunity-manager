import axios from "axios";
import React,{ useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const AuthContext=React.createContext({
    login:(token)=>{},
    logout:()=>{},
    email:"",
});

export const AuthContextProvider=(props)=>{
    const [user,setuser]=useState({})
    const [token,settoken]=useState(null)
    const [email,setemail]=useState('')
    const [isloggedin,setisloggedin]=useState(false)
    // const navigate=useNavigate();

    const loggedin=!!token
    const login=(token,emailinput)=>{
       
        settoken(token)
        setemail(emailinput)
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
    console.log(r.data["hydra:member"][0])
    await axios.patch('http://localhost:8000/api/users/'+r.data["hydra:member"][0].id,{lastconnectiondate:today},{headers: {
        'Content-Type': 'application/merge-patch+json' ,
        Authorization: "Bearer "+token
      }})
   },[token,email])
   
   let role
   try{
 role=user.role
}catch(error){console.log(error)}


    const contextValue={
        token:token, 
        email,
        loggedin,
        user,
        login,
        logout,
        setemail,
        
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext