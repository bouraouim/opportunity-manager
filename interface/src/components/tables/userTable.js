import React, { PureComponent } from 'react';
import '../../index';
import Useritem from './items/useritem';
import Paginations from './pagination';
import Tablehook from '../../hooks/table-hook';
import Modal from './items/modal';
import { useState } from 'react';
import Modalinput from './modalInputs';


 const UserTable=(props)=> {
    const [user,setuser]=useState('')
    const [searchh,setsearchh]=useState('')
    const [searchterm,setSearchterm]=useState('')

    const userHandler=(string)=>{
        setuser(string)
    }
            const{data,
                loading,
                paginations,
                show,
                pagenumber,
                itemperpage,
                loadingchange,
                sortHandler,
                handleChange}=Tablehook("userrs",searchh,["id","firstname","lastname","email",'businessunit.name','businessline.name','role.name','area.name','department.name',"status","lastconnectiondate"],searchterm,props.search)

               const searchclick=(n)=>{
                    setSearchterm(n)}
 

              const  searchchange=(e)=>{
                    setsearchh(e.target.value)
                }

                const   statusHandler=()=>{
                    setSearchterm("status")
                    if(searchh=="false")
                        {setsearchh("true")} 
                    else 
                    {setsearchh("false")} 
                           }
                return(
                    <>
                    <div className="table-responsive">
                        <table className="table align-items-center">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center text-xs font-weight-bold" data-sort="name" onClick={()=>sortHandler("email")}>Email address</th>
                                    <th className="text-center text-xs font-weight-bold" data-sort="name" onClick={()=>sortHandler("lastname")}>Lastname</th>
                                    <th className="text-center text-xs font-weight-bold" data-sort="name" onClick={()=>sortHandler("firstname")}>Firstname</th>
                                    <th className="text-center text-xs font-weight-bold" >Role</th>
                                    <th className="text-center text-xs font-weight-bold" >Business Unit</th>
                                    <th className="text-center text-xs font-weight-bold" >Business Line</th>
                                    <th className="text-center text-xs font-weight-bold" >Pole / Departement</th>
                                    <th className="text-center text-xs font-weight-bold" >Area</th>
                                    <th className="text-center text-xs font-weight-bold" >Last login</th>
                                    <th className="text-center text-xs font-weight-bold" >Status</th>
                                    <th className="text-center text-xs font-weight-bold" >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {!loading && data.map((d) => (
                                <Useritem key={d.name}
                                userHandler={userHandler}
                                status={d.status}
                                email={d.email}
                                loading={loadingchange}
                                bunit={d["businessunit.name"]}
                                bline={d["businessline.name"]}
                                role={d["role.name"]}
                                lname={d.lastname}
                                fname={d.firstname}
                                department={d["department.name"]}
                                area={d["area.name"]}
                                id={d.id}
                                lcd={d.lastconnectiondate}
                                
                                />
                            ))}
                            </tbody>
                        </table>
                        {loading && <h5 className="h3 my-2 text-center">Loading...</h5>}
                    </div>
                    {!loading && show && <Paginations itemperpage={itemperpage} onchange={handleChange} page={pagenumber} search={props.search}  pagination={paginations}/>}
                    {!show && <h5 className="h3 my-2 text-center">no corresponding data</h5>}
                                <Modalinput onchange={searchchange} user={user}/>
                    </>
                );
}
 
export default UserTable;