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
    // const navigate=useNavigate();


    const login=(token,emailinput)=>{
        setisloggedin(true)
        settoken(token)
        setemail(emailinput)
        console.log(isloggedin)
    }
   const logout=()=>{
       settoken('')
       setuser({})
       setisloggedin(false)
    //    navigate('/login')  

   }

   useEffect(async ( )=>{
    console.log(token)
    const r= await axios.get('http://localhost:8000/api/users?pagination=false&email='+email,{headers: {Authorization: "Bearer "+token}})
    await setuser(r.data["hydra:member"][0])
   },[token,email])
   
   const [isloggedin,setisloggedin]=useState(false)



    const contextValue={
        token:token, 
        email,
        isloggedin,
        user,
        login,
        logout,
        setemail,
        
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext