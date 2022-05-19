import React, { useState,useEffect,useRef, useContext } from 'react';
import axios from 'axios'
import Paginations from './pagination';
import Anonymizeitem from '../items/anonymizeitem';
import { CSVLink, CSVDownload } from "react-csv";
import AuthContext from '../../store/auth-context';
import Modalinput from './modalInputs';
import { ArrowDownUp, Funnel } from 'react-bootstrap-icons';

const AnonymizedTable=(props)=> { 

    const [data , setData]=useState([])
    const [list, setList] = useState([]);
        const [order, setOrder]=useState("");
        const [loading, setLoading]=useState(true)
        const [paginations,setPagination]=useState({})
        const [pagenumber,setPagenumber]=useState(1)
        const [show,setShow]=useState(true)
        const [reset,setreset]=useState(false)
        const [itemperpage,setitemperpage]=useState(5)
        const [sortby,setsortby]=useState('')
        const [anonymizedlink,setanonymizedlink]=useState("")
        const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const[anodata,setanodata]=useState([])
    const [download,setdownload]=useState(false)
    const [csvData,setcsvData]=useState([
        ["lastname", "firstname", "login","email","business line","last connection date","creation date"]])
        const [searchby,setsearchby]=useState('')
        const [searchterm,setsearchterm]=useState('')
        const [search,setSearch]=useState("")

        const authctx=useContext(AuthContext)

        const  searchchange=(e)=>{
            setsearchterm(e.target.value)
        }

        const searchclick=(n)=>{
            setsearchby(n)
        }

        const searchlink="&"+searchby+"="

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
            
        const parameters=["id","firstname","lastname","email",'businessunit.name','businessline.name','password','creationdate',"lastconnectiondate"]

        const global=(search=='')?"":"&search="+search
        useEffect(()=>{
            
            axios.get('http://localhost:8000/api/users?page='+pagenumber+'&itemsPerPage='+itemperpage+anonymizedlink+searchlink+searchterm+global+'&status=true'+sortlink,{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                setIsCheckAll(false)
                setIsCheck([])
                var table=(response.data["hydra:member"].map(d=>{
                    console.log(d)
                        var a=parameters.map(p=>{
                            if(Object.prototype.toString.call(leaf(d,p.split('.')[0])) === '[object Array]'){

                                
                              return  {[p]:leaf(d,p.split('.')[0]).map(l=>{

                                if(p.split('.').length==1){
                                    return l+","
                                }
                                  return l[p.split('.')[1]]+","})}
                            }
                            else{
                           return {[p]:leaf(d,p)  }
                            }
                        })
                        return Object.assign({}, ...a)   
                }))
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
            if((props.search.trim() !== '' || itemperpage>paginations.number) && !reset){
                f()
                setreset(true)
            }
            else if(props.search.trim() == '' && reset){
                setreset(false)
            }
            
                setData(table)
                setList(table)
               setLoading(false)
            }).catch(error=>{
              console.error(error);
            }) 
        },[loading,pagenumber,props.search,order,itemperpage,anodata,searchterm,search])
        
        const loadingchange=()=>{
            setLoading(true)
            setPagenumber(1)
        }
        var i
        const handleChange=(event,v)=>{
            setPagenumber(v)
            console.log(v)
            i=pagenumber
        }
      const  f=(v=1)=>{
            setPagenumber(v)
        }

    
 
        

        const handleSelectAll = e => {
            setIsCheckAll(!isCheckAll);
            setIsCheck(list.map(li => li.id));
            if (isCheckAll) {
              setIsCheck([]);
            }
          };

          const handleClick = e => {
             var id= parseInt(e.target.id);
            if (!isCheck.includes(parseInt(id))) {
                var l=[...isCheck, parseInt(id)]
            setIsCheck(l);
            }
            else if(isCheck.includes(parseInt(id)))  {
              setIsCheck(isCheck.filter(item => item !== id));
              if(isCheck.filter(item => item !== id).length ==0){
                  setIsCheckAll(false)
              }
            }
          };
        


            const undefinedHandler=(v)=>{
                if (v==undefined){
                    return("")
                }
                else return(v)
            }


          const anonymizeHandler=()=>{
           
            axios.get('http://localhost:8000/api/users?pagination=false',{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                var table=(response.data["hydra:member"].map(d=>{
                    
                        var a=parameters.map(p=>{
                            if(Object.prototype.toString.call(leaf(d,p.split('.')[0])) === '[object Array]'){

                               
                              return  {[p]:leaf(d,p.split('.')[0]).map(l=>{

                                if(p.split('.').length==1){
                                    return l+","
                                }
                                  return l[p.split('.')[1]]+","})}
                            }
                            else{
                           return {[p]:leaf(d,p)  }
                            }
                        })
                        return Object.assign({}, ...a)   
                }))
                console.log(table)
                console.log( table.filter(d=>{isCheck.includes(parseInt(d.id) )}))
                return table.filter(d=>isCheck.includes(parseInt(d.id) ))
                }).then(table=>{
                   const csvDat=[["lastname", "firstname", "login","email","business line","last connection date","creation date"]]
                table.map((t)=>{
                    csvDat.push([t.lastname,t.firstname,t.password,t.email,t["businessline.name"],t["lastconnectiondate"],t["creationdate"]])})
                return(csvDat)
                }).then(r=>{
            setcsvData(r)
            setdownload(true)
                setdownload(false)   
                }).then( async r=>{
                     const   res= await   axios.get('http://localhost:8000/api/numbers/1',{headers: {Authorization: "Bearer "+authctx.token}})
                                var numberanonymized= res.data.num
                    
                   isCheck.map(async d=>{   
                    numberanonymized++
                            
                                var body={status:false,anonymized:true,firstname:"firstname"+numberanonymized,lastname:"lastname"+numberanonymized,email:"email"+numberanonymized}
                                console.log(numberanonymized)
                                await axios.patch('http://localhost:8000/api/users/'+d,body,{headers: {
                        'Content-Type': 'application/merge-patch+json' ,
                        Authorization: "Bearer "+authctx.token
                    }}) 
                                 
                })
                await  axios.patch('http://localhost:8000/api/numbers/1',{num:numberanonymized},{headers: {
                            'Content-Type': 'application/merge-patch+json' ,
                            Authorization: "Bearer "+authctx.token
                        }}) 
          })}


          const downloadhandler=()=>{
            axios.get('http://localhost:8000/api/users?pagination=false&status=false',{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                var table=(response.data["hydra:member"].map(d=>{
                        var a=parameters.map(p=>{
                            if(Object.prototype.toString.call(leaf(d,p.split('.')[0])) === '[object Array]'){

                                
                              return  {[p]:leaf(d,p.split('.')[0]).map(l=>{

                                if(p.split('.').length==1){
                                    return l+","
                                }
                                  return l[p.split('.')[1]]+","})}
                            }
                            else{
                           return {[p]:leaf(d,p)  }
                            }
                        })
                        return Object.assign({}, ...a)   
                }))
               return table
                }).then(table=>{
                   const csvDat=[["lastname", "firstname", "password","email","business line","last connection date","creation date"]]
                table.map((t)=>{
                    csvDat.push([t.lastname,t.firstname,t.password,t.email,t["businessline.name"],t["lastconnectiondate"],t["creationdate"]])})
                return(csvDat)
                }).then(r=>{
            setcsvData(r)
            setdownload(true)
                setdownload(false)   
                })
                
          }

          const showAnonymized=()=>{
            if(anonymizedlink.trim()==""){
                setanonymizedlink("&status=true")
            }
            else{
                setanonymizedlink("")
            }  
            console.log("qdqsdqsd")
          }


          const searchHandler=(event)=>{
            setSearch(event.target.value)
          }

          const [showSearchInput, setShowSearchInput] = useState(false);

          const handleSearchInputs = () => {
              if(showSearchInput === true){
                  setShowSearchInput(false);
                  setsearchterm('');
              }
              else{
                  setShowSearchInput(true);
              }
          }
return(
    <div className="card mt-5 mb-5 ml-5 mr-5 pl-4 pr-4">
    <div className="card-header d-flex justify-content-between">
        <div className="">
            <button onClick={downloadhandler } className=" rounded-pill btn  btn-success" type="button">
                <span className="btn-inner--icon mr-2"><i className="ni ni-curved-next"></i></span>
                <span className="btn-inner--text">Export Anonymized users</span>
            </button>
        </div>
        <div id="datatable-basic_filter" className="dataTables_filter d-flex justify-content-center align-items-center  ">
        <button onClick={anonymizeHandler} className=" rounded-pill d-flex justify-content-center align-items-center  btn  btn-success" type="button">
                <span className="btn-inner--icon mr-2"><i className="ni ni-book-bookmark"></i></span>
                <span className="btn-inner--text">anonymize</span>
                {download&&<CSVDownload data={csvData} filename={"aaa.csv"} target="_self" />}
        </button>
            <input onChange={searchHandler} type="search" className="form-control form-control-sm" placeholder="Search keywords" aria-controls="datatable-basic"/>
        </div>
    </div>
    <div className="row">
    <div className="col w-auto">
            <div className="mb-2 table-responsive ">
                <table className="table align-items-center ">
                <thead className="table-dark">
                        <tr>
                            <th className="text-center text-xs font-weight-bold">Lastname&nbsp;<span onClick={()=>sortHandler("lastname")}><ArrowDownUp size={15}/></span>&nbsp;<i onClick={()=>{searchclick("lastname");handleSearchInputs();}} type="button"><Funnel size={15}/></i></th>
                            <th className="text-center text-xs font-weight-bold">Firstname&nbsp;<span onClick={()=>sortHandler("firstname")}><ArrowDownUp size={15}/></span>&nbsp;<i onClick={()=>{searchclick("firstname");handleSearchInputs();}} type="button"><Funnel size={15}/></i></th>
                            <th className="text-center text-xs font-weight-bold">Login&nbsp;<span onClick={()=>sortHandler("login")}><ArrowDownUp size={15}/></span>&nbsp;<i onClick={()=>{searchclick("email");handleSearchInputs();}} type="button"><Funnel size={15}/></i></th>
                            <th className="text-center text-xs font-weight-bold">Email address&nbsp;<span onClick={()=>sortHandler("email")}><ArrowDownUp size={15}/></span>&nbsp;<i onClick={()=>{searchclick("email");handleSearchInputs();}} type="button"><Funnel size={15}/></i></th>
                            <th className="text-center text-xs font-weight-bold">Business Line&nbsp;<span onClick={()=>sortHandler("businessline.name")}><ArrowDownUp size={15}/></span>&nbsp;<i onClick={()=>{searchclick("businessline.name");handleSearchInputs();}} type="button"><Funnel size={15}/></i></th>
                            <th className="text-center text-xs font-weight-bold">Last connection date</th>
                            <th className="text-center text-xs font-weight-bold">Creation date</th>
                            <th className="text-center text-xs font-weight-bold d-flex justify-content-center align-items-center">Check all 
                            <div className="custom-control ml-2 custom-checkbox">
                                        <input className="custom-control-input" 
                            onChange={handleSelectAll} checked={isCheckAll} id="table-check-all" type="checkbox"/>
                                        <label className="custom-control-label" htmlFor="table-check-all"></label>
                                    </div>
                        </th>
                        </tr>
                        {showSearchInput && <tr>
                    {searchby === "lastname" && <>
                        <th className="text-center text-xs font-weight-bold"><input onChange={searchchange} placeholder="Search keywords"/></th>
                        <th colspan="9" className="text-center text-xs font-weight-bold"></th>
                        
                    </>}
                    {searchby === "firstname" && <>
                    <th  className="text-center text-xs font-weight-bold"></th>
                        <th className="text-center text-xs font-weight-bold"><input onChange={searchchange} placeholder="Search keywords"/></th>
                        <th colspan="8" className="text-center text-xs font-weight-bold"></th>
                        
                    </>}
                    {searchby === "login" && <>
                    <th colspan="2"  className="text-center text-xs font-weight-bold"></th>
                        <th className="text-center text-xs font-weight-bold"><input onChange={searchchange} placeholder="Search keywords"/></th>
                        <th colspan="8" className="text-center text-xs font-weight-bold"></th>
                        
                    </>}
                    {searchby === "email" && <>
                    <th colspan="3" className="text-center text-xs font-weight-bold"></th>
                        <th className="text-center text-xs font-weight-bold"><input onChange={searchchange} placeholder="Search keywords"/></th>
                        <th colspan="7" className="text-center text-xs font-weight-bold"></th>
                        
                    </>}
                    {searchby === "businessline.name" && <>
                    <th colspan="4" className="text-center text-xs font-weight-bold"></th>
                        <th className="text-center text-xs font-weight-bold"><input onChange={searchchange} placeholder="Search keywords"/></th>
                        <th colspan="6" className="text-center text-xs font-weight-bold"></th>
                        
                    </>}
                </tr>}
                    </thead>
                    <tbody>
                    {!loading && data.map((d) => (
            <Anonymizeitem key={d.id}
            email={d.email}
            loading={loadingchange}
            login={d["password"]}
            bline={d["businessline.name"]}
            lastconnectiondate={d["lastconnectiondate"]}
            lname={d.lastname}
            fname={d.firstname}
            creationdate={d["creationdate"]}
            id={d.id}
            isCheck={isCheck}
            handleClick={handleClick}
            />
        ))}
                    </tbody>
                </table>
                {loading && <h5 className="h3 my-2 text-center">Loading...</h5>}
            </div>
            </div>
            </div>
            {!loading && show && <Paginations itemperpageHandler={itemperpageHandler} itemperpage={itemperpage} onchange={handleChange} page={pagenumber} search={props.search}  pagination={paginations}/>}
{!show && <h5 className="h3 my-2 text-center">no corresponding data</h5>}
        </div>        
 );
}
 
export default AnonymizedTable;