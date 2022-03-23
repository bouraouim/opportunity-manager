import React,{ useState } from "react"

const AuthContext=React.createContext({
    isloggedin:false,
    login:(token)=>{},
    logout:()=>{},
});

export const AuthContextProvider=(props)=>{
    // const isloggedin=!!token
    const login=(token)=>{
        settoken(token)
    }
   const logout=()=>{
       settoken(null)
   }
   const [token,settoken]=useState(null)

   var isloggedin=false


    const contextValue={
        token:token, 
        isloggedin,
        login,
        logout
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext