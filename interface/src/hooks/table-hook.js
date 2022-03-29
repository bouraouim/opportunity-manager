import { useState,useEffect, useContext } from "react";
import axios from 'axios'
import AuthContext from "../store/auth-context";

const Tablehook=(tablename,searchterm,parameters,searchby,globalsearch)=>{
        const [data , setData]=useState([])
        const [order, setOrder]=useState("");
        const [loading, setLoading]=useState(true)
        const [paginations,setPagination]=useState({})
        const [pagenumber,setPagenumber]=useState(1)
        const [show,setShow]=useState(true)
        const [reset,setreset]=useState(false)
        const [sortby,setsortby]=useState('')
        const [itemperpage,setitemperpage]=useState(5)
        
        const searchlink=(searchterm=='')?"":"&"+searchby+"="
        const global=(globalsearch=='')?"":"&search="+globalsearch
        const sortlink=(sortby=='')?"":"&order%5B"+sortby+"%5D="+order
        const leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj))

        const itemperpageHandler=(e)=>{
            setitemperpage(e.target.value)
        }
        
        const sortHandler=(v)=>{
            setsortby(v)
            console.log(v)
            if(order==="asc" || order===""){setOrder('desc')}
            if(order==="desc"){setOrder('asc')}
        }


        const authctx=useContext(AuthContext)
        useEffect(()=>{
            const link='http://localhost:8000/api/'+tablename+'?page='+pagenumber+'&itemsPerPage='+itemperpage+'&status=true'+global+searchlink+searchterm+sortlink
            axios.get(link,{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                console.log(response)
                
                const table=(response.data["hydra:member"].map(d=>{
                        var a=parameters.map(p=>{
                            if(Object.prototype.toString.call(leaf(d,p.split('.')[0])) === '[object Array]'){

                                
                              return  {[p]:leaf(d,p.split('.')[0]).map(l=>{

                                if(p.split('.').length==1){
                                    return l+","
                                }
                                  return l[p.split('.')[1]]+","})}
                            }
                            else{
                           return {[p]:leaf(d,p) }
                            }
                        })
                        return Object.assign({}, ...a)   
                }))
                console.log(response.data["hydra:member"])
                if (response.data["hydra:totalItems"]>2){
                    setPagination({
                        number:response.data["hydra:totalItems"],
                        current:response.data["hydra:view"]["@id"],
                        first:response.data["hydra:view"]["hydra:first"],
                        last:response.data["hydra:view"]["hydra:last"],
                        next:response.data["hydra:view"]["hydra:next"],
                        previous:response.data["hydra:view"]["hydra:previous"]
                })
                
                setShow(true)
            }
            else if(response.data["hydra:totalItems"]===0){ 
                setShow(false)
            }
            else{ setPagination({
                number:response.data["hydra:totalItems"]})
                setShow(true)
            }
            if((searchterm.trim() !== '' || itemperpage>paginations.number) && !reset){
                console.log(searchterm)
                f()
                setreset(true)
            }
            else if(searchterm.trim() == '' && reset){
                setreset(false)
               console.log("bbb")
            }
            
                setData(table)
               setLoading(false)
            }).catch(error=>{
              console.error(error);
            }) 
        },[loading,pagenumber,searchterm,order,itemperpage,global,authctx.token])
        
        const loadingchange=()=>{
            setLoading(true)
            setPagenumber(1)
        }
        var i
        const handleChange=(event,v)=>{
            setPagenumber(v)
            i=pagenumber
        }
      const  f=(v=1)=>{
            setPagenumber(v)
        }
return{
    data,
    loading,
    paginations,
    show,
    pagenumber,reset,itemperpage,
    loadingchange,
    sortHandler,
    handleChange,itemperpageHandler
}

}
export default Tablehook;