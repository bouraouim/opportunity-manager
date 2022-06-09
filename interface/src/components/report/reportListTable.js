import React from 'react';
import ReportListItem from './ReportListItem';


const  ReportListTable=(props)=> {
   
    let total=0;
    let total2022=0;
    let total2023=0;
    let total2024=0;
    let total2025=0;
    props.data.map(d=>{
        total=total+d.totalValue
    d.revenueLocalPart.map((y)=>{
        if(y.year==2022){
            return y.months.map(m=>{
                total2022=m.value+total2022
                return 0
            })
        }
        if(y.year==2023){
            return  y.months.map(m=>{
                total2023=m.value+total2023
                return 0
            })
        }
        if(y.year==2024){
            return  y.months.map(m=>{
                total2024=m.value+total2024
                return 0
            })
        }
        if(y.year>2025){
            return  y.months.map(m=>{
                total2025=m.value+total2025
                return 0
            })
        }
    })})

    return (
            <div className="mb-2 table-responsive ">
            <table className="table align-items-center ">
                <thead className="">
                <tr>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs text-white font-weight-bold   ">Opportunity referance</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Creation date</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Description</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Customer</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Country</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Sales Mananger</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Business unit</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Business line</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Department</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Stage</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Sucess rate</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Award date planned</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Award date acheived</th>
                    <th style={{backgroundColor: "#172b4d"}} className="text-center text-xs font-weight-bold  text-white">Total</th>
                    <th style={{backgroundColor: "#7dadc7"}} className="text-center text-xs font-weight-bold text-white">Total 2022</th>
                    <th style={{backgroundColor: "#7dadc7"}} className="text-center text-xs font-weight-bold text-white">Total 2023</th>
                    <th style={{backgroundColor: "#7dadc7"}} className="text-center text-xs font-weight-bold text-white">Total 2024</th>
                    <th style={{backgroundColor: "#7dadc7"}} className="text-center text-xs font-weight-bold text-white">Total 2025 or above</th>
                </tr>
                </thead>
                <tbody>

               { props.data.map((d)=>(
                <ReportListItem data={d}  />
               ))
                }
                    
                <tr>
                    <td colSpan="12" className="text-center text-xs text-white font-weight-bold   "></td>
                    <td style={{backgroundColor: "#172b4d"}} className="text-center text-xs text-white font-weight-bold   ">Total</td>
                    <td style={{backgroundColor: "#172b4d"}} className="text-center text-xs text-white font-weight-bold ">{total}</td>
                    <td style={{backgroundColor: "#7dadc7"}} className="text-center text-xs font-weight-bold text-white">{total2022}</td>
                    <td style={{backgroundColor: "#7dadc7"}} className="text-center text-xs font-weight-bold text-white">{total2023}</td>
                    <td style={{backgroundColor: "#7dadc7"}} className="text-center text-xs font-weight-bold text-white">{total2024}</td>
                    <td style={{backgroundColor: "#7dadc7"}} className="text-center text-xs font-weight-bold text-white">{total2025}</td>
                </tr>
                </tbody>
            </table>
            </div>
    );
}

export default ReportListTable;